'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  TrendingUpIcon, 
  UsersIcon, 
  AlertTriangleIcon,
  HeartIcon,
  PlusIcon,
  BarChart3Icon,
  CalendarIcon,
  TargetIcon,
  LightbulbIcon,
  CheckCircleIcon
} from 'lucide-react'
import Link from 'next/link'

const getNpsSegments = (t: (key: string) => string) => [
  {
    type: t('nps.promoters'),
    score: t('nps.promotersScore'),
    color: 'text-green-600 bg-green-100',
    description: t('nps.promotersDescription'),
    characteristics: [
      t('nps.promotersChar1'),
      t('nps.promotersChar2'),
      t('nps.promotersChar3'),
      t('nps.promotersChar4')
    ],
    actionItems: [
      t('nps.promotersAction1'),
      t('nps.promotersAction2'),
      t('nps.promotersAction3'),
      t('nps.promotersAction4')
    ]
  },
  {
    type: t('nps.passives'),
    score: t('nps.passivesScore'),
    color: 'text-yellow-600 bg-yellow-100',
    description: t('nps.passivesDescription'),
    characteristics: [
      t('nps.passivesChar1'),
      t('nps.passivesChar2'),
      t('nps.passivesChar3'),
      t('nps.passivesChar4')
    ],
    actionItems: [
      t('nps.passivesAction1'),
      t('nps.passivesAction2'),
      t('nps.passivesAction3'),
      t('nps.passivesAction4')
    ]
  },
  {
    type: t('nps.detractors'),
    score: t('nps.detractorsScore'),
    color: 'text-red-600 bg-red-100',
    description: t('nps.detractorsDescription'),
    characteristics: [
      t('nps.detractorsChar1'),
      t('nps.detractorsChar2'),
      t('nps.detractorsChar3'),
      t('nps.detractorsChar4')
    ],
    actionItems: [
      t('nps.detractorsAction1'),
      t('nps.detractorsAction2'),
      t('nps.detractorsAction3'),
      t('nps.detractorsAction4')
    ]
  }
]

const getBestPractices = (t: (key: string) => string) => [
  {
    title: t('nps.timingTitle'),
    description: t('nps.timingDescription'),
    tips: [
      t('nps.timingTip1'),
      t('nps.timingTip2'),
      t('nps.timingTip3'),
      t('nps.timingTip4')
    ]
  },
  {
    title: t('nps.frequencyTitle'),
    description: t('nps.frequencyDescription'),
    tips: [
      t('nps.frequencyTip1'),
      t('nps.frequencyTip2'),
      t('nps.frequencyTip3'),
      t('nps.frequencyTip4')
    ]
  },
  {
    title: t('nps.followUpTitle'),
    description: t('nps.followUpDescription'),
    tips: [
      t('nps.followUpTip1'),
      t('nps.followUpTip2'),
      t('nps.followUpTip3'),
      t('nps.followUpTip4')
    ]
  }
]

const getIndustryBenchmarks = (t: (key: string) => string) => [
  { industry: t('nps.saasIndustry'), average: 31, top: 72 },
  { industry: t('nps.ecommerceIndustry'), average: 47, top: 84 },
  { industry: t('nps.telecomIndustry'), average: 31, top: 68 },
  { industry: t('nps.bankingIndustry'), average: 34, top: 73 },
  { industry: t('nps.insuranceIndustry'), average: 34, top: 73 },
  { industry: t('nps.retailIndustry'), average: 39, top: 78 }
]

const getNpsTemplate = (t: (key: string) => string) => ({
  title: t('nps.templateTitle'),
  description: t('nps.templateDescription'),
  questions: [
    {
      type: 'nps',
      question: t('nps.question1'),
      description: t('nps.question1Description')
    },
    {
      type: 'text',
      question: t('nps.question2'),
      description: t('nps.question2Description')
    },
    {
      type: 'text',
      question: t('nps.question3'),
      description: t('nps.question3Description')
    }
  ]
})

