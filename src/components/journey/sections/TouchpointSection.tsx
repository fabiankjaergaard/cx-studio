'use client'

import { useState, useRef, useEffect } from 'react'
import { Section, SectionProps } from './Section'
import { TouchpointCard } from '../TouchpointCard'
import { NewTouchpointModal } from '../NewTouchpointModal'
import { DropZone } from '../DropZone'
import { DragDropProvider } from '../DragDropProvider'
import { DragLine } from '../DragLine'
import { ConnectionLines } from '../ConnectionLines'
import { Button } from '@/components/ui/Button'
import { 
  PlusIcon,
  EyeIcon,
  SearchIcon,
  ShoppingCartIcon,
  PackageIcon,
  HeartIcon
} from 'lucide-react'
import { CustomerJourney, CustomerJourneyStage } from '@/types'
import { useJourneyStore } from '@/store/journey-store'

interface TouchpointSectionProps extends Omit<SectionProps, 'children' | 'title'> {
  journey: CustomerJourney
  selectedTouchpointId?: string
  onTouchpointSelect?: (touchpointId: string) => void
  onTouchpointEdit?: () => void
  subType?: string
  sectionId?: string
}

export function TouchpointSection({ 
  journey, 
  selectedTouchpointId, 
  onTouchpointSelect,
  onTouchpointEdit,
  subType,
  sectionId,
  ...sectionProps 
}: TouchpointSectionProps) {
  const [isNewTouchpointModalOpen, setIsNewTouchpointModalOpen] = useState(false)
  const [selectedStage, setSelectedStage] = useState<CustomerJourneyStage | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  
  // Get current journey from store to ensure we have the latest touchpoints
  const { currentJourney } = useJourneyStore()
  const activeJourney = currentJourney || journey

  // Map stage names to appropriate icons
  const getStageIcon = (stageName: string) => {
    const name = stageName.toLowerCase()
    if (name.includes('medvetenhet') || name.includes('awareness')) return EyeIcon
    if (name.includes('övervägande') || name.includes('consideration')) return SearchIcon
    if (name.includes('köp') || name.includes('purchase')) return ShoppingCartIcon
    if (name.includes('användning') || name.includes('usage')) return PackageIcon
    if (name.includes('lojalitet') || name.includes('loyalty')) return HeartIcon
    return EyeIcon // Default
  }

  // Group touchpoints by stage - use current journey from store
  const touchpointsByStage = activeJourney.touchpoints.reduce((acc, touchpoint) => {
    const stageId = touchpoint.stage.id
    if (!acc[stageId]) {
      acc[stageId] = []
    }
    acc[stageId].push(touchpoint)
    return acc
  }, {} as Record<string, typeof activeJourney.touchpoints>)

  const handleAddTouchpoint = (stage: CustomerJourneyStage) => {
    setSelectedStage(stage)
    setIsNewTouchpointModalOpen(true)
  }

  // Handle clicking outside to deselect touchpoint
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!canvasRef.current) return
      
      const target = event.target as HTMLElement
      
      // Check if click was on a touchpoint card or its children
      const touchpointCard = target.closest('[data-touchpoint-id]')
      
      // Check if click was on connection dots or edit buttons
      const isConnectionDot = target.closest('[title*="koppling"]') || target.closest('[title*="Redigera"]')
      
      // If click was outside any touchpoint card and not on connection/edit elements
      if (!touchpointCard && !isConnectionDot && selectedTouchpointId) {
        onTouchpointSelect?.(selectedTouchpointId) // This will toggle/deselect since it's the same ID
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectedTouchpointId, onTouchpointSelect])

  const sectionTitle = subType === 'template' 
    ? 'Touchpoints (Template)' 
    : subType === 'blank' 
      ? 'Touchpoints (Tom)' 
      : 'Touchpoints'
  
  return (
    <Section {...sectionProps} title={sectionTitle} className="bg-gradient-to-br from-gray-50 to-gray-100">
      <DragDropProvider>
        <div ref={canvasRef} className="space-y-8 relative">
          {/* Stage Headers */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            {journey.stages.map((stage) => (
              <div
                key={stage.id}
                className="text-center p-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 min-w-0"
              >
                <div className="w-10 h-10 bg-slate-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  {(() => {
                    const IconComponent = getStageIcon(stage.name)
                    return <IconComponent className="w-5 h-5 text-slate-600" />
                  })()}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm truncate">{stage.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{stage.description}</p>
              </div>
            ))}
          </div>

          {/* Touchpoints Grid */}
          <div className="grid grid-cols-5 gap-6">
            {journey.stages.map((stage) => (
              <div key={stage.id} className="min-w-0 flex flex-col">
                <DropZone stage={stage}>
                  {/* Touchpoints */}
                  <div className="space-y-3 mb-4 w-full">
                    {touchpointsByStage[stage.id]?.map((touchpoint, index) => (
                      <div
                        key={touchpoint.id}
                        className="transform transition-all duration-200 w-full"
                        style={{ 
                          transform: `translateY(${index * 1}px)`,
                          zIndex: touchpointsByStage[stage.id]?.length - index
                        }}
                      >
                        <TouchpointCard
                          touchpoint={touchpoint}
                          isSelected={selectedTouchpointId === touchpoint.id}
                          onClick={() => onTouchpointSelect?.(touchpoint.id)}
                          onEdit={onTouchpointEdit}
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
          
          {/* Connection Lines - Permanent connections */}
          <ConnectionLines journey={activeJourney} canvasRef={canvasRef} />
          
          {/* Drag Line for Connections - Temporary drag preview */}
          <DragLine canvasRef={canvasRef} />
        </div>
        
        <NewTouchpointModal
          isOpen={isNewTouchpointModalOpen}
          onClose={() => setIsNewTouchpointModalOpen(false)}
          stage={selectedStage || undefined}
        />
      </DragDropProvider>
    </Section>
  )
}