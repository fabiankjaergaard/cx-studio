'use client'

import { useDrag } from 'react-dnd'
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

export function RowTypeBlock({ rowType, color = 'bg-[#F9FAFB]', colorIntensity = 'subtle' }: RowTypeBlockProps) {
  const { setIsDragging } = useDragContext()

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ROW_TYPE_BLOCK',
    item: () => {
      console.log('Drag started immediately')
      setIsDragging(true)
      return {
        rowType: rowType.id,
        name: rowType.name,
        description: rowType.description,
        color: color
      }
    },
    end: () => {
      console.log('Drag ended immediately')
      setIsDragging(false)
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [rowType.id, rowType.name, rowType.description, color, setIsDragging])

  const IconComponent = getRowTypeIcon(rowType.id)

  // Get adjusted color based on intensity
  const getAdjustedColor = () => {
    const colorMap: Record<string, { vibrant: string; subtle: string }> = {
      'bg-[#F9FAFB]': { vibrant: 'bg-[#F9FAFB]', subtle: 'bg-[#FBFCFC]' },
      'bg-[#778DB0]': { vibrant: 'bg-[#778DB0]', subtle: 'bg-[#A3B2C9]' },
      'bg-[#77BB92]': { vibrant: 'bg-[#77BB92]', subtle: 'bg-[#A3D2B7]' },
      'bg-[#F4C542]': { vibrant: 'bg-[#F4C542]', subtle: 'bg-[#F7D976]' },
      'bg-[#ED6B5A]': { vibrant: 'bg-[#ED6B5A]', subtle: 'bg-[#F39A8E]' },
      'bg-[#A67FB5]': { vibrant: 'bg-[#A67FB5]', subtle: 'bg-[#BFA0CA]' },
      'bg-[#E89FAB]': { vibrant: 'bg-[#E89FAB]', subtle: 'bg-[#EFBCC4]' },
      'bg-[#8A8A8A]': { vibrant: 'bg-[#8A8A8A]', subtle: 'bg-[#B1B1B1]' }
    }

    if (colorMap[color]) {
      return colorIntensity === 'vibrant' ? colorMap[color].vibrant : colorMap[color].subtle
    }
    return color
  }

  // Get border color based on intensity
  const getBorderColor = () => {
    const borderMap: Record<string, { vibrant: string; subtle: string }> = {
      'bg-[#F9FAFB]': { vibrant: '#F9FAFB', subtle: '#FBFCFC' },
      'bg-[#778DB0]': { vibrant: '#778DB0', subtle: '#A3B2C9' },
      'bg-[#77BB92]': { vibrant: '#77BB92', subtle: '#A3D2B7' },
      'bg-[#F4C542]': { vibrant: '#F4C542', subtle: '#F7D976' },
      'bg-[#ED6B5A]': { vibrant: '#ED6B5A', subtle: '#F39A8E' },
      'bg-[#A67FB5]': { vibrant: '#A67FB5', subtle: '#BFA0CA' },
      'bg-[#E89FAB]': { vibrant: '#E89FAB', subtle: '#EFBCC4' },
      'bg-[#8A8A8A]': { vibrant: '#8A8A8A', subtle: '#B1B1B1' }
    }

    return borderMap[color] ?
      (colorIntensity === 'vibrant' ? borderMap[color].vibrant : borderMap[color].subtle) :
      '#D1D5DB'
  }

  return (
    <div
      ref={drag as any}
      className={`
        cursor-grab active:cursor-grabbing p-3 rounded-lg border-2 group
        hover:shadow-md hover:scale-105 hover:-translate-y-1 transition-all duration-200 ease-out
        ${getAdjustedColor()} ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
        select-none
      `}
      style={{
        opacity: isDragging ? 0.5 : 1,
        borderColor: getBorderColor()
      }}
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