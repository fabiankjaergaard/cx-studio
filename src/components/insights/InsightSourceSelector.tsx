'use client'

import { useState, useEffect } from 'react'
import { ImportableResearchData } from '@/types/insight-import'
import { JourneyMapData } from '@/types/journey-map'
import { FileText, Users, MessageSquare, Star, Target, TrendingUp, Check, ChevronDown, ChevronRight, Folder, Sparkles, Bell } from 'lucide-react'
import { generateMockResearchData } from '@/utils/generateMockResearchData'
import { Button } from '@/components/ui/Button'
import { getSavedResearchProjects, type ResearchProject } from '@/services/researchProjectStorage'

interface InsightSourceSelectorProps {
  availableResearchData: ImportableResearchData[]
  journeyMap: JourneyMapData
  onSelect: (sources: ImportableResearchData[]) => void
  onBack?: () => void
}

// Icon mapping for different source types
const getSourceIcon = (type: string) => {
  switch (type) {
    case 'nps':
      return Star
    case 'csat':
      return TrendingUp
    case 'ces':
      return Target
    case 'interview':
      return Users
    case 'survey':
      return MessageSquare
    default:
      return FileText
  }
}

// Color mapping for different source types - using design system colors
const getSourceColor = (type: string) => {
  switch (type) {
    case 'nps':
      return 'bg-[#ED6B5A]/10 text-[#ED6B5A] border-[#ED6B5A]/20'
    case 'csat':
      return 'bg-[#778DB0]/10 text-[#778DB0] border-[#778DB0]/20'
    case 'ces':
      return 'bg-[#F5C26B]/10 text-[#F5C26B] border-[#F5C26B]/20'
    case 'interview':
      return 'bg-[#77BB92]/10 text-[#77BB92] border-[#77BB92]/20'
    case 'survey':
      return 'bg-[#C8A4D4]/10 text-[#C8A4D4] border-[#C8A4D4]/20'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

export function InsightSourceSelector({
  availableResearchData,
  journeyMap,
  onSelect,
  onBack
}: InsightSourceSelectorProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['interviews', 'surveys']))

  // Generate contextual mock data based on the journey map
  const mockData: ImportableResearchData[] = generateMockResearchData(journeyMap)

  // Old static mock data (keeping for reference, but not used)
  const _oldMockData: ImportableResearchData[] = [
    {
      id: 'nps-q1-2025',
      type: 'nps',
      name: 'NPS Q1 2025',
      description: 'Net Promoter Score survey from Q1 2025',
      collectedAt: '2025-03-31',
      itemCount: 127,
      data: {
        id: 'nps-q1-2025',
        campaignName: 'NPS Q1 2025',
        collectedAt: '2025-03-31',
        responses: [
          {
            id: 'nps-1',
            score: 4,
            comment: 'Kassan är för komplicerad. Tog mig 10 minuter att slutföra betalningen.',
            respondentId: 'user-123',
            submittedAt: '2025-03-15'
          },
          {
            id: 'nps-2',
            score: 3,
            comment: 'Kan inte hitta information om leveranstider. Väldigt frustrerande!',
            respondentId: 'user-456',
            submittedAt: '2025-03-18'
          },
          {
            id: 'nps-3',
            score: 5,
            comment: 'Supporten svarar aldrig. Har väntat i 3 dagar.',
            respondentId: 'user-789',
            submittedAt: '2025-03-20'
          },
          {
            id: 'nps-4',
            score: 6,
            comment: 'Mobilappen kraschar när jag försöker lägga till betalningsmetod.',
            respondentId: 'user-234',
            submittedAt: '2025-03-22'
          },
          {
            id: 'nps-5',
            score: 9,
            comment: 'Bra produkter men leveransen tar för lång tid.',
            respondentId: 'user-567',
            submittedAt: '2025-03-25'
          },
          {
            id: 'nps-6',
            score: 2,
            comment: 'The checkout process is terrible. Lost my cart twice.',
            respondentId: 'user-890',
            submittedAt: '2025-03-28'
          },
          {
            id: 'nps-7',
            score: 4,
            comment: 'Customer support is unresponsive. Very disappointed.',
            respondentId: 'user-345',
            submittedAt: '2025-03-29'
          }
        ]
      }
    },
    {
      id: 'csat-support-jan',
      type: 'csat',
      name: 'CSAT Support - January',
      description: 'Customer satisfaction scores from support tickets',
      collectedAt: '2025-01-31',
      itemCount: 89,
      data: {
        id: 'csat-support-jan',
        campaignName: 'CSAT Support - January',
        collectedAt: '2025-01-31',
        responses: [
          {
            id: 'csat-1',
            score: 2,
            comment: 'Agent was rude and unhelpful. Waiting time was 45 minutes.',
            respondentId: 'user-111',
            submittedAt: '2025-01-10',
            context: { ticketId: 'TKT-1234', category: 'Billing' }
          },
          {
            id: 'csat-2',
            score: 1,
            comment: 'My issue was not resolved. Had to call three times.',
            respondentId: 'user-222',
            submittedAt: '2025-01-15',
            context: { ticketId: 'TKT-1235', category: 'Technical' }
          },
          {
            id: 'csat-3',
            score: 3,
            comment: 'Tog för lång tid att få svar. Önskar snabbare support.',
            respondentId: 'user-333',
            submittedAt: '2025-01-20',
            context: { ticketId: 'TKT-1236', category: 'General' }
          },
          {
            id: 'csat-4',
            score: 2,
            comment: 'Fick olika svar från olika agenter. Mycket förvirrande.',
            respondentId: 'user-444',
            submittedAt: '2025-01-25',
            context: { ticketId: 'TKT-1237', category: 'Account' }
          }
        ]
      }
    },
    {
      id: 'interview-user-2025-01-15',
      type: 'interview',
      name: 'User Interview - Sarah M.',
      description: 'In-depth interview about checkout experience',
      collectedAt: '2025-01-15',
      itemCount: 12,
      data: {
        id: 'interview-user-2025-01-15',
        interviewName: 'User Interview - Sarah M.',
        conductedAt: '2025-01-15',
        participant: { id: 'sarah-m', name: 'Sarah M.' },
        highlights: [
          {
            id: 'hl-1',
            quote: 'The checkout page is so confusing. I can never find the promo code field.',
            topic: 'Checkout experience',
            timestamp: '00:05:30',
            sentiment: 'negative',
            tags: ['checkout', 'usability', 'promo-code']
          },
          {
            id: 'hl-2',
            quote: 'I love the product recommendations during shopping, very helpful.',
            topic: 'Product discovery',
            timestamp: '00:12:45',
            sentiment: 'positive',
            tags: ['recommendations', 'shopping']
          },
          {
            id: 'hl-3',
            quote: 'Delivery tracking is non-existent. I have no idea when my order will arrive.',
            topic: 'Post-purchase',
            timestamp: '00:18:20',
            sentiment: 'negative',
            tags: ['delivery', 'tracking', 'communication']
          },
          {
            id: 'hl-4',
            quote: 'The mobile app keeps logging me out. So annoying!',
            topic: 'Technical issues',
            timestamp: '00:23:10',
            sentiment: 'negative',
            tags: ['mobile', 'authentication', 'bug']
          }
        ]
      }
    }
  ]

  const dataToShow = availableResearchData.length > 0 ? availableResearchData : mockData

  // Load projects
  const [projects, setProjects] = useState<ResearchProject[]>([])
  useEffect(() => {
    const loadedProjects = getSavedResearchProjects()
    setProjects(loadedProjects)
  }, [])

  // Group data by project and type
  const itemsWithoutProject = dataToShow.filter(item => {
    return !item.folderId
  })

  const getItemsForProject = (projectId: string) => {
    return dataToShow.filter(item => {
      return item.folderId === projectId
    })
  }

  const groupByType = (items: ImportableResearchData[]) => {
    return items.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = []
      }
      acc[item.type].push(item)
      return acc
    }, {} as Record<string, ImportableResearchData[]>)
  }

  // Handler functions
  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedIds)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedIds(newSelection)
  }

  const selectAllInGroup = (items: ImportableResearchData[]) => {
    const newSelection = new Set(selectedIds)
    items.forEach(item => newSelection.add(item.id))
    setSelectedIds(newSelection)
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const clearSelection = () => {
    setSelectedIds(new Set())
  }

  const handleContinue = () => {
    const selected = dataToShow.filter(item => selectedIds.has(item.id))
    if (selected.length > 0) {
      onSelect(selected)
    }
  }

  // Render helper for individual item
  const renderItem = (source: ImportableResearchData) => {
    const Icon = getSourceIcon(source.type)
    const colorClass = getSourceColor(source.type)
    const isSelected = selectedIds.has(source.id)

    return (
      <button
        key={source.id}
        onClick={() => toggleSelection(source.id)}
        className={`w-full text-left p-3 border-2 rounded-lg hover:shadow-sm transition-all duration-200 group ${
          isSelected ? 'border-[#778DB0] bg-[#778DB0]/5' : 'border-gray-200 hover:border-[#778DB0]'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
            isSelected ? 'bg-[#778DB0] border-[#778DB0]' : 'border-gray-300 group-hover:border-[#778DB0]'
          }`}>
            {isSelected && <Check className="w-3 h-3 text-white" />}
          </div>

          {/* Icon */}
          <div className={`w-10 h-10 rounded-lg ${colorClass} border flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className="text-sm font-semibold text-[#2E2E2E] group-hover:text-[#778DB0] transition-colors truncate">
                {source.name}
              </h4>
              <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 uppercase flex-shrink-0">
                {source.type}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#8A8A8A]">
              <span>{source.itemCount} items</span>
              <span>•</span>
              <span>{new Date(source.collectedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </button>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">
          Select Research Data
        </h3>
        <p className="text-sm text-[#8A8A8A]">
          Choose from your research projects or individual studies. Select multiple sources to analyze together.
        </p>
      </div>

      {dataToShow.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 font-medium mb-2">No research data available</p>
          <p className="text-sm text-gray-500">
            Load demo data or import research from the Research section
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Research Projects */}
          {projects.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
              <Folder className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-600 font-medium mb-1">No research projects yet</p>
              <p className="text-xs text-gray-500">Create a project to organize your research</p>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map(project => {
                const projectItems = getItemsForProject(project.id)
                const groupedItems = groupByType(projectItems)
                const isProjectExpanded = selectedProjectId === project.id

                return (
                  <div key={project.id} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                    {/* Project Header */}
                    <button
                      onClick={() => setSelectedProjectId(isProjectExpanded ? null : project.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#778DB0]/10 border-2 border-[#778DB0]/20 flex items-center justify-center">
                          <Folder className="w-5 h-5 text-[#778DB0]" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-[#2E2E2E]">{project.name}</h4>
                          <p className="text-xs text-[#8A8A8A]">{projectItems.length} items</p>
                        </div>
                      </div>
                      {isProjectExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {/* Project Content - Grouped by Type */}
                    {isProjectExpanded && (
                      <div className="border-t-2 border-gray-200 bg-gray-50/50">
                        {Object.entries(groupedItems).map(([type, items]) => {
                          const isExpanded = expandedSections.has(`${project.id}-${type}`)
                          const typeName = type === 'interview' ? 'Interviews' : type === 'survey' ? 'Surveys' : type.toUpperCase()

                          // Get new items of this type (items without folderId)
                          const newItemsOfType = itemsWithoutProject.filter(item => item.type === type)
                          const hasNewItems = newItemsOfType.length > 0
                          const newItemsSectionKey = `${project.id}-${type}-new`
                          const isNewItemsExpanded = expandedSections.has(newItemsSectionKey)

                          // All items to select (project items + new items)
                          const allItemsOfType = [...items, ...newItemsOfType]

                          return (
                            <div key={type} className="border-b-2 border-gray-200 last:border-b-0">
                              {/* Type Header */}
                              <div className="p-3 bg-white flex items-center justify-between">
                                <button
                                  onClick={() => toggleSection(`${project.id}-${type}`)}
                                  className="flex items-center gap-2 flex-1"
                                >
                                  {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-500" />
                                  )}
                                  <span className="text-sm font-semibold text-[#2E2E2E]">
                                    {typeName} ({allItemsOfType.length})
                                  </span>
                                  {hasNewItems && (
                                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#778DB0]/10 border border-[#778DB0]/30">
                                      <Bell className="w-3 h-3 text-[#778DB0]" />
                                      <span className="text-xs font-semibold text-[#778DB0]">
                                        {newItemsOfType.length} new
                                      </span>
                                    </div>
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    selectAllInGroup(allItemsOfType)
                                  }}
                                  className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
                                >
                                  Select all
                                </button>
                              </div>

                              {/* Type Items */}
                              {isExpanded && (
                                <div className="p-3 space-y-2 bg-gray-50">
                                  {/* New Items Section */}
                                  {hasNewItems && (
                                    <div className="border-2 border-[#778DB0]/30 rounded-lg bg-[#778DB0]/5 overflow-hidden">
                                      <button
                                        onClick={() => toggleSection(newItemsSectionKey)}
                                        className="w-full p-2 flex items-center gap-2 hover:bg-[#778DB0]/10 transition-colors"
                                      >
                                        {isNewItemsExpanded ? (
                                          <ChevronDown className="w-4 h-4 text-[#778DB0]" />
                                        ) : (
                                          <ChevronRight className="w-4 h-4 text-[#778DB0]" />
                                        )}
                                        <Sparkles className="w-4 h-4 text-[#778DB0]" />
                                        <span className="text-sm font-semibold text-[#778DB0]">
                                          New Items ({newItemsOfType.length})
                                        </span>
                                      </button>
                                      {isNewItemsExpanded && (
                                        <div className="p-2 space-y-2">
                                          {newItemsOfType.map(item => renderItem(item))}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Project Items */}
                                  {items.map(item => renderItem(item))}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Footer with Continue button */}
      {dataToShow.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
          <div className="flex-1">
            {selectedIds.size === 0 ? (
              <p className="text-sm text-[#8A8A8A]">
                Select research data from your projects
              </p>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#778DB0] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#778DB0]">
                    {selectedIds.size} source{selectedIds.size !== 1 ? 's' : ''} selected
                  </p>
                  <p className="text-xs text-[#8A8A8A]">
                    Ready to analyze and generate insights
                  </p>
                </div>
              </div>
            )}
          </div>
          <Button
            onClick={handleContinue}
            disabled={selectedIds.size === 0}
            className="bg-[#778DB0] hover:bg-[#778DB0]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedIds.size === 0 ? 'Select data to continue' : `Analyze ${selectedIds.size} source${selectedIds.size !== 1 ? 's' : ''}`}
          </Button>
        </div>
      )}
    </div>
  )
}
