'use client'

import { useState, useEffect } from 'react'
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
  EditIcon
} from 'lucide-react'
import Link from 'next/link'
import { JourneyMapData, JourneyMapCell, JourneyMapRow, JourneyMapStage, DEFAULT_JOURNEY_CATEGORIES, DEFAULT_JOURNEY_STAGES } from '@/types/journey-map'
import { JourneyMapCell as JourneyMapCellComponent } from '@/components/journey-map/JourneyMapCell'
import { RowEditor } from '@/components/journey-map/RowEditor'

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

  // Initialize journey map data
  useEffect(() => {
    if (journeyMapId === 'new') {
      // Create new journey map
      const newJourneyMap: JourneyMapData = {
        id: Date.now().toString(),
        name: 'Ny Journey Map',
        description: '',
        persona: null,
        stages: DEFAULT_JOURNEY_STAGES.slice(0, 4), // Start with 4 stages
        rows: DEFAULT_JOURNEY_CATEGORIES.map(category => ({
          id: category.id,
          category: category.name,
          description: category.description,
          type: category.type,
          color: category.color,
          cells: DEFAULT_JOURNEY_STAGES.slice(0, 4).map(stage => ({
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
        stages: DEFAULT_JOURNEY_STAGES.slice(0, 5),
        rows: DEFAULT_JOURNEY_CATEGORIES.map(category => ({
          id: category.id,
          category: category.name,
          description: category.description,
          type: category.type,
          color: category.color,
          cells: DEFAULT_JOURNEY_STAGES.slice(0, 5).map(stage => ({
            id: `${category.id}-${stage.id}`,
            content: category.id === 'actions' ? 'Exempel innehåll...' : category.id === 'emotions' ? '😊 😐' : ''
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

  const handleAddStage = () => {
    if (!journeyMap) return
    
    const newStageId = `stage-${Date.now()}`
    const newStage: JourneyMapStage = {
      id: newStageId,
      name: `Steg ${journeyMap.stages.length + 1}`,
      description: ''
    }
    
    setJourneyMap({
      ...journeyMap,
      stages: [...journeyMap.stages, newStage],
      rows: journeyMap.rows.map(row => ({
        ...row,
        cells: [...row.cells, { 
          id: `${row.id}-${newStageId}`, 
          content: row.type === 'emoji' ? '😐' : '' 
        }]
      })),
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

  const handleStageNameChange = (stageIndex: number, name: string) => {
    if (!journeyMap) return
    
    setJourneyMap({
      ...journeyMap,
      stages: journeyMap.stages.map((stage, index) => 
        index === stageIndex ? { ...stage, name } : stage
      ),
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

  const handleEditRow = (row: JourneyMapRow) => {
    setEditingRow(row)
    setIsRowEditorOpen(true)
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
    <div className="h-full flex flex-col">
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
              Inställningar
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
      
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Persona Section */}
        <div className="mb-6">
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
                {/* Header Row */}
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-200">
                    <th className="w-48 p-4 text-left text-sm font-medium text-gray-900 border-r border-gray-200">
                      Journey Kategorier
                    </th>
                    {journeyMap.stages.map((stage, index) => (
                      <th key={stage.id} className="min-w-64 p-4 text-left border-r border-gray-200 relative group">
                        <div className="flex items-center justify-between">
                          <Input
                            value={stage.name}
                            onChange={(e) => handleStageNameChange(index, e.target.value)}
                            className="font-medium bg-transparent border-none p-0 h-auto focus:bg-white focus:border-gray-300"
                          />
                          {journeyMap.stages.length > 2 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveStage(index)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 ml-2"
                              title="Ta bort steg"
                            >
                              <TrashIcon className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{stage.description}</p>
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
                  {journeyMap.rows.map((row, rowIndex) => (
                    <tr key={row.id} className="border-b border-gray-200">
                      <td className={`p-4 border-r border-gray-200 ${row.color} cursor-pointer hover:opacity-80 transition-opacity`} onClick={() => handleEditRow(row)}>
                        <div className="space-y-1">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {row.category}
                          </h4>
                          <p className="text-xs text-gray-500">{row.description}</p>
                          <p className="text-xs text-gray-400 capitalize">{row.type}</p>
                        </div>
                      </td>
                      {row.type === 'emoji' ? (
                        // For emotion curve, create one cell spanning all stages
                        <td 
                          key={`${row.id}-emotion-curve`} 
                          className={`p-2 align-top ${row.color}`}
                          colSpan={journeyMap.stages.length}
                        >
                          <JourneyMapCellComponent
                            content={row.cells.map(c => c.content).join(',')}
                            type={row.type}
                            onChange={(content) => {
                              const emotions = content.split(',').filter(e => e.trim())
                              
                              // Update the journey map state correctly
                              setJourneyMap(prevMap => {
                                if (!prevMap) return prevMap
                                
                                return {
                                  ...prevMap,
                                  rows: prevMap.rows.map(r => {
                                    if (r.id === row.id) {
                                      const updatedCells = r.cells.map((cell, index) => ({
                                        ...cell,
                                        content: emotions[index] || '😐'
                                      }))
                                      return { ...r, cells: updatedCells }
                                    }
                                    return r
                                  }),
                                  updatedAt: new Date().toISOString()
                                }
                              })
                            }}
                            placeholder="Sätt känslokurva..."
                            stageCount={journeyMap.stages.length}
                            isEmotionCurveCell={true}
                          />
                        </td>
                      ) : (
                        // For other types, show individual cells
                        row.cells.map((cell, cellIndex) => (
                          <td key={cell.id} className={`p-2 border-r border-gray-200 align-top ${row.color}`}>
                            <JourneyMapCellComponent
                              content={cell.content}
                              type={row.type}
                              onChange={(content) => handleCellChange(row.id, cell.id, content)}
                              placeholder="Klicka för att redigera..."
                            />
                          </td>
                        ))
                      )}
                      <td className="p-4"></td>
                    </tr>
                  ))}
                  
                  {/* Add Row Button */}
                  <tr className="border-b border-gray-200">
                    <td 
                      className="p-4 border-r border-gray-200 bg-gray-50/50 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={handleAddRow}
                    >
                      <div className="flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">Lägg till rad</span>
                      </div>
                    </td>
                    {journeyMap.stages.map((stage) => (
                      <td key={`empty-${stage.id}`} className="p-2 border-r border-gray-200"></td>
                    ))}
                    <td className="p-4"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
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
        title="Journey Map Inställningar"
      >
        <div className="space-y-6">
          <div>
            <Input
              label="Namn"
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
    </div>
  )
}