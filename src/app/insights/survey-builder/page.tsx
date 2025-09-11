'use client'

import { useState } from 'react'
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

const questionTypes = [
  {
    type: 'nps' as const,
    name: 'NPS (0-10)',
    icon: StarIcon,
    description: 'Net Promoter Score skala'
  },
  {
    type: 'rating' as const,
    name: 'Betyg (1-5)',
    icon: StarIcon,
    description: '5-stjärnig betygsmatris'
  },
  {
    type: 'text' as const,
    name: 'Fritextsvar',
    icon: MessageSquareIcon,
    description: 'Öppen textfråga'
  },
  {
    type: 'single-choice' as const,
    name: 'Enkelval',
    icon: CheckSquareIcon,
    description: 'Välj ett alternativ'
  },
  {
    type: 'multiple-choice' as const,
    name: 'Flerval',
    icon: CheckSquareIcon,
    description: 'Välj flera alternativ'
  }
]

const surveyTemplates = [
  {
    id: 'nps-standard',
    name: 'Standard NPS',
    description: 'Klassisk Net Promoter Score enkät',
    questions: [
      {
        id: '1',
        type: 'nps' as const,
        title: 'Hur troligt är det att du rekommenderar oss till en vän eller kollega?',
        description: 'Skala från 0 (inte alls troligt) till 10 (extremt troligt)',
        required: true
      },
      {
        id: '2',
        type: 'text' as const,
        title: 'Vad är den främsta anledningen till ditt betyg?',
        description: 'Hjälp oss förstå vad som driver ditt betyg',
        required: false
      },
      {
        id: '3',
        type: 'text' as const,
        title: 'Vad skulle få dig att ge oss ett högre betyg?',
        description: 'Vilka förbättringar skulle vara mest värdefulla för dig?',
        required: false
      },
      {
        id: '4',
        type: 'single-choice' as const,
        title: 'Vilken typ av kund är du?',
        required: false,
        options: ['Ny kund (mindre än 6 månader)', 'Etablerad kund (6 månader - 2 år)', 'Långvarig kund (över 2 år)', 'Tidigare kund som kom tillbaka']
      },
      {
        id: '5',
        type: 'single-choice' as const,
        title: 'Hur ofta använder du vår produkt/tjänst?',
        required: false,
        options: ['Dagligen', 'Flera gånger per vecka', 'Veckovis', 'Månadsvis', 'Mer sällan']
      }
    ]
  },
  {
    id: 'csat-touchpoint',
    name: 'CSAT Touchpoint',
    description: 'Mät nöjdhet vid specifik touchpoint',
    questions: [
      {
        id: '1',
        type: 'rating' as const,
        title: 'Hur nöjd var du med din upplevelse idag?',
        description: 'Betygsätt från 1 (mycket missnöjd) till 5 (mycket nöjd)',
        required: true
      },
      {
        id: '2',
        type: 'text' as const,
        title: 'Vad kunde vi ha gjort bättre?',
        description: 'Specifika förbättringsförslag är mycket värdefulla',
        required: false
      },
      {
        id: '3',
        type: 'rating' as const,
        title: 'Hur skulle du betygsätta hastigheten på vår service?',
        description: 'Från 1 (mycket långsam) till 5 (mycket snabb)',
        required: false
      },
      {
        id: '4',
        type: 'rating' as const,
        title: 'Hur professionell upplevde du vår personal?',
        description: 'Från 1 (inte alls professionell) till 5 (mycket professionell)',
        required: false
      },
      {
        id: '5',
        type: 'single-choice' as const,
        title: 'Fick du svar på alla dina frågor?',
        required: false,
        options: ['Ja, helt och hållet', 'Mestadels', 'Delvis', 'Nej, inte alls']
      },
      {
        id: '6',
        type: 'single-choice' as const,
        title: 'Vilken kanal använde du för att kontakta oss?',
        required: false,
        options: ['Telefon', 'E-post', 'Chat', 'Besök i butik/kontor', 'Webb-formulär', 'Social media']
      }
    ]
  },
  {
    id: 'ces-effort',
    name: 'CES Ansträngning',
    description: 'Customer Effort Score enkät',
    questions: [
      {
        id: '1',
        type: 'rating' as const,
        title: 'Hur lätt eller svårt var det att få din fråga besvarad idag?',
        description: 'Från 1 (mycket svårt) till 5 (mycket lätt)',
        required: true
      },
      {
        id: '2',
        type: 'text' as const,
        title: 'Beskriv vad som gjorde processen lätt eller svår',
        description: 'Specifika exempel hjälper oss förbättra upplevelsen',
        required: false
      },
      {
        id: '3',
        type: 'single-choice' as const,
        title: 'Hur många steg/kontakter krävdes för att lösa ditt ärende?',
        required: false,
        options: ['1 kontakt', '2-3 kontakter', '4-5 kontakter', 'Fler än 5 kontakter', 'Ärendet är inte löst än']
      },
      {
        id: '4',
        type: 'single-choice' as const,
        title: 'Behövde du upprepa din information flera gånger?',
        required: false,
        options: ['Nej, inte alls', 'En gång', '2-3 gånger', 'Fler än 3 gånger']
      },
      {
        id: '5',
        type: 'rating' as const,
        title: 'Hur tydlig var informationen du fick?',
        description: 'Från 1 (mycket otydlig) till 5 (mycket tydlig)',
        required: false
      },
      {
        id: '6',
        type: 'text' as const,
        title: 'Vilka verktyg eller resurser skulle ha gjort processen enklare?',
        description: 'T.ex. bättre sökfunktion, tydligare instruktioner, direkttelefon',
        required: false
      }
    ]
  },
  {
    id: 'onboarding-feedback',
    name: 'Onboarding Feedback',
    description: 'Få feedback på introduktionsprocessen för nya kunder',
    questions: [
      {
        id: '1',
        type: 'rating' as const,
        title: 'Hur skulle du betygsätta din övergripande onboarding-upplevelse?',
        description: 'Från 1 (mycket dålig) till 5 (excellent)',
        required: true
      },
      {
        id: '2',
        type: 'rating' as const,
        title: 'Hur tydliga var instruktionerna under onboarding-processen?',
        description: 'Från 1 (mycket otydliga) till 5 (mycket tydliga)',
        required: true
      },
      {
        id: '3',
        type: 'single-choice' as const,
        title: 'Hur lång tid tog det att komma igång ordentligt?',
        required: false,
        options: ['Mindre än en dag', '1-3 dagar', '1 vecka', '2-4 veckor', 'Mer än en månad', 'Inte klar än']
      },
      {
        id: '4',
        type: 'multiple-choice' as const,
        title: 'Vilka resurser var mest hjälpsamma under onboarding?',
        required: false,
        options: ['Välkomst-email', 'Video tutorials', 'Personlig kontakt/support', 'Dokumentation/guides', 'Demo/walkthrough', 'FAQ/hjälpcenter']
      },
      {
        id: '5',
        type: 'text' as const,
        title: 'Vad var det svåraste att förstå eller genomföra?',
        required: false
      },
      {
        id: '6',
        type: 'text' as const,
        title: 'Vad saknades i onboarding-processen?',
        description: 'Information, verktyg eller support som skulle ha hjälpt dig',
        required: false
      },
      {
        id: '7',
        type: 'rating' as const,
        title: 'Hur väl förberedd känner du dig för att använda produkten/tjänsten?',
        description: 'Från 1 (inte alls förberedd) till 5 (mycket väl förberedd)',
        required: false
      }
    ]
  },
  {
    id: 'product-feedback',
    name: 'Produktfeedback',
    description: 'Samla in detaljerad feedback om produkten/tjänsten',
    questions: [
      {
        id: '1',
        type: 'rating' as const,
        title: 'Hur nöjd är du med produkten/tjänsten överlag?',
        description: 'Från 1 (mycket missnöjd) till 5 (mycket nöjd)',
        required: true
      },
      {
        id: '2',
        type: 'rating' as const,
        title: 'Hur väl möter produkten dina behov?',
        description: 'Från 1 (möter inte alls mina behov) till 5 (möter alla mina behov)',
        required: true
      },
      {
        id: '3',
        type: 'rating' as const,
        title: 'Hur enkelt är produkten att använda?',
        description: 'Från 1 (mycket svår) till 5 (mycket enkel)',
        required: false
      },
      {
        id: '4',
        type: 'rating' as const,
        title: 'Hur skulle du betygsätta produktens tillförlitlighet?',
        description: 'Från 1 (mycket opålitlig) till 5 (mycket pålitlig)',
        required: false
      },
      {
        id: '5',
        type: 'single-choice' as const,
        title: 'Vilken funktion är mest värdefull för dig?',
        required: false,
        options: ['Huvudfunktionalitet', 'Rapporter/Analytics', 'Integration med andra verktyg', 'Mobilapp', 'Support/hjälp', 'Anpassningsmöjligheter']
      },
      {
        id: '6',
        type: 'text' as const,
        title: 'Vilken funktion saknar du mest?',
        description: 'Beskriv funktionalitet som skulle förbättra din upplevelse',
        required: false
      },
      {
        id: '7',
        type: 'single-choice' as const,
        title: 'Hur ofta stöter du på problem eller buggar?',
        required: false,
        options: ['Aldrig', 'Sällan (mindre än en gång i månaden)', 'Ibland (1-2 gånger per månad)', 'Ofta (veckovis)', 'Mycket ofta (dagligen)']
      },
      {
        id: '8',
        type: 'rating' as const,
        title: 'Hur skulle du betygsätta värdet för pengarna?',
        description: 'Från 1 (mycket dåligt värde) till 5 (excellent värde)',
        required: false
      }
    ]
  },
  {
    id: 'exit-interview',
    name: 'Avslutande Kundintervju',
    description: 'Förstå varför kunder lämnar och hur man kan förbättra',
    questions: [
      {
        id: '1',
        type: 'single-choice' as const,
        title: 'Vad är den främsta anledningen till att du lämnar oss?',
        required: true,
        options: ['För dyrt', 'Hittade en bättre lösning', 'Behöver inte produkten längre', 'Dålig kundservice', 'Produkten fungerade inte som förväntat', 'Svår att använda', 'Annat (specificera nedan)']
      },
      {
        id: '2',
        type: 'text' as const,
        title: 'Om du valde "Annat" ovan, specificera gärna:',
        required: false
      },
      {
        id: '3',
        type: 'rating' as const,
        title: 'Hur nöjd var du med vår produkt/tjänst överlag?',
        description: 'Från 1 (mycket missnöjd) till 5 (mycket nöjd)',
        required: true
      },
      {
        id: '4',
        type: 'rating' as const,
        title: 'Hur skulle du betygsätta vår kundservice?',
        description: 'Från 1 (mycket dålig) till 5 (excellent)',
        required: false
      },
      {
        id: '5',
        type: 'single-choice' as const,
        title: 'Vilken konkurrent har du valt istället (om någon)?',
        required: false,
        options: ['Konkurrent A', 'Konkurrent B', 'Konkurrent C', 'En mindre/lokal leverantör', 'Bygger egen lösning', 'Ingen, slutar använda denna typ av produkt', 'Vill inte säga']
      },
      {
        id: '6',
        type: 'text' as const,
        title: 'Vad skulle ha fått dig att stanna?',
        description: 'Specifika förändringar eller förbättringar som skulle ha gjort skillnad',
        required: false
      },
      {
        id: '7',
        type: 'single-choice' as const,
        title: 'Skulle du överväga att komma tillbaka i framtiden?',
        required: false,
        options: ['Ja, definitivt', 'Ja, möjligtvis', 'Osäker', 'Troligtvis inte', 'Nej, definitivt inte']
      },
      {
        id: '8',
        type: 'nps' as const,
        title: 'Trots att du lämnar oss, hur troligt är det att du rekommenderar oss till andra?',
        description: 'Skala från 0 (inte alls troligt) till 10 (extremt troligt)',
        required: false
      }
    ]
  }
]

