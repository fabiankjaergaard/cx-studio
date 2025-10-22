import { GeneratedInsight, PlacementSuggestion } from '@/types/insight-import'
import { JourneyMapData, JourneyMapRow, JourneyMapStage } from '@/types/journey-map'
import { callOpenRouter, parseAIJsonResponse } from './openRouter'

/**
 * InsightMatcher - Smart matching system for placing insights in journey maps
 *
 * Uses keyword-based analysis to suggest where insights should be placed
 * in the journey map based on content, severity, and journey structure.
 *
 * V1: Keyword-based matching (simple but effective)
 * Future: Could be enhanced with AI/ML for semantic understanding
 */

// Rate limiting tracker
class RateLimitTracker {
  private requests: number[] = []
  private readonly RATE_LIMIT = 15 // Stay safely under 16/min
  private readonly WINDOW_MS = 60000 // 1 minute

  addRequest() {
    const now = Date.now()
    this.requests.push(now)
    this.cleanup()
  }

  private cleanup() {
    const now = Date.now()
    this.requests = this.requests.filter(time => now - time < this.WINDOW_MS)
  }

  getRequiredDelay(): number {
    this.cleanup()

    if (this.requests.length === 0) {
      return 0 // No delay needed for first request
    }

    if (this.requests.length < this.RATE_LIMIT) {
      return 0 // Under limit, no delay needed
    }

    // We're at the limit, calculate delay needed
    const oldestRequest = this.requests[0]
    const timeSinceOldest = Date.now() - oldestRequest
    const delayNeeded = this.WINDOW_MS - timeSinceOldest + 100 // +100ms buffer

    return Math.max(0, delayNeeded)
  }

  getRemainingRequests(): number {
    this.cleanup()
    return Math.max(0, this.RATE_LIMIT - this.requests.length)
  }
}

export class InsightMatcher {
  private journeyMap: JourneyMapData
  private rateLimiter = new RateLimitTracker()

  // Stage keywords - map common words/phrases to journey stages
  private stageKeywords: Record<string, string[]> = {
    'awareness': [
      'upptäcka', 'söker', 'hittar', 'letar', 'research', 'discover', 'find', 'search',
      'googla', 'google', 'first time', 'första gången', 'hört talas', 'heard about',
      'annons', 'ad', 'reklam', 'marketing', 'social media'
    ],
    'consideration': [
      'jämföra', 'compare', 'alternativ', 'options', 'utvärdera', 'evaluate',
      'review', 'recension', 'omdöme', 'betyg', 'rating', 'pris', 'price',
      'funkar', 'fungerar', 'works', 'features', 'funktioner'
    ],
    'purchase': [
      'köpa', 'buy', 'beställa', 'order', 'betala', 'pay', 'checkout', 'kassa',
      'lägg order', 'place order', 'genomför köp', 'complete purchase',
      'card', 'kort', 'swish', 'klarna', 'payment'
    ],
    'usage': [
      'använder', 'use', 'using', 'använda', 'leverans', 'delivery', 'shipping',
      'mottagit', 'received', 'fick', 'got', 'fungerar', 'works', 'funkar inte',
      'not working', 'problem', 'issue', 'support', 'hjälp', 'help',
      'installation', 'setup', 'configure', 'sätta upp'
    ],
    'advocacy': [
      'rekommendera', 'recommend', 'återkom', 'return', 'igen', 'again',
      'loyal', 'lojal', 'fan', 'älskar', 'love', 'fantastic', 'fantastisk',
      'berättar', 'tell', 'dela', 'share', 'vänner', 'friends', 'family'
    ]
  }

  // Row category keywords - map content to row types
  private rowKeywords: Record<string, string[]> = {
    'pain-points': [
      'problem', 'issue', 'frustrer', 'frustrat', 'arg', 'angry', 'besviken', 'disappointed',
      'dålig', 'bad', 'terrible', 'awful', 'useless', 'värdelös', 'inte fungerar',
      'not working', 'trasig', 'broken', 'långsam', 'slow', 'svår', 'difficult',
      'komplicerad', 'complicated', 'förvirrande', 'confusing', 'fel', 'wrong',
      'saknas', 'missing', 'glömt', 'forgot', 'sent', 'late', 'för länge', 'too long'
    ],
    'opportunities': [
      'skulle vilja', 'would like', 'önska', 'wish', 'borde', 'should',
      'vore bra', 'would be good', 'förbättra', 'improve', 'bättre', 'better',
      'suggestion', 'förslag', 'idea', 'idé', 'kanske', 'maybe', 'could',
      'kunde', 'potential', 'möjlighet'
    ],
    'emotions': [
      'känner', 'feel', 'känns', 'feels', 'glad', 'happy', 'ledsen', 'sad',
      'arg', 'angry', 'frustrerad', 'frustrated', 'nöjd', 'satisfied',
      'besviken', 'disappointed', 'överraskad', 'surprised', 'imponerad', 'impressed',
      'irriterad', 'irritated', 'stressad', 'stressed'
    ],
    'touchpoints': [
      'hemsida', 'website', 'app', 'mail', 'email', 'telefon', 'phone',
      'chat', 'support', 'butik', 'store', 'online', 'social media',
      'facebook', 'instagram', 'twitter', 'contact', 'kontakt'
    ]
  }

