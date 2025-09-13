'use client'

import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  CheckCircleIcon, 
  AlertTriangleIcon,
  LightbulbIcon,
  UsersIcon,
  ClockIcon,
  BarChart3Icon,
  MessageSquareIcon,
  TrendingUpIcon,
  TargetIcon,
  ArrowRightIcon,
  BookOpenIcon,
  ClipboardIcon
} from 'lucide-react'
import Link from 'next/link'

// Define the structure but move content to component for translation
const getBestPractices = (t: any) => [
  {
    category: t('bestPractices.planningDesign'),
    icon: TargetIcon,
    color: 'text-blue-600 bg-blue-100',
    practices: [
      {
        title: t('bestPractices.clearGoalsTitle'),
        description: t('bestPractices.clearGoalsDescription'),
        dos: [
          t('bestPractices.clearGoalsDo1'),
          t('bestPractices.clearGoalsDo2'),
          t('bestPractices.clearGoalsDo3'),
          t('bestPractices.clearGoalsDo4')
        ],
        donts: [
          t('bestPractices.clearGoalsDont1'),
          t('bestPractices.clearGoalsDont2'),
          t('bestPractices.clearGoalsDont3')
        ]
      },
      {
        title: t('bestPractices.rightMethodTitle'),
        description: t('bestPractices.rightMethodDescription'),
        dos: [
          t('bestPractices.rightMethodDo1'),
          t('bestPractices.rightMethodDo2'),
          t('bestPractices.rightMethodDo3'),
          t('bestPractices.rightMethodDo4')
        ],
        donts: [
          t('bestPractices.rightMethodDont1'),
          t('bestPractices.rightMethodDont2'),
          t('bestPractices.rightMethodDont3')
        ]
      }
    ]
  },
  {
    category: t('bestPractices.dataCollection'),
    icon: ClipboardIcon,
    color: 'text-green-600 bg-green-100',
    practices: [
      {
        title: t('bestPractices.timingTitle'),
        description: t('bestPractices.timingDescription'),
        dos: [
          t('bestPractices.timingDo1'),
          t('bestPractices.timingDo2'),
          t('bestPractices.timingDo3'),
          t('bestPractices.timingDo4')
        ],
        donts: [
          t('bestPractices.timingDont1'),
          t('bestPractices.timingDont2'),
          t('bestPractices.timingDont3')
        ]
      },
      {
        title: t('bestPractices.goodQuestionsTitle'),
        description: t('bestPractices.goodQuestionsDescription'),
        dos: [
          t('bestPractices.goodQuestionsDo1'),
          t('bestPractices.goodQuestionsDo2'),
          t('bestPractices.goodQuestionsDo3'),
          t('bestPractices.goodQuestionsDo4')
        ],
        donts: [
          t('bestPractices.goodQuestionsDont1'),
          t('bestPractices.goodQuestionsDont2'),
          t('bestPractices.goodQuestionsDont3')
        ]
      }
    ]
  },
  {
    category: t('bestPractices.analysisActions'),
    icon: TrendingUpIcon,
    color: 'text-purple-600 bg-purple-100',
    practices: [
      {
        title: t('bestPractices.dataToInsightTitle'),
        description: t('bestPractices.dataToInsightDescription'),
        dos: [
          t('bestPractices.dataToInsightDo1'),
          t('bestPractices.dataToInsightDo2'),
          t('bestPractices.dataToInsightDo3'),
          t('bestPractices.dataToInsightDo4')
        ],
        donts: [
          t('bestPractices.dataToInsightDont1'),
          t('bestPractices.dataToInsightDont2'),
          t('bestPractices.dataToInsightDont3')
        ]
      },
      {
        title: t('bestPractices.actOnInsightsTitle'),
        description: t('bestPractices.actOnInsightsDescription'),
        dos: [
          t('bestPractices.actOnInsightsDo1'),
          t('bestPractices.actOnInsightsDo2'),
          t('bestPractices.actOnInsightsDo3'),
          t('bestPractices.actOnInsightsDo4')
        ],
        donts: [
          t('bestPractices.actOnInsightsDont1'),
          t('bestPractices.actOnInsightsDont2'),
          t('bestPractices.actOnInsightsDont3')
        ]
      }
    ]
  }
]

