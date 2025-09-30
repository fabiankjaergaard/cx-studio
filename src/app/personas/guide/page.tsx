'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  UserIcon,
  LightbulbIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  SearchIcon,
  BarChart3Icon,
  MessageSquareIcon,
  EyeIcon,
  TargetIcon,
  HeartIcon,
  BrainIcon,
  TrendingUpIcon,
  UsersIcon,
  FileTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react'
import Link from 'next/link'

// This will be moved inside the component to access t function

// These arrays will be moved inside the component to access t function

export default function PersonaGuidePage() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({})

  const personaSteps = [
    {
      step: 1,
      title: t('personas.guide.step1.title'),
      icon: SearchIcon,
      duration: t('personas.guide.step1.duration'),
      description: t('personas.guide.step1.description'),
      activities: [
        t('personas.guide.step1.activity1'),
        t('personas.guide.step1.activity2'),
        t('personas.guide.step1.activity3'),
        t('personas.guide.step1.activity4'),
        t('personas.guide.step1.activity5')
      ],
      deliverables: [
        t('personas.guide.step1.deliverable1'),
        t('personas.guide.step1.deliverable2'),
        t('personas.guide.step1.deliverable3'),
        t('personas.guide.step1.deliverable4')
      ]
    },
    {
      step: 2,
      title: t('personas.guide.step2.title'),
      icon: BarChart3Icon,
      duration: t('personas.guide.step2.duration'),
      description: t('personas.guide.step2.description'),
      activities: [
        t('personas.guide.step2.activity1'),
        t('personas.guide.step2.activity2'),
        t('personas.guide.step2.activity3'),
        t('personas.guide.step2.activity4'),
        t('personas.guide.step2.activity5')
      ],
      deliverables: [
        t('personas.guide.step2.deliverable1'),
        t('personas.guide.step2.deliverable2'),
        t('personas.guide.step2.deliverable3')
      ]
    },
    {
      step: 3,
      title: t('personas.guide.step3.title'),
      icon: UserIcon,
      duration: t('personas.guide.step3.duration'),
      description: t('personas.guide.step3.description'),
      activities: [
        t('personas.guide.step3.activity1'),
        t('personas.guide.step3.activity2'),
        t('personas.guide.step3.activity3'),
        t('personas.guide.step3.activity4'),
        t('personas.guide.step3.activity5')
      ],
      deliverables: [
        t('personas.guide.step3.deliverable1'),
        t('personas.guide.step3.deliverable2'),
        t('personas.guide.step3.deliverable3')
      ]
    },
    {
      step: 4,
      title: t('personas.guide.step4.title'),
      icon: CheckCircleIcon,
      duration: t('personas.guide.step4.duration'),
      description: t('personas.guide.step4.description'),
      activities: [
        t('personas.guide.step4.activity1'),
        t('personas.guide.step4.activity2'),
        t('personas.guide.step4.activity3'),
        t('personas.guide.step4.activity4'),
        t('personas.guide.step4.activity5')
      ],
      deliverables: [
        t('personas.guide.step4.deliverable1'),
        t('personas.guide.step4.deliverable2'),
        t('personas.guide.step4.deliverable3')
      ]
    }
  ]

  const totalSteps = personaSteps.length

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
    <div className="h-full flex flex-col bg-gray-50">
      <Header
        title={t('personas.guide.title')}
        description={`${t('personas.guide.step')} ${currentStep + 1} ${t('personas.guide.of')} ${totalSteps}: ${personaSteps[currentStep].title}`}
        actions={
          <div className="flex space-x-2">
            <Link href="/personas">
              <Button variant="outline">
                {t('personas.guide.backToPersonas')}
              </Button>
            </Link>
            <Link href="/personas/create">
              <Button variant="primary">
                <PlayIcon className="mr-2 h-4 w-4" />
                {t('personas.guide.startCreating')}
              </Button>
            </Link>
          </div>
        }
      />
      <div className="flex-1 overflow-auto bg-gray-50 min-h-0">

        {/* Step Content */}
        <div className="p-8 pb-32">
          {/* Current Step Content */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-slate-100 rounded-xl">
                  {React.createElement(personaSteps[currentStep].icon, {
                    className: "h-8 w-8 text-slate-600"
                  })}
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    {t('personas.guide.step')} {personaSteps[currentStep].step}: {personaSteps[currentStep].title}
                  </CardTitle>
                  <p className="text-gray-600 mt-2">{personaSteps[currentStep].description}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {t('personas.guide.timeRequired')} {personaSteps[currentStep].duration}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('personas.guide.activities')}</h3>
                  <ul className="space-y-3">
                    {personaSteps[currentStep].activities.map((activity, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('personas.guide.deliverables')}</h3>
                  <div className="space-y-3">
                    {personaSteps[currentStep].deliverables.map((deliverable, index) => (
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
                        <MessageSquareIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('personas.guide.quickref.step1.card1.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.quickref.step1.card1.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <FileTextIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('personas.guide.quickref.step1.card2.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.quickref.step1.card2.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <UsersIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('personas.guide.quickref.step1.card3.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.quickref.step1.card3.description')}</p>
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
                        <BarChart3Icon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('personas.guide.quickref.step2.card1.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.quickref.step2.card1.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <TrendingUpIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('personas.guide.quickref.step2.card2.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.quickref.step2.card2.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <EyeIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('personas.guide.quickref.step2.card3.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.quickref.step2.card3.description')}</p>
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
                        <HeartIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('personas.guide.quickref.step3.card1.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.quickref.step3.card1.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <FileTextIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('personas.guide.quickref.step3.card2.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.quickref.step3.card2.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <TargetIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('personas.guide.quickref.step3.card3.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.quickref.step3.card3.description')}</p>
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
                        <UsersIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('personas.guide.quickref.step4.card1.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.quickref.step4.card1.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <CheckCircleIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('personas.guide.quickref.step4.card2.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.quickref.step4.card2.description')}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <LightbulbIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">{t('personas.guide.quickref.step4.card3.title')}</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.quickref.step4.card3.description')}</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Expandable Sections */}
          <div className="space-y-4 mt-8">
            {/* Step-Specific Expandable Content */}
            {currentStep === 0 && (
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleSection('research')}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <MessageSquareIcon className="h-5 w-5 text-slate-600" />
                      <span>{t('personas.guide.expandable.research.title')}</span>
                    </CardTitle>
                    {expandedSections.research ?
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" /> :
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                </CardHeader>
                {expandedSections.research && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">{t('personas.guide.expandable.research.interviews.title')}</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.expandable.research.interviews.description')}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">{t('personas.guide.expandable.research.surveys.title')}</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.expandable.research.surveys.description')}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">{t('personas.guide.expandable.research.analytics.title')}</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.expandable.research.analytics.description')}</p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )}

            {currentStep === 1 && (
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleSection('analysis')}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <BarChart3Icon className="h-5 w-5 text-slate-600" />
                      <span>{t('personas.guide.expandable.analysis.title')}</span>
                    </CardTitle>
                    {expandedSections.analysis ?
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" /> :
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                </CardHeader>
                {expandedSections.analysis && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Affinity Mapping</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Gruppera liknande insikter och mönster</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Behavioural Clustering</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Segmentera baserat på beteenden</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Pain Point Analysis</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Identifiera och prioritera utmaningar</p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleSection('creation')}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <UserIcon className="h-5 w-5 text-slate-600" />
                      <span>{t('personas.guide.expandable.creation.title')}</span>
                    </CardTitle>
                    {expandedSections.creation ?
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" /> :
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                </CardHeader>
                {expandedSections.creation && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <BrainIcon className="h-4 w-4 mr-2 text-slate-600" />
                          {t('personas.guide.expandable.creation.psychographics.title')}
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• {t('personas.guide.expandable.creation.psychographics.item1')}</li>
                          <li>• {t('personas.guide.expandable.creation.psychographics.item2')}</li>
                          <li>• {t('personas.guide.expandable.creation.psychographics.item3')}</li>
                          <li>• {t('personas.guide.expandable.creation.psychographics.item4')}</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <FileTextIcon className="h-4 w-4 mr-2 text-slate-600" />
                          {t('personas.guide.expandable.creation.demographics.title')}
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• {t('personas.guide.expandable.creation.demographics.item1')}</li>
                          <li>• {t('personas.guide.expandable.creation.demographics.item2')}</li>
                          <li>• {t('personas.guide.expandable.creation.demographics.item3')}</li>
                          <li>• {t('personas.guide.expandable.creation.demographics.item4')}</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleSection('implementation')}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <CheckCircleIcon className="h-5 w-5 text-slate-600" />
                      <span>{t('personas.guide.expandable.implementation.title')}</span>
                    </CardTitle>
                    {expandedSections.implementation ?
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" /> :
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                </CardHeader>
                {expandedSections.implementation && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">{t('personas.guide.expandable.implementation.workshops.title')}</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.expandable.implementation.workshops.description')}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">{t('personas.guide.expandable.implementation.validation.title')}</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.expandable.implementation.validation.description')}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">{t('personas.guide.expandable.implementation.maintenance.title')}</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{t('personas.guide.expandable.implementation.maintenance.description')}</p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )}


            {/* Step-Specific Mistakes Section */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleSection('mistakes')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    <AlertTriangleIcon className="h-5 w-5 text-red-600" />
                    <span>{t('personas.guide.mistakes.title')}</span>
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
                    {currentStep === 0 && (
                      <>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">{t('personas.guide.mistakes.step1.mistake1.title')}</h4>
                          <p className="text-sm text-red-600 mb-2">{t('personas.guide.mistakes.step1.mistake1.impact')}</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>{t('personas.guide.mistakes.solutionLabel')}</strong> {t('personas.guide.mistakes.step1.mistake1.solution')}</p>
                        </div>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">{t('personas.guide.mistakes.step1.mistake2.title')}</h4>
                          <p className="text-sm text-red-600 mb-2">{t('personas.guide.mistakes.step1.mistake2.impact')}</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>{t('personas.guide.mistakes.solutionLabel')}</strong> {t('personas.guide.mistakes.step1.mistake2.solution')}</p>
                        </div>
                      </>
                    )}
                    {currentStep === 1 && (
                      <>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">{t('personas.guide.mistakes.step2.mistake1.title')}</h4>
                          <p className="text-sm text-red-600 mb-2">{t('personas.guide.mistakes.step2.mistake1.impact')}</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>{t('personas.guide.mistakes.solutionLabel')}</strong> {t('personas.guide.mistakes.step2.mistake1.solution')}</p>
                        </div>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">{t('personas.guide.mistakes.step2.mistake2.title')}</h4>
                          <p className="text-sm text-red-600 mb-2">{t('personas.guide.mistakes.step2.mistake2.impact')}</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>{t('personas.guide.mistakes.solutionLabel')}</strong> {t('personas.guide.mistakes.step2.mistake2.solution')}</p>
                        </div>
                      </>
                    )}
                    {currentStep === 2 && (
                      <>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">{t('personas.guide.mistakes.step3.mistake1.title')}</h4>
                          <p className="text-sm text-red-600 mb-2">{t('personas.guide.mistakes.step3.mistake1.impact')}</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>{t('personas.guide.mistakes.solutionLabel')}</strong> {t('personas.guide.mistakes.step3.mistake1.solution')}</p>
                        </div>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">{t('personas.guide.mistakes.step3.mistake2.title')}</h4>
                          <p className="text-sm text-red-600 mb-2">{t('personas.guide.mistakes.step3.mistake2.impact')}</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>{t('personas.guide.mistakes.solutionLabel')}</strong> {t('personas.guide.mistakes.step3.mistake2.solution')}</p>
                        </div>
                      </>
                    )}
                    {currentStep === 3 && (
                      <>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">{t('personas.guide.mistakes.step4.mistake1.title')}</h4>
                          <p className="text-sm text-red-600 mb-2">{t('personas.guide.mistakes.step4.mistake1.impact')}</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>{t('personas.guide.mistakes.solutionLabel')}</strong> {t('personas.guide.mistakes.step4.mistake1.solution')}</p>
                        </div>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">{t('personas.guide.mistakes.step4.mistake2.title')}</h4>
                          <p className="text-sm text-red-600 mb-2">{t('personas.guide.mistakes.step4.mistake2.impact')}</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>{t('personas.guide.mistakes.solutionLabel')}</strong> {t('personas.guide.mistakes.step4.mistake2.solution')}</p>
                        </div>
                      </>
                    )}
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
                  {t('personas.guide.back')}
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
                  {t('personas.guide.next')}
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Link href="/personas/create">
                  <Button variant="primary" className="flex items-center">
                    <PlayIcon className="h-4 w-4 mr-2" />
                    {t('personas.guide.getStarted')}
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