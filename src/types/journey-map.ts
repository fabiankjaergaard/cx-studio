export interface JourneyMapCell {
  id: string
  content: string
  isEditing?: boolean
}

export interface JourneyMapRow {
  id: string
  category: string
  description: string
  type: 'text' | 'emoji' | 'number' | 'rating' | 'status' | 'pain-points' | 'opportunities' | 'metrics'
  color: string
  cells: JourneyMapCell[]
}

export interface JourneyMapStage {
  id: string
  name: string
  description?: string
}

export interface JourneyMapPersona {
  id: string
  name: string
  avatar?: string
  description?: string
}

export interface JourneyMapData {
  id: string
  name: string
  description?: string
  persona: JourneyMapPersona | null
  stages: JourneyMapStage[]
  rows: JourneyMapRow[]
  createdAt: string
  updatedAt: string
  createdBy: string
  status: 'draft' | 'completed' | 'in-review'
}

export interface JourneyMapTemplate {
  id: string
  name: string
  description: string
  categories: {
    id: string
    name: string
    description: string
  }[]
  defaultStages: {
    id: string
    name: string
    description?: string
  }[]
}

// Default categories for journey maps
export const DEFAULT_JOURNEY_CATEGORIES = [
  {
    id: 'actions',
    name: 'Actions',
    description: 'What does the customer do in this step?',
    type: 'text' as const,
    color: 'bg-slate-50'
  },
  {
    id: 'touchpoints',
    name: 'Touchpoints',
    description: 'Which channels and systems does the customer interact with?',
    type: 'text' as const,
    color: 'bg-slate-50'
  },
  {
    id: 'emotions',
    name: 'Emotions',
    description: 'How does the customer feel? What emotions are experienced?',
    type: 'emoji' as const,
    color: 'bg-blue-50'
  },
  {
    id: 'pain-points',
    name: 'Pain Points',
    description: 'What problems and frustrations does the customer have?',
    type: 'text' as const,
    color: 'bg-red-50'
  },
  {
    id: 'opportunities',
    name: 'Opportunities',
    description: 'Where are the improvement and innovation opportunities?',
    type: 'text' as const,
    color: 'bg-green-50'
  },
  {
    id: 'backstage',
    name: 'Backstage',
    description: 'What internal processes and systems support this phase?',
    type: 'text' as const,
    color: 'bg-slate-50'
  }
]

// Available row types
export const ROW_TYPES = [
  { id: 'text', name: 'Text', description: 'Regular text input' },
  { id: 'emoji', name: 'Emoji', description: 'Emojis for emotions and reactions' },
  { id: 'number', name: 'Number', description: 'Numeric values' },
  { id: 'rating', name: 'Rating', description: 'Star rating 1-5' },
  { id: 'status', name: 'Status', description: 'Status indicators' },
  { id: 'pain-points', name: 'Pain Points', description: 'Visual pain point intensity tracking' },
  { id: 'opportunities', name: 'Opportunities', description: 'Opportunity priority visualization' },
  { id: 'metrics', name: 'Metrics', description: 'KPI and metrics visualization' }
]

// Available row colors
export const ROW_COLORS = [
  { id: 'bg-slate-50', name: 'Gray', class: 'bg-slate-50' },
  { id: 'bg-blue-50', name: 'Blue', class: 'bg-blue-50' },
  { id: 'bg-green-50', name: 'Green', class: 'bg-green-50' },
  { id: 'bg-red-50', name: 'Red', class: 'bg-red-50' },
  { id: 'bg-yellow-50', name: 'Yellow', class: 'bg-yellow-50' },
  { id: 'bg-purple-50', name: 'Purple', class: 'bg-purple-50' },
  { id: 'bg-pink-50', name: 'Pink', class: 'bg-pink-50' },
  { id: 'bg-indigo-50', name: 'Indigo', class: 'bg-indigo-50' }
]

// Default stages for journey maps
export const DEFAULT_JOURNEY_STAGES = [
  {
    id: 'awareness',
    name: 'Awareness',
    description: 'Customer becomes aware of the need or problem'
  },
  {
    id: 'consideration',
    name: 'Consideration',
    description: 'Customer evaluates different alternatives and solutions'
  },
  {
    id: 'purchase',
    name: 'Purchase/Decision',
    description: 'Customer makes decision and takes action'
  },
  {
    id: 'usage',
    name: 'Usage',
    description: 'Customer uses the product or service'
  },
  {
    id: 'advocacy',
    name: 'Advocacy',
    description: 'Customer becomes ambassador and recommends to others'
  }
]