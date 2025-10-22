'use client'

import { useState, useEffect } from 'react'
import { GeneratedInsight } from '@/types/insight-import'
import { JourneyMapData } from '@/types/journey-map'
import { Button } from '@/components/ui/Button'
import { InsightPlacementCard } from './InsightPlacementCard'
import { CheckCircle, AlertTriangle, Lightbulb, ChevronLeft, Sparkles, Hash } from 'lucide-react'

interface InsightPlacementReviewProps {
  insights: GeneratedInsight[]
  journeyMap: JourneyMapData
  onAccept: (insights: GeneratedInsight[]) => void
  onBack: () => void
}

export function InsightPlacementReview({
  insights,
  journeyMap,
  onAccept,
  onBack
}: InsightPlacementReviewProps) {
  const [selectedInsights, setSelectedInsights] = useState<Set<string>>(
    new Set(insights.map(i => i.tempId))
  )
  const [insightPlacements, setInsightPlacements] = useState<Map<string, string>>(
    new Map(insights.map(i => [
      i.tempId,
      i.suggestedPlacements?.[0]?.cellId || ''
    ]))
  )

  // Sync selectedInsights when insights prop changes
  useEffect(() => {
    setSelectedInsights(new Set(insights.map(i => i.tempId)))
    setInsightPlacements(new Map(insights.map(i => [
      i.tempId,
      i.suggestedPlacements?.[0]?.cellId || ''
    ])))
  }, [insights])

  const toggleInsight = (insightId: string) => {
    setSelectedInsights(prev => {
      const newSet = new Set(prev)
      if (newSet.has(insightId)) {
        newSet.delete(insightId)
      } else {
        newSet.add(insightId)
      }
      return newSet
    })
  }

  const updatePlacement = (insightId: string, cellId: string) => {
    setInsightPlacements(prev => {
      const newMap = new Map(prev)
      newMap.set(insightId, cellId)
      return newMap
    })
  }

  const handleAcceptAll = () => {
    console.log('📝 [InsightPlacementReview] handleAcceptAll called')
    console.log('📝 [InsightPlacementReview] Total insights:', insights.length)
    console.log('📝 [InsightPlacementReview] Insights tempIds:', insights.map(i => i.tempId))
    console.log('📝 [InsightPlacementReview] Selected insight IDs:', Array.from(selectedInsights))
    const acceptedInsights = insights.filter(i => selectedInsights.has(i.tempId))
    console.log('📝 [InsightPlacementReview] Filtered accepted insights:', acceptedInsights.length, acceptedInsights.map(i => i.title))
    onAccept(acceptedInsights)
  }

  const selectAll = () => {
    setSelectedInsights(new Set(insights.map(i => i.tempId)))
  }

  const deselectAll = () => {
    setSelectedInsights(new Set())
  }

  const highConfidenceCount = insights.filter(
    i => (i.suggestedPlacements?.[0]?.confidence || 0) > 0.7
  ).length
  const mediumConfidenceCount = insights.filter(
    i => {
      const conf = i.suggestedPlacements?.[0]?.confidence || 0
      return conf >= 0.5 && conf <= 0.7
    }
  ).length
  const lowConfidenceCount = insights.filter(
    i => (i.suggestedPlacements?.[0]?.confidence || 0) < 0.5
  ).length

  // Count AI vs Keyword methods
  const aiGeneratedCount = insights.filter(i => i.generationMethod === 'ai').length
  const keywordGeneratedCount = insights.filter(i => i.generationMethod === 'keyword').length
  const aiPlacementsCount = insights.filter(i => i.suggestedPlacements?.[0]?.method === 'ai').length
  const keywordPlacementsCount = insights.filter(i => i.suggestedPlacements?.[0]?.method === 'keyword').length

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-1">
              Review & Place Insights
            </h3>
            <p className="text-sm text-[#8A8A8A]">
              Review the generated insights and their suggested placements
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={selectAll}
              className="text-xs text-[#778DB0] hover:text-[#6a7fa0] font-medium"
            >
              Select all
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={deselectAll}
              className="text-xs text-[#8A8A8A] hover:text-[#2E2E2E] font-medium"
            >
              Deselect all
            </button>
          </div>
        </div>

        {/* Stats - Confidence */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="flex items-center gap-2 p-3 bg-[#77BB92]/10 rounded-lg border border-[#77BB92]/20">
            <CheckCircle className="w-4 h-4 text-[#77BB92]" />
            <div>
              <div className="text-sm font-bold text-[#77BB92]">{highConfidenceCount}</div>
              <div className="text-xs text-[#8A8A8A]">High confidence</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-[#778DB0]/10 rounded-lg border border-[#778DB0]/20">
            <Lightbulb className="w-4 h-4 text-[#778DB0]" />
            <div>
              <div className="text-sm font-bold text-[#778DB0]">{mediumConfidenceCount}</div>
              <div className="text-xs text-[#8A8A8A]">Medium confidence</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg border border-gray-200">
            <AlertTriangle className="w-4 h-4 text-gray-600" />
            <div>
              <div className="text-sm font-bold text-gray-700">{lowConfidenceCount}</div>
              <div className="text-xs text-[#8A8A8A]">Low confidence</div>
            </div>
          </div>
        </div>

        {/* Stats - Methods */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gradient-to-r from-amber-50 to-yellow-100/50 rounded-lg border border-amber-200/60">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-xs font-semibold text-amber-900 uppercase tracking-wide">AI-Powered</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-amber-700">{aiGeneratedCount}</span>
              <span className="text-xs text-amber-600">insights</span>
              <span className="text-gray-400">•</span>
              <span className="text-lg font-bold text-amber-700">{aiPlacementsCount}</span>
              <span className="text-xs text-amber-600">placements</span>
            </div>
          </div>
          <div className="p-3 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-lg border border-slate-200/60">
            <div className="flex items-center gap-2 mb-1">
              <Hash className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-xs font-semibold text-slate-800 uppercase tracking-wide">Keyword-Based</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-700">{keywordGeneratedCount}</span>
              <span className="text-xs text-slate-600">insights</span>
              <span className="text-gray-400">•</span>
              <span className="text-lg font-bold text-slate-700">{keywordPlacementsCount}</span>
              <span className="text-xs text-slate-600">placements</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Scrollable list */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {insights.map((insight) => (
            <InsightPlacementCard
              key={insight.tempId}
              insight={insight}
              journeyMap={journeyMap}
              isSelected={selectedInsights.has(insight.tempId)}
              onToggle={() => toggleInsight(insight.tempId)}
              selectedCellId={insightPlacements.get(insight.tempId) || ''}
              onPlacementChange={(cellId) => updatePlacement(insight.tempId, cellId)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-6 bg-gray-50">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center gap-4">
            <p className="text-sm text-[#8A8A8A]">
              {selectedInsights.size} of {insights.length} insights selected
            </p>
            <Button
              variant="primary"
              onClick={handleAcceptAll}
              disabled={selectedInsights.size === 0}
            >
              Import {selectedInsights.size} Insight{selectedInsights.size !== 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
