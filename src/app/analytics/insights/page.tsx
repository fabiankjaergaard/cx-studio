'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Filter, SlidersHorizontal, Grid3x3, List, AlertCircle, Lightbulb, CheckCircle2, AlertTriangle, Circle, Settings } from 'lucide-react'
import { Insight } from '@/types/journey-map'
import { Button } from '@/components/ui/Button'
import { InsightDetailsDrawer } from '@/components/journey-map/InsightDetailsDrawer'

export default function InsightsLibraryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [severityFilter, setSeverityFilter] = useState<number[]>([])
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [sourceFilter, setSourceFilter] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Drawer state
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // In a real app, this would fetch from an API or global state
  // For now, we'll use localStorage to get insights from all journey maps
  const [insights, setInsights] = useState<Insight[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Load insights from localStorage on mount and when refreshTrigger changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoading(true)

      try {
        const savedMaps = localStorage.getItem('cx-app-journey-maps')

        if (savedMaps) {
          const maps = JSON.parse(savedMaps)
          const allInsights: Insight[] = []

          // Extract insights from all saved journey maps (array format)
          if (Array.isArray(maps)) {
            maps.forEach((map: any) => {
              if (map.insights && Array.isArray(map.insights)) {
                allInsights.push(...map.insights)
              }
            })
          }

          console.log(`[Insights Library] Loaded ${allInsights.length} insights from ${maps.length} journey maps`, allInsights)
          setInsights(allInsights)
        } else {
          console.log('[Insights Library] No journey maps found in localStorage')
          setInsights([])
        }
      } catch (error) {
        console.error('[Insights Library] Error loading insights:', error)
        setInsights([])
      } finally {
        setIsLoading(false)
      }
    }
  }, [refreshTrigger])

  // Listen for journey map updates and automatically refresh insights
  useEffect(() => {
    const handleJourneyMapsUpdated = (event: Event) => {
      const customEvent = event as CustomEvent
      console.log('[Insights Library] Journey maps updated:', customEvent.detail)
      // Trigger a refresh of insights
      setRefreshTrigger(prev => prev + 1)
    }

    window.addEventListener('journey-maps-updated', handleJourneyMapsUpdated)

    return () => {
      window.removeEventListener('journey-maps-updated', handleJourneyMapsUpdated)
    }
  }, [])

  // Filter and search insights
  const filteredInsights = useMemo(() => {
    return insights.filter(insight => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = insight.title.toLowerCase().includes(query)
        const matchesSummary = insight.summary.toLowerCase().includes(query)
        if (!matchesTitle && !matchesSummary) return false
      }

      // Severity filter
      if (severityFilter.length > 0 && !severityFilter.includes(insight.severity)) {
        return false
      }

      // Status filter
      if (statusFilter.length > 0) {
        if (!insight.status && !statusFilter.includes('todo')) return false
        if (insight.status && !statusFilter.includes(insight.status)) return false
      }

      // Source filter
      if (sourceFilter.length > 0) {
        if (!insight.source || !sourceFilter.includes(insight.source.type)) return false
      }

      return true
    })
  }, [insights, searchQuery, severityFilter, statusFilter, sourceFilter])

  const stats = {
    total: insights.length,
    todo: insights.filter(i => !i.status || i.status === 'todo').length,
    inProgress: insights.filter(i => i.status === 'in-progress').length,
    done: insights.filter(i => i.status === 'done').length,
    critical: insights.filter(i => i.severity >= 4).length
  }

  const handleInsightClick = (insight: Insight) => {
    setSelectedInsight(insight)
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
    // Refresh insights after a brief delay to ensure localStorage has updated
    setTimeout(() => {
      setRefreshTrigger(prev => prev + 1)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#2E2E2E] mb-2">Insights Library</h1>
              <p className="text-[#8A8A8A]">
                All insights across your journey maps in one place
              </p>
            </div>

            {/* View mode toggle */}
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#778DB0] shadow-sm'
                    : 'text-[#8A8A8A] hover:text-[#2E2E2E]'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-[#778DB0] shadow-sm'
                    : 'text-[#8A8A8A] hover:text-[#2E2E2E]'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="text-2xl font-bold text-[#2E2E2E] mb-1">
                {isLoading ? '—' : stats.total}
              </div>
              <div className="text-sm text-[#8A8A8A]">Total Insights</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="text-2xl font-bold text-[#2E2E2E] mb-1">
                {isLoading ? '—' : stats.todo}
              </div>
              <div className="text-sm text-[#8A8A8A]">To Do</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="text-2xl font-bold text-[#2E2E2E] mb-1">
                {isLoading ? '—' : stats.inProgress}
              </div>
              <div className="text-sm text-[#8A8A8A]">In Progress</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="text-2xl font-bold text-[#2E2E2E] mb-1">
                {isLoading ? '—' : stats.done}
              </div>
              <div className="text-sm text-[#8A8A8A]">Done</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="text-2xl font-bold text-[#2E2E2E] mb-1">
                {isLoading ? '—' : stats.critical}
              </div>
              <div className="text-sm text-[#8A8A8A]">Critical</div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A]" />
              <input
                type="text"
                placeholder="Search insights by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#778DB0] focus:border-transparent"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 border rounded-lg flex items-center gap-2 transition-colors ${
                showFilters
                  ? 'bg-[#778DB0] text-white border-[#778DB0]'
                  : 'bg-white text-[#2E2E2E] border-gray-300 hover:border-[#778DB0]'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {(severityFilter.length > 0 || statusFilter.length > 0 || sourceFilter.length > 0) && (
                <span className="bg-white text-[#778DB0] px-2 py-0.5 rounded-full text-xs font-semibold">
                  {severityFilter.length + statusFilter.length + sourceFilter.length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-3 gap-6">
                {/* Severity Filter */}
                <div>
                  <label className="block text-sm font-semibold text-[#2E2E2E] mb-3">Severity</label>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(severity => (
                      <label key={severity} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={severityFilter.includes(severity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSeverityFilter([...severityFilter, severity])
                            } else {
                              setSeverityFilter(severityFilter.filter(s => s !== severity))
                            }
                          }}
                          className="w-4 h-4 accent-[#778DB0] rounded border-gray-300 focus:ring-[#778DB0]"
                        />
                        <span className="text-sm text-[#2E2E2E] flex items-center gap-2">
                          {severity === 5 && <><AlertTriangle className="w-4 h-4 text-[#8A8A8A]" /> Critical (5)</>}
                          {severity === 4 && <><AlertTriangle className="w-4 h-4 text-[#8A8A8A]" /> High (4)</>}
                          {severity === 3 && <><AlertCircle className="w-4 h-4 text-[#8A8A8A]" /> Medium (3)</>}
                          {severity === 2 && <><Circle className="w-4 h-4 text-[#8A8A8A]" /> Low (2)</>}
                          {severity === 1 && <><Circle className="w-4 h-4 text-[#8A8A8A]" /> Minor (1)</>}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-semibold text-[#2E2E2E] mb-3">Status</label>
                  <div className="space-y-2">
                    {['todo', 'in-progress', 'done'].map(status => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={statusFilter.includes(status)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setStatusFilter([...statusFilter, status])
                            } else {
                              setStatusFilter(statusFilter.filter(s => s !== status))
                            }
                          }}
                          className="w-4 h-4 accent-[#778DB0] rounded border-gray-300 focus:ring-[#778DB0]"
                        />
                        <span className="text-sm text-[#2E2E2E] capitalize flex items-center gap-2">
                          {status === 'todo' && <><Lightbulb className="w-4 h-4 text-[#8A8A8A]" /> To Do</>}
                          {status === 'in-progress' && <><Settings className="w-4 h-4 text-[#8A8A8A]" /> In Progress</>}
                          {status === 'done' && <><CheckCircle2 className="w-4 h-4 text-[#8A8A8A]" /> Done</>}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Source Filter */}
                <div>
                  <label className="block text-sm font-semibold text-[#2E2E2E] mb-3">Source</label>
                  <div className="space-y-2">
                    {['nps', 'csat', 'ces', 'interview', 'survey', 'manual'].map(source => (
                      <label key={source} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sourceFilter.includes(source)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSourceFilter([...sourceFilter, source])
                            } else {
                              setSourceFilter(sourceFilter.filter(s => s !== source))
                            }
                          }}
                          className="w-4 h-4 accent-[#778DB0] rounded border-gray-300 focus:ring-[#778DB0]"
                        />
                        <span className="text-sm text-[#2E2E2E] uppercase">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(severityFilter.length > 0 || statusFilter.length > 0 || sourceFilter.length > 0) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setSeverityFilter([])
                      setStatusFilter([])
                      setSourceFilter([])
                    }}
                    className="text-sm text-[#778DB0] hover:text-[#6a7fa0] font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#778DB0] mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">Loading insights...</h3>
            <p className="text-[#8A8A8A]">Please wait while we load your insights</p>
          </div>
        ) : filteredInsights.length === 0 ? (
          <div className="text-center py-12">
            <Lightbulb className="w-16 h-16 text-[#8A8A8A] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">No insights found</h3>
            <p className="text-[#8A8A8A] mb-6">
              {insights.length === 0
                ? 'Start by importing insights from your journey maps'
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredInsights.map(insight => (
              <InsightCard
                key={insight.id}
                insight={insight}
                viewMode={viewMode}
                onClick={() => handleInsightClick(insight)}
              />
            ))}
          </div>
        )}

        {/* Results count */}
        {!isLoading && filteredInsights.length > 0 && (
          <div className="mt-8 text-center text-sm text-[#8A8A8A]">
            Showing {filteredInsights.length} of {insights.length} insights
          </div>
        )}
      </div>

      {/* Insight Details Drawer */}
      <InsightDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        insight={selectedInsight}
      />
    </div>
  )
}

interface InsightCardProps {
  insight: Insight
  viewMode: 'grid' | 'list'
  onClick: () => void
}

function InsightCard({ insight, viewMode, onClick }: InsightCardProps) {
  const getSeverityColor = (severity: number) => {
    // Using Kustra color system
    if (severity >= 5) return 'bg-[#ED6B5A]/10 text-[#ED6B5A] border-[#ED6B5A]/30' // Coral Orange
    if (severity >= 4) return 'bg-[#ED6B5A]/10 text-[#ED6B5A] border-[#ED6B5A]/30' // Coral Orange
    if (severity >= 3) return 'bg-[#F4C542]/10 text-[#F4C542] border-[#F4C542]/30' // Golden Sun
    if (severity >= 2) return 'bg-[#778DB0]/10 text-[#778DB0] border-[#778DB0]/30' // Calm Blue
    return 'bg-[#8A8A8A]/10 text-[#8A8A8A] border-[#8A8A8A]/30' // Slate Gray
  }

  const getStatusIcon = (status?: string) => {
    if (status === 'done') return <CheckCircle2 className="w-4 h-4" />
    if (status === 'in-progress') return <AlertCircle className="w-4 h-4" />
    return <Lightbulb className="w-4 h-4" />
  }

  const getStatusLabel = (status?: string) => {
    if (status === 'done') return 'Done'
    if (status === 'in-progress') return 'In Progress'
    return 'To Do'
  }

  const getStatusColor = (status?: string) => {
    // Using Kustra color system
    if (status === 'done') return 'bg-[#77BB92]/10 text-[#77BB92] border-[#77BB92]/30' // Mint Green
    if (status === 'in-progress') return 'bg-[#F4C542]/10 text-[#F4C542] border-[#F4C542]/30' // Golden Sun
    return 'bg-[#778DB0]/10 text-[#778DB0] border-[#778DB0]/30' // Calm Blue
  }

  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#2E2E2E] mb-1">{insight.title}</h3>
                <p className="text-sm text-[#8A8A8A] line-clamp-2">{insight.summary}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getSeverityColor(insight.severity)}`}>
                Severity {insight.severity}/5
              </span>
              {insight.source && (
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 uppercase">
                  {insight.source.type}
                </span>
              )}
              <span className="text-xs text-[#8A8A8A]">
                {insight.evidence?.length || 0} evidence point{insight.evidence?.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getStatusColor(insight.status)}`}>
            {getStatusIcon(insight.status)}
            <span className="text-sm font-medium">{getStatusLabel(insight.status)}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getSeverityColor(insight.severity)}`}>
          Severity {insight.severity}/5
        </span>
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border ${getStatusColor(insight.status)}`}>
          {getStatusIcon(insight.status)}
          <span className="text-xs font-medium">{getStatusLabel(insight.status)}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">{insight.title}</h3>
      <p className="text-sm text-[#8A8A8A] mb-4 line-clamp-3">{insight.summary}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          {insight.source && (
            <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 uppercase">
              {insight.source.type}
            </span>
          )}
        </div>
        <span className="text-xs text-[#8A8A8A]">
          {insight.evidence?.length || 0} evidence
        </span>
      </div>
    </div>
  )
}
