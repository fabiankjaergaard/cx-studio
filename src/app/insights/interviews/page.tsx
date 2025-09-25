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
  UserIcon
} from 'lucide-react'
import Link from 'next/link'

function InterviewsContent() {
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
  const [isRecording, setIsRecording] = useState(false)
  const [interviewTimer, setInterviewTimer] = useState(0)
  const [currentNote, setCurrentNote] = useState('')

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
    const [purpose, setPurpose] = useState('')
    const [audience, setAudience] = useState('')
    const [industry, setIndustry] = useState('')
    const [duration, setDuration] = useState('45')
    const [generatedQuestions, setGeneratedQuestions] = useState([])

    const industries = [
      'E-handel', 'SaaS & Tech', 'Fintech', 'Hälsovård', 'Utbildning', 'Media', 'Annat'
    ]

    const generateQuestions = () => {
      const baseQuestions = [
        "Berätta lite om dig själv och din bakgrund",
        `Hur använder du ${purpose.toLowerCase()} idag?`,
        "Vad fungerar bra med din nuvarande lösning?",
        "Vilka utmaningar stöter du på?",
        `Om du kunde förbättra en sak med ${purpose.toLowerCase()}, vad skulle det vara?`
      ]

      // Industry-specific questions
      const industryQuestions = {
        'E-handel': [
          "Berätta om din senaste köpupplevelse online",
          "Vad får dig att lita på en webbshop?",
          "Hur viktigt är leveranshastighet för dig?"
        ],
        'SaaS & Tech': [
          "Vilka verktyg använder du i ditt dagliga arbete?",
          "Vad saknar du i era nuvarande system?",
          "Hur lär du dig nya funktioner i mjukvara?"
        ],
        'Fintech': [
          "Hur hanterar du dina finanser idag?",
          "Vad får dig att känna dig trygg med finansiella tjänster?",
          "Vilka finansiella mål har du?"
        ]
      }

      const specificQuestions = industryQuestions[industry] || []
      const questions = [...baseQuestions, ...specificQuestions, "Något annat du vill tillägga?"]
      setGeneratedQuestions(questions)
    }

    return (
      <div className="space-y-6">
        <Card className="border-0 bg-white rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle>Skapa intervjuguide</CardTitle>
            <p className="text-gray-600">Anpassad efter din bransch och syfte</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vad undersöker du?
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="t.ex. mobilappen, checkout-processen..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bransch
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Välj bransch</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Målgrupp
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="t.ex. befintliga kunder, potentiella användare..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Längd (minuter)
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="30">30 minuter</option>
                  <option value="45">45 minuter</option>
                  <option value="60">60 minuter</option>
                </select>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={generateQuestions}
              disabled={!purpose || !audience || !industry}
              className="w-full"
            >
              Generera anpassad intervjuguide
            </Button>
          </CardContent>
        </Card>

        {generatedQuestions.length > 0 && (
          <Card className="border-0 bg-white rounded-xl overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Din intervjuguide - {industry}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ShareIcon className="h-4 w-4 mr-2" />
                    Dela
                  </Button>
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <p className="text-gray-600">Beräknad tid: {duration} minuter</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedQuestions.map((question, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-white border rounded-full flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{question}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Tips: {index === 0 ? "Börja mjukt, låt deltagaren bekväma sig" :
                              index === generatedQuestions.length - 1 ? "Avsluta positivt, fråga om de har något att tillägga" :
                              "Följ upp med 'Kan du berätta mer?' vid intressanta svar"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t text-center">
                <Button variant="primary" onClick={() => setActiveTab('conduct')}>
                  <PlayIcon className="mr-2 h-4 w-4" />
                  Starta intervju
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
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
        <Card className="border-0 bg-white rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-mono text-gray-900">
                  {formatTime(interviewTimer)}
                </div>
                <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={isRecording ? "outline" : "primary"}
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? <PauseIcon className="h-4 w-4" /> : <CircleIcon className="h-4 w-4" />}
                  {isRecording ? 'Pausa' : 'Starta'}
                </Button>
                <Button variant="outline">
                  <SkipForwardIcon className="h-4 w-4" />
                  Nästa fråga
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Question */}
        <Card className="border-0 bg-white rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle>Aktuell fråga (3 av 8)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-gray-900 mb-4">
              "Vad fungerar bra med din nuvarande lösning?"
            </div>
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <strong>Tips:</strong> Låt deltagaren tala färdigt. Följ upp med "Kan du ge ett konkret exempel?"
            </div>
          </CardContent>
        </Card>

        {/* Live Notes */}
        <Card className="border-0 bg-white rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle>Anteckningar</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Skriv dina anteckningar här..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="mt-3 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Auto-sparas var 30:e sekund
              </div>
              <Button variant="outline" size="sm">
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
            <Button key={index} variant="outline" className="p-4 h-auto">
              <action.icon className="h-5 w-5 mr-2" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  const AnalysisView = () => (
    <div className="space-y-6">
      <Card className="border-0 bg-white rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle>Insights från {recentInterviews.length} intervjuer</CardTitle>
          <p className="text-gray-600">Automatiskt identifierade patterns och teman</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUpIcon className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{insight.theme}</p>
                    <p className="text-sm text-gray-600">{insight.frequency} av {recentInterviews.length} intervjuer</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  insight.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                  insight.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {insight.sentiment === 'positive' ? 'Positivt' :
                   insight.sentiment === 'negative' ? 'Problem' : 'Neutralt'}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="primary">
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
            className={`border-0 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
              action.primary ? 'bg-blue-50 border-blue-200' : 'bg-white'
            }`}
            onClick={() => setActiveTab(action.action)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  action.primary ? 'bg-blue-100' : 'bg-gray-50'
                }`}>
                  <action.icon className={`h-6 w-6 ${action.primary ? 'text-blue-600' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {action.description}
                  </p>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Interviews */}
      <Card className="border-0 bg-white rounded-xl overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Senaste intervjuer</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('my-interviews')}>
              Visa alla
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentInterviews.slice(0, 3).map((interview) => (
              <div key={interview.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{interview.participant}</p>
                    <p className="text-sm text-gray-500">{interview.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{interview.insights} insights</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    interview.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
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