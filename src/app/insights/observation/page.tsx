'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  EyeIcon,
  ClockIcon,
  LightbulbIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  CameraIcon,
  MapIcon,
  UserIcon,
  NotebookIcon,
  ShieldIcon,
  TrendingUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react'
import Link from 'next/link'

const observationTypes = [
  {
    typeKey: "observation.types.naturalistic.title",
    icon: EyeIcon,
    descriptionKey: "observation.types.naturalistic.description",
    durationKey: "observation.types.naturalistic.duration",
    whenKey: "observation.types.naturalistic.when",
    prosKeys: ["observation.types.naturalistic.pros1", "observation.types.naturalistic.pros2", "observation.types.naturalistic.pros3"],
    consKeys: ["observation.types.naturalistic.cons1", "observation.types.naturalistic.cons2", "observation.types.naturalistic.cons3"],
    exampleKeys: ["observation.types.naturalistic.example1", "observation.types.naturalistic.example2", "observation.types.naturalistic.example3"]
  },
  {
    typeKey: "observation.types.structured.title",
    icon: NotebookIcon,
    descriptionKey: "observation.types.structured.description",
    durationKey: "observation.types.structured.duration",
    whenKey: "observation.types.structured.when",
    prosKeys: ["observation.types.structured.pros1", "observation.types.structured.pros2", "observation.types.structured.pros3"],
    consKeys: ["observation.types.structured.cons1", "observation.types.structured.cons2", "observation.types.structured.cons3"],
    exampleKeys: ["observation.types.structured.example1", "observation.types.structured.example2", "observation.types.structured.example3"]
  },
  {
    typeKey: "observation.types.participant.title",
    icon: UserIcon,
    descriptionKey: "observation.types.participant.description",
    durationKey: "observation.types.participant.duration",
    whenKey: "observation.types.participant.when",
    prosKeys: ["observation.types.participant.pros1", "observation.types.participant.pros2", "observation.types.participant.pros3"],
    consKeys: ["observation.types.participant.cons1", "observation.types.participant.cons2", "observation.types.participant.cons3"],
    exampleKeys: ["observation.types.participant.example1", "observation.types.participant.example2", "observation.types.participant.example3"]
  }
]

const observationSteps = [
  {
    step: 1,
    titleKey: "observation.process.step1.title",
    icon: MapIcon,
    taskKeys: [
      "observation.process.step1.task1",
      "observation.process.step1.task2",
      "observation.process.step1.task3",
      "observation.process.step1.task4",
      "observation.process.step1.task5"
    ]
  },
  {
    step: 2,
    titleKey: "observation.process.step2.title",
    icon: EyeIcon,
    taskKeys: [
      "observation.process.step2.task1",
      "observation.process.step2.task2",
      "observation.process.step2.task3",
      "observation.process.step2.task4",
      "observation.process.step2.task5"
    ]
  },
  {
    step: 3,
    titleKey: "observation.process.step3.title",
    icon: CameraIcon,
    taskKeys: [
      "observation.process.step3.task1",
      "observation.process.step3.task2",
      "observation.process.step3.task3",
      "observation.process.step3.task4",
      "observation.process.step3.task5"
    ]
  },
  {
    step: 4,
    titleKey: "observation.process.step4.title",
    icon: TrendingUpIcon,
    taskKeys: [
      "observation.process.step4.task1",
      "observation.process.step4.task2",
      "observation.process.step4.task3",
      "observation.process.step4.task4",
      "observation.process.step4.task5"
    ]
  }
]

