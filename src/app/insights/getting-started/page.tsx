'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  LightbulbIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  BarChart3Icon,
  MessageSquareIcon,
  ClipboardIcon,
  UsersIcon,
  MicIcon,
  EyeIcon,
  SearchIcon,
  TargetIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FileTextIcon
} from 'lucide-react'
import Link from 'next/link'

export default function GettingStartedPage() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({})

  const researchSteps = [
    {
      step: 1,
      title: t('gettingStarted.step1.title'),
      icon: TargetIcon,
      duration: t('gettingStarted.step1.duration'),
      description: t('gettingStarted.step1.description'),
      activities: [
        t('gettingStarted.step1.detail1'),
        t('gettingStarted.step1.detail2'),
        t('gettingStarted.step1.detail3')
      ],
      deliverables: [
        t('gettingStarted.step1.deliverable1'),
        t('gettingStarted.step1.deliverable2'),
        t('gettingStarted.step1.deliverable3')
      ]
    },
    {
      step: 2,
      title: t('gettingStarted.step2.title'),
      icon: SearchIcon,
      duration: t('gettingStarted.step2.duration'),
      description: t('gettingStarted.step2.description'),
      activities: [
        t('gettingStarted.step2.detail1'),
        t('gettingStarted.step2.detail2'),
        t('gettingStarted.step2.detail3')
      ],
      deliverables: [
        t('gettingStarted.step2.deliverable1'),
        t('gettingStarted.step2.deliverable2'),
        t('gettingStarted.step2.deliverable3')
      ]
    },
    {
      step: 3,
      title: t('gettingStarted.step3.title'),
      icon: MessageSquareIcon,
      duration: t('gettingStarted.step3.duration'),
      description: t('gettingStarted.step3.description'),
      activities: [
        t('gettingStarted.step3.detail1'),
        t('gettingStarted.step3.detail2'),
        t('gettingStarted.step3.detail3')
      ],
      deliverables: [
        t('gettingStarted.step3.deliverable1'),
        t('gettingStarted.step3.deliverable2'),
        t('gettingStarted.step3.deliverable3')
      ]
    },
    {
      step: 4,
      title: t('gettingStarted.step4.title'),
      icon: BarChart3Icon,
      duration: t('gettingStarted.step4.duration'),
      description: t('gettingStarted.step4.description'),
      activities: [
        t('gettingStarted.step4.detail1'),
        t('gettingStarted.step4.detail2'),
        t('gettingStarted.step4.detail3')
      ],
      deliverables: [
        t('gettingStarted.step4.deliverable1'),
        t('gettingStarted.step4.deliverable2'),
        t('gettingStarted.step4.deliverable3')
      ]
    },
    {
      step: 5,
      title: t('gettingStarted.step5.title'),
      icon: CheckCircleIcon,
      duration: t('gettingStarted.step5.duration'),
      description: t('gettingStarted.step5.description'),
      activities: [
        t('gettingStarted.step5.detail1'),
        t('gettingStarted.step5.detail2'),
        t('gettingStarted.step5.detail3')
      ],
      deliverables: [
        t('gettingStarted.step5.deliverable1'),
        t('gettingStarted.step5.deliverable2'),
        t('gettingStarted.step5.deliverable3')
      ]
    }
  ]

  const totalSteps = researchSteps.length

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))
  const goToStep = (step: number) => setCurrentStep(step)

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

  return (
    <div className="h-full flex flex-col grid-background">
      <Header
        title={t('gettingStarted.pageTitle')}
        description={`${t('gettingStarted.step')} ${currentStep + 1} ${t('gettingStarted.of')} ${totalSteps}: ${researchSteps[currentStep].title}`}
        actions={
          <div className="flex space-x-2">
            <Link href="/insights">
              <Button variant="outline">
                {t('gettingStarted.backToOverview')}
              </Button>
            </Link>
            <Link href="/insights/survey-builder">
              <Button variant="primary">
                <PlayIcon className="mr-2 h-4 w-4" />
                {t('gettingStarted.startCreating')}
              </Button>
            </Link>
          </div>
        }
      />
      <div className="flex-1 overflow-auto min-h-0" style={{background: 'transparent'}}>

        {/* Step Content */}
        <div className="p-8 pb-32">
          {/* Current Step Content */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-slate-100 rounded-xl">
                  {React.createElement(researchSteps[currentStep].icon, {
                    className: "h-8 w-8 text-slate-600"
                  })}
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    {t('gettingStarted.step')} {researchSteps[currentStep].step}: {researchSteps[currentStep].title}
                  </CardTitle>
                  <p className="text-gray-600 mt-2">{researchSteps[currentStep].description}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {t('gettingStarted.timeRequired')} {researchSteps[currentStep].duration}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('gettingStarted.activities')}</h3>
                  <ul className="space-y-3">
                    {researchSteps[currentStep].activities.map((activity, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('gettingStarted.deliverables')}</h3>
                  <div className="space-y-3">
                    {researchSteps[currentStep].deliverables.map((deliverable, index) => (
                      <div key={index} className="p-3 bg-gray-50 border-l-4 border-l-slate-400 rounded-r">
                        <span className="text-gray-700 font-medium">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step-Specific Quick Reference Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {currentStep === 0 && (
              <>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <TargetIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step1.card1.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step1.card1.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <LightbulbIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step1.card2.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step1.card2.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <UsersIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step1.card3.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step1.card3.description')}</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            {currentStep === 1 && (
              <>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <SearchIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step2.card1.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step2.card1.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <FileTextIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step2.card2.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step2.card2.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <EyeIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step2.card3.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step2.card3.description')}</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            {currentStep === 2 && (
              <>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <MessageSquareIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step3.card1.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step3.card1.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <MicIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step3.card2.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step3.card2.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <UsersIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step3.card3.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step3.card3.description')}</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            {currentStep === 3 && (
              <>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <BarChart3Icon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step4.card1.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step4.card1.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <TrendingUpIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step4.card2.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step4.card2.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <ClipboardIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step4.card3.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step4.card3.description')}</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            {currentStep === 4 && (
              <>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <CheckCircleIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step5.card1.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step5.card1.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <LightbulbIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step5.card2.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step5.card2.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <TrendingUpIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('gettingStarted.quickref.step5.card3.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('gettingStarted.quickref.step5.card3.description')}</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Expandable Sections */}
          <div className="space-y-4 mt-8">
            {/* Method Selection Guide */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleSection('methods')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    <LightbulbIcon className="h-5 w-5 text-slate-600" />
                    <span>{t('gettingStarted.methodGuide.title')}</span>
                  </CardTitle>
                  {expandedSections.methods ?
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" /> :
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  }
                </div>
              </CardHeader>
              {expandedSections.methods && (
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <TrendingUpIcon className="h-4 w-4 mr-2 text-slate-600" />
                        {t('gettingStarted.methods.nps.name')}
                      </h4>
                      <p className="text-sm text-gray-600">{t('gettingStarted.methods.nps.when')}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <BarChart3Icon className="h-4 w-4 mr-2 text-slate-600" />
                        {t('gettingStarted.methods.csat.name')}
                      </h4>
                      <p className="text-sm text-gray-600">{t('gettingStarted.methods.csat.when')}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <ClipboardIcon className="h-4 w-4 mr-2 text-slate-600" />
                        {t('gettingStarted.methods.ces.name')}
                      </h4>
                      <p className="text-sm text-gray-600">{t('gettingStarted.methods.ces.when')}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <MicIcon className="h-4 w-4 mr-2 text-slate-600" />
                        {t('gettingStarted.methods.interviews.name')}
                      </h4>
                      <p className="text-sm text-gray-600">{t('gettingStarted.methods.interviews.when')}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <UsersIcon className="h-4 w-4 mr-2 text-slate-600" />
                        {t('gettingStarted.methods.focusGroups.name')}
                      </h4>
                      <p className="text-sm text-gray-600">{t('gettingStarted.methods.focusGroups.when')}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <EyeIcon className="h-4 w-4 mr-2 text-slate-600" />
                        {t('gettingStarted.methods.observation.name')}
                      </h4>
                      <p className="text-sm text-gray-600">{t('gettingStarted.methods.observation.when')}</p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Common Mistakes Section */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleSection('mistakes')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    <AlertTriangleIcon className="h-5 w-5 text-slate-600" />
                    <span>{t('gettingStarted.commonMistakes.title')}</span>
                  </CardTitle>
                  {expandedSections.mistakes ?
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" /> :
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  }
                </div>
              </CardHeader>
              {expandedSections.mistakes && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <h4 className="font-medium text-slate-800 mb-1">{t('gettingStarted.commonMistakes.mistake1')}</h4>
                      <p className="text-sm text-gray-600">{t('gettingStarted.commonMistakes.solution1')}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <h4 className="font-medium text-slate-800 mb-1">{t('gettingStarted.commonMistakes.mistake2')}</h4>
                      <p className="text-sm text-gray-600">{t('gettingStarted.commonMistakes.solution2')}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <h4 className="font-medium text-slate-800 mb-1">{t('gettingStarted.commonMistakes.mistake3')}</h4>
                      <p className="text-sm text-gray-600">{t('gettingStarted.commonMistakes.solution3')}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <h4 className="font-medium text-slate-800 mb-1">{t('gettingStarted.commonMistakes.mistake4')}</h4>
                      <p className="text-sm text-gray-600">{t('gettingStarted.commonMistakes.solution4')}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <h4 className="font-medium text-slate-800 mb-1">{t('gettingStarted.commonMistakes.mistake5')}</h4>
                      <p className="text-sm text-gray-600">{t('gettingStarted.commonMistakes.solution5')}</p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>

        {/* Bottom Navigation with Progress */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="max-w-4xl mx-auto px-8 py-4">
            <div className="flex items-center justify-center space-x-6">
              {/* Back Button */}
              {currentStep > 0 ? (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center"
                >
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
                  {t('gettingStarted.back')}
                </Button>
              ) : (
                <div className="w-20"></div>
              )}

              {/* Progress Bar Center */}
              <div className="flex items-center space-x-3 px-4">
                <span className="text-sm font-medium text-gray-700">
                  {currentStep + 1}/{totalSteps}
                </span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-slate-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentStep + 1) / totalSteps) * 100)}%
                </span>
              </div>

              {/* Next Button */}
              {currentStep < totalSteps - 1 ? (
                <Button
                  variant="primary"
                  onClick={nextStep}
                  className="flex items-center"
                >
                  {t('gettingStarted.next')}
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Link href="/insights/survey-builder">
                  <Button variant="primary" className="flex items-center">
                    <PlayIcon className="h-4 w-4 mr-2" />
                    {t('gettingStarted.getStarted')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}