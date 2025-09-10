'use client'

import { useState } from 'react'
import { useSidebar } from '@/contexts/SidebarContext'
import { Button } from '@/components/ui/Button'
import { PlusIcon } from 'lucide-react'
import { SectionSelector } from './sections/SectionSelector'
import { TouchpointTypeSelector } from './sections/TouchpointTypeSelector'
import { TemplateSelector, TouchpointTemplate } from './sections/TemplateSelector'
import { useJourneyStore } from '@/store/journey-store'
import { TouchpointSection } from './sections/TouchpointSection'
import { PersonaSection } from './sections/PersonaSection'
import { EmotionSection } from './sections/EmotionSection'
import { PainPointsSection } from './sections/PainPointsSection'
import { OpportunitiesSection } from './sections/OpportunitiesSection'
import { MetricsSection } from './sections/MetricsSection'
import { CustomerJourney } from '@/types'

interface JourneySection {
  id: string
  type: string
  subType?: string
}

interface JourneyBuilderProps {
  journey: CustomerJourney
}

export function JourneyBuilder({ journey }: JourneyBuilderProps) {
  const { isCollapsed } = useSidebar()
  const [sections, setSections] = useState<JourneySection[]>([])
  const [isSectionSelectorOpen, setIsSectionSelectorOpen] = useState(false)
  const [isTouchpointTypeSelectorOpen, setIsTouchpointTypeSelectorOpen] = useState(false)
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false)
  const [insertAfterIndex, setInsertAfterIndex] = useState(-1)
  const { createBlankJourney } = useJourneyStore()

  // Section data states
  const [personas, setPersonas] = useState<any>({})
  const [emotions, setEmotions] = useState<Record<string, 'positive' | 'neutral' | 'negative'>>({})
  const [painPoints, setPainPoints] = useState<Record<string, string[]>>({})
  const [opportunities, setOpportunities] = useState<Record<string, string[]>>({})
  const [metrics, setMetrics] = useState<Record<string, any[]>>({})
  const [selectedTouchpointId, setSelectedTouchpointId] = useState<string | null>(null)

  const handleAddSection = (afterIndex: number = -1) => {
    setInsertAfterIndex(afterIndex)
    setIsSectionSelectorOpen(true)
  }

  const handleSelectSection = (sectionType: string) => {
    if (sectionType === 'touchpoints') {
      // Show touchpoint type selector instead of creating section immediately
      setIsSectionSelectorOpen(false)
      setIsTouchpointTypeSelectorOpen(true)
    } else {
      // Create section normally for other types
      createSection(sectionType)
    }
  }

  const createSection = (sectionType: string, subType?: string) => {
    const newSection: JourneySection = {
      id: `section-${Date.now()}`,
      type: sectionType,
      ...(subType && { subType })
    }

    if (insertAfterIndex === -1) {
      // Add to beginning
      setSections([newSection, ...sections])
    } else {
      // Insert after specific index
      const newSections = [...sections]
      newSections.splice(insertAfterIndex + 1, 0, newSection)
      setSections(newSections)
    }
  }

  const handleSelectTouchpointType = (type: 'blank' | 'template') => {
    if (type === 'blank') {
      // Create a blank journey with no touchpoints
      createBlankJourney()
    }
    createSection('touchpoints', type)
  }

  const handleSelectTemplate = (template: TouchpointTemplate) => {
    // Create touchpoints section with template data
    createSection('touchpoints', 'template')
    // TODO: Add template touchpoints to journey store
    console.log('Selected template:', template)
  }

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId))
  }

  const handleTouchpointSelect = (touchpointId: string) => {
    setSelectedTouchpointId(selectedTouchpointId === touchpointId ? null : touchpointId)
  }

  const handleTouchpointEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit touchpoint:', selectedTouchpointId)
  }

  const renderSection = (section: JourneySection, index: number) => {
    const commonProps = {
      id: section.id,
      type: section.type,
      onAddSection: () => handleAddSection(index),
      onDeleteSection: handleDeleteSection,
      canDelete: true
    }

    switch (section.type) {
      case 'touchpoints':
        return (
          <TouchpointSection
            key={section.id}
            {...commonProps}
            journey={journey}
            selectedTouchpointId={selectedTouchpointId || undefined}
            onTouchpointSelect={handleTouchpointSelect}
            onTouchpointEdit={handleTouchpointEdit}
            subType={section.subType}
            sectionId={section.id}
          />
        )
      
      case 'persona':
        return (
          <PersonaSection
            key={section.id}
            {...commonProps}
            persona={personas}
            onUpdate={setPersonas}
          />
        )
      
      case 'emotions':
        return (
          <EmotionSection
            key={section.id}
            {...commonProps}
            journey={journey}
            emotions={emotions}
            onUpdateEmotion={(stageId, emotion) => {
              setEmotions(prev => ({
                ...prev,
                [stageId]: emotion
              }))
            }}
          />
        )
      
      case 'painpoints':
        return (
          <PainPointsSection
            key={section.id}
            {...commonProps}
            journey={journey}
            painPoints={painPoints}
            onUpdatePainPoints={(stageId, stagePainPoints) => {
              setPainPoints(prev => ({
                ...prev,
                [stageId]: stagePainPoints
              }))
            }}
          />
        )
      
      case 'opportunities':
        return (
          <OpportunitiesSection
            key={section.id}
            {...commonProps}
            journey={journey}
            opportunities={opportunities}
            onUpdateOpportunities={(stageId, stageOpportunities) => {
              setOpportunities(prev => ({
                ...prev,
                [stageId]: stageOpportunities
              }))
            }}
          />
        )
      
      case 'metrics':
        return (
          <MetricsSection
            key={section.id}
            {...commonProps}
            journey={journey}
            metrics={metrics}
            onUpdateMetrics={(stageId, stageMetrics) => {
              setMetrics(prev => ({
                ...prev,
                [stageId]: stageMetrics
              }))
            }}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <div className={`mx-auto p-6 space-y-8 transition-all duration-300 ${
      isCollapsed ? 'max-w-none' : 'max-w-7xl'
    }`}>

      {/* Initial Add Section Button (when no sections exist) */}
      {sections.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bygg din Customer Journey</h3>
            <p className="text-gray-500 mb-6">Kom igång genom att lägga till din första sektion</p>
            <Button
              onClick={() => handleAddSection()}
              className="bg-slate-700 hover:bg-slate-800 text-white"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Lägg till första sektionen
            </Button>
          </div>
        </div>
      )}

      {/* Render Sections */}
      {sections.map((section, index) => renderSection(section, index))}

      {/* Section Selector Modal */}
      <SectionSelector
        isOpen={isSectionSelectorOpen}
        onClose={() => setIsSectionSelectorOpen(false)}
        onSelectSection={handleSelectSection}
      />

      {/* Touchpoint Type Selector Modal */}
      <TouchpointTypeSelector
        isOpen={isTouchpointTypeSelectorOpen}
        onClose={() => setIsTouchpointTypeSelectorOpen(false)}
        onSelectType={handleSelectTouchpointType}
        onShowTemplateSelector={() => setIsTemplateSelectorOpen(true)}
      />

      {/* Template Selector Modal */}
      <TemplateSelector
        isOpen={isTemplateSelectorOpen}
        onClose={() => setIsTemplateSelectorOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  )
}