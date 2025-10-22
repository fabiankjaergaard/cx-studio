'use client'

import { useDrag } from 'react-dnd'
import { Insight } from '@/types/journey-map'
import { Lightbulb } from 'lucide-react'

interface InsightBlockProps {
  insight: Insight
  onClick?: () => void
}

// Get severity color using Kustra color system
const getSeverityColor = (severity: 1 | 2 | 3 | 4 | 5) => {
  switch (severity) {
    case 5:
    case 4:
      return 'bg-[#ED6B5A]' // Coral Orange - Critical
    case 3:
      return 'bg-[#F4C542]' // Golden Sun - Medium
    case 2:
    case 1:
      return 'bg-[#778DB0]' // Calm Blue - Low
    default:
      return 'bg-[#8A8A8A]' // Slate Gray
  }
}

export function InsightBlock({ insight, onClick }: InsightBlockProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'INSIGHT',
    item: { insight },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const handleClick = (e: React.MouseEvent) => {
    // Only trigger onClick if we're not dragging
    if (!isDragging && onClick) {
      e.stopPropagation()
      onClick()
    }
  }

  return (
    <div
      ref={drag as any}
      onClick={handleClick}
      className={`
        cursor-grab active:cursor-grabbing p-3 rounded-lg border-2 group
        hover:shadow-md hover:scale-105 hover:-translate-y-1 transition-all duration-200 ease-out
        bg-white border-gray-300 hover:border-slate-400
        ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
        select-none
      `}
    >
      <div className="flex items-start space-x-3">
        {/* Severity indicator */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className={`w-3 h-3 rounded-full ${getSeverityColor(insight.severity)}`} />
          <span className="text-[10px] text-gray-500 font-medium">{insight.severity}/5</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-3.5 h-3.5 text-gray-600" />
            <h4 className="font-medium text-gray-900 text-sm truncate">
              {insight.title}
            </h4>
          </div>
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {insight.summary}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] text-gray-400">
              {insight.evidence.length} evidence point{insight.evidence.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Drag indicator */}
      {isDragging && (
        <div className="absolute inset-0 border-2 border-dashed border-slate-600 rounded-lg bg-slate-100 bg-opacity-30" />
      )}
    </div>
  )
}
