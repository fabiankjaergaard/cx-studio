'use client'

import { useDrag } from 'react-dnd'
import { useEffect } from 'react'
import {
  Type,
  Smile,
  Hash,
  Star,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Layers
} from 'lucide-react'
import { ROW_TYPES, ROW_COLORS } from '@/types/journey-map'
import { useDragContext } from '@/components/journey/DragDropProvider'

interface RowTypeBlockProps {
  rowType: {
    id: string
    name: string
    description: string
  }
  color?: string
  colorIntensity?: 'subtle' | 'vibrant'
}

// Icon mapping for each row type
const getRowTypeIcon = (type: string) => {
  switch (type) {
    case 'text':
      return Type
    case 'emoji':
      return Smile
    case 'number':
      return Hash
    case 'rating':
      return Star
    case 'status':
      return CheckCircle
    case 'pain-points':
      return AlertTriangle
    case 'opportunities':
      return TrendingUp
    case 'metrics':
      return BarChart3
    case 'channels':
      return Layers
    default:
      return Type
  }
}

export function RowTypeBlock({ rowType, color = 'bg-slate-50', colorIntensity = 'subtle' }: RowTypeBlockProps) {
  const { setIsDragging } = useDragContext()

  const [{ isDragging }, drag] = useDrag({
    type: 'ROW_TYPE_BLOCK',
    item: {
      rowType: rowType.id,
      name: rowType.name,
      description: rowType.description,
      color: color
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }, [rowType.id, rowType.name, rowType.description, color])

  useEffect(() => {
    console.log('Block drag state changed:', isDragging)
    setIsDragging(isDragging)
  }, [isDragging, setIsDragging])

  const IconComponent = getRowTypeIcon(rowType.id)
  const colorClass = ROW_COLORS.find(c => c.id === color)?.class || 'bg-slate-50'

  // Get border color based on intensity
  const getBorderColor = () => {
    if (colorIntensity === 'vibrant') {
      switch (color) {
        case 'bg-slate-50': return 'border-slate-600'
        case 'bg-blue-200': return 'border-blue-600'
        case 'bg-indigo-200': return 'border-indigo-600'
        case 'bg-slate-300': return 'border-slate-700'
        case 'bg-emerald-200': return 'border-emerald-600'
        case 'bg-rose-200': return 'border-rose-600'
        case 'bg-amber-200': return 'border-amber-600'
        case 'bg-violet-200': return 'border-violet-600'
        case 'bg-pink-200': return 'border-pink-600'
        case 'bg-cyan-200': return 'border-cyan-600'
        default: return 'border-gray-400'
      }
    } else {
      // Subtle
      switch (color) {
        case 'bg-slate-50': return 'border-slate-200'
        case 'bg-blue-200': return 'border-blue-300'
        case 'bg-indigo-200': return 'border-indigo-300'
        case 'bg-slate-300': return 'border-slate-400'
        case 'bg-emerald-200': return 'border-emerald-300'
        case 'bg-rose-200': return 'border-rose-300'
        case 'bg-amber-200': return 'border-amber-300'
        case 'bg-violet-200': return 'border-violet-300'
        case 'bg-pink-200': return 'border-pink-300'
        case 'bg-cyan-200': return 'border-cyan-300'
        default: return 'border-gray-200'
      }
    }
  }

  return (
    <div
      ref={drag as any}
      className={`
        cursor-grab active:cursor-grabbing p-3 rounded-lg border-2 group
        hover:shadow-md hover:scale-105 hover:-translate-y-1 transition-all duration-200 ease-out
        ${colorClass} ${getBorderColor()} ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
        select-none
      `}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-slate-300 group-hover:shadow-sm transition-all duration-200">
          <IconComponent className="w-4 h-4 text-gray-600 group-hover:text-slate-700 transition-colors duration-200" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-slate-900 transition-colors duration-200">
            {rowType.name}
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed group-hover:text-slate-600 transition-colors duration-200">
            {rowType.description}
          </p>
        </div>
      </div>

      {/* Drag indicator */}
      {isDragging && (
        <div className="absolute inset-0 border-2 border-dashed border-slate-600 rounded-lg bg-slate-100 bg-opacity-30" />
      )}
    </div>
  )
}