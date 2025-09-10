'use client'

import { CustomerJourney } from '@/types'
import { cn } from '@/lib/utils'

interface ProgressIndicatorProps {
  journey: CustomerJourney
}

export function ProgressIndicator({ journey }: ProgressIndicatorProps) {
  // Count touchpoints per stage
  const touchpointsByStage = journey.touchpoints.reduce((acc, touchpoint) => {
    const stageId = touchpoint.stage.id
    acc[stageId] = (acc[stageId] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const totalTouchpoints = journey.touchpoints.length

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">Customer Journey Progress</h3>
        <span className="text-xs text-gray-500">{totalTouchpoints} touchpoints totalt</span>
      </div>
      
      <div className="flex space-x-2">
        {journey.stages.map((stage, index) => {
          const stageCount = touchpointsByStage[stage.id] || 0
          const completion = totalTouchpoints > 0 ? (stageCount / totalTouchpoints) * 100 : 0
          
          return (
            <div key={stage.id} className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">{stage.name}</span>
                <span className="text-xs text-gray-500">{stageCount}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500 rounded-full"
                  style={{ 
                    width: `${Math.min(completion, 100)}%`,
                    backgroundColor: stage.color 
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}