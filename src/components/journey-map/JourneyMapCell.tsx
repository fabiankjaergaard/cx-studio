'use client'

import { useState } from 'react'
import { StarIcon } from 'lucide-react'
import { EmotionCurve } from './EmotionCurve'

interface JourneyMapCellProps {
  content: string
  type: 'text' | 'emoji' | 'number' | 'rating' | 'status'
  onChange: (content: string) => void
  placeholder?: string
  stageCount?: number
  isEmotionCurveCell?: boolean
}

const STATUS_OPTIONS = ['✅ Bra', '⚠️ OK', '❌ Dåligt', '🔄 Pågående', '⏸️ Pausad']

export function JourneyMapCell({ 
  content, 
  type, 
  onChange, 
  placeholder = 'Klicka för att redigera...', 
  stageCount = 4,
  isEmotionCurveCell = false
}: JourneyMapCellProps) {
  const [isStatusPickerOpen, setIsStatusPickerOpen] = useState(false)

  const handleRatingClick = (rating: number) => {
    onChange(rating.toString())
  }

  const handleStatusSelect = (status: string) => {
    onChange(status)
    setIsStatusPickerOpen(false)
  }

  switch (type) {
    case 'emoji':
      if (isEmotionCurveCell) {
        // Parse emotions from content (comma separated)
        const emotions = content ? content.split(',').map(e => e.trim()).filter(e => e) : []
        
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

    case 'number':
      return (
        <input
          type="number"
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-20 p-2 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded text-center focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white"
        />
      )

    case 'rating':
      const currentRating = parseInt(content) || 0
      return (
        <div className="w-full min-h-20 p-2 border border-gray-200 rounded bg-white flex items-center justify-center">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-6 w-6 cursor-pointer transition-colors ${
                  star <= currentRating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 hover:text-yellow-300'
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
            className="w-full min-h-20 p-2 text-sm border border-gray-200 rounded cursor-pointer hover:border-slate-400 bg-white flex items-center justify-center"
            onClick={() => setIsStatusPickerOpen(!isStatusPickerOpen)}
          >
            {content || <span className="text-gray-400">Välj status</span>}
          </div>
          {isStatusPickerOpen && (
            <div className="absolute top-full left-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 mt-1 min-w-32">
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusSelect(status)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm"
                >
                  {status}
                </button>
              ))}
              <div className="border-t mx-2 pt-1">
                <button
                  onClick={() => onChange('')}
                  className="text-xs text-red-600 hover:text-red-800 px-1"
                >
                  Rensa
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
          className="w-full min-h-20 p-2 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded resize-none focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white"
          rows={3}
        />
      )
  }
}