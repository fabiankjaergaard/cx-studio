'use client'

import React from 'react'
import { JourneyMapSublane } from '@/types/journey-map'
import { JourneyMapCell } from './JourneyMapCell'
import { TrashIcon, GripVerticalIcon } from 'lucide-react'

interface SublaneRowProps {
  sublane: JourneyMapSublane
  stageCount: number
  backgroundColor?: string
  parentColor?: string
  parentCells?: Array<{ id: string; content: string; backgroundColor?: string; icon?: string }>
  onCellChange: (sublaneId: string, cellIndex: number, content: string) => void
  onCellIconChange?: (sublaneId: string, cellIndex: number, icon: string) => void
  onCellColorChange?: (sublaneId: string, cellIndex: number, color: string) => void
  onDelete: (sublaneId: string) => void
  onNameChange: (sublaneId: string, name: string) => void
  isFirstSublane?: boolean
  isLastSublane?: boolean
}

export function SublaneRow({
  sublane,
  stageCount,
  backgroundColor = 'bg-gray-50',
  parentColor,
  parentCells = [],
  onCellChange,
  onCellIconChange,
  onCellColorChange,
  onDelete,
  onNameChange,
  isFirstSublane = false,
  isLastSublane = false
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

  // Convert Tailwind color to hex/rgb for opacity
  const getColorWithOpacity = React.useMemo(() => {
    return (tailwindColor: string | undefined, opacity: number) => {
      if (!tailwindColor) return `rgba(249, 250, 251, ${opacity})`

      const colorMap: Record<string, string> = {
        'bg-slate-50': `rgba(248, 250, 252, ${opacity})`,
        'bg-blue-200': `rgba(191, 219, 254, ${opacity})`,
        'bg-indigo-200': `rgba(199, 210, 254, ${opacity})`,
        'bg-slate-300': `rgba(203, 213, 225, ${opacity})`,
        'bg-emerald-200': `rgba(167, 243, 208, ${opacity})`,
        'bg-rose-200': `rgba(254, 205, 211, ${opacity})`,
        'bg-amber-200': `rgba(253, 230, 138, ${opacity})`,
        'bg-violet-200': `rgba(221, 214, 254, ${opacity})`,
        'bg-pink-200': `rgba(251, 207, 232, ${opacity})`,
        'bg-cyan-200': `rgba(165, 243, 252, ${opacity})`,
      }
      return colorMap[tailwindColor] || `rgba(249, 250, 251, ${opacity})`
    }
  }, [])

  // Sublane row and header should be WHITE (no background color)
  const rowBackgroundColor = 'white'
  const headerBackgroundColor = 'white'

  const cellBackgroundColor = React.useMemo(() =>
    parentColor ? getColorWithOpacity(parentColor, 0.20) : sublane.color,
    [parentColor, sublane.color, getColorWithOpacity]
  )

  // Debug logging - PARENT DATA
  React.useEffect(() => {
    console.log('🔍 SUBLANE DEBUG:', {
      sublaneName: sublane.name,
      parentColor,
      parentCells,
      parentCellsCount: parentCells?.length,
      cellBackgroundColor
    })
  }, [sublane.name, parentColor, parentCells, cellBackgroundColor])

  return (
    <div className="flex items-stretch border-b border-gray-200 group hover:brightness-95 transition-all relative"
         style={{ backgroundColor: rowBackgroundColor }}>
      {/* Visual connector line - Tree structure */}
      {/* Vertical line */}
      <div
        className="absolute"
        style={{
          left: '32px',
          top: isFirstSublane ? '50%' : '0',
          bottom: isLastSublane ? '50%' : '0',
          width: '2px',
          backgroundColor: parentColor ? getColorWithOpacity(parentColor, 0.6) : 'rgba(148, 163, 184, 0.6)',
          zIndex: 1
        }}
      />
      {/* Horizontal branch */}
      <div
        className="absolute"
        style={{
          left: '32px',
          top: '50%',
          width: '20px',
          height: '2px',
          backgroundColor: parentColor ? getColorWithOpacity(parentColor, 0.6) : 'rgba(148, 163, 184, 0.6)',
          zIndex: 1
        }}
      />

      {/* Sublane header with indentation */}
      <div
        className="w-56 px-3 py-2 border-r border-gray-200 flex items-center justify-between relative"
        style={{ backgroundColor: headerBackgroundColor }}
      >
        <div className="flex items-center space-x-2 flex-1">
          <GripVerticalIcon className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-move ml-4" />
          <div className="ml-2 flex-1"> {/* Indentation for sublane */}
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

      {/* Sublane cells - ghost style with parent color ONLY where parent has content */}
      <div className="flex-1 flex">
        {cells.map((cell, cellIndex) => {
          // Check if corresponding parent cell has content
          const parentCell = parentCells[cellIndex]
          const parentHasContent = parentCell && (parentCell.content || parentCell.icon)

          // Only apply ghost color if parent cell has content
          const shouldShowGhost = parentHasContent && parentColor

          // Debug logging
          console.log(`Cell ${cellIndex}:`, {
            parentCell,
            parentHasContent,
            shouldShowGhost,
            parentColor,
            cellBackgroundColor
          })

          return (
            <div
              key={cellIndex}
              className="flex-1 p-2 border-r border-gray-200 last:border-r-0"
              style={{
                backgroundColor: 'white' // Cell wrapper is always white
              }}
            >
              <JourneyMapCell
                id={cell.id}
                content={cell.content}
                type={sublane.type}
                onChange={(content) => onCellChange(sublane.id, cellIndex, content)}
                onIconChange={(icon) => onCellIconChange?.(sublane.id, cellIndex, icon)}
                onColorChange={(color) => onCellColorChange?.(sublane.id, cellIndex, color)}
                selectedIcon={cell.icon}
                backgroundColor={cell.backgroundColor || (shouldShowGhost ? cellBackgroundColor : 'white')}
                placeholder="Add content..."
                stageCount={stageCount}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}