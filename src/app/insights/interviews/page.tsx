'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { ProjectSelector } from '@/components/ui/ProjectSelector'
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
  HeadphonesIcon,
  SmileIcon,
  MehIcon,
  FrownIcon,
  CopyIcon,
  TrashIcon
} from 'lucide-react'
import Link from 'next/link'
import { saveCompletedInterview, getCompletedInterviews, generateInsightsFromInterviews, type CompletedInterview } from '@/services/interviewStorage'

// Emotion icons matching journey map design
const emotionIcons = {
  positive: SmileIcon,
  neutral: MehIcon,
  negative: FrownIcon
}

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
  setCurrentNote,
  onInterviewComplete,
  setShowSaveModal
}: {
  sharedQuestions: string[],
  currentQuestionIndex: number,
  setCurrentQuestionIndex: (index: number) => void,
  isRecording: boolean,
  setIsRecording: (recording: boolean) => void,
  interviewTimer: number,
  currentNote: string,
  setCurrentNote: (note: string) => void,
  onInterviewComplete: () => void,
  setShowSaveModal: (show: boolean) => void
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
                {isRecording ? <PauseIcon className="h-4 w-4 mr-2" /> : <PlayIcon className="h-4 w-4 mr-2" />}
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
            className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-y transition-all duration-200 hover:border-gray-400"
          />
          <div className="mt-3 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Auto-sparas var 30:e sekund
            </div>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-gray-100 transition-colors duration-200"
              onClick={() => {
                const timestamp = formatTime(interviewTimer)
                const insightMarker = `\n[${timestamp} - INSIGHT] `
                setCurrentNote(prev => prev + insightMarker)
              }}
            >
              Lägg till insight
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions During Interview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Bra citat", icon: MessageCircleIcon, action: "quote" },
          { label: "Problem identifierat", icon: AlertTriangleIcon, action: "problem" },
          { label: "Förbättringsförslag", icon: LightbulbIcon, action: "suggestion" }
        ].map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="group p-4 h-auto hover:bg-gray-50 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            onClick={() => {
              // Add timestamp to current note
              const timestamp = formatTime(interviewTimer)
              const actionText = `[${timestamp} - ${action.label}] `
              setCurrentNote(prev => prev + (prev ? '\n' : '') + actionText)
            }}
          >
            <action.icon className="h-5 w-5 mr-2 transition-transform duration-200 group-hover:scale-110" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* Complete Interview Button */}
      {currentNote.trim() && interviewTimer > 0 && (
        <Card className="group border-0 bg-green-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-green-900 mb-3">Avsluta intervju</h3>
            <p className="text-sm text-green-700 mb-4">
              Spara denna intervju för analys. Tiden: {formatTime(interviewTimer)}
            </p>
            <Button
              variant="primary"
              onClick={() => setShowSaveModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Spara intervju
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Interview Library View Component
function InterviewLibraryView({ completedInterviews }: { completedInterviews: CompletedInterview[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  // Group interviews by project (mock projects for now)
  const projects = [
    { id: 'all', name: 'Alla projekt', count: completedInterviews.length },
    { id: 'onboarding', name: 'Onboarding UX', count: Math.floor(completedInterviews.length * 0.4) },
    { id: 'checkout', name: 'Checkout Flow', count: Math.floor(completedInterviews.length * 0.3) },
    { id: 'mobile', name: 'Mobilapp', count: Math.floor(completedInterviews.length * 0.3) }
  ]

  const filteredInterviews = completedInterviews.filter(interview => {
    const matchesSearch = interview.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.notes.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProject = selectedProject === 'all' ||
                          (selectedProject === 'onboarding' && interview.id.includes('1')) ||
                          (selectedProject === 'checkout' && interview.id.includes('2')) ||
                          (selectedProject === 'mobile' && interview.id.includes('3'))
    const matchesStatus = selectedStatus === 'all' || interview.status === selectedStatus

    return matchesSearch && matchesProject && matchesStatus
  })

  if (completedInterviews.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="max-w-2xl w-full mx-auto">
          <Card className="group border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">
            <CardContent className="pt-6 h-full flex flex-col">
              <div className="text-center py-12 flex-1 flex flex-col justify-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-slate-200 group-hover:scale-110 transition-all duration-300 ease-out">
                  <FolderIcon className="w-8 h-8 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-slate-700 transition-colors duration-200">
                  Kom igång med dina intervjuer
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto group-hover:text-gray-700 transition-colors duration-200">
                  Skapa och organisera dina användarintervjuer i projekt. Här kommer alla dina genomförda intervjuer att visas strukturerat.
                </p>
                <Button variant="primary">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Skapa första intervjun
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Sök intervjuer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>

          {/* Project Filter */}
          <div className="lg:w-48">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name} ({project.count})
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            >
              <option value="all">Alla statusar</option>
              <option value="completed">Slutförd</option>
              <option value="analyzing">Analyseras</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInterviews.map((interview) => (
          <Card key={interview.id} className="border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out h-80 group cursor-pointer">
            <CardContent className="pt-6 h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{interview.participant}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      interview.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {interview.status === 'completed' ? 'Slutförd' : 'Analyseras'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {interview.notes.substring(0, 100)}...
                  </p>
                </div>
                <div className="flex space-x-1 ml-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="p-2"
                    title="Kopiera intervju"
                  >
                    <CopyIcon className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="p-2 text-red-600 hover:text-red-700"
                    title="Ta bort intervju"
                  >
                    <TrashIcon className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div className="text-sm">
                  <div className="font-medium text-gray-700 mb-1">Genomförd</div>
                  <div className="space-y-1 text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {interview.date}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      {Math.floor(interview.duration / 60)} minuter
                    </div>
                    <div className="flex items-center">
                      <ClipboardListIcon className="h-3 w-3 mr-1" />
                      {interview.questions.length} frågor
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Projekt: Onboarding UX</span>
                <span>{interview.insights?.length || 0} insights</span>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <Button variant="primary" size="sm" className="flex-1">
                  <EyeIcon className="h-3 w-3 mr-1" />
                  Visa
                </Button>
                <Button variant="outline" size="sm">
                  <MessageCircleIcon className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Interview Card */}
        <Card className="border-2 border-dashed border-gray-300 shadow-none hover:border-slate-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out h-80 cursor-pointer group hover:bg-slate-50/30">
          <CardContent className="pt-6 h-full flex flex-col">
            <div className="text-center py-12 flex-1 flex flex-col justify-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-100 group-hover:scale-110 transition-all duration-300 ease-out">
                <PlusIcon className="w-8 h-8 text-gray-400 group-hover:text-slate-600 transition-colors duration-200" />
              </div>
              <h3 className="text-lg font-medium text-gray-500 mb-2 group-hover:text-slate-700 transition-colors duration-200">
                Ny intervju
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-slate-600 transition-colors duration-200">
                Skapa en ny intervju
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function InterviewsContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('overview')

  // Helper function to format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
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
  const [completedInterviews, setCompletedInterviews] = useState<CompletedInterview[]>([])
  const [generatedInsights, setGeneratedInsights] = useState<Array<{theme: string, sentiment: 'positive' | 'negative' | 'neutral', frequency: number}>>([])

  // Save interview modal state
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveParticipantName, setSaveParticipantName] = useState('')
  const [saveSelectedProject, setSaveSelectedProject] = useState<string | null>(null)

  // Create new project state
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDescription, setNewProjectDescription] = useState('')
  const [newProjectColor, setNewProjectColor] = useState('#6B7280')

  // Load completed interviews on mount
  useEffect(() => {
    const loadInterviews = () => {
      const interviews = getCompletedInterviews()
      setCompletedInterviews(interviews)
      const insights = generateInsightsFromInterviews(interviews)
      setGeneratedInsights(insights)
    }
    loadInterviews()
  }, [])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRecording) {
      interval = setInterval(() => {
        setInterviewTimer(prevTimer => prevTimer + 1)
      }, 1000)
    } else if (!isRecording && interviewTimer !== 0) {
      if (interval) clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRecording, interviewTimer])

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }))
  }

  // Function to handle interview completion
  const handleInterviewComplete = () => {
    // Reload interviews and insights
    const interviews = getCompletedInterviews()
    setCompletedInterviews(interviews)
    const insights = generateInsightsFromInterviews(interviews)
    setGeneratedInsights(insights)

    // Reset interview state
    setCurrentNote('')
    setInterviewTimer(0)
    setIsRecording(false)
    setCurrentQuestionIndex(0)

    // Go to analysis view
    setActiveTab('analyze')
  }

  // Function to handle saving interview with project assignment
  const handleSaveInterview = () => {
    if (!saveParticipantName.trim()) return

    const completedInterview: CompletedInterview = {
      id: Date.now().toString(),
      participant: saveParticipantName.trim(),
      date: new Date().toISOString().split('T')[0],
      duration: interviewTimer,
      questions: sharedQuestions,
      notes: currentNote,
      insights: [], // Could be parsed from notes later
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      folderId: saveSelectedProject || undefined
    }

    saveCompletedInterview(completedInterview)

    // Reset modal state
    setShowSaveModal(false)
    setSaveParticipantName('')
    setSaveSelectedProject(null)
    setShowCreateProject(false)
    setNewProjectName('')
    setNewProjectDescription('')
    setNewProjectColor('#6B7280')

    handleInterviewComplete()
  }

  // Function to create new project
  const handleCreateProject = () => {
    if (!newProjectName.trim()) return

    const { saveResearchProject } = require('@/services/researchProjectStorage')

    const newProject = {
      id: Date.now().toString(),
      name: newProjectName.trim(),
      description: newProjectDescription.trim(),
      color: newProjectColor,
      createdAt: new Date().toISOString().split('T')[0],
      itemCount: 0,
      lastActivity: new Date().toISOString().split('T')[0],
      types: []
    }

    saveResearchProject(newProject)
    setSaveSelectedProject(newProject.id)
    setShowCreateProject(false)
    setNewProjectName('')
    setNewProjectDescription('')
    setNewProjectColor('#6B7280')
    setShowSaveModal(true) // Go back to save modal
  }

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

  const AnalysisView = () => {
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedInsight, setSelectedInsight] = useState(null)
    const [analysisMode, setAnalysisMode] = useState<'choose' | 'manual' | 'ai'>('choose')
    const [manualInsights, setManualInsights] = useState<Array<{theme: string, sentiment: 'positive' | 'negative' | 'neutral', frequency: number}>>([])

    // Use appropriate insights data based on mode
    const insights = (() => {
      if (analysisMode === 'manual') {
        return manualInsights.length > 0 ? manualInsights : [
          { theme: "Inga manuella insights skapade än", frequency: 0, sentiment: "neutral" as const }
        ]
      } else if (analysisMode === 'ai') {
        return generatedInsights.length > 0 ? generatedInsights : [
          { theme: "Inga AI-insights genererade än", frequency: 0, sentiment: "neutral" as const }
        ]
      } else {
        return [{ theme: "Välj analysmetod", frequency: 0, sentiment: "neutral" as const }]
      }
    })()

    // Manual Analysis - Clean Canvas View
    if (analysisMode === 'manual') {
      return (
        <div className="space-y-4">
          {/* Simple Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Manuell analys</h2>
              <p className="text-gray-600">Läs igenom dina intervjuer och dra analyser</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAnalysisMode('choose')}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              Byt metod
            </Button>
          </div>

          {completedInterviews.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <MicIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Inga intervjuer att analysera</h3>
              <p className="text-gray-600 mb-6">Genomför några intervjuer först för att kunna analysera data</p>
              <Button variant="primary" onClick={() => setActiveTab('create-guide')}>
                Skapa din första intervju
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Interview Canvas */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6 min-h-[600px]">
                  <div className="space-y-8">
                    {completedInterviews.map((interview, index) => (
                      <div key={interview.id} className="border-b border-gray-100 pb-8 last:border-b-0">
                        {/* Interview Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{interview.participant}</h3>
                            <p className="text-sm text-gray-500">
                              {interview.date} · {Math.floor(interview.duration / 60)} minuter · {interview.questions.length} frågor
                            </p>
                          </div>
                          <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                            Intervju #{index + 1}
                          </div>
                        </div>

                        {/* Questions and Notes */}
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-800">Frågor som ställdes:</h4>
                          <div className="bg-blue-50 rounded-lg p-4">
                            <ul className="space-y-2">
                              {interview.questions.map((question, qIndex) => (
                                <li key={qIndex} className="text-sm text-blue-800 flex">
                                  <span className="font-medium mr-2">{qIndex + 1}.</span>
                                  <span>{question}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <h4 className="font-medium text-gray-800">Anteckningar och svar:</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{interview.notes}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Insights Panel */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 rounded-xl border border-gray-200 p-6 sticky top-4">
                  <h4 className="font-medium text-slate-900 mb-4">Sammanfattning av insights</h4>

                  {/* Add Insight Form */}
                  <div className="space-y-3 mb-6">
                    <textarea
                      placeholder="Vad upptäckte du? Beskriv gärna mer detaljerat..."
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm resize-none"
                      id="quick-insight-input"
                      rows={4}
                    />
                    <div className="relative">
                      <button
                        type="button"
                        id="quick-insight-sentiment"
                        data-value="neutral"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm bg-white text-left flex items-center justify-between"
                        onClick={() => {
                          const dropdown = document.getElementById('sentiment-dropdown');
                          dropdown?.classList.toggle('hidden');
                        }}
                      >
                        <span className="flex items-center space-x-2">
                          <MehIcon className="h-4 w-4 text-gray-600" />
                          <span>Neutral</span>
                        </span>
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                      </button>
                      <div id="sentiment-dropdown" className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg hidden">
                        <div
                          className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2"
                          onClick={() => {
                            const button = document.querySelector('#quick-insight-sentiment') as HTMLElement;
                            if (button) {
                              button.innerHTML = '<span class="flex items-center space-x-2"><svg class="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path></svg><span>Negativ</span></span><svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg>';
                              button.setAttribute('data-value', 'negative');
                            }
                            document.getElementById('sentiment-dropdown')?.classList.add('hidden');
                          }}
                        >
                          <FrownIcon className="h-4 w-4 text-gray-600" />
                          <span>Negativ</span>
                        </div>
                        <div
                          className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2"
                          onClick={() => {
                            const button = document.querySelector('#quick-insight-sentiment') as HTMLElement;
                            if (button) {
                              button.innerHTML = '<span class="flex items-center space-x-2"><svg class="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="15" x2="16" y2="15"></line></svg><span>Neutral</span></span><svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg>';
                              button.setAttribute('data-value', 'neutral');
                            }
                            document.getElementById('sentiment-dropdown')?.classList.add('hidden');
                          }}
                        >
                          <MehIcon className="h-4 w-4 text-gray-600" />
                          <span>Neutral</span>
                        </div>
                        <div
                          className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2"
                          onClick={() => {
                            const button = document.querySelector('#quick-insight-sentiment') as HTMLElement;
                            if (button) {
                              button.innerHTML = '<span class="flex items-center space-x-2"><svg class="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path></svg><span>Positiv</span></span><svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg>';
                              button.setAttribute('data-value', 'positive');
                            }
                            document.getElementById('sentiment-dropdown')?.classList.add('hidden');
                          }}
                        >
                          <SmileIcon className="h-4 w-4 text-gray-600" />
                          <span>Positiv</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => {
                        const input = document.getElementById('quick-insight-input') as HTMLInputElement
                        const sentimentButton = document.getElementById('quick-insight-sentiment') as HTMLElement

                        if (input.value.trim()) {
                          const sentimentValue = sentimentButton?.getAttribute('data-value') || 'neutral'
                          const newInsight = {
                            theme: input.value.trim(),
                            sentiment: sentimentValue as 'positive' | 'negative' | 'neutral',
                            frequency: 1
                          }
                          setManualInsights([...manualInsights, newInsight])
                          input.value = ''
                          // Reset to neutral
                          if (sentimentButton) {
                            sentimentButton.innerHTML = '<span class="flex items-center space-x-2"><svg class="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="15" x2="16" y2="15"></line></svg><span>Neutral</span></span><svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg>'
                            sentimentButton.setAttribute('data-value', 'neutral')
                          }
                        }
                      }}
                    >
                      Lägg till insight
                    </Button>
                  </div>

                  {/* Current Insights */}
                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-medium text-slate-900 mb-3">Dina insights ({manualInsights.length})</h5>
                    {manualInsights.length === 0 ? (
                      <p className="text-gray-500 text-sm">Inga insights än. Läs intervjuerna och lägg till vad du upptäcker.</p>
                    ) : (
                      <div className="space-y-2 max-h-80 overflow-y-auto">
                        {manualInsights.map((insight, index) => (
                          <div key={index} className="flex items-start justify-between bg-white p-3 rounded border border-slate-200 text-sm">
                            <div className="flex-1 mr-2">
                              <span className="text-gray-900">{insight.theme}</span>
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              <span className="text-sm">
                                {insight.sentiment === 'positive' ? '🙂' : insight.sentiment === 'negative' ? '🙁' : '😐'}
                              </span>
                              <button
                                onClick={() => setManualInsights(manualInsights.filter((_, i) => i !== index))}
                                className="text-red-500 hover:text-red-700 text-xs"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }

    const filteredInsights = insights.filter(insight => {
      const matchesFilter = selectedFilter === 'all' || insight.sentiment === selectedFilter
      const matchesSearch = insight.theme.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesFilter && matchesSearch
    })

    const filters = [
      { value: 'all', label: 'Alla insights', count: insights.length },
      { value: 'positive', label: 'Positiva', count: insights.filter(i => i.sentiment === 'positive').length },
      { value: 'negative', label: 'Negativa', count: insights.filter(i => i.sentiment === 'negative').length },
      { value: 'neutral', label: 'Neutrala', count: insights.filter(i => i.sentiment === 'neutral').length }
    ]

    // Choice between analysis methods
    if (analysisMode === 'choose') {
      return (
        <div className="space-y-6">
          <Card className="border-0 bg-white rounded-xl overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <BarChart3Icon className="h-8 w-8 text-slate-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Hur vill du analysera dina intervjuer?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Du kan välja mellan att själv skapa insights manuellt eller låta AI analysera dina anteckningar automatiskt.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Manual Analysis */}
                <Card
                  className="group border-2 border-dashed border-gray-300 hover:border-slate-400 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  onClick={() => setAnalysisMode('manual')}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 transition-colors duration-300">
                      <Users2Icon className="h-6 w-6 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-slate-700 transition-colors duration-200">
                      Manuell analys
                    </h3>
                    <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-200">
                      Du läser igenom intervjuerna själv och skapar insights baserat på din expertis och känsla.
                    </p>
                    <div className="text-sm text-gray-500">
                      ✓ Full kontroll över insights<br/>
                      ✓ Baserat på din expertis<br/>
                      ✓ Kvalitativ bedömning
                    </div>
                  </CardContent>
                </Card>

                {/* AI Analysis */}
                <Card
                  className="group border-2 border-dashed border-gray-300 hover:border-slate-400 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  onClick={() => setAnalysisMode('ai')}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 transition-colors duration-300">
                      <LightbulbIcon className="h-6 w-6 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-slate-700 transition-colors duration-200">
                      AI-assisterad analys
                    </h3>
                    <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-200">
                      AI analyserar dina anteckningar automatiskt och identifierar patterns och teman.
                    </p>
                    <div className="text-sm text-gray-500">
                      ✓ Snabb och automatisk<br/>
                      ✓ Hittar patterns du kanske missar<br/>
                      ✓ Baserat på nyckelord och sentiment
                    </div>
                  </CardContent>
                </Card>
              </div>

              {completedInterviews.length === 0 && (
                <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>Tips:</strong> Du behöver genomföra minst en intervju först för att kunna analysera data.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {/* Analysis Mode Header */}
        <Card className="border-0 bg-slate-50 rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {analysisMode === 'manual' ? (
                  <Users2Icon className="h-6 w-6 text-blue-600" />
                ) : (
                  <LightbulbIcon className="h-6 w-6 text-purple-600" />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {analysisMode === 'manual' ? 'Manuell analys' : 'AI-assisterad analys'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {analysisMode === 'manual'
                      ? 'Du skapar insights själv baserat på din bedömning'
                      : 'AI har analyserat dina anteckningar automatiskt'
                    }
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnalysisMode('choose')}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                Byt metod
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Totala insights</p>
                  <p className="text-2xl font-bold text-gray-900">{insights.length}</p>
                </div>
                <BarChart3Icon className="h-8 w-8 text-slate-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Intervjuer</p>
                  <p className="text-2xl font-bold text-gray-900">{completedInterviews.length}</p>
                </div>
                <UsersIcon className="h-8 w-8 text-slate-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Negativa insights</p>
                  <p className="text-2xl font-bold text-red-600">{insights.filter(i => i.sentiment === 'negative').length}</p>
                </div>
                <AlertTriangleIcon className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Genomsnittlig frekvens</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.round(insights.reduce((acc, i) => acc + i.frequency, 0) / insights.length)}</p>
                </div>
                <TrendingUpIcon className="h-8 w-8 text-slate-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedFilter === filter.value
                        ? 'bg-slate-100 text-slate-900 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Sök insights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                />
                <Button variant="outline" className="hover:bg-gray-100 transition-colors duration-200">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Exportera
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights List */}
        <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="transition-colors duration-200 group-hover:text-slate-700">
                Insights ({filteredInsights.length})
              </CardTitle>
              <div className="text-sm text-gray-500">
                Sorterat efter frekvens
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredInsights
                .sort((a, b) => b.frequency - a.frequency)
                .map((insight, index) => (
                <div
                  key={index}
                  className="group/insight flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-sm cursor-pointer"
                  onClick={() => setSelectedInsight(insight)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-slate-600">{insight.frequency}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 transition-colors duration-200 group-hover/insight:text-slate-700">
                        {insight.theme}
                      </p>
                      <p className="text-sm text-gray-600">
                        {insight.frequency > 0 ? `${insight.frequency} av ${completedInterviews.length} intervjuer · ${Math.round((insight.frequency / completedInterviews.length) * 100)}%` : 'Genomför intervjuer för att generera insights'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      insight.sentiment === 'positive' ? 'bg-green-100 text-green-800 group-hover/insight:bg-green-200' :
                      insight.sentiment === 'negative' ? 'bg-red-100 text-red-800 group-hover/insight:bg-red-200' :
                      'bg-gray-100 text-gray-800 group-hover/insight:bg-gray-200'
                    }`}>
                      {insight.sentiment === 'positive' ? 'Positiv' : insight.sentiment === 'negative' ? 'Negativ' : 'Neutral'}
                    </div>
                    <ArrowRightIcon className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover/insight:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Manual Analysis - Simplified Overview */}
        {analysisMode === 'manual' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: All Interviews */}
            <div className="space-y-4">
              <Card className="border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardListIcon className="h-5 w-5 text-blue-600" />
                    Alla intervjuer ({completedInterviews.length})
                  </CardTitle>
                  <p className="text-gray-600 text-sm">Läs igenom och identifiera patterns</p>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  {completedInterviews.length === 0 ? (
                    <div className="text-center py-8">
                      <MicIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Inga intervjuer att analysera än</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {completedInterviews.map((interview) => (
                        <div
                          key={interview.id}
                          className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900 text-sm">{interview.participant}</h4>
                            <div className="text-xs text-gray-500">
                              {interview.date} · {Math.floor(interview.duration / 60)}min
                            </div>
                          </div>
                          <div className="bg-white border border-gray-100 rounded p-2">
                            <p className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">{interview.notes}</p>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            {interview.questions.length} frågor · {interview.notes.length} tecken anteckningar
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Create Insights */}
            <div className="space-y-4">
              {/* Quick Add Insight */}
              <Card className="border-0 bg-green-50 rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <PlusIcon className="h-5 w-5 text-green-600" />
                    Skapa insight
                  </CardTitle>
                  <p className="text-green-700 text-sm">Lägg till vad du upptäckt i intervjuerna</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Vad upptäckte du? (t.ex. 'Användare förvirrade av navigation')"
                      className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      id="new-insight-theme"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        className="px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        id="new-insight-sentiment"
                        defaultValue="neutral"
                      >
                        <option value="positive">🙂 Positiv</option>
                        <option value="negative">🙁 Negativ</option>
                        <option value="neutral">😐 Neutral</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Antal intervjuer"
                        min="1"
                        max={completedInterviews.length}
                        className="px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        id="new-insight-frequency"
                      />
                    </div>
                    <Button
                      variant="primary"
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        const themeInput = document.getElementById('new-insight-theme') as HTMLInputElement
                        const sentimentSelect = document.getElementById('new-insight-sentiment') as HTMLSelectElement
                        const frequencyInput = document.getElementById('new-insight-frequency') as HTMLInputElement

                        if (themeInput.value && frequencyInput.value) {
                          const newInsight = {
                            theme: themeInput.value,
                            sentiment: sentimentSelect.value as 'positive' | 'negative' | 'neutral',
                            frequency: parseInt(frequencyInput.value)
                          }
                          setManualInsights([...manualInsights, newInsight])

                          // Clear inputs
                          themeInput.value = ''
                          frequencyInput.value = ''
                          sentimentSelect.value = 'neutral'
                        }
                      }}
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Lägg till insight
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Current Insights */}
              <Card className="border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LightbulbIcon className="h-5 w-5 text-yellow-600" />
                    Dina insights ({manualInsights.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-80 overflow-y-auto">
                  {manualInsights.length === 0 ? (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <LightbulbIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600 text-sm">Inga insights skapade än</p>
                      <p className="text-gray-500 text-xs mt-1">Läs intervjuerna och lägg till dina upptäckter</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {manualInsights.map((insight, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">{insight.theme}</p>
                            <p className="text-xs text-gray-600">
                              {insight.frequency} av {completedInterviews.length} intervjuer · {Math.round((insight.frequency / completedInterviews.length) * 100)}%
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              insight.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                              insight.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {insight.sentiment === 'positive' ? '🙂' : insight.sentiment === 'negative' ? '🙁' : '😐'}
                            </div>
                            <button
                              onClick={() => {
                                setManualInsights(manualInsights.filter((_, i) => i !== index))
                              }}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="group border-0 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-blue-50">
            <CardContent className="p-6 text-center">
              <DownloadIcon className="h-8 w-8 text-blue-600 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="font-semibold text-blue-900 mb-2">Exportera rapport</h3>
              <p className="text-sm text-blue-700">Ladda ner fullständig analys som PDF</p>
            </CardContent>
          </Card>

          <Card className="group border-0 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-green-50">
            <CardContent className="p-6 text-center">
              <ShareIcon className="h-8 w-8 text-green-600 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="font-semibold text-green-900 mb-2">Dela insights</h3>
              <p className="text-sm text-green-700">Skicka resultat till teamet</p>
            </CardContent>
          </Card>

          {analysisMode === 'ai' ? (
            <Card className="group border-0 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-purple-50">
              <CardContent className="p-6 text-center">
                <LightbulbIcon className="h-8 w-8 text-purple-600 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-semibold text-purple-900 mb-2">Uppdatera AI-analys</h3>
                <p className="text-sm text-purple-700">Kör om automatisk analys</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="group border-0 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-purple-50">
              <CardContent className="p-6 text-center">
                <BarChart3Icon className="h-8 w-8 text-purple-600 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-semibold text-purple-900 mb-2">Generera rapport</h3>
                <p className="text-sm text-purple-700">Skapa rapport från dina insights</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

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
            <CardTitle className="transition-colors duration-200 group-hover:text-slate-700">Senaste intervjuer ({completedInterviews.length})</CardTitle>
            <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
              <EyeIcon className="h-4 w-4 mr-2" />
              Visa alla
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {completedInterviews.length === 0 ? (
            <div className="text-center py-8">
              <MicIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Inga intervjuer än</h3>
              <p className="text-gray-600 mb-4">Skapa din första intervju för att börja samla insights</p>
              <Button variant="primary" onClick={() => setActiveTab('create-guide')}>
                Skapa intervju
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {completedInterviews.slice(0, 5).map((interview) => (
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
                      <p className="text-sm text-gray-600">{interview.date} · {Math.floor(interview.duration / 60)} min</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 transition-all duration-200 group-hover/interview:bg-green-200">
                      Klar
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
            onInterviewComplete={handleInterviewComplete}
            setShowSaveModal={setShowSaveModal}
          />
        )}
        {activeTab === 'analyze' && <AnalysisView />}

        {activeTab === 'my-interviews' && <InterviewLibraryView completedInterviews={completedInterviews} />}

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

      {/* Save Interview Modal */}
      <Modal
        isOpen={showSaveModal}
        onClose={() => {
          setShowSaveModal(false)
          setSaveParticipantName('')
          setSaveSelectedProject(null)
        }}
        title="Spara intervju"
        maxWidth="4xl"
        className="!max-w-4xl"
      >
        <div className="space-y-5">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <ClockIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Intervju genomförd: {formatTime(interviewTimer)}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deltagarens namn <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={saveParticipantName}
              onChange={(e) => setSaveParticipantName(e.target.value)}
              placeholder="T.ex. Anna Andersson"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              required
              autoFocus
            />
          </div>

          <ProjectSelector
            selectedProjectId={saveSelectedProject}
            onProjectChange={setSaveSelectedProject}
            placeholder="Välj projekt (valfritt)"
            showCreateNew={true}
            onCreateNew={() => {
              setShowSaveModal(false)
              setShowCreateProject(true)
            }}
          />

          <div className="flex justify-end space-x-3 pt-3 border-t border-gray-200 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setShowSaveModal(false)
                setSaveParticipantName('')
                setSaveSelectedProject(null)
              }}
            >
              Avbryt
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveInterview}
              disabled={!saveParticipantName.trim()}
              className="bg-gray-900 hover:bg-gray-800"
            >
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              Spara intervju
            </Button>
          </div>

          {/* Extra space at bottom to ensure scrolling works */}
          <div className="h-4"></div>
        </div>
      </Modal>

      {/* Create Project Modal */}
      <Modal
        isOpen={showCreateProject}
        onClose={() => {
          setShowCreateProject(false)
          setNewProjectName('')
          setNewProjectDescription('')
          setNewProjectColor('#6B7280')
          setShowSaveModal(true) // Go back to save modal
        }}
        title="Skapa nytt projekt"
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Projektnamn <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="T.ex. Checkout-optimering"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beskrivning
            </label>
            <input
              type="text"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              placeholder="Kort beskrivning av projektet"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>


          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateProject(false)
                setNewProjectName('')
                setNewProjectDescription('')
                setNewProjectColor('#6B7280')
                setShowSaveModal(true)
              }}
            >
              Avbryt
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateProject}
              disabled={!newProjectName.trim()}
              className="bg-gray-900 hover:bg-gray-800"
            >
              Skapa projekt
            </Button>
          </div>
        </div>
      </Modal>
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