  constructor(journeyMap: JourneyMapData) {
    this.journeyMap = journeyMap
  }

  /**
   * Use AI to intelligently match insight to journey map
   * Falls back to keyword matching if AI fails
   */
  private async matchWithAI(insight: GeneratedInsight): Promise<PlacementSuggestion[]> {
    try {
      // Check if we need to wait for rate limiting
      const delay = this.rateLimiter.getRequiredDelay()
      if (delay > 0) {
        console.log(`⏱️  Rate limit approaching, waiting ${Math.ceil(delay / 1000)}s before next request...`)
        await new Promise(resolve => setTimeout(resolve, delay))
      }

      // Track this request
      this.rateLimiter.addRequest()

      // Prepare journey map structure for AI
      const stages = this.journeyMap.stages.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description
      }))

      const rows = this.journeyMap.rows.map(r => ({
        id: r.id,
        category: r.category,
        description: r.description
      }))

      // Extract stage names for better matching
      const stageNames = stages.map(s => s.name.toLowerCase()).join(', ')
      const insightText = `${insight.title} ${insight.summary}`.toLowerCase()

      const prompt = `You are a Customer Experience (CX) expert analyzing where to place customer feedback in a journey map.

CRITICAL MATCHING RULES:
1. EXACT NAME MATCHING: If the insight text contains a word that matches a stage name, prioritize that stage with HIGH confidence (0.9+)
2. SEMANTIC MATCHING: Match the insight's meaning to the stage's purpose
3. LANGUAGE: The insight may be in Swedish or English - understand both languages
4. STAGE SEQUENCE: Consider where in the customer journey this problem occurs

Insight to place:
Title: "${insight.title}"
Summary: "${insight.summary}"
Severity: ${insight.severity}/5
Source: ${insight.source?.type}

Journey Map Structure:
Available Stages: ${stageNames}
Full Stage Details: ${JSON.stringify(stages, null, 2)}
Available Rows: ${JSON.stringify(rows, null, 2)}

MATCHING EXAMPLES:
- "Onboarding is confusing" → Match to "Onboarding" stage (exact name match!)
- "Cannot find features" → Match to "Usage" or "Discovery" stage
- "Checkout is broken" → Match to "Purchase" or "Checkout" stage
- "Support never responds" → Match to "Support" or "Usage" stage

Swedish translations:
- "Onboarding" = "Introduktion", "Kom igång", "Börja"
- "Usage" = "Användning", "Använder"
- "Support" = "Support", "Hjälp", "Kundservice"
- "Purchase" = "Köp", "Beställning"

Task: Suggest up to 3 best placements. YOU MUST:
1. Check if insight text contains any stage name - if yes, use that stage with confidence 0.9+
2. Match the insight's semantic meaning to the stage's purpose
3. Consider which row category fits (pain-points for problems, opportunities for suggestions)
4. Assign confidence: 0.9-1.0 for exact matches, 0.7-0.9 for semantic matches, 0.5-0.7 for uncertain

Return JSON array with top 3 placements:
[
  {
    "stageId": "exact-stage-id-from-stages-array",
    "rowId": "exact-row-id-from-rows-array",
    "confidence": 0.95,
    "reason": "Brief explanation why this placement makes sense"
  }
]

IMPORTANT: Use the EXACT stageId and rowId from the provided arrays above!
Return ONLY valid JSON array, no markdown.`

      const response = await callOpenRouter([
        {
          role: 'user',
          content: prompt
        }
      ], {
        temperature: 0.3,
        maxTokens: 1000
      })

      const aiSuggestions = parseAIJsonResponse<Array<{
        stageId: string
        rowId: string
        confidence: number
        reason: string
      }>>(response)

      // Convert AI suggestions to PlacementSuggestion format
      const placements: PlacementSuggestion[] = []

      for (const suggestion of aiSuggestions.slice(0, 3)) {
        // Find the row
        const row = this.journeyMap.rows.find(r => r.id === suggestion.rowId)
        if (!row) continue

        // Find the stage index
        const stageIndex = this.journeyMap.stages.findIndex(s => s.id === suggestion.stageId)
        if (stageIndex === -1) continue

        // Get the cell at that position
        const cell = row.cells[stageIndex]
        if (!cell) continue

        placements.push({
          rowId: suggestion.rowId,
          cellId: cell.id,
          stageId: suggestion.stageId,
          confidence: Math.max(0, Math.min(1, suggestion.confidence)),
          reason: suggestion.reason,
          keywords: [],
          method: 'ai'
        })
      }

      return placements

    } catch (error) {
      console.warn('AI matching failed, using keyword fallback:', error)
      // Fall back to keyword matching
      return this.matchWithKeywords(insight)
    }
  }

  /**
   * Keyword-based matching (V1 - fallback method)
   */
  private matchWithKeywords(insight: GeneratedInsight): PlacementSuggestion[] {
    const text = `${insight.title} ${insight.summary}`.toLowerCase()
    const keywords = this.extractKeywords(text)

    // Get stage suggestions
    const stageSuggestions = this.matchStages(keywords)

    // Get row suggestions
    const rowSuggestions = this.matchRows(insight, keywords)

    // Combine stage and row suggestions into cell placements
    const placements = this.combineSuggestions(stageSuggestions, rowSuggestions, keywords)

    // Sort by confidence and return top 3
    return placements.sort((a, b) => b.confidence - a.confidence).slice(0, 3)
  }

  /**
   * Main method: Generate placement suggestions for an insight
   * Returns up to 3 suggestions ordered by confidence
   * Uses AI matching with keyword fallback
   */
  async matchToJourneyMap(insight: GeneratedInsight): Promise<PlacementSuggestion[]> {
    // Try AI matching first
    return await this.matchWithAI(insight)
  }

  /**
   * Extract important keywords from text
   * Simple approach: split on whitespace and punctuation
   */
  private extractKeywords(text: string): string[] {
    // Remove punctuation and split
    const words = text
      .toLowerCase()
      .replace(/[.,!?;:()]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3) // Ignore short words

    // Remove common stop words
    const stopWords = new Set([
      'the', 'and', 'for', 'with', 'this', 'that', 'from', 'have',
      'det', 'och', 'för', 'med', 'den', 'att', 'som', 'är', 'var'
    ])

    return words.filter(w => !stopWords.has(w))
  }

  /**
   * Match keywords to journey stages
   * Returns stages with confidence scores
   */
  private matchStages(keywords: string[]): Array<{ stageId: string, confidence: number, matchedKeywords: string[] }> {
    const matches: Array<{ stageId: string, confidence: number, matchedKeywords: string[] }> = []

    for (const stage of this.journeyMap.stages) {
      const stageKeywords = this.stageKeywords[stage.id] || []
      const matchedKeywords: string[] = []
      let matchCount = 0

      // Check each keyword against stage keywords
      for (const keyword of keywords) {
        for (const stageKeyword of stageKeywords) {
          if (keyword.includes(stageKeyword) || stageKeyword.includes(keyword)) {
            matchCount++
            matchedKeywords.push(keyword)
            break
          }
        }
      }

      if (matchCount > 0) {
        // Confidence = matches / total keywords, capped at 1.0
        const confidence = Math.min(1.0, matchCount / Math.max(keywords.length, 5))
        matches.push({
          stageId: stage.id,
          confidence,
          matchedKeywords
        })
      }
    }

    // If no matches, default to 'usage' (most common pain point stage)
    if (matches.length === 0) {
      matches.push({
        stageId: 'usage',
        confidence: 0.3, // Low confidence default
        matchedKeywords: []
      })
    }

    return matches.sort((a, b) => b.confidence - a.confidence)
  }

  /**
   * Match insight to row categories
   * Uses severity, keywords, and source type
   */
  private matchRows(
    insight: GeneratedInsight,
    keywords: string[]
  ): Array<{ rowId: string, confidence: number, reason: string }> {
    const matches: Array<{ rowId: string, confidence: number, reason: string }> = []

    // High severity (4-5) → likely pain points
    if (insight.severity >= 4) {
      const painPointRow = this.journeyMap.rows.find(r =>
        r.category.toLowerCase().includes('pain') ||
        r.id === 'pain-points'
      )

      if (painPointRow) {
        matches.push({
          rowId: painPointRow.id,
          confidence: 0.9,
          reason: `High severity (${insight.severity}/5) indicates pain point`
        })
      }
    }

    // Match keywords to row categories
    for (const row of this.journeyMap.rows) {
      const rowType = this.getRowType(row)
      const rowKeywords = this.rowKeywords[rowType] || []
      let matchCount = 0

      for (const keyword of keywords) {
        for (const rowKeyword of rowKeywords) {
          if (keyword.includes(rowKeyword) || rowKeyword.includes(keyword)) {
            matchCount++
            break
          }
        }
      }

      if (matchCount > 0) {
        const confidence = Math.min(0.85, matchCount / Math.max(keywords.length, 5))
        matches.push({
          rowId: row.id,
          confidence,
          reason: `Keywords match ${row.category}: ${keywords.slice(0, 3).join(', ')}`
        })
      }
    }

    // Default to pain points row if no matches and severity is high
    if (matches.length === 0 && insight.severity >= 3) {
      const painPointRow = this.journeyMap.rows.find(r =>
        r.category.toLowerCase().includes('pain') || r.id === 'pain-points'
      )

      if (painPointRow) {
        matches.push({
          rowId: painPointRow.id,
          confidence: 0.5,
          reason: 'Default to pain points for negative feedback'
        })
      }
    }

    return matches.sort((a, b) => b.confidence - a.confidence)
  }

  /**
   * Determine row type from row data
   */
  private getRowType(row: JourneyMapRow): string {
    const category = row.category.toLowerCase()
    const id = row.id.toLowerCase()

    if (category.includes('pain') || id.includes('pain')) return 'pain-points'
    if (category.includes('opportunit') || id.includes('opportunit')) return 'opportunities'
    if (category.includes('emotion') || id.includes('emotion')) return 'emotions'
    if (category.includes('touchpoint') || id.includes('touchpoint')) return 'touchpoints'

    return 'pain-points' // Default
  }

  /**
   * Combine stage and row suggestions into cell placements
   */
  private combineSuggestions(
    stageSuggestions: Array<{ stageId: string, confidence: number, matchedKeywords: string[] }>,
    rowSuggestions: Array<{ rowId: string, confidence: number, reason: string }>,
    keywords: string[]
  ): PlacementSuggestion[] {
    const placements: PlacementSuggestion[] = []

    // Create combinations of top stages and rows
    const topStages = stageSuggestions.slice(0, 2) // Top 2 stages
    const topRows = rowSuggestions.slice(0, 2) // Top 2 rows

    for (const stage of topStages) {
      for (const row of topRows) {
        // Find the cell
        const rowData = this.journeyMap.rows.find(r => r.id === row.rowId)
        if (!rowData) continue

        const cell = rowData.cells.find(c => {
          // Match cell to stage by position or content
          const cellStage = this.journeyMap.stages.find(s => s.id === stage.stageId)
          if (!cellStage) return false

          // Simple heuristic: match by position
          const stageIndex = this.journeyMap.stages.findIndex(s => s.id === stage.stageId)
          const cellIndex = rowData.cells.indexOf(c)
          return stageIndex === cellIndex
        })

        if (!cell) continue

        // Calculate combined confidence (weighted average)
        const combinedConfidence = (stage.confidence * 0.6) + (row.confidence * 0.4)

        placements.push({
          rowId: row.rowId,
          cellId: cell.id,
          stageId: stage.stageId,
          confidence: combinedConfidence,
          reason: `${row.reason}. Stage matched by keywords: ${stage.matchedKeywords.slice(0, 2).join(', ')}`,
          keywords: stage.matchedKeywords,
          method: 'keyword'
        })
      }
    }

    return placements
  }

  /**
   * Batch process multiple insights with smart rate limiting
   */
  async matchMultipleInsights(
    insights: GeneratedInsight[],
    onProgress?: (current: number, total: number, insightTitle: string) => void
  ): Promise<GeneratedInsight[]> {
    const results: GeneratedInsight[] = []

    for (let i = 0; i < insights.length; i++) {
      const insight = insights[i]

      // Report progress
      if (onProgress) {
        onProgress(i + 1, insights.length, insight.title)
      }

      console.log(`🔍 Matching insight ${i + 1}/${insights.length}: "${insight.title}"`)

      const suggestions = await this.matchToJourneyMap(insight)
      results.push({
        ...insight,
        suggestedPlacements: suggestions
      })
    }

    return results
  }
}

/**
 * Helper function to match a single insight to a journey map
 */
export async function matchInsightToMap(
  insight: GeneratedInsight,
  journeyMap: JourneyMapData
): Promise<GeneratedInsight> {
  const matcher = new InsightMatcher(journeyMap)
  const suggestions = await matcher.matchToJourneyMap(insight)

  return {
    ...insight,
    suggestedPlacements: suggestions
  }
}

/**
 * Helper function to match multiple insights to a journey map
 */
export async function matchInsightsToMap(
  insights: GeneratedInsight[],
  journeyMap: JourneyMapData
): Promise<GeneratedInsight[]> {
  const matcher = new InsightMatcher(journeyMap)
  return await matcher.matchMultipleInsights(insights)
}
