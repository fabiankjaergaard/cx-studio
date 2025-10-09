'use client'

import React, { useState } from 'react'
import { JourneyMapRow, JourneyMapSublane } from '@/types/journey-map'
import { JourneyMapCell } from './JourneyMapCell'
import { SublaneRow } from './SublaneRow'
import {
  TrashIcon,
  EditIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon
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
  activeDropdown?: string | null
  setActiveDropdown?: (dropdown: string | null) => void
  showTooltips?: boolean
  onAddSublane?: (rowId: string) => void
  onDeleteSublane?: (rowId: string, sublaneId: string) => void
  onSublaneCellChange?: (rowId: string, sublaneId: string, cellIndex: number, content: string) => void
  onSublaneCellIconChange?: (rowId: string, sublaneId: string, cellIndex: number, icon: string) => void
  onSublaneNameChange?: (rowId: string, sublaneId: string, name: string) => void
  onToggleExpanded?: (rowId: string) => void
}

export function RowWithSublanes({
  row,
  stageCount,
  onCellChange,
  onCellIconChange,
  onCellColorChange,
  onRowDelete,
  onRowEdit,
  onAddSublane,
  onDeleteSublane,
  onSublaneCellChange,
  onSublaneCellIconChange,
  onSublaneNameChange,
  onToggleExpanded
}: RowWithSublanesProps) {

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

  const sublanes = row.sublanes || []
  const hasSublanes = sublanes.length > 0
  const isExpanded = row.isExpanded ?? true

  return (
    <>
      <div className={`flex items-stretch border-b border-gray-200 group transition-all ${row.color || 'bg-white'}`}>
        {/* Row header */}
        <div className="w-56 px-4 py-3 border-r border-gray-200 flex items-center justify-between relative">
          <div className="flex items-center space-x-2 flex-1">
            {/* Expand/collapse button for sublanes */}
            {hasSublanes && onToggleExpanded && (
              <button
                onClick={() => onToggleExpanded(row.id)}
                className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
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
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1">
            {onAddSublane && (
              <button
                onClick={() => onAddSublane(row.id)}
                className="p-1 text-gray-400 hover:text-[#778DB0] opacity-0 group-hover:opacity-100 transition-all"
                title="Add sublane"
              >
                <PlusIcon className="h-3 w-3" />
              </button>
            )}
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
                className="p-1 text-gray-400 hover:text-[#C45A49] opacity-0 group-hover:opacity-100 transition-all"
                title="Delete row"
              >
                <TrashIcon className="h-3 w-3" />
              </button>
            )}
          </div>
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

      {/* Sublanes - only show when expanded */}
      {hasSublanes && isExpanded && sublanes.map((sublane) => (
        <SublaneRow
          key={sublane.id}
          sublane={sublane}
          parentRow={row}
          stageCount={stageCount}
          onCellChange={(sublaneId, cellIndex, content) =>
            onSublaneCellChange?.(row.id, sublaneId, cellIndex, content)
          }
          onCellIconChange={(sublaneId, cellIndex, icon) =>
            onSublaneCellIconChange?.(row.id, sublaneId, cellIndex, icon)
          }
          onDelete={(sublaneId) => onDeleteSublane?.(row.id, sublaneId)}
          onNameChange={(sublaneId, name) => onSublaneNameChange?.(row.id, sublaneId, name)}
        />
      ))}
    </>
  )
}