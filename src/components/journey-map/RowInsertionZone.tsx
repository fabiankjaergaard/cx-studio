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
  isLastZone?: boolean
}

export function RowInsertionZone({
  onDropBlock,
  insertIndex,
  stageCount,
  showAlways = false,
  onClickAdd,
  isLastZone = false
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

  // Debug logging - enhanced for final drop zone
  useEffect(() => {
    if (isOver || canDrop || showAlways) {
      console.log(`Zone ${insertIndex} (showAlways: ${showAlways}) - isOver: ${isOver}, canDrop: ${canDrop}, isDragging: ${isDragging}, isActive: ${isActive}`)
    }
  }, [isOver, canDrop, isDragging, insertIndex, showAlways, isActive])

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
    <tr className="h-10 group/insertion relative">
      <td
        ref={drop as any}
        colSpan={stageCount + 2}
        className="p-0 relative cursor-pointer"
        onClick={(e) => {
          if (onClickAdd) {
            e.stopPropagation()
            onClickAdd()
          }
        }}
      >
        {/* Drop zone indicator line - expands on hover */}
        <div className={`
          absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out
          ${isActive ? 'px-4' : 'px-8'}
        `}>
          <div className={`
            relative w-full transition-all duration-300 ease-out
            ${isActive
              ? 'h-1 bg-slate-400/30 rounded-full'
              : 'h-0.5 bg-gray-300/50 rounded-full opacity-0 group-hover/insertion:opacity-100'
            }
          `}>
            {/* Animated gradient overlay when active */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-500/40 to-transparent rounded-full animate-pulse" />
            )}
          </div>
        </div>

        {/* Drop indicator text with better styling */}
        {isActive && (
          <div className={`
            absolute inset-x-0 flex items-center justify-center pointer-events-none
            ${isLastZone ? 'bottom-full mb-2' : 'top-full mt-2'}
          `}>
            <div className="relative">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-800 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-slate-200/50">
                <div className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-pulse" />
                Drop to insert row here
              </span>
            </div>
          </div>
        )}
      </td>
    </tr>
  )
}