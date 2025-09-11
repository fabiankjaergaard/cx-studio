export interface JourneyMapCell {
  id: string
  content: string
  isEditing?: boolean
}

export interface JourneyMapRow {
  id: string
  category: string
  description: string
  type: 'text' | 'emoji' | 'number' | 'rating' | 'status'
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
    name: 'Åtgärder',
    description: 'Vad gör kunden i detta steg?',
    type: 'text' as const,
    color: 'bg-slate-50'
  },
  {
    id: 'touchpoints',
    name: 'Kontaktpunkter',
    description: 'Vilka kanaler och system interagerar kunden med?',
    type: 'text' as const,
    color: 'bg-slate-50'
  },
  {
    id: 'emotions',
    name: 'Känslor',
    description: 'Hur känner sig kunden? Vilka emotioner upplevs?',
    type: 'emoji' as const,
    color: 'bg-blue-50'
  },
  {
    id: 'pain-points',
    name: 'Smärtpunkter',
    description: 'Vilka problem och frustrationer har kunden?',
    type: 'text' as const,
    color: 'bg-red-50'
  },
  {
    id: 'opportunities',
    name: 'Möjligheter',
    description: 'Var finns förbättrings- och innovationsmöjligheter?',
    type: 'text' as const,
    color: 'bg-green-50'
  },
  {
    id: 'backstage',
    name: 'Bakom kulisserna',
    description: 'Vilka interna processer och system stödjer denna fas?',
    type: 'text' as const,
    color: 'bg-slate-50'
  }
]

// Available row types
export const ROW_TYPES = [
  { id: 'text', name: 'Text', description: 'Vanlig textinmatning' },
  { id: 'emoji', name: 'Emoji', description: 'Emojis för känslor och reaktioner' },
  { id: 'number', name: 'Nummer', description: 'Numeriska värden' },
  { id: 'rating', name: 'Betyg', description: 'Stjärnbetyg 1-5' },
  { id: 'status', name: 'Status', description: 'Status-indikatorer' }
]

// Available row colors
export const ROW_COLORS = [
  { id: 'bg-slate-50', name: 'Grå', class: 'bg-slate-50' },
  { id: 'bg-blue-50', name: 'Blå', class: 'bg-blue-50' },
  { id: 'bg-green-50', name: 'Grön', class: 'bg-green-50' },
  { id: 'bg-red-50', name: 'Röd', class: 'bg-red-50' },
  { id: 'bg-yellow-50', name: 'Gul', class: 'bg-yellow-50' },
  { id: 'bg-purple-50', name: 'Lila', class: 'bg-purple-50' },
  { id: 'bg-pink-50', name: 'Rosa', class: 'bg-pink-50' },
  { id: 'bg-indigo-50', name: 'Indigo', class: 'bg-indigo-50' }
]

// Default stages for journey maps
export const DEFAULT_JOURNEY_STAGES = [
  {
    id: 'awareness',
    name: 'Medvetenhet',
    description: 'Kunden blir medveten om behovet eller problemet'
  },
  {
    id: 'consideration',
    name: 'Överväger',
    description: 'Kunden utvärderar olika alternativ och lösningar'
  },
  {
    id: 'purchase',
    name: 'Köp/Beslut',
    description: 'Kunden fattar beslut och genomför åtgärden'
  },
  {
    id: 'usage',
    name: 'Användning',
    description: 'Kunden använder produkten eller tjänsten'
  },
  {
    id: 'advocacy',
    name: 'Rekommendation',
    description: 'Kunden blir ambassador och rekommenderar andra'
  }
]