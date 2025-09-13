'use client'

import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { NewJourneyModal } from '@/components/journey/NewJourneyModal'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { PlusIcon, MapIcon, BookTemplateIcon, UsersIcon, BookOpenIcon, LayoutGridIcon, ActivityIcon, BarChart3Icon, ZapIcon, TrendingUpIcon, XIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import React from 'react'
import Link from 'next/link'
import { useJourneyStore } from '@/store/journey-store'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const [isNewJourneyModalOpen, setIsNewJourneyModalOpen] = useState(false)
  const [showWidgetSelector, setShowWidgetSelector] = useState(false)
  const [enabledWidgets, setEnabledWidgets] = useState<string[]>([])
  const { journeys } = useJourneyStore()
  const { t } = useLanguage()

  // Widget registry - all available widgets
  const availableWidgets = [
    {
      id: 'recent-activity',
      name: t('dashboard.recentActivity'),
      description: t('dashboard.showRecentActions'),
      icon: 'activity'
    },
    {
      id: 'journey-stats',
      name: t('dashboard.journeyStats'),
      description: t('dashboard.showJourneyStats'),
      icon: 'chart'
    },
    {
      id: 'recent-personas',
      name: t('dashboard.recentPersonas'),
      description: t('dashboard.showPersonaList'),
      icon: 'users'
    },
    {
      id: 'templates-gallery',
      name: 'Template Gallery',
      description: 'Snabbåtkomst till populära mallar',
      icon: 'template'
    },
    {
      id: 'progress-tracker',
      name: 'Progress Tracker',
      description: 'Visa ditt framsteg i CX-processen',
      icon: 'progress'
    },
    {
      id: 'quick-actions',
      name: 'Quick Actions',
      description: 'Snabbknappar för vanliga uppgifter',
      icon: 'zap'
    }
  ]

  // Load enabled widgets from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cx-enabled-widgets')
    if (saved) {
      setEnabledWidgets(JSON.parse(saved))
    }
  }, [])

  // Save enabled widgets to localStorage
  const saveWidgetPreferences = (widgets: string[]) => {
    localStorage.setItem('cx-enabled-widgets', JSON.stringify(widgets))
    setEnabledWidgets(widgets)
  }

  // Add widget
  const addWidget = (widgetId: string) => {
    if (!enabledWidgets.includes(widgetId)) {
      const newWidgets = [...enabledWidgets, widgetId]
      saveWidgetPreferences(newWidgets)
    }
    setShowWidgetSelector(false)
  }

  // Remove widget
  const removeWidget = (widgetId: string) => {
    const newWidgets = enabledWidgets.filter(id => id !== widgetId)
    saveWidgetPreferences(newWidgets)
  }

  // Render individual widget
  const renderWidget = (widgetId: string) => {
    switch (widgetId) {
      case 'recent-activity':
        return (
          <Card key={widgetId} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 relative group h-80">
            <button
              onClick={() => removeWidget(widgetId)}
              className="absolute top-2 right-2 w-6 h-6 bg-white shadow-sm border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            >
              <XIcon className="w-3 h-3 text-gray-500" />
            </button>
            <CardContent className="pt-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <ActivityIcon className="mr-2 h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-medium text-gray-900">{t('dashboard.recentActivity')}</h3>
              </div>
              <div className="space-y-3 flex-1">
                {journeys.length > 0 ? (
                  journeys.slice(0, 3).map((journey) => (
                    <div key={journey.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-900">
                          {t('dashboard.journeyCreated', { title: journey.title })}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(journey.createdAt).toLocaleDateString('sv-SE', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500 flex-1 flex flex-col justify-center">
                    <ActivityIcon className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p className="text-sm">{t('dashboard.noActivity')}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )

      case 'journey-stats':
        const totalTouchpoints = journeys.reduce((sum, journey) => sum + journey.touchpoints.length, 0)
        const activeJourneys = journeys.filter(j => j.touchpoints.length > 0).length
        const completionRate = journeys.length > 0 ? Math.round((activeJourneys / journeys.length) * 100) : 0
        const avgTouchpoints = journeys.length > 0 ? Math.round(totalTouchpoints / journeys.length) : 0

        return (
          <Card key={widgetId} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 relative group h-80">
            <button
              onClick={() => removeWidget(widgetId)}
              className="absolute top-2 right-2 w-6 h-6 bg-white shadow-sm border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            >
              <XIcon className="w-3 h-3 text-gray-500" />
            </button>
            <CardContent className="pt-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <BarChart3Icon className="mr-2 h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-medium text-gray-900">{t('dashboard.journeyStats')}</h3>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                {journeys.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-700 mb-1">{journeys.length}</div>
                      <div className="text-xs text-slate-600">{t('dashboard.totalJourneys')}</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-700 mb-1">{completionRate}%</div>
                      <div className="text-xs text-slate-600">{t('dashboard.completionRate')}</div>
                    </div>
                    <div className="col-span-2 text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-700 mb-1">{avgTouchpoints}</div>
                      <div className="text-xs text-slate-600">{t('dashboard.avgTouchpoints')}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUpIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-sm font-medium text-gray-700 mb-2">{t('dashboard.noStatsYet')}</p>
                    <p className="text-xs text-gray-500">{t('dashboard.createJourneysForStats')}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )

      case 'recent-personas':
        return (
          <Card key={widgetId} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 relative group h-80">
            <button
              onClick={() => removeWidget(widgetId)}
              className="absolute top-2 right-2 w-6 h-6 bg-white shadow-sm border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            >
              <XIcon className="w-3 h-3 text-gray-500" />
            </button>
            <CardContent className="pt-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <UsersIcon className="mr-2 h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-medium text-gray-900">{t('dashboard.recentPersonas')}</h3>
              </div>
              <div className="text-center py-8 text-gray-500 flex-1 flex flex-col justify-center">
                <UsersIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-sm font-medium text-gray-700 mb-2">{t('dashboard.noPersonas')}</p>
                <p className="text-xs text-gray-500 mb-4">{t('dashboard.createFirstPersona')}</p>
                <Link href="/personas/create">
                  <Button variant="outline" size="sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    {t('dashboard.createPersona')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )

      case 'templates-gallery':
        return (
          <Card key={widgetId} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 relative group h-80">
            <button
              onClick={() => removeWidget(widgetId)}
              className="absolute top-2 right-2 w-6 h-6 bg-white shadow-sm border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            >
              <XIcon className="w-3 h-3 text-gray-500" />
            </button>
            <CardContent className="pt-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <BookTemplateIcon className="mr-2 h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-medium text-gray-900">Template Gallery</h3>
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto">
                <Link href="/templates">
                  <div className="flex items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-slate-100 hover:border-slate-200">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                      <BookTemplateIcon className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">E-commerce Journey</p>
                      <p className="text-xs text-gray-500">Komplett köpresa från upptäckt till lojalitet</p>
                    </div>
                  </div>
                </Link>
                <Link href="/templates">
                  <div className="flex items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-slate-100 hover:border-slate-200">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                      <BookTemplateIcon className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">SaaS Onboarding</p>
                      <p className="text-xs text-gray-500">Användarresa för software onboarding</p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        )

      case 'quick-actions':
        return (
          <Card key={widgetId} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 relative group h-80">
            <button
              onClick={() => removeWidget(widgetId)}
              className="absolute top-2 right-2 w-6 h-6 bg-white shadow-sm border rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            >
              <XIcon className="w-3 h-3 text-gray-500" />
            </button>
            <CardContent className="pt-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <ZapIcon className="mr-2 h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1 content-center">
                <button
                  onClick={() => setIsNewJourneyModalOpen(true)}
                  className="p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-slate-200 hover:border-slate-300"
                >
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                      <MapIcon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs font-medium text-gray-900">Ny Journey</p>
                  </div>
                </button>
                <Link href="/personas/create">
                  <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-slate-200 hover:border-slate-300">
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-2 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors">
                        <UsersIcon className="w-4 h-4 text-slate-600" />
                      </div>
                      <p className="text-xs font-medium text-gray-900">Ny Persona</p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <AuthGuard>
      <div className="h-full flex flex-col bg-gray-50">
      <Header 
        title={t('dashboard.title')} 
        description={t('dashboard.subtitle')}
        actions={
          <Link href="/journey-maps/new">
            <Button variant="primary">
              <PlusIcon className="mr-2 h-4 w-4" />
              {t('common.startNewJourneyMap')}
            </Button>
          </Link>
        }
      />
      
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Dashboard - Dynamic widget layout */}
        <div className="space-y-6">
          {/* First row with Journey Maps (always visible) and enabled widgets */}
          <div className={`grid gap-6 ${enabledWidgets.length === 0 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'}`}>
            {/* Journey Maps - Always show as first widget */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 h-80">
              <CardContent className="pt-6 h-full flex flex-col">
                {journeys.length === 0 ? (
                  <div className="text-center py-12 flex-1 flex flex-col justify-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
                      <MapIcon className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t('dashboard.createFirstJourneyTitle')}</h3>
                    <p className="text-sm text-gray-500 mb-6">{t('dashboard.createFirstJourneyDesc')}</p>
                    <Button
                      onClick={() => setIsNewJourneyModalOpen(true)}
                      className="bg-slate-900 hover:bg-slate-800"
                    >
                      <PlusIcon className="mr-2 h-4 w-4" />
                      {t('dashboard.createJourneyMap')}
                    </Button>
                  </div>
                ) : (
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">{t('dashboard.myJourneyMaps')}</h3>
                      <Button variant="outline" size="sm" onClick={() => setIsNewJourneyModalOpen(true)}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        {t('dashboard.new')}
                      </Button>
                    </div>
                    <div className="space-y-3 flex-1 overflow-y-auto">
                      {journeys.slice(0, 3).map((journey) => (
                        <Link key={journey.id} href={`/journey-maps/${journey.id}`}>
                          <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors border border-slate-100 hover:border-slate-200">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 truncate">{journey.title}</p>
                              <p className="text-xs text-gray-500">{journey.touchpoints.length} touchpoints</p>
                            </div>
                            <div className="ml-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                journey.touchpoints.length > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {journey.touchpoints.length > 0 ? t('dashboard.active') : t('dashboard.empty')}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Render enabled widgets */}
            {enabledWidgets.map((widgetId) =>
              renderWidget(widgetId)
            )}

            {/* Add Widget - Always show as the last item */}
            <Card className="border-2 border-dashed border-gray-300 shadow-none hover:border-gray-400 hover:shadow-sm transition-all duration-200 cursor-pointer group" onClick={() => setShowWidgetSelector(true)}>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <PlusIcon className="w-8 h-8 text-gray-400 group-hover:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-500 mb-2 group-hover:text-gray-600">{t('dashboard.addWidget')}</h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-500">{t('dashboard.customizeYourDashboard')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>

        {/* Widget Selector Modal/Dropdown */}
        {showWidgetSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowWidgetSelector(false)}>
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.selectWidget')}</h3>
              <div className="space-y-3">
                {availableWidgets
                  .filter(widget => !enabledWidgets.includes(widget.id))
                  .map((widget) => {
                    const getWidgetIcon = (iconName: string) => {
                      switch (iconName) {
                        case 'activity':
                          return ActivityIcon
                        case 'chart':
                          return BarChart3Icon
                        case 'users':
                          return UsersIcon
                        case 'template':
                          return BookTemplateIcon
                        case 'progress':
                          return TrendingUpIcon
                        case 'zap':
                          return ZapIcon
                        default:
                          return LayoutGridIcon
                      }
                    }

                    const IconComponent = getWidgetIcon(widget.icon)

                    return (
                      <button
                        key={widget.id}
                        onClick={() => addWidget(widget.id)}
                        className="w-full flex items-center p-3 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 hover:border-slate-300"
                      >
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                          <IconComponent className="w-5 h-5 text-slate-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{widget.name}</p>
                          <p className="text-xs text-gray-500">{widget.description}</p>
                        </div>
                      </button>
                    )
                  })}
                {availableWidgets.filter(widget => !enabledWidgets.includes(widget.id)).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <LayoutGridIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-sm font-medium text-gray-700 mb-2">{t('dashboard.allWidgetsAdded')}</p>
                    <p className="text-xs text-gray-500">{t('dashboard.removeWidgetsToAddMore')}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={() => setShowWidgetSelector(false)}>
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <NewJourneyModal
        isOpen={isNewJourneyModalOpen}
        onClose={() => setIsNewJourneyModalOpen(false)}
      />

    </AuthGuard>
  )
}
