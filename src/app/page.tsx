'use client'

import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { NewJourneyModal } from '@/components/journey/NewJourneyModal'
import { PlusIcon, MapIcon, BookTemplateIcon, TrendingUpIcon, UsersIcon } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isNewJourneyModalOpen, setIsNewJourneyModalOpen] = useState(false)
  
  const stats = [
    {
      title: 'Aktiva Journey Maps',
      value: '12',
      icon: MapIcon,
      change: '+2 sedan förra månaden'
    },
    {
      title: 'Customer Touchpoints',
      value: '84',
      icon: TrendingUpIcon,
      change: '+12 identifierade'
    },
    {
      title: 'Personas',
      value: '6',
      icon: UsersIcon,
      change: '3 nya skapade'
    },
    {
      title: 'Templates',
      value: '15',
      icon: BookTemplateIcon,
      change: '5 industri-specifika'
    }
  ]

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header 
        title="Dashboard" 
        description="Översikt av dina customer experience projekt"
        actions={
          <Button 
            variant="primary"
            onClick={() => setIsNewJourneyModalOpen(true)}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Ny Journey Map
          </Button>
        }
      />
      
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Senaste Journey Maps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'E-commerce Köpresa', updated: '2 timmar sedan', status: 'Aktiv' },
                  { name: 'Customer Support Journey', updated: '1 dag sedan', status: 'Utkast' },
                  { name: 'Onboarding Process', updated: '3 dagar sedan', status: 'Komplett' }
                ].map((journey) => (
                  <Link key={journey.name} href="/journeys">
                    <div className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 -mx-2 rounded cursor-pointer transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">{journey.name}</p>
                        <p className="text-sm text-gray-500">{journey.updated}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        journey.status === 'Aktiv' 
                          ? 'bg-green-100 text-green-800' 
                          : journey.status === 'Utkast'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {journey.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Snabbstart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setIsNewJourneyModalOpen(true)}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Skapa ny Journey Map
                </Button>
                <Link href="/templates">
                  <Button variant="outline" className="w-full justify-start">
                    <BookTemplateIcon className="mr-2 h-4 w-4" />
                    Använd en mall
                  </Button>
                </Link>
                <Link href="/personas">
                  <Button variant="outline" className="w-full justify-start">
                    <UsersIcon className="mr-2 h-4 w-4" />
                    Lägg till personas
                  </Button>
                </Link>
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
  )
}
