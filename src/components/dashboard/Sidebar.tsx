'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
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
  CircleIcon
} from 'lucide-react'

const getNavigation = (t: (key: string) => string) => [
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
      {
        name: t('nav.createManage'),
        children: [
          { name: t('nav.createPersona'), href: '/personas/create', icon: PlusIcon },
          { name: t('nav.allPersonas'), href: '/personas', icon: UsersIcon },
          { name: t('nav.personaTemplates'), href: '/personas/templates', icon: BookTemplateIcon },
          { name: t('nav.importPersona'), href: '/personas/import', icon: DatabaseIcon }
        ]
      },
      {
        name: t('nav.personaGuides'),
        children: [
          { name: t('nav.personaGuide'), href: '/personas/guide', icon: BookIcon },
          { name: t('nav.personaBestPractices'), href: '/personas/best-practices', icon: BookOpenIcon },
          { name: t('nav.personaTips'), href: '/personas/tips', icon: LightbulbIcon }
        ]
      }
    ]
  },
  { 
    name: t('nav.insights'), 
    icon: ClipboardIcon, 
    tourId: 'insights',
    isExpandable: true,
    children: [
      {
        name: t('nav.quantitativeMethods'),
        children: [
          { name: t('nav.npssurveys'), href: '/insights/nps', icon: TrendingUpIcon },
          { name: t('nav.csatSurveys'), href: '/insights/csat', icon: StarIcon },
          { name: t('nav.cesSurveys'), href: '/insights/ces', icon: BarChart3Icon }
        ]
      },
      {
        name: t('nav.qualitativeMethods'),
        children: [
          {
            name: t('nav.interviews'),
            href: '/insights/interviews',
            icon: MicIcon,
            isExpandable: true,
            children: [
              { name: 'Översikt', href: '/insights/interviews', icon: HomeIcon },
              { name: 'Skapa guide', href: '/insights/interviews?tab=create', icon: PlusIcon },
              { name: 'Genomför', href: '/insights/interviews?tab=conduct', icon: PlayIcon },
              { name: 'Analysera', href: '/insights/interviews?tab=analyze', icon: BarChart3Icon },
              { name: 'Mina intervjuer', href: '/insights/interviews?tab=my-interviews', icon: FolderIcon },
              { name: 'Mallar', href: '/insights/interviews?tab=templates', icon: BookTemplateIcon }
            ]
          },
          { name: t('nav.focusGroups'), href: '/insights/focus-groups', icon: UsersIcon },
          { name: t('nav.observation'), href: '/insights/observation', icon: EyeIcon }
        ]
      },
      {
        name: t('nav.toolsTemplates'),
        children: [
          { name: t('nav.surveyBuilder'), href: '/insights/survey-builder', icon: WrenchIcon },
          { name: t('nav.researchPlanner'), href: '/insights/research-planner', icon: FileTextIcon },
          { name: t('nav.dataDashboard'), href: '/insights/dashboard', icon: PieChartIcon },
          { name: t('nav.insightsLibrary'), href: '/insights/library', icon: DatabaseIcon }
        ]
      },
      {
        name: t('nav.guides'),
        children: [
          { name: t('nav.gettingStarted'), href: '/insights/getting-started', icon: BookIcon },
          { name: t('nav.bestPractices'), href: '/insights/best-practices', icon: BookOpenIcon }
        ]
      }
    ]
  },
  { name: t('nav.glossary'), href: '/glossary', icon: BookOpenIcon, tourId: 'glossary' },
  { name: t('nav.settings'), href: '/settings', icon: SettingsIcon, tourId: 'settings' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed, setIsCollapsed } = useSidebar()
  const { user, signOut } = useAuth()
  const { startTour } = useGuidedTour()
  const { t } = useLanguage()
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({})
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({})
  const [expandedSubItems, setExpandedSubItems] = useState<{[key: string]: boolean}>({})
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  
  const navigation = getNavigation(t)
  
  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }))
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
                  {/* Main expandable button */}
                  <button
                    onClick={() => toggleSection(item.name)}
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
                        'h-5 w-5 transition-colors',
                        isCollapsed ? 'mx-auto' : 'mr-3',
                        'text-gray-400 hover:text-gray-500'
                      )}
                    />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left">{item.name}</span>
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
                      </>
                    )}
                  </button>
                  
                  {/* Expandable content - Level 1: Main categories */}
                  {!isCollapsed && isExpanded && (
                    <div className="mt-2 ml-4 space-y-1">
                      {item.children.map((category) => {
                        const isCategoryExpanded = expandedCategories[category.name]
                        return (
                          <div key={category.name}>
                            {/* Category header - clickable to expand/collapse */}
                            <button
                              onClick={() => toggleCategory(category.name)}
                              onMouseEnter={() => setHoveredCategory(category.name)}
                              onMouseLeave={() => setHoveredCategory(null)}
                              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
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
                                  const isSubActive = pathname === subItem.href || pathname.startsWith(subItem.href + '?')

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

                                  // Handle regular sub-items
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
                      'h-5 w-5 transition-colors',
                      isCollapsed ? 'mx-auto' : 'mr-3',
                      isActive
                        ? 'text-slate-600'
                        : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {!isCollapsed && item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      
      {/* User Section */}
      <div className="border-t border-gray-200 p-4">
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
    </div>
  )
}