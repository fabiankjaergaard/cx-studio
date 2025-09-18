'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import {
  SaveIcon,
  PlusIcon,
  SettingsIcon,
  UserIcon,
  TrashIcon,
  EditIcon,
  MoreVertical,
  Copy,
  Move,
  Trash2,
  FileDownIcon,
  ImageIcon
} from 'lucide-react'
import Link from 'next/link'
import { JourneyMapData, JourneyMapCell, JourneyMapRow, JourneyMapStage, JourneyMapPhase, DEFAULT_JOURNEY_CATEGORIES, DEFAULT_JOURNEY_STAGES, DEFAULT_JOURNEY_PHASES } from '@/types/journey-map'
import { JourneyMapCell as JourneyMapCellComponent } from '@/components/journey-map/JourneyMapCell'
import { RowEditor } from '@/components/journey-map/RowEditor'
import { JourneyMapOnboarding } from '@/components/onboarding/JourneyMapOnboarding'
import { DragDropProvider } from '@/components/journey/DragDropProvider'
import { RowTypePalette } from '@/components/journey-map/RowTypePalette'
import { RowInsertionZone } from '@/components/journey-map/RowInsertionZone'
import { InlineEdit } from '@/components/ui/InlineEdit'

interface Persona {
  id: string
  name: string
  avatar: string
  description: string
}

// Sample personas (in a real app, this would come from the personas API)
const samplePersonas: Persona[] = [
  {
    id: '1',
    name: 'Anna Andersson',
    avatar: 'A',
    description: 'Produktchef, 32 år, Stockholm'
  },
  {
    id: '2',
    name: 'Erik Nilsson',
    avatar: 'E',
    description: 'Freelance Designer, 28 år, Göteborg'
  },
  {
    id: '3',
    name: 'Maria Johansson',
    avatar: 'M',
    description: 'Verksamhetschef, 45 år, Malmö'
  }
]

// Function to create journey map from template
const createJourneyMapFromTemplate = (templateId: string, templateName: string): JourneyMapData => {
  const baseJourneyMap: JourneyMapData = {
    id: Date.now().toString(),
    name: templateName || 'Ny Journey Map från mall',
    description: 'Skapad från mall',
    persona: null,
    phases: DEFAULT_JOURNEY_PHASES,
    stages: DEFAULT_JOURNEY_STAGES,
    rows: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'Nuvarande användare',
    status: 'draft'
  }

  // Add template-specific data based on template ID
  switch (templateId) {
    case '1': // E-commerce
      baseJourneyMap.stages = [
        { id: 'awareness', name: 'Medvetenhet', description: 'Kunden upptäcker behov' },
        { id: 'purchase', name: 'Köp/Beslut', description: 'Kunden jämför och beslutar' },
        { id: 'usage', name: 'Användning', description: 'Kunden använder produkten' },
        { id: 'advocacy', name: 'Lojalitet', description: 'Kunden blir återkommande' }
      ]
      baseJourneyMap.rows = [
        DEFAULT_JOURNEY_CATEGORIES[0], // Actions
        DEFAULT_JOURNEY_CATEGORIES[2], // Emotions
        DEFAULT_JOURNEY_CATEGORIES[3], // Pain Points
        DEFAULT_JOURNEY_CATEGORIES[4], // Opportunities
      ].map(category => ({
        id: category.id,
        category: category.name,
        description: category.description,
        type: category.type,
        color: category.color,
        cells: baseJourneyMap.stages.map(stage => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id)
        }))
      }))
      break
    case '2': // SaaS
      baseJourneyMap.stages = [
        { id: 'awareness', name: 'Medvetenhet', description: 'Upptäcker lösningen' },
        { id: 'evaluation', name: 'Utvärdering', description: 'Testar och utvärderar' },
        { id: 'onboarding', name: 'Onboarding', description: 'Kommer igång' },
        { id: 'usage', name: 'Användning', description: 'Daglig användning' }
      ]
      baseJourneyMap.rows = [
        DEFAULT_JOURNEY_CATEGORIES[0], // Actions
        DEFAULT_JOURNEY_CATEGORIES[1], // Touchpoints
        DEFAULT_JOURNEY_CATEGORIES[2], // Emotions
        DEFAULT_JOURNEY_CATEGORIES[3], // Pain Points
      ].map(category => ({
        id: category.id,
        category: category.name,
        description: category.description,
        type: category.type,
        color: category.color,
        cells: baseJourneyMap.stages.map(stage => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id)
        }))
      }))
      break
    case '3': // Customer Service
      baseJourneyMap.stages = [
        { id: 'contact', name: 'Kontakt', description: 'Kunden söker hjälp' },
        { id: 'identification', name: 'Identifiering', description: 'Problem identifieras' },
        { id: 'solution', name: 'Lösning', description: 'Problem löses' },
        { id: 'followup', name: 'Uppföljning', description: 'Kvalitetssäkring' },
        { id: 'reflection', name: 'Reflektion', description: 'Utvärdering av upplevelse' }
      ]
      baseJourneyMap.rows = [
        DEFAULT_JOURNEY_CATEGORIES[0], // Actions
        DEFAULT_JOURNEY_CATEGORIES[2], // Emotions
        DEFAULT_JOURNEY_CATEGORIES[3], // Pain Points
        DEFAULT_JOURNEY_CATEGORIES[4], // Opportunities
      ].map(category => ({
        id: category.id,
        category: category.name,
        description: category.description,
        type: category.type,
        color: category.color,
        cells: baseJourneyMap.stages.map(stage => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id)
        }))
      }))
      break
    case '4': // Restaurant
      baseJourneyMap.stages = [
        { id: 'inspiration', name: 'Inspiration', description: 'Får lust att äta ute' },
        { id: 'search', name: 'Sökning', description: 'Letar efter restaurang' },
        { id: 'booking', name: 'Bokning', description: 'Reserverar bord' },
        { id: 'arrival', name: 'Ankomst', description: 'Kommer till restaurangen' },
        { id: 'meal', name: 'Måltid', description: 'Äter och upplever' },
        { id: 'departure', name: 'Avslut', description: 'Betalar och lämnar' }
      ]
      baseJourneyMap.rows = [
        DEFAULT_JOURNEY_CATEGORIES[0], // Actions
        DEFAULT_JOURNEY_CATEGORIES[2], // Emotions
        DEFAULT_JOURNEY_CATEGORIES[1], // Touchpoints
        DEFAULT_JOURNEY_CATEGORIES[3], // Pain Points
        DEFAULT_JOURNEY_CATEGORIES[4], // Opportunities
      ].map(category => ({
        id: category.id,
        category: category.name,
        description: category.description,
        type: category.type,
        color: category.color,
        cells: baseJourneyMap.stages.map(stage => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id)
        }))
      }))
      break
    case '5': // Banking
      baseJourneyMap.stages = [
        { id: 'need', name: 'Behov', description: 'Identifierar finansiellt behov' },
        { id: 'exploration', name: 'Utforskning', description: 'Undersöker alternativ' },
        { id: 'application', name: 'Ansökan', description: 'Ansöker om tjänst' },
        { id: 'approval', name: 'Godkännande', description: 'Väntar på beslut' },
        { id: 'usage', name: 'Användning', description: 'Använder tjänsten' }
      ]
      baseJourneyMap.rows = [
        DEFAULT_JOURNEY_CATEGORIES[0], // Actions
        DEFAULT_JOURNEY_CATEGORIES[2], // Emotions
        DEFAULT_JOURNEY_CATEGORIES[1], // Touchpoints
        DEFAULT_JOURNEY_CATEGORIES[3], // Pain Points
        DEFAULT_JOURNEY_CATEGORIES[4], // Opportunities
      ].map(category => ({
        id: category.id,
        category: category.name,
        description: category.description,
        type: category.type,
        color: category.color,
        cells: baseJourneyMap.stages.map(stage => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id)
        }))
      }))
      break
    case '6': // Healthcare
      baseJourneyMap.stages = [
        { id: 'symptoms', name: 'Symptom', description: 'Märker hälsoproblem' },
        { id: 'assessment', name: 'Bedömning', description: 'Bedömer allvarlighetsgrad' },
        { id: 'booking', name: 'Bokning', description: 'Bokar tid' },
        { id: 'visit', name: 'Besök', description: 'Träffar vårdpersonal' },
        { id: 'treatment', name: 'Behandling', description: 'Får behandling' },
        { id: 'followup', name: 'Uppföljning', description: 'Följer upp resultat' }
      ]
      baseJourneyMap.rows = [
        DEFAULT_JOURNEY_CATEGORIES[0], // Actions
        DEFAULT_JOURNEY_CATEGORIES[2], // Emotions
        DEFAULT_JOURNEY_CATEGORIES[1], // Touchpoints
        DEFAULT_JOURNEY_CATEGORIES[3], // Pain Points
        DEFAULT_JOURNEY_CATEGORIES[4], // Opportunities
      ].map(category => ({
        id: category.id,
        category: category.name,
        description: category.description,
        type: category.type,
        color: category.color,
        cells: baseJourneyMap.stages.map(stage => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id)
        }))
      }))
      break
    default:
      // Default template with basic categories
      baseJourneyMap.rows = [DEFAULT_JOURNEY_CATEGORIES[0]].map(category => ({
        id: category.id,
        category: category.name,
        description: category.description,
        type: category.type,
        color: category.color,
        cells: DEFAULT_JOURNEY_STAGES.map(stage => ({
          id: `${category.id}-${stage.id}`,
          content: ''
        }))
      }))
  }

  return baseJourneyMap
}

