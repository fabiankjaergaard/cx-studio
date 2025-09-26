'use client'

import { useState } from 'react'
import { StarIcon, CheckCircleIcon, AlertCircleIcon, XCircleIcon, RefreshCwIcon, PauseCircleIcon } from 'lucide-react'
import { EmotionCurve } from './EmotionCurve'
import { PainPointsVisualization } from './PainPointsVisualization'
import { OpportunitiesVisualization } from './OpportunitiesVisualization'
import { MetricsVisualization } from './MetricsVisualization'
import { ChannelsVisualization } from './ChannelsVisualization'

interface JourneyMapCellProps {
  content: string
  type: 'text' | 'emoji' | 'number' | 'rating' | 'status' | 'pain-points' | 'opportunities' | 'metrics' | 'channels'
  onChange: (content: string) => void
  placeholder?: string
  stageCount?: number
  isEmotionCurveCell?: boolean
}

const STATUS_OPTIONS = [
  { value: 'Good', label: 'Good', icon: CheckCircleIcon, color: 'text-green-600' },
  { value: 'OK', label: 'OK', icon: AlertCircleIcon, color: 'text-yellow-600' },
  { value: 'Bad', label: 'Bad', icon: XCircleIcon, color: 'text-red-600' },
  { value: 'Ongoing', label: 'Ongoing', icon: RefreshCwIcon, color: 'text-slate-600' },
  { value: 'Paused', label: 'Paused', icon: PauseCircleIcon, color: 'text-gray-600' }
]

export function JourneyMapCell({
  content,
  type,
  onChange,
  placeholder = 'Click to edit...',
  stageCount = 4,
  isEmotionCurveCell = false
}: JourneyMapCellProps) {
  const [isStatusPickerOpen, setIsStatusPickerOpen] = useState(false)

  const handleRatingClick = (rating: number) => {
    onChange(rating.toString())
  }

  const handleStatusSelect = (statusValue: string) => {
    onChange(statusValue)
    setIsStatusPickerOpen(false)
  }

  const getStatusDisplay = (statusValue: string) => {
    const status = STATUS_OPTIONS.find(s => s.value === statusValue)
    if (!status) return null

    const Icon = status.icon
    return (
      <div className="flex items-center space-x-2">
        <Icon className={`h-4 w-4 ${status.color}`} />
        <span className="text-gray-900">{status.label}</span>
      </div>
    )
  }

  switch (type) {
    case 'emoji':
      if (isEmotionCurveCell) {
        // Parse emotions from content (comma separated), preserving empty slots
        const emotions = content ? content.split(',').map(e => e.trim()) : []
        
        return (
          <EmotionCurve
            emotions={emotions}
            onChange={(newEmotions) => onChange(newEmotions.join(','))}
            stageCount={stageCount}
          />
        )
      } else {
        // Return empty cell for non-curve emoji cells
        return <div className="w-full min-h-20"></div>
      }

    case 'pain-points':
      const painPoints = content ? content.split(',').map(e => e.trim()) : []
      return (
        <PainPointsVisualization
          painPoints={painPoints}
          onChange={(newPainPoints) => onChange(newPainPoints.join(','))}
          stageCount={stageCount}
        />
      )

    case 'opportunities':
      const opportunities = content ? content.split(',').map(e => e.trim()) : []
      return (
        <OpportunitiesVisualization
          opportunities={opportunities}
          onChange={(newOpportunities) => onChange(newOpportunities.join(','))}
          stageCount={stageCount}
        />
      )

    case 'metrics':
      const metrics = content ? content.split(',').map(e => e.trim()) : []
      return (
        <MetricsVisualization
          metrics={metrics}
          onChange={(newMetrics) => onChange(newMetrics.join(','))}
          stageCount={stageCount}
        />
      )

    case 'channels':
      const channels = content ? content.split(',').map(e => e.trim()) : []
      return (
        <ChannelsVisualization
          channels={channels}
          onChange={(newChannels) => onChange(newChannels.join(','))}
          stageCount={stageCount}
        />
      )


    case 'number':
      return (
        <input
          type="number"
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-20 p-2 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded text-center focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200"
        />
      )

    case 'rating':
      const currentRating = parseInt(content) || 0
      return (
        <div className="w-full min-h-20 p-2 border border-gray-200 rounded bg-white flex items-center justify-center hover:border-slate-300 hover:shadow-sm transition-all duration-200">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-6 w-6 cursor-pointer transition-all duration-200 ${
                  star <= currentRating
                    ? 'text-yellow-400 fill-current hover:scale-110'
                    : 'text-gray-300 hover:text-yellow-300 hover:scale-110'
                }`}
                onClick={() => handleRatingClick(star)}
              />
            ))}
          </div>
        </div>
      )

    case 'status':
      return (
        <div className="relative">
          <div
            className="w-full min-h-20 p-2 text-sm border border-gray-200 rounded cursor-pointer hover:border-slate-400 hover:shadow-sm hover:scale-[1.02] transition-all duration-200 bg-white flex items-center justify-center"
            onClick={() => setIsStatusPickerOpen(!isStatusPickerOpen)}
          >
            {content ? getStatusDisplay(content) : <span className="text-gray-400">Select status</span>}
          </div>
          {isStatusPickerOpen && (
            <div className="absolute bottom-full left-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 mb-1 min-w-40">
              {STATUS_OPTIONS.map((status) => {
                const Icon = status.icon
                return (
                  <button
                    key={status.value}
                    onClick={() => handleStatusSelect(status.value)}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 hover:scale-[1.02] transition-all duration-200 text-sm flex items-center space-x-2"
                  >
                    <Icon className={`h-4 w-4 ${status.color}`} />
                    <span className="text-gray-900 font-medium">{status.label}</span>
                  </button>
                )
              })}
              <div className="border-t mx-2 pt-1">
                <button
                  onClick={() => onChange('')}
                  className="text-xs text-red-600 hover:text-red-800 px-1"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      )

    default: // 'text'
      return (
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-20 p-2 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded resize-none focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200"
          rows={3}
        />
      )
  }
}