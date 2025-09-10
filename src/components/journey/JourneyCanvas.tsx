'use client'

import React, { useRef, useEffect, useState } from 'react'
import { TouchpointCard } from './TouchpointCard'
import { NewTouchpointModal } from './NewTouchpointModal'
import { DropZone } from './DropZone'
import { DragDropProvider } from './DragDropProvider'
import { ConnectionLines } from './ConnectionLines'
import { DragLine } from './DragLine'
import { CustomerJourney, CustomerJourneyStage } from '@/types'
import { Button } from '@/components/ui/Button'
import { PlusIcon } from 'lucide-react'

interface JourneyCanvasProps {
  journey: CustomerJourney
  selectedTouchpointId?: string
  onTouchpointSelect?: (touchpointId: string) => void
}

export function JourneyCanvas({ 
  journey, 
  selectedTouchpointId, 
  onTouchpointSelect 
}: JourneyCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isNewTouchpointModalOpen, setIsNewTouchpointModalOpen] = useState(false)
  const [selectedStage, setSelectedStage] = useState<CustomerJourneyStage | null>(null)

  // Group touchpoints by stage
  const touchpointsByStage = journey.touchpoints.reduce((acc, touchpoint) => {
    const stageId = touchpoint.stage.id
    if (!acc[stageId]) {
      acc[stageId] = []
    }
    acc[stageId].push(touchpoint)
    return acc
  }, {} as Record<string, typeof journey.touchpoints>)

  const handleAddTouchpoint = (stage: CustomerJourneyStage) => {
    setSelectedStage(stage)
    setIsNewTouchpointModalOpen(true)
  }

  return (
    <DragDropProvider>
      <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto" ref={canvasRef}>
        <DragLine canvasRef={canvasRef} />
        <div className="p-10">
          {/* Stage Headers */}
          <div className="grid grid-cols-5 gap-6 mb-8 max-w-7xl mx-auto">
            {journey.stages.map((stage) => (
              <div
                key={stage.id}
                className="text-center p-4 rounded-lg shadow-sm border border-white/50 min-w-0"
                style={{ backgroundColor: stage.color + '15' }}
              >
                <div 
                  className="w-3 h-3 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: stage.color }}
                />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm truncate">{stage.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{stage.description}</p>
              </div>
            ))}
          </div>

          {/* Touchpoints Grid */}
          <div className="grid grid-cols-5 gap-6 max-w-7xl mx-auto">
            {journey.stages.map((stage) => (
              <div key={stage.id} className="min-w-0 flex flex-col">
                <DropZone stage={stage}>
                  {/* Touchpoints */}
                  <div className="space-y-3 mb-4">
                    {touchpointsByStage[stage.id]?.map((touchpoint, index) => (
                      <div
                        key={touchpoint.id}
                        className="transform transition-all duration-200"
                        style={{ 
                          transform: `translateY(${index * 1}px)`,
                          zIndex: touchpointsByStage[stage.id]?.length - index
                        }}
                      >
                        <TouchpointCard
                          touchpoint={touchpoint}
                          isSelected={selectedTouchpointId === touchpoint.id}
                          onClick={() => onTouchpointSelect?.(touchpoint.id)}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Touchpoint Button */}
                  <Button
                    variant="outline"
                    className="w-full h-16 border-dashed border-2 border-gray-300 hover:border-gray-400 text-gray-500 hover:text-gray-600 rounded-lg transition-all duration-200 hover:shadow-sm"
                    onClick={() => handleAddTouchpoint(stage)}
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    <span className="text-xs">Lägg till touchpoint</span>
                  </Button>
                </DropZone>
              </div>
            ))}
          </div>

        </div>
        
        <NewTouchpointModal
          isOpen={isNewTouchpointModalOpen}
          onClose={() => setIsNewTouchpointModalOpen(false)}
          stage={selectedStage || undefined}
        />
      </div>
    </DragDropProvider>
  )
}