const whatToObserve = [
  {
    categoryKey: "observation.whatToObserve.behaviors.title",
    descriptionKey: "observation.whatToObserve.behaviors.description",
    exampleKeys: [
      "observation.whatToObserve.behaviors.example1",
      "observation.whatToObserve.behaviors.example2",
      "observation.whatToObserve.behaviors.example3",
      "observation.whatToObserve.behaviors.example4",
      "observation.whatToObserve.behaviors.example5"
    ]
  },
  {
    categoryKey: "observation.whatToObserve.interactions.title",
    descriptionKey: "observation.whatToObserve.interactions.description",
    exampleKeys: [
      "observation.whatToObserve.interactions.example1",
      "observation.whatToObserve.interactions.example2",
      "observation.whatToObserve.interactions.example3",
      "observation.whatToObserve.interactions.example4",
      "observation.whatToObserve.interactions.example5"
    ]
  },
  {
    categoryKey: "observation.whatToObserve.emotions.title",
    descriptionKey: "observation.whatToObserve.emotions.description",
    exampleKeys: [
      "observation.whatToObserve.emotions.example1",
      "observation.whatToObserve.emotions.example2",
      "observation.whatToObserve.emotions.example3",
      "observation.whatToObserve.emotions.example4",
      "observation.whatToObserve.emotions.example5"
    ]
  },
  {
    categoryKey: "observation.whatToObserve.environment.title",
    descriptionKey: "observation.whatToObserve.environment.description",
    exampleKeys: [
      "observation.whatToObserve.environment.example1",
      "observation.whatToObserve.environment.example2",
      "observation.whatToObserve.environment.example3",
      "observation.whatToObserve.environment.example4",
      "observation.whatToObserve.environment.example5"
    ]
  }
]

const ethicalGuidelines = [
  {
    principleKey: "observation.ethics.consent.title",
    descriptionKey: "observation.ethics.consent.description",
    practiceKeys: [
      "observation.ethics.consent.practice1",
      "observation.ethics.consent.practice2",
      "observation.ethics.consent.practice3",
      "observation.ethics.consent.practice4"
    ]
  },
  {
    principleKey: "observation.ethics.confidentiality.title",
    descriptionKey: "observation.ethics.confidentiality.description",
    practiceKeys: [
      "observation.ethics.confidentiality.practice1",
      "observation.ethics.confidentiality.practice2",
      "observation.ethics.confidentiality.practice3",
      "observation.ethics.confidentiality.practice4"
    ]
  },
  {
    principleKey: "observation.ethics.minimalImpact.title",
    descriptionKey: "observation.ethics.minimalImpact.description",
    practiceKeys: [
      "observation.ethics.minimalImpact.practice1",
      "observation.ethics.minimalImpact.practice2",
      "observation.ethics.minimalImpact.practice3",
      "observation.ethics.minimalImpact.practice4"
    ]
  }
]

const commonChallenges = [
  {
    challengeKey: "observation.challenges.observerBias.title",
    descriptionKey: "observation.challenges.observerBias.description",
    solutionKey: "observation.challenges.observerBias.solution",
    preventionKey: "observation.challenges.observerBias.prevention"
  },
  {
    challengeKey: "observation.challenges.hawthorne.title",
    descriptionKey: "observation.challenges.hawthorne.description",
    solutionKey: "observation.challenges.hawthorne.solution",
    preventionKey: "observation.challenges.hawthorne.prevention"
  },
  {
    challengeKey: "observation.challenges.confirmation.title",
    descriptionKey: "observation.challenges.confirmation.description",
    solutionKey: "observation.challenges.confirmation.solution",
    preventionKey: "observation.challenges.confirmation.prevention"
  },
  {
    challengeKey: "observation.challenges.tooMuchData.title",
    descriptionKey: "observation.challenges.tooMuchData.description",
    solutionKey: "observation.challenges.tooMuchData.solution",
    preventionKey: "observation.challenges.tooMuchData.prevention"
  }
]

const steps = [
  {
    id: 'overview',
    title: 'Overview',
    description: 'What is observation and what types exist?'
  },
  {
    id: 'planning',
    title: 'Planning',
    description: 'Preparation and setup of observation'
  },
  {
    id: 'execution',
    title: 'Execution',
    description: 'What to observe and document'
  },
  {
    id: 'ethics',
    title: 'Ethics & Challenges',
    description: 'Ethical guidelines and common challenges'
  },
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'Analysis and reporting of observations'
  }
]

