'use client'

import { Section, SectionProps } from './Section'
import { Input } from '@/components/ui/Input'
import { UserIcon, MapPinIcon, BriefcaseIcon, HeartIcon } from 'lucide-react'

interface PersonaSectionProps extends Omit<SectionProps, 'children' | 'title'> {
  persona?: {
    name?: string
    age?: string
    location?: string
    occupation?: string
    goals?: string[]
    painPoints?: string[]
    description?: string
  }
  onUpdate?: (persona: any) => void
}

export function PersonaSection({ persona, onUpdate, ...sectionProps }: PersonaSectionProps) {
  const handleUpdate = (field: string, value: any) => {
    onUpdate?.({
      ...persona,
      [field]: value
    })
  }

  return (
    <Section {...sectionProps} title="Persona">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="h-12 w-12 text-gray-400" />
            </div>
            <Input
              placeholder="Namn"
              value={persona?.name || ''}
              onChange={(e) => handleUpdate('name', e.target.value)}
              className="text-center font-medium text-lg"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-medium">Å</span>
              </div>
              <Input
                placeholder="Ålder"
                value={persona?.age || ''}
                onChange={(e) => handleUpdate('age', e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <MapPinIcon className="h-4 w-4 text-green-600" />
              </div>
              <Input
                placeholder="Plats"
                value={persona?.location || ''}
                onChange={(e) => handleUpdate('location', e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <BriefcaseIcon className="h-4 w-4 text-purple-600" />
              </div>
              <Input
                placeholder="Yrke"
                value={persona?.occupation || ''}
                onChange={(e) => handleUpdate('occupation', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Middle Column - Goals */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <HeartIcon className="h-3 w-3 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900">Mål & Behov</h3>
          </div>
          
          <div className="space-y-3">
            {[0, 1, 2].map((index) => (
              <Input
                key={index}
                placeholder={`Mål ${index + 1}`}
                value={persona?.goals?.[index] || ''}
                onChange={(e) => {
                  const goals = [...(persona?.goals || [])]
                  goals[index] = e.target.value
                  handleUpdate('goals', goals.filter(Boolean))
                }}
                className="text-sm"
              />
            ))}
          </div>
        </div>

        {/* Right Column - Pain Points */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xs font-bold">!</span>
            </div>
            <h3 className="font-medium text-gray-900">Utmaningar</h3>
          </div>
          
          <div className="space-y-3">
            {[0, 1, 2].map((index) => (
              <Input
                key={index}
                placeholder={`Utmaning ${index + 1}`}
                value={persona?.painPoints?.[index] || ''}
                onChange={(e) => {
                  const painPoints = [...(persona?.painPoints || [])]
                  painPoints[index] = e.target.value
                  handleUpdate('painPoints', painPoints.filter(Boolean))
                }}
                className="text-sm"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Beskrivning</h3>
        <textarea
          placeholder="Beskriv personas bakgrund, beteenden och motivationer..."
          value={persona?.description || ''}
          onChange={(e) => handleUpdate('description', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
      </div>
    </Section>
  )
}