'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useJourneyStore } from '@/store/journey-store'
import { Touchpoint } from '@/types'

interface EditTouchpointModalProps {
  isOpen: boolean
  onClose: () => void
  touchpoint: Touchpoint | null
}

export function EditTouchpointModal({ isOpen, onClose, touchpoint }: EditTouchpointModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [channel, setChannel] = useState<'online' | 'offline' | 'phone' | 'email' | 'social'>('online')
  const [emotion, setEmotion] = useState<'positive' | 'neutral' | 'negative'>('neutral')
  
  const { updateTouchpoint } = useJourneyStore()

  // Populate form when touchpoint changes
  useEffect(() => {
    if (touchpoint) {
      setTitle(touchpoint.title)
      setDescription(touchpoint.description)
      setChannel(touchpoint.channel)
      setEmotion(touchpoint.emotion)
    }
  }, [touchpoint])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!touchpoint || !title.trim()) return

    updateTouchpoint(touchpoint.id, {
      title: title.trim(),
      description: description.trim(),
      channel,
      emotion
    })
    
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  if (!touchpoint) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Redigera Touchpoint"
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
            placeholder="t.ex. Söker på Google"
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
            placeholder="Beskriv vad som händer i denna touchpoint..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kanal
          </label>
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="phone">Telefon</option>
            <option value="email">Email</option>
            <option value="social">Social Media</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Känsla
          </label>
          <select
            value={emotion}
            onChange={(e) => setEmotion(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="positive">Positiv</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negativ</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Avbryt
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!title.trim()}
          >
            Spara ändringar
          </Button>
        </div>
      </form>
    </Modal>
  )
}