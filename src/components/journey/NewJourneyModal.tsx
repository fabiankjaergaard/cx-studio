'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useJourneyStore } from '@/store/journey-store'
import { CustomerJourneyStage } from '@/types'

interface NewJourneyModalProps {
  isOpen: boolean
  onClose: () => void
}

const defaultStages: CustomerJourneyStage[] = [
  { id: '1', name: 'Medvetenhet', description: 'Kunden blir medveten om behov', color: '#3B82F6' },
  { id: '2', name: 'Övervägande', description: 'Kunden utvärderar alternativ', color: '#8B5CF6' },
  { id: '3', name: 'Köp', description: 'Kunden fattar köpbeslut', color: '#10B981' },
  { id: '4', name: 'Användning', description: 'Kunden använder produkten/tjänsten', color: '#F59E0B' },
  { id: '5', name: 'Lojalitet', description: 'Kunden blir lojal och rekommenderar', color: '#EF4444' }
]

export function NewJourneyModal({ isOpen, onClose }: NewJourneyModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [persona, setPersona] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  
  const router = useRouter()
  const { addJourney, setCurrentJourney } = useJourneyStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      return
    }

    setIsCreating(true)
    
    try {
      const newJourney = {
        title: title.trim(),
        description: description.trim() || 'En ny customer journey map',
        persona: persona.trim() || 'Allmän kund',
        touchpoints: [],
        stages: defaultStages
      }

      addJourney(newJourney)
      
      // Set as current journey and navigate
      const journeys = useJourneyStore.getState().journeys
      const createdJourney = journeys[journeys.length - 1]
      setCurrentJourney(createdJourney)
      
      // Reset form
      setTitle('')
      setDescription('')
      setPersona('')
      onClose()
      
      // Navigate to journeys page
      router.push('/journeys')
    } catch (error) {
      console.error('Error creating journey:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setPersona('')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Skapa ny Journey Map"
      className="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Titel *
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="t.ex. E-commerce Köpresa"
            required
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Beskrivning
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Beskriv denna customer journey..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Persona
          </label>
          <Input
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            placeholder="t.ex. Digital-savvy konsument"
          />
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-700">
            Din journey map kommer att skapas med 5 standardfaser: Medvetenhet, Övervägande, Köp, Användning och Lojalitet. Du kan anpassa dessa senare.
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isCreating}
          >
            Avbryt
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!title.trim() || isCreating}
            onClick={(e) => {
              // Let the form submit handle the rest
            }}
          >
            {isCreating ? 'Skapar...' : 'Skapa Journey Map'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}