const getCommonMistakes = (t: any) => [
  {
    mistake: t('bestPractices.mistake1Title'),
    impact: t('bestPractices.mistake1Impact'),
    solution: t('bestPractices.mistake1Solution'),
    prevention: t('bestPractices.mistake1Prevention')
  },
  {
    mistake: t('bestPractices.mistake2Title'),
    impact: t('bestPractices.mistake2Impact'),
    solution: t('bestPractices.mistake2Solution'),
    prevention: t('bestPractices.mistake2Prevention')
  },
  {
    mistake: t('bestPractices.mistake3Title'),
    impact: t('bestPractices.mistake3Impact'),
    solution: t('bestPractices.mistake3Solution'),
    prevention: t('bestPractices.mistake3Prevention')
  },
  {
    mistake: t('bestPractices.mistake4Title'),
    impact: t('bestPractices.mistake4Impact'),
    solution: t('bestPractices.mistake4Solution'),
    prevention: t('bestPractices.mistake4Prevention')
  },
  {
    mistake: t('bestPractices.mistake5Title'),
    impact: t('bestPractices.mistake5Impact'),
    solution: t('bestPractices.mistake5Solution'),
    prevention: t('bestPractices.mistake5Prevention')
  }
]

const getMethodSpecificTips = (t: any) => [
  {
    method: t('bestPractices.npsMethod'),
    icon: TrendingUpIcon,
    tips: [
      t('bestPractices.npsTip1'),
      t('bestPractices.npsTip2'),
      t('bestPractices.npsTip3'),
      t('bestPractices.npsTip4')
    ]
  },
  {
    method: t('bestPractices.csatMethod'),
    icon: BarChart3Icon,
    tips: [
      t('bestPractices.csatTip1'),
      t('bestPractices.csatTip2'),
      t('bestPractices.csatTip3'),
      t('bestPractices.csatTip4')
    ]
  },
  {
    method: t('bestPractices.interviewsMethod'),
    icon: MessageSquareIcon,
    tips: [
      t('bestPractices.interviewsTip1'),
      t('bestPractices.interviewsTip2'),
      t('bestPractices.interviewsTip3'),
      t('bestPractices.interviewsTip4')
    ]
  },
  {
    method: t('bestPractices.focusGroupsMethod'),
    icon: UsersIcon,
    tips: [
      t('bestPractices.focusGroupsTip1'),
      t('bestPractices.focusGroupsTip2'),
      t('bestPractices.focusGroupsTip3'),
      t('bestPractices.focusGroupsTip4')
    ]
  }
]

const getProgressiveDisclosure = (t: any) => [
  {
    phase: t('bestPractices.exploratoryPhase'),
    description: t('bestPractices.exploratoryDescription'),
    methods: t('bestPractices.exploratoryMethods').split(', '),
    outcome: t('bestPractices.exploratoryOutcome'),
    nextStep: t('bestPractices.exploratoryNext')
  },
  {
    phase: t('bestPractices.validationPhase'),
    description: t('bestPractices.validationDescription'),
    methods: t('bestPractices.validationMethods').split(', '),
    outcome: t('bestPractices.validationOutcome'),
    nextStep: t('bestPractices.validationNext')
  },
  {
    phase: t('bestPractices.optimizationPhase'),
    description: t('bestPractices.optimizationDescription'),
    methods: t('bestPractices.optimizationMethods').split(', '),
    outcome: t('bestPractices.optimizationOutcome'),
    nextStep: t('bestPractices.optimizationNext')
  }
]

