import { create } from 'zustand'
import { CustomerJourney, Touchpoint, CustomerJourneyStage, TouchpointConnection } from '@/types'

// Helper function to get translations - these will be initialized by components
let getTranslation: ((key: string) => string) | null = null

export const initializeStoreTranslations = (t: (key: string) => string) => {
  getTranslation = t
}

const t = (key: string) => getTranslation ? getTranslation(key) : key

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

// Mock data for development - now uses translations
const getMockStages = (): CustomerJourneyStage[] => [
  { id: '1', name: t('journey.stages.awareness'), description: t('journey.stages.awarenessDesc'), color: '#3B82F6' },
  { id: '2', name: t('journey.stages.consideration'), description: t('journey.stages.considerationDesc'), color: '#8B5CF6' },
  { id: '3', name: t('journey.stages.purchase'), description: t('journey.stages.purchaseDesc'), color: '#10B981' },
  { id: '4', name: t('journey.stages.usage'), description: t('journey.stages.usageDesc'), color: '#F59E0B' },
  { id: '5', name: t('journey.stages.loyalty'), description: t('journey.stages.loyaltyDesc'), color: '#EF4444' }
]

const getMockTouchpoints = (): Touchpoint[] => {
  const stages = getMockStages()
  return [
    {
      id: '1',
      title: t('journey.touchpoints.googleSearch'),
      description: t('journey.touchpoints.googleSearchDesc'),
      channel: 'online',
      emotion: 'neutral',
      position: { x: 0, y: 0 },
      stage: stages[0]
    },
    {
      id: '2',
      title: t('journey.touchpoints.readReviews'),
      description: t('journey.touchpoints.readReviewsDesc'),
      channel: 'online',
      emotion: 'positive',
      position: { x: 0, y: 1 },
      stage: stages[1]
    },
    {
      id: '3',
      title: t('journey.touchpoints.contactSupport'),
      description: t('journey.touchpoints.contactSupportDesc'),
      channel: 'phone',
      emotion: 'positive',
      position: { x: 0, y: 2 },
      stage: stages[1]
    },
    {
      id: '4',
      title: t('journey.touchpoints.makePurchase'),
      description: t('journey.touchpoints.makePurchaseDesc'),
      channel: 'online',
      emotion: 'positive',
      position: { x: 0, y: 3 },
      stage: stages[2]
    },
    {
      id: '5',
      title: t('journey.touchpoints.receiveProduct'),
      description: t('journey.touchpoints.receiveProductDesc'),
      channel: 'offline',
      emotion: 'neutral',
      position: { x: 0, y: 4 },
      stage: stages[3]
    }
  ]
}

const getMockJourney = (): CustomerJourney => ({
  id: '1',
  title: t('journey.newJourneyTitle'),
  description: t('journey.newJourneyDesc'),
  persona: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  touchpoints: [],
  stages: getMockStages(),
  connections: []
})

export const useJourneyStore = create<JourneyStore>((set, get) => {
  return {
  journeys: [],
  currentJourney: null,
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
      title: t('journey.blankJourneyTitle'),
      description: t('journey.blankJourneyDesc'),
      persona: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      touchpoints: [], // Tom array - inga förifyllda touchpoints
      stages: getMockStages(), // Behåll stages för strukturen
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
}})