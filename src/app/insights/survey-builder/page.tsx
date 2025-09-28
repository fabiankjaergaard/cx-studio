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
      title: 'Kundnöjdhet Q4 2024',
      description: 'Mät kundnöjdhet efter produktlansering',
      status: 'draft',
      responses: 0,
      created: '2024-01-15',
      type: 'CSAT',
      questions: 8
    },
    {
      id: '2',
      title: 'NPS Baseline',
      description: 'Baseline-mätning för Net Promoter Score',
      status: 'active',
      responses: 156,
      created: '2024-01-10',
      type: 'NPS',
      questions: 5
    },
    {
      id: '3',
      title: 'Användarupplevelse Checkout',
      description: 'Utvärdera checkoutprocessen',
      status: 'completed',
      responses: 342,
      created: '2024-01-05',
      type: 'CES',
      questions: 12
    }
  ])

  const quickActions = [
    {
      title: "Ny enkät",
      description: "Skapa enkät från grunden eller mall",
      icon: PlusIcon,
      action: "create",
      primary: true
    },
    {
      title: "Analysera resultat",
      description: "Granska svar och skapa insights",
      icon: BarChart3Icon,
      action: "analyze"
    },
    {
      title: "Mallar",
      description: "Använd färdiga enkätmallar",
      icon: BookTemplateIcon,
      action: "templates"
    }
  ]

  const surveyTemplates = [
    {
      id: 'nps-standard',
      name: 'NPS Standard',
      description: 'Net Promoter Score med standardfrågor',
      questions: 3,
      icon: TrendingUpIcon,
      color: 'bg-gray-50 text-gray-600'
    },
    {
      id: 'csat-basic',
      name: 'CSAT Grundläggande',
      description: 'Customer Satisfaction enkät',
      questions: 5,
      icon: StarIcon,
      color: 'bg-gray-50 text-gray-600'
    },
    {
      id: 'ces-checkout',
      name: 'CES Checkout',
      description: 'Customer Effort Score för checkout',
      questions: 4,
      icon: SlidersIcon,
      color: 'bg-gray-50 text-gray-600'
    }
  ]

  const Dashboard = () => (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className={`group border-0 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
              action.primary ? 'bg-slate-50 border-slate-200' : 'bg-white'
            }`}
            onClick={() => setActiveTab(action.action)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                  action.primary ? 'bg-slate-100 group-hover:bg-slate-200' : 'bg-gray-50 group-hover:bg-gray-100'
                }`}>
                  <action.icon className="h-6 w-6 text-gray-600 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 transition-colors duration-200 group-hover:text-slate-700">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm transition-colors duration-200 group-hover:text-gray-700">
                    {action.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Survey Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Totala enkäter</p>
                <p className="text-2xl font-bold text-gray-900">{surveys.length}</p>
              </div>
              <ClipboardIcon className="h-8 w-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktiva enkäter</p>
                <p className="text-2xl font-bold text-gray-900">{surveys.filter(s => s.status === 'active').length}</p>
              </div>
              <PlayIcon className="h-8 w-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Totala svar</p>
                <p className="text-2xl font-bold text-gray-900">{surveys.reduce((sum, s) => sum + s.responses, 0)}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Genomsnittlig svarsfrekvens</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
              <TrendingUpIcon className="h-8 w-8 text-slate-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Surveys */}
      <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="transition-colors duration-200 group-hover:text-slate-700">Senaste enkäter ({surveys.length})</CardTitle>
            <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
              <EyeIcon className="h-4 w-4 mr-2" />
              Visa alla
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {surveys.length === 0 ? (
            <div className="text-center py-8">
              <ClipboardIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Inga enkäter än</h3>
              <p className="text-gray-600 mb-4">Skapa din första enkät för att börja samla feedback</p>
              <Button variant="primary" onClick={() => setActiveTab('create')}>
                Skapa enkät
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {surveys.map((survey) => (
                <div
                  key={survey.id}
                  className="group/survey flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-sm cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-600">
                      {survey.type === 'NPS' ? <TrendingUpIcon className="h-5 w-5" /> :
                       survey.type === 'CSAT' ? <StarIcon className="h-5 w-5" /> :
                       <SlidersIcon className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 transition-colors duration-200 group-hover/survey:text-slate-700">
                        {survey.title}
                      </p>
                      <p className="text-sm text-gray-600">{survey.created} · {survey.questions} frågor · {survey.responses} svar</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {survey.status === 'active' ? 'Aktiv' : survey.status === 'completed' ? 'Avslutad' : 'Utkast'}
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
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 bg-white rounded-xl overflow-hidden">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <PlusIcon className="h-8 w-8 text-slate-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Skapa ny enkät
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Välj mellan att starta från en mall eller bygga din enkät från grunden.
          </p>
        </CardContent>
      </Card>

      {/* Quick Start Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className="group border-2 border-dashed border-gray-300 hover:border-slate-400 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          onClick={() => setActiveTab('builder')}
        >
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 transition-colors duration-300">
              <PlusIcon className="h-6 w-6 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-slate-700 transition-colors duration-200">
              Från grunden
            </h3>
            <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-200">
              Bygg din enkät från scratch med full kontroll över alla frågor och inställningar.
            </p>
            <div className="text-sm text-gray-500">
              ✓ Full anpassning<br/>
              ✓ Alla frågetyper<br/>
              ✓ Avancerade inställningar
            </div>
          </CardContent>
        </Card>

        <Card className="group border-2 border-dashed border-gray-300 hover:border-slate-400 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 transition-colors duration-300">
              <BookTemplateIcon className="h-6 w-6 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-slate-700 transition-colors duration-200">
              Från mall
            </h3>
            <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-200">
              Använd färdiga mallar för vanliga enkättyper och anpassa efter dina behov.
            </p>
            <div className="text-sm text-gray-500">
              ✓ Snabb start<br/>
              ✓ Beprövade frågor<br/>
              ✓ Best practices
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Templates */}
      <Card className="border-0 bg-white rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle>Populära mallar</CardTitle>
          <p className="text-gray-600">Färdiga enkäter för vanliga användningsfall</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {surveyTemplates.map((template) => (
              <Card key={template.id} className="group border border-gray-200 hover:border-slate-300 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${template.color}`}>
                      <template.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-slate-700 transition-colors duration-200">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                      <p className="text-xs text-gray-500">{template.questions} frågor</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4 hover:bg-gray-100 transition-colors duration-200">
                    Använd mall
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
        name: 'NPS',
        icon: TrendingUpIcon,
        description: 'Net Promoter Score (0-10)',
        template: {
          title: 'Hur troligt är det att du skulle rekommendera oss till en vän eller kollega?',
          type: 'nps',
          required: true
        }
      },
      {
        type: 'rating',
        name: 'Betyg',
        icon: StarIcon,
        description: 'Stjärnbetyg (1-5)',
        template: {
          title: 'Hur nöjd är du med vår produkt?',
          type: 'rating',
          required: true
        }
      },
      {
        type: 'text',
        name: 'Text',
        icon: MessageSquareIcon,
        description: 'Öppen textfråga',
        template: {
          title: 'Berätta mer om din upplevelse',
          type: 'text',
          required: false
        }
      },
      {
        type: 'single-choice',
        name: 'Ett val',
        icon: CheckSquareIcon,
        description: 'Välj ett alternativ',
        template: {
          title: 'Vilken är din favoritfunktion?',
          type: 'single-choice',
          required: true,
          options: ['Alternativ 1', 'Alternativ 2', 'Alternativ 3']
        }
      },
      {
        type: 'multiple-choice',
        name: 'Flera val',
        icon: SlidersIcon,
        description: 'Välj flera alternativ',
        template: {
          title: 'Vilka funktioner använder du mest?',
          type: 'multiple-choice',
          required: false,
          options: ['Alternativ 1', 'Alternativ 2', 'Alternativ 3']
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
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Frågetyper</h3>
            <p className="text-sm text-gray-600">Dra eller klicka för att lägga till</p>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-3">
            {questionTypes.map((type) => (
              <Card
                key={type.type}
                className="group cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-gray-200 hover:border-slate-300"
                onClick={() => addQuestionFromTemplate(type.template)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-slate-100 transition-colors duration-200">
                      <type.icon className="h-5 w-5 text-gray-600 group-hover:text-slate-700 transition-colors duration-200" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-slate-800 transition-colors duration-200">{type.name}</h4>
                      <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">{type.description}</p>
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
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={survey.title}
                  onChange={(e) => setSurvey({...survey, title: e.target.value})}
                  placeholder="Enkätens titel..."
                  className="text-2xl font-bold text-gray-900 bg-transparent border-none outline-none placeholder-gray-400 w-full focus:ring-0 p-0"
                />
              </div>
              <div>
                <textarea
                  value={survey.description}
                  onChange={(e) => setSurvey({...survey, description: e.target.value})}
                  placeholder="Beskriv syftet med enkäten..."
                  rows={2}
                  className="w-full text-gray-600 bg-transparent border-none outline-none placeholder-gray-400 resize-none focus:ring-0 p-0"
                />
              </div>
            </div>
          </div>

          {/* Questions Area */}
          <div className="flex-1 overflow-auto bg-gray-50 p-6">
            {survey.questions.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ClipboardIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Lägg till din första fråga</h3>
                  <p className="text-gray-600 mb-4">Välj en frågetyp från panelen till vänster för att komma igång</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-3xl">
                {survey.questions.map((question, index) => (
                  <Card
                    key={question.id}
                    className={`group border-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                      selectedQuestion === index
                        ? 'ring-2 ring-slate-500 shadow-lg'
                        : 'hover:shadow-md hover:-translate-y-0.5 border border-gray-200'
                    }`}
                    onClick={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                            {index + 1}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {questionTypes.find(t => t.type === question.type)?.name}
                          </span>
                          {question.required && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              Obligatorisk
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
                          placeholder="Frågetitel..."
                        />

                        {/* Question-specific content */}
                        {question.type === 'nps' && (
                          <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">0 - Inte alls troligt</span>
                              <span className="text-sm text-gray-600">10 - Extremt troligt</span>
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
                              <span className="text-sm text-gray-400">Textfält för svar</span>
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
                                  placeholder={`Alternativ ${optIndex + 1}`}
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
                              Lägg till alternativ
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
                            Obligatorisk fråga
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
            <div className="bg-white border-t border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">{survey.title || 'Untitled Survey'}</h3>
                  <p className="text-sm text-gray-600">{survey.questions.length} frågor</p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline">
                    <EyeIcon className="h-4 w-4 mr-2" />
                    Förhandsvisa
                  </Button>
                  <Button variant="outline">
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Spara utkast
                  </Button>
                  <Button variant="primary">
                    Publicera enkät
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
              placeholder="Sök enkäter..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>
          <div className="lg:w-48">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent">
              <option value="all">Alla statusar</option>
              <option value="draft">Utkast</option>
              <option value="active">Aktiva</option>
              <option value="completed">Avslutade</option>
            </select>
          </div>
          <div className="lg:w-48">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent">
              <option value="all">Alla typer</option>
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
                      {survey.status === 'active' ? 'Aktiv' : survey.status === 'completed' ? 'Avslutad' : 'Utkast'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {survey.description}
                  </p>
                </div>
                <div className="flex space-x-1 ml-2">
                  <Button variant="outline" size="sm" className="p-2" title="Kopiera enkät">
                    <CopyIcon className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2" title="Ta bort enkät">
                    <TrashIcon className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div className="text-sm">
                  <div className="font-medium text-gray-700 mb-1">Statistik</div>
                  <div className="space-y-1 text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {survey.created}
                    </div>
                    <div className="flex items-center">
                      <UsersIcon className="h-3 w-3 mr-1" />
                      {survey.responses} svar
                    </div>
                    <div className="flex items-center">
                      <MessageSquareIcon className="h-3 w-3 mr-1" />
                      {survey.questions} frågor
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Typ: {survey.type}</span>
                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                  {survey.type}
                </span>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <Button variant="primary" size="sm" className="flex-1">
                  <EyeIcon className="h-3 w-3 mr-1" />
                  Visa
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
                Ny enkät
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-slate-600 transition-colors duration-200">
                Skapa en ny enkät
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
          activeTab === 'overview' ? 'Survey Builder' :
          activeTab === 'create' ? 'Skapa enkät' :
          activeTab === 'builder' ? 'Bygg enkät' :
          activeTab === 'my-surveys' ? 'Mina enkäter' :
          activeTab === 'analyze' ? '' :
          'Mallar'
        }
        description={
          activeTab === 'overview' ? 'Skapa, genomför och analysera enkäter' :
          activeTab === 'create' ? 'Bygg anpassade enkäter för feedback' :
          activeTab === 'builder' ? 'Skapa enkät från grunden med alla verktyg' :
          activeTab === 'my-surveys' ? 'Alla dina skapade enkäter' :
          activeTab === 'analyze' ? '' :
          'Färdiga mallar för olika enkättyper'
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
                <CardTitle>Enkätmallar</CardTitle>
                <p className="text-gray-600">Färdiga mallar för vanliga enkättyper</p>
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
                            <p className="text-xs text-gray-500">{template.questions} frågor inkluderade</p>
                          </div>
                        </div>
                        <Button variant="primary" className="w-full hover:scale-[1.02] transition-transform duration-200">
                          Använd mall
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
    <Suspense fallback={<div className="p-6">Laddar...</div>}>
      <SurveyContent />
    </Suspense>
  )
}