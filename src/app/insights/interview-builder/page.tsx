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

  const { t } = useLanguage()

  const questionSuggestions = {
    [t('interviewBuilder.questionSuggestions.customerJourney.title')]: [
      t('interviewBuilder.questionSuggestions.customerJourney.questions.0'),
      t('interviewBuilder.questionSuggestions.customerJourney.questions.1'),
      t('interviewBuilder.questionSuggestions.customerJourney.questions.2'),
      t('interviewBuilder.questionSuggestions.customerJourney.questions.3'),
      t('interviewBuilder.questionSuggestions.customerJourney.questions.4')
    ],
    [t('interviewBuilder.questionSuggestions.painPoints.title')]: [
      t('interviewBuilder.questionSuggestions.painPoints.questions.0'),
      t('interviewBuilder.questionSuggestions.painPoints.questions.1'),
      t('interviewBuilder.questionSuggestions.painPoints.questions.2'),
      t('interviewBuilder.questionSuggestions.painPoints.questions.3'),
      t('interviewBuilder.questionSuggestions.painPoints.questions.4')
    ],
    [t('interviewBuilder.questionSuggestions.satisfaction.title')]: [
      t('interviewBuilder.questionSuggestions.satisfaction.questions.0'),
      t('interviewBuilder.questionSuggestions.satisfaction.questions.1'),
      t('interviewBuilder.questionSuggestions.satisfaction.questions.2'),
      t('interviewBuilder.questionSuggestions.satisfaction.questions.3'),
      t('interviewBuilder.questionSuggestions.satisfaction.questions.4')
    ],
    [t('interviewBuilder.questionSuggestions.improvements.title')]: [
      t('interviewBuilder.questionSuggestions.improvements.questions.0'),
      t('interviewBuilder.questionSuggestions.improvements.questions.1'),
      t('interviewBuilder.questionSuggestions.improvements.questions.2'),
      t('interviewBuilder.questionSuggestions.improvements.questions.3'),
      t('interviewBuilder.questionSuggestions.improvements.questions.4')
    ],
    [t('interviewBuilder.questionSuggestions.followUp.title')]: [
      t('interviewBuilder.questionSuggestions.followUp.questions.0'),
      t('interviewBuilder.questionSuggestions.followUp.questions.1'),
      t('interviewBuilder.questionSuggestions.followUp.questions.2'),
      t('interviewBuilder.questionSuggestions.followUp.questions.3'),
      t('interviewBuilder.questionSuggestions.followUp.questions.4')
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
            <CardTitle>{t('interviewBuilder.guide.title')}</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
                <DownloadIcon className="h-4 w-4 mr-2" />
                {t('interviewBuilder.guide.export')}
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-gray-100 transition-colors duration-200">
                <ShareIcon className="h-4 w-4 mr-2" />
                {t('interviewBuilder.guide.share')}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t('interviewBuilder.guide.fields.title')}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('interviewBuilder.guide.placeholders.title')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t('interviewBuilder.guide.fields.purpose')}
                </label>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder={t('interviewBuilder.guide.placeholders.purpose')}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t('interviewBuilder.guide.fields.audience')}
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder={t('interviewBuilder.guide.placeholders.audience')}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t('interviewBuilder.guide.fields.duration')}
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                >
                  <option value="30">{t('interviewBuilder.guide.duration.30')}</option>
                  <option value="45">{t('interviewBuilder.guide.duration.45')}</option>
                  <option value="60">{t('interviewBuilder.guide.duration.60')}</option>
                  <option value="90">{t('interviewBuilder.guide.duration.90')}</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions Editor */}
      <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle>{t('interviewBuilder.guide.questions.title')}</CardTitle>
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
                          {t('interviewBuilder.guide.questions.questionLabel', { number: index + 1 })}
                        </label>
                        <button
                          onClick={() => toggleSuggestionsForQuestion(index)}
                          className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <LightbulbIcon className="h-3.5 w-3.5 mr-1.5" />
                          {showSuggestionsForQuestion[index] ? t('interviewBuilder.guide.questions.hideSuggestions') : t('interviewBuilder.guide.questions.showSuggestions')}
                        </button>
                      </div>
                      <textarea
                        value={question}
                        onChange={(e) => updateQuestion(index, e.target.value)}
                        placeholder={t('interviewBuilder.guide.placeholders.question')}
                        rows={2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                      />

                      {/* Question Suggestions */}
                      {showSuggestionsForQuestion[index] && (
                        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4 shadow-sm">
                          <div className="flex items-center space-x-2">
                            <LightbulbIcon className="h-4 w-4 text-slate-500" />
                            <p className="text-sm text-slate-600 font-medium">{t('interviewBuilder.guide.questions.clickToUse')}</p>
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
                      className="text-gray-400 hover:text-slate-500 p-1 transition-colors duration-200"
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
              {t('interviewBuilder.guide.useGuide')}
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
  const { t } = useLanguage()
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

  const currentQuestion = sharedQuestions[currentQuestionIndex] || t('interviewBuilder.liveInterview.noQuestion')

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
              <div className={`w-3 h-3 rounded-full transition-all duration-200 ${isRecording ? 'bg-slate-500 animate-pulse shadow-lg shadow-slate-200' : 'bg-gray-300'}`}></div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={isRecording ? "outline" : "primary"}
                onClick={() => setIsRecording(!isRecording)}
                className="hover:scale-[1.02] transition-transform duration-200"
              >
                {isRecording ? <PauseIcon className="h-4 w-4 mr-2" /> : <PlayIcon className="h-4 w-4 mr-2" />}
                {isRecording ? t('interviewBuilder.liveInterview.pause') : t('interviewBuilder.liveInterview.start')}
              </Button>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                >
                  <SkipBackIcon className="h-4 w-4" />
                  {t('interviewBuilder.liveInterview.previous')}
                </Button>
                <Button
                  variant="outline"
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex >= sharedQuestions.length - 1}
                  className="hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                >
                  <SkipForwardIcon className="h-4 w-4" />
                  {t('interviewBuilder.liveInterview.nextQuestion')}
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
            {t('interviewBuilder.liveInterview.currentQuestion', { current: currentQuestionIndex + 1, total: sharedQuestions.length })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg text-gray-900 mb-4 transition-colors duration-200 group-hover:text-slate-800">
            "{currentQuestion}"
          </div>
          {currentQuestion !== 'Ingen fråga skapad än' && (
            <div className="text-sm text-gray-600 bg-slate-50 p-3 rounded-lg transition-all duration-200 group-hover:bg-slate-100">
              <strong>Tips:</strong> {t('interviewBuilder.liveInterview.tip')}
            </div>
          )}
          {currentQuestion === 'Ingen fråga skapad än' && (
            <div className="text-sm text-gray-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <strong>{t('interviewBuilder.liveInterview.note')}:</strong> {t('interviewBuilder.liveInterview.noteDescription')}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Notes */}
      <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="transition-colors duration-200 group-hover:text-slate-700">{t('interviewBuilder.liveInterview.notes')}</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder={t('interviewBuilder.liveInterview.notesPlaceholder')}
            className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-y transition-all duration-200 hover:border-gray-400"
          />
          <div className="mt-3 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {t('interviewBuilder.liveInterview.autoSave')}
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
              {t('interviewBuilder.insights.addInsight')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions During Interview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: t('interviewBuilder.liveInterview.goodQuote'), icon: MessageCircleIcon, action: "quote" },
          { label: t('interviewBuilder.liveInterview.problemIdentified'), icon: AlertTriangleIcon, action: "problem" },
          { label: t('interviewBuilder.liveInterview.improvementSuggestion'), icon: LightbulbIcon, action: "suggestion" }
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
        <Card className="group border-0 bg-slate-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-slate-900 mb-3">{t('interviewBuilder.liveInterview.finishInterview')}</h3>
            <p className="text-sm text-slate-700 mb-4">
              {t('interviewBuilder.liveInterview.saveDescription', { time: formatTime(interviewTimer) })}
            </p>
            <Button
              variant="primary"
              onClick={() => setShowSaveModal(true)}
              className="bg-slate-600 hover:bg-slate-700 text-white"
            >
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              {t('interviewBuilder.liveInterview.saveInterview')}
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
    { id: 'all', name: t('interviewBuilder.filters.allProjects'), count: completedInterviews.length },
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
                  {t('interviewBuilder.empty.getStarted')}
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto group-hover:text-gray-700 transition-colors duration-200">
                  {t('interviewBuilder.empty.description')}
                </p>
                <Button variant="primary">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  {t('interviewBuilder.actions.createFirstInterview')}
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
              placeholder={t('interviewBuilder.search.searchInterviews')}
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
              <option value="all">{t('interviewBuilder.filters.allStatuses')}</option>
              <option value="completed">Slutförd</option>
              <option value="analyzing">{t('interviewBuilder.status.analyzing')}</option>
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
                      interview.status === 'completed' ? 'bg-slate-100 text-slate-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {interview.status === 'completed' ? t('interviewBuilder.status.completed') : t('interviewBuilder.status.analyzing')}
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
                    title={t('interviewBuilder.actions.copyInterview')}
                  >
                    <CopyIcon className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="p-2 text-slate-600 hover:text-slate-700"
                    title={t('interviewBuilder.actions.deleteInterview')}
                  >
                    <TrashIcon className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div className="text-sm">
                  <div className="font-medium text-gray-700 mb-1">{t('interviewBuilder.status.conducted')}</div>
                  <div className="space-y-1 text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {interview.date}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      {t('interviewBuilder.interview.duration', { minutes: Math.floor(interview.duration / 60) })}
                    </div>
                    <div className="flex items-center">
                      <ClipboardListIcon className="h-3 w-3 mr-1" />
                      {interview.questions.length} frågor
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{t('interviewBuilder.interview.project')}: Onboarding UX</span>
                <span>{t('interviewBuilder.interview.insightsCount', { count: interview.insights?.length || 0 })}</span>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <Button variant="primary" size="sm" className="flex-1">
                  <EyeIcon className="h-3 w-3 mr-1" />
                  {t('interviewBuilder.actions.view')}
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
                {t('interviewBuilder.actions.newInterview')}
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-slate-600 transition-colors duration-200">
                {t('interviewBuilder.actions.createNewInterview')}
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
      title: t('interviewBuilder.actions.newInterview'),
      description: t('interviewBuilder.actions.newInterviewDescription'),
      icon: PlusIcon,
      action: "create-guide",
      primary: true
    },
    {
      title: t('interviewBuilder.actions.continueInterview'),
      description: t('interviewBuilder.actions.continueInterviewDescription'),
      icon: PlayIcon,
      action: "live-interview"
    },
    {
      title: t('interviewBuilder.actions.analyzeData'),
      description: t('interviewBuilder.actions.analyzeDescription'),
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
          { theme: t('interviewBuilder.insights.noManualInsights'), frequency: 0, sentiment: "neutral" as const }
        ]
      } else if (analysisMode === 'ai') {
        return generatedInsights.length > 0 ? generatedInsights : [
          { theme: t('interviewBuilder.insights.noAIInsights'), frequency: 0, sentiment: "neutral" as const }
        ]
      } else {
        return [{ theme: t('interviewBuilder.insights.chooseAnalysisMethod'), frequency: 0, sentiment: "neutral" as const }]
      }
    })()

    // Manual Analysis - Clean Canvas View
    if (analysisMode === 'manual') {
      return (
        <div className="space-y-4">
          {/* Simple Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{t('interviewBuilder.analyze.manual')}</h2>
              <p className="text-gray-600">{t('interviewBuilder.analyze.description')}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAnalysisMode('choose')}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              {t('interviewBuilder.analyze.changeMethod')}
            </Button>
          </div>

          {completedInterviews.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <MicIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('interviewBuilder.analyze.noInterviewsTitle')}</h3>
              <p className="text-gray-600 mb-6">{t('interviewBuilder.analyze.noInterviewsDescription')}</p>
              <Button variant="primary" onClick={() => setActiveTab('create-guide')}>
                {t('interviewBuilder.actions.createFirstInterview')}
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
                              {interview.date} · {t('interviewBuilder.interview.duration', { minutes: Math.floor(interview.duration / 60) })} · {t('interviewBuilder.interview.questionsCount', { count: interview.questions.length })}
                            </p>
                          </div>
                          <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                            Intervju #{index + 1}
                          </div>
                        </div>

                        {/* Questions and Notes */}
                        <div className="space-y-4">
                          <h4 className="font-medium text-gray-800">{t('interviewBuilder.analyze.questionsAsked')}:</h4>
                          <div className="bg-slate-50 rounded-lg p-4">
                            <ul className="space-y-2">
                              {interview.questions.map((question, qIndex) => (
                                <li key={qIndex} className="text-sm text-slate-800 flex">
                                  <span className="font-medium mr-2">{qIndex + 1}.</span>
                                  <span>{question}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <h4 className="font-medium text-gray-800">{t('interviewBuilder.analyze.notesAndAnswers')}:</h4>
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
                  <h4 className="font-medium text-slate-900 mb-4">{t('interviewBuilder.analyze.insightsSummary')}</h4>

                  {/* Add Insight Form */}
                  <div className="space-y-3 mb-6">
                    <textarea
                      placeholder={t('interviewBuilder.analyze.insightsPlaceholder')}
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
                      {t('interviewBuilder.insights.addInsight')}
                    </Button>
                  </div>

                  {/* Current Insights */}
                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-medium text-slate-900 mb-3">{t('interviewBuilder.analyze.yourInsights', { count: manualInsights.length })}</h5>
                    {manualInsights.length === 0 ? (
                      <p className="text-gray-500 text-sm">{t('interviewBuilder.analyze.noInsightsYet')}</p>
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
                                className="text-slate-500 hover:text-slate-700 text-xs"
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
      { value: 'all', label: t('interviewBuilder.filters.allInsights'), count: insights.length },
      { value: 'positive', label: t('interviewBuilder.filters.positive'), count: insights.filter(i => i.sentiment === 'positive').length },
      { value: 'negative', label: t('interviewBuilder.filters.negative'), count: insights.filter(i => i.sentiment === 'negative').length },
      { value: 'neutral', label: t('interviewBuilder.filters.neutral'), count: insights.filter(i => i.sentiment === 'neutral').length }
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
                {t('interviewBuilder.analyze.howToAnalyze')}
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {t('interviewBuilder.analyze.analysisDescription')}
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
                      {t('interviewBuilder.analyze.manual')}
                    </h3>
                    <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-200">
                      {t('interviewBuilder.analyze.manualDescription')}
                    </p>
                    <div className="text-sm text-gray-500">
                      {t('interviewBuilder.analyze.manualBenefits')}<br/>
                      ✓ {t('interviewBuilder.analyze.manualBenefit1')}<br/>
                      ✓ {t('interviewBuilder.analyze.manualBenefit2')}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Analysis - Coming Soon */}
                <Card className="relative border-2 border-dashed border-gray-200 rounded-xl overflow-hidden opacity-80 cursor-not-allowed">
                  <CardContent className="p-8 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <LightbulbIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-500 mb-3">
                      {t('interviewBuilder.analyze.ai')}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {t('interviewBuilder.analyze.aiDescription')}
                    </p>
                    <div className="text-sm text-gray-400">
                      ✓ {t('interviewBuilder.analyze.aiBenefit1')}<br/>
                      ✓ {t('interviewBuilder.analyze.aiBenefit2')}<br/>
                      ✓ {t('interviewBuilder.analyze.aiBenefit3')}
                    </div>
                  </CardContent>
                  {/* Coming Soon Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-1 rounded-full border border-slate-200">
                      Coming Soon
                    </span>
                  </div>
                </Card>
              </div>

              {completedInterviews.length === 0 && (
                <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-700 text-sm">
                    <strong>{t('interviewBuilder.analyze.tip')}:</strong> {t('interviewBuilder.analyze.tipDescription')}
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
                  <Users2Icon className="h-6 w-6 text-slate-600" />
                ) : (
                  <LightbulbIcon className="h-6 w-6 text-slate-600" />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {analysisMode === 'manual' ? t('interviewBuilder.analyze.manual') : t('interviewBuilder.analyze.ai')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {analysisMode === 'manual'
                      ? t('interviewBuilder.analyze.manualMode')
                      : t('interviewBuilder.analyze.aiMode')
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
                {t('interviewBuilder.analyze.changeMethod')}
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
                  <p className="text-sm font-medium text-gray-600">{t('interviewBuilder.stats.totalInsights')}</p>
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
                  <p className="text-sm font-medium text-gray-600">{t('interviewBuilder.stats.negativeInsights')}</p>
                  <p className="text-2xl font-bold text-slate-600">{insights.filter(i => i.sentiment === 'negative').length}</p>
                </div>
                <AlertTriangleIcon className="h-8 w-8 text-slate-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('interviewBuilder.stats.averageFrequency')}</p>
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
                  placeholder={t('interviewBuilder.search.searchInsights')}
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
                        {insight.frequency > 0 ? t('interviewBuilder.insights.frequency', { frequency: insight.frequency, total: completedInterviews.length, percentage: Math.round((insight.frequency / completedInterviews.length) * 100) }) : t('interviewBuilder.insights.conductInterviews')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      insight.sentiment === 'positive' ? 'bg-slate-100 text-slate-800 group-hover/insight:bg-slate-200' :
                      insight.sentiment === 'negative' ? 'bg-slate-100 text-slate-800 group-hover/insight:bg-slate-200' :
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
                    <ClipboardListIcon className="h-5 w-5 text-slate-600" />
                    {t('interviewBuilder.tabs.allInterviews', { count: completedInterviews.length })}
                  </CardTitle>
                  <p className="text-gray-600 text-sm">Läs igenom och identifiera patterns</p>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto">
                  {completedInterviews.length === 0 ? (
                    <div className="text-center py-8">
                      <MicIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">{t('interviewBuilder.analyze.noInterviewsToAnalyze')}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {completedInterviews.map((interview) => (
                        <div
                          key={interview.id}
                          className="border border-gray-200 rounded-lg p-3 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
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
                            {t('interviewBuilder.interview.questionsCount', { count: interview.questions.length })} · {t('interviewBuilder.interview.notesLength', { length: interview.notes.length })}
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
              <Card className="border-0 bg-slate-50 rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <PlusIcon className="h-5 w-5 text-slate-600" />
                    {t('interviewBuilder.insights.createInsight')}
                  </CardTitle>
                  <p className="text-slate-700 text-sm">{t('interviewBuilder.insights.createDescription')}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder={t('interviewBuilder.insights.createPlaceholder')}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                      id="new-insight-theme"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                        id="new-insight-sentiment"
                        defaultValue="neutral"
                      >
                        <option value="positive">🙂 Positiv</option>
                        <option value="negative">🙁 Negativ</option>
                        <option value="neutral">😐 Neutral</option>
                      </select>
                      <input
                        type="number"
                        placeholder={t('interviewBuilder.insights.numberOfInterviews')}
                        min="1"
                        max={completedInterviews.length}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                        id="new-insight-frequency"
                      />
                    </div>
                    <Button
                      variant="primary"
                      className="w-full bg-slate-600 hover:bg-slate-700"
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
                      {t('interviewBuilder.insights.addInsight')}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Current Insights */}
              <Card className="border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LightbulbIcon className="h-5 w-5 text-slate-600" />
                    {t('interviewBuilder.insights.yourInsights', { count: manualInsights.length })}
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-80 overflow-y-auto">
                  {manualInsights.length === 0 ? (
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <LightbulbIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600 text-sm">{t('interviewBuilder.insights.noInsightsCreated')}</p>
                      <p className="text-gray-500 text-xs mt-1">{t('interviewBuilder.insights.readAndAdd')}</p>
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
                              {t('interviewBuilder.insights.frequency', { frequency: insight.frequency, total: completedInterviews.length, percentage: Math.round((insight.frequency / completedInterviews.length) * 100) })}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              insight.sentiment === 'positive' ? 'bg-slate-100 text-slate-800' :
                              insight.sentiment === 'negative' ? 'bg-slate-100 text-slate-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {insight.sentiment === 'positive' ? '🙂' : insight.sentiment === 'negative' ? '🙁' : '😐'}
                            </div>
                            <button
                              onClick={() => {
                                setManualInsights(manualInsights.filter((_, i) => i !== index))
                              }}
                              className="text-slate-500 hover:text-slate-700 p-1"
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
          <Card className="group border-0 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-slate-50">
            <CardContent className="p-6 text-center">
              <DownloadIcon className="h-8 w-8 text-slate-600 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="font-semibold text-slate-900 mb-2">Exportera rapport</h3>
              <p className="text-sm text-slate-700">Ladda ner fullständig analys som PDF</p>
            </CardContent>
          </Card>

          <Card className="group border-0 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-slate-50">
            <CardContent className="p-6 text-center">
              <ShareIcon className="h-8 w-8 text-slate-600 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="font-semibold text-slate-900 mb-2">{t('interviewBuilder.share.shareInsights')}</h3>
              <p className="text-sm text-slate-700">Skicka resultat till teamet</p>
            </CardContent>
          </Card>

          {analysisMode === 'ai' ? (
            <Card className="group border-0 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-slate-50">
              <CardContent className="p-6 text-center">
                <LightbulbIcon className="h-8 w-8 text-slate-600 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-semibold text-slate-900 mb-2">Uppdatera AI-analys</h3>
                <p className="text-sm text-slate-700">Kör om automatisk analys</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="group border-0 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-slate-50">
              <CardContent className="p-6 text-center">
                <BarChart3Icon className="h-8 w-8 text-slate-600 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-semibold text-slate-900 mb-2">Generera rapport</h3>
                <p className="text-sm text-slate-700">{t('interviewBuilder.share.createReport')}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  const Dashboard = () => (
    <div className="space-y-8">
      {/* Interview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="group border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">{t('interviewBuilder.stats.totalInterviews')}</p>
                <p className="text-3xl font-bold text-gray-900">{completedInterviews.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MicIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">{t('interviewBuilder.stats.activeProjects')}</p>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FolderIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">{t('interviewBuilder.stats.totalInsights')}</p>
                <p className="text-3xl font-bold text-gray-900">{generatedInsights.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <LightbulbIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">{t('interviewBuilder.stats.averageLength')}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {completedInterviews.length > 0 ? Math.round(completedInterviews.reduce((acc, interview) => acc + interview.duration, 0) / completedInterviews.length / 60) : 0}min
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ClockIcon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Interviews */}
      <Card className="group border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900 transition-colors duration-200 group-hover:text-slate-700">
              {t('interviewBuilder.dashboard.recentInterviews', { count: completedInterviews.length })}
            </CardTitle>
            <Button variant="outline" size="sm" className="hover:bg-gray-100 hover:scale-105 transition-all duration-200 rounded-xl" onClick={() => setActiveTab('my-interviews')}>
              <EyeIcon className="h-4 w-4 mr-2" />
              {t('interviewBuilder.actions.viewAll')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {completedInterviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MicIcon className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('interviewBuilder.empty.noInterviewsYet')}</h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">{t('interviewBuilder.empty.createFirstDescription')}</p>
              <Button
                variant="primary"
                onClick={() => setActiveTab('create-guide')}
                className="hover:scale-105 transition-transform duration-200"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                {t('interviewBuilder.actions.createInterview')}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {completedInterviews.slice(0, 3).map((interview) => (
                <div
                  key={interview.id}
                  className="group/interview flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover/interview:scale-110 bg-gradient-to-br from-gray-100 to-gray-200">
                      <UserIcon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 transition-colors duration-200 group-hover/interview:text-slate-700">
                        {interview.participant}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {interview.date} · {interview.questions.length} frågor · {Math.floor(interview.duration / 60)} min
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 bg-gray-100 text-gray-800">
                      {interview.status === 'completed' ? 'Slutförd' : 'Pågående'}
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

  return (
    <div className="h-full flex flex-col grid-background">
      <Header
        title={
          activeTab === 'overview' || activeTab === 'dashboard' ? 'Interview Builder' :
          activeTab === 'create' || activeTab === 'create-guide' ? t('interviewBuilder.tabs.createGuide') :
          activeTab === 'conduct' || activeTab === 'live-interview' ? t('interviewBuilder.tabs.conductInterview') :
          activeTab === 'analyze' ? t('interviewBuilder.tabs.analyzeResults') :
          activeTab === 'my-interviews' ? t('interviewBuilder.tabs.myInterviews') :
          'Mallar'
        }
        description={
          activeTab === 'overview' || activeTab === 'dashboard' ? t('interviewBuilder.title') :
          activeTab === 'create' || activeTab === 'create-guide' ? t('interviewBuilder.subtitles.createGuide') :
          activeTab === 'conduct' || activeTab === 'live-interview' ? t('interviewBuilder.subtitles.liveInterview') :
          activeTab === 'analyze' ? t('interviewBuilder.subtitles.analyze') :
          activeTab === 'my-interviews' ? t('interviewBuilder.subtitles.myInterviews') :
          'Färdiga mallar för olika syften'
        }
      />

      <div className="flex-1 p-6 overflow-auto" style={{background: 'transparent'}}>
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
            <p className="text-gray-600 mb-4">{t('interviewBuilder.templates.description')}</p>
            <Button variant="primary" onClick={() => setActiveTab('create')}>
              {t('interviewBuilder.templates.createFromTemplate')}
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
        title={t('interviewBuilder.modals.saveInterview.title')}
        maxWidth="4xl"
        className="!max-w-4xl"
      >
        <div className="space-y-5">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <ClockIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{t('interviewBuilder.modals.saveInterview.interviewCompleted', { time: formatTime(interviewTimer) })}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('interviewBuilder.modals.saveInterview.participantName')} <span className="text-slate-500">*</span>
            </label>
            <input
              type="text"
              value={saveParticipantName}
              onChange={(e) => setSaveParticipantName(e.target.value)}
              placeholder={t('interviewBuilder.modals.saveInterview.participantPlaceholder')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              required
              autoFocus
            />
          </div>

          <ProjectSelector
            selectedProjectId={saveSelectedProject}
            onProjectChange={setSaveSelectedProject}
            placeholder={t('interviewBuilder.modals.saveInterview.projectPlaceholder')}
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
              {t('interviewBuilder.modals.saveInterview.cancel')}
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveInterview}
              disabled={!saveParticipantName.trim()}
              className="bg-gray-900 hover:bg-gray-800"
            >
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              {t('interviewBuilder.liveInterview.saveInterview')}
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
        title={t('interviewBuilder.modals.createProject.title')}
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('interviewBuilder.modals.createProject.name')} <span className="text-slate-500">*</span>
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
              {t('interviewBuilder.modals.createProject.description')}
            </label>
            <input
              type="text"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              placeholder={t('interviewBuilder.modals.createProject.descriptionPlaceholder')}
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
              {t('interviewBuilder.modals.saveInterview.cancel')}
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateProject}
              disabled={!newProjectName.trim()}
              className="bg-gray-900 hover:bg-gray-800"
            >
              {t('interviewBuilder.modals.createProject.create')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default function InterviewBuilderPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <InterviewsContent />
    </Suspense>
  )
}
