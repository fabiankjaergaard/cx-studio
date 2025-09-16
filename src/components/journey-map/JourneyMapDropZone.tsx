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
    <tr className="border-b border-gray-200">
      <td
        ref={drop as any}
        className={`
          p-4 border-r border-gray-200 transition-all duration-200 cursor-pointer
          ${isHighlighted
            ? 'bg-blue-50/30 border-blue-300'
            : 'bg-gray-50/50 hover:bg-gray-100'
          }
          ${isActive
            ? 'ring-1 ring-blue-300 ring-inset'
            : ''
          }
        `}
        onClick={onManualAdd}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          {isHighlighted ? (
            <>
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-colors
                ${isActive
                  ? 'bg-blue-200 text-blue-700'
                  : 'bg-blue-100 text-blue-600'
                }
              `}>
                <MousePointer className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className={`
                  text-sm font-medium transition-colors
                  ${isActive
                    ? 'text-blue-800'
                    : 'text-blue-700'
                  }
                `}>
                  {isActive ? 'Drop to add row' : 'Drop block here'}
                </span>
                <p className="text-xs text-blue-600">
                  Release to create new row
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 hover:text-gray-700 transition-colors">
                <PlusIcon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                  Add row
                </span>
                <p className="text-xs text-gray-400">
                  Drag block here or click
                </p>
              </div>
            </>
          )}
        </div>

        {/* Drop indicator overlay */}
        {isActive && (
          <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded bg-blue-50 bg-opacity-20 pointer-events-none" />
        )}
      </td>

      {/* Empty cells for each stage */}
      {Array.from({ length: stageCount }).map((_, index) => (
        <td
          key={`empty-${index}`}
          className={`
            p-2 border-r border-gray-200 transition-colors duration-200
            ${isHighlighted ? 'bg-blue-50/20' : ''}
          `}
        />
      ))}

      {/* Empty cell for the last column */}
      <td className={`p-4 transition-colors duration-200 ${isHighlighted ? 'bg-blue-50/20' : ''}`} />
    </tr>
  )
}