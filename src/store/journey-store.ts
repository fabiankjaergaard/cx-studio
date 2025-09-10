import { create } from 'zustand'
import { CustomerJourney, Touchpoint, CustomerJourneyStage, TouchpointConnection } from '@/types'

interface JourneyStore {
  journeys: CustomerJourney[]
  currentJourney: CustomerJourney | null
  selectedTouchpointId: string | null
  isConnecting: boolean
  connectionStart: string | null
  isDragging: boolean
  dragStartPosition: { x: number; y: number } | null
  dragCurrentPosition: { x: number; y: number } | null
  
  // Actions
  setCurrentJourney: (journey: CustomerJourney | null) => void
  setSelectedTouchpoint: (touchpointId: string | null) => void
  addTouchpoint: (touchpoint: Omit<Touchpoint, 'id'>) => void
  updateTouchpoint: (id: string, updates: Partial<Touchpoint>) => void
  deleteTouchpoint: (id: string) => void
  addJourney: (journey: Omit<CustomerJourney, 'id' | 'createdAt' | 'updatedAt'>) => void
  createBlankJourney: () => void
  startConnection: (touchpointId: string) => void
  completeConnection: (toTouchpointId: string) => void
  cancelConnection: () => void
  deleteConnection: (connectionId: string) => void
  startDragging: (touchpointId: string, position: { x: number; y: number }) => void
  updateDragPosition: (position: { x: number; y: number }) => void
  stopDragging: () => void
}

// Mock data for development
const mockStages: CustomerJourneyStage[] = [
  { id: '1', name: 'Medvetenhet', description: 'Kunden blir medveten om behov', color: '#3B82F6' },
  { id: '2', name: 'Övervägande', description: 'Kunden utvärderar alternativ', color: '#8B5CF6' },
  { id: '3', name: 'Köp', description: 'Kunden fattar köpbeslut', color: '#10B981' },
  { id: '4', name: 'Användning', description: 'Kunden använder produkten/tjänsten', color: '#F59E0B' },
  { id: '5', name: 'Lojalitet', description: 'Kunden blir lojal och rekommenderar', color: '#EF4444' }
]

const mockTouchpoints: Touchpoint[] = [
  {
    id: '1',
    title: 'Söker på Google',
    description: 'Kunden söker efter lösningar online',
    channel: 'online',
    emotion: 'neutral',
    position: { x: 0, y: 0 },
    stage: mockStages[0]
  },
  {
    id: '2',
    title: 'Läser recensioner',
    description: 'Kunden läser vad andra kunder tycker',
    channel: 'online',
    emotion: 'positive',
    position: { x: 0, y: 1 },
    stage: mockStages[1]
  },
  {
    id: '3',
    title: 'Kontaktar kundtjänst',
    description: 'Kunden ringer för att få mer information',
    channel: 'phone',
    emotion: 'positive',
    position: { x: 0, y: 2 },
    stage: mockStages[1]
  },
  {
    id: '4',
    title: 'Genomför köp online',
    description: 'Kunden köper produkten via webshop',
    channel: 'online',
    emotion: 'positive',
    position: { x: 0, y: 3 },
    stage: mockStages[2]
  },
  {
    id: '5',
    title: 'Får leverans',
    description: 'Produkten levereras hem till kunden',
    channel: 'offline',
    emotion: 'neutral',
    position: { x: 0, y: 4 },
    stage: mockStages[3]
  }
]

const mockJourney: CustomerJourney = {
  id: '1',
  title: 'Ny Customer Journey',
  description: 'En tom journey redo att fyllas med dina egna touchpoints',
  persona: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  touchpoints: [],
  stages: mockStages,
  connections: []
}