export default function BestPracticesPage() {
  const { t } = useLanguage()
  
  // Get translated data
  const bestPractices = getBestPractices(t)
  const commonMistakes = getCommonMistakes(t)
  const methodSpecificTips = getMethodSpecificTips(t)
  const progressiveDisclosure = getProgressiveDisclosure(t)

  return (
    <div className="h-full flex flex-col">
      <Header 
        title={t('bestPractices.title')} 
        description={t('bestPractices.description')}
        actions={
          <Link href="/insights">
            <Button variant="outline">
              {t('bestPractices.backToOverview')}
            </Button>
          </Link>
        }
      />
      
      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        {/* Introduction */}
        <Card className="mb-8 border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <LightbulbIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('bestPractices.fromOkToExcellent')}
                </h3>
                <p className="text-gray-600">
                  {t('bestPractices.introDescription')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progressive Approach */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('bestPractices.progressiveApproach')}</h2>
          <div className="space-y-6">
            {progressiveDisclosure.map((phase, index) => (
              <Card key={phase.phase} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{phase.phase}</h3>
                      <p className="text-gray-600 mb-4">{phase.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">{t('bestPractices.methods')}</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {phase.methods.map((method, methodIndex) => (
                              <li key={methodIndex} className="flex items-center">
                                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                                {method}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">{t('bestPractices.results')}</h4>
                          <p className="text-sm text-gray-600">{phase.outcome}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">{t('bestPractices.nextStep')}</h4>
                          <div className="flex items-center text-sm text-blue-600">
                            <ArrowRightIcon className="h-4 w-4 mr-1" />
                            {phase.nextStep}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Practices by Category */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('bestPractices.categoriesTitle')}</h2>
          <div className="space-y-8">
            {bestPractices.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {category.practices.map((practice, practiceIndex) => (
                    <Card key={practiceIndex}>
                      <CardHeader>
                        <CardTitle className="text-lg">{practice.title}</CardTitle>
                        <p className="text-gray-600">{practice.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="flex items-center font-medium text-green-700 mb-3">
                            <CheckCircleIcon className="h-4 w-4 mr-2" />
                            {t('bestPractices.doThis')}
                          </h4>
                          <ul className="space-y-1">
                            {practice.dos.map((doItem, doIndex) => (
                              <li key={doIndex} className="flex items-start text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                {doItem}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="flex items-center font-medium text-red-700 mb-3">
                            <AlertTriangleIcon className="h-4 w-4 mr-2" />
                            {t('bestPractices.avoidThis')}
                          </h4>
                          <ul className="space-y-1">
                            {practice.donts.map((dontItem, dontIndex) => (
                              <li key={dontIndex} className="flex items-start text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                {dontItem}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('bestPractices.commonMistakes')}</h2>
          <div className="space-y-4">
            {commonMistakes.map((mistake, index) => (
              <Card key={index} className="border-l-4 border-l-red-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <AlertTriangleIcon className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-red-800 mb-2">{mistake.mistake}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{t('bestPractices.impact')}</h4>
                          <p className="text-gray-600">{mistake.impact}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{t('bestPractices.solution')}</h4>
                          <p className="text-gray-600">{mistake.solution}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{t('bestPractices.prevention')}</h4>
                          <p className="text-gray-600">{mistake.prevention}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Method-Specific Tips */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('bestPractices.methodSpecificTips')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {methodSpecificTips.map((methodTip, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <methodTip.icon className="h-5 w-5 text-blue-600" />
                    <span>{methodTip.method}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {methodTip.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                        <LightbulbIcon className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('bestPractices.readyToApply')}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {t('bestPractices.ctaDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/getting-started">
                  <Button variant="primary">
                    <BookOpenIcon className="mr-2 h-4 w-4" />
                    {t('bestPractices.gettingStartedGuide')}
                  </Button>
                </Link>
                <Link href="/insights/survey-builder">
                  <Button variant="outline">
                    {t('bestPractices.createFirstSurvey')}
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