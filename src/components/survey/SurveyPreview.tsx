'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { 
  StarIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  CheckIcon,
  XIcon
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
}

interface SurveyPreviewProps {
  survey: Survey
  isOpen: boolean
  onClose: () => void
}

export function SurveyPreview({ survey, isOpen, onClose }: SurveyPreviewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [showThankYou, setShowThankYou] = useState(false)
  const [previewMode, setPreviewMode] = useState<'customer' | 'admin'>('customer')

  const currentQuestion = survey.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === survey.questions.length - 1
  const canProceed = !currentQuestion?.required || answers[currentQuestion.id] !== undefined

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (isLastQuestion) {
      setShowThankYou(true)
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleClose = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowThankYou(false)
    setPreviewMode('customer')
    onClose()
  }

  const renderQuestion = (question: Question) => {
    const answer = answers[question.id]

    switch (question.type) {
      case 'nps':
        return (
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-2">
              {[...Array(11)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(question.id, i)}
                  className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center font-semibold transition-all ${
                    answer === i 
                      ? 'border-blue-500 bg-blue-500 text-white' 
                      : 'border-gray-300 hover:border-blue-300 bg-white'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600 px-2">
              <span>Inte alls troligt</span>
              <span>Extremt troligt</span>
            </div>
          </div>
        )

      case 'rating':
        return (
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(question.id, i + 1)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <StarIcon 
                    className={`h-8 w-8 ${
                      answer && answer > i 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Mycket dålig</span>
              <span>Excellent</span>
            </div>
          </div>
        )

      case 'text':
        return (
          <div className="space-y-4">
            <textarea
              value={answer || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              placeholder="Skriv ditt svar här..."
              className="w-full h-24 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )

      case 'single-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.id, option)}
                className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                  answer === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                    answer === option 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {answer === option && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>
        )

      case 'multiple-choice':
        const currentAnswers = answer || []
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => {
              const isSelected = currentAnswers.includes(option)
              return (
                <button
                  key={index}
                  onClick={() => {
                    const newAnswers = isSelected
                      ? currentAnswers.filter((a: string) => a !== option)
                      : [...currentAnswers, option]
                    handleAnswer(question.id, newAnswers)
                  }}
                  className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              )
            })}
          </div>
        )

      default:
        return null
    }
  }

  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title=""
      className="max-w-3xl max-h-[90vh]"
      showHeader={false}
    >
      <div className="h-full">
        {/* Preview Mode Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Förhandsgranskningsvy:</span>
            <div className="flex bg-white rounded-lg border">
              <button
                onClick={() => setPreviewMode('customer')}
                className={`px-3 py-1 text-sm rounded-l-lg transition-colors ${
                  previewMode === 'customer' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Kundvy
              </button>
              <button
                onClick={() => setPreviewMode('admin')}
                className={`px-3 py-1 text-sm rounded-r-lg transition-colors ${
                  previewMode === 'admin' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Administratörsvy
              </button>
            </div>
          </div>
          <Button variant="ghost" onClick={handleClose}>
            <XIcon className="h-4 w-4" />
          </Button>
        </div>

        {showThankYou ? (
          /* Thank You Screen */
          <div className="flex flex-col items-center justify-center h-96 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Tack för dina svar!
            </h3>
            <p className="text-gray-600 mb-8 max-w-md">
              Vi uppskattar att du tagit dig tid att ge oss feedback. 
              Dina svar hjälper oss att förbättra våra produkter och tjänster.
            </p>
            <div className="space-y-3">
              <Button 
                variant="primary" 
                onClick={() => {
                  setShowThankYou(false)
                  setCurrentQuestionIndex(0)
                  setAnswers({})
                }}
              >
                Starta om förhandsgranskning
              </Button>
              <div>
                <Button variant="outline" onClick={handleClose}>
                  Stäng förhandsgranskning
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Survey Questions */
          <div className="flex flex-col h-full">
            {/* Survey Header */}
            <div className="p-6 border-b bg-white">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {survey.title}
              </h2>
              {survey.description && (
                <p className="text-gray-600">{survey.description}</p>
              )}
              
              {previewMode === 'admin' && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Administratörsvy:</strong> Detta är hur enkäten kommer att se ut för dina kunder. 
                    Du kan interagera med frågorna för att testa funktionaliteten.
                  </p>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-gray-50 border-b">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Fråga {currentQuestionIndex + 1} av {survey.questions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentQuestionIndex + 1) / survey.questions.length) * 100)}% klart
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((currentQuestionIndex + 1) / survey.questions.length) * 100}%` 
                  }}
                />
              </div>
            </div>

            {/* Current Question */}
            <div className="flex-1 p-6">
              {currentQuestion && (
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {currentQuestion.title}
                          {currentQuestion.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </h3>
                        {currentQuestion.description && (
                          <p className="text-gray-600">{currentQuestion.description}</p>
                        )}
                      </div>
                      
                      {renderQuestion(currentQuestion)}
                      
                      {previewMode === 'admin' && (
                        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-sm text-blue-800">
                            <strong>Frågetyp:</strong> {currentQuestion.type} | 
                            <strong> Obligatorisk:</strong> {currentQuestion.required ? 'Ja' : 'Nej'}
                            {answers[currentQuestion.id] !== undefined && (
                              <div className="mt-2">
                                <strong>Aktuellt svar:</strong> {JSON.stringify(answers[currentQuestion.id])}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Navigation */}
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Föregående
                </Button>
                
                <div className="text-sm text-gray-600">
                  {currentQuestion?.required && !canProceed && (
                    <span className="text-red-600">* Denna fråga är obligatorisk</span>
                  )}
                </div>
                
                <Button 
                  variant="primary" 
                  onClick={handleNext}
                  disabled={!canProceed}
                >
                  {isLastQuestion ? 'Skicka in' : 'Nästa'}
                  {!isLastQuestion && <ArrowRightIcon className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}