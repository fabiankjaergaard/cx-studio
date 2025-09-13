'use client'

import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  BarChart3Icon, 
  ClipboardIcon, 
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
import { useLanguage } from '@/contexts/LanguageContext'

const getQuantitativeMethods = (t: (key: string) => string) => [
  {
    title: t('insights.nps.title'),
    description: t('insights.nps.description'),
    icon: TrendingUpIcon,
    color: 'bg-slate-50 text-slate-600',
    href: '/insights/nps',
    features: [
      t('insights.nps.feature1'),
      t('insights.nps.feature2'),
      t('insights.nps.feature3'),
      t('insights.nps.feature4')
    ]
  },
  {
    title: t('insights.csat.title'),
    description: t('insights.csat.description'),
    icon: BarChart3Icon,
    color: 'bg-slate-50 text-slate-600',
    href: '/insights/csat',
    features: [
      t('insights.csat.feature1'),
      t('insights.csat.feature2'),
      t('insights.csat.feature3'),
      t('insights.csat.feature4')
    ]
  },
  {
    title: t('insights.ces.title'),
    description: t('insights.ces.description'),
    icon: ClipboardIcon,
    color: 'bg-slate-50 text-slate-600',
    href: '/insights/ces',
    features: [
      t('insights.ces.feature1'),
      t('insights.ces.feature2'),
      t('insights.ces.feature3'),
      t('insights.ces.feature4')
    ]
  }
]

const getQualitativeMethods = (t: (key: string) => string) => [
  {
    title: t('insights.interviews.title'),
    description: t('insights.interviews.description'),
    icon: MicIcon,
    color: 'bg-slate-50 text-slate-600',
    href: '/insights/interviews',
    features: [
      t('insights.interviews.feature1'),
      t('insights.interviews.feature2'),
      t('insights.interviews.feature3'),
      t('insights.interviews.feature4')
    ]
  },
  {
    title: t('insights.focusGroups.title'),
    description: t('insights.focusGroups.description'),
    icon: UsersIcon,
    color: 'bg-slate-50 text-slate-600',
    href: '/insights/focus-groups',
    features: [
      t('insights.focusGroups.feature1'),
      t('insights.focusGroups.feature2'),
      t('insights.focusGroups.feature3'),
      t('insights.focusGroups.feature4')
    ]
  },
  {
    title: t('insights.observation.title'),
    description: t('insights.observation.description'),
    icon: EyeIcon,
    color: 'bg-slate-50 text-slate-600',
    href: '/insights/observation',
    features: [
      t('insights.observation.feature1'),
      t('insights.observation.feature2'),
      t('insights.observation.feature3'),
      t('insights.observation.feature4')
    ]
  }
]

const getTools = (t: (key: string) => string) => [
  {
    title: t('insights.surveyBuilder.title'),
    description: t('insights.surveyBuilder.description'),
    action: t('insights.surveyBuilder.action'),
    href: '/insights/survey-builder'
  },
  {
    title: t('insights.researchPlanner.title'),
    description: t('insights.researchPlanner.description'),
    action: t('insights.researchPlanner.action'),
    href: '/insights/research-planner'
  },
  {
    title: t('insights.dataDashboard.title'),
    description: t('insights.dataDashboard.description'),
    action: t('insights.dataDashboard.action'),
    href: '/insights/dashboard'
  },
  {
    title: t('insights.insightsLibrary.title'),
    description: t('insights.insightsLibrary.description'),
    action: t('insights.insightsLibrary.action'),
    href: '/insights/library'
  }
]

export default function InsightsPage() {
  const { t } = useLanguage()
  
  return (
    <div className="h-full flex flex-col">
      <Header 
        title={t('insights.title')} 
        description={t('insights.subtitle')}
        actions={
          <Button variant="primary">
            <PlusIcon className="mr-2 h-4 w-4" />
            {t('insights.newProject')}
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
                  {t('insights.whyCollectInsights')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('insights.whyCollectDescription')}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    {t('insights.identifyPainPoints')}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    {t('insights.measureProgress')}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    {t('insights.validateChanges')}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    {t('insights.understandNeeds')}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quantitative Methods */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">{t('insights.quantitativeMethods')}</h2>
            <span className="text-sm text-gray-500">{t('insights.quantitativeDescription')}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {getQuantitativeMethods(t).map((method) => (
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
                      {t('insights.getStarted')}
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
            <h2 className="text-2xl font-semibold text-gray-900">{t('insights.qualitativeMethods')}</h2>
            <span className="text-sm text-gray-500">{t('insights.qualitativeDescription')}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {getQualitativeMethods(t).map((method) => (
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
                      {t('insights.getStarted')}
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
            <h2 className="text-2xl font-semibold text-gray-900">{t('insights.toolsAndTemplates')}</h2>
            <span className="text-sm text-gray-500">{t('insights.toolsDescription')}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getTools(t).map((tool) => (
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
                {t('insights.gettingStarted.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('insights.gettingStarted.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/getting-started">
                  <Button variant="primary">
                    {t('insights.gettingStarted.guideButton')}
                  </Button>
                </Link>
                <Link href="/insights/best-practices">
                  <Button variant="outline">
                    {t('insights.gettingStarted.bestPracticesButton')}
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