// Function to get template-specific content for cells
const getTemplateContent = (templateId: string, categoryId: string, stageId: string): string => {
  // Template 1: E-commerce
  if (templateId === '1') {
    if (categoryId === 'actions') {
      switch (stageId) {
        case 'awareness': return 'Söker online'
        case 'purchase': return 'Jämför priser'
        case 'usage': return 'Genomför köp'
        case 'advocacy': return 'Delar upplevelse'
        default: return ''
      }
    }
    if (categoryId === 'emotions') {
      switch (stageId) {
        case 'awareness': return '😊:75'    // Happy, positioned at 75% (positive)
        case 'purchase': return '🤔:45'     // Thinking, positioned at 45% (below neutral)
        case 'usage': return '😍:90'       // Heart eyes, positioned at 90% (very positive)
        case 'advocacy': return '😊:80'    // Happy, positioned at 80% (very positive)
        default: return ''
      }
    }
    if (categoryId === 'pain-points') {
      switch (stageId) {
        case 'awareness': return 'Svårt att hitta info'
        case 'purchase': return 'Komplicerad checkout'
        case 'usage': return 'Långsam leverans'
        case 'advocacy': return 'Oklara returer'
        default: return ''
      }
    }
    if (categoryId === 'opportunities') {
      switch (stageId) {
        case 'awareness': return 'Personaliserade rekommendationer'
        case 'purchase': return 'Smidigare betalning'
        case 'usage': return 'Snabbare leverans'
        case 'advocacy': return 'Lojalitetsprogram'
        default: return ''
      }
    }
  }

  // Template 2: SaaS
  if (templateId === '2') {
    if (categoryId === 'actions') {
      switch (stageId) {
        case 'awareness': return 'Läser om lösningar'
        case 'evaluation': return 'Startar trial'
        case 'onboarding': return 'Skapar konto'
        case 'usage': return 'Använder dagligen'
        default: return ''
      }
    }
    if (categoryId === 'touchpoints') {
      switch (stageId) {
        case 'awareness': return 'Webbsida'
        case 'evaluation': return 'Demo'
        case 'onboarding': return 'Onboarding emails'
        case 'usage': return 'Support chat'
        default: return ''
      }
    }
    if (categoryId === 'emotions') {
      switch (stageId) {
        case 'awareness': return '😊:70'    // Curious, positioned at 70% (positive)
        case 'evaluation': return '😐:50'   // Neutral, positioned at 50% (neutral)
        case 'onboarding': return '😅:40'   // Overwhelmed, positioned at 40% (below neutral)
        case 'usage': return '😊:80'       // Competent, positioned at 80% (very positive)
        default: return ''
      }
    }
    if (categoryId === 'pain-points') {
      switch (stageId) {
        case 'awareness': return 'Komplex registrering'
        case 'evaluation': return 'Svår att förstå värde'
        case 'onboarding': return 'För många funktioner'
        case 'usage': return 'Bristande support'
        default: return ''
      }
    }
  }

  // Template 3: Customer Service
  if (templateId === '3') {
    if (categoryId === 'actions') {
      switch (stageId) {
        case 'contact': return 'Kontaktar support'
        case 'identification': return 'Förklarar problem'
        case 'solution': return 'Följer instruktioner'
        case 'followup': return 'Bekräftar lösning'
        case 'reflection': return 'Ger feedback'
        default: return ''
      }
    }
    if (categoryId === 'emotions') {
      switch (stageId) {
        case 'contact': return '😰:20'        // Frustrated, positioned at 20% (very negative)
        case 'identification': return '😔:25' // Worried, positioned at 25% (negative)
        case 'solution': return '🤔:55'       // Hopeful, positioned at 55% (slightly positive)
        case 'followup': return '😊:80'       // Relieved, positioned at 80% (very positive)
        case 'reflection': return '😄:90'     // Satisfied, positioned at 90% (extremely positive)
        default: return ''
      }
    }
    if (categoryId === 'pain-points') {
      switch (stageId) {
        case 'contact': return 'Långa väntetider'
        case 'identification': return 'Komplicerade menyer'
        case 'solution': return 'Behöver upprepa info'
        case 'followup': return 'Otydliga instruktioner'
        case 'reflection': return 'Ingen uppföljning'
        default: return ''
      }
    }
    if (categoryId === 'opportunities') {
      switch (stageId) {
        case 'contact': return 'Snabb svarstid'
        case 'identification': return 'Proaktiv kommunikation'
        case 'solution': return 'Personlig service'
        case 'followup': return 'Tydliga lösningar'
        case 'reflection': return 'Automatisk uppföljning'
        default: return ''
      }
    }
  }

  // Template 4: Restaurant
  if (templateId === '4') {
    if (categoryId === 'actions') {
      switch (stageId) {
        case 'inspiration': return 'Söker inspiration'
        case 'search': return 'Läser recensioner'
        case 'booking': return 'Bokar online'
        case 'arrival': return 'Kommer i tid'
        case 'meal': return 'Beställer mat'
        case 'departure': return 'Betalar notan'
        default: return ''
      }
    }
    if (categoryId === 'emotions') {
      switch (stageId) {
        case 'inspiration': return '😋:75'     // Hungry/excited, positioned at 75% (positive)
        case 'search': return '🤔:50'         // Thoughtful, positioned at 50% (neutral)
        case 'booking': return '😊:70'        // Expectant, positioned at 70% (positive)
        case 'arrival': return '😍:85'        // Impressed, positioned at 85% (very positive)
        case 'meal': return '😄:90'          // Satisfied, positioned at 90% (extremely positive)
        case 'departure': return '😊:75'      // Content, positioned at 75% (positive)
        default: return ''
      }
    }
    if (categoryId === 'touchpoints') {
      switch (stageId) {
        case 'inspiration': return 'Sociala medier'
        case 'search': return 'Google/TripAdvisor'
        case 'booking': return 'Bokningssystem'
        case 'arrival': return 'Värd/Personal'
        case 'meal': return 'Mat & miljö'
        case 'departure': return 'Betalningssystem'
        default: return ''
      }
    }
    if (categoryId === 'pain-points') {
      switch (stageId) {
        case 'inspiration': return 'Svårt hitta info'
        case 'search': return 'Komplicerad bokning'
        case 'booking': return 'Långa väntetider'
        case 'arrival': return 'Fel beställning'
        case 'meal': return 'Hög ljudnivå'
        case 'departure': return 'Långsam service'
        default: return ''
      }
    }
    if (categoryId === 'opportunities') {
      switch (stageId) {
        case 'inspiration': return 'Inspirerande innehåll'
        case 'search': return 'Smidig bokning'
        case 'booking': return 'Personlig välkomst'
        case 'arrival': return 'Överraska positivt'
        case 'meal': return 'Minnesvärda detaljer'
        case 'departure': return 'Enkla betalningar'
        default: return ''
      }
    }
  }

  // Template 5: Banking
  if (templateId === '5') {
    if (categoryId === 'actions') {
      switch (stageId) {
        case 'need': return 'Identifierar behov'
        case 'exploration': return 'Jämför banker'
        case 'application': return 'Skickar ansökan'
        case 'approval': return 'Väntar på svar'
        case 'usage': return 'Aktiverar tjänst'
        default: return ''
      }
    }
    if (categoryId === 'emotions') {
      switch (stageId) {
        case 'need': return '🤔:45'           // Uncertain, positioned at 45% (below neutral)
        case 'exploration': return '😰:25'    // Stressed, positioned at 25% (negative)
        case 'application': return '🤞:60'    // Hopeful, positioned at 60% (positive)
        case 'approval': return '😰:30'       // Nervous, positioned at 30% (negative)
        case 'usage': return '😊:80'         // Secure, positioned at 80% (very positive)
        default: return ''
      }
    }
    if (categoryId === 'touchpoints') {
      switch (stageId) {
        case 'need': return 'Webbsida'
        case 'exploration': return 'Bankkontor'
        case 'application': return 'App/Digital tjänst'
        case 'approval': return 'Telefonsupport'
        case 'usage': return 'Email/Brev'
        default: return ''
      }
    }
    if (categoryId === 'pain-points') {
      switch (stageId) {
        case 'need': return 'Komplexa villkor'
        case 'exploration': return 'Lång handläggningstid'
        case 'application': return 'Många dokument'
        case 'approval': return 'Otydlig kommunikation'
        case 'usage': return 'Tekniska problem'
        default: return ''
      }
    }
    if (categoryId === 'opportunities') {
      switch (stageId) {
        case 'need': return 'Tydlig information'
        case 'exploration': return 'Snabb handläggning'
        case 'application': return 'Digital signering'
        case 'approval': return 'Proaktiv uppdatering'
        case 'usage': return 'Personlig rådgivning'
        default: return ''
      }
    }
  }

  // Template 6: Healthcare
  if (templateId === '6') {
    if (categoryId === 'actions') {
      switch (stageId) {
        case 'symptoms': return 'Märker symptom'
        case 'assessment': return 'Söker information'
        case 'booking': return 'Kontaktar vård'
        case 'visit': return 'Kommer till besök'
        case 'treatment': return 'Följer behandling'
        case 'followup': return 'Bokar uppföljning'
        default: return ''
      }
    }
    if (categoryId === 'emotions') {
      switch (stageId) {
        case 'symptoms': return '😟:30'       // Worried, positioned at 30% (negative)
        case 'assessment': return '😰:20'     // Anxious, positioned at 20% (very negative)
        case 'booking': return '🤞:60'        // Hopeful, positioned at 60% (positive)
        case 'visit': return '😌:70'         // Secure, positioned at 70% (positive)
        case 'treatment': return '😊:80'      // Relieved, positioned at 80% (very positive)
        case 'followup': return '😊:85'       // Strengthened, positioned at 85% (very positive)
        default: return ''
      }
    }
    if (categoryId === 'touchpoints') {
      switch (stageId) {
        case 'symptoms': return '1177.se'
        case 'assessment': return 'Telefon/App'
        case 'booking': return 'Vårdcentral'
        case 'visit': return 'Läkare/Sköterska'
        case 'treatment': return 'Behandlingsrum'
        case 'followup': return 'Uppföljningssystem'
        default: return ''
      }
    }
    if (categoryId === 'pain-points') {
      switch (stageId) {
        case 'symptoms': return 'Svårt bedöma allvar'
        case 'assessment': return 'Långa väntetider'
        case 'booking': return 'Komplicerad bokning'
        case 'visit': return 'Otydlig information'
        case 'treatment': return 'Brist på uppföljning'
        case 'followup': return 'Tekniska hinder'
        default: return ''
      }
    }
    if (categoryId === 'opportunities') {
      switch (stageId) {
        case 'symptoms': return 'Tydlig självriskbedömning'
        case 'assessment': return 'Snabb tillgänglighet'
        case 'booking': return 'Digital support'
        case 'visit': return 'Empatisk kommunikation'
        case 'treatment': return 'Integrerad uppföljning'
        case 'followup': return 'Proaktiv hälsovård'
        default: return ''
      }
    }
  }

  return ''
}

