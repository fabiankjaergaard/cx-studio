'use client'

import { useDrop } from 'react-dnd'
import { CustomerJourneyStage } from '@/types'
import { useJourneyStore } from '@/store/journey-store'
import { cn } from '@/lib/utils'

interface DropZoneProps {
  stage: CustomerJourneyStage
  children: React.ReactNode
}

export function DropZone({ stage, children }: DropZoneProps) {
  const { updateTouchpoint, currentJourney } = useJourneyStore()

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'touchpoint',
    drop: (item: { id: string; currentStage: string }) => {
      if (item.currentStage !== stage.id) {
        // Update the touchpoint's stage
        updateTouchpoint(item.id, { stage })
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  return (
    <div
      ref={drop}
      className={cn(
        'min-h-80 transition-all duration-200 rounded-lg p-3 border border-transparent',
        isOver && canDrop && 'bg-blue-50 border-blue-200',
        canDrop && !isOver && 'bg-gray-50/30'
      )}
    >
      {children}
    </div>
  )
}