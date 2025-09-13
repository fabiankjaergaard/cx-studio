'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  MicIcon, 
  ClockIcon, 
  LightbulbIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  UserIcon,
  MessageSquareIcon,
  HeadphonesIcon,
  FileTextIcon,
  PhoneIcon,
  VideoIcon,
  MapPinIcon
} from 'lucide-react'
import Link from 'next/link'

export default function InterviewsPage() {
  const { t } = useLanguage()
  
  const interviewTypes = [
    {
      type: t('interviews.types.structured.title'),
      icon: FileTextIcon,
      description: t('interviews.types.structured.description'),
      duration: t('interviews.types.structured.duration'),
      when: t('interviews.types.structured.when'),
      pros: [t('interviews.types.structured.pro1'), t('interviews.types.structured.pro2'), t('interviews.types.structured.pro3')],
      cons: [t('interviews.types.structured.con1'), t('interviews.types.structured.con2'), t('interviews.types.structured.con3')]
    },
    {
      type: t('interviews.types.semiStructured.title'),
      icon: MessageSquareIcon,
      description: t('interviews.types.semiStructured.description'),
      duration: t('interviews.types.semiStructured.duration'),
      when: t('interviews.types.semiStructured.when'),
      pros: [t('interviews.types.semiStructured.pro1'), t('interviews.types.semiStructured.pro2'), t('interviews.types.semiStructured.pro3')],
      cons: [t('interviews.types.semiStructured.con1'), t('interviews.types.semiStructured.con2'), t('interviews.types.semiStructured.con3')]
    },
    {
      type: t('interviews.types.unstructured.title'),
      icon: LightbulbIcon,
      description: t('interviews.types.unstructured.description'),
      duration: t('interviews.types.unstructured.duration'),
      when: t('interviews.types.unstructured.when'),
      pros: [t('interviews.types.unstructured.pro1'), t('interviews.types.unstructured.pro2'), t('interviews.types.unstructured.pro3')],
      cons: [t('interviews.types.unstructured.con1'), t('interviews.types.unstructured.con2'), t('interviews.types.unstructured.con3')]
    }
  ]

  const interviewChannels = [
    {
      channel: t('interviews.channels.inPerson.title'),
      icon: MapPinIcon,
      pros: [t('interviews.channels.inPerson.pro1'), t('interviews.channels.inPerson.pro2'), t('interviews.channels.inPerson.pro3')],
      cons: [t('interviews.channels.inPerson.con1'), t('interviews.channels.inPerson.con2'), t('interviews.channels.inPerson.con3')],
      bestFor: t('interviews.channels.inPerson.bestFor')
    },
    {
      channel: t('interviews.channels.video.title'),
      icon: VideoIcon,
      pros: [t('interviews.channels.video.pro1'), t('interviews.channels.video.pro2'), t('interviews.channels.video.pro3')],
      cons: [t('interviews.channels.video.con1'), t('interviews.channels.video.con2'), t('interviews.channels.video.con3')],
      bestFor: t('interviews.channels.video.bestFor')
    },
    {
      channel: t('interviews.channels.phone.title'),
      icon: PhoneIcon,
      pros: [t('interviews.channels.phone.pro1'), t('interviews.channels.phone.pro2'), t('interviews.channels.phone.pro3')],
      cons: [t('interviews.channels.phone.con1'), t('interviews.channels.phone.con2'), t('interviews.channels.phone.con3')],
      bestFor: t('interviews.channels.phone.bestFor')
    }
  ]

  const interviewGuideTemplate = [
    {
      section: t('interviews.guide.intro.title'),
      purpose: t('interviews.guide.intro.purpose'),
      questions: [
        t('interviews.guide.intro.q1'),
        t('interviews.guide.intro.q2'),
        t('interviews.guide.intro.q3')
      ]
    },
    {
      section: t('interviews.guide.background.title'),
      purpose: t('interviews.guide.background.purpose'),
      questions: [
        t('interviews.guide.background.q1'),
        t('interviews.guide.background.q2'),
        t('interviews.guide.background.q3')
      ]
    },
    {
      section: t('interviews.guide.deep.title'),
      purpose: t('interviews.guide.deep.purpose'),
      questions: [
        t('interviews.guide.deep.q1'),
        t('interviews.guide.deep.q2'),
        t('interviews.guide.deep.q3'),
        t('interviews.guide.deep.q4'),
        t('interviews.guide.deep.q5')
      ]
    },
    {
      section: t('interviews.guide.closing.title'),
      purpose: t('interviews.guide.closing.purpose'),
      questions: [
        t('interviews.guide.closing.q1'),
        t('interviews.guide.closing.q2'),
        t('interviews.guide.closing.q3')
      ]
    }
  ]

  const goodQuestions = [
    {
      category: t('interviews.questions.behavior.title'),
      questions: [
        t('interviews.questions.behavior.q1'),
        t('interviews.questions.behavior.q2'),
        t('interviews.questions.behavior.q3')
      ]
    },
    {
      category: t('interviews.questions.motivations.title'),
      questions: [
        t('interviews.questions.motivations.q1'),
        t('interviews.questions.motivations.q2'),
        t('interviews.questions.motivations.q3')
      ]
    },
    {
      category: t('interviews.questions.problems.title'),
      questions: [
        t('interviews.questions.problems.q1'),
        t('interviews.questions.problems.q2'),
        t('interviews.questions.problems.q3')
      ]
    },
    {
      category: t('interviews.questions.deepening.title'),
      questions: [
        t('interviews.questions.deepening.q1'),
        t('interviews.questions.deepening.q2'),
        t('interviews.questions.deepening.q3')
      ]
    }
  ]

  const avoidQuestions = [
    t('interviews.questions.avoid1'),
    t('interviews.questions.avoid2'),
    t('interviews.questions.avoid3'),
    t('interviews.questions.avoid4'),
    t('interviews.questions.avoid5')
  ]

  const analysisSteps = [
    {
      step: 1,
      title: t('interviews.analysis.step1.title'),
      description: t('interviews.analysis.step1.description'),
      tips: [t('interviews.analysis.step1.tip1'), t('interviews.analysis.step1.tip2'), t('interviews.analysis.step1.tip3'), t('interviews.analysis.step1.tip4')]
    },
    {
      step: 2,
      title: t('interviews.analysis.step2.title'),
      description: t('interviews.analysis.step2.description'),
      tips: [t('interviews.analysis.step2.tip1'), t('interviews.analysis.step2.tip2'), t('interviews.analysis.step2.tip3'), t('interviews.analysis.step2.tip4')]
    },
    {
      step: 3,
      title: t('interviews.analysis.step3.title'),
      description: t('interviews.analysis.step3.description'),
      tips: [t('interviews.analysis.step3.tip1'), t('interviews.analysis.step3.tip2'), t('interviews.analysis.step3.tip3'), t('interviews.analysis.step3.tip4')]
    },
    {
      step: 4,
      title: t('interviews.analysis.step4.title'),
      description: t('interviews.analysis.step4.description'),
      tips: [t('interviews.analysis.step4.tip1'), t('interviews.analysis.step4.tip2'), t('interviews.analysis.step4.tip3'), t('interviews.analysis.step4.tip4')]
    }
  ]

  return (
    <div className="h-full flex flex-col">
      <Header 
        title={t('interviews.pageTitle')} 
        description={t('interviews.pageDescription')}
        actions={
          <Link href="/insights">
            <Button variant="outline">
              {t('interviews.backToOverview')}
            </Button>
          </Link>
        }
      />
      
      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        {/* Introduction */}
        <Card className="mb-8 border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <MicIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('interviews.intro.title')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('interviews.intro.description')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="text-lg font-semibold text-orange-600">{t('interviews.intro.stat1.value')}</div>
                    <div className="text-sm text-gray-600">{t('interviews.intro.stat1.label')}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="text-lg font-semibold text-orange-600">{t('interviews.intro.stat2.value')}</div>
                    <div className="text-sm text-gray-600">{t('interviews.intro.stat2.label')}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="text-lg font-semibold text-orange-600">{t('interviews.intro.stat3.value')}</div>
                    <div className="text-sm text-gray-600">{t('interviews.intro.stat3.label')}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('interviews.types.title')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {interviewTypes.map((type, index) => (
              <Card key={index} className="border-t-4 border-t-orange-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <type.icon className="h-6 w-6 text-orange-600" />
                    <CardTitle className="text-lg">{type.type}</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">{type.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {type.duration}
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{t('interviews.types.whenToUse')}</h4>
                    <p className="text-sm text-gray-600">{type.when}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs font-medium text-green-700 mb-2">{t('interviews.types.advantages')}</h5>
                      <ul className="space-y-1">
                        {type.pros.map((pro, proIndex) => (
                          <li key={proIndex} className="text-xs text-gray-600 flex items-start">
                            <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium text-red-700 mb-2">{t('interviews.types.disadvantages')}</h5>
                      <ul className="space-y-1">
                        {type.cons.map((con, conIndex) => (
                          <li key={conIndex} className="text-xs text-gray-600 flex items-start">
                            <AlertTriangleIcon className="h-3 w-3 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                            {con}
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

        {/* Interview Channels */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('interviews.channels.title')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {interviewChannels.map((channel, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <channel.icon className="h-6 w-6 text-blue-600" />
                    <CardTitle className="text-lg">{channel.channel}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">{t('interviews.channels.advantages')}</h4>
                    <ul className="space-y-1">
                      {channel.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="text-sm text-gray-600 flex items-start">
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-red-700 mb-2">{t('interviews.channels.disadvantages')}</h4>
                    <ul className="space-y-1">
                      {channel.cons.map((con, conIndex) => (
                        <li key={conIndex} className="text-sm text-gray-600 flex items-start">
                          <AlertTriangleIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <h4 className="font-medium text-gray-900 mb-1">{t('interviews.channels.bestFor')}</h4>
                    <p className="text-sm text-gray-600">{channel.bestFor}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interview Guide Template */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('interviews.guide.title')}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{t('interviews.guide.subtitle')}</CardTitle>
              <p className="text-gray-600">{t('interviews.guide.description')}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {interviewGuideTemplate.map((section, index) => (
                  <div key={index} className="border-l-4 border-l-orange-200 pl-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{section.section}</h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{section.purpose}</span>
                    </div>
                    <ul className="space-y-2">
                      {section.questions.map((question, questionIndex) => (
                        <li key={questionIndex} className="text-sm text-gray-700 flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Good vs Bad Questions */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('interviews.questions.title')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Good Questions */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-green-800">{t('interviews.questions.good.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {goodQuestions.map((category, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-900 mb-2">{category.category}:</h4>
                      <ul className="space-y-1">
                        {category.questions.map((question, qIndex) => (
                          <li key={qIndex} className="text-sm text-gray-700 pl-4 border-l-2 border-l-green-200">
                            "{question}"
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bad Questions */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-red-800">{t('interviews.questions.bad.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-4">
                    {t('interviews.questions.bad.description')}
                  </p>
                  {avoidQuestions.map((question, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertTriangleIcon className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-700 line-through">"{question}"</p>
                        <p className="text-xs text-red-600 mt-1">
                          {index === 0 && t('interviews.questions.bad.reason1')}
                          {index === 1 && t('interviews.questions.bad.reason2')}
                          {index === 2 && t('interviews.questions.bad.reason3')}
                          {index === 3 && t('interviews.questions.bad.reason4')}
                          {index === 4 && t('interviews.questions.bad.reason5')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded">
                  <h5 className="font-medium text-red-800 mb-2">{t('interviews.questions.goldenRule.title')}</h5>
                  <p className="text-sm text-red-700">
                    {t('interviews.questions.goldenRule.text')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analysis Process */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('interviews.analysis.title')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {analysisSteps.map((step, index) => (
              <Card key={index} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                    <CardTitle className="text-base">{step.title}</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-xs text-gray-600 flex items-start">
                        <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                {/* Arrow to next step */}
                {index < analysisSteps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Final Tips */}
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-0 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <HeadphonesIcon className="h-8 w-8 text-orange-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('interviews.tips.title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>{t('interviews.tips.tip1.title')}</strong> - {t('interviews.tips.tip1.description')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>{t('interviews.tips.tip2.title')}</strong> - {t('interviews.tips.tip2.description')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>{t('interviews.tips.tip3.title')}</strong> - {t('interviews.tips.tip3.description')}</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>{t('interviews.tips.tip4.title')}</strong> - {t('interviews.tips.tip4.description')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>{t('interviews.tips.tip5.title')}</strong> - {t('interviews.tips.tip5.description')}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>{t('interviews.tips.tip6.title')}</strong> - {t('interviews.tips.tip6.description')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('interviews.cta.title')}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {t('interviews.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/getting-started">
                  <Button variant="primary">
                    {t('interviews.cta.gettingStarted')}
                  </Button>
                </Link>
                <Link href="/insights/focus-groups">
                  <Button variant="outline">
                    {t('interviews.cta.compareFocusGroups')}
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