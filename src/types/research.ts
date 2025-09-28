export interface ResearchFolder {
  id: string
  name: string
  description: string
  color: string
  icon?: string
  createdAt: string
  itemCount: number
  lastActivity: string
  types: Array<'interview' | 'survey' | 'focusgroup' | 'usability'>
}

export interface ResearchItem {
  id: string
  type: 'interview' | 'survey' | 'focusgroup' | 'usability'
  title: string
  participant?: string
  date: string
  duration?: number
  status: 'completed' | 'in-progress' | 'draft'
  folderId?: string
  responses?: number
  insights?: number
}