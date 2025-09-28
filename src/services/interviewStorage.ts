interface CompletedInterview {
  id: string
  participant: string
  date: string
  duration: number // in seconds
  questions: string[]
  notes: string
  insights: Array<{
    timestamp: string
    type: 'quote' | 'problem' | 'suggestion' | 'insight'
    content: string
  }>
  status: 'completed' | 'analyzing'
  createdAt: string
  updatedAt: string
  folderId?: string // Research project ID
}

const STORAGE_KEY = 'completed_interviews'

export function saveCompletedInterview(interview: CompletedInterview): void {
  try {
    const existingInterviews = getCompletedInterviews()
    const updatedInterviews = [interview, ...existingInterviews.filter(i => i.id !== interview.id)]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInterviews))
    console.log('Interview saved successfully:', interview.id)

    // Also save to research items if we have the service available
    try {
      const { saveResearchItem } = require('./researchProjectStorage')
      const researchItem = {
        id: interview.id,
        type: 'interview' as const,
        title: `Intervju med ${interview.participant}`,
        participant: interview.participant,
        date: interview.date,
        duration: interview.duration,
        status: interview.status as 'completed' | 'in-progress',
        folderId: interview.folderId,
        insights: interview.insights?.length || 0
      }
      saveResearchItem(researchItem)
    } catch (syncError) {
      console.warn('Could not sync interview to research items:', syncError)
    }
  } catch (error) {
    console.error('Error saving interview:', error)
    throw new Error('Failed to save interview')
  }
}

export function getCompletedInterviews(): CompletedInterview[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    return JSON.parse(stored) as CompletedInterview[]
  } catch (error) {
    console.error('Error loading interviews:', error)
    return []
  }
}

export function deleteCompletedInterview(id: string): void {
  try {
    const existingInterviews = getCompletedInterviews()
    const updatedInterviews = existingInterviews.filter(interview => interview.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInterviews))
    console.log('Interview deleted successfully:', id)
  } catch (error) {
    console.error('Error deleting interview:', error)
    throw new Error('Failed to delete interview')
  }
}

export function analyzeInterviewNotes(notes: string): Array<{theme: string, sentiment: 'positive' | 'negative' | 'neutral', frequency: number}> {
  // Simple analysis based on keywords and patterns
  const insights: Array<{theme: string, sentiment: 'positive' | 'negative' | 'neutral', frequency: number}> = []

  // Look for common patterns in notes
  const patterns = [
    { keywords: ['problem', 'issue', 'difficult', 'frustrating', 'slow', 'confusing'], theme: 'Användarupplevelse problem', sentiment: 'negative' as const },
    { keywords: ['good', 'great', 'love', 'easy', 'fast', 'helpful'], theme: 'Positiv feedback', sentiment: 'positive' as const },
    { keywords: ['navigation', 'menu', 'find', 'search'], theme: 'Navigation', sentiment: 'neutral' as const },
    { keywords: ['mobile', 'phone', 'app'], theme: 'Mobilupplevelse', sentiment: 'neutral' as const },
    { keywords: ['checkout', 'payment', 'buy', 'purchase'], theme: 'Köpprocess', sentiment: 'neutral' as const },
    { keywords: ['design', 'ui', 'interface', 'layout'], theme: 'Design', sentiment: 'neutral' as const }
  ]

  const lowerNotes = notes.toLowerCase()

  patterns.forEach(pattern => {
    const matches = pattern.keywords.filter(keyword => lowerNotes.includes(keyword))
    if (matches.length > 0) {
      insights.push({
        theme: pattern.theme,
        sentiment: pattern.sentiment,
        frequency: matches.length
      })
    }
  })

  return insights
}

export function generateInsightsFromInterviews(interviews: CompletedInterview[]): Array<{theme: string, sentiment: 'positive' | 'negative' | 'neutral', frequency: number}> {
  const allInsights: Array<{theme: string, sentiment: 'positive' | 'negative' | 'neutral', frequency: number}> = []

  interviews.forEach(interview => {
    const interviewInsights = analyzeInterviewNotes(interview.notes)
    allInsights.push(...interviewInsights)
  })

  // Combine similar themes and sum frequencies
  const combinedInsights = new Map<string, {theme: string, sentiment: 'positive' | 'negative' | 'neutral', frequency: number}>()

  allInsights.forEach(insight => {
    const existing = combinedInsights.get(insight.theme)
    if (existing) {
      existing.frequency += insight.frequency
    } else {
      combinedInsights.set(insight.theme, { ...insight })
    }
  })

  return Array.from(combinedInsights.values()).sort((a, b) => b.frequency - a.frequency)
}

export { type CompletedInterview }