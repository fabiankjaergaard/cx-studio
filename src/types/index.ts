export interface Touchpoint {
  id: string
  title: string
  description: string
  channel: 'online' | 'offline' | 'phone' | 'email' | 'social'
  emotion: 'positive' | 'neutral' | 'negative'
  position: { x: number; y: number }
  stage: CustomerJourneyStage
}

export interface TouchpointConnection {
  id: string
  fromTouchpointId: string
  toTouchpointId: string
  label?: string
}

export interface CustomerJourneyStage {
  id: string
  name: string
  description: string
  color: string
}

export interface CustomerJourney {
  id: string
  title: string
  description: string
  persona: string
  createdAt: Date
  updatedAt: Date
  touchpoints: Touchpoint[]
  stages: CustomerJourneyStage[]
  connections: TouchpointConnection[]
}

export interface Template {
  id: string
  name: string
  description: string
  industry: string
  stages: CustomerJourneyStage[]
  touchpoints: Touchpoint[]
}