'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  MicIcon,
  PlusIcon,
  PlayIcon,
  FileTextIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  DownloadIcon,
  CalendarIcon,
  BarChart3Icon,
  ShareIcon,
  BookOpenIcon,
  CircleIcon,
  PauseIcon,
  SkipForwardIcon,
  TrendingUpIcon,
  LightbulbIcon,
  FolderIcon,
  StarIcon,
  HistoryIcon,
  TimerIcon,
  EyeIcon,
  MessageCircleIcon,
  Target,
  HomeIcon,
  AlertTriangleIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Users2Icon,
  ClipboardListIcon,
  HeadphonesIcon
} from 'lucide-react'
import Link from 'next/link'

function InterviewsContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({})

  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam) {
      setActiveTab(tabParam)
    } else {
      setActiveTab('overview')
    }
  }, [searchParams])
  const [isRecording, setIsRecording] = useState(false)
  const [interviewTimer, setInterviewTimer] = useState(0)
  const [currentNote, setCurrentNote] = useState('')

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }))
  }

  // Mock data for demonstration
  const recentInterviews = [
    { id: 1, participant: "Anna Andersson", date: "2024-01-15", status: "completed", insights: 3 },
    { id: 2, participant: "Erik Johansson", date: "2024-01-14", status: "completed", insights: 5 },
    { id: 3, participant: "Maria Larsson", date: "2024-01-13", status: "analyzing", insights: 0 },
  ]

  const insights = [
    { theme: "Navigation förvirring", frequency: 8, sentiment: "negative" },
    { theme: "Snabb checkout önskemål", frequency: 6, sentiment: "neutral" },
    { theme: "Mobilapp prestanda", frequency: 5, sentiment: "negative" },
    { theme: "Kundtjänst nöjdhet", frequency: 7, sentiment: "positive" },
  ]

  const quickActions = [
    {
      title: "Ny intervju",
      description: "Skapa intervjuguide och kom igång",
      icon: PlusIcon,
      action: "create-guide",
      primary: true
    },
    {
      title: "Fortsätt intervju",
      description: "Återuppta pågående session",
      icon: PlayIcon,
      action: "live-interview"
    },
    {
      title: "Analysera data",
      description: "Hitta patterns i dina intervjuer",
      icon: BarChart3Icon,
      action: "analyze"
    }
  ]


  const InterviewGuideBuilder = () => {
    const [title, setTitle] = useState('')
    const [purpose, setPurpose] = useState('')
    const [audience, setAudience] = useState('')
    const [duration, setDuration] = useState('45')
    const [questions, setQuestions] = useState([''])
    const [notes, setNotes] = useState({})
    const [showSuggestions, setShowSuggestions] = useState(false)

    const questionSuggestions = {
      'Öppningsfrågor': [
        "Berätta lite om dig själv och din bakgrund",
        "Vad är din roll i [företaget/projektet]?",
        "Hur ser en typisk dag ut för dig?"
      ],
      'Beteendefrågor': [
        "Berätta om senaste gången du [utförde aktiviteten]",
        "Vilka steg går du igenom när du...?",
        "Vad händer om något går fel i processen?"
      ],
      'Emotionella frågor': [
        "Hur känner du dig när du använder [produkten]?",
        "Vad frustrerar dig mest med nuvarande lösningen?",
        "Vad skulle göra dig riktigt glad/nöjd?"
      ],
      'Avslutningsfrågor': [
        "Kan du berätta mer om det?",
        "Varför är det viktigt för dig?",
        "Kan du ge mig ett konkret exempel?",
        "Något annat du vill tillägga?"
      ]
    }

    const addQuestion = () => {
      setQuestions([...questions, ''])
    }

    const updateQuestion = (index, value) => {
      const updatedQuestions = [...questions]
      updatedQuestions[index] = value
      setQuestions(updatedQuestions)
    }

    const removeQuestion = (index) => {
      if (questions.length > 1) {
        const updatedQuestions = questions.filter((_, i) => i !== index)
        setQuestions(updatedQuestions)
      }
    }

    const addSuggestedQuestion = (question) => {
      setQuestions([...questions, question])
    }

    const updateNote = (questionIndex, note) => {
      setNotes({
        ...notes,
        [questionIndex]: note
      })
    }

    return (
      <div className="space-y-6">
        {/* Header & Basic Info */}
        <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Min intervjuguide</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="hover:bg-gray-100 transition-colors duration-200"
                >
                  <LightbulbIcon className="h-4 w-4 mr-2" />
                  {showSuggestions ? 'Dölj förslag' : 'Visa förslag'}
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Dela
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Spara
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="group/input">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titel på intervju
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="t.ex. Användartest av mobilapp"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>

              <div className="group/input">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Målgrupp
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="t.ex. befintliga kunder"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>

              <div className="group/input">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beräknad tid
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                >
                  <option value="30">30 minuter</option>
                  <option value="45">45 minuter</option>
                  <option value="60">60 minuter</option>
                </select>
              </div>
            </div>

            <div className="group/input">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Syfte med intervjun
              </label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Beskriv vad du vill ta reda på..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Question Suggestions - Collapsible */}
        {showSuggestions && (
          <Card className="group border-0 bg-blue-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-blue-900">Frågeförslag</CardTitle>
              <p className="text-blue-700 text-sm">Klicka på en fråga för att lägga till den i din guide</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(questionSuggestions).map(([category, suggestions]) => (
                  <div key={category}>
                    <h4 className="font-medium text-blue-900 mb-2">{category}</h4>
                    <div className="space-y-1">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => addSuggestedQuestion(suggestion)}
                          className="block w-full text-left p-2 text-sm text-blue-800 hover:bg-blue-100 rounded transition-colors duration-200"
                        >
                          + {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questions Editor */}
        <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Intervjufrågor</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={addQuestion}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Lägg till fråga
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="group/question border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-3">
                      <textarea
                        value={question}
                        onChange={(e) => updateQuestion(index, e.target.value)}
                        placeholder="Skriv din fråga här..."
                        rows={2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                      />
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Anteckningar under intervju:
                        </label>
                        <textarea
                          value={notes[index] || ''}
                          onChange={(e) => updateNote(index, e.target.value)}
                          placeholder="Här kan du anteckna svar och observationer..."
                          rows={3}
                          className="w-full p-2 border border-gray-200 rounded text-sm bg-gray-50 focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 resize-none"
                        />
                      </div>
                    </div>
                    {questions.length > 1 && (
                      <button
                        onClick={() => removeQuestion(index)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors duration-200"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t text-center">
              <Button
                variant="primary"
                onClick={() => setActiveTab('conduct')}
                className="hover:scale-[1.02] transition-transform duration-200"
              >
                <PlayIcon className="mr-2 h-4 w-4" />
                Använd denna guide i intervju
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const LiveInterview = () => {
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    return (
      <div className="space-y-6">
        {/* Timer and Controls */}
        <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-mono text-gray-900 transition-colors duration-200 group-hover:text-slate-700">
                  {formatTime(interviewTimer)}
                </div>
                <div className={`w-3 h-3 rounded-full transition-all duration-200 ${isRecording ? 'bg-red-500 animate-pulse shadow-lg shadow-red-200' : 'bg-gray-300'}`}></div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={isRecording ? "outline" : "primary"}
                  onClick={() => setIsRecording(!isRecording)}
                  className="hover:scale-[1.02] transition-transform duration-200"
                >
                  {isRecording ? <PauseIcon className="h-4 w-4" /> : <CircleIcon className="h-4 w-4" />}
                  {isRecording ? 'Pausa' : 'Starta'}
                </Button>
                <Button variant="outline" className="hover:bg-gray-100 transition-colors duration-200">
                  <SkipForwardIcon className="h-4 w-4" />
                  Nästa fråga
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Question */}
        <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="transition-colors duration-200 group-hover:text-slate-700">Aktuell fråga (3 av 8)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-gray-900 mb-4 transition-colors duration-200 group-hover:text-slate-800">
              "Vad fungerar bra med din nuvarande lösning?"
            </div>
            <div className="text-sm text-gray-600 bg-slate-50 p-3 rounded-lg transition-all duration-200 group-hover:bg-slate-100">
              <strong>Tips:</strong> Låt deltagaren tala färdigt. Följ upp med "Kan du ge ett konkret exempel?"
            </div>
          </CardContent>
        </Card>

        {/* Live Notes */}
        <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="transition-colors duration-200 group-hover:text-slate-700">Anteckningar</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Skriv dina anteckningar här..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none transition-all duration-200 hover:border-gray-400"
            />
            <div className="mt-3 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Auto-sparas var 30:e sekund
              </div>
              <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
                Lägg till insight
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions During Interview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Bra citat", icon: MessageCircleIcon },
            { label: "Problem identifierat", icon: AlertTriangleIcon },
            { label: "Förbättringsförslag", icon: LightbulbIcon }
          ].map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="group p-4 h-auto hover:bg-gray-50 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <action.icon className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:scale-110" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  const AnalysisView = () => (
    <div className="space-y-6">
      <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="transition-colors duration-200 group-hover:text-slate-700">Insights från {recentInterviews.length} intervjuer</CardTitle>
          <p className="text-gray-600">Automatiskt identifierade patterns och teman</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="group/insight flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-sm cursor-pointer">
                <div className="flex items-center space-x-3">
                  <TrendingUpIcon className="h-5 w-5 text-gray-600 transition-transform duration-200 group-hover/insight:scale-110" />
                  <div>
                    <p className="font-medium text-gray-900 transition-colors duration-200 group-hover/insight:text-slate-700">{insight.theme}</p>
                    <p className="text-sm text-gray-600">{insight.frequency} av {recentInterviews.length} intervjuer</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  insight.sentiment === 'positive' ? 'bg-green-100 text-green-800 group-hover/insight:bg-green-200' :
                  insight.sentiment === 'negative' ? 'bg-red-100 text-red-800 group-hover/insight:bg-red-200' :
                  'bg-yellow-100 text-yellow-800 group-hover/insight:bg-yellow-200'
                }`}>
                  {insight.sentiment === 'positive' ? 'Positivt' :
                   insight.sentiment === 'negative' ? 'Problem' : 'Neutralt'}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="primary" className="hover:scale-[1.02] transition-transform duration-200">
              Generera rapport
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

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
                  <action.icon className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${action.primary ? 'text-slate-600' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {action.description}
                  </p>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Interviews */}
      <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Senaste intervjuer</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab('my-interviews')}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              Visa alla
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentInterviews.slice(0, 3).map((interview) => (
              <div key={interview.id} className="group/item flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:shadow-sm cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center transition-colors duration-200 group-hover/item:bg-gray-200">
                    <UserIcon className="h-4 w-4 text-gray-600 transition-transform duration-200 group-hover/item:scale-110" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 transition-colors duration-200 group-hover/item:text-slate-700">{interview.participant}</p>
                    <p className="text-sm text-gray-500">{interview.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{interview.insights} insights</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    interview.status === 'completed' ? 'bg-green-100 text-green-800 group-hover/item:bg-green-200' : 'bg-yellow-100 text-yellow-800 group-hover/item:bg-yellow-200'
                  }`}>
                    {interview.status === 'completed' ? 'Färdig' : 'Analyserar'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )

  return (
    <div className="h-full flex flex-col">
      <Header
        title={
          activeTab === 'overview' || activeTab === 'dashboard' ? 'Översikt' :
          activeTab === 'create' || activeTab === 'create-guide' ? 'Skapa intervjuguide' :
          activeTab === 'conduct' || activeTab === 'live-interview' ? 'Genomför intervju' :
          activeTab === 'analyze' ? 'Analysera resultat' :
          activeTab === 'my-interviews' ? 'Mina intervjuer' :
          'Mallar'
        }
        description={
          activeTab === 'overview' || activeTab === 'dashboard' ? 'Din intervju-dashboard' :
          activeTab === 'create' || activeTab === 'create-guide' ? 'Skapa anpassade frågor för din intervju' :
          activeTab === 'conduct' || activeTab === 'live-interview' ? 'Live intervju-verktyg med timer och anteckningar' :
          activeTab === 'analyze' ? 'Hitta patterns och generera insights' :
          activeTab === 'my-interviews' ? 'Alla dina genomförda intervjuer' :
          'Färdiga mallar för olika syften'
        }
      />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {(activeTab === 'overview' || activeTab === 'dashboard') && <Dashboard />}
        {(activeTab === 'create' || activeTab === 'create-guide') && <InterviewGuideBuilder />}
        {(activeTab === 'conduct' || activeTab === 'live-interview') && <LiveInterview />}
        {activeTab === 'analyze' && <AnalysisView />}

        {activeTab === 'my-interviews' && (
          <div className="text-center py-12">
            <FolderIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Mina intervjuer</h3>
            <p className="text-gray-600 mb-4">Här kommer alla dina genomförda intervjuer att visas</p>
            <Button variant="primary" onClick={() => setActiveTab('create')}>
              Skapa första intervjun
            </Button>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="text-center py-12">
            <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Mallbibliotek</h3>
            <p className="text-gray-600 mb-4">Färdiga mallar för olika typer av intervjuer</p>
            <Button variant="primary" onClick={() => setActiveTab('create')}>
              Skapa från mall
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function InterviewsPage() {
  return (
    <Suspense fallback={<div className="p-6">Laddar...</div>}>
      <InterviewsContent />
    </Suspense>
  )
}