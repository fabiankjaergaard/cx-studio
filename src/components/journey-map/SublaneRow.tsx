'use client'

/**
 * SublaneRow Component
 *
 * Renders a single sublane row beneath a parent journey map row.
 *
 * Visual Design:
 * - Always white background (matching parent row)
 * - Shows cards only where parent row has content
 * - Cards inherit parent row's color
 * - Indented to show hierarchy
 */

import React from 'react'
import { JourneyMapSublane, JourneyMapRow } from '@/types/journey-map'
import { JourneyMapCell } from './JourneyMapCell'
import { TrashIcon } from 'lucide-react'
import { shouldShowSublaneCard, getSublaneCardColor } from '@/utils/sublaneHelpers'

interface SublaneRowProps {
  sublane: JourneyMapSublane
  parentRow: JourneyMapRow
  stageCount: number
  onCellChange: (sublaneId: string, cellIndex: number, content: string) => void
  onCellIconChange?: (sublaneId: string, cellIndex: number, icon: string) => void
  onDelete?: (sublaneId: string) => void
  onNameChange?: (sublaneId: string, name: string) => void
  isCompactView?: boolean
}

export function SublaneRow({
  sublane,
  parentRow,
  stageCount,
  onCellChange,
  onCellIconChange,
  onDelete,
  onNameChange,
  isCompactView = false
}: SublaneRowProps) {
  // Track color intensity mode
  const [colorIntensity, setColorIntensity] = React.useState<'subtle' | 'vibrant'>('subtle')

  // Load and listen for color intensity changes
  React.useEffect(() => {
    const loadColorIntensity = () => {
      const saved = localStorage.getItem('cx-app-color-intensity')
      if (saved === 'vibrant' || saved === 'subtle') {
        setColorIntensity(saved)
      }
    }

    const handleColorIntensityChange = (event: Event) => {
      const customEvent = event as CustomEvent<'subtle' | 'vibrant'>
      setColorIntensity(customEvent.detail)
    }

    loadColorIntensity()
    window.addEventListener('color-intensity-change', handleColorIntensityChange)

    return () => {
      window.removeEventListener('color-intensity-change', handleColorIntensityChange)
    }
  }, [])

  // Ensure we have cells for all stages - always use fresh data from parent
  const cells = React.useMemo(() => {
    const existingCells = sublane.cells || []
    const cellsArray = []
    const isVibrant = colorIntensity === 'vibrant'

    for (let i = 0; i < stageCount; i++) {
      const existingCell = existingCells[i]
      const parentCell = parentRow.cells[i]

      // ALWAYS recalculate backgroundColor from parent cell at render time
      // This ensures color changes when switching between subtle/vibrant
      const parentColor = getSublaneCardColor(parentRow, i, isVibrant)

      if (existingCell) {
        cellsArray.push({
          ...existingCell,
          // ALWAYS use fresh backgroundColor calculated from parent
          // Never trust saved backgroundColor as it may be from wrong mode
          backgroundColor: parentColor
        })
      } else {
        cellsArray.push({
          id: `${sublane.id}-cell-${i}`,
          content: '',
          backgroundColor: parentColor
        })
      }
    }

    return cellsArray
  }, [
    sublane.cells,
    sublane.id,
    stageCount,
    parentRow.cells,
    colorIntensity,
    // Force re-render when any parent cell's backgroundColor changes
    JSON.stringify(parentRow.cells.map(c => ({ bg: c?.backgroundColor, content: c?.content })))
  ])

  return (
    <div className="flex items-stretch border-b border-gray-100 bg-white group/sublane hover:bg-gray-50 transition-colors">
      {/* Sublane header - indented to show hierarchy */}
      <div className="w-56 px-4 py-2 border-r border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2 ml-6 flex-1">
          {/* Visual indicator for sublane hierarchy */}
          <div className="w-1 h-4 bg-blue-300 rounded-sm flex-shrink-0"></div>

          {/* Sublane name - editable */}
          <input
            type="text"
            value={sublane.name}
            onChange={(e) => onNameChange?.(sublane.id, e.target.value)}
            className="text-sm text-gray-700 bg-transparent border-none outline-none hover:bg-white focus:bg-white rounded px-1 py-0.5 flex-1 min-w-0"
            placeholder="Sublane name"
          />
        </div>

        {/* Delete button - appears on hover */}
        {onDelete && (
          <button
            onClick={() => onDelete(sublane.id)}
            className="p-1 text-gray-400 hover:text-[#ED6B5A] opacity-0 group-hover/sublane:opacity-100 transition-all"
            title="Delete sublane"
          >
            <TrashIcon className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Sublane cells */}
      <div className="flex-1 flex">
        {cells.map((cell, cellIndex) => {
          // Only show card if parent row has content OR backgroundColor in this column
          const showCard = shouldShowSublaneCard(parentRow, cellIndex)
          // Use cell's backgroundColor directly instead of recalculating
          const cardColor = cell.backgroundColor || getSublaneCardColor(parentRow, cellIndex)

          return (
            <div
              key={cellIndex}
              className="flex-1 p-2 border-r border-gray-200 last:border-r-0"
            >
              {showCard ? (
                <JourneyMapCell
                  id={cell.id}
                  content={cell.content}
                  type={parentRow.type}
                  onChange={(content) => onCellChange(sublane.id, cellIndex, content)}
                  onIconChange={(icon) => onCellIconChange?.(sublane.id, cellIndex, icon)}
                  selectedIcon={cell.icon}
                  backgroundColor={cardColor}
                  placeholder="Add details..."
                  stageCount={stageCount}
                  disableColorConversion={true}
                />
              ) : (
                // Empty cell - no card shown
                <div className="h-full min-h-[40px]"></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