export default function NPSPage() {
  const { t } = useLanguage()
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  
  const npsSegments = getNpsSegments(t)
  const bestPractices = getBestPractices(t)
  const industryBenchmarks = getIndustryBenchmarks(t)
  const npsTemplate = getNpsTemplate(t)

  return (
    <div className="h-full flex flex-col">
      <Header 
        title={t('nps.title')} 
        description={t('nps.description')}
        actions={
          <Link href="/insights/survey-builder">
            <Button variant="primary">
              <PlusIcon className="mr-2 h-4 w-4" />
              {t('nps.createButton')}
            </Button>
          </Link>
        }
      />
      
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Introduction */}
        <Card className="mb-8 border-0 bg-white rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUpIcon className="h-6 w-6 text-slate-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('nps.whatIsNps')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('nps.whatIsNpsDescription')}
                </p>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-center mb-2 text-gray-900">
                    {t('nps.formula')}
                  </div>
                  <div className="text-sm text-gray-600 text-center">
                    {t('nps.formulaDescription')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* NPS Segments */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('nps.threeSegments')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {npsSegments.map((segment) => (
              <Card
                key={segment.type}
                className={`cursor-pointer transition-all hover:shadow-md border-0 bg-white rounded-xl overflow-hidden ${
                  selectedSegment === segment.type ? 'ring-2 ring-slate-500' : ''
                }`}
                onClick={() => setSelectedSegment(selectedSegment === segment.type ? null : segment.type)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{segment.type}</CardTitle>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${segment.color}`}>
                      {segment.score}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{segment.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{t('nps.characteristics')}</h4>
                      <ul className="space-y-1">
                        {segment.characteristics.map((char, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {selectedSegment === segment.type && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 mb-2">{t('nps.recommendedActions')}</h4>
                        <ul className="space-y-1">
                          {segment.actionItems.map((action, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600">
                              <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('nps.bestPractices')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bestPractices.map((practice, index) => (
              <Card key={index} className="border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
                      <LightbulbIcon className="h-4 w-4 text-yellow-600" />
                    </div>
                    <span>{practice.title}</span>
                  </CardTitle>
                  <p className="text-gray-600 text-sm">{practice.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {practice.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Industry Benchmarks */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('nps.industryBenchmarks')}</h2>
          <Card className="border-0 bg-white rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                {t('nps.benchmarkDescription')}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">{t('nps.industryColumn')}</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">{t('nps.averageColumn')}</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">{t('nps.topColumn')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryBenchmarks.map((benchmark, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{benchmark.industry}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-slate-100 text-slate-800">
                            {benchmark.average}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {benchmark.top}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* NPS Template */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('nps.surveyTemplate')}</h2>
          <Card className="border-0 bg-white rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle>{npsTemplate.title}</CardTitle>
              <p className="text-gray-600">{npsTemplate.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {npsTemplate.questions.map((question, index) => (
                  <div key={index} className="border-l-4 border-l-gray-200 pl-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{question.question}</h4>
                        <p className="text-sm text-gray-600">{question.description}</p>
                        {question.type === 'nps' && (
                          <div className="flex space-x-2 mt-3">
                            {[...Array(11)].map((_, i) => (
                              <div key={i} className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center bg-gray-50 text-sm text-gray-900 font-medium">
                                {i}
                              </div>
                            ))}
                          </div>
                        )}
                        {question.type === 'text' && (
                          <div className="mt-3 border border-gray-300 rounded p-3 bg-gray-50 text-sm text-gray-500">
                            {t('nps.textAreaPlaceholder')}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t text-center">
                <Link href="/insights/survey-builder">
                  <Button variant="primary" className="mr-3">
                    {t('nps.useTemplate')}
                  </Button>
                </Link>
                <Button variant="outline">
                  {t('nps.customizeTemplate')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Steps */}
        <Card className="border-0 bg-white rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('nps.readyToMeasure')}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {t('nps.ctaDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/survey-builder">
                  <Button variant="primary">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    {t('nps.createButton')}
                  </Button>
                </Link>
                <Link href="/insights/getting-started">
                  <Button variant="outline">
                    {t('nps.learnMoreImplementation')}
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