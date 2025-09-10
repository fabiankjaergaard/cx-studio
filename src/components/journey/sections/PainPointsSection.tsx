'use client'

import { Section, SectionProps } from './Section'
import { CustomerJourney } from '@/types'
import { AlertTriangleIcon, XIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface PainPointsSectionProps extends Omit<SectionProps, 'children' | 'title'> {
  journey: CustomerJourney
  painPoints?: Record<string, string[]>
  onUpdatePainPoints?: (stageId: string, painPoints: string[]) => void
}

export function PainPointsSection({ 
  journey, 
  painPoints = {}, 
  onUpdatePainPoints, 
  ...sectionProps 
}: PainPointsSectionProps) {

  const handleAddPainPoint = (stageId: string) => {
    const stagePainPoints = painPoints[stageId] || []
    const updatedPainPoints = [...stagePainPoints, '']
    onUpdatePainPoints?.(stageId, updatedPainPoints)
  }

  const handleUpdatePainPoint = (stageId: string, index: number, value: string) => {
    const stagePainPoints = painPoints[stageId] || []
    const updatedPainPoints = [...stagePainPoints]
    updatedPainPoints[index] = value
    onUpdatePainPoints?.(stageId, updatedPainPoints.filter(Boolean))
  }

  const handleRemovePainPoint = (stageId: string, index: number) => {
    const stagePainPoints = painPoints[stageId] || []
    const updatedPainPoints = stagePainPoints.filter((_, i) => i !== index)
    onUpdatePainPoints?.(stageId, updatedPainPoints)
  }

  return (
    <Section {...sectionProps} title="Pain Points">
      <div className="space-y-8">
        {/* Pain Points Scale Legend */}
        <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangleIcon className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium text-gray-700">Identifiera problem och frustrationer i varje steg</span>
          </div>
        </div>

        {/* Journey Stages with Pain Points */}
        <div className="grid grid-cols-5 gap-6">
          {journey.stages.map((stage) => {
            const stagePainPoints = painPoints[stage.id] || []
            
            return (
              <div key={stage.id} className="space-y-4">
                {/* Stage Info */}
                <div className="text-center p-3 rounded-lg border" style={{ backgroundColor: stage.color + '15' }}>
                  <div 
                    className="w-3 h-3 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: stage.color }}
                  />
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{stage.name}</h3>
                  <p className="text-xs text-gray-600">{stage.description}</p>
                </div>

                {/* Pain Points List */}
                <div className="space-y-3">
                  <p className="text-xs font-medium text-gray-700">Problem & Utmaningar</p>
                  
                  <div className="space-y-2">
                    {stagePainPoints.map((painPoint, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder="Beskriv problem..."
                          value={painPoint}
                          onChange={(e) => handleUpdatePainPoint(stage.id, index, e.target.value)}
                          className="text-sm"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemovePainPoint(stage.id, index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                        >
                          <XIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddPainPoint(stage.id)}
                      className="w-full border-dashed text-gray-500 hover:text-gray-700"
                    >
                      <PlusIcon className="h-3 w-3 mr-1" />
                      Lägg till problem
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pain Points Summary */}
        <div className="mt-8 p-6 bg-red-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center">
            <AlertTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
            Sammanfattning av Pain Points
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {journey.stages.map((stage) => {
              const stagePainPoints = painPoints[stage.id] || []
              if (stagePainPoints.length === 0) return null
              
              return (
                <div key={stage.id} className="bg-white p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <div 
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: stage.color }}
                    />
                    {stage.name}
                  </h4>
                  <ul className="space-y-1">
                    {stagePainPoints.map((painPoint, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        {painPoint}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}