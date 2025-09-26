'use client'

import { useDrop } from 'react-dnd'
import { useState, useEffect } from 'react'
import { useDragContext } from '@/components/journey/DragDropProvider'

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
}

export function RowInsertionZone({
  onDropBlock,
  insertIndex,
  stageCount,
  showAlways = false
}: RowInsertionZoneProps) {
  const { isDragging } = useDragContext()

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
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
  }), [insertIndex, onDropBlock])

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
    <tr className="h-6 group relative">
      <td
        ref={drop as any}
        colSpan={stageCount + 2}
        className={`
          p-1 transition-all duration-100 relative cursor-pointer
          ${isActive
            ? 'bg-slate-100 border-slate-300'
            : 'bg-slate-50/20 hover:bg-slate-50/40'
          }
        `}
        title={`Drop zone ${insertIndex}`}
      >
        {/* Drop indicator */}
        {isActive && (
          <div className="w-full h-1 bg-slate-600 rounded-full mx-auto" />
        )}
        {!isActive && (
          <div className="w-full h-px bg-slate-200/60 mx-auto" />
        )}
      </td>
    </tr>
  )
}