'use client'

import React, { useState } from 'react'
import { JourneyMapRow, JourneyMapSublane } from '@/types/journey-map'
import { JourneyMapCell } from './JourneyMapCell'
import { SublaneRow } from './SublaneRow'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
  LayersIcon,
  TrashIcon,
  EditIcon,
  MoreVertical,
  Copy,
  Move,
  Trash2
} from 'lucide-react'

interface RowWithSublanesProps {
  row: JourneyMapRow
  rowIndex: number
  stageCount: number
  isCompactView?: boolean
  showGridLines?: boolean
  onCellChange: (rowId: string, cellIndex: number, content: string) => void
  onCellIconChange?: (rowId: string, cellIndex: number, icon: string) => void
  onCellColorChange?: (rowId: string, cellIndex: number, color: string) => void
  onRowDelete?: (rowId: string) => void
  onRowEdit?: (rowId: string) => void
  onRowDuplicate?: (rowId: string, rowIndex: number) => void
  onRowMove?: (rowId: string, rowIndex: number) => void
  onRowCategoryChange?: (rowId: string, category: string) => void
  onRowDescriptionChange?: (rowId: string, description: string) => void
  onSublanesChange: (rowId: string, sublanes: JourneyMapSublane[]) => void
  onToggleExpand: (rowId: string) => void
  activeDropdown?: string | null
  setActiveDropdown?: (dropdown: string | null) => void
  showTooltips?: boolean
}

