'use client'

import { useState } from 'react'
import { GeneratedInsight } from '@/types/insight-import'
import { JourneyMapData } from '@/types/journey-map'
import { Check, ChevronDown, ChevronUp, Lightbulb, AlertTriangle, Target, Sparkles, Hash } from 'lucide-react'

interface InsightPlacementCardProps {
  insight: GeneratedInsight
  journeyMap: JourneyMapData
  isSelected: boolean
  onToggle: () => void
  selectedCellId: string
  onPlacementChange: (cellId: string) => void
}

export function InsightPlacementCard({
  insight,
  journeyMap,
  isSelected,
  onToggle,
  selectedCellId,
  onPlacementChange
}: InsightPlacementCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const topSuggestion = insight.suggestedPlacements?.[0]
  const confidence = topSuggestion?.confidence || 0
  const confidencePercent = Math.round(confidence * 100)

  // Get stage and row info
  const getStageName = (stageId: string) => {
    return journeyMap.stages.find(s => s.id === stageId)?.name || stageId
  }

  const getRowName = (rowId: string) => {
    return journeyMap.rows.find(r => r.id === rowId)?.category || rowId
  }

  // Confidence badge color
  const getConfidenceBadge = () => {
    if (confidence >= 0.7) {
      return {
        bg: 'bg-[#77BB92]/10',
        text: 'text-[#77BB92]',
        border: 'border-[#77BB92]/30',
        label: 'High',
        icon: Check
      }
    } else if (confidence >= 0.5) {
      return {
        bg: 'bg-[#778DB0]/10',
        text: 'text-[#778DB0]',
        border: 'border-[#778DB0]/30',
        label: 'Medium',
        icon: Target
      }
    } else {
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-600',
        border: 'border-gray-300',
        label: 'Low',
        icon: AlertTriangle
      }
    }
  }

  const confidenceBadge = getConfidenceBadge()
  const ConfidenceIcon = confidenceBadge.icon

  // Severity badge color
  const getSeverityColor = () => {
    if (insight.severity >= 4) return 'bg-[#C45A49] text-white'
    if (insight.severity === 3) return 'bg-amber-500 text-white'
    return 'bg-gray-400 text-white'
  }

  return (
    <div className={`border-2 rounded-xl transition-all duration-200 ${
      isSelected
        ? 'border-[#778DB0] bg-[#778DB0]/5'
        : 'border-gray-200 bg-white hover:border-gray-300'
    }`}>
      {/* Main content */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={onToggle}
            className="flex-shrink-0 mt-1"
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              isSelected
                ? 'bg-[#778DB0] border-[#778DB0]'
                : 'border-gray-300 hover:border-[#778DB0]'
            }`}>
              {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
            </div>
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title & badges */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#2E2E2E] mb-1 line-clamp-2">
                  {insight.title}
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Severity */}
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getSeverityColor()}`}>
                    Severity {insight.severity}/5
                  </span>
                  {/* Source */}
                  {insight.source && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase">
                      {insight.source.type}
                    </span>
                  )}
                  {/* Generation method badge */}
                  {insight.generationMethod && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      insight.generationMethod === 'ai'
                        ? 'bg-[#778DB0]/10 text-[#778DB0]'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {insight.generationMethod === 'ai' ? (
                        <>
                          <Sparkles className="w-3 h-3" />
                          AI
                        </>
                      ) : (
                        <>
                          <Hash className="w-3 h-3" />
                          Keyword
                        </>
                      )}
                    </span>
                  )}
                  {/* Evidence count */}
                  {insight.evidence.length > 0 && (
                    <span className="text-xs text-[#8A8A8A]">
                      {insight.evidence.length} evidence point{insight.evidence.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>

              {/* Confidence badge */}
              {topSuggestion && (
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${confidenceBadge.bg} ${confidenceBadge.border}`}>
                  <ConfidenceIcon className={`w-3.5 h-3.5 ${confidenceBadge.text}`} />
                  <div className="text-right">
                    <div className={`text-xs font-bold ${confidenceBadge.text}`}>{confidencePercent}%</div>
                    <div className="text-[10px] text-gray-500">{confidenceBadge.label}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Summary preview */}
            <p className="text-sm text-[#8A8A8A] line-clamp-2 mb-3">
              {insight.summary}
            </p>

            {/* Suggested placement */}
            {topSuggestion && (
              <div className="flex items-center gap-2 p-3 bg-[#778DB0]/5 border border-[#778DB0]/20 rounded-lg">
                <Lightbulb className="w-4 h-4 text-[#778DB0] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="text-xs font-medium text-[#2E2E2E]">
                      Suggested placement
                    </div>
                    {topSuggestion.method && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 ${
                        topSuggestion.method === 'ai'
                          ? 'bg-[#778DB0]/10 text-[#778DB0]'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {topSuggestion.method === 'ai' ? (
                          <>
                            <Sparkles className="w-2.5 h-2.5" />
                            AI
                          </>
                        ) : (
                          <>
                            <Hash className="w-2.5 h-2.5" />
                            Keyword
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#8A8A8A]">
                    <span className="font-medium text-[#778DB0]">
                      {getStageName(topSuggestion.stageId)}
                    </span>
                    {' → '}
                    <span className="font-medium text-[#778DB0]">
                      {getRowName(topSuggestion.rowId)}
                    </span>
                  </div>
                  {topSuggestion.reason && (
                    <div className="text-[10px] text-[#8A8A8A] mt-1 line-clamp-1">
                      {topSuggestion.reason}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Expand/collapse for more details */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-xs text-[#778DB0] hover:text-[#6a7fa0] font-medium mt-3 transition-colors"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  Show more
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {/* Full summary */}
          <div className="mb-4">
            <h5 className="text-xs font-semibold text-[#2E2E2E] mb-2 uppercase tracking-wide">
              Full feedback
            </h5>
            <p className="text-sm text-[#8A8A8A] leading-relaxed">
              {insight.summary}
            </p>
          </div>

          {/* Evidence */}
          {insight.evidence.length > 0 && (
            <div className="mb-4">
              <h5 className="text-xs font-semibold text-[#2E2E2E] mb-2 uppercase tracking-wide">
                Evidence ({insight.evidence.length})
              </h5>
              <div className="space-y-2">
                {insight.evidence.slice(0, 2).map((ev) => (
                  <div key={ev.id} className="p-3 bg-white border border-gray-200 rounded-lg text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-[#2E2E2E]">{ev.source}</span>
                      <span className="text-[10px] text-gray-500 uppercase">{ev.type}</span>
                    </div>
                    {ev.text && (
                      <p className="text-[#8A8A8A] italic">"{ev.text}"</p>
                    )}
                    {ev.value !== undefined && (
                      <p className="text-[#2E2E2E] font-medium">
                        Score: {ev.value}{ev.unit ? ` (${ev.unit})` : ''}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alternative placements */}
          {insight.suggestedPlacements && insight.suggestedPlacements.length > 1 && (
            <div>
              <h5 className="text-xs font-semibold text-[#2E2E2E] mb-2 uppercase tracking-wide">
                Alternative placements
              </h5>
              <div className="space-y-2">
                {insight.suggestedPlacements.slice(1, 3).map((suggestion, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-lg hover:border-[#778DB0] transition-colors cursor-pointer"
                    onClick={() => onPlacementChange(suggestion.cellId)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-xs">
                        <span className="font-medium text-[#2E2E2E]">
                          {getStageName(suggestion.stageId)}
                        </span>
                        {' → '}
                        <span className="font-medium text-[#2E2E2E]">
                          {getRowName(suggestion.rowId)}
                        </span>
                      </div>
                      {suggestion.method && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                          suggestion.method === 'ai'
                            ? 'bg-[#778DB0]/10 text-[#778DB0]'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {suggestion.method === 'ai' ? (
                            <>
                              <Sparkles className="w-2 h-2" />
                              AI
                            </>
                          ) : (
                            <>
                              <Hash className="w-2 h-2" />
                              KW
                            </>
                          )}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#8A8A8A]">
                      {Math.round(suggestion.confidence * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
