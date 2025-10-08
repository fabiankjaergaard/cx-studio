'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
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
  ImageIcon,
  LayersIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw
} from 'lucide-react'
import Link from 'next/link'
import { JourneyMapData, JourneyMapCell, JourneyMapRow, JourneyMapStage, JourneyMapPhase, JourneyMapSublane, DEFAULT_JOURNEY_CATEGORIES, DEFAULT_JOURNEY_STAGES, DEFAULT_JOURNEY_PHASES, ROW_TYPES, Insight } from '@/types/journey-map'
import { saveJourneyMap, getJourneyMapById } from '@/services/journeyMapStorage'
import { JourneyMapCell as JourneyMapCellComponent } from '@/components/journey-map/JourneyMapCell'
import { RowEditor } from '@/components/journey-map/RowEditor'
import { JourneyMapOnboarding } from '@/components/onboarding/JourneyMapOnboarding'
import { DragDropProvider } from '@/components/journey/DragDropProvider'
import { RowTypePalette } from '@/components/journey-map/RowTypePalette'
import { useLanguage } from '@/contexts/LanguageContext'
import { RowInsertionZone } from '@/components/journey-map/RowInsertionZone'
import { InlineEdit } from '@/components/ui/InlineEdit'
import { Toast } from '@/components/ui/Toast'
import { InsightDetailsDrawer } from '@/components/journey-map/InsightDetailsDrawer'
import { createNewSublane, updateSublanesColorFromParent, getSublaneCardColor, getLighterColorVariant } from '@/utils/sublaneHelpers'

interface Persona {
  id: string
  name: string
  avatar: string
  description: string
}

// Personas will be loaded from the personas API/state
const samplePersonas: Persona[] = []

