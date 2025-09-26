'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SurveyPreview } from '@/components/survey/SurveyPreview'
import { 
  PlusIcon, 
  SaveIcon, 
  EyeIcon,
  TrashIcon,
  GripVerticalIcon,
  StarIcon,
  MessageSquareIcon,
  CheckSquareIcon,
  SlidersIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react'

interface Question {
  id: string
  type: 'nps' | 'rating' | 'text' | 'multiple-choice' | 'single-choice'
  title: string
  description?: string
  required: boolean
  options?: string[]
}

interface Survey {
  id: string
  title: string
  description: string
  questions: Question[]
  template?: string
}


// Survey templates will be defined inside the component to access t() function

export default function SurveyBuilderPage() {
  const { t } = useLanguage()
  
  const questionTypes = [
    {
      type: 'nps' as const,
      name: t('surveyBuilder.questionTypes.nps'),
      icon: StarIcon,
      description: t('surveyBuilder.questionTypes.npsDesc')
    },
    {
      type: 'rating' as const,
      name: t('surveyBuilder.questionTypes.rating'),
      icon: StarIcon,
      description: t('surveyBuilder.questionTypes.ratingDesc')
    },
    {
      type: 'text' as const,
      name: t('surveyBuilder.questionTypes.text'),
      icon: MessageSquareIcon,
      description: t('surveyBuilder.questionTypes.textDesc')
    },
    {
      type: 'single-choice' as const,
      name: t('surveyBuilder.questionTypes.singleChoice'),
      icon: CheckSquareIcon,
      description: t('surveyBuilder.questionTypes.singleChoiceDesc')
    },
    {
      type: 'multiple-choice' as const,
      name: t('surveyBuilder.questionTypes.multipleChoice'),
      icon: CheckSquareIcon,
      description: t('surveyBuilder.questionTypes.multipleChoiceDesc')
    }
  ]
  
  const surveyTemplates = [
    {
      id: 'nps-standard',
      name: t('surveyBuilder.templates.npsStandard.name'),
      description: t('surveyBuilder.templates.npsStandard.desc'),
      questions: [
        {
          id: '1',
          type: 'nps' as const,
          title: t('surveyBuilder.templates.npsStandard.q1.title'),
          description: t('surveyBuilder.templates.npsStandard.q1.desc'),
          required: true
        },
        {
          id: '2',
          type: 'text' as const,
          title: t('surveyBuilder.templates.npsStandard.q2.title'),
          description: t('surveyBuilder.templates.npsStandard.q2.desc'),
          required: false
        },
        {
          id: '3',
          type: 'text' as const,
          title: t('surveyBuilder.templates.npsStandard.q3.title'),
          description: t('surveyBuilder.templates.npsStandard.q3.desc'),
          required: false
        },
        {
          id: '4',
          type: 'single-choice' as const,
          title: t('surveyBuilder.templates.npsStandard.q4.title'),
          required: false,
          options: [
            t('surveyBuilder.templates.npsStandard.q4.opt1'),
            t('surveyBuilder.templates.npsStandard.q4.opt2'),
            t('surveyBuilder.templates.npsStandard.q4.opt3'),
            t('surveyBuilder.templates.npsStandard.q4.opt4')
          ]
        },
        {
          id: '5',
          type: 'single-choice' as const,
          title: t('surveyBuilder.templates.npsStandard.q5.title'),
          required: false,
          options: [
            t('surveyBuilder.templates.npsStandard.q5.opt1'),
            t('surveyBuilder.templates.npsStandard.q5.opt2'),
            t('surveyBuilder.templates.npsStandard.q5.opt3'),
            t('surveyBuilder.templates.npsStandard.q5.opt4'),
            t('surveyBuilder.templates.npsStandard.q5.opt5')
          ]
        }
      ]
    }
  ]
  
  const [survey, setSurvey] = useState<Survey>({
    id: '',
    title: '',
    description: '',
    questions: []
  })
  
  const [selectedQuestionType, setSelectedQuestionType] = useState<Question['type'] | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showAllTemplates, setShowAllTemplates] = useState(false)

  const loadTemplate = (templateId: string) => {
    const template = surveyTemplates.find(t => t.id === templateId)
    if (template) {
      setSurvey({
        id: Date.now().toString(),
        title: template.name,
        description: template.description,
        questions: template.questions.map(q => ({ ...q, id: Date.now().toString() + Math.random() })),
        template: templateId
      })
    }
  }

  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: Date.now().toString() + Math.random(),
      type,
      title: '',
      description: '',
      required: true,
      options: type === 'single-choice' || type === 'multiple-choice' ? [t('surveyBuilder.optionPlaceholder', { number: '1' }), t('surveyBuilder.optionPlaceholder', { number: '2' })] : undefined
    }
    
    setSurvey(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }))
    
    setEditingQuestion(newQuestion.id)
    setSelectedQuestionType(null)
  }

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, ...updates } : q
      )
    }))
  }

  const deleteQuestion = (questionId: string) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }))
  }

  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    setSurvey(prev => {
      const questions = [...prev.questions]
      const index = questions.findIndex(q => q.id === questionId)
      
      if (direction === 'up' && index > 0) {
        [questions[index], questions[index - 1]] = [questions[index - 1], questions[index]]
      } else if (direction === 'down' && index < questions.length - 1) {
        [questions[index], questions[index + 1]] = [questions[index + 1], questions[index]]
      }
      
      return { ...prev, questions }
    })
  }

  const renderQuestionEditor = (question: Question) => {
    const isEditing = editingQuestion === question.id

    if (!isEditing) {
      return (
        <div className="border rounded-lg p-4 hover:bg-gray-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group" onClick={() => setEditingQuestion(question.id)}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <GripVerticalIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {questionTypes.find(t => t.type === question.type)?.name}
              </span>
              {question.required && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">{t('surveyBuilder.required')}</span>}
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  moveQuestion(question.id, 'up')
                }}
              >
                <ArrowUpIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  moveQuestion(question.id, 'down')
                }}
              >
                <ArrowDownIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteQuestion(question.id)
                }}
              >
                <TrashIcon className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
          <h4 className="font-medium text-gray-900 mb-1">
            {question.title || t('surveyBuilder.clickToEdit')}
          </h4>
          {question.description && (
            <p className="text-sm text-gray-600 mb-2">{question.description}</p>
          )}
          {renderQuestionPreview(question)}
        </div>
      )
    }

    return (
      <Card className="border-2 border-slate-200 shadow-md hover:shadow-lg transition-shadow duration-300 ease-out">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('surveyBuilder.questionTitle')}
              </label>
              <Input
                value={question.title}
                onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                placeholder={t('surveyBuilder.questionTitlePlaceholder')}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('surveyBuilder.questionDescription')}
              </label>
              <Input
                value={question.description || ''}
                onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
                placeholder={t('surveyBuilder.questionDescriptionPlaceholder')}
                className="w-full"
              />
            </div>

            {(question.type === 'single-choice' || question.type === 'multiple-choice') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('surveyBuilder.answerOptions')}
                </label>
                <div className="space-y-2">
                  {question.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(question.options || [])]
                          newOptions[index] = e.target.value
                          updateQuestion(question.id, { options: newOptions })
                        }}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newOptions = question.options?.filter((_, i) => i !== index)
                          updateQuestion(question.id, { options: newOptions })
                        }}
                      >
                        <TrashIcon className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newOptions = [...(question.options || []), t('surveyBuilder.optionPlaceholder', { number: (question.options?.length || 0) + 1 })]
                      updateQuestion(question.id, { options: newOptions })
                    }}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    {t('surveyBuilder.addOption')}
                  </Button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{t('surveyBuilder.requiredQuestion')}</span>
              </label>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setEditingQuestion(null)}>
                  {t('surveyBuilder.done')}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case 'nps':
        return (
          <div className="flex space-x-2 text-sm">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="w-8 h-8 border rounded flex items-center justify-center bg-gray-50">
                {i}
              </div>
            ))}
          </div>
        )
      case 'rating':
        return (
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-6 w-6 text-gray-300" />
            ))}
          </div>
        )
      case 'text':
        return <div className="border rounded p-3 bg-gray-50 text-sm text-gray-500">{t('surveyBuilder.freeTextArea')}</div>
      case 'single-choice':
        return (
          <div className="space-y-2">
            {question.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-4 h-4 border rounded-full bg-gray-50"></div>
                <span className="text-sm text-gray-600">{option}</span>
              </div>
            ))}
          </div>
        )
      case 'multiple-choice':
        return (
          <div className="space-y-2">
            {question.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-4 h-4 border rounded bg-gray-50"></div>
                <span className="text-sm text-gray-600">{option}</span>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col">
      <Header 
        title={t('surveyBuilder.title')} 
        description={t('surveyBuilder.description')}
        actions={
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={() => setShowPreview(true)}
              disabled={survey.questions.length === 0 || !survey.title}
            >
              <EyeIcon className="mr-2 h-4 w-4" />
              {t('surveyBuilder.preview')}
            </Button>
            <Button variant="primary">
              <SaveIcon className="mr-2 h-4 w-4" />
              {t('surveyBuilder.save')}
            </Button>
          </div>
        }
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Templates & Question Types */}
        <div className="w-80 border-r bg-white p-6 overflow-y-auto">
          {/* Templates */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('surveyBuilder.templates')}</h3>
              <span className="text-xs text-gray-500">{t('surveyBuilder.templatesCount', { count: surveyTemplates.length })}</span>
            </div>
            <div className="space-y-3">
              {surveyTemplates
                .slice(0, showAllTemplates ? surveyTemplates.length : 3)
                .map((template) => (
                  <Card key={template.id} className="border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group">
                    <CardContent className="p-4" onClick={() => loadTemplate(template.id)}>
                      <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </CardContent>
                  </Card>
                ))}
              
              {surveyTemplates.length > 3 && (
                <button
                  onClick={() => setShowAllTemplates(!showAllTemplates)}
                  className="w-full flex items-center justify-center space-x-2 py-3 text-sm font-medium text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <span>
                    {showAllTemplates 
                      ? t('surveyBuilder.showLess')
                      : t('surveyBuilder.showMore', { count: surveyTemplates.length - 3 })}
                  </span>
                  {showAllTemplates ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Question Types */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('surveyBuilder.addQuestion')}</h3>
            <div className="space-y-2">
              {questionTypes.map((type) => (
                <button
                  key={type.type}
                  onClick={() => addQuestion(type.type)}
                  className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out group"
                >
                  <div className="flex items-center space-x-3">
                    <type.icon className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{type.name}</div>
                      <div className="text-sm text-gray-500">{type.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Panel - Survey Builder */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {/* Survey Header */}
          <Card className="mb-6 border-0 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('surveyBuilder.surveyTitleRequired')}
                  </label>
                  <Input
                    value={survey.title}
                    onChange={(e) => setSurvey(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={t('surveyBuilder.surveyTitlePlaceholder')}
                    className="text-lg font-semibold"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('surveyBuilder.surveyDescription')}
                  </label>
                  <Input
                    value={survey.description}
                    onChange={(e) => setSurvey(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={t('surveyBuilder.surveyDescriptionPlaceholder')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="space-y-4">
            {survey.questions.length === 0 ? (
              <Card className="border-2 border-dashed border-gray-300 hover:border-slate-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out group hover:bg-slate-50/30">
                <CardContent className="p-12 text-center">
                  <SlidersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{t('surveyBuilder.noQuestions')}</h3>
                  <p className="text-gray-600 mb-4">{t('surveyBuilder.noQuestionsDesc')}</p>
                </CardContent>
              </Card>
            ) : (
              survey.questions.map((question, index) => (
                <div key={question.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">{t('surveyBuilder.questionNumber', { number: index + 1 })}</span>
                  </div>
                  {renderQuestionEditor(question)}
                </div>
              ))
            )}
          </div>

          {/* Add Question Button */}
          {survey.questions.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">{t('surveyBuilder.addMoreQuestions')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Survey Preview Modal */}
      <SurveyPreview 
        survey={survey}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  )
}