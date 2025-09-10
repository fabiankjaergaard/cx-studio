'use client'

import { Section, SectionProps } from './Section'
import { CustomerJourney } from '@/types'
import { LightbulbIcon, XIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface OpportunitiesSectionProps extends Omit<SectionProps, 'children' | 'title'> {
  journey: CustomerJourney
  opportunities?: Record<string, string[]>
  onUpdateOpportunities?: (stageId: string, opportunities: string[]) => void
}

export function OpportunitiesSection({ 
  journey, 
  opportunities = {}, 
  onUpdateOpportunities, 
  ...sectionProps 
}: OpportunitiesSectionProps) {

  const handleAddOpportunity = (stageId: string) => {
    const stageOpportunities = opportunities[stageId] || []
    const updatedOpportunities = [...stageOpportunities, '']
    onUpdateOpportunities?.(stageId, updatedOpportunities)
  }

  const handleUpdateOpportunity = (stageId: string, index: number, value: string) => {
    const stageOpportunities = opportunities[stageId] || []
    const updatedOpportunities = [...stageOpportunities]
    updatedOpportunities[index] = value
    onUpdateOpportunities?.(stageId, updatedOpportunities.filter(Boolean))
  }

  const handleRemoveOpportunity = (stageId: string, index: number) => {
    const stageOpportunities = opportunities[stageId] || []
    const updatedOpportunities = stageOpportunities.filter((_, i) => i !== index)
    onUpdateOpportunities?.(stageId, updatedOpportunities)
  }

  return (
    <Section {...sectionProps} title="Möjligheter">
      <div className="space-y-8">
        {/* Opportunities Scale Legend */}
        <div className="flex items-center justify-center p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <LightbulbIcon className="h-6 w-6 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Identifiera förbättringsområden och nya chanser</span>
          </div>
        </div>

        {/* Journey Stages with Opportunities */}
        <div className="grid grid-cols-5 gap-6">
          {journey.stages.map((stage) => {
            const stageOpportunities = opportunities[stage.id] || []
            
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

                {/* Opportunities List */}
                <div className="space-y-3">
                  <p className="text-xs font-medium text-gray-700">Möjligheter & Idéer</p>
                  
                  <div className="space-y-2">
                    {stageOpportunities.map((opportunity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder="Beskriv möjlighet..."
                          value={opportunity}
                          onChange={(e) => handleUpdateOpportunity(stage.id, index, e.target.value)}
                          className="text-sm"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveOpportunity(stage.id, index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                        >
                          <XIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddOpportunity(stage.id)}
                      className="w-full border-dashed text-gray-500 hover:text-gray-700"
                    >
                      <PlusIcon className="h-3 w-3 mr-1" />
                      Lägg till möjlighet
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Opportunities Summary */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center">
            <LightbulbIcon className="h-5 w-5 text-yellow-600 mr-2" />
            Sammanfattning av Möjligheter
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {journey.stages.map((stage) => {
              const stageOpportunities = opportunities[stage.id] || []
              if (stageOpportunities.length === 0) return null
              
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
                    {stageOpportunities.map((opportunity, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-yellow-500 mr-2">💡</span>
                        {opportunity}
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