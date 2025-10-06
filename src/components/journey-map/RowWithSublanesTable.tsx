'use client'

import React, { useState, useMemo } from 'react'
import { JourneyMapRow, JourneyMapSublane } from '@/types/journey-map'
import { JourneyMapCell } from './JourneyMapCell'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  LayersIcon,
  TrashIcon,
  EditIcon,
  GripVerticalIcon
} from 'lucide-react'
import { InlineEdit } from '@/components/ui/InlineEdit'

interface RowWithSublanesTableProps {
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
  onRowCategoryChange?: (rowId: string, category: string) => void
  onRowDescriptionChange?: (rowId: string, description: string) => void
  onSublanesChange: (rowId: string, sublanes: JourneyMapSublane[]) => void
  onToggleExpand: (rowId: string) => void
}

export function RowWithSublanesTable({
  row,
  rowIndex,
  stageCount,
  isCompactView = false,
  showGridLines = false,
  onCellChange,
  onCellIconChange,
  onCellColorChange,
  onRowDelete,
  onRowEdit,
  onRowCategoryChange,
  onRowDescriptionChange,
  onSublanesChange,
  onToggleExpand
}: RowWithSublanesTableProps) {
  const [showSublaneButton, setShowSublaneButton] = useState(false)
  const [isAddingSublane, setIsAddingSublane] = useState(false)
  const [newSublaneName, setNewSublaneName] = useState('')

  const sublanes = row.sublanes || []
  const isExpanded = row.isExpanded || false
  const hasSublanes = sublanes.length > 0

  // Ensure we have cells for all stages
  const cells = useMemo(() => {
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
      color: 'bg-gray-50',
      cells: Array(stageCount).fill(null).map((_, i) => ({
        id: `sublane-${Date.now()}-cell-${i}`,
        content: ''
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
      <tr
        key={row.id}
        className="border-b-2 border-gray-200 group"
        onMouseEnter={() => setShowSublaneButton(true)}
        onMouseLeave={() => setShowSublaneButton(false)}
      >
        <td
          className={`${isCompactView ? 'p-2' : 'p-4'} ${showGridLines ? 'border-r border-gray-200' : ''} bg-slate-50 group relative hover:bg-white transition-colors`}
          data-onboarding={rowIndex === 0 ? "categories" : undefined}
        >
          <div className="flex items-center space-x-2">
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

            <div className="flex-1 space-y-1">
              {onRowCategoryChange && (
                <InlineEdit
                  value={row.category}
                  onChange={(newCategory) => onRowCategoryChange(row.id, newCategory)}
                  inputClassName="w-full"
                  placeholder="Row category"
                  variant="row-header"
                />
              )}
              {onRowDescriptionChange && (
                <InlineEdit
                  value={row.description}
                  onChange={(newDescription) => onRowDescriptionChange(row.id, newDescription)}
                  inputClassName="w-full"
                  placeholder="Row description"
                  multiline={true}
                  variant="description"
                />
              )}
              {hasSublanes && !isExpanded && (
                <div className="text-xs text-gray-400 mt-1">
                  {sublanes.length} sublane{sublanes.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>

          {/* Sublane button - positioned absolutely */}
          <button
            onClick={() => setIsAddingSublane(true)}
            className={`absolute -bottom-3 left-4 z-10 px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:shadow-md transition-all flex items-center space-x-1 text-xs ${
              showSublaneButton || hasSublanes ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            title="Add sublane"
          >
            <LayersIcon className="h-3 w-3 text-gray-600" />
            <span className="text-gray-700">Add sublane</span>
          </button>
        </td>

        {/* Main row cells */}
        {(row.type === 'emoji' || row.type === 'pain-points' || row.type === 'opportunities' || row.type === 'metrics' || row.type === 'channels') ? (
          // For visualization components, create one cell spanning all stages
          <td
            key={`${row.id}-visualization`}
            className={`${isCompactView ? 'p-1' : 'p-2'} align-top`}
            colSpan={stageCount}
          >
            <JourneyMapCell
              id={`${row.id}-viz`}
              content={row.cells.map(c => c.content).join(',')}
              type={row.type}
              backgroundColor={row.color}
              onChange={(content) => {
                const values = content.split(',').map(e => e.trim())
                values.forEach((value, index) => {
                  if (index < stageCount) {
                    onCellChange(row.id, index, value)
                  }
                })
              }}
              placeholder="Set values..."
              stageCount={stageCount}
              isEmotionCurveCell={row.type === 'emoji'}
            />
          </td>
        ) : (
          // For other types, show individual cells
          cells.map((cell, cellIndex) => (
            <td
              key={cell.id}
              className={`${isCompactView ? 'p-1' : 'p-2'} ${showGridLines ? 'border-r border-gray-200' : ''} align-middle`}
              colSpan={cell.colSpan || 1}
            >
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
              />
            </td>
          ))
        )}
      </tr>

      {/* Sublanes (when expanded) */}
      {isExpanded && sublanes.map((sublane) => (
        <tr key={sublane.id} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 group">
          <td className={`${isCompactView ? 'p-2' : 'p-3'} ${showGridLines ? 'border-r border-gray-200' : ''}`}>
            <div className="flex items-center space-x-2 ml-8">
              <GripVerticalIcon className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-move" />
              <InlineEdit
                value={sublane.name}
                onChange={(name) => handleSublaneNameChange(sublane.id, name)}
                inputClassName="text-sm"
                placeholder="Sublane name"
                variant="sublane"
              />
              <button
                onClick={() => handleDeleteSublane(sublane.id)}
                className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                title="Delete sublane"
              >
                <TrashIcon className="h-3 w-3" />
              </button>
            </div>
          </td>

          {/* Sublane cells */}
          {(sublane.cells || []).map((cell, cellIndex) => (
            <td
              key={`${sublane.id}-cell-${cellIndex}`}
              className={`${isCompactView ? 'p-1' : 'p-2'} ${showGridLines ? 'border-r border-gray-200' : ''}`}
            >
              <JourneyMapCell
                id={cell.id || `${sublane.id}-cell-${cellIndex}`}
                content={cell.content}
                type={sublane.type}
                onChange={(content) => handleSublaneCellChange(sublane.id, cellIndex, content)}
                onIconChange={(icon) => {
                  const updatedSublanes = sublanes.map(s => {
                    if (s.id === sublane.id) {
                      const updatedCells = [...(s.cells || [])]
                      updatedCells[cellIndex] = { ...updatedCells[cellIndex], icon }
                      return { ...s, cells: updatedCells }
                    }
                    return s
                  })
                  onSublanesChange(row.id, updatedSublanes)
                }}
                onColorChange={(color) => {
                  const updatedSublanes = sublanes.map(s => {
                    if (s.id === sublane.id) {
                      const updatedCells = [...(s.cells || [])]
                      updatedCells[cellIndex] = { ...updatedCells[cellIndex], backgroundColor: color }
                      return { ...s, cells: updatedCells }
                    }
                    return s
                  })
                  onSublanesChange(row.id, updatedSublanes)
                }}
                selectedIcon={cell.icon}
                backgroundColor={cell.backgroundColor || sublane.color}
                placeholder="Add content..."
                stageCount={stageCount}
              />
            </td>
          ))}
        </tr>
      ))}

      {/* Add sublane form (when adding) */}
      {isExpanded && isAddingSublane && (
        <tr className="bg-blue-50 border-b border-gray-200">
          <td className={`${isCompactView ? 'p-2' : 'p-3'} ${showGridLines ? 'border-r border-gray-200' : ''}`}>
            <div className="flex items-center space-x-2 ml-8">
              <LayersIcon className="h-4 w-4 text-blue-600" />
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
          </td>
          <td colSpan={stageCount}></td>
        </tr>
      )}
    </>
  )
}