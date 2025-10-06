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
    <tr className="h-8 group relative">
      <td
        ref={drop as any}
        colSpan={stageCount + 2}
        className={`
          p-2 transition-all duration-200 relative cursor-pointer border-2 border-dashed rounded-lg mx-2
          ${isActive
            ? 'bg-slate-100 border-slate-400 shadow-sm'
            : 'bg-slate-50/30 border-slate-200/60 hover:bg-slate-50/50 hover:border-slate-300/80'
          }
        `}
        title={`Drop your block here (position ${insertIndex})`}
      >
        {/* Drop indicator */}
        <div className="flex items-center justify-center space-x-2">
          {isActive && (
            <>
              <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-slate-700">Drop here to add row</span>
              <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse" />
            </>
          )}
          {!isActive && (
            <>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="text-xs text-slate-500">Drop zone</span>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
            </>
          )}
        </div>
      </td>
    </tr>
  )
}