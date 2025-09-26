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
  SkipBackIcon,
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

// Separate component to avoid re-creation on each render
function InterviewGuideBuilder({ sharedQuestions, setSharedQuestions, onStartInterview }: {
  sharedQuestions: string[],
  setSharedQuestions: (questions: string[]) => void,
  onStartInterview: () => void
}) {
  const [title, setTitle] = useState('')
  const [purpose, setPurpose] = useState('')
  const [audience, setAudience] = useState('')
  const [duration, setDuration] = useState('45')
  const [notes, setNotes] = useState({})
  const [showSuggestionsForQuestion, setShowSuggestionsForQuestion] = useState({})

  const questionSuggestions = {
    'Kundresa & Beteende': [
      "Berätta om senaste gången du [utförde denna aktivitet]",
      "Ta mig genom en typisk dag när du använder [produkt/tjänst]",
      "Vad hjälper denna produkt/tjänst dig att uppnå?",
      "Hur hanterar du för närvarande [problem/uppgift]?",
      "Vilka steg går du igenom när du [utför process]?"
    ],
    'Smärtpunkter & Utmaningar': [
      "Vad är din största utmaning när du använder [produkt/tjänst]?",
      "Vilka är de svåraste delarna av [process/uppgift]? Varför?",
      "Vad skulle få dig att sluta använda denna produkt/tjänst?",
      "Vilka hinder måste du övervinna när du hanterar [problem]?",
      "Vad är ditt primära smärtpunkt relaterat till [uppgift]?"
    ],
    'Nöjdhet & Känslor': [
      "Hur känner du dig när du använder [produkt/tjänst]?",
      "På en skala 1-10, hur sannolikt är det att du rekommenderar oss?",
      "Vad frustrerar dig mest med nuvarande lösning?",
      "Vad skulle göra din upplevelse bättre?",
      "Hur nöjd var du med [specifik process/interaction]?"
    ],
    'Förbättringar & Feedback': [
      "Om du kunde förbättra denna produkt/tjänst, vad skulle du ändra?",
      "Vad är din favoritdel av denna produkt/tjänst?",
      "Vilka funktioner är viktigast för dig?",
      "Vad saknar du i nuvarande lösning?",
      "Hur troligt är det att du skulle använda denna produkt/tjänst idag?"
    ],
    'Uppföljningsfrågor': [
      "Kan du berätta mer om det?",
      "Varför är det viktigt för dig?",
      "Kan du ge mig ett konkret exempel?",
      "Vad hände sedan?",
      "Hur kändes det när det hände?"
    ]
  }

  const addQuestion = () => {
    setSharedQuestions([...sharedQuestions, ''])
  }

  const updateQuestion = (index, value) => {
    const updatedQuestions = [...sharedQuestions]
    updatedQuestions[index] = value
    setSharedQuestions(updatedQuestions)
  }

  const removeQuestion = (index) => {
    if (sharedQuestions.length > 1) {
      const updatedQuestions = sharedQuestions.filter((_, i) => i !== index)
      setSharedQuestions(updatedQuestions)
    }
  }

  const addSuggestedQuestion = (question, targetIndex = null) => {
    if (targetIndex !== null) {
      // Replace the question at the specific index
      const updatedQuestions = [...sharedQuestions]
      updatedQuestions[targetIndex] = question
      setSharedQuestions(updatedQuestions)
      // Hide suggestions for this question
      setShowSuggestionsForQuestion({
        ...showSuggestionsForQuestion,
        [targetIndex]: false
      })
    } else {
      // Add as new question
      setSharedQuestions([...sharedQuestions, question])
    }
  }

  const updateNote = (questionIndex, note) => {
    setNotes({
      ...notes,
      [questionIndex]: note
    })
  }

  const toggleSuggestionsForQuestion = (questionIndex) => {
    setShowSuggestionsForQuestion({
      ...showSuggestionsForQuestion,
      [questionIndex]: !showSuggestionsForQuestion[questionIndex]
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
              <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Exportera
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
                <ShareIcon className="h-4 w-4 mr-2" />
                Dela
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Titel
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ge din intervjuguide ett namn..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Syfte
                </label>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Vad vill du uppnå med denna intervju?"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Målgrupp
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="Vilka ska du intervjua?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
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
                  <option value="90">90 minuter</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions Editor */}
      <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle>Intervjufrågor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sharedQuestions.map((question, index) => (
              <div key={index} className="group/question border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all duration-200">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-900">
                          Fråga {index + 1}
                        </label>
                        <button
                          onClick={() => toggleSuggestionsForQuestion(index)}
                          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <LightbulbIcon className="h-3.5 w-3.5 mr-1.5" />
                          {showSuggestionsForQuestion[index] ? 'Dölj förslag' : 'Visa förslag'}
                        </button>
                      </div>
                      <textarea
                        value={question}
                        onChange={(e) => updateQuestion(index, e.target.value)}
                        placeholder="Skriv din fråga här..."
                        rows={2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                      />

                      {/* Question Suggestions */}
                      {showSuggestionsForQuestion[index] && (
                        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4 shadow-sm">
                          <div className="flex items-center space-x-2">
                            <LightbulbIcon className="h-4 w-4 text-slate-500" />
                            <p className="text-sm text-slate-600 font-medium">Klicka på en fråga för att använda den:</p>
                          </div>
                          {Object.entries(questionSuggestions).map(([category, suggestions]) => (
                            <div key={category}>
                              <h5 className="text-sm font-semibold text-slate-800 mb-2 flex items-center">
                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></div>
                                {category}
                              </h5>
                              <div className="space-y-1 ml-3.5">
                                {suggestions.map((suggestion, suggestionIndex) => (
                                  <button
                                    key={suggestionIndex}
                                    onClick={() => addSuggestedQuestion(suggestion, index)}
                                    className="block w-full text-left p-3 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200 rounded-lg transition-all duration-200 hover:shadow-sm"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {sharedQuestions.length > 1 && (
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

            {/* Add Question Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={addQuestion}
                className="w-12 h-12 bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
              >
                <PlusIcon className="h-5 w-5 text-slate-600" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t text-center">
            <Button
              variant="primary"
              onClick={onStartInterview}
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

function LiveInterview({
  sharedQuestions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  isRecording,
  setIsRecording,
  interviewTimer,
  currentNote,
  setCurrentNote
}: {
  sharedQuestions: string[],
  currentQuestionIndex: number,
  setCurrentQuestionIndex: (index: number) => void,
  isRecording: boolean,
  setIsRecording: (recording: boolean) => void,
  interviewTimer: number,
  currentNote: string,
  setCurrentNote: (note: string) => void
}) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < sharedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const currentQuestion = sharedQuestions[currentQuestionIndex] || 'Ingen fråga skapad än'

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
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                >
                  <SkipBackIcon className="h-4 w-4" />
                  Föregående
                </Button>
                <Button
                  variant="outline"
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex >= sharedQuestions.length - 1}
                  className="hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                >
                  <SkipForwardIcon className="h-4 w-4" />
                  Nästa fråga
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="transition-colors duration-200 group-hover:text-slate-700">
            Aktuell fråga ({currentQuestionIndex + 1} av {sharedQuestions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg text-gray-900 mb-4 transition-colors duration-200 group-hover:text-slate-800">
            "{currentQuestion}"
          </div>
          {currentQuestion !== 'Ingen fråga skapad än' && (
            <div className="text-sm text-gray-600 bg-slate-50 p-3 rounded-lg transition-all duration-200 group-hover:bg-slate-100">
              <strong>Tips:</strong> Låt deltagaren tala färdigt. Följ upp med "Kan du ge ett konkret exempel?"
            </div>
          )}
          {currentQuestion === 'Ingen fråga skapad än' && (
            <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <strong>Obs:</strong> Gå till "Skapa guide" för att lägga till frågor först.
            </div>
          )}
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

function InterviewsContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({})
  const [sharedQuestions, setSharedQuestions] = useState([''])

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

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


  // Removed old InterviewGuideBuilder to avoid re-creation on render

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
                  'bg-gray-100 text-gray-800 group-hover/insight:bg-gray-200'
                }`}>
                  {insight.sentiment === 'positive' ? 'Positiv' : insight.sentiment === 'negative' ? 'Negativ' : 'Neutral'}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t flex justify-center">
            <Button variant="primary" className="hover:scale-[1.02] transition-transform duration-200">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Exportera rapport
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

      {/* Recent Interviews */}
      <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="transition-colors duration-200 group-hover:text-slate-700">Senaste intervjuer</CardTitle>
            <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
              <EyeIcon className="h-4 w-4 mr-2" />
              Visa alla
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentInterviews.map((interview) => (
              <div
                key={interview.id}
                className="group/interview flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-sm cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <UserIcon className="h-5 w-5 text-gray-600 transition-transform duration-200 group-hover/interview:scale-110" />
                  <div>
                    <p className="font-medium text-gray-900 transition-colors duration-200 group-hover/interview:text-slate-700">
                      {interview.participant}
                    </p>
                    <p className="text-sm text-gray-600">{interview.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    interview.status === 'completed' ? 'bg-green-100 text-green-800 group-hover/interview:bg-green-200' :
                    interview.status === 'analyzing' ? 'bg-blue-100 text-blue-800 group-hover/interview:bg-blue-200' :
                    'bg-gray-100 text-gray-800 group-hover/interview:bg-gray-200'
                  }`}>
                    {interview.status === 'completed' ? 'Klar' : interview.status === 'analyzing' ? 'Analyserar' : 'Pågående'}
                  </div>
                  <div className="text-sm text-gray-600">{interview.insights} insights</div>
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
        {(activeTab === 'create' || activeTab === 'create-guide') && (
          <InterviewGuideBuilder
            sharedQuestions={sharedQuestions}
            setSharedQuestions={setSharedQuestions}
            onStartInterview={() => setActiveTab('conduct')}
          />
        )}
        {(activeTab === 'conduct' || activeTab === 'live-interview') && (
          <LiveInterview
            sharedQuestions={sharedQuestions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            interviewTimer={interviewTimer}
            currentNote={currentNote}
            setCurrentNote={setCurrentNote}
          />
        )}
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
