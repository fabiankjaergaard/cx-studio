'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  PlusIcon,
  BarChart3Icon,
  UsersIcon,
  ClipboardIcon,
  PlayIcon,
  FolderIcon,
  BookTemplateIcon,
  HomeIcon,
  TrendingUpIcon,
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  ShareIcon,
  DownloadIcon,
  CopyIcon,
  EyeIcon,
  TrashIcon,
  StarIcon,
  MessageSquareIcon,
  CheckSquareIcon,
  SlidersIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  SaveIcon
} from 'lucide-react'
import Link from 'next/link'

function SurveyContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam) {
      setActiveTab(tabParam)
    } else {
      setActiveTab('overview')
    }
  }, [searchParams])

  // Mock survey data - replace with actual data later
  const [surveys, setSurveys] = useState([
    {
      id: '1',
      title: 'Customer Satisfaction Q4 2024',
      description: 'Measure customer satisfaction after product launch',
      status: 'draft',
      responses: 0,
      created: '2024-01-15',
      type: 'CSAT',
      questions: 8
    },
    {
      id: '2',
      title: 'NPS Baseline',
      description: 'Baseline measurement for Net Promoter Score',
      status: 'active',
      responses: 156,
      created: '2024-01-10',
      type: 'NPS',
      questions: 5
    },
    {
      id: '3',
      title: 'User Experience Checkout',
      description: 'Evaluate the checkout process',
      status: 'completed',
      responses: 342,
      created: '2024-01-05',
      type: 'CES',
      questions: 12
    }
  ])

  const quickActions = [
    {
      title: t('surveyBuilder.page.quickActions.newSurvey.title'),
      description: t('surveyBuilder.page.quickActions.newSurvey.description'),
      icon: PlusIcon,
      action: "create",
      primary: true
    },
    {
      title: t('surveyBuilder.page.quickActions.analyzeResults.title'),
      description: t('surveyBuilder.page.quickActions.analyzeResults.description'),
      icon: BarChart3Icon,
      action: "analyze"
    },
    {
      title: t('surveyBuilder.page.quickActions.templates.title'),
      description: t('surveyBuilder.page.quickActions.templates.description'),
      icon: BookTemplateIcon,
      action: "templates"
    }
  ]

  const surveyTemplates = [
    {
      id: 'nps-standard',
      name: t('surveyBuilder.page.templates.npsStandard.name'),
      description: t('surveyBuilder.page.templates.npsStandard.description'),
      questions: 3,
      icon: TrendingUpIcon,
      color: 'bg-gray-50 text-gray-600'
    },
    {
      id: 'csat-basic',
      name: t('surveyBuilder.page.templates.csatBasic.name'),
      description: t('surveyBuilder.page.templates.csatBasic.description'),
      questions: 5,
      icon: StarIcon,
      color: 'bg-gray-50 text-gray-600'
    },
    {
      id: 'ces-checkout',
      name: t('surveyBuilder.page.templates.cesCheckout.name'),
      description: t('surveyBuilder.page.templates.cesCheckout.description'),
      questions: 4,
      icon: SlidersIcon,
      color: 'bg-gray-50 text-gray-600'
    }
  ]

  const Dashboard = () => (
    <div className="space-y-8">
      {/* Survey Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="group border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">{t('surveyBuilder.page.stats.totalSurveys')}</p>
                <p className="text-3xl font-bold text-gray-900">{surveys.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ClipboardIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">{t('surveyBuilder.page.stats.activeSurveys')}</p>
                <p className="text-3xl font-bold text-gray-900">{surveys.filter(s => s.status === 'active').length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <PlayIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">{t('surveyBuilder.page.stats.totalResponses')}</p>
                <p className="text-3xl font-bold text-gray-900">{surveys.reduce((sum, s) => sum + s.responses, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <UsersIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">{t('surveyBuilder.page.stats.averageResponseRate')}</p>
                <p className="text-3xl font-bold text-gray-900">78%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUpIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Surveys */}
      <Card className="group border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900 transition-colors duration-200 group-hover:text-slate-700">
              {t('surveyBuilder.page.stats.recentSurveys')} ({surveys.length})
            </CardTitle>
            <Button variant="outline" size="sm" className="hover:bg-gray-100 hover:scale-105 transition-all duration-200 rounded-xl">
              <EyeIcon className="h-4 w-4 mr-2" />
              {t('surveyBuilder.page.stats.viewAll')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {surveys.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ClipboardIcon className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('surveyBuilder.page.stats.noSurveysYet')}</h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">{t('surveyBuilder.page.stats.noSurveysDescription')}</p>
              <Button
                variant="primary"
                onClick={() => setActiveTab('create')}
                className="hover:scale-105 transition-transform duration-200"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                {t('surveyBuilder.page.stats.createSurvey')}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {surveys.map((survey) => (
                <div
                  key={survey.id}
                  className="group/survey flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover/survey:scale-110 bg-gradient-to-br from-gray-100 to-gray-200">
                      {survey.type === 'NPS' ? <TrendingUpIcon className="h-6 w-6 text-gray-600" /> :
                       survey.type === 'CSAT' ? <StarIcon className="h-6 w-6 text-gray-600" /> :
                       <SlidersIcon className="h-6 w-6 text-gray-600" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 transition-colors duration-200 group-hover/survey:text-slate-700">
                        {survey.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {survey.created} · {survey.questions} {t('surveyBuilder.page.stats.questions')} · {survey.responses} {t('surveyBuilder.page.stats.responses')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 bg-gray-100 text-gray-800">
                      {survey.status === 'active' ? t('surveyBuilder.page.mySurveys.active') : survey.status === 'completed' ? t('surveyBuilder.page.mySurveys.completed') : t('surveyBuilder.page.mySurveys.draft')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const CreateSurvey = () => (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-sm">
        <CardContent className="p-10 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-8 hover:scale-105 transition-transform duration-300">
            <PlusIcon className="h-10 w-10 text-gray-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            {t('surveyBuilder.page.create.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('surveyBuilder.page.create.description')}
          </p>
        </CardContent>
      </Card>

      {/* Quick Start Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card
          className="group border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
          onClick={() => setActiveTab('builder')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <PlusIcon className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-slate-700 transition-colors duration-200">
              {t('surveyBuilder.page.create.fromScratch.title')}
            </h3>
            <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-200 leading-relaxed">
              {t('surveyBuilder.page.create.fromScratch.description')}
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                <span>{t('surveyBuilder.page.create.features.fullCustomization')}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                <span>{t('surveyBuilder.page.create.features.allQuestionTypes')}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                <span>{t('surveyBuilder.page.create.features.advancedSettings')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <BookTemplateIcon className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-slate-700 transition-colors duration-200">
              {t('surveyBuilder.page.create.fromTemplate.title')}
            </h3>
            <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-200 leading-relaxed">
              {t('surveyBuilder.page.create.fromTemplate.description')}
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                <span>{t('surveyBuilder.page.create.features.quickStart')}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                <span>{t('surveyBuilder.page.create.features.provenQuestions')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Templates */}
      <Card className="border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-900">{t('surveyBuilder.page.create.popularTemplates')}</CardTitle>
          <p className="text-gray-600 text-lg">{t('surveyBuilder.page.create.popularTemplatesDescription')}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {surveyTemplates.map((template) => (
              <Card key={template.id} className="group border-0 bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-110 transition-transform duration-300">
                      <template.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-slate-700 transition-colors duration-200">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">{template.description}</p>
                      <p className="text-xs text-gray-500">{template.questions} {t('surveyBuilder.page.create.questionsIncluded')}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full hover:bg-gray-100 hover:scale-105 transition-all duration-200 rounded-xl">
                    {t('surveyBuilder.page.create.useTemplate')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Survey Builder Component - Original survey building functionality with left sidebar
  const SurveyBuilder = () => {
    const [survey, setSurvey] = useState({
      title: '',
      description: '',
      questions: []
    })
    const [selectedQuestion, setSelectedQuestion] = useState(null)
    const [isEditingQuestion, setIsEditingQuestion] = useState(false)

    const questionTypes = [
      {
        type: 'nps',
        name: t('surveyBuilder.page.builder.questionType.nps'),
        icon: TrendingUpIcon,
        description: t('surveyBuilder.page.builder.questionType.nps.description'),
        template: {
          title: 'How likely are you to recommend us to a friend or colleague?',
          type: 'nps',
          required: true
        }
      },
      {
        type: 'rating',
        name: t('surveyBuilder.page.builder.questionType.rating'),
        icon: StarIcon,
        description: t('surveyBuilder.page.builder.questionType.rating.description'),
        template: {
          title: 'How satisfied are you with our product?',
          type: 'rating',
          required: true
        }
      },
      {
        type: 'text',
        name: t('surveyBuilder.page.builder.questionType.text'),
        icon: MessageSquareIcon,
        description: t('surveyBuilder.page.builder.questionType.text.description'),
        template: {
          title: 'Tell us more about your experience',
          type: 'text',
          required: false
        }
      },
      {
        type: 'single-choice',
        name: t('surveyBuilder.page.builder.questionType.singleChoice'),
        icon: CheckSquareIcon,
        description: t('surveyBuilder.page.builder.questionType.singleChoice.description'),
        template: {
          title: 'What is your favorite feature?',
          type: 'single-choice',
          required: true,
          options: ['Option 1', 'Option 2', 'Option 3']
        }
      },
      {
        type: 'multiple-choice',
        name: t('surveyBuilder.page.builder.questionType.multipleChoice'),
        icon: SlidersIcon,
        description: t('surveyBuilder.page.builder.questionType.multipleChoice.description'),
        template: {
          title: 'Which features do you use most?',
          type: 'multiple-choice',
          required: false,
          options: ['Option 1', 'Option 2', 'Option 3']
        }
      }
    ]

    const addQuestionFromTemplate = (template) => {
      const newQuestion = {
        ...template,
        id: Date.now().toString()
      }

      setSurvey({
        ...survey,
        questions: [...survey.questions, newQuestion]
      })
    }

    const updateQuestion = (index, updates) => {
      const updatedQuestions = [...survey.questions]
      updatedQuestions[index] = { ...updatedQuestions[index], ...updates }
      setSurvey({ ...survey, questions: updatedQuestions })
    }

    const deleteQuestion = (index) => {
      const updatedQuestions = survey.questions.filter((_, i) => i !== index)
      setSurvey({ ...survey, questions: updatedQuestions })
      setSelectedQuestion(null)
    }

    const moveQuestion = (index, direction) => {
      const newQuestions = [...survey.questions]
      const newIndex = direction === 'up' ? index - 1 : index + 1

      if (newIndex >= 0 && newIndex < newQuestions.length) {
        [newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]]
        setSurvey({ ...survey, questions: newQuestions })

        // Update selected question index if we have one selected
        if (selectedQuestion === index) {
          setSelectedQuestion(newIndex)
        } else if (selectedQuestion === newIndex) {
          setSelectedQuestion(index)
        }
      }
    }

    const updateQuestionOption = (questionIndex, optionIndex, value) => {
      const updatedQuestions = [...survey.questions]
      const updatedOptions = [...(updatedQuestions[questionIndex].options || [])]
      updatedOptions[optionIndex] = value
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        options: updatedOptions
      }
      setSurvey({ ...survey, questions: updatedQuestions })
    }

    const addQuestionOption = (questionIndex) => {
      const updatedQuestions = [...survey.questions]
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        options: [...(updatedQuestions[questionIndex].options || []), '']
      }
      setSurvey({ ...survey, questions: updatedQuestions })
    }

    const removeQuestionOption = (questionIndex, optionIndex) => {
      const updatedQuestions = [...survey.questions]
      const updatedOptions = (updatedQuestions[questionIndex].options || []).filter((_, i) => i !== optionIndex)
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        options: updatedOptions
      }
      setSurvey({ ...survey, questions: updatedQuestions })
    }

    return (
      <div className="h-full flex">
        {/* Left Sidebar - Question Types */}
        <div className="w-80 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col shadow-sm">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('surveyBuilder.page.builder.questionTypes')}</h3>
            <p className="text-sm text-gray-600">{t('surveyBuilder.page.builder.clickToAdd')}</p>
          </div>

          <div className="flex-1 overflow-auto p-6 space-y-4">
            {questionTypes.map((type) => (
              <Card
                key={type.type}
                className="group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden"
                onClick={() => addQuestionFromTemplate(type.template)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <type.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-slate-700 transition-colors duration-200">{type.name}</h4>
                      <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200 leading-relaxed">{type.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Survey Header */}
          <div className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 p-8 shadow-sm">
            <div className="space-y-6 max-w-4xl">
              <div>
                <input
                  type="text"
                  value={survey.title}
                  onChange={(e) => setSurvey({...survey, title: e.target.value})}
                  placeholder={t('surveyBuilder.page.builder.surveyTitlePlaceholder')}
                  className="text-3xl font-bold text-gray-900 bg-transparent border-none outline-none placeholder-gray-400 w-full focus:ring-0 p-0 hover:placeholder-gray-500 transition-colors duration-200"
                />
              </div>
              <div>
                <textarea
                  value={survey.description}
                  onChange={(e) => setSurvey({...survey, description: e.target.value})}
                  placeholder={t('surveyBuilder.page.builder.surveyDescriptionPlaceholder')}
                  rows={2}
                  className="w-full text-lg text-gray-600 bg-transparent border-none outline-none placeholder-gray-400 resize-none focus:ring-0 p-0 hover:placeholder-gray-500 transition-colors duration-200 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Questions Area */}
          <div className="flex-1 overflow-auto bg-gray-50 p-8">
            {survey.questions.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:scale-105 transition-transform duration-300">
                    <ClipboardIcon className="h-10 w-10 text-gray-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t('surveyBuilder.page.builder.addFirstQuestion')}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{t('surveyBuilder.page.builder.addFirstQuestionDescription')}</p>
                  <div className="text-sm text-gray-500">
                    <p>{t('surveyBuilder.page.builder.addFirstQuestionTip')}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-4xl">
                {survey.questions.map((question, index) => (
                  <Card
                    key={question.id}
                    className={`group border-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                      selectedQuestion === index
                        ? 'ring-2 ring-slate-500 shadow-xl bg-gradient-to-br from-white to-gray-50'
                        : 'hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50'
                    }`}
                    onClick={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <span className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                            {index + 1}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {questionTypes.find(t => t.type === question.type)?.name}
                          </span>
                          {question.required && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {t('surveyBuilder.page.builder.required')}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              moveQuestion(index, 'up')
                            }}
                            disabled={index === 0}
                            className="p-1"
                          >
                            <ChevronUpIcon className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              moveQuestion(index, 'down')
                            }}
                            disabled={index === survey.questions.length - 1}
                            className="p-1"
                          >
                            <ChevronDownIcon className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteQuestion(index)
                            }}
                            className="p-1"
                          >
                            <TrashIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Question Content */}
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={question.title}
                          onChange={(e) => updateQuestion(index, { title: e.target.value })}
                          className="text-lg font-medium text-gray-900 bg-transparent border-none outline-none w-full focus:ring-0 p-0"
                          placeholder={t('surveyBuilder.page.builder.questionTitlePlaceholder')}
                        />

                        {/* Question-specific content */}
                        {question.type === 'nps' && (
                          <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">0 - {t('surveyBuilder.page.builder.notLikely')}</span>
                              <span className="text-sm text-gray-600">10 - {t('surveyBuilder.page.builder.extremelyLikely')}</span>
                            </div>
                            <div className="flex space-x-1">
                              {[...Array(11)].map((_, i) => (
                                <div key={i} className="w-8 h-8 bg-gray-100 rounded border flex items-center justify-center text-sm text-gray-600">
                                  {i}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {question.type === 'rating' && (
                          <div className="mt-4">
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} className="w-6 h-6 text-gray-300" />
                              ))}
                            </div>
                          </div>
                        )}

                        {question.type === 'text' && (
                          <div className="mt-4">
                            <div className="w-full h-20 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-sm text-gray-400">{t('surveyBuilder.page.builder.textFieldResponse')}</span>
                            </div>
                          </div>
                        )}

                        {(question.type === 'single-choice' || question.type === 'multiple-choice') && question.options && (
                          <div className="mt-4 space-y-2">
                            {question.options.map((option, optIndex) => (
                              <div key={optIndex} className="flex items-center space-x-2">
                                <div className={`w-4 h-4 border border-gray-300 ${question.type === 'single-choice' ? 'rounded-full' : 'rounded'} bg-white`}></div>
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => updateQuestionOption(index, optIndex, e.target.value)}
                                  className="flex-1 text-sm text-gray-700 bg-transparent border-none outline-none focus:ring-0 p-0"
                                  placeholder={t('surveyBuilder.page.builder.optionNumberPlaceholder', {number: optIndex + 1})}
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeQuestionOption(index, optIndex)}
                                  className="p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                  <TrashIcon className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addQuestionOption(index)}
                              className="text-xs"
                            >
                              <PlusIcon className="h-3 w-3 mr-1" />
                              {t('surveyBuilder.page.builder.addOption')}
                            </Button>
                          </div>
                        )}

                        {/* Required toggle */}
                        <div className="flex items-center space-x-2 mt-4">
                          <input
                            type="checkbox"
                            id={`required-${index}`}
                            checked={question.required}
                            onChange={(e) => updateQuestion(index, { required: e.target.checked })}
                            className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`required-${index}`} className="text-sm text-gray-700">
                            {t('surveyBuilder.page.builder.requiredQuestion')}
                          </label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          {survey.questions.length > 0 && (
            <div className="bg-gradient-to-r from-white to-gray-50 border-t border-gray-200 p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 max-w-4xl">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {survey.title || 'Untitled Survey'}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <ClipboardIcon className="h-4 w-4 mr-1" />
                      {survey.questions.length} {t('surveyBuilder.page.builder.questions')}
                    </span>
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {t('surveyBuilder.page.builder.estimatedTime', {time: Math.ceil(survey.questions.length * 0.5)})}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button variant="outline" className="hover:bg-gray-100 hover:scale-105 transition-all duration-200 rounded-xl">
                    <EyeIcon className="h-4 w-4 mr-2" />
                    {t('surveyBuilder.page.builder.preview')}
                  </Button>
                  <Button variant="outline" className="hover:bg-gray-100 hover:scale-105 transition-all duration-200 rounded-xl">
                    <SaveIcon className="h-4 w-4 mr-2" />
                    {t('surveyBuilder.page.builder.saveDraft')}
                  </Button>
                  <Button variant="primary" className="hover:scale-105 transition-transform duration-200 rounded-xl">
                    {t('surveyBuilder.page.builder.publishSurvey')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const SurveyAnalytics = () => (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-4xl mx-auto px-6">
        {/* Header with icons */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
              <BarChart3Icon className="h-9 w-9 text-gray-600" />
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
              <TrendingUpIcon className="h-9 w-9 text-gray-600" />
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
              <ClipboardIcon className="h-9 w-9 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-16">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
            Survey Analytics
          </h1>

          <div className="space-y-3">
            <p className="text-xl text-gray-600 font-medium">
              We're building powerful analytics to help you understand
            </p>
            <p className="text-xl text-gray-600 font-medium">
              your survey response data
            </p>
          </div>

          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Get insights from survey responses, track satisfaction trends, and measure the
            impact of your customer experience improvements
          </p>
        </div>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse shadow-sm"></div>
          <span className="font-semibold tracking-wide">Coming Soon</span>
        </div>
      </div>
    </div>
  )

  const MySurveys = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={t('surveyBuilder.page.mySurveys.searchPlaceholder')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>
          <div className="lg:w-48">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent">
              <option value="all">{t('surveyBuilder.page.mySurveys.allStatuses')}</option>
              <option value="draft">{t('surveyBuilder.page.mySurveys.draft')}</option>
              <option value="active">{t('surveyBuilder.page.mySurveys.active')}</option>
              <option value="completed">{t('surveyBuilder.page.mySurveys.completed')}</option>
            </select>
          </div>
          <div className="lg:w-48">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent">
              <option value="all">{t('surveyBuilder.page.mySurveys.allTypes')}</option>
              <option value="NPS">NPS</option>
              <option value="CSAT">CSAT</option>
              <option value="CES">CES</option>
            </select>
          </div>
        </div>
      </div>

      {/* Surveys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surveys.map((survey) => (
          <Card key={survey.id} className="border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out h-80 group cursor-pointer">
            <CardContent className="pt-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{survey.title}</h3>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {survey.status === 'active' ? t('surveyBuilder.page.mySurveys.active') : survey.status === 'completed' ? t('surveyBuilder.page.mySurveys.completed') : t('surveyBuilder.page.mySurveys.draft')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {survey.description}
                  </p>
                </div>
                <div className="flex space-x-1 ml-2">
                  <Button variant="outline" size="sm" className="p-2" title={t('surveyBuilder.page.mySurveys.copySurvey')}>
                    <CopyIcon className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2" title={t('surveyBuilder.page.mySurveys.deleteSurvey')}>
                    <TrashIcon className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div className="text-sm">
                  <div className="font-medium text-gray-700 mb-1">{t('surveyBuilder.page.mySurveys.statistics')}</div>
                  <div className="space-y-1 text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {survey.created}
                    </div>
                    <div className="flex items-center">
                      <UsersIcon className="h-3 w-3 mr-1" />
                      {survey.responses} {t('surveyBuilder.page.mySurveys.responses')}
                    </div>
                    <div className="flex items-center">
                      <MessageSquareIcon className="h-3 w-3 mr-1" />
                      {survey.questions} {t('surveyBuilder.page.mySurveys.questions')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{t('surveyBuilder.page.mySurveys.type')} {survey.type}</span>
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                  {survey.type}
                </span>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <Button variant="primary" size="sm" className="flex-1">
                  <EyeIcon className="h-3 w-3 mr-1" />
                  {t('surveyBuilder.page.mySurveys.view')}
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3Icon className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Survey Card */}
        <Card className="border-2 border-dashed border-gray-300 shadow-none hover:border-slate-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out h-80 cursor-pointer group hover:bg-slate-50/30">
          <CardContent className="pt-6 h-full flex flex-col">
            <div className="text-center py-12 flex-1 flex flex-col justify-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-100 group-hover:scale-110 transition-all duration-300 ease-out">
                <PlusIcon className="w-8 h-8 text-gray-400 group-hover:text-slate-600 transition-colors duration-200" />
              </div>
              <h3 className="text-lg font-medium text-gray-500 mb-2 group-hover:text-slate-700 transition-colors duration-200">
                {t('surveyBuilder.page.mySurveys.newSurvey')}
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-slate-600 transition-colors duration-200">
                {t('surveyBuilder.page.mySurveys.createNew')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      <Header
        title={
          activeTab === 'overview' ? t('surveyBuilder.page.header.overview.title') :
          activeTab === 'create' ? t('surveyBuilder.page.header.create.title') :
          activeTab === 'builder' ? t('surveyBuilder.page.header.builder.title') :
          activeTab === 'my-surveys' ? t('surveyBuilder.page.header.mySurveys.title') :
          activeTab === 'analyze' ? '' :
          t('surveyBuilder.page.header.templates.title')
        }
        description={
          activeTab === 'overview' ? t('surveyBuilder.page.header.overview.description') :
          activeTab === 'create' ? t('surveyBuilder.page.header.create.description') :
          activeTab === 'builder' ? t('surveyBuilder.page.header.builder.description') :
          activeTab === 'my-surveys' ? t('surveyBuilder.page.header.mySurveys.description') :
          activeTab === 'analyze' ? '' :
          t('surveyBuilder.page.header.templates.description')
        }
      />

      <div className={`flex-1 overflow-auto ${activeTab === 'analyze' ? 'bg-gray-50' : 'p-6 bg-gray-50'}`}>
        {activeTab === 'overview' && <Dashboard />}
        {activeTab === 'create' && <CreateSurvey />}
        {activeTab === 'builder' && <SurveyBuilder />}
        {activeTab === 'my-surveys' && <MySurveys />}
        {activeTab === 'analyze' && <SurveyAnalytics />}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <Card className="border-0 bg-white rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle>{t('surveyBuilder.page.templatesSection.title')}</CardTitle>
                <p className="text-gray-600">{t('surveyBuilder.page.templatesSection.description')}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {surveyTemplates.map((template) => (
                    <Card key={template.id} className="group border border-gray-200 hover:border-slate-300 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${template.color}`}>
                            <template.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-slate-700 transition-colors duration-200">
                              {template.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                            <p className="text-xs text-gray-500">{template.questions} {t('surveyBuilder.page.create.questionsIncluded')}</p>
                          </div>
                        </div>
                        <Button variant="primary" className="w-full hover:scale-[1.02] transition-transform duration-200">
                          {t('surveyBuilder.page.create.useTemplate')}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SurveyBuilderPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <SurveyContent />
    </Suspense>
  )
}