export const useJourneyStore = create<JourneyStore>((set, get) => ({
  journeys: [mockJourney],
  currentJourney: mockJourney,
  selectedTouchpointId: null,
  isConnecting: false,
  connectionStart: null,
  isDragging: false,
  dragStartPosition: null,
  dragCurrentPosition: null,

  setCurrentJourney: (journey) => set({ currentJourney: journey }),
  
  setSelectedTouchpoint: (touchpointId) => set({ selectedTouchpointId: touchpointId }),

  addTouchpoint: (touchpoint) => {
    const { currentJourney } = get()
    if (!currentJourney) return

    const newTouchpoint: Touchpoint = {
      ...touchpoint,
      id: crypto.randomUUID()
    }

    const updatedJourney = {
      ...currentJourney,
      touchpoints: [...currentJourney.touchpoints, newTouchpoint],
      updatedAt: new Date()
    }

    set({
      currentJourney: updatedJourney,
      journeys: get().journeys.map(j => 
        j.id === currentJourney.id ? updatedJourney : j
      )
    })
  },

  updateTouchpoint: (id, updates) => {
    const { currentJourney } = get()
    if (!currentJourney) return

    const updatedJourney = {
      ...currentJourney,
      touchpoints: currentJourney.touchpoints.map(t => 
        t.id === id ? { ...t, ...updates } : t
      ),
      updatedAt: new Date()
    }

    set({
      currentJourney: updatedJourney,
      journeys: get().journeys.map(j => 
        j.id === currentJourney.id ? updatedJourney : j
      )
    })
  },

  deleteTouchpoint: (id) => {
    const { currentJourney } = get()
    if (!currentJourney) return

    const updatedJourney = {
      ...currentJourney,
      touchpoints: currentJourney.touchpoints.filter(t => t.id !== id),
      updatedAt: new Date()
    }

    set({
      currentJourney: updatedJourney,
      journeys: get().journeys.map(j => 
        j.id === currentJourney.id ? updatedJourney : j
      ),
      selectedTouchpointId: get().selectedTouchpointId === id ? null : get().selectedTouchpointId
    })
  },

  addJourney: (journey) => {
    const newJourney: CustomerJourney = {
      ...journey,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      connections: []
    }

    set({
      journeys: [...get().journeys, newJourney]
    })
  },

  createBlankJourney: () => {
    const blankJourney: CustomerJourney = {
      id: crypto.randomUUID(),
      title: 'Ny Customer Journey',
      description: 'En tom journey redo att fyllas med dina egna touchpoints',
      persona: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      touchpoints: [], // Tom array - inga förifyllda touchpoints
      stages: mockStages, // Behåll stages för strukturen
      connections: []
    }

    set({
      currentJourney: blankJourney,
      journeys: [...get().journeys, blankJourney]
    })
  },

  startConnection: (touchpointId) => {
    set({
      isConnecting: true,
      connectionStart: touchpointId
    })
  },

  completeConnection: (toTouchpointId) => {
    const { currentJourney, connectionStart } = get()
    if (!currentJourney || !connectionStart || connectionStart === toTouchpointId) {
      set({ isConnecting: false, connectionStart: null })
      return
    }

    const newConnection: TouchpointConnection = {
      id: crypto.randomUUID(),
      fromTouchpointId: connectionStart,
      toTouchpointId: toTouchpointId
    }

    const updatedJourney = {
      ...currentJourney,
      connections: [...currentJourney.connections, newConnection],
      updatedAt: new Date()
    }

    set({
      currentJourney: updatedJourney,
      journeys: get().journeys.map(j => 
        j.id === currentJourney.id ? updatedJourney : j
      ),
      isConnecting: false,
      connectionStart: null
    })
  },

  cancelConnection: () => {
    set({
      isConnecting: false,
      connectionStart: null,
      isDragging: false,
      dragStartPosition: null,
      dragCurrentPosition: null
    })
  },

  startDragging: (touchpointId, position) => {
    set({
      isConnecting: true,
      connectionStart: touchpointId,
      isDragging: true,
      dragStartPosition: position,
      dragCurrentPosition: position
    })
  },

  updateDragPosition: (position) => {
    set({
      dragCurrentPosition: position
    })
  },

  stopDragging: () => {
    set({
      isDragging: false,
      dragStartPosition: null,
      dragCurrentPosition: null
    })
  },

  deleteConnection: (connectionId) => {
    const { currentJourney } = get()
    if (!currentJourney) return

    const updatedJourney = {
      ...currentJourney,
      connections: currentJourney.connections.filter(c => c.id !== connectionId),
      updatedAt: new Date()
    }

    set({
      currentJourney: updatedJourney,
      journeys: get().journeys.map(j => 
        j.id === currentJourney.id ? updatedJourney : j
      )
    })
  }
}))