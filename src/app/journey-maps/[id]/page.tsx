'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
  ArrowLeftIcon,
  EditIcon,
  MoreVertical,
  Copy,
  Move
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

export default function JourneyMapBuilderPage() {
  const params = useParams()
  const router = useRouter()
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
      // Create new journey map
      const newJourneyMap: JourneyMapData = {
        id: Date.now().toString(),
        name: 'Ny Journey Map',
        description: '',
        persona: null,
        phases: DEFAULT_JOURNEY_PHASES,
        stages: DEFAULT_JOURNEY_STAGES, // Include all default stages
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
      setJourneyMap(newJourneyMap)
      // Start onboarding for new journey maps
      setIsOnboardingActive(true)
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
  }, [journeyMapId])

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
      <div className="h-full flex">
        {/* Left Palette */}
        <RowTypePalette
          isCollapsed={isPaletteCollapsed}
          onToggleCollapse={() => setIsPaletteCollapsed(!isPaletteCollapsed)}
          className="flex-shrink-0"
          data-onboarding="palette"
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
        title={journeyMap.name} 
        description={journeyMap.description || 'Redigera din customer journey map'}
        actions={
          <div className="flex space-x-2">
            <Link href="/journey-maps">
              <Button variant="outline">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Tillbaka
              </Button>
            </Link>
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
            <Card className="overflow-hidden">
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
                          className={`relative p-2 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 ${phase.color} ${stagesInPhase === 0 ? 'min-w-32' : ''}`}
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
                    <th className="w-48 p-4 text-left text-sm font-medium text-gray-900 border-r border-gray-200">
                      Journey Kategorier
                    </th>
                    {journeyMap.stages.map((stage, index) => (
                      <th key={stage.id} className="min-w-64 p-4 text-left border-r border-gray-200 relative group">
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
                                    // TODO: Implement duplicate stage
                                    setActiveDropdown(null)
                                  }}
                                  className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2"
                                >
                                  <Copy className="w-3 h-3" />
                                  Duplicate
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    // TODO: Implement move stage
                                    setActiveDropdown(null)
                                  }}
                                  className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2"
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
                    <th className="w-12 p-4">
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
                  {/* Insertion zone at top */}
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
                        className={`p-4 border-r border-gray-200 ${row.color} group relative`}
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
                            className="w-6 h-6 bg-gray-400 hover:bg-gray-500 text-white rounded-full flex items-center justify-center shadow-sm"
                            title="Row actions"
                          >
                            <MoreVertical className="w-3 h-3" />
                          </button>

                          {/* Dropdown menu */}
                          {activeDropdown === `row-${row.id}` && (
                            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-32 z-20">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // TODO: Implement duplicate row
                                  setActiveDropdown(null)
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2"
                              >
                                <Copy className="w-3 h-3" />
                                Duplicate
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // TODO: Implement move row
                                  setActiveDropdown(null)
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2"
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
                            className={`p-2 border-r border-gray-200 align-top ${row.color} group relative`}
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
                                className="w-5 h-5 bg-gray-400 hover:bg-gray-500 text-white rounded-full flex items-center justify-center shadow-sm"
                                title="Cell actions"
                              >
                                <MoreVertical className="w-2.5 h-2.5" />
                              </button>

                              {/* Dropdown menu */}
                              {activeDropdown === `cell-${cell.id}` && (
                                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-28 z-20">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      // TODO: Implement copy cell
                                      setActiveDropdown(null)
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 text-xs flex items-center gap-2"
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
                        <td className="p-4"></td>
                      </tr>

                      {/* Insertion zone after each row */}
                      <RowInsertionZone
                        key={`insertion-${rowIndex + 1}-${journeyMap.rows.length}`}
                        onDropBlock={handleDropBlockAtIndex}
                        insertIndex={rowIndex + 1}
                        stageCount={journeyMap.stages.length}
                      />
                    </React.Fragment>
                  ))}
                  
                  {/* Final insertion zone */}
                  <RowInsertionZone
                    key={`insertion-final-${journeyMap.rows.length}`}
                    onDropBlock={handleDropBlockAtIndex}
                    insertIndex={journeyMap.rows.length}
                    stageCount={journeyMap.stages.length}
                  />
                </tbody>
              </table>
            </div>
          </CardContent>
          </Card>
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
        </div>

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