export default function ObservationPage() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="h-full flex flex-col grid-background">
      <Header
        title="Guide: Observation"
        description={`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep].title}`}
      />

      <div className="flex-1 p-6 overflow-auto pb-32" style={{background: 'transparent'}}>
        {/* Step Content */}
        <div className="space-y-8">
          {/* Step 1: Overview */}
          {currentStep === 0 && (
            <>
              {/* Introduction */}
              <Card className="mb-8 border-0 bg-white rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <EyeIcon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t('observation.intro.title')}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {t('observation.intro.description')}
                      </p>
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-lg font-semibold text-gray-900 mb-2">
                          "{t('observation.intro.quote')}"
                        </div>
                        <p className="text-sm text-gray-600">
                          {t('observation.intro.quoteDescription')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Observation Types */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('observation.types.title')}</h2>
                <div className="space-y-6">
                  {observationTypes.map((type, index) => (
                    <Card key={index} className="border-0 bg-white rounded-xl overflow-hidden">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                                <type.icon className="h-4 w-4 text-slate-600" />
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900">{t(type.typeKey)}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{t(type.descriptionKey)}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {t(type.durationKey)}
                            </div>
                            <div className="mt-3">
                              <h4 className="font-medium text-gray-900 mb-1">{t('observation.types.whenToUse')}</h4>
                              <p className="text-sm text-gray-600">{t(type.whenKey)}</p>
                            </div>
                          </div>

                          <div className="lg:col-span-1">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium text-slate-700 mb-2">{t('observation.types.pros')}</h4>
                                <ul className="space-y-1">
                                  {type.prosKeys.map((proKey, proIndex) => (
                                    <li key={proIndex} className="text-sm text-gray-600 flex items-start">
                                      <CheckCircleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {t(proKey)}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-medium text-slate-700 mb-2">{t('observation.types.challenges')}</h4>
                                <ul className="space-y-1">
                                  {type.consKeys.map((conKey, conIndex) => (
                                    <li key={conIndex} className="text-sm text-gray-600 flex items-start">
                                      <AlertTriangleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                                      {t(conKey)}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="lg:col-span-1">
                            <h4 className="font-medium text-gray-900 mb-2">{t('observation.types.examples')}</h4>
                            <ul className="space-y-1">
                              {type.exampleKeys.map((exampleKey, exampleIndex) => (
                                <li key={exampleIndex} className="text-sm text-gray-600 pl-4 border-l-2 border-l-slate-200">
                                  {t(exampleKey)}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Planning */}
          {currentStep === 1 && (
            <>
              {/* Process Steps */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('observation.process.title')}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {observationSteps.map((step, index) => (
                    <Card key={index} className="relative border-t-4 border-t-slate-500">
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center font-bold text-sm">
                            {step.step}
                          </div>
                          <CardTitle className="text-base">{t(step.titleKey)}</CardTitle>
                        </div>
                        <step.icon className="h-6 w-6 text-slate-600 mt-2" />
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2">
                          {step.taskKeys.map((taskKey, taskIndex) => (
                            <li key={taskIndex} className="text-xs text-gray-600 flex items-start">
                              <CheckCircleIcon className="h-3 w-3 text-slate-500 mr-1 mt-0.5 flex-shrink-0" />
                              {t(taskKey)}
                            </li>
                          ))}
                        </ul>
                      </CardContent>

                      {/* Arrow to next step */}
                      {index < observationSteps.length - 1 && (
                        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
                          <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 3: Execution */}
          {currentStep === 2 && (
            <>
              {/* What to Observe */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('observation.whatToObserve.title')}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {whatToObserve.map((category, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{t(category.categoryKey)}</CardTitle>
                        <p className="text-gray-600">{t(category.descriptionKey)}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {category.exampleKeys.map((exampleKey, exampleIndex) => (
                            <li key={exampleIndex} className="text-sm text-gray-700 flex items-start">
                              <EyeIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                              {t(exampleKey)}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 4: Ethics & Challenges */}
          {currentStep === 3 && (
            <>
              {/* Ethical Guidelines */}
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('observation.ethics.title')}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {ethicalGuidelines.map((guideline, index) => (
                    <Card key={index} className="border-l-4 border-l-slate-500">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <ShieldIcon className="h-6 w-6 text-slate-600" />
                          <CardTitle className="text-lg">{t(guideline.principleKey)}</CardTitle>
                        </div>
                        <p className="text-sm text-gray-600">{t(guideline.descriptionKey)}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2">
                          {guideline.practiceKeys.map((practiceKey, practiceIndex) => (
                            <li key={practiceIndex} className="text-sm text-gray-700 flex items-start">
                              <CheckCircleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                              {t(practiceKey)}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Common Challenges */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('observation.challenges.title')}</h2>
                <div className="space-y-4">
                  {commonChallenges.map((challenge, index) => (
                    <Card key={index} className="border-l-4 border-l-slate-500">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <AlertTriangleIcon className="h-6 w-6 text-slate-500 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">{t(challenge.challengeKey)}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">{t('observation.challenges.problem')}</h4>
                                <p className="text-gray-600">{t(challenge.descriptionKey)}</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">{t('observation.challenges.solution')}</h4>
                                <p className="text-gray-600">{t(challenge.solutionKey)}</p>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-1">{t('observation.challenges.prevention')}</h4>
                                <p className="text-gray-600">{t(challenge.preventionKey)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 5: Documentation */}
          {currentStep === 4 && (
            <>
              {/* Documentation Tips */}
              <Card className="mb-8 bg-slate-50 border-0">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <NotebookIcon className="h-8 w-8 text-slate-600 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {t('observation.documentation.title')}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span><strong>{t('observation.documentation.tip1')}</strong> - {t('observation.documentation.tip1Detail')}</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span><strong>{t('observation.documentation.tip2')}</strong> - {t('observation.documentation.tip2Detail')}</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span><strong>{t('observation.documentation.tip3')}</strong> - {t('observation.documentation.tip3Detail')}</span>
                          </li>
                        </ul>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span><strong>{t('observation.documentation.tip4')}</strong> - {t('observation.documentation.tip4Detail')}</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span><strong>{t('observation.documentation.tip5')}</strong> - {t('observation.documentation.tip5Detail')}</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span><strong>{t('observation.documentation.tip6')}</strong> - {t('observation.documentation.tip6Detail')}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Call to Action - shown on all steps */}
        <Card className="bg-slate-50 border-0 mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('observation.cta.title')}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {t('observation.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/getting-started">
                  <Button variant="primary">
                    {t('observation.cta.gettingStarted')}
                  </Button>
                </Link>
                <Link href="/insights/interviews">
                  <Button variant="outline">
                    {t('observation.cta.combineInterviews')}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fixed Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
            {/* Center - Back button, Progress indicator and Next button */}
            <div className="flex items-center space-x-6">
              {/* Back button - only show if not on first step */}
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center space-x-2 px-4 py-2"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                  <span>Back</span>
                </Button>
              )}

              {/* Progress indicator */}
              <span className="text-sm text-gray-600 font-medium">
                {currentStep + 1}/{steps.length}
              </span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-slate-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>

              {/* Next button */}
              {currentStep < steps.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-6 py-2"
                >
                  <span>Next</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              ) : (
                <Link href="/insights">
                  <Button variant="primary" className="flex items-center space-x-2 px-6 py-2">
                    <span>Done</span>
                    <CheckCircleIcon className="h-4 w-4" />
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