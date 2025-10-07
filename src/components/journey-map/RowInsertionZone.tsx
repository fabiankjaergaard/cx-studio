'use client'

import { useDrop } from 'react-dnd'
import { useState, useEffect } from 'react'
import { useDragContext } from '@/components/journey/DragDropProvider'
import { PlusIcon } from 'lucide-react'

interface DroppedItem {
  rowType: string
  name: string
  description: string
  color: string
}

interface RowInsertionZoneProps {
  onDropBlock: (item: DroppedItem, insertIndex: number) => void
  insertIndex: number
  stageCount: number
  showAlways?: boolean
  onClickAdd?: () => void
}

export function RowInsertionZone({
  onDropBlock,
  insertIndex,
  stageCount,
  showAlways = false,
  onClickAdd
}: RowInsertionZoneProps) {
  const { isDragging } = useDragContext()

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'ROW_TYPE_BLOCK',
    drop: (item: DroppedItem) => {
      console.log('RowInsertionZone drop triggered:', item, 'at index:', insertIndex)
      onDropBlock(item, insertIndex)
      return undefined // Explicitly return undefined to prevent propagation
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }, [insertIndex, onDropBlock])

  const isActive = isOver && canDrop
  const shouldShow = showAlways || (isDragging && (isActive || isOver))

  // Debug logging
  useEffect(() => {
    if (isOver || canDrop) {
      console.log(`Zone ${insertIndex} - isOver: ${isOver}, canDrop: ${canDrop}, isDragging: ${isDragging}`)
    }
  }, [isOver, canDrop, isDragging, insertIndex])

  // Invisible drop target when not dragging
  if (!shouldShow) {
    return (
      <tr className="h-1 group relative">
        <td
          ref={drop as any}
          colSpan={stageCount + 2}
          className="bg-transparent"
          title="Dra och släpp nya rader här"
        >
        </td>
      </tr>
    )
  }

  return (
    <tr className="h-8 group/insertion relative">
      <td
        ref={drop as any}
        colSpan={stageCount + 2}
        className="p-0 relative"
      >
        {/* Plus button - visible on hover */}
        <div
          onClick={(e) => {
            if (onClickAdd) {
              e.stopPropagation()
              onClickAdd()
            }
          }}
          className={`
            absolute inset-x-0 h-full flex items-center justify-center cursor-pointer transition-opacity duration-200
            ${isActive ? 'opacity-100' : 'opacity-0 group-hover/insertion:opacity-100'}
          `}
        >
          <div className={`
            border-2 border-dashed rounded-full p-1.5 shadow-md transition-all
            ${isActive
              ? 'bg-slate-100 border-slate-400'
              : 'bg-white border-gray-300 hover:border-slate-400 hover:bg-slate-50'
            }
          `}>
            <PlusIcon className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Drop indicator text - only when dragging */}
        {isActive && (
          <div className="absolute inset-x-0 top-full mt-1 flex items-center justify-center">
            <span className="text-xs font-medium text-slate-700 bg-white px-2 py-1 rounded shadow-sm">
              Drop here to add row
            </span>
          </div>
        )}
      </td>
    </tr>
  )
}