export interface JourneyMapCell {
  id: string
  content: string
  icon?: string
  backgroundColor?: string
  isEditing?: boolean
  colSpan?: number  // How many columns this cell spans
  position?: number // Position within the row (for drag & drop)
  isCritical?: boolean // Mark cell as critical/important touchpoint
  insightIds?: string[] // IDs of insights attached to this cell
}

export interface JourneyMapSublane {
  id: string
  parentRowId: string
  name: string
  cells: JourneyMapCell[]
}

export interface JourneyMapRow {
  id: string
  category: string
  description: string
  type: 'text' | 'emoji' | 'number' | 'rating' | 'status' | 'pain-points' | 'opportunities' | 'metrics' | 'channels'
  color: string
  cells: JourneyMapCell[]
  sublanes?: JourneyMapSublane[]
  isExpanded?: boolean
}

export interface JourneyMapPhase {
  id: string
  name: string
  color: string
  description?: string
}

export interface JourneyMapStage {
  id: string
  name: string
  description?: string
  phaseId: string
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
  phases: JourneyMapPhase[]
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
    color: 'bg-slate-50'
  },
  {
    id: 'pain-points',
    name: 'Pain Points',
    description: 'What problems and frustrations does the customer have?',
    type: 'text' as const,
    color: 'bg-slate-50'
  },
  {
    id: 'opportunities',
    name: 'Opportunities',
    description: 'Where are the improvement and innovation opportunities?',
    type: 'text' as const,
    color: 'bg-slate-50'
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
  { id: 'metrics', name: 'Metrics', description: 'KPI and metrics visualization' },
  { id: 'channels', name: 'Channels', description: 'Visual channel/touchpoint icons' }
]

// Available row colors
export const ROW_COLORS = [
  { id: 'bg-slate-50', name: 'Light Gray', class: 'bg-slate-50' },
  { id: 'bg-blue-200', name: 'Blue', class: 'bg-blue-200' },
  { id: 'bg-indigo-200', name: 'Indigo', class: 'bg-indigo-200' },
  { id: 'bg-slate-300', name: 'Light Blue', class: 'bg-slate-300' },
  { id: 'bg-emerald-200', name: 'Green', class: 'bg-emerald-200' },
  { id: 'bg-rose-200', name: 'Rose', class: 'bg-rose-200' },
  { id: 'bg-amber-200', name: 'Amber', class: 'bg-amber-200' },
  { id: 'bg-violet-200', name: 'Violet', class: 'bg-violet-200' },
  { id: 'bg-pink-200', name: 'Pink', class: 'bg-pink-200' },
  { id: 'bg-cyan-200', name: 'Cyan', class: 'bg-cyan-200' }
]

// Default phases for journey maps
export const DEFAULT_JOURNEY_PHASES = [
  {
    id: 'before',
    name: 'Before',
    color: 'bg-gray-100',
    description: 'Pre-interaction phase'
  },
  {
    id: 'during',
    name: 'During',
    color: 'bg-gray-100',
    description: 'Active interaction phase'
  },
  {
    id: 'after',
    name: 'After',
    color: 'bg-gray-100',
    description: 'Post-interaction phase'
  }
]

// Default stages for journey maps
export const DEFAULT_JOURNEY_STAGES = [
  {
    id: 'awareness',
    name: 'Awareness',
    description: 'Customer becomes aware of the need or problem',
    phaseId: 'before'
  },
  {
    id: 'purchase',
    name: 'Purchase/Decision',
    description: 'Customer makes decision and takes action',
    phaseId: 'during'
  },
  {
    id: 'usage',
    name: 'Usage',
    description: 'Customer uses the product or service',
    phaseId: 'during'
  },
  {
    id: 'advocacy',
    name: 'Advocacy',
    description: 'Customer becomes ambassador and recommends to others',
    phaseId: 'after'
  }
]

// Evidence and Insights types
export interface Evidence {
  id: string
  source: string // "NPS Q1 2025", "Support Tickets", "Manual observation"
  type: 'verbatim' | 'metric' | 'observation'
  text?: string // For verbatim comments
  value?: number // For metrics (NPS score, drop-off rate, etc)
  unit?: string // "ratio", "percentage", "count"
  collected_at: string
}

export interface Insight {
  id: string
  journey_id: string
  title: string
  summary: string
  severity: 1 | 2 | 3 | 4 | 5 // 1=low, 5=critical
  evidence: Evidence[]
  created_at: string
  created_by?: string
}