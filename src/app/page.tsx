'use client'

import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { PlusIcon, MapIcon, BookTemplateIcon, UsersIcon, BookOpenIcon, LayoutGridIcon, ActivityIcon, BarChart3Icon, ZapIcon, TrendingUpIcon, XIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import React from 'react'
import Link from 'next/link'
import { useJourneyStore } from '@/store/journey-store'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
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

  // Close widget selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showWidgetSelector) {
        const target = event.target as Element
        const addWidgetCard = target.closest('.add-widget-card')
        if (!addWidgetCard) {
          setShowWidgetSelector(false)
        }
      }
    }

    if (showWidgetSelector) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showWidgetSelector])

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
                          Journey skapad: {journey.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(journey.createdAt).toLocaleDateString('sv-SE')}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500 flex-1 flex flex-col justify-center">
                    <ActivityIcon className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p className="text-sm">Ingen aktivitet än</p>
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
                <h3 className="text-lg font-medium text-gray-900">Journey Statistik</h3>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                {journeys.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-700 mb-1">{journeys.length}</div>
                      <div className="text-xs text-slate-600">Totalt Journeys</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-700 mb-1">{completionRate}%</div>
                      <div className="text-xs text-slate-600">Komplettering</div>
                    </div>
                    <div className="col-span-2 text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-700 mb-1">{avgTouchpoints}</div>
                      <div className="text-xs text-slate-600">Snitt Touchpoints</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <TrendingUpIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-sm font-medium text-gray-700 mb-2">Ingen statistik ännu</p>
                    <p className="text-xs text-gray-500">Skapa journeys för att se statistik</p>
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
                <h3 className="text-lg font-medium text-gray-900">Senaste Personas</h3>
              </div>
              <div className="text-center py-8 text-gray-500 flex-1 flex flex-col justify-center">
                <UsersIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-sm font-medium text-gray-700 mb-2">Inga personas än</p>
                <p className="text-xs text-gray-500 mb-4">Skapa din första persona</p>
                <Link href="/personas/create">
                  <Button variant="outline" size="sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Skapa Persona
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
                <Link href="/journey-maps">
                  <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-slate-200 hover:border-slate-300">
                    <div className="text-center">
                      <div className="w-8 h-8 mx-auto mb-2 bg-slate-600 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                        <MapIcon className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-xs font-medium text-gray-900">Journey Maps</p>
                    </div>
                  </div>
                </Link>
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
        />

        <div className="flex-1 p-6 overflow-auto bg-gray-50">
          <div className="space-y-6">
            <div className={`grid gap-6 ${enabledWidgets.length === 0 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'}`}>
              {/* Journey Maps - Always show as first widget */}
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 h-80">
                <CardContent className="pt-6 h-full flex flex-col">
                  {journeys.length === 0 ? (
                    <div className="text-center py-12 flex-1 flex flex-col justify-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
                        <MapIcon className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Inga Journey Maps än</h3>
                      <p className="text-sm text-gray-500 mb-6">Gå till Journey Maps-sektionen för att skapa din första</p>
                      <Link href="/journey-maps">
                        <Button variant="primary">
                          <MapIcon className="mr-2 h-4 w-4" />
                          Öppna Journey Maps
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Mina Journey Maps</h3>
                        <Link href="/journey-maps">
                          <Button variant="outline" size="sm">
                            <MapIcon className="mr-2 h-4 w-4" />
                            Visa alla
                          </Button>
                        </Link>
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
                                  {journey.touchpoints.length > 0 ? 'Aktiv' : 'Tom'}
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
              {enabledWidgets.map((widgetId) => renderWidget(widgetId))}

              {/* Add Widget - Always show as the last item */}
              <Card className="border-2 border-dashed border-gray-300 shadow-none hover:border-gray-400 hover:shadow-sm transition-all duration-200 h-80 add-widget-card">
                <CardContent className="pt-6 h-full flex flex-col">
                  {!showWidgetSelector ? (
                    <div className="text-center py-12 flex-1 flex flex-col justify-center cursor-pointer" onClick={() => setShowWidgetSelector(true)}>
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <PlusIcon className="w-8 h-8 text-gray-400 hover:text-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-500 mb-2 hover:text-gray-600">Lägg till widget</h3>
                      <p className="text-sm text-gray-400 hover:text-gray-500">Anpassa din dashboard med widgets</p>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Välj widget att lägga till</h3>
                        <button
                          onClick={() => setShowWidgetSelector(false)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <XIcon className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      <div className="space-y-2 flex-1 overflow-y-auto">
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
                                className="w-full flex items-center p-3 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 hover:border-slate-300 text-left"
                              >
                                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                                  <IconComponent className="w-4 h-4 text-slate-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900 text-sm">{widget.name}</p>
                                  <p className="text-xs text-gray-500">{widget.description}</p>
                                </div>
                              </button>
                            )
                          })}
                        {availableWidgets.filter(widget => !enabledWidgets.includes(widget.id)).length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <LayoutGridIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                            <p className="text-sm font-medium text-gray-700 mb-2">Alla widgets tillagda</p>
                            <p className="text-xs text-gray-500">Ta bort widgets för att lägga till fler</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

      </div>
    </AuthGuard>
  )
}