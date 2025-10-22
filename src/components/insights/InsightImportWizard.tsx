'use client'

import { useState } from 'react'
import { X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GeneratedInsight, ImportableResearchData, ImportResult } from '@/types/insight-import'
import { JourneyMapData } from '@/types/journey-map'
import { InsightSourceSelector } from './InsightSourceSelector'
import { InsightProcessing } from './InsightProcessing'
import { InsightPlacementReview } from './InsightPlacementReview'

type WizardStep = 'select-source' | 'processing' | 'review'

interface InsightImportWizardProps {
  isOpen: boolean
  onClose: () => void
  journeyMap: JourneyMapData
  onImportComplete: (insights: GeneratedInsight[]) => void
  availableResearchData?: ImportableResearchData[]
}

// Helper function to combine multiple research sources into one
function combineSources(sources: ImportableResearchData[]): ImportableResearchData {
  if (sources.length === 1) {
    return sources[0]
  }

  // Combine all sources into a single dataset
  const sourceNames = sources.map(s => s.name).join(', ')
  const totalItems = sources.reduce((sum, s) => sum + s.itemCount, 0)

  // Combine all data - for interviews, combine highlights; for surveys, combine responses
  const combinedData: any = {
    id: `combined-${sources.map(s => s.id).join('-')}`,
    name: `Combined: ${sourceNames}`,
    sources: sources.map(s => ({ id: s.id, name: s.name, type: s.type }))
  }

  // Merge data based on type
  sources.forEach(source => {
    if (source.type === 'interview' && source.data && 'highlights' in source.data) {
      if (!combinedData.highlights) combinedData.highlights = []
      combinedData.highlights.push(...(source.data.highlights || []))
    } else if ((source.type === 'survey' || source.type === 'nps' || source.type === 'csat') && source.data && 'responses' in source.data) {
      if (!combinedData.responses) combinedData.responses = []
      combinedData.responses.push(...(source.data.responses || []))
    }
  })

  return {
    id: combinedData.id,
    type: sources[0].type, // Use first source type as primary
    name: `${sources.length} Combined Sources`,
    description: `Combined data from: ${sourceNames.substring(0, 100)}${sourceNames.length > 100 ? '...' : ''}`,
    collectedAt: sources[0].collectedAt,
    itemCount: totalItems,
    data: combinedData
  }
}

export function InsightImportWizard({
  isOpen,
  onClose,
  journeyMap,
  onImportComplete,
  availableResearchData = []
}: InsightImportWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>('select-source')
  const [selectedSources, setSelectedSources] = useState<ImportableResearchData[]>([])
  const [generatedInsights, setGeneratedInsights] = useState<GeneratedInsight[]>([])
  const [importResult, setImportResult] = useState<ImportResult | null>(null)

  if (!isOpen) return null

  const handleSourceSelect = (sources: ImportableResearchData[]) => {
    setSelectedSources(sources)
    setCurrentStep('processing')
  }

  const handleProcessingComplete = (result: ImportResult) => {
    setImportResult(result)
    setGeneratedInsights(result.insights)
    setCurrentStep('review')
  }

  const handleAcceptInsights = (insights: GeneratedInsight[]) => {
    console.log('🎯 [InsightImportWizard] handleAcceptInsights received', insights.length, 'insights:', insights.map(i => i.title))
    onImportComplete(insights)
    handleClose()
  }

  const handleClose = () => {
    // Reset state
    setCurrentStep('select-source')
    setSelectedSources([])
    setGeneratedInsights([])
    setImportResult(null)
    onClose()
  }

  const handleBack = () => {
    if (currentStep === 'processing') {
      setCurrentStep('select-source')
      setSelectedSources([])
    } else if (currentStep === 'review') {
      setCurrentStep('select-source')
      setSelectedSources([])
      setGeneratedInsights([])
      setImportResult(null)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Wizard Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col pointer-events-auto animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#778DB0]/5 to-[#778DB0]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#778DB0] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#2E2E2E]">Import Research Insights</h2>
                <p className="text-sm text-[#8A8A8A]">Auto-generate insights from your research data</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress indicator */}
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center justify-between">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  currentStep === 'select-source'
                    ? 'bg-[#778DB0] text-white shadow-lg shadow-[#778DB0]/30'
                    : ['processing', 'review'].includes(currentStep)
                    ? 'bg-[#778DB0] text-white'
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                }`}>
                  1
                </div>
                <span className={`text-xs font-medium transition-colors ${
                  currentStep === 'select-source' ? 'text-[#778DB0]' : 'text-[#8A8A8A]'
                }`}>
                  Select Source
                </span>
              </div>

              {/* Connector line */}
              <div className="flex-1 h-[2px] mx-4 mb-6 relative">
                <div className="absolute inset-0 bg-gray-200 rounded-full" />
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    ['processing', 'review'].includes(currentStep) ? 'bg-[#778DB0]' : 'bg-gray-200'
                  }`}
                  style={{
                    width: ['processing', 'review'].includes(currentStep) ? '100%' : '0%',
                    transition: 'width 0.5s ease-out'
                  }}
                />
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  currentStep === 'processing'
                    ? 'bg-[#778DB0] text-white shadow-lg shadow-[#778DB0]/30'
                    : currentStep === 'review'
                    ? 'bg-[#778DB0] text-white'
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                }`}>
                  2
                </div>
                <span className={`text-xs font-medium transition-colors ${
                  currentStep === 'processing' ? 'text-[#778DB0]' : 'text-[#8A8A8A]'
                }`}>
                  Processing
                </span>
              </div>

              {/* Connector line */}
              <div className="flex-1 h-[2px] mx-4 mb-6 relative">
                <div className="absolute inset-0 bg-gray-200 rounded-full" />
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    currentStep === 'review' ? 'bg-[#778DB0]' : 'bg-gray-200'
                  }`}
                  style={{
                    width: currentStep === 'review' ? '100%' : '0%',
                    transition: 'width 0.5s ease-out'
                  }}
                />
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  currentStep === 'review'
                    ? 'bg-[#778DB0] text-white shadow-lg shadow-[#778DB0]/30'
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                }`}>
                  3
                </div>
                <span className={`text-xs font-medium transition-colors ${
                  currentStep === 'review' ? 'text-[#778DB0]' : 'text-[#8A8A8A]'
                }`}>
                  Review & Place
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {currentStep === 'select-source' && (
              <InsightSourceSelector
                availableResearchData={availableResearchData}
                journeyMap={journeyMap}
                onSelect={handleSourceSelect}
                onBack={currentStep !== 'select-source' ? handleBack : undefined}
              />
            )}

            {currentStep === 'processing' && selectedSources.length > 0 && (
              <InsightProcessing
                researchData={combineSources(selectedSources)}
                journeyMap={journeyMap}
                onComplete={handleProcessingComplete}
                onBack={handleBack}
              />
            )}

            {currentStep === 'review' && (
              <InsightPlacementReview
                insights={generatedInsights}
                journeyMap={journeyMap}
                onAccept={handleAcceptInsights}
                onBack={handleBack}
              />
            )}
          </div>

          {/* Footer - only show on first step */}
          {currentStep === 'select-source' && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-[#8A8A8A]">
                  Select one or multiple research sources to analyze together
                </p>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
