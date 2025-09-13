'use client'

import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  AlertCircleIcon,
  TrendingUpIcon,
  BarChart3Icon,
  MessageSquareIcon,
  ClipboardIcon,
  UsersIcon,
  MicIcon,
  EyeIcon,
  LightbulbIcon
} from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const getSteps = (t: (key: string) => string) => [
  {
    step: 1,
    title: t('gettingStarted.step1.title'),
    description: t('gettingStarted.step1.description'),
    details: [
      t('gettingStarted.step1.detail1'),
      t('gettingStarted.step1.detail2'),
      t('gettingStarted.step1.detail3')
    ]
  },
  {
    step: 2,
    title: t('gettingStarted.step2.title'),
    description: t('gettingStarted.step2.description'),
    details: [
      t('gettingStarted.step2.detail1'),
      t('gettingStarted.step2.detail2'),
      t('gettingStarted.step2.detail3')
    ]
  },
  {
    step: 3,
    title: t('gettingStarted.step3.title'),
    description: t('gettingStarted.step3.description'),
    details: [
      t('gettingStarted.step3.detail1'),
      t('gettingStarted.step3.detail2'),
      t('gettingStarted.step3.detail3')
    ]
  },
  {
    step: 4,
    title: t('gettingStarted.step4.title'),
    description: t('gettingStarted.step4.description'),
    details: [
      t('gettingStarted.step4.detail1'),
      t('gettingStarted.step4.detail2'),
      t('gettingStarted.step4.detail3')
    ]
  },
  {
    step: 5,
    title: t('gettingStarted.step5.title'),
    description: t('gettingStarted.step5.description'),
    details: [
      t('gettingStarted.step5.detail1'),
      t('gettingStarted.step5.detail2'),
      t('gettingStarted.step5.detail3')
    ]
  }
]

const getMethodGuide = (t: (key: string) => string) => [
  {
    category: t('gettingStarted.methodGuide.category'),
    methods: [
      {
        name: t('gettingStarted.methods.nps.name'),
        icon: TrendingUpIcon,
        when: t('gettingStarted.methods.nps.when'),
        frequency: t('gettingStarted.methods.nps.frequency'),
        sample: t('gettingStarted.methods.nps.sample'),
        color: "text-blue-600"
      },
      {
        name: t('gettingStarted.methods.csat.name'), 
        icon: BarChart3Icon,
        when: t('gettingStarted.methods.csat.when'),
        frequency: t('gettingStarted.methods.csat.frequency'),
        sample: t('gettingStarted.methods.csat.sample'),
        color: "text-green-600"
      },
      {
        name: t('gettingStarted.methods.ces.name'),
        icon: ClipboardIcon,
        when: t('gettingStarted.methods.ces.when'),
        frequency: t('gettingStarted.methods.ces.frequency'),
        sample: t('gettingStarted.methods.ces.sample'),
        color: "text-purple-600"
      },
      {
        name: t('gettingStarted.methods.interviews.name'),
        icon: MicIcon,
        when: t('gettingStarted.methods.interviews.when'),
        frequency: t('gettingStarted.methods.interviews.frequency'),
        sample: t('gettingStarted.methods.interviews.sample'),
        color: "text-orange-600"
      },
      {
        name: t('gettingStarted.methods.focusGroups.name'),
        icon: UsersIcon,
        when: t('gettingStarted.methods.focusGroups.when'),
        frequency: t('gettingStarted.methods.focusGroups.frequency'),
        sample: t('gettingStarted.methods.focusGroups.sample'),
        color: "text-pink-600"
      },
      {
        name: t('gettingStarted.methods.observation.name'),
        icon: EyeIcon,
        when: t('gettingStarted.methods.observation.when'),
        frequency: t('gettingStarted.methods.observation.frequency'),
        sample: t('gettingStarted.methods.observation.sample'),
        color: "text-indigo-600"
      }
    ]
  }
]

const getCommonMistakes = (t: (key: string) => string) => [
  {
    mistake: t('gettingStarted.commonMistakes.mistake1'),
    solution: t('gettingStarted.commonMistakes.solution1')
  },
  {
    mistake: t('gettingStarted.commonMistakes.mistake2'),
    solution: t('gettingStarted.commonMistakes.solution2')
  },
  {
    mistake: t('gettingStarted.commonMistakes.mistake3'),
    solution: t('gettingStarted.commonMistakes.solution3')
  },
  {
    mistake: t('gettingStarted.commonMistakes.mistake4'),
    solution: t('gettingStarted.commonMistakes.solution4')
  },
  {
    mistake: t('gettingStarted.commonMistakes.mistake5'),
    solution: t('gettingStarted.commonMistakes.solution5')
  }
]

export default function GettingStartedPage() {
  const { t } = useLanguage()
  
  const steps = getSteps(t)
  const methodGuide = getMethodGuide(t)
  const commonMistakes = getCommonMistakes(t)

  return (
    <div className="h-full flex flex-col">
      <Header 
        title={t('gettingStarted.pageTitle')} 
        description={t('gettingStarted.pageDescription')}
        actions={
          <Link href="/insights">
            <Button variant="outline">
              {t('gettingStarted.backToOverview')}
            </Button>
          </Link>
        }
      />
      
      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        {/* Introduction */}
        <Card className="mb-8 border-l-4 border-l-green-500 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <LightbulbIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('gettingStarted.successfulDataCollection')}
                </h3>
                <p className="text-gray-700">
                  {t('gettingStarted.introDescription')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('gettingStarted.processStepByStep')}</h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card key={step.step} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      {index < steps.length - 1 && (
                        <div className="flex justify-end mt-4">
                          <ArrowRightIcon className="h-5 w-5 text-gray-300" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Method Selection Guide */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('gettingStarted.methodGuide.title')}</h2>
          <div className="space-y-6">
            {methodGuide.map((section) => (
              <Card key={section.category}>
                <CardHeader>
                  <CardTitle>{section.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {section.methods.map((method) => (
                      <div key={method.name} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center space-x-3 mb-3">
                          <method.icon className={`h-5 w-5 ${method.color}`} />
                          <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">{t('gettingStarted.methods.when')}</span>
                            <span className="text-gray-600 ml-1">{method.when}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">{t('gettingStarted.methods.frequency')}</span>
                            <span className="text-gray-600 ml-1">{method.frequency}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">{t('gettingStarted.methods.sample')}</span>
                            <span className="text-gray-600 ml-1">{method.sample}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('gettingStarted.commonMistakes.title')}</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {commonMistakes.map((item, index) => (
                  <div key={index} className="border-l-4 border-l-red-200 pl-4 py-2">
                    <div className="flex items-start space-x-3">
                      <AlertCircleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-800 mb-1">{item.mistake}</h4>
                        <p className="text-gray-600 text-sm">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('gettingStarted.nextSteps.title')}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {t('gettingStarted.nextSteps.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/survey-builder">
                  <Button variant="primary">
                    {t('gettingStarted.nextSteps.createSurvey')}
                  </Button>
                </Link>
                <Link href="/insights/best-practices">
                  <Button variant="outline">
                    {t('gettingStarted.nextSteps.bestPractices')}
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