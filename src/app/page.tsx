'use client'

import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { NewJourneyModal } from '@/components/journey/NewJourneyModal'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { PlusIcon, MapIcon, BookTemplateIcon, TrendingUpIcon, UsersIcon, ClockIcon, PlusCircleIcon } from 'lucide-react'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useJourneyStore } from '@/store/journey-store'

export default function Home() {
  const [isNewJourneyModalOpen, setIsNewJourneyModalOpen] = useState(false)
  const { journeys } = useJourneyStore()
  
  // Calculate real stats from journey store
  const stats = useMemo(() => {
    const totalTouchpoints = journeys.reduce((sum, journey) => sum + journey.touchpoints.length, 0)
    const uniquePersonas = new Set(journeys.map(j => j.persona).filter(Boolean)).size
    
    return [
      {
        title: 'Aktiva Journey Maps',
        value: journeys.length.toString(),
        icon: MapIcon,
        change: journeys.length === 0 ? 'Skapa din första journey' : `${journeys.length} total`
      },
      {
        title: 'Customer Touchpoints',
        value: totalTouchpoints.toString(),
        icon: TrendingUpIcon,
        change: totalTouchpoints === 0 ? 'Inga touchpoints än' : `Fördelat över ${journeys.length} journeys`
      },
      {
        title: 'Personas',
        value: uniquePersonas.toString(),
        icon: UsersIcon,
        change: uniquePersonas === 0 ? 'Lägg till personas' : `${uniquePersonas} unika personas`
      },
      {
        title: 'Templates',
        value: '6',
        icon: BookTemplateIcon,
        change: 'Tillgängliga mallar'
      }
    ]
  }, [journeys])

  return (
    <AuthGuard>
      <div className="h-full flex flex-col bg-gray-50">
      <Header 
        title="Dashboard" 
        description="Översikt av dina customer experience projekt"
        actions={
          <Link href="/journey-maps/new">
            <Button variant="primary">
              <PlusIcon className="mr-2 h-4 w-4" />
              Start New Journey Map
            </Button>
          </Link>
        }
      />
      
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 group-hover:from-gray-50 group-hover:to-gray-100 transition-all duration-300"></div>
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
                    <stat.icon className="h-6 w-6 text-slate-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                <MapIcon className="mr-2 h-5 w-5 text-slate-600" />
                Senaste Journey Maps
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {journeys.length > 0 ? (
                  journeys
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    .slice(0, 5)
                    .map((journey) => {
                      const daysSinceUpdate = Math.floor(
                        (new Date().getTime() - new Date(journey.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
                      )
                      const timeAgo = daysSinceUpdate === 0 
                        ? 'Idag' 
                        : daysSinceUpdate === 1 
                        ? '1 dag sedan' 
                        : `${daysSinceUpdate} dagar sedan`
                      
                      const status = journey.touchpoints.length === 0 ? 'Tom' : 'Aktiv'
                      const completionPercentage = Math.min((journey.touchpoints.length / 10) * 100, 100) // Assume 10 touchpoints = 100%
                      
                      return (
                        <Link key={journey.id} href="/journeys">
                          <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-all duration-200 group border border-transparent hover:border-slate-200">
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 truncate">{journey.title}</p>
                              <p className="text-sm text-gray-500">{timeAgo}</p>
                              {journey.persona && (
                                <p className="text-xs text-gray-400 mt-1">{journey.persona}</p>
                              )}
                              {/* Progress Bar */}
                              <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
                                <div 
                                  className="bg-slate-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${completionPercentage}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end ml-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                                status === 'Aktiv' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {status}
                              </span>
                              <span className="text-xs text-gray-400">
                                {journey.touchpoints.length} touchpoints
                              </span>
                            </div>
                          </div>
                        </Link>
                      )
                    })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MapIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-sm">Inga journey maps än</p>
                    <p className="text-xs text-gray-400 mt-1">Skapa din första för att komma igång</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                <PlusCircleIcon className="mr-2 h-5 w-5 text-slate-600" />
                Snabbstart
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-slate-50 hover:border-slate-300 transition-colors"
                  onClick={() => setIsNewJourneyModalOpen(true)}
                >
                  <PlusIcon className="mr-3 h-4 w-4" />
                  Skapa ny Journey Map
                </Button>
                <Link href="/templates">
                  <Button variant="outline" className="w-full justify-start hover:bg-slate-50 hover:border-slate-300 transition-colors">
                    <BookTemplateIcon className="mr-3 h-4 w-4" />
                    Använd en mall
                  </Button>
                </Link>
                <Link href="/personas">
                  <Button variant="outline" className="w-full justify-start hover:bg-slate-50 hover:border-slate-300 transition-colors">
                    <UsersIcon className="mr-3 h-4 w-4" />
                    Lägg till personas
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClockIcon className="mr-2 h-4 w-4 text-gray-500" />
                Senaste Aktivitet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {journeys.length > 0 ? (
                  journeys
                    .slice(0, 3)
                    .map((journey, index) => (
                      <div key={journey.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-900">
                            Journey "<span className="font-medium">{journey.title}</span>" skapades
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
                  <div className="text-center py-6 text-gray-500">
                    <ClockIcon className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                    <p className="text-sm">Ingen aktivitet än</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <NewJourneyModal
        isOpen={isNewJourneyModalOpen}
        onClose={() => setIsNewJourneyModalOpen(false)}
      />
      
      </div>
    </AuthGuard>
  )
}
