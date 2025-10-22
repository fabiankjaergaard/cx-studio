'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Download, Sparkles } from 'lucide-react'
import { generateMockInterviews, getMockInterviewsSummary } from '@/utils/generateMockInterviews'
import { generateMockSurveys, getMockSurveysSummary } from '@/utils/generateMockSurveys'
import { saveCompletedInterview } from '@/services/interviewStorage'
import { saveSurvey } from '@/services/surveyStorage'
import { saveResearchProject, type ResearchProject } from '@/services/researchProjectStorage'

export function LoadDemoDataButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoadDemoData = () => {
    setIsLoading(true)

    try {
      // Create demo research project
      const projectId = `demo-project-${Date.now()}`
      const today = new Date().toISOString().split('T')[0]

      const demoProject: ResearchProject = {
        id: projectId,
        name: 'Customer Experience Research',
        description: 'Demo project with customer interviews and satisfaction surveys',
        color: 'blue',
        icon: '🔍',
        createdAt: today,
        itemCount: 0, // Will be updated automatically
        lastActivity: today,
        types: ['interview', 'survey']
      }

      saveResearchProject(demoProject)
      console.log('✅ Created demo research project:', demoProject.name)

      // Load interviews and link to project
      const mockInterviews = generateMockInterviews()
      mockInterviews.forEach(interview => {
        saveCompletedInterview({
          ...interview,
          folderId: projectId // Link to project
        })
      })
      const interviewSummary = getMockInterviewsSummary()
      console.log('✅ Loaded demo interviews:', interviewSummary)

      // Load surveys and link to project
      const mockSurveys = generateMockSurveys()
      mockSurveys.forEach(({ id, surveyData, metadata }) => {
        saveSurvey({
          id,
          surveyData,
          name: metadata.name,
          description: metadata.description,
          date: metadata.date,
          status: 'completed',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          folderId: projectId // Link to project
        })
      })
      const surveySummary = getMockSurveysSummary()
      console.log('✅ Loaded demo surveys:', surveySummary)

      setIsLoaded(true)

      // Reload page to show new data
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error('Error loading demo data:', error)
      alert('Failed to load demo data. Check console for details.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoaded) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
        <Sparkles className="w-4 h-4 text-green-600" />
        <span className="text-sm text-green-700 font-medium">
          Demo project created! (4 interviews + 3 surveys) Refreshing...
        </span>
      </div>
    )
  }

  return (
    <Button
      onClick={handleLoadDemoData}
      disabled={isLoading}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      {isLoading ? 'Loading...' : 'Load Demo Data'}
    </Button>
  )
}