export default function JourneyMapBuilderPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const journeyMapId = params.id as string

  const [journeyMap, setJourneyMap] = useState<JourneyMapData | null>(null)
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isRowEditorOpen, setIsRowEditorOpen] = useState(false)
  const [editingRow, setEditingRow] = useState<JourneyMapRow | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isDraggingPhase, setIsDraggingPhase] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragBoundaryIndex, setDragBoundaryIndex] = useState<number | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isOnboardingActive, setIsOnboardingActive] = useState(false)
  const [isPaletteCollapsed, setIsPaletteCollapsed] = useState(false)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('[data-dropdown]')) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeDropdown])

  // Initialize journey map data
  useEffect(() => {
    if (journeyMapId === 'new') {
      // Check if creating from template or custom template
      const templateId = searchParams.get('template')
      const templateName = searchParams.get('name')
      const isCustom = searchParams.get('custom')

      let newJourneyMap: JourneyMapData

      if (templateId && templateName) {
        // Create journey map from template
        newJourneyMap = createJourneyMapFromTemplate(templateId, decodeURIComponent(templateName))
      } else if (isCustom && templateName) {
        // Create custom template with more rows for user to customize
        newJourneyMap = {
          id: Date.now().toString(),
          name: decodeURIComponent(templateName),
          description: 'Skapa din egen anpassade mall',
          persona: null,
          phases: DEFAULT_JOURNEY_PHASES,
          stages: DEFAULT_JOURNEY_STAGES,
          rows: DEFAULT_JOURNEY_CATEGORIES.slice(0, 3).map(category => ({
            id: category.id,
            category: category.name,
            description: category.description,
            type: category.type,
            color: category.color,
            cells: DEFAULT_JOURNEY_STAGES.map(stage => ({
              id: `${category.id}-${stage.id}`,
              content: ''
            }))
          })),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'Nuvarande användare',
          status: 'draft'
        }
      } else {
        // Create blank journey map
        newJourneyMap = {
          id: Date.now().toString(),
          name: 'Ny Journey Map',
          description: '',
          persona: null,
          phases: DEFAULT_JOURNEY_PHASES,
          stages: DEFAULT_JOURNEY_STAGES,
          rows: [DEFAULT_JOURNEY_CATEGORIES[0]].map(category => ({
            id: category.id,
            category: category.name,
            description: category.description,
            type: category.type,
            color: category.color,
            cells: DEFAULT_JOURNEY_STAGES.map(stage => ({
              id: `${category.id}-${stage.id}`,
              content: ''
            }))
          })),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'Nuvarande användare',
          status: 'draft'
        }
      }

      setJourneyMap(newJourneyMap)
      // Start onboarding for new journey maps (skip for templates and custom templates)
      if (!templateId && !isCustom) {
        setIsOnboardingActive(true)
      }
    } else {
      // Load existing journey map (mock data for now)
      const mockJourneyMap: JourneyMapData = {
        id: journeyMapId,
        name: 'E-handelskund Journey',
        description: 'Kundresan för online-shopping från upptäckt till återköp',
        persona: {
          id: '1',
          name: 'Anna Andersson',
          avatar: 'A',
          description: 'Produktchef, 32 år, Stockholm'
        },
        phases: DEFAULT_JOURNEY_PHASES,
        stages: DEFAULT_JOURNEY_STAGES,
        rows: DEFAULT_JOURNEY_CATEGORIES.map(category => ({
          id: category.id,
          category: category.name,
          description: category.description,
          type: category.type,
          color: category.color,
          cells: DEFAULT_JOURNEY_STAGES.map(stage => ({
            id: `${category.id}-${stage.id}`,
            content: category.id === 'actions' ? 'Example content...' :
                    category.id === 'emotions' ? '' : ''
          }))
        })),
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T15:30:00Z',
        createdBy: 'John Doe',
        status: 'draft'
      }
      setJourneyMap(mockJourneyMap)
    }
  }, [journeyMapId, searchParams])

  const handleCellChange = (rowId: string, cellId: string, content: string) => {
    if (!journeyMap) return
    
    setJourneyMap({
      ...journeyMap,
      rows: journeyMap.rows.map(row => 
        row.id === rowId 
          ? {
              ...row,
              cells: row.cells.map(cell => 
                cell.id === cellId ? { ...cell, content } : cell
              )
            }
          : row
      ),
      updatedAt: new Date().toISOString()
    })
  }

  const handlePhaseNameChange = (phaseId: string, newName: string) => {
    if (!journeyMap) return

    setJourneyMap({
      ...journeyMap,
      phases: journeyMap.phases.map(phase =>
        phase.id === phaseId ? { ...phase, name: newName } : phase
      ),
      updatedAt: new Date().toISOString()
    })
  }

  const handlePhaseDescriptionChange = (phaseId: string, newDescription: string) => {
    if (!journeyMap) return

    setJourneyMap({
      ...journeyMap,
      phases: journeyMap.phases.map(phase =>
        phase.id === phaseId ? { ...phase, description: newDescription } : phase
      ),
      updatedAt: new Date().toISOString()
    })
  }

  const handleStageDescriptionChange = (stageId: string, newDescription: string) => {
    if (!journeyMap) return

    setJourneyMap({
      ...journeyMap,
      stages: journeyMap.stages.map(stage =>
        stage.id === stageId ? { ...stage, description: newDescription } : stage
      ),
      updatedAt: new Date().toISOString()
    })
  }

  const handleRowCategoryChange = (rowId: string, newCategory: string) => {
    if (!journeyMap) return

    setJourneyMap({
      ...journeyMap,
      rows: journeyMap.rows.map(row =>
        row.id === rowId ? { ...row, category: newCategory } : row
      ),
      updatedAt: new Date().toISOString()
    })
  }

  const handleRowDescriptionChange = (rowId: string, newDescription: string) => {
    if (!journeyMap) return

    setJourneyMap({
      ...journeyMap,
      rows: journeyMap.rows.map(row =>
        row.id === rowId ? { ...row, description: newDescription } : row
      ),
      updatedAt: new Date().toISOString()
    })
  }

  const handleStageNameChange = (stageId: string, newName: string) => {
    if (!journeyMap) return

    setJourneyMap({
      ...journeyMap,
      stages: journeyMap.stages.map(stage =>
        stage.id === stageId ? { ...stage, name: newName } : stage
      ),
      updatedAt: new Date().toISOString()
    })
  }

  const handleAddStage = () => {
    if (!journeyMap) return
    
    const newStageId = `stage-${Date.now()}`
    const newStage: JourneyMapStage = {
      id: newStageId,
      name: `Stage ${journeyMap.stages.length + 1}`,
      description: '',
      phaseId: 'after' // Default to 'after' phase
    }
    
    setJourneyMap({
      ...journeyMap,
      stages: [...journeyMap.stages, newStage],
      rows: journeyMap.rows.map(row => ({
        ...row,
        cells: [...row.cells, {
          id: `${row.id}-${newStageId}`,
          content: ''
        }]
      })),
      updatedAt: new Date().toISOString()
    })
  }

  const handleDuplicateStage = (stageId: string, stageIndex: number) => {
    if (!journeyMap) return

    const stageToDuplicate = journeyMap.stages.find(stage => stage.id === stageId)
    if (!stageToDuplicate) return

    const newStageId = `stage-${Date.now()}`
    const newStage: JourneyMapStage = {
      id: newStageId,
      name: `${stageToDuplicate.name} (Copy)`,
      description: stageToDuplicate.description,
      phaseId: stageToDuplicate.phaseId
    }

    // Insert the new stage right after the original
    const newStages = [...journeyMap.stages]
    newStages.splice(stageIndex + 1, 0, newStage)

    setJourneyMap({
      ...journeyMap,
      stages: newStages,
      rows: journeyMap.rows.map(row => {
        const originalCell = row.cells[stageIndex]
        const newCell = {
          id: `${row.id}-${newStageId}`,
          content: originalCell ? originalCell.content : ''
        }
        const newCells = [...row.cells]
        newCells.splice(stageIndex + 1, 0, newCell)
        return {
          ...row,
          cells: newCells
        }
      }),
      updatedAt: new Date().toISOString()
    })
  }

  const handleMoveStage = (stageId: string, currentIndex: number) => {
    if (!journeyMap) return

    // For simplicity, alternate between moving left and right
    // If it's near the beginning, move right; if near end, move left
    const isNearStart = currentIndex < journeyMap.stages.length / 2
    const newIndex = isNearStart
      ? Math.min(currentIndex + 1, journeyMap.stages.length - 1)
      : Math.max(currentIndex - 1, 0)

    if (newIndex === currentIndex) return // No movement needed

    const newStages = [...journeyMap.stages]
    const stageToMove = newStages[currentIndex]

    // Remove from current position and insert at new position
    newStages.splice(currentIndex, 1)
    newStages.splice(newIndex, 0, stageToMove)

    setJourneyMap({
      ...journeyMap,
      stages: newStages,
      rows: journeyMap.rows.map(row => {
        const newCells = [...row.cells]
        const cellToMove = newCells[currentIndex]

        // Move the cell to match the stage movement
        newCells.splice(currentIndex, 1)
        newCells.splice(newIndex, 0, cellToMove)

        return {
          ...row,
          cells: newCells
        }
      }),
      updatedAt: new Date().toISOString()
    })
  }

  const handleDuplicateRow = (rowId: string, rowIndex: number) => {
    if (!journeyMap) return

    const rowToDuplicate = journeyMap.rows.find(row => row.id === rowId)
    if (!rowToDuplicate) return

    const newRowId = `row-${Date.now()}`
    const newRow: JourneyMapRow = {
      id: newRowId,
      category: `${rowToDuplicate.category} (Copy)`,
      description: rowToDuplicate.description,
      type: rowToDuplicate.type,
      color: rowToDuplicate.color,
      cells: rowToDuplicate.cells.map((cell, index) => ({
        id: `${newRowId}-${journeyMap.stages[index]?.id || index}`,
        content: cell.content
      }))
    }

    const newRows = [...journeyMap.rows]
    newRows.splice(rowIndex + 1, 0, newRow)

    setJourneyMap({
      ...journeyMap,
      rows: newRows,
      updatedAt: new Date().toISOString()
    })
  }

  const handleMoveRow = (rowId: string, currentIndex: number) => {
    if (!journeyMap) return

    // Simple move: alternate between moving up and down
    const isUpperHalf = currentIndex < journeyMap.rows.length / 2
    const newIndex = isUpperHalf
      ? Math.min(currentIndex + 1, journeyMap.rows.length - 1)
      : Math.max(currentIndex - 1, 0)

    if (newIndex === currentIndex) return

    const newRows = [...journeyMap.rows]
    const rowToMove = newRows[currentIndex]

    newRows.splice(currentIndex, 1)
    newRows.splice(newIndex, 0, rowToMove)

    setJourneyMap({
      ...journeyMap,
      rows: newRows,
      updatedAt: new Date().toISOString()
    })
  }

  const handleDuplicatePhase = (phaseId: string, phaseIndex: number) => {
    if (!journeyMap) return

    const phaseToDuplicate = journeyMap.phases.find(phase => phase.id === phaseId)
    if (!phaseToDuplicate) return

    const newPhaseId = `phase-${Date.now()}`
    const newPhase: JourneyMapPhase = {
      id: newPhaseId,
      name: `${phaseToDuplicate.name} (Copy)`,
      description: phaseToDuplicate.description,
      color: phaseToDuplicate.color
    }

    const newPhases = [...journeyMap.phases]
    newPhases.splice(phaseIndex + 1, 0, newPhase)

    // Find stages in the original phase and duplicate them
    const originalPhaseStages = journeyMap.stages.filter(stage => stage.phaseId === phaseId)
    const newStages = [...journeyMap.stages]

    originalPhaseStages.forEach((stage, index) => {
      const newStageId = `stage-${Date.now()}-${index}`
      const newStage: JourneyMapStage = {
        id: newStageId,
        name: `${stage.name} (Copy)`,
        description: stage.description,
        phaseId: newPhaseId
      }
      newStages.push(newStage)
    })

    setJourneyMap({
      ...journeyMap,
      phases: newPhases,
      stages: newStages,
      updatedAt: new Date().toISOString()
    })
  }

  const handleMovePhase = (phaseId: string, currentIndex: number) => {
    if (!journeyMap) return

    const isFirstHalf = currentIndex < journeyMap.phases.length / 2
    const newIndex = isFirstHalf
      ? Math.min(currentIndex + 1, journeyMap.phases.length - 1)
      : Math.max(currentIndex - 1, 0)

    if (newIndex === currentIndex) return

    const newPhases = [...journeyMap.phases]
    const phaseToMove = newPhases[currentIndex]

    newPhases.splice(currentIndex, 1)
    newPhases.splice(newIndex, 0, phaseToMove)

    setJourneyMap({
      ...journeyMap,
      phases: newPhases,
      updatedAt: new Date().toISOString()
    })
  }

  const handleDeletePhase = (phaseId: string) => {
    if (!journeyMap || journeyMap.phases.length <= 2) return

    // Move all stages from deleted phase to the first remaining phase
    const remainingPhases = journeyMap.phases.filter(phase => phase.id !== phaseId)
    const targetPhaseId = remainingPhases[0]?.id

    if (!targetPhaseId) return

    setJourneyMap({
      ...journeyMap,
      phases: remainingPhases,
      stages: journeyMap.stages.map(stage =>
        stage.phaseId === phaseId
          ? { ...stage, phaseId: targetPhaseId }
          : stage
      ),
      updatedAt: new Date().toISOString()
    })
  }

  const handleCopyCell = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      // Could add a toast notification here in the future
    } catch (err) {
      console.error('Failed to copy cell content:', err)
      // Fallback: create a temporary textarea for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = content
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

  const handleExportPDF = async () => {
    if (!journeyMap) {
      alert('Ingen journey map att exportera')
      return
    }

    // Create a simple text-based PDF as a workaround
    try {
      console.log('Creating text-based PDF...')
      const { default: jsPDF } = await import('jspdf')

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      let yPosition = 20

      // Add title
      pdf.setFontSize(16)
      pdf.text(journeyMap.name, pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 15

      // Add phases
      pdf.setFontSize(12)
      pdf.text('Phases:', 20, yPosition)
      yPosition += 10

      journeyMap.phases.forEach((phase, index) => {
        pdf.setFontSize(10)
        pdf.text(`${index + 1}. ${phase.name}`, 25, yPosition)
        yPosition += 7
      })

      yPosition += 10

      // Add stages
      pdf.text('Stages:', 20, yPosition)
      yPosition += 10

      journeyMap.stages.forEach((stage, index) => {
        pdf.setFontSize(10)
        pdf.text(`${index + 1}. ${stage.name}`, 25, yPosition)
        yPosition += 7
      })

      yPosition += 10

      // Add rows
      journeyMap.rows.forEach((row, rowIndex) => {
        if (yPosition > 180) {
          pdf.addPage()
          yPosition = 20
        }

        pdf.setFontSize(12)
        pdf.text(`${row.name}:`, 20, yPosition)
        yPosition += 10

        row.cells.forEach((cell, cellIndex) => {
          if (cell.content.trim()) {
            pdf.setFontSize(9)
            const stageText = journeyMap.stages[cellIndex]?.name || `Stage ${cellIndex + 1}`
            pdf.text(`• ${stageText}: ${cell.content}`, 25, yPosition)
            yPosition += 6
          }
        })

        yPosition += 5
      })

      // Add note about visual export
      pdf.setFontSize(8)
      pdf.setTextColor(128, 128, 128)
      pdf.text('Note: This is a text-based export. Visual export unavailable due to browser limitations.', 20, yPosition + 10)

      const filename = `${journeyMap.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_journey_map_text.pdf`
      pdf.save(filename)

      alert('PDF exporterad som text! (Visuell export ej tillgänglig p.g.a. browser begränsningar)')

    } catch (error) {
      console.error('PDF export failed:', error)
      alert(`Fel vid PDF export: ${error.message}`)
    }
  }

  const handleExportPNG = async () => {
    if (!journeyMap) {
      alert('Ingen journey map att exportera')
      return
    }

    try {
      console.log('Starting PNG export with style cleanup...')

      // Create a copy of the table with cleaned styles
      const originalTable = document.querySelector('[data-export="journey-map"] table') as HTMLElement
      if (!originalTable) {
        throw new Error('Kunde inte hitta journey map tabellen')
      }

      // Clone the table
      const tableClone = originalTable.cloneNode(true) as HTMLElement

      // Clean up all styles to avoid color issues
      const cleanStyles = (element: HTMLElement) => {
        element.style.backgroundColor = element.style.backgroundColor || '#ffffff'
        element.style.color = element.style.color || '#000000'
        element.style.border = element.style.border || '1px solid #cccccc'
        element.style.fontFamily = 'Arial, sans-serif'

        // Remove problematic CSS
        element.style.filter = 'none'
        element.style.backdropFilter = 'none'
        element.style.boxShadow = 'none'

        // Clean children
        Array.from(element.children).forEach(child => {
          if (child instanceof HTMLElement) {
            cleanStyles(child)
          }
        })
      }

      cleanStyles(tableClone)

      // Create a temporary container
      const container = document.createElement('div')
      container.style.position = 'absolute'
      container.style.left = '-9999px'
      container.style.top = '-9999px'
      container.style.backgroundColor = '#ffffff'
      container.appendChild(tableClone)
      document.body.appendChild(container)

      try {
        const { default: html2canvas } = await import('html2canvas')

        const canvas = await html2canvas(tableClone, {
          backgroundColor: '#ffffff',
          scale: 1,
          useCORS: false,
          allowTaint: true,
          logging: false,
        })

        // Remove temporary container
        document.body.removeChild(container)

        if (canvas.width === 0 || canvas.height === 0) {
          throw new Error('Tom canvas skapad')
        }

        // Download the image
        const filename = `${journeyMap.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_journey_map.png`
        const dataURL = canvas.toDataURL('image/png', 0.9)

        const link = document.createElement('a')
        link.download = filename
        link.href = dataURL
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        console.log('PNG download completed:', filename)
        alert('PNG exporterad!')

      } catch (canvasError) {
        // Remove temporary container on error
        if (document.body.contains(container)) {
          document.body.removeChild(container)
        }
        throw canvasError
      }

    } catch (error) {
      console.error('PNG export failed:', error)
      alert(`Fel vid PNG export: ${error.message}`)
    }
  }

  // Handle phase boundary dragging
  const handlePhaseResizeStart = (e: React.MouseEvent, boundaryIndex: number) => {
    e.preventDefault()
    setIsDraggingPhase(true)
    setDragStartX(e.clientX)
    setDragBoundaryIndex(boundaryIndex)
  }

  const handlePhaseResize = (e: React.MouseEvent) => {
    if (!isDraggingPhase || dragBoundaryIndex === null || !journeyMap) return
    
    e.preventDefault()
    const deltaX = e.clientX - dragStartX
    const stageWidth = 256 // min-w-64 = 256px
    const stagesMoved = Math.round(deltaX / stageWidth)
    
    if (stagesMoved === 0) return
    
    // Find the stage to move between phases
    const phases = journeyMap.phases
    let stageToMoveIndex = -1
    
    if (stagesMoved > 0) {
      // Moving boundary right - move stages from next phase to current phase
      const nextPhase = phases[dragBoundaryIndex + 1]
      if (nextPhase) {
        const nextPhaseStages = journeyMap.stages.filter(stage => stage.phaseId === nextPhase.id)
        if (nextPhaseStages.length > 0) {
          stageToMoveIndex = journeyMap.stages.findIndex(stage => stage.id === nextPhaseStages[0].id)
        }
      }
    } else {
      // Moving boundary left - move stages from current phase to next phase  
      const currentPhase = phases[dragBoundaryIndex]
      if (currentPhase) {
        const currentPhaseStages = journeyMap.stages.filter(stage => stage.phaseId === currentPhase.id)
        if (currentPhaseStages.length > 0) {
          stageToMoveIndex = journeyMap.stages.findIndex(stage => stage.id === currentPhaseStages[currentPhaseStages.length - 1].id)
        }
      }
    }
    
    if (stageToMoveIndex >= 0) {
      const targetPhaseId = stagesMoved > 0 
        ? phases[dragBoundaryIndex].id 
        : phases[dragBoundaryIndex + 1].id
        
      const updatedStages = journeyMap.stages.map((stage, index) => 
        index === stageToMoveIndex 
          ? { ...stage, phaseId: targetPhaseId }
          : stage
      )
      
      setJourneyMap({
        ...journeyMap,
        stages: updatedStages,
        updatedAt: new Date().toISOString()
      })
    }
    
    setDragStartX(e.clientX)
  }

  const handlePhaseResizeEnd = () => {
    setIsDraggingPhase(false)
    setDragBoundaryIndex(null)
    setDragStartX(0)
  }

  const handleAddPhase = () => {
    if (!journeyMap) return

    const phaseNumber = journeyMap.phases.length + 1
    const newPhase: JourneyMapPhase = {
      id: `phase-${Date.now()}`,
      name: `Phase ${phaseNumber}`,
      color: `bg-gray-100`, // Default color
      description: `Custom phase ${phaseNumber}`
    }

    setJourneyMap({
      ...journeyMap,
      phases: [...journeyMap.phases, newPhase],
      updatedAt: new Date().toISOString()
    })
  }

  const handleRemoveStage = (stageIndex: number) => {
    if (!journeyMap || journeyMap.stages.length <= 2) return // Keep minimum 2 stages
    
    setJourneyMap({
      ...journeyMap,
      stages: journeyMap.stages.filter((_, index) => index !== stageIndex),
      rows: journeyMap.rows.map(row => ({
        ...row,
        cells: row.cells.filter((_, index) => index !== stageIndex)
      })),
      updatedAt: new Date().toISOString()
    })
  }

  const handleSelectPersona = (persona: Persona) => {
    if (!journeyMap) return
    
    setJourneyMap({
      ...journeyMap,
      persona: {
        id: persona.id,
        name: persona.name,
        avatar: persona.avatar,
        description: persona.description
      },
      updatedAt: new Date().toISOString()
    })
    setIsPersonaModalOpen(false)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleAddRow = () => {
    setEditingRow(null)
    setIsRowEditorOpen(true)
  }

  const handleDropBlock = (item: { rowType: string; name: string; description: string; color: string }) => {
    if (!journeyMap) return

    const newRowId = `row-${Date.now()}`
    const newRow: JourneyMapRow = {
      id: newRowId,
      category: item.name,
      description: item.description,
      type: item.rowType as any,
      color: item.color,
      cells: journeyMap.stages.map(stage => ({
        id: `${newRowId}-${stage.id}`,
        content: ''
      }))
    }

    setJourneyMap({
      ...journeyMap,
      rows: [...journeyMap.rows, newRow],
      updatedAt: new Date().toISOString()
    })
  }

  const handleDropBlockAtIndex = (item: { rowType: string; name: string; description: string; color: string }, insertIndex: number) => {
    if (!journeyMap) return

    console.log('Dropping block:', item, 'at index:', insertIndex)

    const newRowId = `row-${Date.now()}`
    const newRow: JourneyMapRow = {
      id: newRowId,
      category: item.name,
      description: item.description,
      type: item.rowType as any,
      color: item.color,
      cells: journeyMap.stages.map(stage => ({
        id: `${newRowId}-${stage.id}`,
        content: ''
      }))
    }

    // Insert at specific index
    const newRows = [...journeyMap.rows]
    newRows.splice(insertIndex, 0, newRow)

    setJourneyMap({
      ...journeyMap,
      rows: newRows,
      updatedAt: new Date().toISOString()
    })
  }


  const handleEditRow = (row: JourneyMapRow) => {
    setEditingRow(row)
    setIsRowEditorOpen(true)
  }

  const handleRemoveRow = (rowId: string) => {
    if (!journeyMap) return

    if (confirm('Är du säker på att du vill ta bort denna rad?')) {
      setJourneyMap({
        ...journeyMap,
        rows: journeyMap.rows.filter(row => row.id !== rowId),
        updatedAt: new Date().toISOString()
      })
    }
  }

  const handleSaveRow = (rowData: Partial<JourneyMapRow>) => {
    if (!journeyMap) return

    if (editingRow) {
      // Edit existing row
      setJourneyMap({
        ...journeyMap,
        rows: journeyMap.rows.map(row => 
          row.id === editingRow.id 
            ? { ...row, ...rowData }
            : row
        ),
        updatedAt: new Date().toISOString()
      })
    } else {
      // Add new row
      const newRowId = `row-${Date.now()}`
      const newRow: JourneyMapRow = {
        id: newRowId,
        category: rowData.category || '',
        description: rowData.description || '',
        type: rowData.type || 'text',
        color: rowData.color || 'bg-slate-50',
        cells: journeyMap.stages.map(stage => ({
          id: `${newRowId}-${stage.id}`,
          content: ''
        }))
      }
      
      setJourneyMap({
        ...journeyMap,
        rows: [...journeyMap.rows, newRow],
        updatedAt: new Date().toISOString()
      })
    }
  }

  const handleDeleteRow = () => {
    if (!journeyMap || !editingRow) return

    setJourneyMap({
      ...journeyMap,
      rows: journeyMap.rows.filter(row => row.id !== editingRow.id),
      updatedAt: new Date().toISOString()
    })
  }


  if (!journeyMap) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Laddar journey map...</p>
        </div>
      </div>
    )
  }

  return (
    <DragDropProvider>
      <div className="h-full flex flex-col overflow-hidden">
          <Header
        title={journeyMap.name}
        description={journeyMap.description || 'Redigera din customer journey map'}
        actions={
          <div className="flex space-x-2">
            <div className="relative" data-dropdown>
              <Button
                variant="outline"
                onClick={() => setActiveDropdown(activeDropdown === 'export' ? null : 'export')}
              >
                <FileDownIcon className="mr-2 h-4 w-4" />
                Export
              </Button>

              {activeDropdown === 'export' && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-32 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleExportPDF()
                      setActiveDropdown(null)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-gray-900 hover:text-gray-900"
                  >
                    <FileDownIcon className="w-3 h-3 text-gray-700" />
                    Export PDF
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleExportPNG()
                      setActiveDropdown(null)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-gray-900 hover:text-gray-900"
                  >
                    <ImageIcon className="w-3 h-3 text-gray-700" />
                    Export PNG
                  </button>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setIsSettingsModalOpen(true)}
            >
              <SettingsIcon className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={isSaving}
            >
              <SaveIcon className="mr-2 h-4 w-4" />
              {isSaving ? 'Sparar...' : 'Spara'}
            </Button>
          </div>
        }
      />

          <div className="flex-1 flex overflow-hidden">
            {/* Row Types Palette */}
            <RowTypePalette
              isCollapsed={isPaletteCollapsed}
              onToggleCollapse={() => setIsPaletteCollapsed(!isPaletteCollapsed)}
              data-onboarding="palette"
            />

            <div className="flex-1 overflow-auto bg-gray-50">
            <div className="p-6">
            {/* Persona Section */}
            <div className="mb-6" data-onboarding="persona">
              <Card className="border-l-4 border-l-slate-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {journeyMap.persona ? (
                        <>
                          <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-medium">
                            {journeyMap.persona.avatar}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{journeyMap.persona.name}</h3>
                            <p className="text-sm text-gray-600">{journeyMap.persona.description}</p>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <UserIcon className="h-8 w-8 text-gray-400" />
                          <div>
                            <h3 className="font-medium text-gray-900">Ingen persona vald</h3>
                            <p className="text-sm text-gray-500">Välj en persona för att personalisera journey map</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPersonaModalOpen(true)}
                    >
                      <EditIcon className="h-4 w-4 mr-1" />
                      {journeyMap.persona ? 'Byt persona' : 'Välj persona'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Journey Map Grid */}
            <Card className="overflow-hidden journey-map-content" data-export="journey-map">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                {/* Phase Header Row */}
                <thead>
                  {/* Phases Row */}
                  <tr
                    className="bg-gray-100 border-b border-gray-300"
                    data-onboarding="phases"
                    onMouseMove={handlePhaseResize}
                    onMouseUp={handlePhaseResizeEnd}
                    onMouseLeave={handlePhaseResizeEnd}
                  >
                    <th className="w-48 p-2 text-left text-xs font-semibold text-gray-600 border-r border-gray-200">
                      Phases
                    </th>
                    {journeyMap.phases.map((phase, phaseIndex) => {
                      // Count stages in this phase
                      const stagesInPhase = journeyMap.stages.filter(stage => stage.phaseId === phase.id).length
                      
                      // Show empty phases with a minimum width
                      const colSpan = stagesInPhase === 0 ? 1 : stagesInPhase
                      
                      return (
                        <th
                          key={phase.id}
                          className={`relative p-2 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 ${phase.color} ${stagesInPhase === 0 ? 'min-w-32' : ''} group`}
                          colSpan={colSpan}
                        >
                          <InlineEdit
                            value={phase.name}
                            onChange={(newName) => handlePhaseNameChange(phase.id, newName)}
                            className="text-center"
                            inputClassName="text-center w-full"
                            placeholder="Phase name"
                            variant="phase-title"
                          />
                          <InlineEdit
                            value={stagesInPhase === 0 ? 'Drag stages here' : (phase.description || '')}
                            onChange={(newDescription) => handlePhaseDescriptionChange(phase.id, newDescription)}
                            className="mt-1 text-center"
                            inputClassName="w-full text-center"
                            placeholder="Phase description"
                            variant="description"
                          />

                          {/* Phase actions dropdown */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200" data-dropdown>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveDropdown(activeDropdown === `phase-${phase.id}` ? null : `phase-${phase.id}`)
                              }}
                              className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded flex items-center justify-center"
                            >
                              <MoreVertical className="w-3 h-3" />
                            </button>

                            {activeDropdown === `phase-${phase.id}` && (
                              <div className="absolute right-0 mt-1 min-w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDuplicatePhase(phase.id, phaseIndex)
                                    setActiveDropdown(null)
                                  }}
                                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                >
                                  <Copy className="w-3 h-3 mr-2" />
                                  Duplicate
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleMovePhase(phase.id, phaseIndex)
                                    setActiveDropdown(null)
                                  }}
                                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                >
                                  <Move className="w-3 h-3 mr-2" />
                                  Move
                                </button>
                                {journeyMap.phases.length > 2 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDeletePhase(phase.id)
                                      setActiveDropdown(null)
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                                  >
                                    <Trash2 className="w-3 h-3 mr-2" />
                                    Delete
                                  </button>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Drag handle on the right edge (except for last phase) */}
                          {phaseIndex < journeyMap.phases.length - 1 && (
                            <div
                              className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize bg-gray-400 opacity-0 hover:opacity-100 transition-opacity z-10 flex items-center justify-center"
                              onMouseDown={(e) => handlePhaseResizeStart(e, phaseIndex)}
                              title="Drag to resize phase"
                            >
                              <div className="w-0.5 h-8 bg-gray-600 rounded"></div>
                            </div>
                          )}
                        </th>
                      )
                    })}
                    <th className="w-12 p-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddPhase}
                        className="w-8 h-8 p-0"
                        title="Add new phase"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </th>
                  </tr>
                  
                  {/* Stages Header Row */}
                  <tr className="bg-slate-50 border-b border-gray-100" data-onboarding="stages">
                    <th className="w-48 p-4 text-left text-sm font-medium text-gray-900 border-r border-gray-200 hover:bg-white transition-colors">
                      Journey Kategorier
                    </th>
                    {journeyMap.stages.map((stage, index) => (
                      <th key={stage.id} className="min-w-64 p-4 text-left border-r border-gray-200 relative group hover:bg-white transition-colors">
                        <div className="flex items-center justify-between">
                          <InlineEdit
                            value={stage.name}
                            onChange={(newName) => handleStageNameChange(stage.id, newName)}
                            inputClassName="w-full"
                            placeholder="Stage name"
                            variant="stage-title"
                          />
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2" data-dropdown>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveDropdown(activeDropdown === `stage-${stage.id}` ? null : `stage-${stage.id}`)
                              }}
                              className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded flex items-center justify-center"
                              title="Stage actions"
                            >
                              <MoreVertical className="w-3 h-3" />
                            </button>

                            {/* Stage dropdown menu */}
                            {activeDropdown === `stage-${stage.id}` && (
                              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-32 z-20">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDuplicateStage(stage.id, index)
                                    setActiveDropdown(null)
                                  }}
                                  className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-gray-900 hover:text-gray-900"
                                >
                                  <Copy className="w-3 h-3" />
                                  Duplicate
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleMoveStage(stage.id, index)
                                    setActiveDropdown(null)
                                  }}
                                  className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-gray-900 hover:text-gray-900"
                                >
                                  <Move className="w-3 h-3" />
                                  Move
                                </button>
                                {journeyMap.stages.length > 2 && (
                                  <>
                                    <div className="border-t mx-2 my-1"></div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleRemoveStage(index)
                                        setActiveDropdown(null)
                                      }}
                                      className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm text-red-600 flex items-center gap-2"
                                    >
                                      <TrashIcon className="w-3 h-3" />
                                      Delete
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <InlineEdit
                          value={stage.description || ''}
                          onChange={(newDescription) => handleStageDescriptionChange(stage.id, newDescription)}
                          className="mt-1"
                          inputClassName="w-full"
                          placeholder="Stage description"
                          variant="description"
                        />
                      </th>
                    ))}
                    <th className="w-12 p-4 bg-slate-50">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddStage}
                        className="w-8 h-8 p-0"
                        title="Lägg till steg"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </th>
                  </tr>
                </thead>
                
                {/* Content Rows */}
                <tbody>
                  {/* Invisible insertion zone at top */}
                  <RowInsertionZone
                    key={`insertion-0-${journeyMap.rows.length}`}
                    onDropBlock={handleDropBlockAtIndex}
                    insertIndex={0}
                    stageCount={journeyMap.stages.length}
                    showAlways={false}
                  />

                  {journeyMap.rows.map((row, rowIndex) => (
                    <React.Fragment key={`row-section-${row.id}`}>
                      <tr key={row.id} className="border-b border-gray-100">
                      <td
                        className={`p-4 border-r border-gray-200 bg-slate-50 group relative hover:bg-white transition-colors`}
                        data-onboarding={rowIndex === 0 ? "categories" : undefined}
                      >
                        <div className="space-y-1">
                          <InlineEdit
                            value={row.category}
                            onChange={(newCategory) => handleRowCategoryChange(row.id, newCategory)}
                            inputClassName="w-full"
                            placeholder="Row category"
                            variant="row-header"
                          />
                          <InlineEdit
                            value={row.description}
                            onChange={(newDescription) => handleRowDescriptionChange(row.id, newDescription)}
                            inputClassName="w-full"
                            placeholder="Row description"
                            multiline={true}
                            variant="description"
                          />
                        </div>

                        {/* Row actions dropdown - appears on hover */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200" data-dropdown>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdown(activeDropdown === `row-${row.id}` ? null : `row-${row.id}`)
                            }}
                            className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded flex items-center justify-center"
                            title="Row actions"
                          >
                            <MoreVertical className="w-3 h-3" />
                          </button>

                          {/* Dropdown menu */}
                          {activeDropdown === `row-${row.id}` && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-32 z-20">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDuplicateRow(row.id, rowIndex)
                                  setActiveDropdown(null)
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-gray-900 hover:text-gray-900"
                              >
                                <Copy className="w-3 h-3" />
                                Duplicate
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleMoveRow(row.id, rowIndex)
                                  setActiveDropdown(null)
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-gray-900 hover:text-gray-900"
                              >
                                <Move className="w-3 h-3" />
                                Move
                              </button>
                              <div className="border-t mx-2 my-1"></div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRemoveRow(row.id)
                                  setActiveDropdown(null)
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm text-red-600 flex items-center gap-2"
                              >
                                <TrashIcon className="w-3 h-3" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      {(row.type === 'emoji' || row.type === 'pain-points' || row.type === 'opportunities' || row.type === 'metrics' || row.type === 'channels') ? (
                        // For visualization components, create one cell spanning all stages
                        <td 
                          key={`${row.id}-emotion-curve`} 
                          className={`p-2 align-top ${row.color}`}
                          colSpan={journeyMap.stages.length}
                        >
                          <JourneyMapCellComponent
                            content={row.cells.map(c => c.content).join(',')}
                            type={row.type}
                            onChange={(content) => {
                              const emotions = content.split(',').map(e => e.trim())
                              
                              // Update the journey map state correctly
                              setJourneyMap(prevMap => {
                                if (!prevMap) return prevMap
                                
                                return {
                                  ...prevMap,
                                  rows: prevMap.rows.map(r => {
                                    if (r.id === row.id) {
                                      const updatedCells = r.cells.map((cell, index) => ({
                                        ...cell,
                                        content: emotions[index] || ''
                                      }))
                                      return { ...r, cells: updatedCells }
                                    }
                                    return r
                                  }),
                                  updatedAt: new Date().toISOString()
                                }
                              })
                            }}
                            placeholder="Set emotion curve..."
                            stageCount={journeyMap.stages.length}
                            isEmotionCurveCell={row.type === 'emoji'}
                          />
                        </td>
                      ) : (
                        // For other types, show individual cells
                        row.cells.map((cell, cellIndex) => (
                          <td
                            key={cell.id}
                            className={`p-2 border-r border-gray-200 align-middle ${row.color} group relative`}
                            data-onboarding={rowIndex === 0 && cellIndex === 0 ? "cells" : undefined}
                          >
                            <JourneyMapCellComponent
                              content={cell.content}
                              type={row.type}
                              onChange={(content) => handleCellChange(row.id, cell.id, content)}
                              placeholder="Klicka för att redigera..."
                            />

                            {/* Cell actions dropdown - appears on hover */}
                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-200" data-dropdown>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveDropdown(activeDropdown === `cell-${cell.id}` ? null : `cell-${cell.id}`)
                                }}
                                className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded flex items-center justify-center"
                                title="Cell actions"
                              >
                                <MoreVertical className="w-3 h-3" />
                              </button>

                              {/* Dropdown menu */}
                              {activeDropdown === `cell-${cell.id}` && (
                                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-32 z-20">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleCopyCell(cell.content)
                                      setActiveDropdown(null)
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-gray-900 hover:text-gray-900"
                                  >
                                    <Copy className="w-3 h-3" />
                                    Copy
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      // Clear cell content
                                      handleCellChange(row.id, cell.id, '')
                                      setActiveDropdown(null)
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-xs text-red-600 flex items-center gap-2"
                                  >
                                    <TrashIcon className="w-3 h-3" />
                                    Clear
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        ))
                      )}
                        <td className="p-4 bg-slate-50"></td>
                      </tr>

                      {/* Invisible insertion zone after each row */}
                      <RowInsertionZone
                        key={`insertion-${rowIndex + 1}-${journeyMap.rows.length}`}
                        onDropBlock={handleDropBlockAtIndex}
                        insertIndex={rowIndex + 1}
                        stageCount={journeyMap.stages.length}
                      />
                    </React.Fragment>
                  ))}
                  
                </tbody>
              </table>
            </div>
          </CardContent>
          </Card>
        </div>
      </div>
            </div>
        </div>

      {/* Persona Selection Modal */}
      <Modal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
        title="Välj persona"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Välj en persona som representerar huvudanvändaren för denna journey map.
          </p>
          <div className="space-y-2">
            {samplePersonas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => handleSelectPersona(persona)}
                className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-medium">
                    {persona.avatar}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{persona.name}</h4>
                    <p className="text-sm text-gray-600">{persona.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsPersonaModalOpen(false)}>
              Avbryt
            </Button>
            <Link href="/personas">
              <Button variant="primary">
                <PlusIcon className="mr-2 h-4 w-4" />
                Skapa ny persona
              </Button>
            </Link>
          </div>
        </div>
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="Journey Map Settings"
      >
        <div className="space-y-6">
          <div>
            <Input
              value={journeyMap.name}
              onChange={(e) => setJourneyMap({ ...journeyMap, name: e.target.value })}
              placeholder="Namn på journey map"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Beskrivning</label>
            <textarea
              value={journeyMap.description || ''}
              onChange={(e) => setJourneyMap({ ...journeyMap, description: e.target.value })}
              placeholder="Beskriv syftet med denna journey map..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsSettingsModalOpen(false)}>
              Avbryt
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsSettingsModalOpen(false)}
            >
              Spara ändringar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Row Editor Modal */}
      <RowEditor
        isOpen={isRowEditorOpen}
        onClose={() => setIsRowEditorOpen(false)}
        row={editingRow}
        onSave={handleSaveRow}
        onDelete={editingRow ? handleDeleteRow : undefined}
        isNewRow={!editingRow}
      />

      {/* Onboarding Component */}
      <JourneyMapOnboarding
        isActive={isOnboardingActive}
        onComplete={() => setIsOnboardingActive(false)}
        onSkip={() => setIsOnboardingActive(false)}
      />
    </DragDropProvider>
  )
}