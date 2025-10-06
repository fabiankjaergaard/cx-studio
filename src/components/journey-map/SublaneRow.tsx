'use client'

import React from 'react'
import { JourneyMapSublane } from '@/types/journey-map'
import { JourneyMapCell } from './JourneyMapCell'
import { TrashIcon, GripVerticalIcon } from 'lucide-react'

interface SublaneRowProps {
  sublane: JourneyMapSublane
  stageCount: number
  backgroundColor?: string
  onCellChange: (sublaneId: string, cellIndex: number, content: string) => void
  onCellIconChange?: (sublaneId: string, cellIndex: number, icon: string) => void
  onCellColorChange?: (sublaneId: string, cellIndex: number, color: string) => void
  onDelete: (sublaneId: string) => void
  onNameChange: (sublaneId: string, name: string) => void
}

export function SublaneRow({
  sublane,
  stageCount,
  backgroundColor = 'bg-gray-50',
  onCellChange,
  onCellIconChange,
  onCellColorChange,
  onDelete,
  onNameChange
}: SublaneRowProps) {
  const [isEditingName, setIsEditingName] = React.useState(false)
  const [nameValue, setNameValue] = React.useState(sublane.name)

  // Ensure we have cells for all stages
  const cells = React.useMemo(() => {
    const existingCells = sublane.cells || []
    const cellsArray = []

    for (let i = 0; i < stageCount; i++) {
      cellsArray.push(existingCells[i] || {
        id: `${sublane.id}-cell-${i}`,
        content: '',
        backgroundColor: ''
      })
    }

    return cellsArray
  }, [sublane.cells, sublane.id, stageCount])

  const handleNameSave = () => {
    onNameChange(sublane.id, nameValue)
    setIsEditingName(false)
  }

  return (
    <div className={`flex items-stretch border-b border-gray-200 group hover:bg-opacity-80 transition-all ${backgroundColor}`}>
      {/* Sublane header with indentation */}
      <div className="w-56 px-3 py-2 border-r border-gray-200 flex items-center justify-between bg-opacity-50">
        <div className="flex items-center space-x-2 flex-1">
          <GripVerticalIcon className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-move" />
          <div className="ml-6 flex-1"> {/* Indentation for sublane */}
            {isEditingName ? (
              <input
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onBlur={handleNameSave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNameSave()
                  if (e.key === 'Escape') {
                    setNameValue(sublane.name)
                    setIsEditingName(false)
                  }
                }}
                className="px-2 py-1 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                autoFocus
              />
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors text-left"
              >
                {sublane.name || 'Untitled sublane'}
              </button>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(sublane.id)}
          className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
          title="Delete sublane"
        >
          <TrashIcon className="h-3 w-3" />
        </button>
      </div>

      {/* Sublane cells */}
      <div className="flex-1 flex">
        {cells.map((cell, cellIndex) => (
          <div key={cellIndex} className="flex-1 p-2 border-r border-gray-200 last:border-r-0">
            <JourneyMapCell
              id={cell.id}
              content={cell.content}
              type={sublane.type}
              onChange={(content) => onCellChange(sublane.id, cellIndex, content)}
              onIconChange={(icon) => onCellIconChange?.(sublane.id, cellIndex, icon)}
              onColorChange={(color) => onCellColorChange?.(sublane.id, cellIndex, color)}
              selectedIcon={cell.icon}
              backgroundColor={cell.backgroundColor || sublane.color}
              placeholder="Add content..."
              stageCount={stageCount}
            />
          </div>
        ))}
      </div>
    </div>
  )
}