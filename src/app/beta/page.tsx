'use client'

import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  SparklesIcon,
  MessageCircleIcon,
  LightbulbIcon,
  BugIcon,
  ArrowRightIcon,
  UsersIcon,
  TrendingUpIcon,
  CheckCircleIcon
} from 'lucide-react'
import Link from 'next/link'

export default function BetaPage() {
  const betaOptions = [
    {
      title: 'Ge feedback',
      description: 'Dela dina tankar och upplevelser för att hjälpa oss förbättra Kustra',
      icon: MessageCircleIcon,
      href: '/beta/feedback'
    },
    {
      title: 'Föreslå feature',
      description: 'Har du en idé som skulle göra Kustra ännu bättre? Berätta för oss!',
      icon: LightbulbIcon,
      href: '/beta/feature-request'
    },
    {
      title: 'Rapportera bug',
      description: 'Hjälp oss fixa problem genom att beskriva vad som gick fel',
      icon: BugIcon,
      href: '/beta/bug-report'
    }
  ]

  return (
    <div className="h-full flex flex-col">
      <Header
        title="Beta-testare"
        description="Hjälp oss bygga den bästa möjliga upplevelsen för alla användare"
      />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <Card className="mb-8 border-0 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center">
                  <SparklesIcon className="h-8 w-8 text-slate-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Välkommen till beta-programmet!
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Som beta-testare spelar du en avgörande roll i utvecklingen av Kustra.
                    Din feedback, dina idéer och dina buggrapporter hjälper oss att skapa
                    den bästa möjliga produkten för alla användare.
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <UsersIcon className="h-4 w-4" />
                      <span>47 aktiva beta-testare</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUpIcon className="h-4 w-4" />
                      <span>89% nöjdhetsgrad</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>23 features implementerade</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Beta Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {betaOptions.map((option, index) => (
              <Link key={index} href={option.href}>
                <Card className="group border-0 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-gray-100">
                        <option.icon className="h-6 w-6 text-gray-600 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-200 group-hover:text-slate-700">
                          {option.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed transition-colors duration-200 group-hover:text-gray-700">
                          {option.description}
                        </p>
                        <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-slate-600 transition-colors duration-200">
                          <span>Kom igång</span>
                          <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="border-0 bg-white rounded-xl">
            <CardHeader>
              <CardTitle>Senaste aktivitet i beta-programmet</CardTitle>
              <p className="text-gray-600">Se vad som händer i vår beta-community</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Ny feature implementerad</div>
                    <div className="text-sm text-gray-600">Förbättrade hover-effekter baserat på Marias förslag</div>
                    <div className="text-xs text-gray-500 mt-1">För 2 dagar sedan</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <MessageCircleIcon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Ny feedback mottagen</div>
                    <div className="text-sm text-gray-600">5 nya förslag på förbättringar från beta-testare</div>
                    <div className="text-xs text-gray-500 mt-1">Idag</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <LightbulbIcon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Populärt feature-förslag</div>
                    <div className="text-sm text-gray-600">"Mobil app för data collection" har fått 15 röster</div>
                    <div className="text-xs text-gray-500 mt-1">För 1 dag sedan</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <BugIcon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Bug fixad</div>
                    <div className="text-sm text-gray-600">Löste problemet med långsam laddning som rapporterades av Anna</div>
                    <div className="text-xs text-gray-500 mt-1">För 3 dagar sedan</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}