'use client'

import { useState, useEffect } from 'react'
import { X, Lightbulb, AlertTriangle, AlertCircle, CheckCircle, Trash2, Edit, Zap, Clock, Target, TrendingUp, Timer } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Insight } from '@/types/journey-map'
import { ActionSuggestion, generateActionSuggestions, getFallbackActionSuggestions } from '@/services/actionSuggestionGenerator'

interface InsightDetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
  insight: Insight | null
  onRemoveFromCell?: () => void
  onEdit?: () => void
}

type TabType = 'details' | 'actions' | 'activity'

export function InsightDetailsDrawer({
  isOpen,
  onClose,
  insight,
  onRemoveFromCell,
  onEdit
}: InsightDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details')
  const [actionSuggestions, setActionSuggestions] = useState<ActionSuggestion[]>([])
  const [isLoadingActions, setIsLoadingActions] = useState(false)
  const [actionsError, setActionsError] = useState<string | null>(null)
  const [insightStatus, setInsightStatus] = useState<'todo' | 'in-progress' | 'done' | undefined>(insight?.status)

  // Sync insightStatus when insight prop changes
  useEffect(() => {
    setInsightStatus(insight?.status)
  }, [insight])

  // Listen for localStorage updates from other components (bi-directional sync)
  useEffect(() => {
    if (!insight) return

    const handleStorageUpdate = () => {
      // Re-fetch the latest insight data from localStorage
      if (typeof window !== 'undefined') {
        const savedMaps = localStorage.getItem('cx-app-journey-maps')
        if (savedMaps) {
          const maps = JSON.parse(savedMaps)
          if (Array.isArray(maps)) {
            const mapWithInsight = maps.find((m: any) => m.id === insight.journey_id)
            if (mapWithInsight && mapWithInsight.insights) {
              const updatedInsight = mapWithInsight.insights.find((i: Insight) => i.id === insight.id)
              if (updatedInsight) {
                setInsightStatus(updatedInsight.status)
                console.log('[InsightDetailsDrawer] Synced status from localStorage:', updatedInsight.status)
              }
            }
          }
        }
      }
    }

    // Listen to our custom event from journeyMapStorage
    window.addEventListener('journey-maps-updated', handleStorageUpdate)

    return () => {
      window.removeEventListener('journey-maps-updated', handleStorageUpdate)
    }
  }, [insight])

  // Fetch action suggestions when Actions tab is opened
  useEffect(() => {
    if (activeTab === 'actions' && insight && actionSuggestions.length === 0 && !isLoadingActions) {
      fetchActionSuggestions()
    }
  }, [activeTab, insight])

  const fetchActionSuggestions = async () => {
    if (!insight) return

    setIsLoadingActions(true)
    setActionsError(null)

    try {
      const suggestions = await generateActionSuggestions(insight)
      setActionSuggestions(suggestions)
    } catch (error) {
      console.error('Failed to generate action suggestions:', error)
      setActionsError('Failed to generate AI suggestions. Using fallback recommendations.')
      // Use fallback suggestions if AI fails
      setActionSuggestions(getFallbackActionSuggestions(insight))
    } finally {
      setIsLoadingActions(false)
    }
  }

  const handleStatusChange = (newStatus: 'todo' | 'in-progress' | 'done') => {
    if (!insight) return

    setInsightStatus(newStatus)

    // Update insight in localStorage (using correct key and array structure)
    if (typeof window !== 'undefined') {
      const savedMaps = localStorage.getItem('cx-app-journey-maps')
      if (savedMaps) {
        const maps = JSON.parse(savedMaps)

        // Maps is an array, find the map containing this insight
        if (Array.isArray(maps)) {
          const mapWithInsight = maps.find((m: any) => m.id === insight.journey_id)

          if (mapWithInsight && mapWithInsight.insights) {
            // Find and update the insight
            const insightIndex = mapWithInsight.insights.findIndex((i: Insight) => i.id === insight.id)
            if (insightIndex !== -1) {
              mapWithInsight.insights[insightIndex].status = newStatus
              localStorage.setItem('cx-app-journey-maps', JSON.stringify(maps))
              console.log(`✅ Updated insight status to: ${newStatus}`)

              // Dispatch custom event to notify other components
              window.dispatchEvent(new CustomEvent('journey-maps-updated', {
                detail: { action: 'update-insight', journeyMapId: insight.journey_id, insightId: insight.id }
              }))
            }
          }
        }
      }
    }
  }

  if (!isOpen || !insight) return null

  // Get severity info - Using Kustra color system
  const getSeverityInfo = (severity: 1 | 2 | 3 | 4 | 5) => {
    if (severity >= 4) {
      return {
        label: 'Critical',
        description: 'High priority - requires immediate attention',
        icon: AlertTriangle,
        color: 'text-[#C45A49]',
        bgColor: 'bg-[#C45A49]/10',
        borderColor: 'border-[#C45A49]/30'
      }
    }
    if (severity === 3) {
      return {
        label: 'Medium',
        description: 'Should be addressed',
        icon: AlertCircle,
        color: 'text-[#ED6B5A]',
        bgColor: 'bg-[#ED6B5A]/10',
        borderColor: 'border-[#ED6B5A]/30'
      }
    }
    return {
      label: 'Low',
      description: 'Minor issue',
      icon: CheckCircle,
        color: 'text-[#77BB92]',
        bgColor: 'bg-[#77BB92]/10',
        borderColor: 'border-[#77BB92]/30'
    }
  }

  const severityInfo = getSeverityInfo(insight.severity)
  const SeverityIcon = severityInfo.icon

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[500px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#F9FAFB]">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#778DB0]" />
            <h2 className="text-lg font-semibold text-[#2E2E2E]">Insight Details</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#8A8A8A] hover:text-[#2E2E2E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 px-6 bg-white">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'details'
                  ? 'border-[#778DB0] text-[#778DB0]'
                  : 'border-transparent text-[#8A8A8A] hover:text-[#2E2E2E] hover:border-[#778DB0]/30'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              Details
            </button>
            <button
              onClick={() => setActiveTab('actions')}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'actions'
                  ? 'border-[#778DB0] text-[#778DB0]'
                  : 'border-transparent text-[#8A8A8A] hover:text-[#2E2E2E] hover:border-[#778DB0]/30'
              }`}
            >
              <Zap className="w-4 h-4" />
              Actions
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === 'activity'
                  ? 'border-[#778DB0] text-[#778DB0]'
                  : 'border-transparent text-[#8A8A8A] hover:text-[#2E2E2E] hover:border-[#778DB0]/30'
              }`}
            >
              <Clock className="w-4 h-4" />
              Activity
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">{activeTab === 'details' && (
          <>
          {/* Title */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 leading-tight">
              {insight.title}
            </h3>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Severity Level
            </label>
            <div className={`flex items-center gap-4 p-4 rounded-xl border-2 ${severityInfo.bgColor} ${severityInfo.borderColor} shadow-sm`}>
              <div className={`w-12 h-12 rounded-full ${severityInfo.bgColor} border-2 ${severityInfo.borderColor} flex items-center justify-center`}>
                <SeverityIcon className={`w-6 h-6 ${severityInfo.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-lg font-bold ${severityInfo.color}`}>
                    {severityInfo.label}
                  </span>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${severityInfo.bgColor} ${severityInfo.color} border ${severityInfo.borderColor}`}>
                    {insight.severity}/5
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {severityInfo.description}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-3">
              Action Status
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleStatusChange('todo')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                  (!insightStatus || insightStatus === 'todo')
                    ? 'bg-[#778DB0]/10 border-[#778DB0] text-[#778DB0] shadow-sm'
                    : 'bg-white border-gray-200 text-[#8A8A8A] hover:border-[#778DB0]/30'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                <span className="font-semibold text-sm">To Do</span>
              </button>
              <button
                onClick={() => handleStatusChange('in-progress')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                  insightStatus === 'in-progress'
                    ? 'bg-[#ED6B5A]/10 border-[#ED6B5A] text-[#ED6B5A] shadow-sm'
                    : 'bg-white border-gray-200 text-[#8A8A8A] hover:border-[#ED6B5A]/30'
                }`}
              >
                <AlertCircle className="w-4 h-4" />
                <span className="font-semibold text-sm">In Progress</span>
              </button>
              <button
                onClick={() => handleStatusChange('done')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                  insightStatus === 'done'
                    ? 'bg-[#77BB92]/10 border-[#77BB92] text-[#77BB92] shadow-sm'
                    : 'bg-white border-gray-200 text-[#8A8A8A] hover:border-[#77BB92]/30'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span className="font-semibold text-sm">Done</span>
              </button>
            </div>
          </div>

          {/* Description */}
          {insight.summary && (
            <div>
              <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-3">
                Description
              </label>
              <div className="p-4 bg-[#F9FAFB] border border-gray-200 rounded-xl">
                <p className="text-base text-[#2E2E2E] leading-relaxed whitespace-pre-wrap">
                  {insight.summary}
                </p>
              </div>
            </div>
          )}

          {/* Evidence */}
          {insight.evidence && insight.evidence.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-3">
                Evidence <span className="ml-1 text-[#8A8A8A]/60 font-normal">({insight.evidence.length})</span>
              </label>
              <div className="space-y-3">
                {insight.evidence.map((evidence) => (
                  <div
                    key={evidence.id}
                    className="p-4 bg-white border border-gray-200 rounded-xl hover:border-[#778DB0]/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-sm font-semibold text-[#2E2E2E]">
                        {evidence.source}
                      </span>
                      <span className="text-xs text-[#8A8A8A] bg-[#F9FAFB] px-2 py-1 rounded-md font-medium uppercase tracking-wide">
                        {evidence.type}
                      </span>
                    </div>
                    {evidence.text && (
                      <p className="text-sm text-[#2E2E2E] mt-3 italic leading-relaxed border-l-2 border-[#778DB0] pl-3">
                        "{evidence.text}"
                      </p>
                    )}
                    {evidence.value !== undefined && (
                      <div className="text-sm text-[#2E2E2E] mt-3">
                        <span className="font-bold text-lg">{evidence.value}</span>
                        {evidence.unit && (
                          <span className="text-[#8A8A8A] ml-1 font-medium">{evidence.unit}</span>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-[#8A8A8A] mt-3 pt-2 border-t border-gray-100">
                      Collected: {new Date(evidence.collected_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="pt-6 border-t border-gray-200">
            <label className="block text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider mb-2">
              Metadata
            </label>
            <div className="text-sm text-[#8A8A8A] space-y-1 bg-[#F9FAFB] p-3 rounded-lg">
              <p>
                <span className="font-medium text-[#2E2E2E]">Created:</span>{' '}
                {new Date(insight.created_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              {insight.created_by && (
                <p>
                  <span className="font-medium text-[#2E2E2E]">Created by:</span> {insight.created_by}
                </p>
              )}
            </div>
          </div>
          </>
        )}

        {/* Actions Tab */}
        {activeTab === 'actions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#2E2E2E]">Suggested Actions</h3>
              <span className="text-xs bg-[#778DB0]/10 text-[#778DB0] px-2 py-1 rounded-full font-medium flex items-center gap-1 border border-[#778DB0]/20">
                <Zap className="w-3 h-3" />
                AI-Powered
              </span>
            </div>
            <p className="text-sm text-[#8A8A8A]">
              AI-generated action recommendations to address this insight effectively.
            </p>

            {/* Error message */}
            {actionsError && (
              <div className="p-3 bg-[#ED6B5A]/10 border border-[#ED6B5A]/30 rounded-lg">
                <p className="text-sm text-[#ED6B5A]">{actionsError}</p>
              </div>
            )}

            {/* Loading state */}
            {isLoadingActions && (
              <div className="space-y-3 mt-6">
                <div className="p-4 bg-[#F9FAFB] border border-gray-200 rounded-lg">
                  <p className="text-sm text-[#8A8A8A] text-center py-8 flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4 animate-pulse text-[#778DB0]" />
                    Generating AI-powered action suggestions...
                  </p>
                </div>
              </div>
            )}

            {/* Action suggestions */}
            {!isLoadingActions && actionSuggestions.length > 0 && (
              <div className="space-y-3 mt-6">
                {actionSuggestions.map((action, index) => {
                  const priorityColors = {
                    high: 'bg-[#C45A49]/10 text-[#C45A49] border-[#C45A49]/30',
                    medium: 'bg-[#ED6B5A]/10 text-[#ED6B5A] border-[#ED6B5A]/30',
                    low: 'bg-[#77BB92]/10 text-[#77BB92] border-[#77BB92]/30'
                  }

                  const effortColors = {
                    low: 'text-[#77BB92]',
                    medium: 'text-[#ED6B5A]',
                    high: 'text-[#C45A49]'
                  }

                  const impactColors = {
                    low: 'text-[#8A8A8A]',
                    medium: 'text-[#778DB0]',
                    high: 'text-[#77BB92]'
                  }

                  return (
                    <div
                      key={action.id}
                      className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#778DB0] hover:shadow-md transition-all"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-bold text-[#8A8A8A]">#{index + 1}</span>
                            <h4 className="text-base font-bold text-[#2E2E2E]">{action.title}</h4>
                          </div>
                          <p className="text-sm text-[#2E2E2E] leading-relaxed">{action.description}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-md text-xs font-semibold uppercase border ${priorityColors[action.priority]}`}>
                          {action.priority}
                        </span>
                      </div>

                      {/* Metadata */}
                      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <Target className={`w-4 h-4 ${impactColors[action.impact]}`} />
                          <div>
                            <p className="text-xs text-[#8A8A8A]">Impact</p>
                            <p className={`text-sm font-semibold ${impactColors[action.impact]} capitalize`}>{action.impact}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className={`w-4 h-4 ${effortColors[action.effort]}`} />
                          <div>
                            <p className="text-xs text-[#8A8A8A]">Effort</p>
                            <p className={`text-sm font-semibold ${effortColors[action.effort]} capitalize`}>{action.effort}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Timer className="w-4 h-4 text-[#8A8A8A]" />
                          <div>
                            <p className="text-xs text-[#8A8A8A]">Timeframe</p>
                            <p className="text-sm font-semibold text-[#2E2E2E]">{action.estimatedTimeframe}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 flex items-center justify-center text-[#778DB0]">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-xs text-[#8A8A8A]">Category</p>
                            <p className="text-sm font-semibold text-[#2E2E2E] capitalize">{action.category}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#2E2E2E]">Activity Timeline</h3>
            <p className="text-sm text-[#8A8A8A]">
              Track all changes, comments, and updates to this insight.
            </p>

            {/* Placeholder for activity */}
            <div className="space-y-3 mt-6">
              <div className="p-4 bg-[#F9FAFB] border border-gray-200 rounded-lg">
                <p className="text-sm text-[#8A8A8A] text-center py-8">
                  Activity tracking coming soon...
                </p>
              </div>
            </div>
          </div>
        )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-[#F9FAFB] flex gap-3 justify-between">
          <div className="flex gap-3">
            {onRemoveFromCell && (
              <Button
                variant="outline"
                onClick={() => {
                  onRemoveFromCell()
                  onClose()
                }}
                className="flex items-center justify-center gap-2 text-[#ED6B5A] hover:text-[#ED6B5A] hover:bg-[#ED6B5A]/10 border-[#ED6B5A]/30 hover:border-[#ED6B5A]/50 font-medium px-4"
              >
                <Trash2 className="w-4 h-4" />
                Remove from Cell
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            {onEdit && (
              <Button
                variant="outline"
                onClick={() => {
                  onEdit()
                  onClose()
                }}
                className="flex items-center justify-center gap-2 text-[#778DB0] hover:text-[#778DB0] hover:bg-[#778DB0]/10 border-[#778DB0]/30 hover:border-[#778DB0]/50 font-medium px-4"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            )}
            <Button
              variant="primary"
              onClick={onClose}
              className="font-medium px-6 bg-[#778DB0] hover:bg-[#778DB0]/90 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
