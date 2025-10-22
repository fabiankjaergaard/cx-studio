/**
 * OpenRouter AI Service
 * Handles API calls to OpenRouter for AI-powered insights
 */

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = 'meta-llama/llama-3.3-8b-instruct:free'

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface OpenRouterResponse {
  id: string
  model: string
  choices: {
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export class RateLimitError extends Error {
  constructor(
    message: string,
    public resetTime: number,
    public limit: number,
    public remaining: number
  ) {
    super(message)
    this.name = 'RateLimitError'
  }
}

/**
 * Call OpenRouter API with messages
 */
export async function callOpenRouter(
  messages: OpenRouterMessage[],
  options?: {
    temperature?: number
    maxTokens?: number
  }
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured')
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'CX Studio - Kustra'
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2000
      })
    })

    if (!response.ok) {
      const errorText = await response.text()

      // Handle rate limiting specially
      if (response.status === 429) {
        let resetTime = Date.now() + 60000
        let limit = 16
        let remaining = 0
        let message = 'Rate limit exceeded'

        try {
          const errorData = JSON.parse(errorText)
          resetTime = errorData.error?.metadata?.headers?.['X-RateLimit-Reset']
            ? parseInt(errorData.error.metadata.headers['X-RateLimit-Reset'])
            : Date.now() + 60000
          limit = errorData.error?.metadata?.headers?.['X-RateLimit-Limit']
            ? parseInt(errorData.error.metadata.headers['X-RateLimit-Limit'])
            : 16
          remaining = errorData.error?.metadata?.headers?.['X-RateLimit-Remaining']
            ? parseInt(errorData.error.metadata.headers['X-RateLimit-Remaining'])
            : 0
          message = errorData.error?.message || 'Rate limit exceeded'
        } catch (parseError) {
          // If parsing fails, use defaults set above
        }

        throw new RateLimitError(message, resetTime, limit, remaining)
      }

      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`)
    }

    const data: OpenRouterResponse = await response.json()

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from OpenRouter')
    }

    return data.choices[0].message.content
  } catch (error) {
    console.error('OpenRouter API error:', error)
    throw error
  }
}

/**
 * Parse JSON from AI response, handling markdown code blocks
 */
export function parseAIJsonResponse<T>(content: string): T {
  try {
    // Remove markdown code blocks if present
    let jsonStr = content.trim()
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.replace(/^```json\n/, '').replace(/\n```$/, '')
    } else if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```\n/, '').replace(/\n```$/, '')
    }

    return JSON.parse(jsonStr)
  } catch (error) {
    console.error('Failed to parse AI response:', content)
    throw new Error('Failed to parse AI JSON response')
  }
}