export default function SurveyBuilderPage() {
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
      options: type === 'single-choice' || type === 'multiple-choice' ? ['Alternativ 1', 'Alternativ 2'] : undefined
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
        <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer" onClick={() => setEditingQuestion(question.id)}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <GripVerticalIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {questionTypes.find(t => t.type === question.type)?.name}
              </span>
              {question.required && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Obligatorisk</span>}
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
            {question.title || 'Klicka för att redigera fråga'}
          </h4>
          {question.description && (
            <p className="text-sm text-gray-600 mb-2">{question.description}</p>
          )}
          {renderQuestionPreview(question)}
        </div>
      )
    }

    return (
      <Card className="border-2 border-blue-200">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fråga *
              </label>
              <Input
                value={question.title}
                onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                placeholder="Skriv din fråga här..."
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beskrivning (valfri)
              </label>
              <Input
                value={question.description || ''}
                onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
                placeholder="Ytterligare instruktioner eller kontext..."
                className="w-full"
              />
            </div>

            {(question.type === 'single-choice' || question.type === 'multiple-choice') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Svarsalternativ
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
                      const newOptions = [...(question.options || []), `Alternativ ${(question.options?.length || 0) + 1}`]
                      updateQuestion(question.id, { options: newOptions })
                    }}
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Lägg till alternativ
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
                <span className="text-sm text-gray-700">Obligatorisk fråga</span>
              </label>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setEditingQuestion(null)}>
                  Klar
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
        return <div className="border rounded p-3 bg-gray-50 text-sm text-gray-500">Fritextområde...</div>
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
        title="Survey Builder" 
        description="Skapa professionella enkäter för kundinsikter"
        actions={
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={() => setShowPreview(true)}
              disabled={survey.questions.length === 0 || !survey.title}
            >
              <EyeIcon className="mr-2 h-4 w-4" />
              Förhandsgranska
            </Button>
            <Button variant="primary">
              <SaveIcon className="mr-2 h-4 w-4" />
              Spara enkät
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
              <h3 className="text-lg font-semibold text-gray-900">Mallar</h3>
              <span className="text-xs text-gray-500">{surveyTemplates.length} mallar</span>
            </div>
            <div className="space-y-3">
              {surveyTemplates
                .slice(0, showAllTemplates ? surveyTemplates.length : 3)
                .map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4" onClick={() => loadTemplate(template.id)}>
                      <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </CardContent>
                  </Card>
                ))}
              
              {surveyTemplates.length > 3 && (
                <button
                  onClick={() => setShowAllTemplates(!showAllTemplates)}
                  className="w-full flex items-center justify-center space-x-2 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <span>
                    {showAllTemplates 
                      ? `Visa mindre` 
                      : `Visa ${surveyTemplates.length - 3} fler mallar`}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lägg till fråga</h3>
            <div className="space-y-2">
              {questionTypes.map((type) => (
                <button
                  key={type.type}
                  onClick={() => addQuestion(type.type)}
                  className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors"
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
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enkätens titel *
                  </label>
                  <Input
                    value={survey.title}
                    onChange={(e) => setSurvey(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="T.ex. 'Kundnöjdhet Q1 2024'"
                    className="text-lg font-semibold"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beskrivning
                  </label>
                  <Input
                    value={survey.description}
                    onChange={(e) => setSurvey(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Beskriv syftet med enkäten och vad du kommer att använda svaren till..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <div className="space-y-4">
            {survey.questions.length === 0 ? (
              <Card className="border-2 border-dashed border-gray-300">
                <CardContent className="p-12 text-center">
                  <SlidersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen fråga har lagts till än</h3>
                  <p className="text-gray-600 mb-4">Välj en mall från vänster panel eller lägg till frågor manuellt</p>
                </CardContent>
              </Card>
            ) : (
              survey.questions.map((question, index) => (
                <div key={question.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">Fråga {index + 1}</span>
                  </div>
                  {renderQuestionEditor(question)}
                </div>
              ))
            )}
          </div>

          {/* Add Question Button */}
          {survey.questions.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">Lägg till fler frågor från vänster panel</p>
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