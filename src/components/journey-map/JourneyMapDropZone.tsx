'use client'

import { useDrop } from 'react-dnd'
import { PlusIcon, MousePointer } from 'lucide-react'

interface DroppedItem {
  rowType: string
  name: string
  description: string
  color: string
}

interface JourneyMapDropZoneProps {
  onDropBlock: (item: DroppedItem) => void
  onManualAdd: () => void
  stageCount: number
}

export function JourneyMapDropZone({
  onDropBlock,
  onManualAdd,
  stageCount
}: JourneyMapDropZoneProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'ROW_TYPE_BLOCK',
    drop: (item: DroppedItem) => {
      console.log('JourneyMapDropZone drop triggered:', item)
      onDropBlock(item)
      return undefined
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [onDropBlock])

  const isActive = isOver && canDrop
  const isHighlighted = isActive || isOver

  return (
    <tr className="border-b border-gray-200 h-16 group/dropzone">
      <td
        ref={drop as any}
        colSpan={stageCount + 2}
        className="p-0 relative cursor-pointer"
        onClick={onManualAdd}
      >
        {/* Drop zone indicator line - similar to RowInsertionZone */}
        <div className={`
          absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out
          ${isActive ? 'px-4' : 'px-8'}
        `}>
          <div className={`
            relative w-full transition-all duration-300 ease-out
            ${isActive
              ? 'h-1 bg-slate-400/30 rounded-full'
              : 'h-0.5 bg-gray-300/50 rounded-full opacity-0 group-hover/dropzone:opacity-100'
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
          <div className="absolute inset-x-0 top-full mt-2 flex items-center justify-center pointer-events-none">
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