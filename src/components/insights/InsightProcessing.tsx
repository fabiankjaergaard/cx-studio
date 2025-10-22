'use client'

import { useEffect, useState } from 'react'
import { ImportableResearchData, ImportResult, GeneratedInsight } from '@/types/insight-import'
import { JourneyMapData } from '@/types/journey-map'
import { Loader2, CheckCircle, AlertCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Rotating messages for each processing stage
const STAGE_MESSAGES = {
  analyzing: [
    'Reading research responses...',
    'Processing feedback data...',
    'Parsing customer comments...',
    'Analyzing response patterns...',
    'Preparing data for insights...'
  ],
  generating: [
    'Extracting key insights...',
    'Identifying pain points...',
    'Understanding customer needs...',
    'Categorizing findings...',
    'Analyzing sentiment patterns...',
    'Discovering trends...',
    'Synthesizing feedback...'
  ],
  matching: [
    'Mapping insights to journey...',
    'Finding optimal placements...',
    'Analyzing journey touchpoints...',
    'Calculating confidence scores...',
    'Matching feedback to stages...',
    'Optimizing insight distribution...'
  ]
}

interface InsightProcessingProps {
  researchData: ImportableResearchData
  journeyMap: JourneyMapData
  onComplete: (result: ImportResult) => void
  onBack: () => void
}

type ProcessingStage = 'analyzing' | 'generating' | 'matching' | 'complete' | 'error' | 'rate_limit'

interface RateLimitInfo {
  resetTime: number
  limit: number
  remaining: number
  message: string
}

export function InsightProcessing({
  researchData,
  journeyMap,
  onComplete,
  onBack
}: InsightProcessingProps) {
  const [stage, setStage] = useState<ProcessingStage>('analyzing')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null)
  const [timeUntilReset, setTimeUntilReset] = useState<string>('')
  const [currentInsight, setCurrentInsight] = useState<string>('')
  const [insightProgress, setInsightProgress] = useState<{ current: number, total: number }>({ current: 0, total: 0 })
  const [rotatingMessage, setRotatingMessage] = useState<string>('')
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    processResearchData()
  }, [researchData, journeyMap])

  // Rotate messages based on current stage
  useEffect(() => {
    if (!['analyzing', 'generating', 'matching'].includes(stage)) return

    const messages = STAGE_MESSAGES[stage as keyof typeof STAGE_MESSAGES]
    if (!messages || messages.length === 0) return

    // Set initial message
    setRotatingMessage(messages[0])
    setMessageIndex(0)

    // Rotate through messages
    const interval = setInterval(() => {
      setMessageIndex(prev => {
        const nextIndex = (prev + 1) % messages.length
        setRotatingMessage(messages[nextIndex])
        return nextIndex
      })
    }, 2000) // Change message every 2 seconds

    return () => clearInterval(interval)
  }, [stage])

  // Update countdown timer for rate limit
  useEffect(() => {
    if (stage !== 'rate_limit' || !rateLimitInfo) return

    const updateTimer = () => {
      const now = Date.now()
      const diff = rateLimitInfo.resetTime - now

      if (diff <= 0) {
        setTimeUntilReset('Ready to retry!')
        return
      }

      const seconds = Math.ceil(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60

      if (minutes > 0) {
        setTimeUntilReset(`${minutes}m ${remainingSeconds}s`)
      } else {
        setTimeUntilReset(`${remainingSeconds}s`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [stage, rateLimitInfo])

  const processResearchData = async () => {
    try {
      // Stage 1: Analyzing data
      setStage('analyzing')
      setProgress(10)
      await delay(800)

      // Stage 2: Generating insights via API
      setStage('generating')
      setProgress(30)
      await delay(600)

      const generateResponse = await fetch('/api/insights/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          journeyId: journeyMap.id,
          sourceType: researchData.type,
          data: researchData.data,
          journeyMap: journeyMap
        })
      })

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json()

        // Check if it's a rate limit error
        if (generateResponse.status === 429 && errorData.error === 'rate_limit') {
          setRateLimitInfo({
            resetTime: errorData.resetTime,
            limit: errorData.limit,
            remaining: errorData.remaining,
            message: errorData.message
          })
          setStage('rate_limit')
          return
        }

        throw new Error(errorData.error || 'Failed to generate insights')
      }

      const generatedResult: ImportResult = await generateResponse.json()

      if (!generatedResult.success || generatedResult.insights.length === 0) {
        setError(generatedResult.errors?.[0] || 'No insights could be generated')
        setStage('error')
        return
      }

      setProgress(60)
      await delay(400)

      // Stage 3: Matching to journey map via API
      setStage('matching')
      setProgress(75)
      await delay(800)

      const matchResponse = await fetch('/api/insights/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          insights: generatedResult.insights,
          journeyMap: journeyMap
        })
      })

      if (!matchResponse.ok) {
        const errorData = await matchResponse.json()

        // Check if it's a rate limit error
        if (matchResponse.status === 429 && errorData.error === 'rate_limit') {
          setRateLimitInfo({
            resetTime: errorData.resetTime,
            limit: errorData.limit,
            remaining: errorData.remaining,
            message: errorData.message
          })
          setStage('rate_limit')
          return
        }

        throw new Error(errorData.error || 'Failed to match insights')
      }

      const matchResult = await matchResponse.json()
      const matchedInsights: GeneratedInsight[] = matchResult.insights

      setProgress(100)
      await delay(400)

      // Complete
      setStage('complete')
      const finalResult: ImportResult = {
        ...generatedResult,
        insights: matchedInsights
      }
      setResult(finalResult)

      // Auto-advance to next step after a moment
      setTimeout(() => {
        onComplete(finalResult)
      }, 1200)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setStage('error')
    }
  }

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const getStageInfo = (currentStage: ProcessingStage) => {
    switch (currentStage) {
      case 'analyzing':
        return {
          title: 'Analyzing research data...',
          description: 'Reading and processing your research responses',
          icon: Loader2,
          color: 'text-[#778DB0]'
        }
      case 'generating':
        return {
          title: 'Generating insights...',
          description: 'Extracting key insights from feedback and comments',
          icon: Loader2,
          color: 'text-[#778DB0]'
        }
      case 'matching':
        const progressText = insightProgress.total > 0
          ? `Processing insight ${insightProgress.current} of ${insightProgress.total}${currentInsight ? `: "${currentInsight}"` : ''}`
          : 'Finding the best placement for each insight'
        return {
          title: 'Matching to journey map...',
          description: progressText,
          icon: Loader2,
          color: 'text-[#778DB0]'
        }
      case 'complete':
        return {
          title: 'Processing complete!',
          description: `Generated ${result?.insights.length || 0} insights with placement suggestions`,
          icon: CheckCircle,
          color: 'text-[#77BB92]'
        }
      case 'rate_limit':
        return {
          title: 'Rate limit reached',
          description: 'The free AI model has a limit of requests per minute',
          icon: AlertCircle,
          color: 'text-[#ED6B5A]'
        }
      case 'error':
        return {
          title: 'Processing failed',
          description: error || 'An error occurred',
          icon: AlertCircle,
          color: 'text-[#C45A49]'
        }
    }
  }

  const stageInfo = getStageInfo(stage)
  const Icon = stageInfo.icon

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
      {/* Processing stages - with spinning icon AND rotating text */}
      {['analyzing', 'generating', 'matching'].includes(stage) && (
        <div className="flex flex-col items-center">
          {/* Spinning Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#778DB0]/10 to-[#778DB0]/5 flex items-center justify-center mb-6">
            <Icon className={`w-10 h-10 ${stageInfo.color} ${
              Icon === Loader2 ? 'animate-spin' : ''
            }`} />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-[#2E2E2E] mb-4 text-center">
            {stageInfo.title}
          </h3>

          {/* Rotating message with fade animation */}
          <div className="h-12 flex items-center justify-center mb-8">
            <p
              key={messageIndex}
              className="text-base font-medium text-[#778DB0] text-center animate-in fade-in-0 duration-500"
            >
              {rotatingMessage}
            </p>
          </div>
        </div>
      )}

      {/* Complete/Error/Rate Limit stages - regular icon display */}
      {!['analyzing', 'generating', 'matching'].includes(stage) && (
        <>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#778DB0]/10 to-[#778DB0]/5 flex items-center justify-center mb-6">
            <Icon className={`w-10 h-10 ${stageInfo.color}`} />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-[#2E2E2E] mb-2 text-center">
            {stageInfo.title}
          </h3>

          {/* Description */}
          <p className="text-[#8A8A8A] text-center mb-8 max-w-md">
            {stageInfo.description}
          </p>
        </>
      )}

      {/* Progress bar */}
      {stage !== 'error' && stage !== 'rate_limit' && (
        <div className="w-full max-w-md mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#778DB0] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-[#8A8A8A] text-center mt-2">{progress}% complete</p>
        </div>
      )}

      {/* Stats (when complete) */}
      {stage === 'complete' && result && (
        <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-6">
          <div className="bg-[#77BB92]/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#77BB92] mb-1">{result.insights.length}</div>
            <div className="text-xs text-[#8A8A8A]">Insights</div>
          </div>
          <div className="bg-[#778DB0]/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#778DB0] mb-1">
              {result.insights.filter(i => (i.suggestedPlacements?.[0]?.confidence || 0) > 0.7).length}
            </div>
            <div className="text-xs text-[#8A8A8A]">High confidence</div>
          </div>
          <div className="bg-[#ED6B5A]/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#ED6B5A] mb-1">
              {result.insights.filter(i => i.severity >= 4).length}
            </div>
            <div className="text-xs text-[#8A8A8A]">High severity</div>
          </div>
        </div>
      )}

      {/* Rate limit info */}
      {stage === 'rate_limit' && rateLimitInfo && (
        <div className="w-full max-w-md space-y-4">
          <div className="bg-[#ED6B5A]/10 border border-[#ED6B5A]/20 rounded-lg p-4">
            <h4 className="font-semibold text-[#2E2E2E] mb-2">Rate Limit Reached</h4>
            <p className="text-sm text-[#8A8A8A] mb-3">
              The free AI model is limited to <strong>{rateLimitInfo.limit} requests per minute</strong>.
              You've used all available requests for now.
            </p>
            <div className="flex items-center justify-between bg-white rounded-md p-3 mb-3">
              <span className="text-sm text-[#8A8A8A]">Time until reset:</span>
              <span className="text-lg font-bold text-[#778DB0]">{timeUntilReset}</span>
            </div>
            <p className="text-xs text-[#8A8A8A]">
              You can wait for the limit to reset, or try again later. The system will automatically
              retry failed requests using keyword matching as a fallback.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>
              Go Back
            </Button>
            <Button
              variant="primary"
              onClick={processResearchData}
              disabled={timeUntilReset !== 'Ready to retry!' && timeUntilReset !== ''}
            >
              {timeUntilReset === 'Ready to retry!' ? 'Try Again' : `Wait ${timeUntilReset}`}
            </Button>
          </div>
        </div>
      )}

      {/* Error actions */}
      {stage === 'error' && (
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Go Back
          </Button>
          <Button variant="primary" onClick={processResearchData}>
            Try Again
          </Button>
        </div>
      )}

      {/* Processing stages checklist */}
      {stage !== 'error' && stage !== 'rate_limit' && (
        <div className="w-full max-w-md space-y-3">
          <ProcessingStageItem
            label="Analyze research data"
            completed={['generating', 'matching', 'complete'].includes(stage)}
            active={stage === 'analyzing'}
          />
          <ProcessingStageItem
            label="Generate insights"
            completed={['matching', 'complete'].includes(stage)}
            active={stage === 'generating'}
          />
          <ProcessingStageItem
            label="Match to journey map"
            completed={stage === 'complete'}
            active={stage === 'matching'}
          />
        </div>
      )}
    </div>
  )
}

interface ProcessingStageItemProps {
  label: string
  completed: boolean
  active: boolean
}

function ProcessingStageItem({ label, completed, active }: ProcessingStageItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
        completed
          ? 'bg-[#77BB92] border-[#77BB92]'
          : active
          ? 'border-[#778DB0] border-4'
          : 'border-gray-300'
      }`}>
        {completed && <CheckCircle className="w-3.5 h-3.5 text-white" />}
        {active && <div className="w-2 h-2 bg-[#778DB0] rounded-full animate-pulse" />}
      </div>
      <span className={`text-sm ${
        completed ? 'text-[#77BB92] font-medium' : active ? 'text-[#2E2E2E] font-medium' : 'text-[#8A8A8A]'
      }`}>
        {label}
      </span>
    </div>
  )
}
