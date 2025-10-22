import { ImportableResearchData, InterviewData, InterviewHighlight, SurveyData } from '@/types/insight-import'
import { getCompletedInterviews, type CompletedInterview } from './interviewStorage'
import { getSavedResearchItems, type ResearchItem } from './researchProjectStorage'
import { getCompletedSurveys, type StoredSurvey } from './surveyStorage'

/**
 * Converts stored research data (interviews, surveys) into ImportableResearchData format
 * that can be processed by the Insights AI system.
 */

/**
 * Convert CompletedInterview to ImportableResearchData with InterviewData structure
 */
function convertInterviewToImportable(interview: CompletedInterview): ImportableResearchData {
  // Convert interview insights to InterviewHighlight format
  const highlights: InterviewHighlight[] = interview.insights?.map(insight => ({
    id: `${interview.id}-${insight.timestamp}`,
    quote: insight.content,
    timestamp: insight.timestamp,
    category: mapInsightTypeToCategory(insight.type),
    tags: [] // Could be enhanced later
  })) || []

  const interviewData: InterviewData = {
    id: interview.id,
    interviewName: `Interview with ${interview.participant}`,
    conductedAt: interview.date,
    participant: {
      id: interview.id, // Use interview ID as participant ID
      name: interview.participant
    },
    transcript: interview.notes, // Use notes as transcript
    highlights
  }

  return {
    id: interview.id,
    type: 'interview',
    name: `Interview with ${interview.participant}`,
    description: `${interview.insights?.length || 0} insights from interview (${formatDuration(interview.duration)})`,
    collectedAt: interview.date,
    itemCount: interview.insights?.length || 0,
    data: interviewData,
    folderId: interview.folderId
  }
}

/**
 * Map CompletedInterview insight type to InterviewHighlight category
 */
function mapInsightTypeToCategory(
  type: 'quote' | 'problem' | 'suggestion' | 'insight'
): 'pain-point' | 'opportunity' | 'insight' | 'positive' | 'negative' {
  switch (type) {
    case 'problem':
      return 'pain-point'
    case 'suggestion':
      return 'opportunity'
    case 'insight':
      return 'insight'
    case 'quote':
      return 'positive' // Default quotes to positive
    default:
      return 'insight'
  }
}

/**
 * Format duration from seconds to human-readable string
 */
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  if (minutes === 0) {
    return `${seconds}s`
  }

  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`
}

/**
 * Convert StoredSurvey to ImportableResearchData
 */
function convertSurveyToImportable(survey: StoredSurvey): ImportableResearchData {
  return {
    id: survey.id,
    type: 'survey',
    name: survey.name,
    description: `${survey.surveyData.responses.length} responses from survey`,
    collectedAt: survey.date,
    itemCount: survey.surveyData.responses.length,
    data: survey.surveyData,
    folderId: survey.folderId
  }
}

/**
 * Load all available research data from localStorage and convert to ImportableResearchData
 */
export function loadAvailableResearchData(): ImportableResearchData[] {
  const importableData: ImportableResearchData[] = []

  // Load and convert completed interviews
  try {
    const interviews = getCompletedInterviews()
    const completedInterviews = interviews.filter(i => i.status === 'completed')

    completedInterviews.forEach(interview => {
      try {
        const importable = convertInterviewToImportable(interview)
        importableData.push(importable)
      } catch (error) {
        console.error(`Error converting interview ${interview.id}:`, error)
      }
    })

    console.log(`✅ Loaded ${completedInterviews.length} completed interviews`)
  } catch (error) {
    console.error('Error loading interviews:', error)
  }

  // Load and convert completed surveys
  try {
    const surveys = getCompletedSurveys()
    const completedSurveys = surveys.filter(s => s.status === 'completed')

    completedSurveys.forEach(survey => {
      try {
        const importable = convertSurveyToImportable(survey)
        importableData.push(importable)
      } catch (error) {
        console.error(`Error converting survey ${survey.id}:`, error)
      }
    })

    console.log(`✅ Loaded ${completedSurveys.length} completed surveys`)
  } catch (error) {
    console.error('Error loading surveys:', error)
  }

  return importableData
}

/**
 * Load research data for a specific journey map
 * (Currently loads all data - could be filtered by journey map context in the future)
 */
export function loadResearchDataForJourneyMap(journeyMapId: string): ImportableResearchData[] {
  // For now, return all available research data
  // In the future, this could filter by journey map context, tags, or date range
  return loadAvailableResearchData()
}

/**
 * Get statistics about available research data
 */
export function getResearchDataStats() {
  const data = loadAvailableResearchData()

  return {
    totalItems: data.length,
    interviews: data.filter(d => d.type === 'interview').length,
    surveys: data.filter(d => d.type === 'survey').length,
    nps: data.filter(d => d.type === 'nps').length,
    csat: data.filter(d => d.type === 'csat').length,
    totalInsights: data.reduce((sum, d) => sum + d.itemCount, 0)
  }
}
