'use client'

import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  BarChart3Icon, 
  ClipboardListIcon, 
  MessageSquareIcon, 
  UsersIcon, 
  TrendingUpIcon,
  PlusIcon,
  FileTextIcon,
  MicIcon,
  EyeIcon,
  SearchIcon
} from 'lucide-react'
import Link from 'next/link'

const quantitativeMethods = [
  {
    title: 'NPS-enkäter',
    description: 'Mät kundlojalitet med Net Promoter Score',
    icon: TrendingUpIcon,
    color: 'bg-slate-50 text-slate-600',
    href: '/insights/nps',
    features: ['0-10 skala', 'Automatisk segmentering', 'Trendanalys', 'Benchmarking']
  },
  {
    title: 'CSAT-enkäter',
    description: 'Mät kundnöjdhet för specifika touchpoints',
    icon: BarChart3Icon,
    color: 'bg-slate-50 text-slate-600',
    href: '/insights/csat',
    features: ['Touchpoint-koppling', 'Realtidsdata', 'Jämförelser', 'Målsättningar']
  },
  {
    title: 'CES-enkäter',
    description: 'Mät kundansträngning och identifiera friktion',
    icon: ClipboardListIcon,
    color: 'bg-slate-50 text-slate-600',
    href: '/insights/ces',
    features: ['Enkelhetsindex', 'Pain point-identifiering', 'Process-optimering', 'ROI-beräkning']
  }
]

const qualitativeMethods = [
  {
    title: 'Kundintervjuer',
    description: 'Djupgående förståelse genom personliga samtal',
    icon: MicIcon,
    color: 'bg-slate-50 text-slate-600',
    href: '/insights/interviews',
    features: ['Intervjuguider', 'Frågemallar', 'Inspelningsverktyg', 'Analys-templates']
  },
  {
    title: 'Fokusgrupper',
    description: 'Samla gruppinsikter och dynamiska diskussioner',
    icon: UsersIcon,
    color: 'bg-slate-50 text-slate-600',
    href: '/insights/focus-groups',
    features: ['Deltagarrekrytering', 'Diskussionsguider', 'Modereringstips', 'Gruppanalys']
  },
  {
    title: 'Användarobservation',
    description: 'Se hur kunder verkligen beter sig',
    icon: EyeIcon,
    color: 'bg-slate-50 text-slate-600',
    href: '/insights/observation',
    features: ['Observation-protokoll', 'Beteendeanalys', 'Journey shadowing', 'Etnografi']
  }
]

const tools = [
  {
    title: 'Survey Builder',
    description: 'Skapa professionella enkäter med mallar',
    action: 'Skapa enkät',
    href: '/insights/survey-builder'
  },
  {
    title: 'Research Planner',
    description: 'Planera och organisera dina kundinsikts-projekt',
    action: 'Planera projekt',
    href: '/insights/research-planner'
  },
  {
    title: 'Data Dashboard',
    description: 'Visualisera och analysera insamlad data',
    action: 'Visa dashboard',
    href: '/insights/dashboard'
  },
  {
    title: 'Insights Library',
    description: 'Samla och organisera alla kundinsikter',
    action: 'Öppna bibliotek',
    href: '/insights/library'
  }
]

export default function InsightsPage() {
  return (
    <div className="h-full flex flex-col">
      <Header 
        title="Kundinsikter" 
        description="Samla in och analysera kunddata för bättre customer experience"
        actions={
          <Button variant="primary">
            <PlusIcon className="mr-2 h-4 w-4" />
            Nytt projekt
          </Button>
        }
      />
      
      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        {/* Introduction */}
        <Card className="mb-8 border-l-4 border-l-slate-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-slate-100 rounded-lg">
                <SearchIcon className="h-6 w-6 text-slate-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Varför samla in kundinsikter?
                </h3>
                <p className="text-gray-600 mb-4">
                  Kundinsikter hjälper dig att förstå vad kunder verkligen tycker, känner och behöver. 
                  Genom att kombinera kvantitativa mätningar med kvalitativa fördjupningar får du en 
                  komplett bild som driver data-baserade förbättringar av kundupplevelsen.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    Identifiera pain points
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    Mät framsteg
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    Validera förändringar
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    Förstå behov
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quantitative Methods */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Kvantitativa metoder</h2>
            <span className="text-sm text-gray-500">Mätbara data och siffror</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {quantitativeMethods.map((method) => (
              <Card key={method.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${method.color}`}>
                      <method.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                  </div>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-4">
                    {method.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={method.href}>
                    <Button variant="outline" className="w-full">
                      Kom igång
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Qualitative Methods */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Kvalitativa metoder</h2>
            <span className="text-sm text-gray-500">Fördjupade insikter och förståelse</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {qualitativeMethods.map((method) => (
              <Card key={method.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${method.color}`}>
                      <method.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                  </div>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-4">
                    {method.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={method.href}>
                    <Button variant="outline" className="w-full">
                      Lär dig mer
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tools & Templates */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Verktyg & Mallar</h2>
            <span className="text-sm text-gray-500">Praktiska hjälpmedel för datainsamling</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Card key={tool.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{tool.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                      <Link href={tool.href}>
                        <Button variant="primary" size="sm">
                          {tool.action}
                        </Button>
                      </Link>
                    </div>
                    <div className="ml-4">
                      <FileTextIcon className="h-8 w-8 text-gray-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Getting Started Guide */}
        <Card className="mt-8 bg-slate-50 border-slate-200">
          <CardContent className="p-6">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ny inom kundinsikter?
              </h3>
              <p className="text-gray-600 mb-6">
                Börja med våra guider för att lära dig när du ska använda vilka metoder 
                och hur du får mest värde ur din datainsamling.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/getting-started">
                  <Button variant="primary">
                    Kom igång-guide
                  </Button>
                </Link>
                <Link href="/insights/best-practices">
                  <Button variant="outline">
                    Best practices
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}