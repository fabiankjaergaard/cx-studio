import { Insight } from '@/types/journey-map'
import { callOpenRouter, parseAIJsonResponse } from './openRouter'

export interface ActionSuggestion {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  category: 'process' | 'design' | 'content' | 'technical' | 'training' | 'policy'
  estimatedTimeframe: string
}

/**
 * Generate action suggestions for an insight using AI
 */
export async function generateActionSuggestions(insight: Insight): Promise<ActionSuggestion[]> {
  try {
    const evidenceText = insight.evidence
      ?.map(e => e.text)
      .filter(Boolean)
      .join('\n- ')

    const prompt = `You are a CX (Customer Experience) expert analyzing customer insights to generate actionable recommendations.

Insight Title: "${insight.title}"
Description: "${insight.summary}"
Severity: ${insight.severity}/5 (where 5 is critical and 1 is minor)
${evidenceText ? `Customer Feedback:\n- ${evidenceText}` : ''}

Based on this insight, generate 3-5 specific, actionable recommendations that a CX team can implement to address this issue.

For each action, provide:
- title: A clear, actionable title (max 60 characters)
- description: Detailed explanation of what to do and why (2-3 sentences)
- priority: How urgent this action is (high/medium/low)
- effort: Implementation difficulty (low/medium/high)
- impact: Expected positive impact (low/medium/high)
- category: Type of action (process/design/content/technical/training/policy)
- estimatedTimeframe: How long to implement (e.g., "1-2 weeks", "1 month", "2-3 months")

Consider:
- Quick wins vs. long-term improvements
- Balance between effort and impact
- Specific, measurable actions
- Resource requirements
- Dependencies between actions

Return ONLY valid JSON in this exact format:
{
  "actions": [
    {
      "title": "Action title here",
      "description": "Detailed description here",
      "priority": "high",
      "effort": "medium",
      "impact": "high",
      "category": "design",
      "estimatedTimeframe": "2-3 weeks"
    }
  ]
}

Return ONLY valid JSON, no markdown.`

    const response = await callOpenRouter(
      [
        {
          role: 'user',
          content: prompt
        }
      ],
      {
        temperature: 0.7,
        maxTokens: 1500
      }
    )

    const result = parseAIJsonResponse<{ actions: Omit<ActionSuggestion, 'id'>[] }>(response)

    // Add IDs to each action
    const actions: ActionSuggestion[] = result.actions.map((action, index) => ({
      ...action,
      id: `action-${insight.id}-${index}-${Date.now()}`
    }))

    return actions
  } catch (error) {
    console.error('Error generating action suggestions:', error)
    throw error
  }
}

/**
 * Generate a fallback action suggestion when AI fails
 */
export function getFallbackActionSuggestions(insight: Insight): ActionSuggestion[] {
  const baseSuggestions: Omit<ActionSuggestion, 'id'>[] = []

  // Suggest based on severity
  if (insight.severity >= 4) {
    baseSuggestions.push({
      title: 'Conduct urgent investigation',
      description: `This is a high-severity issue affecting customer experience. Assign a team member to investigate the root cause and document findings within the next 48 hours.`,
      priority: 'high',
      effort: 'low',
      impact: 'high',
      category: 'process',
      estimatedTimeframe: '2-3 days'
    })
  }

  baseSuggestions.push({
    title: 'Review and prioritize fix',
    description: `Schedule a team meeting to discuss this insight, assess its impact, and determine the best approach to address it based on available resources and current priorities.`,
    priority: insight.severity >= 4 ? 'high' : 'medium',
    effort: 'low',
    impact: 'medium',
    category: 'process',
    estimatedTimeframe: '1 week'
  })

  baseSuggestions.push({
    title: 'Collect additional feedback',
    description: `Gather more specific customer feedback related to this issue through targeted surveys or interviews to better understand the scope and underlying causes.`,
    priority: 'medium',
    effort: 'medium',
    impact: 'medium',
    category: 'process',
    estimatedTimeframe: '2-3 weeks'
  })

  return baseSuggestions.map((action, index) => ({
    ...action,
    id: `fallback-action-${insight.id}-${index}`
  }))
}
