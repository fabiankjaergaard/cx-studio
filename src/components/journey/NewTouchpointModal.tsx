'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useJourneyStore } from '@/store/journey-store'
import { CustomerJourneyStage } from '@/types'

interface NewTouchpointModalProps {
  isOpen: boolean
  onClose: () => void
  stage?: CustomerJourneyStage
}

export function NewTouchpointModal({ isOpen, onClose, stage }: NewTouchpointModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [channel, setChannel] = useState<'online' | 'offline' | 'phone' | 'email' | 'social'>('online')
  const [emotion, setEmotion] = useState<'positive' | 'neutral' | 'negative'>('neutral')
  const [isCreating, setIsCreating] = useState(false)
  
  const { addTouchpoint, currentJourney } = useJourneyStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !currentJourney || !stage) return

    setIsCreating(true)
    
    try {
      const newTouchpoint = {
        title: title.trim(),
        description: description.trim(),
        channel,
        emotion,
        position: { x: 0, y: 0 },
        stage
      }

      addTouchpoint(newTouchpoint)
      
      // Reset form
      setTitle('')
      setDescription('')
      setChannel('online')
      setEmotion('neutral')
      onClose()
    } catch (error) {
      console.error('Error creating touchpoint:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleClose = () => {
    setTitle('')
    setDescription('')
    setChannel('online')
    setEmotion('neutral')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Lägg till touchpoint${stage ? ` - ${stage.name}` : ''}`}
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
            placeholder="t.ex. Besöker webbplatsen"
            className="text-gray-900"
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
            placeholder="Beskriv vad kunden gör i denna touchpoint..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-500 resize-none"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kanal
            </label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="phone">Telefon</option>
              <option value="email">E-post</option>
              <option value="social">Sociala medier</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Känslotillstånd
            </label>
            <select
              value={emotion}
              onChange={(e) => setEmotion(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              <option value="positive">Positiv</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negativ</option>
            </select>
          </div>
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
          >
            {isCreating ? 'Lägger till...' : 'Lägg till Touchpoint'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}