export function RowWithSublanes({
  row,
  stageCount,
  onCellChange,
  onCellIconChange,
  onCellColorChange,
  onRowDelete,
  onRowEdit,
  onSublanesChange,
  onToggleExpand
}: RowWithSublanesProps) {
  const [showSublaneButton, setShowSublaneButton] = useState(false)
  const [isAddingSublane, setIsAddingSublane] = useState(false)
  const [newSublaneName, setNewSublaneName] = useState('')

  const sublanes = row.sublanes || []
  const isExpanded = row.isExpanded || false
  const hasSublanes = sublanes.length > 0

  // Ensure we have cells for all stages
  const cells = React.useMemo(() => {
    const existingCells = row.cells || []
    const cellsArray = []

    for (let i = 0; i < stageCount; i++) {
      cellsArray.push(existingCells[i] || {
        id: `${row.id}-cell-${i}`,
        content: '',
        backgroundColor: ''
      })
    }

    return cellsArray
  }, [row.cells, row.id, stageCount])

  const handleAddSublane = () => {
    if (!newSublaneName.trim()) return

    const newSublane: JourneyMapSublane = {
      id: `sublane-${Date.now()}`,
      parentRowId: row.id,
      name: newSublaneName,
      type: 'text',
      color: '', // NO default color - cells will get ghost color conditionally
      cells: Array(stageCount).fill(null).map((_, i) => ({
        id: `sublane-${Date.now()}-cell-${i}`,
        content: '',
        backgroundColor: '' // Explicitly no background
      }))
    }

    onSublanesChange(row.id, [...sublanes, newSublane])
    setNewSublaneName('')
    setIsAddingSublane(false)

    // Auto-expand when adding first sublane
    if (!isExpanded && sublanes.length === 0) {
      onToggleExpand(row.id)
    }
  }

  const handleDeleteSublane = (sublaneId: string) => {
    onSublanesChange(row.id, sublanes.filter(s => s.id !== sublaneId))
  }

  const handleSublaneCellChange = (sublaneId: string, cellIndex: number, content: string) => {
    const updatedSublanes = sublanes.map(sublane => {
      if (sublane.id === sublaneId) {
        const updatedCells = [...(sublane.cells || [])]
        updatedCells[cellIndex] = {
          ...updatedCells[cellIndex],
          content
        }
        return { ...sublane, cells: updatedCells }
      }
      return sublane
    })
    onSublanesChange(row.id, updatedSublanes)
  }

  const handleSublaneNameChange = (sublaneId: string, name: string) => {
    const updatedSublanes = sublanes.map(sublane =>
      sublane.id === sublaneId ? { ...sublane, name } : sublane
    )
    onSublanesChange(row.id, updatedSublanes)
  }

  return (
    <>
      {/* Main row */}
      <div
        className={`flex items-stretch border-b border-gray-200 group transition-all ${row.color || 'bg-white'}`}
        onMouseEnter={() => setShowSublaneButton(true)}
        onMouseLeave={() => setShowSublaneButton(false)}
      >
        {/* Row header */}
        <div className="w-56 px-4 py-3 border-r border-gray-200 flex items-center justify-between relative">
          <div className="flex items-center space-x-2 flex-1">
            {/* Expand/Collapse button */}
            {hasSublanes && (
              <button
                onClick={() => onToggleExpand(row.id)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                title={isExpanded ? "Collapse sublanes" : "Expand sublanes"}
              >
                {isExpanded ? (
                  <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 text-gray-600" />
                )}
              </button>
            )}

            <div className="flex-1">
              <div className="font-medium text-sm text-gray-900">{row.category}</div>
              {row.description && (
                <div className="text-xs text-gray-500 mt-0.5">{row.description}</div>
              )}
              {hasSublanes && !isExpanded && (
                <div className="text-xs text-gray-400 mt-1">
                  {sublanes.length} sublane{sublanes.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1">
            {onRowEdit && (
              <button
                onClick={() => onRowEdit(row.id)}
                className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all"
                title="Edit row"
              >
                <EditIcon className="h-3 w-3" />
              </button>
            )}
            {onRowDelete && (
              <button
                onClick={() => onRowDelete(row.id)}
                className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                title="Delete row"
              >
                <TrashIcon className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Sublane button - positioned absolutely */}
          {(showSublaneButton || hasSublanes) && (
            <button
              onClick={() => setIsAddingSublane(true)}
              className={`absolute -bottom-3 left-4 z-10 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:shadow-md transition-all flex items-center space-x-1 text-xs ${
                showSublaneButton || hasSublanes ? 'opacity-100' : 'opacity-0'
              }`}
              title="Add sublane"
            >
              <LayersIcon className="h-3 w-3 text-gray-600" />
              <span className="text-gray-700">Add sublane</span>
            </button>
          )}
        </div>

        {/* Main row cells */}
        <div className="flex-1 flex">
          {cells.map((cell, cellIndex) => (
            <div key={cellIndex} className="flex-1 p-2 border-r border-gray-200 last:border-r-0">
              <JourneyMapCell
                id={cell.id}
                content={cell.content}
                type={row.type}
                onChange={(content) => onCellChange(row.id, cellIndex, content)}
                onIconChange={(icon) => onCellIconChange?.(row.id, cellIndex, icon)}
                onColorChange={(color) => onCellColorChange?.(row.id, cellIndex, color)}
                selectedIcon={cell.icon}
                backgroundColor={cell.backgroundColor}
                placeholder="Add content..."
                stageCount={stageCount}
                isEmotionCurveCell={row.type === 'emoji' && row.category === 'Emotions'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sublanes (when expanded) */}
      {isExpanded && sublanes.map((sublane, sublaneIndex) => (
        <SublaneRow
          key={sublane.id}
          sublane={sublane}
          stageCount={stageCount}
          backgroundColor="bg-gray-50"
          parentColor={row.color}
          parentCells={row.cells}
          isFirstSublane={sublaneIndex === 0}
          isLastSublane={sublaneIndex === sublanes.length - 1}
          onCellChange={handleSublaneCellChange}
          onCellIconChange={(sublaneId, cellIndex, icon) => {
            const updatedSublanes = sublanes.map(s => {
              if (s.id === sublaneId) {
                const updatedCells = [...(s.cells || [])]
                updatedCells[cellIndex] = { ...updatedCells[cellIndex], icon }
                return { ...s, cells: updatedCells }
              }
              return s
            })
            onSublanesChange(row.id, updatedSublanes)
          }}
          onCellColorChange={(sublaneId, cellIndex, color) => {
            const updatedSublanes = sublanes.map(s => {
              if (s.id === sublaneId) {
                const updatedCells = [...(s.cells || [])]
                updatedCells[cellIndex] = { ...updatedCells[cellIndex], backgroundColor: color }
                return { ...s, cells: updatedCells }
              }
              return s
            })
            onSublanesChange(row.id, updatedSublanes)
          }}
          onDelete={handleDeleteSublane}
          onNameChange={handleSublaneNameChange}
        />
      ))}

      {/* Add sublane form (when adding) */}
      {isExpanded && isAddingSublane && (
        <div className="flex items-center px-4 py-3 bg-blue-50 border-b border-gray-200">
          <div className="w-56 flex items-center space-x-2">
            <LayersIcon className="h-4 w-4 text-blue-600 ml-10" />
            <input
              type="text"
              value={newSublaneName}
              onChange={(e) => setNewSublaneName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddSublane()
                if (e.key === 'Escape') {
                  setNewSublaneName('')
                  setIsAddingSublane(false)
                }
              }}
              placeholder="Enter sublane name..."
              className="flex-1 px-2 py-1 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleAddSublane}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setNewSublaneName('')
                setIsAddingSublane(false)
              }}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}