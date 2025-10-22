import type { SurveyData } from '@/types/insight-import'

/**
 * Survey storage interface that extends SurveyData with metadata
 */
export interface StoredSurvey {
  id: string
  surveyData: SurveyData
  name: string
  description: string
  date: string
  status: 'active' | 'completed' | 'draft'
  createdAt: string
  updatedAt: string
  folderId?: string // Research project ID
}

const STORAGE_KEY = 'completed_surveys'

/**
 * Save a survey to localStorage
 */
export function saveSurvey(survey: StoredSurvey): void {
  try {
    const surveys = getSurveys()
    const existingIndex = surveys.findIndex(s => s.id === survey.id)

    if (existingIndex >= 0) {
      surveys[existingIndex] = {
        ...survey,
        updatedAt: new Date().toISOString()
      }
    } else {
      surveys.push(survey)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(surveys))
    console.log('Survey saved successfully:', survey.id)

    // Also save to research items if we have the service available
    try {
      const { saveResearchItem } = require('./researchProjectStorage')
      const researchItem = {
        id: survey.id,
        type: 'survey' as const,
        title: survey.name,
        date: survey.date,
        status: survey.status === 'completed' ? 'completed' as const : survey.status === 'active' ? 'in-progress' as const : 'draft' as const,
        folderId: survey.folderId,
        responses: survey.surveyData.responses.length
      }
      saveResearchItem(researchItem)
    } catch (syncError) {
      console.warn('Could not sync survey to research items:', syncError)
    }
  } catch (error) {
    console.error('Error saving survey:', error)
    throw error
  }
}

/**
 * Get all surveys from localStorage
 */
export function getSurveys(): StoredSurvey[] {
  try {
    const surveysJson = localStorage.getItem(STORAGE_KEY)
    if (!surveysJson) return []

    return JSON.parse(surveysJson)
  } catch (error) {
    console.error('Error loading surveys:', error)
    return []
  }
}

/**
 * Get a specific survey by ID
 */
export function getSurveyById(id: string): StoredSurvey | undefined {
  const surveys = getSurveys()
  return surveys.find(s => s.id === id)
}

/**
 * Delete a survey
 */
export function deleteSurvey(id: string): void {
  try {
    const surveys = getSurveys()
    const filtered = surveys.filter(s => s.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error deleting survey:', error)
    throw error
  }
}

/**
 * Get only completed surveys
 */
export function getCompletedSurveys(): StoredSurvey[] {
  return getSurveys().filter(s => s.status === 'completed')
}