// Function to create journey map from template
const createJourneyMapFromTemplate = (templateId: string, templateName: string, mapId?: string): JourneyMapData => {
  const baseJourneyMap: JourneyMapData = {
    id: mapId || Date.now().toString(),
    name: templateName || 'Ny Journey Map från mall',
    description: 'Skapad från mall',
    persona: null,
    phases: DEFAULT_JOURNEY_PHASES,
    stages: DEFAULT_JOURNEY_STAGES,
    rows: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'fabiankjaergaard',
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
        cells: baseJourneyMap.stages.map((stage, index) => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id),
          colSpan: 1,
          position: index
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
        cells: baseJourneyMap.stages.map((stage, index) => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id),
          colSpan: 1,
          position: index
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
        cells: baseJourneyMap.stages.map((stage, index) => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id),
          colSpan: 1,
          position: index
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
        cells: baseJourneyMap.stages.map((stage, index) => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id),
          colSpan: 1,
          position: index
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
        cells: baseJourneyMap.stages.map((stage, index) => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id),
          colSpan: 1,
          position: index
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
        cells: baseJourneyMap.stages.map((stage, index) => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id),
          colSpan: 1,
          position: index
        }))
      }))
      break
    case '7': // B2B Sales
      baseJourneyMap.stages = [
        { id: 'prospecting', name: 'Prospektering', description: 'Identifiering av potentiella kunder' },
        { id: 'qualification', name: 'Kvalificering', description: 'Bedömning av kundens behov' },
        { id: 'proposal', name: 'Förslag', description: 'Presentation av lösning' },
        { id: 'negotiation', name: 'Förhandling', description: 'Pris och villkorsförhandling' },
        { id: 'decision', name: 'Beslut', description: 'Slutligt köpbeslut' },
        { id: 'implementation', name: 'Implementering', description: 'Uppsättning av lösning' },
        { id: 'relationship', name: 'Relation', description: 'Långsiktig kundrelation' }
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
        cells: baseJourneyMap.stages.map((stage, index) => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id),
          colSpan: 1,
          position: index
        }))
      }))
      break
    case '8': // E-learning
      baseJourneyMap.stages = [
        { id: 'discovery', name: 'Upptäckt', description: 'Hittar utbildningen' },
        { id: 'registration', name: 'Registrering', description: 'Skapar konto och registrerar' },
        { id: 'learning', name: 'Lärande', description: 'Genomför kurser' },
        { id: 'assessment', name: 'Bedömning', description: 'Tar prov och uppgifter' },
        { id: 'completion', name: 'Slutförande', description: 'Får certifikat' }
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
        cells: baseJourneyMap.stages.map((stage, index) => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id),
          colSpan: 1,
          position: index
        }))
      }))
      break
    case '9': // Mobile App Onboarding
      baseJourneyMap.stages = [
        { id: 'download', name: 'Nedladdning', description: 'Laddar ner appen' },
        { id: 'signup', name: 'Registrering', description: 'Skapar konto' },
        { id: 'onboarding', name: 'Introduktion', description: 'Genomgår onboarding' },
        { id: 'firstuse', name: 'Första användning', description: 'Använder appen första gången' }
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
        cells: baseJourneyMap.stages.map((stage, index) => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id),
          colSpan: 1,
          position: index
        }))
      }))
      break
    case '10': // Event Management
      baseJourneyMap.stages = [
        { id: 'planning', name: 'Planering', description: 'Planerar att delta i event' },
        { id: 'registration', name: 'Anmälan', description: 'Anmäler sig till eventet' },
        { id: 'preparation', name: 'Förberedelse', description: 'Förbereder inför eventet' },
        { id: 'arrival', name: 'Ankomst', description: 'Kommer till eventplatsen' },
        { id: 'participation', name: 'Deltagande', description: 'Deltar aktivt i eventet' },
        { id: 'followup', name: 'Efterföljning', description: 'Följer upp efter eventet' }
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
        cells: baseJourneyMap.stages.map((stage, index) => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id),
          colSpan: 1,
          position: index
        }))
      }))
      break
    case '11': // Recruitment Process
      baseJourneyMap.stages = [
        { id: 'discovery', name: 'Upptäckt', description: 'Hittar jobbannonsen' },
        { id: 'application', name: 'Ansökan', description: 'Skickar in ansökan' },
        { id: 'screening', name: 'Gallring', description: 'Första urval och screening' },
        { id: 'interview', name: 'Intervju', description: 'Intervjuprocessen' },
        { id: 'decision', name: 'Beslut', description: 'Väntar på och får besked' }
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
        cells: baseJourneyMap.stages.map((stage, index) => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id),
          colSpan: 1,
          position: index
        }))
      }))
      break
    case '12': // Insurance Claim
      baseJourneyMap.stages = [
        { id: 'incident', name: 'Incident', description: 'Skadan inträffar' },
        { id: 'reporting', name: 'Anmälan', description: 'Anmäler skadan' },
        { id: 'documentation', name: 'Dokumentation', description: 'Samlar in underlag' },
        { id: 'assessment', name: 'Bedömning', description: 'Försäkringsbolaget bedömer' },
        { id: 'resolution', name: 'Avslut', description: 'Ärendet avslutas' }
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
        cells: baseJourneyMap.stages.map((stage, index) => ({
          id: `${category.id}-${stage.id}`,
          content: getTemplateContent(templateId, category.id, stage.id),
          colSpan: 1,
          position: index
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
        case 'awareness': return '😊:25'    // Happy, positioned at 25% (positive)
        case 'purchase': return '🤔:55'     // Thinking, positioned at 55% (slightly below neutral)
        case 'usage': return '😍:10'       // Heart eyes, positioned at 10% (very positive)
        case 'advocacy': return '😊:20'    // Happy, positioned at 20% (very positive)
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
        case 'awareness': return '😊:30'    // Curious, positioned at 30% (positive)
        case 'evaluation': return '😐:50'   // Neutral, positioned at 50% (neutral)
        case 'onboarding': return '😅:60'   // Overwhelmed, positioned at 60% (below neutral)
        case 'usage': return '😊:20'       // Competent, positioned at 20% (very positive)
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
        case 'contact': return '😰:80'        // Frustrated, positioned at 80% (very negative)
        case 'identification': return '😔:75' // Worried, positioned at 75% (negative)
        case 'solution': return '🤔:45'       // Hopeful, positioned at 45% (slightly positive)
        case 'followup': return '😊:20'       // Relieved, positioned at 20% (very positive)
        case 'reflection': return '😄:10'     // Satisfied, positioned at 10% (extremely positive)
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
        case 'inspiration': return '😋:25'     // Hungry/excited, positioned at 25% (positive)
        case 'search': return '🤔:50'         // Thoughtful, positioned at 50% (neutral)
        case 'booking': return '😊:30'        // Expectant, positioned at 30% (positive)
        case 'arrival': return '😍:15'        // Impressed, positioned at 15% (very positive)
        case 'meal': return '😄:10'          // Satisfied, positioned at 10% (extremely positive)
        case 'departure': return '😊:25'      // Content, positioned at 25% (positive)
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
        case 'need': return '🤔:55'           // Uncertain, positioned at 55% (below neutral)
        case 'exploration': return '😰:75'    // Stressed, positioned at 75% (negative)
        case 'application': return '🤞:40'    // Hopeful, positioned at 40% (positive)
        case 'approval': return '😰:70'       // Nervous, positioned at 70% (negative)
        case 'usage': return '😊:20'         // Secure, positioned at 20% (very positive)
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
        case 'symptoms': return '😟:70'       // Worried, positioned at 70% (negative)
        case 'assessment': return '😰:80'     // Anxious, positioned at 80% (very negative)
        case 'booking': return '🤞:40'        // Hopeful, positioned at 40% (positive)
        case 'visit': return '😌:30'         // Secure, positioned at 30% (positive)
        case 'treatment': return '😊:20'      // Relieved, positioned at 20% (very positive)
        case 'followup': return '😊:15'       // Strengthened, positioned at 15% (very positive)
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

  // Template 7: B2B Sales
  if (templateId === '7') {
    if (categoryId === 'actions') {
      switch (stageId) {
        case 'prospecting': return 'Identifierar leads'
        case 'qualification': return 'Bedömer behov'
        case 'proposal': return 'Presenterar lösning'
        case 'negotiation': return 'Förhandlar villkor'
        case 'decision': return 'Fattar köpbeslut'
        case 'implementation': return 'Implementerar lösning'
        case 'relationship': return 'Bygger partnerskap'
        default: return ''
      }
    }
    if (categoryId === 'emotions') {
      switch (stageId) {
        case 'prospecting': return '🤔:55'     // Uncertain, positioned at 55%
        case 'qualification': return '😊:35'   // Interested, positioned at 35%
        case 'proposal': return '😮:30'       // Impressed, positioned at 30%
        case 'negotiation': return '😰:60'    // Stressed, positioned at 60%
        case 'decision': return '🤞:45'       // Hopeful, positioned at 45%
        case 'implementation': return '😌:25' // Confident, positioned at 25%
        case 'relationship': return '😊:15'   // Satisfied, positioned at 15%
        default: return ''
      }
    }
    if (categoryId === 'touchpoints') {
      switch (stageId) {
        case 'prospecting': return 'LinkedIn, Email'
        case 'qualification': return 'Telefonsamtal'
        case 'proposal': return 'Presentation, Demo'
        case 'negotiation': return 'Förhandlingsmöten'
        case 'decision': return 'Kontrakt, Juridik'
        case 'implementation': return 'Projektteam'
        case 'relationship': return 'Account Manager'
        default: return ''
      }
    }
    if (categoryId === 'pain-points') {
      switch (stageId) {
        case 'prospecting': return 'Svårt att komma i kontakt'
        case 'qualification': return 'Oklara krav'
        case 'proposal': return 'Komplex lösning'
        case 'negotiation': return 'Prispress'
        case 'decision': return 'Lång beslutsprocess'
        case 'implementation': return 'Tekniska utmaningar'
        case 'relationship': return 'Ändrade behov'
        default: return ''
      }
    }
    if (categoryId === 'opportunities') {
      switch (stageId) {
        case 'prospecting': return 'Personaliserad approach'
        case 'qualification': return 'Djup behovsanalys'
        case 'proposal': return 'Skräddarsydd lösning'
        case 'negotiation': return 'Flexibla paket'
        case 'decision': return 'Tydlig ROI'
        case 'implementation': return 'Dedikerat stöd'
        case 'relationship': return 'Kontinuerlig utveckling'
        default: return ''
      }
    }
  }

  // Template 8: E-learning
  if (templateId === '8') {
    if (categoryId === 'actions') {
      switch (stageId) {
        case 'discovery': return 'Söker utbildning'
        case 'registration': return 'Registrerar sig'
        case 'learning': return 'Studerar material'
        case 'assessment': return 'Gör uppgifter'
        case 'completion': return 'Laddar ner certifikat'
        default: return ''
      }
    }
    if (categoryId === 'emotions') {
      switch (stageId) {
        case 'discovery': return '🤔:50'      // Curious, positioned at 50%
        case 'registration': return '😊:35'   // Excited, positioned at 35%
        case 'learning': return '😤:40'       // Focused, positioned at 40%
        case 'assessment': return '😰:65'     // Nervous, positioned at 65%
        case 'completion': return '🎉:10'     // Proud, positioned at 10%
        default: return ''
      }
    }
    if (categoryId === 'touchpoints') {
      switch (stageId) {
        case 'discovery': return 'Sökmotor, Rekommendation'
        case 'registration': return 'Webbsida, Email'
        case 'learning': return 'LMS, Videor, Quiz'
        case 'assessment': return 'Tentamen, Projekt'
        case 'completion': return 'Certifikatportal'
        default: return ''
      }
    }
    if (categoryId === 'pain-points') {
      switch (stageId) {
        case 'discovery': return 'För många alternativ'
        case 'registration': return 'Komplicerad process'
        case 'learning': return 'Svårt material'
        case 'assessment': return 'Tidsbrist'
        case 'completion': return 'Tekniska problem'
        default: return ''
      }
    }
    if (categoryId === 'opportunities') {
      switch (stageId) {
        case 'discovery': return 'Personliga rekommendationer'
        case 'registration': return 'Enkel onboarding'
        case 'learning': return 'Interaktivt innehåll'
        case 'assessment': return 'Flexibla deadlines'
        case 'completion': return 'Digital badge'
        default: return ''
      }
    }
  }

  // Template 9: Mobile App Onboarding
  if (templateId === '9') {
    if (categoryId === 'actions') {
      switch (stageId) {
        case 'download': return 'Laddar ner från store'
        case 'signup': return 'Skapar profil'
        case 'onboarding': return 'Går igenom tutorial'
        case 'firstuse': return 'Utforskar funktioner'
        default: return ''
      }
    }
    if (categoryId === 'emotions') {
      switch (stageId) {
        case 'download': return '😊:30'       // Excited, positioned at 30%
        case 'signup': return '😐:50'         // Neutral, positioned at 50%
        case 'onboarding': return '🤓:35'     // Learning, positioned at 35%
        case 'firstuse': return '😍:15'       // Delighted, positioned at 15%
        default: return ''
      }
    }
    if (categoryId === 'touchpoints') {
      switch (stageId) {
        case 'download': return 'App Store, Reklam'
        case 'signup': return 'Registreringsform'
        case 'onboarding': return 'Tutorial, Tips'
        case 'firstuse': return 'Huvudgränssnitt'
        default: return ''
      }
    }
    if (categoryId === 'pain-points') {
      switch (stageId) {
        case 'download': return 'Stor filstorlek'
        case 'signup': return 'För många fält'
        case 'onboarding': return 'Långt tutorial'
        case 'firstuse': return 'Förvirrande navigation'
        default: return ''
      }
    }
    if (categoryId === 'opportunities') {
      switch (stageId) {
        case 'download': return 'Snabb installation'
        case 'signup': return 'Social login'
        case 'onboarding': return 'Interaktiv guide'
        case 'firstuse': return 'Tydliga CTA:s'
        default: return ''
      }
    }
  }

  // Template 10: Event Management
  if (templateId === '10') {
    if (categoryId === 'actions') {
      switch (stageId) {
        case 'planning': return 'Letar efter events'
        case 'registration': return 'Anmäler sig online'
        case 'preparation': return 'Förbereder agenda'
        case 'arrival': return 'Checkar in'
        case 'participation': return 'Deltar i sessioner'
        case 'followup': return 'Nätverkar och följer upp'
        default: return ''
      }
    }
    if (categoryId === 'emotions') {
      switch (stageId) {
        case 'planning': return '🤔:45'         // Thinking, positioned at 45%
        case 'registration': return '😊:30'     // Happy, positioned at 30%
        case 'preparation': return '😰:55'      // Nervous, positioned at 55%
        case 'arrival': return '😍:25'         // Excited, positioned at 25%
        case 'participation': return '🤓:20'    // Learning, positioned at 20%
        case 'followup': return '😊:15'        // Satisfied, positioned at 15%
        default: return ''
      }
    }
    if (categoryId === 'touchpoints') {
      switch (stageId) {
        case 'planning': return 'Webbsida, Sociala medier'
        case 'registration': return 'Anmälningsformulär'
        case 'preparation': return 'Email, Eventapp'
        case 'arrival': return 'Reception, Badgear'
        case 'participation': return 'Lokaler, Presentatörer'
        case 'followup': return 'LinkedIn, Email'
        default: return ''
      }
    }
    if (categoryId === 'pain-points') {
      switch (stageId) {
        case 'planning': return 'Svårt hitta relevant info'
        case 'registration': return 'Komplicerad anmälan'
        case 'preparation': return 'Oklart schema'
        case 'arrival': return 'Långa köer'
        case 'participation': return 'Dålig ljudkvalitet'
        case 'followup': return 'Svårt hitta kontakter'
        default: return ''
      }
    }
    if (categoryId === 'opportunities') {
      switch (stageId) {
        case 'planning': return 'Personliga rekommendationer'
        case 'registration': return 'Enkel registrering'
        case 'preparation': return 'Interaktiv agenda'
        case 'arrival': return 'Digital check-in'
        case 'participation': return 'Live Q&A'
        case 'followup': return 'Automatisk nätverksmatchning'
        default: return ''
      }
    }
  }

  // Template 11: Recruitment Process
  if (templateId === '11') {
    if (categoryId === 'actions') {
      switch (stageId) {
        case 'discovery': return 'Söker jobb online'
        case 'application': return 'Skickar CV och personligt brev'
        case 'screening': return 'Väntar på svar'
        case 'interview': return 'Deltar i intervjuer'
        case 'decision': return 'Får besked om anställning'
        default: return ''
      }
    }
    if (categoryId === 'emotions') {
      switch (stageId) {
        case 'discovery': return '😊:40'         // Hopeful, positioned at 40%
        case 'application': return '🤞:45'       // Hopeful, positioned at 45%
        case 'screening': return '😰:60'        // Anxious, positioned at 60%
        case 'interview': return '😅:55'        // Nervous, positioned at 55%
        case 'decision': return '😍:10'         // Excited (if positive), positioned at 10%
        default: return ''
      }
    }
    if (categoryId === 'touchpoints') {
      switch (stageId) {
        case 'discovery': return 'LinkedIn, Platsbanken'
        case 'application': return 'Ansökningsportal'
        case 'screening': return 'Telefon, Email'
        case 'interview': return 'Teams, Kontor'
        case 'decision': return 'Telefon, Email'
        default: return ''
      }
    }
    if (categoryId === 'pain-points') {
      switch (stageId) {
        case 'discovery': return 'Otydliga jobbeskrivningar'
        case 'application': return 'Långa ansökningsformulär'
        case 'screening': return 'Långt väntetid'
        case 'interview': return 'Tekniska problem'
        case 'decision': return 'Ingen återkoppling'
        default: return ''
      }
    }
    if (categoryId === 'opportunities') {
      switch (stageId) {
        case 'discovery': return 'Tydliga rollbeskrivningar'
        case 'application': return 'Smidig ansökan'
        case 'screening': return 'Snabb återkoppling'
        case 'interview': return 'Förbered teknisk setup'
        case 'decision': return 'Konstruktiv feedback'
        default: return ''
      }
    }
  }

  // Template 12: Insurance Claim
  if (templateId === '12') {
    if (categoryId === 'actions') {
      switch (stageId) {
        case 'incident': return 'Skadan uppstår'
        case 'reporting': return 'Ringer försäkringsbolag'
        case 'documentation': return 'Samlar bevis och bilder'
        case 'assessment': return 'Väntar på besked'
        case 'resolution': return 'Får ersättning eller avslag'
        default: return ''
      }
    }
    if (categoryId === 'emotions') {
      switch (stageId) {
        case 'incident': return '😱:80'          // Shocked, positioned at 80%
        case 'reporting': return '😰:65'         // Worried, positioned at 65%
        case 'documentation': return '😤:60'     // Frustrated, positioned at 60%
        case 'assessment': return '🤞:50'        // Hopeful, positioned at 50%
        case 'resolution': return '😊:20'        // Relieved, positioned at 20%
        default: return ''
      }
    }
    if (categoryId === 'touchpoints') {
      switch (stageId) {
        case 'incident': return 'Olycksplatsen'
        case 'reporting': return 'Telefonsupport'
        case 'documentation': return 'App, Email'
        case 'assessment': return 'Besiktningsman'
        case 'resolution': return 'Brev, Bankutbetalning'
        default: return ''
      }
    }
    if (categoryId === 'pain-points') {
      switch (stageId) {
        case 'incident': return 'Chock och stress'
        case 'reporting': return 'Långa väntetider'
        case 'documentation': return 'Otydliga krav'
        case 'assessment': return 'Lång handläggningstid'
        case 'resolution': return 'Oklar kommunikation'
        default: return ''
      }
    }
    if (categoryId === 'opportunities') {
      switch (stageId) {
        case 'incident': return 'Snabb första hjälp'
        case 'reporting': return '24/7 support'
        case 'documentation': return 'Digital guide'
        case 'assessment': return 'Transparenta uppdateringar'
        case 'resolution': return 'Tydlig förklaring'
        default: return ''
      }
    }
  }

  return ''
}

export default function JourneyMapBuilderPage() {
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const journeyMapId = params.id as string

  const [journeyMap, setJourneyMap] = useState<JourneyMapData | null>(null)
  const [insights, setInsights] = useState<Insight[]>([])
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false)

  // Handle creating new insight
  const handleCreateInsight = (insightData: Omit<Insight, 'id' | 'created_at'>) => {
    const newInsight: Insight = {
      ...insightData,
      id: `insight-${Date.now()}`,
      created_at: new Date().toISOString(),
    }
    setInsights(prev => [...prev, newInsight])
  }

  // Handle attaching insight to cell
  const handleInsightAttach = (rowId: string, cellId: string, insightId: string) => {
    if (!journeyMap) return

    setJourneyMap(prevMap => {
      if (!prevMap) return prevMap

      return {
        ...prevMap,
        rows: prevMap.rows.map(row => {
          if (row.id === rowId) {
            return {
              ...row,
              cells: row.cells.map(cell => {
                if (cell.id === cellId) {
                  const currentInsightIds = cell.insightIds || []
                  // Don't add duplicate insights
                  if (currentInsightIds.includes(insightId)) {
                    return cell
                  }
                  return {
                    ...cell,
                    insightIds: [...currentInsightIds, insightId]
                  }
                }
                return cell
              })
            }
          }
          return row
        })
      }
    })
  }

  // Handle removing insight from cell
  const handleInsightRemove = (rowId: string, cellId: string, insightId: string) => {
    if (!journeyMap) return

    setJourneyMap(prevMap => {
      if (!prevMap) return prevMap

      return {
        ...prevMap,
        rows: prevMap.rows.map(row => {
          if (row.id === rowId) {
            return {
              ...row,
              cells: row.cells.map(cell => {
                if (cell.id === cellId) {
                  return {
                    ...cell,
                    insightIds: (cell.insightIds || []).filter(id => id !== insightId)
                  }
                }
                return cell
              })
            }
          }
          return row
        })
      }
    })
  }

  // Handle clicking on an insight badge
  const handleInsightClick = (insightId: string, rowId: string, cellId: string) => {
    const insight = insights.find(i => i.id === insightId)
    if (insight) {
      setSelectedInsight(insight)
      setSelectedInsightRowId(rowId)
      setSelectedInsightCellId(cellId)
      setIsInsightDrawerOpen(true)
    }
  }

  const [isRowEditorOpen, setIsRowEditorOpen] = useState(false)
  const [editingRow, setEditingRow] = useState<JourneyMapRow | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [isDraggingPhase, setIsDraggingPhase] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragBoundaryIndex, setDragBoundaryIndex] = useState<number | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isOnboardingActive, setIsOnboardingActive] = useState(false)
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [draggedStageId, setDraggedStageId] = useState<string | null>(null)
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null)
  const [isDraggingStage, setIsDraggingStage] = useState(false)
  const [hoveredInsertIndex, setHoveredInsertIndex] = useState<number | null>(null)
  const [isDragDropMode, setIsDragDropMode] = useState(true) // true for drag-drop, false for plus-button mode
  const [isCompactView, setIsCompactView] = useState(false)
  const [showGridLines, setShowGridLines] = useState(false)
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null)
  const [isInsightDrawerOpen, setIsInsightDrawerOpen] = useState(false)
  const [selectedInsightCellId, setSelectedInsightCellId] = useState<string | null>(null)
  const [selectedInsightRowId, setSelectedInsightRowId] = useState<string | null>(null)
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)
  const [showTooltips, setShowTooltips] = useState(true)
  const [colorIntensity, setColorIntensity] = useState<'subtle' | 'vibrant'>('subtle')

  // Zoom and pan state
  const [zoom, setZoom] = useState(100)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollAccumulator = useRef(0)
  const [showZoomIndicator, setShowZoomIndicator] = useState(false)
  const zoomIndicatorTimeout = useRef<NodeJS.Timeout | null>(null)

  // Zoom functions
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50))
  }

  const handleResetZoom = () => {
    setZoom(100)
    setPan({ x: 0, y: 0 })
  }

  const handleFitToScreen = () => {
    setZoom(90)
    setPan({ x: 0, y: 0 })
  }

  // Mouse wheel and trackpad zoom
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only zoom if Ctrl/Cmd is pressed (pinch-to-zoom or Ctrl+scroll)
      // This allows normal scrolling without modifiers
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()

        // Accumulate scroll delta
        scrollAccumulator.current += e.deltaY

        // Only zoom when accumulated scroll reaches threshold (balanced resistance)
        const threshold = 20 // Lower = easier to zoom, higher = harder to zoom

        if (Math.abs(scrollAccumulator.current) >= threshold) {
          const direction = scrollAccumulator.current > 0 ? -10 : 10

          setZoom(prev => {
            const newZoom = Math.max(50, Math.min(200, prev + direction))
            return newZoom
          })

          // Show zoom indicator
          setShowZoomIndicator(true)

          // Clear existing timeout
          if (zoomIndicatorTimeout.current) {
            clearTimeout(zoomIndicatorTimeout.current)
          }

          // Hide after 1.5 seconds
          zoomIndicatorTimeout.current = setTimeout(() => {
            setShowZoomIndicator(false)
          }, 1500)

          // Reset accumulator
          scrollAccumulator.current = 0
        }
      }
    }

    // Wait for container to be mounted
    const timer = setTimeout(() => {
      const container = containerRef.current
      console.log('Setting up wheel listener on container:', container)

      if (container) {
        container.addEventListener('wheel', handleWheel, { passive: false })
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      const container = containerRef.current
      if (container) {
        console.log('Removing wheel listener')
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [journeyMap])

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only pan with space + mouse or middle mouse button
    if (e.button === 1 || (e.button === 0 && (e.metaKey || e.ctrlKey))) {
      e.preventDefault()
      setIsPanning(true)
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsPanning(false)
  }

  // Load color intensity preference and listen for changes
  useEffect(() => {
    const loadColorIntensity = () => {
      const saved = localStorage.getItem('cx-app-color-intensity')
      if (saved === 'vibrant' || saved === 'subtle') {
        setColorIntensity(saved)
      }
    }

    // Load initial value
    loadColorIntensity()

    // Listen for custom color intensity change events
    const handleColorIntensityChange = (e: Event) => {
      const customEvent = e as CustomEvent<'subtle' | 'vibrant'>
      setColorIntensity(customEvent.detail)
    }

    window.addEventListener('color-intensity-change', handleColorIntensityChange)
    return () => window.removeEventListener('color-intensity-change', handleColorIntensityChange)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (activeDropdown && !target.closest('[data-dropdown]')) {
        // Don't close dropdowns when clicking on inputs, textareas, or other interactive elements
        if (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'SELECT' ||
            target.closest('button') ||
            target.closest('.emoji-picker-container') ||
            target.closest('.status-picker') ||
            target.closest('[contenteditable]')) {
          return
        }
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
    // Check if this is a new journey map (either journeyMapId === 'new' OR blank=true parameter)
    const isBlank = searchParams.get('blank') === 'true'
    const templateId = searchParams.get('template')
    const templateName = searchParams.get('name')
    const isCustom = searchParams.get('custom')
    const teamParam = searchParams.get('team')

    // Check if this is a new journey map being created (either from 'new' route, blank param, or template param)
    const isNewJourneyMap = journeyMapId === 'new' || isBlank || templateId

    if (isNewJourneyMap) {
      let newJourneyMap: JourneyMapData

      if (templateId && templateName) {
        // Create journey map from template
        newJourneyMap = createJourneyMapFromTemplate(templateId, decodeURIComponent(templateName), journeyMapId !== 'new' ? journeyMapId : undefined)
      } else if (isCustom && templateName) {
        // Create custom template with more rows for user to customize
        newJourneyMap = {
          id: journeyMapId === 'new' ? Date.now().toString() : journeyMapId,
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
          createdBy: 'fabiankjaergaard',
          status: 'draft'
        }
      } else {
        // Create blank journey map - check if name is provided
        const blankName = templateName || 'Ny Journey Map'
        newJourneyMap = {
          id: journeyMapId === 'new' ? Date.now().toString() : journeyMapId,
          name: blankName ? decodeURIComponent(blankName) : 'Ny Journey Map',
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
          })), // Start with just the Actions row for onboarding
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'fabiankjaergaard',
          status: 'draft'
        }
      }

      setJourneyMap(newJourneyMap)

      // Save the newly created journey map to localStorage immediately
      saveJourneyMap(newJourneyMap).catch(error => {
        console.error('Failed to save new journey map:', error)
      })

      // Handle team information from setup page
      if (teamParam) {
        try {
          const teamMembers = JSON.parse(decodeURIComponent(teamParam))
          console.log('Team members loaded from setup:', teamMembers)
          // Here you would typically save the team members to your backend
          // For now, we just log them
        } catch (error) {
          console.error('Error parsing team parameters:', error)
        }
      }

      // Start onboarding for new journey maps (skip for templates and custom templates)
      if (!templateId && !isCustom) {
        setIsOnboardingActive(true)
      }
    } else {
      // Load existing journey map from storage
      try {
        const savedJourneyMap = getJourneyMapById(journeyMapId)
        if (savedJourneyMap) {
          setJourneyMap(savedJourneyMap)
        } else {
          // Journey map not found, redirect to journey maps list or show error
          console.error('Journey map not found:', journeyMapId)
          // You could redirect to /journey-maps here or show a "not found" message
          router.push('/journey-maps')
        }
      } catch (error) {
        console.error('Error loading journey map:', error)
        // Fallback to redirect or error message
        router.push('/journey-maps')
      }
    }
  }, [journeyMapId, searchParams])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [])

  const handleCellChange = (rowId: string, cellId: string, content: string) => {
    if (!journeyMap) return

    const updatedJourneyMap = {
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
    }

    setJourneyMap(updatedJourneyMap)

    // Auto-save after a short delay (debounced)
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      saveJourneyMap(updatedJourneyMap).catch(error => {
        console.error('Auto-save failed:', error)
        // Don't show UI feedback for auto-save failures
      })
    }, 2000) // Auto-save after 2 seconds of inactivity
  }

  const handleIconChange = (rowId: string, cellId: string, icon: string) => {
    if (!journeyMap) return

    // Debug: Find current cell to see what we're working with
    const currentCell = journeyMap.rows
      .find(row => row.id === rowId)?.cells
      .find(cell => cell.id === cellId)

    console.log('handleIconChange called:', { rowId, cellId, icon, currentCell })

    const updatedJourneyMap = {
      ...journeyMap,
      rows: journeyMap.rows.map(row =>
        row.id === rowId
          ? {
              ...row,
              cells: row.cells.map(cell =>
                cell.id === cellId ? { ...cell, icon: icon === '' ? undefined : icon } : cell
              )
            }
          : row
      ),
      updatedAt: new Date().toISOString()
    }

    setJourneyMap(updatedJourneyMap)

    // Auto-save after a short delay (debounced)
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      saveJourneyMap(updatedJourneyMap).catch(error => {
        console.error('Auto-save failed:', error)
        // Don't show UI feedback for auto-save failures
      })
    }, 2000) // Auto-save after 2 seconds of inactivity
  }

  const handleColorChange = (rowId: string, cellId: string, backgroundColor: string) => {
    if (!journeyMap) return

    const updatedJourneyMap = {
      ...journeyMap,
      rows: journeyMap.rows.map(row => {
        if (row.id === rowId) {
          // Find which cell index was changed
          const changedCellIndex = row.cells.findIndex(cell => cell.id === cellId)

          // Update the parent row's cell
          const updatedCells = row.cells.map(cell => {
            if (cell.id === cellId) {
              // Explicitly preserve all existing properties, especially icon
              const updatedCell = {
                ...cell,
                backgroundColor: backgroundColor === '' ? undefined : backgroundColor,
                // Explicitly preserve icon if it exists
                ...(cell.icon && { icon: cell.icon })
              }
              return updatedCell
            }
            return cell
          })

          // Update sublanes to store the SAME background color as parent
          // Color conversion will happen at render time in SublaneRow component
          const updatedSublanes = (row.sublanes || []).map(sublane => ({
            ...sublane,
            cells: sublane.cells.map((cell, index) => {
              // If this is the same cell index as the changed parent cell
              if (index === changedCellIndex) {
                // Store the parent's backgroundColor directly - conversion happens at render time
                return {
                  ...cell,
                  backgroundColor: backgroundColor === '' ? undefined : backgroundColor
                }
              }
              return cell
            })
          }))

          return {
            ...row,
            cells: updatedCells,
            sublanes: updatedSublanes
          }
        }
        return row
      }),
      updatedAt: new Date().toISOString()
    }

    setJourneyMap(updatedJourneyMap)

    // Auto-save after a short delay (debounced)
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      saveJourneyMap(updatedJourneyMap).catch(error => {
        console.error('Auto-save failed:', error)
        // Don't show UI feedback for auto-save failures
      })
    }, 2000) // Auto-save after 2 seconds of inactivity
  }

  const handleCriticalChange = (rowId: string, cellId: string, isCritical: boolean) => {
    if (!journeyMap) return

    const updatedJourneyMap = {
      ...journeyMap,
      rows: journeyMap.rows.map(row =>
        row.id === rowId
          ? {
              ...row,
              cells: row.cells.map(cell =>
                cell.id === cellId
                  ? { ...cell, isCritical }
                  : cell
              )
            }
          : row
      ),
      updatedAt: new Date().toISOString()
    }

    setJourneyMap(updatedJourneyMap)

    // Trigger auto-save
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }
    autoSaveTimeoutRef.current = setTimeout(async () => {
      await saveJourneyMap(updatedJourneyMap).catch((error) => {
        console.error('Auto-save failed after critical change:', error)
      })
    }, 2000)
  }

  const handleCellColSpanChange = (rowId: string, cellId: string, colSpan: number) => {
    if (!journeyMap) return

    const updatedJourneyMap = {
      ...journeyMap,
      rows: journeyMap.rows.map(row =>
        row.id === rowId
          ? {
              ...row,
              cells: row.cells.map(cell =>
                cell.id === cellId ? { ...cell, colSpan } : cell
              )
            }
          : row
      ),
      updatedAt: new Date().toISOString()
    }

    setJourneyMap(updatedJourneyMap)

    // Auto-save after a short delay (debounced)
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      saveJourneyMap(updatedJourneyMap).catch(error => {
        console.error('Auto-save failed:', error)
      })
    }, 2000)
  }


  const handleInsertRowAt = (index: number) => {
    if (!journeyMap) return

    const newRowId = `row-${Date.now()}`
    const newRow: JourneyMapRow = {
      id: newRowId,
      category: 'New Category',
      description: '',
      type: 'text',
      color: ROW_COLORS[0],
      cells: journeyMap.stages.map((stage) => ({
        id: `${newRowId}-${stage.id}`,
        content: ''
      }))
    }

    // Insert row at specific index
    const updatedRows = [
      ...journeyMap.rows.slice(0, index),
      newRow,
      ...journeyMap.rows.slice(index)
    ]

    const updatedJourneyMap = {
      ...journeyMap,
      rows: updatedRows,
      updatedAt: new Date().toISOString()
    }

    setJourneyMap(updatedJourneyMap)

    // Auto-save
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }
    autoSaveTimeoutRef.current = setTimeout(() => {
      saveJourneyMap(updatedJourneyMap).catch(error => {
        console.error('Auto-save failed:', error)
      })
    }, 2000)
  }

  // ============================================================================
  // SUBLANE HANDLERS
  // ============================================================================

  const handleAddSublane = (rowId: string) => {
    if (!journeyMap) return

    const row = journeyMap.rows.find(r => r.id === rowId)
    if (!row) return

    // Create new sublane using helper function with current color intensity mode
    const newSublane = createNewSublane(row, journeyMap.stages.length, colorIntensity === 'vibrant')

    const updatedJourneyMap = {
      ...journeyMap,
      rows: journeyMap.rows.map(r =>
        r.id === rowId
          ? {
              ...r,
              sublanes: [...(r.sublanes || []), newSublane],
              isExpanded: true // Auto-expand when adding sublane
            }
          : r
      ),
      updatedAt: new Date().toISOString()
    }

    setJourneyMap(updatedJourneyMap)

    // Auto-save
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }
    autoSaveTimeoutRef.current = setTimeout(() => {
      saveJourneyMap(updatedJourneyMap).catch(error => {
        console.error('Auto-save failed:', error)
      })
    }, 2000)
  }

  const handleDeleteSublane = (rowId: string, sublaneId: string) => {
    if (!journeyMap) return

    const updatedJourneyMap = {
      ...journeyMap,
      rows: journeyMap.rows.map(row =>
        row.id === rowId
          ? {
              ...row,
              sublanes: (row.sublanes || []).filter(s => s.id !== sublaneId)
            }
          : row
      ),
      updatedAt: new Date().toISOString()
    }

    setJourneyMap(updatedJourneyMap)

    // Auto-save
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }
    autoSaveTimeoutRef.current = setTimeout(() => {
      saveJourneyMap(updatedJourneyMap).catch(error => {
        console.error('Auto-save failed:', error)
      })
    }, 2000)
  }

  const handleSublaneCellChange = (rowId: string, sublaneId: string, cellIndex: number, content: string) => {
    if (!journeyMap) return

    const updatedJourneyMap = {
      ...journeyMap,
      rows: journeyMap.rows.map(row => {
        if (row.id === rowId) {
          const updatedSublanes = (row.sublanes || []).map(sublane => {
            if (sublane.id === sublaneId) {
              const updatedCells = [...(sublane.cells || [])]

              updatedCells[cellIndex] = {
                ...updatedCells[cellIndex],
                content,
                // Keep existing backgroundColor - don't recalculate it
                // This preserves the lighter color for sublanes
              }
              return { ...sublane, cells: updatedCells }
            }
            return sublane
          })
          return { ...row, sublanes: updatedSublanes }
        }
        return row
      }),
      updatedAt: new Date().toISOString()
    }

    setJourneyMap(updatedJourneyMap)

    // Auto-save
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }
    autoSaveTimeoutRef.current = setTimeout(() => {
      saveJourneyMap(updatedJourneyMap).catch(error => {
        console.error('Auto-save failed:', error)
      })
    }, 2000)
  }

  const handleSublaneCellIconChange = (rowId: string, sublaneId: string, cellIndex: number, icon: string) => {
    if (!journeyMap) return

    const updatedJourneyMap = {
      ...journeyMap,
      rows: journeyMap.rows.map(row => {
        if (row.id === rowId) {
          const updatedSublanes = (row.sublanes || []).map(sublane => {
            if (sublane.id === sublaneId) {
              const updatedCells = [...(sublane.cells || [])]

              updatedCells[cellIndex] = {
                ...updatedCells[cellIndex],
                icon,
                // Keep existing backgroundColor - don't recalculate it
                // This preserves the lighter color for sublanes
              }
              return { ...sublane, cells: updatedCells }
            }
            return sublane
          })
          return { ...row, sublanes: updatedSublanes }
        }
        return row
      }),
      updatedAt: new Date().toISOString()
    }

    setJourneyMap(updatedJourneyMap)

    // Auto-save
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }
    autoSaveTimeoutRef.current = setTimeout(() => {
      saveJourneyMap(updatedJourneyMap).catch(error => {
        console.error('Auto-save failed:', error)
      })
    }, 2000)
  }

  const handleSublaneNameChange = (rowId: string, sublaneId: string, name: string) => {
    if (!journeyMap) return

    const updatedJourneyMap = {
      ...journeyMap,
      rows: journeyMap.rows.map(row =>
        row.id === rowId
          ? {
              ...row,
              sublanes: (row.sublanes || []).map(sublane =>
                sublane.id === sublaneId ? { ...sublane, name } : sublane
              )
            }
          : row
      ),
      updatedAt: new Date().toISOString()
    }

    setJourneyMap(updatedJourneyMap)

    // Auto-save
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }
    autoSaveTimeoutRef.current = setTimeout(() => {
      saveJourneyMap(updatedJourneyMap).catch(error => {
        console.error('Auto-save failed:', error)
      })
    }, 2000)
  }

  const handleToggleExpanded = (rowId: string) => {
    if (!journeyMap) return

    const updatedJourneyMap = {
      ...journeyMap,
      rows: journeyMap.rows.map(row =>
        row.id === rowId
          ? { ...row, isExpanded: !row.isExpanded }
          : row
      ),
      updatedAt: new Date().toISOString()
    }

    setJourneyMap(updatedJourneyMap)
  }

  // ============================================================================
  // END SUBLANE HANDLERS
  // ============================================================================


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || !journeyMap) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) return

    // Find which row contains the active and over cells
    let sourceRow: JourneyMapRow | null = null
    let targetRow: JourneyMapRow | null = null

    for (const row of journeyMap.rows) {
      if (row.cells.some(cell => cell.id === activeId)) {
        sourceRow = row
      }
      if (row.cells.some(cell => cell.id === overId)) {
        targetRow = row
      }
    }

    if (!sourceRow || !targetRow || sourceRow.id !== targetRow.id) {
      // Don't allow dragging between different rows for now
      return
    }

    // Reorder cells within the same row
    const updatedJourneyMap = {
      ...journeyMap,
      rows: journeyMap.rows.map(row => {
        if (row.id === sourceRow!.id) {
          const oldIndex = row.cells.findIndex(cell => cell.id === activeId)
          const newIndex = row.cells.findIndex(cell => cell.id === overId)

          const reorderedCells = arrayMove(row.cells, oldIndex, newIndex)

          // Update positions
          return {
            ...row,
            cells: reorderedCells.map((cell, index) => ({
              ...cell,
              position: index
            }))
          }
        }
        return row
      }),
      updatedAt: new Date().toISOString()
    }

    setJourneyMap(updatedJourneyMap)

    // Auto-save
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      saveJourneyMap(updatedJourneyMap).catch(error => {
        console.error('Auto-save failed:', error)
      })
    }, 2000)
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleCellClear = (rowId: string, cellId: string) => {
    if (!journeyMap) return

    const updatedJourneyMap = {
      ...journeyMap,
      rows: journeyMap.rows.map(row =>
        row.id === rowId
          ? {
              ...row,
              cells: row.cells.map(cell =>
                cell.id === cellId
                  ? { ...cell, content: '', icon: undefined, backgroundColor: undefined, colSpan: 1 }
                  : cell
              )
            }
          : row
      ),
      updatedAt: new Date().toISOString()
    }

    setJourneyMap(updatedJourneyMap)

    // Auto-save after a short delay (debounced)
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      saveJourneyMap(updatedJourneyMap).catch(error => {
        console.error('Auto-save failed:', error)
      })
    }, 2000)
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

  const handleInsertStageAt = (index: number) => {
    if (!journeyMap) return

    const newStageId = `stage-${Date.now()}`
    const newStage: JourneyMapStage = {
      id: newStageId,
      name: `Stage ${index + 1}`,
      description: '',
      phaseId: journeyMap.stages[index]?.phaseId || journeyMap.stages[index - 1]?.phaseId || 'after'
    }

    // Insert stage at specific index
    const updatedStages = [
      ...journeyMap.stages.slice(0, index),
      newStage,
      ...journeyMap.stages.slice(index)
    ]

    // Insert cell at specific index for each row
    const updatedRows = journeyMap.rows.map(row => {
      const newCell = {
        id: `${row.id}-${newStageId}`,
        content: ''
      }
      return {
        ...row,
        cells: [
          ...row.cells.slice(0, index),
          newCell,
          ...row.cells.slice(index)
        ]
      }
    })

    setJourneyMap({
      ...journeyMap,
      stages: updatedStages,
      rows: updatedRows,
      updatedAt: new Date().toISOString()
    })

    // Clear hovered insert index
    setHoveredInsertIndex(null)
  }

  const handleStageDragStart = (e: React.DragEvent, stageId: string) => {
    setDraggedStageId(stageId)
    setIsDraggingStage(true)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', stageId)

    // Add some visual feedback to the dragged element
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5'
    }
  }

  const handleStageDragEnd = (e: React.DragEvent) => {
    setDraggedStageId(null)
    setDropTargetIndex(null)
    setIsDraggingStage(false)

    // Reset visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1'
    }
  }

  const handleStageDragOver = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDropTargetIndex(targetIndex)
  }

  const handleStageHover = (e: React.DragEvent, stageIndex: number) => {
    if (!isDraggingStage) return
    e.preventDefault()

    // Determine drop position based on mouse position within the stage
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const stageWidth = rect.width

    // If mouse is in left half, drop before this stage; if right half, drop after
    const dropIndex = mouseX < stageWidth / 2 ? stageIndex : stageIndex + 1
    setDropTargetIndex(dropIndex)
  }

  const handleStageDragLeave = () => {
    setDropTargetIndex(null)
  }

  const handleStageDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()

    if (!journeyMap || !draggedStageId) return

    const draggedStageIndex = journeyMap.stages.findIndex(stage => stage.id === draggedStageId)
    if (draggedStageIndex === -1 || draggedStageIndex === targetIndex) return

    // Create new stages array with reordered stages
    const newStages = [...journeyMap.stages]
    const [draggedStage] = newStages.splice(draggedStageIndex, 1)

    // Adjust target index if dragging from left to right
    const adjustedTargetIndex = draggedStageIndex < targetIndex ? targetIndex - 1 : targetIndex
    newStages.splice(adjustedTargetIndex, 0, draggedStage)

    // Reorder cells in all rows to match new stage order
    const newRows = journeyMap.rows.map(row => {
      const newCells = [...row.cells]
      const [draggedCell] = newCells.splice(draggedStageIndex, 1)
      newCells.splice(adjustedTargetIndex, 0, draggedCell)
      return {
        ...row,
        cells: newCells
      }
    })

    setJourneyMap({
      ...journeyMap,
      stages: newStages,
      rows: newRows,
      updatedAt: new Date().toISOString()
    })

    // Reset drag state
    setDraggedStageId(null)
    setDropTargetIndex(null)
    setIsDraggingStage(false)
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
        content: cell.content,
        colSpan: cell.colSpan || 1,
        position: index,
        icon: cell.icon
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
    if (!journeyMap) {
      console.error('No journey map to save')
      return
    }

    setIsSaving(true)
    try {
      await saveJourneyMap(journeyMap)
      console.log('Journey map saved successfully!')

      // Show success toast
      setToastMessage('Journey map saved successfully!')
      setToastType('success')
      setShowToast(true)
    } catch (error) {
      console.error('Failed to save journey map:', error)

      // Show error toast
      setToastMessage('Failed to save journey map. Please try again.')
      setToastType('error')
      setShowToast(true)
    } finally {
      setIsSaving(false)
    }
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
      cells: journeyMap.stages.map((stage, index) => ({
        id: `${newRowId}-${stage.id}`,
        content: '',
        colSpan: 1,
        position: index
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
      cells: journeyMap.stages.map((stage, index) => ({
        id: `${newRowId}-${stage.id}`,
        content: '',
        colSpan: 1,
        position: index
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

  const content = (
    <div className="h-full flex flex-col overflow-hidden grid-background">
          <Header
        title={journeyMap.name}
        description={journeyMap.description || 'Redigera din customer journey map'}
        actions={
          <div className="flex items-center space-x-2">
            {/* Team/Collaborators Section */}
            <div className="flex items-center space-x-2">
              <div className="relative" data-dropdown>
                <div className="flex items-center">
                  {/* Current user (owner) */}
                  <div
                    className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-medium border-2 border-white cursor-pointer hover:z-10 hover:scale-110 transition-transform"
                    title="fabiankjaergaard (owner) - Click to manage team"
                    onClick={() => setActiveDropdown(activeDropdown === 'team' ? null : 'team')}
                  >
                    F
                  </div>
                  {/* Other collaborators */}
                  <div
                    className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center text-sm font-medium -ml-2 border-2 border-white cursor-pointer hover:z-10 hover:scale-110 transition-transform"
                    title="Anna Andersson (editor) - Click to manage team"
                    onClick={() => setActiveDropdown(activeDropdown === 'team' ? null : 'team')}
                  >
                    A
                  </div>
                  <div
                    className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm font-medium -ml-2 border-2 border-white cursor-pointer hover:z-10 hover:scale-110 transition-transform"
                    title="Erik Nilsson (viewer) - Click to manage team"
                    onClick={() => setActiveDropdown(activeDropdown === 'team' ? null : 'team')}
                  >
                    E
                  </div>
                </div>

                {/* Team Dropdown */}
                {activeDropdown === 'team' && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-64 z-20">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-900">Team Members</h3>
                    </div>

                    {/* Current team members */}
                    <div className="px-3 py-2">
                      {/* Owner */}
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-medium">
                            F
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">fabiankjaergaard</p>
                            <p className="text-xs text-gray-500">Owner</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">You</span>
                      </div>

                      {/* Editor */}
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-slate-500 text-white flex items-center justify-center text-xs font-medium">
                            A
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Anna Andersson</p>
                            <p className="text-xs text-gray-500">Editor</p>
                          </div>
                        </div>
                        <button className="text-xs text-gray-400 hover:text-red-500">Remove</button>
                      </div>

                      {/* Viewer */}
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-medium">
                            E
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Erik Nilsson</p>
                            <p className="text-xs text-gray-500">Viewer</p>
                          </div>
                        </div>
                        <button className="text-xs text-gray-400 hover:text-red-500">Remove</button>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 px-3 py-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveDropdown(null)
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-slate-600 hover:text-slate-700 rounded"
                      >
                        <PlusIcon className="w-3 h-3" />
                        Invite new member
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center"
            >
              <SaveIcon className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>

            <div className="relative" data-dropdown>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveDropdown(activeDropdown === 'more' ? null : 'more')}
                className="p-2"
                title="More options"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>

              {activeDropdown === 'more' && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-36 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle duplicate
                      setActiveDropdown(null)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-gray-900 hover:text-gray-900"
                  >
                    <Copy className="w-3 h-3 text-gray-700" />
                    Duplicate
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle move
                      setActiveDropdown(null)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-gray-900 hover:text-gray-900"
                  >
                    <Move className="w-3 h-3 text-gray-700" />
                    Move to...
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
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
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle delete with confirmation
                      setActiveDropdown(null)
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3 text-red-600" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        }
      />

          <div className="flex-1 flex min-h-0">
            {/* Row Types Palette - only shown in drag & drop mode */}
            {isDragDropMode && (
              <RowTypePalette
                data-onboarding="palette"
                journeyId={journeyMapId}
                insights={insights}
                onCreateInsight={handleCreateInsight}
              />
            )}

            <div
              ref={containerRef}
              className="flex-1 overflow-auto journey-map-container"
              style={{background: 'transparent', cursor: isPanning ? 'grabbing' : 'default'}}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
            <div className={isCompactView ? "p-3 pb-3" : "p-6 pb-6"}>
            <div className="overflow-x-auto">
              <div
                style={{
                  minWidth: 'fit-content',
                  transform: `scale(${zoom / 100}) translate(${pan.x}px, ${pan.y}px)`,
                  transformOrigin: 'top left',
                  transition: isPanning ? 'none' : 'transform 0.1s ease-out'
                }}
              >
            {/* Persona Section */}
            <div className="mb-6" data-onboarding="persona">
              <Card
                className="border-0 bg-white rounded-2xl hover:-translate-y-1 transition-all duration-300 ease-out group border-l-4 border-l-slate-500"
                style={{borderColor: '#E5E7EB', boxShadow: '0 4px 20px rgba(148, 163, 184, 0.12), 0 1px 4px rgba(148, 163, 184, 0.08)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'}}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 30px rgba(148, 163, 184, 0.2), 0 4px 12px rgba(148, 163, 184, 0.12)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(148, 163, 184, 0.12), 0 1px 4px rgba(148, 163, 184, 0.08)'}
              >
                <CardContent className={isCompactView ? "p-3" : "p-4"}>
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
                            <h3 className="font-medium text-gray-900">{t('journeyMap.persona.noPersonaSelected')}</h3>
                            <p className="text-sm text-gray-500">{t('journeyMap.persona.choosePersonaDescription')}</p>
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
                      {journeyMap.persona ? t('journeyMap.persona.changePersona') : t('journeyMap.persona.choosePersona')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 font-medium">{t('journeyMap.editingMode')}:</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDragDropMode}
                    onChange={() => setIsDragDropMode(!isDragDropMode)}
                    className="sr-only"
                  />
                  <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                    isDragDropMode ? 'bg-slate-700' : 'bg-gray-300'
                  }`}>
                    <div className={`inline-block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                      isDragDropMode ? 'translate-x-6' : 'translate-x-1'
                    } mt-1`}></div>
                  </div>
                </label>
                <span className="text-sm text-gray-600">
                  {isDragDropMode ? t('journeyMap.dragAndDrop') : t('journeyMap.plusButtons')}
                </span>
              </div>
            </div>

            {/* Journey Map Grid */}
            <Card className="journey-map-content rounded-t-none border-t-0" data-export="journey-map">
              <CardContent className="p-0 border-b-2 border-gray-200">
                <div className="overflow-x-auto scrollbar-hide" style={{maxHeight: '70vh', overflowY: 'auto'}}>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <table className="w-full bg-white rounded-xl shadow-sm" style={{borderCollapse: 'separate', borderSpacing: 0, boxShadow: '0 4px 20px rgba(148, 163, 184, 0.12), 0 1px 4px rgba(148, 163, 184, 0.08)'}}>
                {/* Phase Header Row */}
                <thead>
                  {/* Phases Row */}
                  <tr
                    className="border-b border-gray-200"
                    style={{background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)'}}
                    data-onboarding="phases"
                    onMouseMove={handlePhaseResize}
                    onMouseUp={handlePhaseResizeEnd}
                    onMouseLeave={handlePhaseResizeEnd}
                  >
                    <th className={`w-48 p-2 text-left text-xs font-semibold text-gray-600 border border-gray-300`}>
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
                          className={`relative p-2 text-center text-sm font-semibold text-gray-700 border border-gray-300 ${phase.color} ${stagesInPhase === 0 ? 'min-w-32' : ''} group`}
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
                          {isAdvancedMode && (
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
                          )}

                          {/* Drag handle on the right edge (except for last phase) */}
                          {phaseIndex < journeyMap.phases.length - 1 && (
                            <div
                              className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize bg-gray-400 opacity-0 hover:opacity-100 transition-opacity z-10 flex items-center justify-center"
                              onMouseDown={(e) => handlePhaseResizeStart(e, phaseIndex)}
                              title={showTooltips ? "Drag to resize phase" : undefined}
                            >
                              <div className="w-0.5 h-8 bg-gray-600 rounded"></div>
                            </div>
                          )}
                        </th>
                      )
                    })}
                    <th className="w-12 p-2 border border-gray-300">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddPhase}
                        className="w-8 h-8 p-0"
                        title={showTooltips ? "Add new phase" : undefined}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </th>
                  </tr>
                  
                  {/* Stages Header Row */}
                  <tr className="border-b-2 border-gray-200" data-onboarding="stages" style={{background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)'}}>
                    <th className={`w-48 ${isCompactView ? 'p-2' : 'p-4'} text-left text-sm font-medium text-gray-900 border border-gray-300 border-b-2 hover:bg-white transition-colors`}>
                      Journey Kategorier
                    </th>
                    {journeyMap.stages.map((stage, index) => (
                      <React.Fragment key={stage.id}>
                        <th
                          className={`min-w-64 ${isCompactView ? 'p-2' : 'p-4'} text-left border border-gray-300 border-b-2 relative group hover:bg-white transition-all duration-200 cursor-move ${
                            draggedStageId === stage.id ? 'bg-slate-50 shadow-lg' : ''
                          } ${hoveredInsertIndex === index + 1 ? 'pr-8' : ''} ${hoveredInsertIndex === index ? 'pl-8' : ''}`}
                          draggable={true}
                          onDragStart={(e) => handleStageDragStart(e, stage.id)}
                          onDragEnd={handleStageDragEnd}
                          onDragOver={(e) => handleStageHover(e, index)}
                          onDrop={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            const mouseX = e.clientX - rect.left
                            const stageWidth = rect.width
                            const dropIndex = mouseX < stageWidth / 2 ? index : index + 1
                            handleStageDrop(e, dropIndex)
                          }}
                        >
                        {/* Insert zone overlay - absolute positioned on right edge, always visible */}
                        {index < journeyMap.stages.length - 1 && (
                          <div
                            className="absolute -right-6 top-0 w-12 h-full bg-transparent cursor-pointer group/insert flex items-center justify-center z-30 transition-all duration-200"
                            onMouseEnter={() => setHoveredInsertIndex(index + 1)}
                            onMouseLeave={() => setHoveredInsertIndex(null)}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleInsertStageAt(index + 1)
                            }}
                          >
                            <PlusIcon className="w-5 h-5 text-slate-600 opacity-0 group-hover/insert:opacity-100 transition-opacity duration-200" />
                          </div>
                        )}
                        {/* Drop indicator lines */}
                        {isDraggingStage && draggedStageId !== stage.id && (
                          <>
                            {dropTargetIndex === index && (
                              <div className="absolute left-0 top-0 w-1 h-full bg-slate-700 z-20"></div>
                            )}
                            {dropTargetIndex === index + 1 && (
                              <div className="absolute right-0 top-0 w-1 h-full bg-slate-700 z-20"></div>
                            )}
                          </>
                        )}
                        <div className="flex items-center justify-between">
                          <InlineEdit
                            value={stage.name}
                            onChange={(newName) => handleStageNameChange(stage.id, newName)}
                            inputClassName="w-full"
                            placeholder="Stage name"
                            variant="stage-title"
                          />
                          {isAdvancedMode && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2" data-dropdown>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveDropdown(activeDropdown === `stage-${stage.id}` ? null : `stage-${stage.id}`)
                              }}
                              className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded flex items-center justify-center"
                              title={showTooltips ? "Stage actions" : undefined}
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
                          )}
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
                      </React.Fragment>
                    ))}
                    <th className={`w-12 ${isCompactView ? 'p-2' : 'p-4'} bg-slate-50 align-middle border border-gray-300 border-b-2`} rowSpan={journeyMap.rows.length + 1}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddStage}
                        className="w-8 h-8 p-0"
                        title={showTooltips ? "Lägg till steg" : undefined}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                    </th>
                  </tr>
                </thead>
                
                {/* Content Rows */}
                <tbody>
                  {/* Insertion zone at top - drag & drop mode only */}
                  {isDragDropMode && (
                    <RowInsertionZone
                      key={`insertion-0-${journeyMap.rows.length}`}
                      onDropBlock={handleDropBlockAtIndex}
                      insertIndex={0}
                      stageCount={journeyMap.stages.length}
                      showAlways={false}
                    />
                  )}

                  {journeyMap.rows.map((row, rowIndex) => {
                    // First row should always be sticky (this is the Actions row)
                    const isFirstRow = rowIndex === 0
                    return (
                    <React.Fragment key={`row-section-${row.id}`}>
                      <tr key={row.id} className={`border-b-2 border-gray-200 ${isFirstRow ? 'sticky top-0 z-10 bg-white' : ''}`}>
                      <td
                        className={`${isCompactView ? 'p-2' : 'p-4'} border-r border-gray-300 border-l-4 ${isFirstRow ? 'bg-white' : 'bg-slate-50'} group relative hover:bg-white transition-colors`}
                        style={{
                          ...(isFirstRow ? { backgroundColor: 'white' } : {}),
                          borderLeftColor: (() => {
                            // Get the base color without opacity
                            const parts = row.color.split('/')
                            const baseColor = parts[0]

                            // Map Kustra colors to border colors based on intensity mode
                            const borderColorMap: Record<string, { vibrant: string; subtle: string }> = {
                              // 8 Kustra colors
                              'bg-[#F9FAFB]': { vibrant: '#F9FAFB', subtle: '#FBFCFC' },
                              'bg-[#778DB0]': { vibrant: '#778DB0', subtle: '#A3B2C9' },
                              'bg-[#77BB92]': { vibrant: '#77BB92', subtle: '#A3D2B7' },
                              'bg-[#F4C542]': { vibrant: '#F4C542', subtle: '#F7D976' },
                              'bg-[#ED6B5A]': { vibrant: '#ED6B5A', subtle: '#F39A8E' },
                              'bg-[#A67FB5]': { vibrant: '#A67FB5', subtle: '#BFA0CA' },
                              'bg-[#E89FAB]': { vibrant: '#E89FAB', subtle: '#EFBCC4' },
                              'bg-[#8A8A8A]': { vibrant: '#8A8A8A', subtle: '#B1B1B1' }
                            }

                            if (borderColorMap[baseColor]) {
                              return colorIntensity === 'vibrant'
                                ? borderColorMap[baseColor].vibrant
                                : borderColorMap[baseColor].subtle
                            }

                            return '#D1D5DB' // gray-300 fallback
                          })()
                        }}
                        data-onboarding={rowIndex === 0 ? "categories" : undefined}
                      >
                        <div className="flex items-start space-x-2">
                          {/* Expand/collapse button for sublanes */}
                          {row.sublanes && row.sublanes.length > 0 && (
                            <button
                              onClick={() => handleToggleExpanded(row.id)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0 mt-1"
                              title={row.isExpanded !== false ? "Collapse sublanes" : "Expand sublanes"}
                            >
                              {row.isExpanded !== false ? (
                                <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                              ) : (
                                <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                              )}
                            </button>
                          )}

                          <div className="space-y-1 flex-1">
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
                        </div>

                        {/* Row actions dropdown - appears on hover */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200" data-dropdown>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveDropdown(activeDropdown === `row-${row.id}` ? null : `row-${row.id}`)
                            }}
                            className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded flex items-center justify-center"
                            title={showTooltips ? "Row actions" : undefined}
                          >
                            <MoreVertical className="w-3 h-3" />
                          </button>

                          {/* Dropdown menu */}
                          {activeDropdown === `row-${row.id}` && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-32 z-50">
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
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleAddSublane(row.id)
                                  setActiveDropdown(null)
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-gray-900 hover:text-gray-900"
                              >
                                <LayersIcon className="w-3 h-3" />
                                Add sublane
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
                          className={`${isCompactView ? 'p-1' : 'p-2'} align-top ${isFirstRow ? 'bg-white' : ''}`}
                          colSpan={journeyMap.stages.length}
                          style={isFirstRow ? {backgroundColor: 'white'} : {}}
                        >
                          <JourneyMapCellComponent
                            content={row.cells.map(c => c.content).join(',')}
                            type={row.type}
                            backgroundColor={row.color}
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
                        <SortableContext
                          items={row.cells.map(cell => cell.id)}
                          strategy={horizontalListSortingStrategy}
                        >
                          {row.cells.map((cell, cellIndex) => {
                            // Skip rendering if this cell is covered by a previous spanning cell
                            let isSkipped = false
                            for (let i = 0; i < cellIndex; i++) {
                              const prevCell = row.cells[i]
                              const prevColSpan = prevCell.colSpan || 1
                              if (i + prevColSpan > cellIndex) {
                                isSkipped = true
                                break
                              }
                            }

                            if (isSkipped) return null

                            return (
                          <React.Fragment key={cell.id}>
                            <td
                              className={`${isCompactView ? 'p-1' : 'p-2'} align-middle group relative transition-all duration-200 ${isFirstRow ? 'bg-white' : ''} ${hoveredInsertIndex === cellIndex + 1 ? 'pr-8' : ''} ${hoveredInsertIndex === cellIndex ? 'pl-8' : ''}`}
                            data-onboarding={rowIndex === 0 && cellIndex === 0 ? "cells" : undefined}
                            colSpan={cell.colSpan || 1}
                            style={isFirstRow ? {backgroundColor: 'white'} : {}}
                            onDragOver={(e) => handleStageHover(e, cellIndex)}
                            onDrop={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect()
                              const mouseX = e.clientX - rect.left
                              const cellWidth = rect.width
                              const dropIndex = mouseX < cellWidth / 2 ? cellIndex : cellIndex + 1
                              handleStageDrop(e, dropIndex)
                            }}
                          >
                            {/* Insert zone overlay - absolute positioned on right edge, always visible */}
                            {cellIndex < journeyMap.stages.length - 1 && (
                              <div
                                className="absolute -right-6 top-0 w-12 h-full bg-transparent cursor-pointer group/insert flex items-center justify-center z-30 transition-all duration-200"
                                onMouseEnter={() => setHoveredInsertIndex(cellIndex + 1)}
                                onMouseLeave={() => setHoveredInsertIndex(null)}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleInsertStageAt(cellIndex + 1)
                                }}
                              >
                                <PlusIcon className="w-5 h-5 text-slate-600 opacity-0 group-hover/insert:opacity-100 transition-opacity duration-200" />
                              </div>
                            )}
                            {/* Drop indicator lines for cells */}
                            {isDraggingStage && (
                              <>
                                {dropTargetIndex === cellIndex && (
                                  <div className="absolute left-0 top-0 w-1 h-full bg-slate-700 z-20"></div>
                                )}
                                {dropTargetIndex === cellIndex + 1 && (
                                  <div className="absolute right-0 top-0 w-1 h-full bg-slate-700 z-20"></div>
                                )}
                              </>
                            )}
                            <JourneyMapCellComponent
                              id={cell.id}
                              content={cell.content}
                              type={row.type}
                              backgroundColor={cell.backgroundColor || row.color}
                              selectedIcon={cell.icon}
                              onChange={(content) => handleCellChange(row.id, cell.id, content)}
                              onIconChange={(icon) => handleIconChange(row.id, cell.id, icon)}
                              onColorChange={(backgroundColor) => handleColorChange(row.id, cell.id, backgroundColor)}
                              onClear={() => handleCellClear(row.id, cell.id)}
                              placeholder=""
                              colSpan={cell.colSpan}
                              onColSpanChange={(colSpan) => handleCellColSpanChange(row.id, cell.id, colSpan)}
                              isDraggable={true}
                              position={cell.position}
                              showEmptyState={!cell.content}
                              isCritical={cell.isCritical}
                              onCriticalChange={(isCritical) => handleCriticalChange(row.id, cell.id, isCritical)}
                              insightIds={cell.insightIds}
                              insights={insights}
                              onInsightAttach={(insightId) => handleInsightAttach(row.id, cell.id, insightId)}
                              onInsightRemove={(insightId) => handleInsightRemove(row.id, cell.id, insightId)}
                              onInsightClick={(insightId) => handleInsightClick(insightId, row.id, cell.id)}
                              rowId={row.id}
                            />

                            {/* Cell actions dropdown - appears on hover */}
                            {isAdvancedMode && (
                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-all duration-200" data-dropdown>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveDropdown(activeDropdown === `cell-${cell.id}` ? null : `cell-${cell.id}`)
                                }}
                                className="w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded flex items-center justify-center"
                                title={showTooltips ? "Cell actions" : undefined}
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
                            )}
                          </td>
                          </React.Fragment>
                            )
                          })}
                        </SortableContext>
                      )}
                      </tr>

                      {/* Sublanes - render if row has sublanes and is expanded */}
                      {row.sublanes && row.sublanes.length > 0 && row.isExpanded !== false && row.sublanes.map((sublane) => (
                        <tr key={sublane.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors group/sublane">
                          {/* Sublane header cell */}
                          <td className={`${isCompactView ? 'p-2' : 'p-3'} border-r border-gray-300`}>
                            <div className="flex items-center space-x-2 ml-8">
                              {/* Visual hierarchy indicator */}
                              <div className="w-1 h-4 bg-blue-300 rounded-sm flex-shrink-0"></div>

                              {/* Sublane name - editable */}
                              <input
                                type="text"
                                value={sublane.name}
                                onChange={(e) => handleSublaneNameChange(row.id, sublane.id, e.target.value)}
                                className="text-sm text-gray-700 bg-transparent border-none outline-none hover:bg-white focus:bg-white rounded px-1 py-0.5 flex-1 min-w-0"
                                placeholder="Sublane name"
                              />

                              {/* Delete button */}
                              <button
                                onClick={() => handleDeleteSublane(row.id, sublane.id)}
                                className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover/sublane:opacity-100 transition-all"
                                title="Delete sublane"
                              >
                                <TrashIcon className="h-3 w-3" />
                              </button>
                            </div>
                          </td>

                          {/* Sublane cells - only show cards where parent row has content OR backgroundColor */}
                          {sublane.cells.map((cell, cellIndex) => {
                            const parentCell = row.cells[cellIndex]

                            // DEBUG: Log parent cell state
                            console.log(`[RENDER] Cell ${cellIndex}:`, {
                              hasContent: !!parentCell?.content,
                              hasBgColor: !!parentCell?.backgroundColor,
                              bgColor: parentCell?.backgroundColor,
                              sublaneBgColor: cell.backgroundColor
                            })

                            const shouldShowCard = Boolean(parentCell?.content || parentCell?.backgroundColor)
                            // ALWAYS calculate backgroundColor from parent at render time
                            // This ensures correct color in both subtle and vibrant modes
                            const cardColor = getSublaneCardColor(row, cellIndex, colorIntensity === 'vibrant')

                            return (
                              <td
                                key={cell.id || `${sublane.id}-cell-${cellIndex}`}
                                className={`${isCompactView ? 'p-1' : 'p-2'} ${isFirstRow ? 'bg-white' : ''}`}
                                style={isFirstRow ? {backgroundColor: 'white'} : {}}
                              >
                                {shouldShowCard ? (
                                  <JourneyMapCellComponent
                                    id={cell.id || `${sublane.id}-cell-${cellIndex}`}
                                    content={cell.content}
                                    type={row.type}
                                    onChange={(content) => handleSublaneCellChange(row.id, sublane.id, cellIndex, content)}
                                    selectedIcon={cell.icon}
                                    onIconChange={(icon) => handleSublaneCellIconChange(row.id, sublane.id, cellIndex, icon)}
                                    backgroundColor={cardColor}
                                    placeholder="Add details..."
                                    stageCount={journeyMap.stages.length}
                                    disableColorConversion={true}
                                  />
                                ) : (
                                  // Empty cell - no card shown
                                  <div className="h-full min-h-[40px]"></div>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ))}

                      {/* Insertion zone after each row - drag & drop mode only */}
                      {/* Don't show if it's the last row (final drop zone handles that) */}
                      {isDragDropMode && rowIndex < journeyMap.rows.length - 1 && (
                        <RowInsertionZone
                          key={`insertion-${rowIndex + 1}-${journeyMap.rows.length}`}
                          onDropBlock={handleDropBlockAtIndex}
                          insertIndex={rowIndex + 1}
                          stageCount={journeyMap.stages.length}
                        />
                      )}

                    </React.Fragment>
                  )
                  })}

                  {/* Final drop zone at the bottom - visible only when dragging */}
                  {isDragDropMode && (
                    <RowInsertionZone
                      key={`insertion-final-${journeyMap.rows.length}`}
                      onDropBlock={handleDropBlockAtIndex}
                      insertIndex={journeyMap.rows.length}
                      stageCount={journeyMap.stages.length}
                      showAlways={false}
                      isLastZone={true}
                    />
                  )}

                </tbody>
              </table>
                  </DndContext>
            </div>

            {/* Plus Button inside Card - only in plus button mode */}
            {!isDragDropMode && (
              <div
                onClick={() => {
                  setEditingRow(null)
                  setIsRowEditorOpen(true)
                }}
                className="m-4 border-2 border-dashed border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 transition-all duration-200 rounded-lg p-4 flex justify-center cursor-pointer"
              >
                <PlusIcon className="h-5 w-5 text-gray-400" />
              </div>
            )}
          </CardContent>
          </Card>
              </div>
            </div>
        </div>
      </div>
        </div>

      {/* Persona Selection Modal */}
      <Modal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
        title={showTooltips ? t('journeyMap.persona.selectPersonaModalTitle') : undefined}
      >
        <div className="space-y-4">
          {samplePersonas.length > 0 && (
            <p className="text-sm text-gray-600">
              {t('journeyMap.persona.selectPersonaModalDescription')}
            </p>
          )}
          <div className="space-y-2">
            {samplePersonas.length > 0 ? (
              samplePersonas.map((persona) => (
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
              ))
            ) : (
              <div className="text-center py-8">
                <UserIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-sm text-gray-500 mb-4">
                  {t('journeyMap.persona.noPersonasAvailable')}
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsPersonaModalOpen(false)}>
              {t('journeyMap.persona.cancel')}
            </Button>
            <Link href="/personas">
              <Button variant="primary">
                <PlusIcon className="mr-2 h-4 w-4" />
                {t('journeyMap.persona.createNewPersona')}
              </Button>
            </Link>
          </div>
        </div>
      </Modal>

      {/* Row Editor Modal */}
      <RowEditor
        isOpen={isRowEditorOpen}
        onClose={() => setIsRowEditorOpen(false)}
        row={editingRow}
        onSave={handleSaveRow}
        onDelete={editingRow ? () => handleDeleteRow(editingRow.id) : undefined}
        isNewRow={!editingRow}
      />

      {/* Onboarding Component */}
      <JourneyMapOnboarding
        isActive={isOnboardingActive}
        onComplete={() => setIsOnboardingActive(false)}
        onSkip={() => setIsOnboardingActive(false)}
      />
    </div>
  )

  return (
    <>
      <DragDropProvider>
        {content}
      </DragDropProvider>

      {/* Zoom Indicator */}
      {showZoomIndicator && (
        <div className="fixed bottom-6 right-6 bg-white border border-gray-200 text-gray-900 px-4 py-2 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center space-x-2">
            <ZoomIn className="w-4 h-4 text-gray-600" />
            <span className="text-lg font-medium">{zoom}%</span>
          </div>
        </div>
      )}

      {/* Insight Details Drawer */}
      <InsightDetailsDrawer
        isOpen={isInsightDrawerOpen}
        onClose={() => {
          setIsInsightDrawerOpen(false)
          setSelectedInsight(null)
          setSelectedInsightCellId(null)
          setSelectedInsightRowId(null)
        }}
        insight={selectedInsight}
        onRemoveFromCell={() => {
          if (selectedInsight && selectedInsightRowId && selectedInsightCellId) {
            handleInsightRemove(selectedInsightRowId, selectedInsightCellId, selectedInsight.id)
          }
        }}
        onEdit={() => {
          // TODO: Implement edit functionality
          console.log('Edit insight:', selectedInsight)
        }}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={3000}
      />
    </>
  )
}