'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState, useEffect, Suspense } from 'react'
import { useSidebar } from '@/contexts/SidebarContext'
import { useAuth } from '@/contexts/AuthContext'
import { useGuidedTour } from '@/hooks/useGuidedTour'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from 'next/image'
import {
  MapIcon,
  HomeIcon,
  BookTemplateIcon,
  BarChart3Icon,
  UsersIcon,
  SettingsIcon,
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  LogOutIcon,
  ClipboardIcon,
  RouteIcon,
  HelpCircleIcon,
  TrendingUpIcon,
  StarIcon,
  MessageSquareIcon,
  MicIcon,
  EyeIcon,
  WrenchIcon,
  FileTextIcon,
  PieChartIcon,
  DatabaseIcon,
  BookIcon,
  LightbulbIcon,
  PlusIcon,
  PlayIcon,
  FolderIcon,
  CircleIcon,
  MessageCircleIcon,
  BugIcon,
  SparklesIcon,
  LockIcon,
  CheckCircleIcon,
  ShieldCheckIcon
} from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

function SidebarContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isCollapsed, setIsCollapsed } = useSidebar()
  const { user, signOut } = useAuth()
  const { startTour } = useGuidedTour()
  const { t } = useLanguage()

  const navigation = [
  { name: t('nav.dashboard'), href: '/', icon: HomeIcon, tourId: 'dashboard' },
  { name: t('nav.journeyMaps'), href: '/journey-maps', icon: RouteIcon, tourId: 'journey-maps' },
  { name: t('nav.templates'), href: '/templates', icon: BookTemplateIcon, tourId: 'templates' },
  { name: t('nav.analytics'), href: '/analytics', icon: BarChart3Icon, tourId: 'analytics' },
  {
    name: t('nav.personas'),
    icon: UsersIcon,
    tourId: 'personas',
    isExpandable: true,
    children: [
      { name: t('nav.allPersonas'), href: '/personas', icon: UsersIcon },
      { name: t('nav.createPersona'), href: '/personas/create', icon: PlusIcon },
      { name: t('nav.personaTemplates'), href: '/personas/templates', icon: BookTemplateIcon },
      { name: t('nav.personaGuide'), href: '/personas/guide', icon: BookIcon },
      { name: t('nav.importPersona'), href: '/personas/import', icon: DatabaseIcon }
    ]
  },
  {
    name: t('nav.insights'),
    icon: ClipboardIcon,
    tourId: 'insights',
    isExpandable: true,
    children: [
      { name: 'Research Projects', href: '/research', icon: FolderIcon },
      {
        name: 'Surveys',
        href: '/insights/survey-builder',
        icon: WrenchIcon,
        isExpandable: true,
        children: [
          { name: 'Overview', href: '/insights/survey-builder', icon: HomeIcon },
          { name: 'Create', href: '/insights/survey-builder?tab=create', icon: PlusIcon },
          { name: 'Analyze', href: '/insights/survey-builder?tab=analyze', icon: BarChart3Icon }
        ]
      },
      {
        name: 'Interviews',
        href: '/insights/interview-builder',
        icon: MicIcon,
        isExpandable: true,
        children: [
          { name: 'Overview', href: '/insights/interview-builder', icon: HomeIcon },
          { name: 'Create', href: '/insights/interview-builder?tab=create', icon: PlusIcon },
          { name: 'Conduct', href: '/insights/interview-builder?tab=conduct', icon: PlayIcon },
          { name: 'Analyze', href: '/insights/interview-builder?tab=analyze', icon: BarChart3Icon }
        ]
      },
      {
        name: t('nav.guides'),
        children: [
          { name: t('nav.gettingStarted'), href: '/insights/getting-started', icon: BookIcon },
          { name: t('nav.bestPractices'), href: '/insights/best-practices', icon: BookOpenIcon },
          {
            name: t('nav.quantitativeMethods'),
            icon: BarChart3Icon,
            children: [
              { name: t('nav.npssurveys'), href: '/insights/nps', icon: TrendingUpIcon },
              { name: t('nav.csatSurveys'), href: '/insights/csat', icon: StarIcon },
              { name: t('nav.cesSurveys'), href: '/insights/ces', icon: BarChart3Icon }
            ]
          },
          {
            name: t('nav.qualitativeMethods'),
            icon: MessageSquareIcon,
            children: [
              { name: t('nav.interviews'), href: '/insights/interviews/guide', icon: MicIcon },
              { name: t('nav.focusGroups'), href: '/insights/focus-groups', icon: UsersIcon },
              { name: t('nav.observation'), href: '/insights/observation', icon: EyeIcon }
            ]
          }
        ]
      }
    ]
  },
  { name: t('nav.glossary'), href: '/glossary', icon: BookOpenIcon, tourId: 'glossary' },
  { name: 'Beta Tester', href: '/beta', icon: SparklesIcon, tourId: 'beta-tester' },
  { name: 'Admin', href: '/admin', icon: ShieldCheckIcon, tourId: 'admin' },
  { name: t('nav.settings'), href: '/settings', icon: SettingsIcon, tourId: 'settings' },
]
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({})
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({})
  const [expandedSubItems, setExpandedSubItems] = useState<{[key: string]: boolean}>({})
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [showInsightsPopup, setShowInsightsPopup] = useState(false)

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => {
      const isCurrentlyExpanded = prev[sectionName]
      if (isCurrentlyExpanded) {
        // If clicking on already expanded section, close it
        return {
          ...prev,
          [sectionName]: false
        }
      } else {
        // If opening a new section, close all others and open this one
        const newState: {[key: string]: boolean} = {}
        Object.keys(prev).forEach(key => {
          newState[key] = false
        })
        newState[sectionName] = true
        return newState
      }
    })
  }

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }))
  }

  const toggleSubItem = (subItemName: string) => {
    setExpandedSubItems(prev => ({
      ...prev,
      [subItemName]: !prev[subItemName]
    }))
  }

  // Auto-expand sections based on current pathname
  useEffect(() => {

    const autoExpandSections = () => {
      const newExpandedSections: {[key: string]: boolean} = {}
      const newExpandedCategories: {[key: string]: boolean} = {}
      const newExpandedSubItems: {[key: string]: boolean} = {}

      navigation.forEach((item) => {
        if (item.isExpandable && item.children) {
          // Check if we're in this main section
          const isInSection = item.children.some((category) => {
            if (category.href) {
              // Direct link category (like personas)
              return pathname === category.href || pathname.startsWith(category.href + '?')
            }

            if (category.children) {
              // Category with subcategories
              return category.children.some((subItem) => {
                if (subItem.href) {
                  const isMatch = pathname === subItem.href || pathname.startsWith(subItem.href + '?')
                  if (isMatch && subItem.isExpandable && subItem.children) {
                    // Also expand the sub-item if it has children
                    newExpandedSubItems[subItem.name] = true
                  }
                  return isMatch
                }
                return false
              })
            }
            return false
          })

          if (isInSection) {
            newExpandedSections[item.name] = true

            // Also expand relevant categories
            item.children.forEach((category) => {
              if (category.children) {
                const isInCategory = category.children.some((subItem) => {
                  if (subItem.href) {
                    return pathname === subItem.href || pathname.startsWith(subItem.href + '?')
                  }
                  return false
                })
                if (isInCategory) {
                  newExpandedCategories[category.name] = true
                }
              }
            })
          }
        }
      })

      setExpandedSections(newExpandedSections)
      setExpandedCategories(newExpandedCategories)
      setExpandedSubItems(newExpandedSubItems)
    }

    autoExpandSections()
  }, [pathname, t])


  return (
    <div className={cn(
      "flex h-full flex-col bg-white border-r border-gray-200 transition-all duration-300 relative group",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className={cn(
        "flex items-center justify-center border-b border-gray-200 h-20",
        isCollapsed ? "px-2" : "px-6"
      )}>
        <div className="flex items-center justify-center flex-1">
          {!isCollapsed ? (
            <Link href="/" className="cursor-pointer">
              <img
                src="/Kustra.png"
                alt="Kustra"
                className="h-24 w-auto object-contain max-w-[300px] hover:opacity-80 transition-opacity"
              />
            </Link>
          ) : (
            <Link href="/" className="cursor-pointer">
              <img
                src="/nava small.png"
                alt="Nava Small"
                className="h-16 w-12 object-contain hover:opacity-80 transition-opacity"
              />
            </Link>
          )}
        </div>
      </div>
      
      {/* Collapse/Expand Button - appears on hover as a circle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 -translate-y-1/2 -right-2 w-6 h-6 bg-white border-2 border-gray-300 rounded-full hover:border-gray-500 transition-all duration-200 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100"
        title={isCollapsed ? "Expand menu" : "Minimize menu"}
        style={{ zIndex: 10 }}
      >
        {isCollapsed ? (
          <ChevronRightIcon className="h-3 w-3 text-gray-600" />
        ) : (
          <ChevronLeftIcon className="h-3 w-3 text-gray-600" />
        )}
      </button>
      
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            
            // Handle expandable items (like Insights)
            if (item.isExpandable && item.children) {
              const isExpanded = expandedSections[item.name]
              
              return (
                <li key={item.name}>
                  {/* Main expandable item */}
                  {item.href ? (
                    // If item has href, render as Link with expand button
                    <div className="flex items-center w-full">
                      <Link
                        href={item.href}
                        onMouseEnter={() => setHoveredSection(item.name)}
                        onMouseLeave={() => setHoveredSection(null)}
                        data-tour={item.tourId}
                        className={cn(
                          'flex items-center rounded-l-lg text-sm font-medium transition-colors flex-1',
                          isCollapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2',
                          pathname === item.href || pathname.startsWith(item.href + '?')
                            ? 'bg-slate-100 text-slate-700'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        )}
                        title={isCollapsed ? item.name : undefined}
                      >
                        <item.icon
                          className={cn(
                            'h-5 w-5 transition-all duration-300 ease-out',
                            isCollapsed ? 'mx-auto' : 'mr-3',
                            pathname === item.href || pathname.startsWith(item.href + '?')
                              ? 'text-slate-600 scale-110 rotate-12'
                              : 'text-gray-500'
                          )}
                        />
                        {!isCollapsed && <span className="text-left">{item.name}</span>}
                      </Link>
                      {!isCollapsed && (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleSection(item.name)
                          }}
                          className={cn(
                            "px-3 py-2 text-gray-400 hover:text-gray-600 transition-colors rounded-r-lg",
                            pathname === item.href || pathname.startsWith(item.href + '?')
                              ? 'bg-slate-100 hover:bg-slate-200'
                              : 'hover:bg-gray-50'
                          )}
                        >
                          {isExpanded ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )}
                        </button>
                      )}
                    </div>
                  ) : (
                    // If no href, render as button only
                    <button
                      onClick={() => {
                        if (item.name === t('nav.insights')) {
                          setShowInsightsPopup(true)
                        } else {
                          toggleSection(item.name)
                        }
                      }}
                      onMouseEnter={() => setHoveredSection(item.name)}
                      onMouseLeave={() => setHoveredSection(null)}
                      data-tour={item.tourId}
                      className={cn(
                        'w-full flex items-center rounded-lg text-sm font-medium transition-colors',
                        isCollapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2',
                        'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      )}
                      title={isCollapsed ? item.name : undefined}
                    >
                      <item.icon
                        className={cn(
                          'h-5 w-5 transition-all duration-300 ease-out',
                          isCollapsed ? 'mx-auto' : 'mr-3',
                          'text-gray-500',
                          isExpanded && 'scale-110 text-slate-500 rotate-12'
                        )}
                      />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 text-left">{item.name}</span>
                          <div className="flex items-center justify-end space-x-2">
                            {item.name === t('nav.insights') && (
                              <span className="px-1.5 py-0.5 border border-gray-400 text-gray-600 text-[10px] font-medium rounded-full">
                                WIP
                              </span>
                            )}
                            <div className="w-4 h-4 flex items-center justify-center">
                                {isExpanded ? (
                                  <ChevronUpIcon className={cn(
                                    "h-4 w-4 text-gray-400 transition-opacity",
                                    hoveredSection === item.name ? "opacity-100" : "opacity-0"
                                  )} />
                                ) : (
                                  <ChevronDownIcon className={cn(
                                    "h-4 w-4 text-gray-400 transition-opacity",
                                    hoveredSection === item.name ? "opacity-100" : "opacity-0"
                                  )} />
                                )}
                              </div>
                          </div>
                        </>
                      )}
                    </button>
                  )}
                  
                  {/* Expandable content - Level 1: Main categories */}
                  {!isCollapsed && isExpanded && (
                    <div className="mt-2 ml-4 space-y-1">
                      {item.children.map((category) => {
                        // Special handling for personas - render as direct links
                        if (item.name === t('nav.personas') && category.href) {
                          const isSubActive = pathname === category.href || pathname.startsWith(category.href + '?')
                          return (
                            <Link
                              key={category.name}
                              href={category.href}
                              className={cn(
                                'group flex items-center rounded-lg text-sm font-medium transition-colors px-3 py-2',
                                isSubActive
                                  ? 'bg-slate-100 text-slate-700'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              )}
                            >
                              <category.icon
                                className={cn(
                                  'h-4 w-4 transition-colors mr-3',
                                  isSubActive
                                    ? 'text-slate-600'
                                    : 'text-gray-400 group-hover:text-gray-500'
                                )}
                              />
                              {category.name}
                            </Link>
                          )
                        }

                        // Special handling for Research Projects - render as direct link
                        if (category.name === 'Research Projects' && category.href) {
                          const isSubActive = pathname === category.href || pathname.startsWith(category.href + '?')
                          return (
                            <Link
                              key={category.name}
                              href={category.href}
                              className={cn(
                                'group flex items-center rounded-lg text-sm font-medium transition-colors px-3 py-2',
                                isSubActive
                                  ? 'bg-slate-100 text-slate-700'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              )}
                            >
                              {category.name}
                            </Link>
                          )
                        }

                        // Default category handling for other items
                        const isCategoryExpanded = expandedCategories[category.name]
                        return (
                          <div key={category.name}>
                            {/* Category header - clickable to expand/collapse */}
                            <button
                              onClick={() => toggleCategory(category.name)}
                              onMouseEnter={() => setHoveredCategory(category.name)}
                              onMouseLeave={() => setHoveredCategory(null)}
                              className={cn(
                                "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                isCategoryExpanded
                                  ? "bg-slate-100 text-slate-700 border border-slate-200"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              )}
                            >
                              <span className="flex-1 text-left">{category.name}</span>
                              <div className="w-3 h-3 flex items-center justify-center">
                                {isCategoryExpanded ? (
                                  <ChevronUpIcon className={cn(
                                    "h-3 w-3 text-gray-400 transition-opacity",
                                    hoveredCategory === category.name ? "opacity-100" : "opacity-0"
                                  )} />
                                ) : (
                                  <ChevronDownIcon className={cn(
                                    "h-3 w-3 text-gray-400 transition-opacity",
                                    hoveredCategory === category.name ? "opacity-100" : "opacity-0"
                                  )} />
                                )}
                              </div>
                            </button>
                            
                            {/* Level 2: Individual pages under each category */}
                            {isCategoryExpanded && category.children && (
                              <div className="ml-4 mt-1 space-y-1">
                                {category.children.map((subItem) => {
                                  // Better URL matching for tab-based navigation
                                  const isSubActive = (() => {
                                    const currentTab = searchParams.get('tab')

                                    if (subItem.href.includes('?tab=')) {
                                      // For tab-based URLs, match the tab parameter
                                      const itemTab = subItem.href.split('?tab=')[1]
                                      const baseUrl = subItem.href.split('?')[0]
                                      return pathname === baseUrl && currentTab === itemTab
                                    } else {
                                      // For base URLs, match only if no tab parameter is present or tab is null
                                      return pathname === subItem.href && (!currentTab || currentTab === '')
                                    }
                                  })()

                                  // Handle expandable sub-items (like interviews)
                                  if (subItem.isExpandable && subItem.children) {
                                    const isSubItemExpanded = expandedSubItems[subItem.name]

                                    return (
                                      <div key={subItem.name}>
                                        {/* Sub-item header - clickable to expand/collapse */}
                                        <button
                                          onClick={() => toggleSubItem(subItem.name)}
                                          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                                        >
                                          <div className="flex items-center">
                                            <subItem.icon className="h-4 w-4 text-gray-400 mr-3" />
                                            <span className="flex-1 text-left">{subItem.name}</span>
                                          </div>
                                          <div className="w-3 h-3 flex items-center justify-center">
                                            {isSubItemExpanded ? (
                                              <ChevronUpIcon className="h-3 w-3 text-gray-400" />
                                            ) : (
                                              <ChevronDownIcon className="h-3 w-3 text-gray-400" />
                                            )}
                                          </div>
                                        </button>

                                        {/* Level 3: Sub-sub-items under expandable sub-items */}
                                        {isSubItemExpanded && subItem.children && (
                                          <div className="ml-6 mt-1 space-y-1">
                                            {subItem.children.map((subSubItem) => {
                                              // Simple matching logic using current pathname and search params
                                              const currentFullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
                                              const isSubSubActive = currentFullPath === subSubItem.href
                                              return (
                                                <Link
                                                  key={subSubItem.name}
                                                  href={subSubItem.href}
                                                  className={cn(
                                                    'group flex items-center justify-between rounded-lg text-sm font-medium transition-colors px-3 py-2',
                                                    isSubSubActive
                                                      ? 'bg-slate-100 text-slate-700'
                                                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                  )}
                                                >
                                                  <div className="flex items-center">
                                                    <subSubItem.icon
                                                      className={cn(
                                                        'h-4 w-4 transition-colors mr-3',
                                                        isSubSubActive
                                                          ? 'text-slate-600'
                                                          : 'text-gray-400 group-hover:text-gray-500'
                                                      )}
                                                    />
                                                    {subSubItem.name}
                                                  </div>
                                                  {subSubItem.name === 'Analyze' && (
                                                    <LockIcon
                                                      className={cn(
                                                        'h-3 w-3 transition-colors',
                                                        isSubSubActive
                                                          ? 'text-slate-500'
                                                          : 'text-gray-400'
                                                      )}
                                                    />
                                                  )}
                                                </Link>
                                              )
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    )
                                  }

                                  // Handle categories that have only children (no direct href)
                                  if (!subItem.href && subItem.children) {
                                    const isCategoryExpanded = expandedCategories[subItem.name]
                                    return (
                                      <div key={subItem.name}>
                                        {/* Category header - clickable to expand/collapse */}
                                        <button
                                          onClick={() => toggleCategory(subItem.name)}
                                          onMouseEnter={() => setHoveredCategory(subItem.name)}
                                          onMouseLeave={() => setHoveredCategory(null)}
                                          className={cn(
                                            "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                            isCategoryExpanded
                                              ? "bg-slate-100 text-slate-700 border border-slate-200"
                                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                          )}
                                        >
                                          <div className="flex items-center flex-1">
                                            {subItem.icon && (
                                              <subItem.icon className="h-4 w-4 text-gray-400 mr-3" />
                                            )}
                                            <span className="flex-1 text-left">{subItem.name}</span>
                                          </div>
                                          <div className="w-3 h-3 flex items-center justify-center">
                                            {isCategoryExpanded ? (
                                              <ChevronUpIcon className={cn(
                                                "h-3 w-3 text-gray-400 transition-opacity",
                                                hoveredCategory === subItem.name ? "opacity-100" : "opacity-0"
                                              )} />
                                            ) : (
                                              <ChevronDownIcon className={cn(
                                                "h-3 w-3 text-gray-400 transition-opacity",
                                                hoveredCategory === subItem.name ? "opacity-100" : "opacity-0"
                                              )} />
                                            )}
                                          </div>
                                        </button>

                                        {/* Sub-category items */}
                                        {isCategoryExpanded && subItem.children && (
                                          <div className="ml-4 mt-1 space-y-1">
                                            {subItem.children.map((subSubItem) => {
                                              const isSubSubActive = pathname === subSubItem.href || pathname.startsWith(subSubItem.href + '?')
                                              return (
                                                <Link
                                                  key={subSubItem.name}
                                                  href={subSubItem.href}
                                                  className={cn(
                                                    'group flex items-center rounded-lg text-sm font-medium transition-colors px-3 py-2',
                                                    isSubSubActive
                                                      ? 'bg-slate-100 text-slate-700'
                                                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                  )}
                                                >
                                                  <subSubItem.icon
                                                    className={cn(
                                                      'h-4 w-4 transition-colors mr-3',
                                                      isSubSubActive
                                                        ? 'text-slate-600'
                                                        : 'text-gray-400 group-hover:text-gray-500'
                                                    )}
                                                  />
                                                  {subSubItem.name}
                                                </Link>
                                              )
                                            })}
                                          </div>
                                        )}
                                      </div>
                                    )
                                  }

                                  // Handle regular sub-items with href
                                  return (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      className={cn(
                                        'group flex items-center rounded-lg text-sm font-medium transition-colors px-3 py-2',
                                        isSubActive
                                          ? 'bg-slate-100 text-slate-700'
                                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                      )}
                                    >
                                      <subItem.icon
                                        className={cn(
                                          'h-4 w-4 transition-colors mr-3',
                                          isSubActive
                                            ? 'text-slate-600'
                                            : 'text-gray-400 group-hover:text-gray-500'
                                        )}
                                      />
                                      {subItem.name}
                                    </Link>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </li>
              )
            }
            
            // Handle regular menu items
            return (
              <li key={item.name}>
                {item.href ? (
                  <Link
                    href={item.href}
                    data-tour={item.tourId}
                    className={cn(
                      'group flex items-center rounded-lg text-sm font-medium transition-colors',
                      isCollapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2',
                      isActive
                        ? 'bg-slate-100 text-slate-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <item.icon
                      className={cn(
                        'h-5 w-5 transition-all duration-300 ease-out',
                        isCollapsed ? 'mx-auto' : 'mr-3',
                        isActive
                          ? 'text-slate-600 scale-110 rotate-12'
                          : 'text-gray-500'
                      )}
                    />
                    {!isCollapsed && (
                      <div className="flex items-center justify-between flex-1">
                        <span>{item.name}</span>
                        {item.name === t('nav.analytics') && (
                          <span className="px-1.5 py-0.5 border border-gray-400 text-gray-600 text-[10px] font-medium rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                ) : (
                  <Link
                    href="/beta"
                    data-tour={item.tourId}
                    className={cn(
                      'group flex items-center rounded-lg text-sm font-medium transition-colors',
                      isCollapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2',
                      'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <item.icon
                      className={cn(
                        'h-5 w-5 transition-all duration-300 ease-out',
                        isCollapsed ? 'mx-auto' : 'mr-3',
                        'text-gray-500'
                      )}
                    />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
      
      {/* User Section */}
      <div className="border-t border-gray-200 p-4 bg-white">
        {user ? (
          <div className="space-y-2">
            {/* User Info */}
            <div className={cn(
              "flex items-center rounded-lg p-2 transition-colors hover:bg-gray-50",
              isCollapsed ? "justify-center" : ""
            )}>
              <UserIcon className={cn(
                "h-5 w-5 text-gray-400",
                isCollapsed ? "mx-auto" : "mr-3"
              )} />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {user.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{t('common.loggedIn')}</p>
                </div>
              )}
            </div>
            
            {/* Help Button */}
            <button
              onClick={startTour}
              className={cn(
                "w-full flex items-center rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                isCollapsed ? "px-2 py-2 justify-center" : "px-3 py-2"
              )}
              title={isCollapsed ? t('nav.help') : undefined}
            >
              <HelpCircleIcon className={cn(
                "h-5 w-5 text-gray-400",
                isCollapsed ? "mx-auto" : "mr-3"
              )} />
              {!isCollapsed && t('nav.help')}
            </button>
            
            {/* Logout Button */}
            <button
              onClick={signOut}
              className={cn(
                "w-full flex items-center rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                isCollapsed ? "px-2 py-2 justify-center" : "px-3 py-2"
              )}
              title={isCollapsed ? t('nav.logout') : undefined}
            >
              <LogOutIcon className={cn(
                "h-5 w-5 text-gray-400",
                isCollapsed ? "mx-auto" : "mr-3"
              )} />
              {!isCollapsed && t('nav.logout')}
            </button>
          </div>
        ) : (
          /* Login Button */
          <Link
            href="/auth/login"
            className={cn(
              "w-full flex items-center rounded-lg text-sm font-medium transition-colors text-gray-700 hover:bg-gray-50 hover:text-gray-900",
              isCollapsed ? "px-2 py-2 justify-center" : "px-3 py-2"
            )}
            title={isCollapsed ? t('nav.login') : undefined}
          >
            <UserIcon className={cn(
              "h-5 w-5 text-gray-400",
              isCollapsed ? "mx-auto" : "mr-3"
            )} />
            {!isCollapsed && t('nav.login')}
          </Link>
        )}
      </div>

      {/* Insights Beta Modal */}
      <Modal
        isOpen={showInsightsPopup}
        onClose={() => setShowInsightsPopup(false)}
        title=""
        maxWidth="2xl"
      >
        <div className="space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                <ClipboardIcon className="h-8 w-8 text-gray-600" />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900">Insights</h3>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                WIP
              </span>
            </div>
            <p className="text-lg text-gray-600">Work in Progress</p>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">This section is under active development!</h4>
              <p className="text-gray-700 leading-relaxed">
                The Insights section is currently being built. While some features may be missing or not work as expected,
                you're encouraged to explore and test around. Your feedback helps improve the experience.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="flex items-start space-x-3">
                <LightbulbIcon className="h-6 w-6 text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">What you can expect:</h5>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Some features may be incomplete or in testing</li>
                    <li>• Data and functionality might change during development</li>
                    <li>• Your exploration and feedback helps build better features</li>
                    <li>• Most functionality is still being built and refined</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setShowInsightsPopup(false)}
              size="lg"
            >
              Not now
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setShowInsightsPopup(false)
                toggleSection(t('nav.insights'))
              }}
              size="lg"
            >
              Explore anyway
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  )
}

export function Sidebar() {
  return (
    <Suspense fallback={<div className="w-64 bg-white border-r border-gray-200">Loading...</div>}>
      <SidebarContent />
    </Suspense>
  )
}