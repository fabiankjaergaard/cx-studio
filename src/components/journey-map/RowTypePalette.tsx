'use client'

import { useState } from 'react'
import { Palette } from 'lucide-react'
import { RowTypeBlock } from './RowTypeBlock'
import { ROW_TYPES, ROW_COLORS } from '@/types/journey-map'

interface RowTypePaletteProps {
  className?: string
  'data-onboarding'?: string
}

export function RowTypePalette({
  className = '',
  'data-onboarding': dataOnboarding
}: RowTypePaletteProps) {
  const [selectedColor, setSelectedColor] = useState('bg-slate-50')

  // Group row types by category for better organization
  const basicTypes = ROW_TYPES.filter(type => ['text', 'number', 'status'].includes(type.id))
  const visualTypes = ROW_TYPES.filter(type => ['emoji', 'rating', 'channels'].includes(type.id))
  const analyticsTypes = ROW_TYPES.filter(type => ['pain-points', 'opportunities', 'metrics'].includes(type.id))

  const selectedColorInfo = ROW_COLORS.find(color => color.id === selectedColor)

  return (
    <div className={`w-80 bg-white border-r border-gray-200 flex flex-col h-full ${className}`} data-onboarding={dataOnboarding}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <Palette className="w-4 h-4 text-gray-600" />
          <h3 className="font-medium text-gray-900">Row Types</h3>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Drag blocks to add rows to your journey map
        </p>
      </div>

      {/* Color Selector */}
      <div className="px-4 py-3 border-b border-gray-100">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Block Color
        </label>
        <div className="grid grid-cols-4 gap-1">
          {ROW_COLORS.slice(0, 8).map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className={`
                w-8 h-8 rounded border-2 transition-all ${color.class}
                ${selectedColor === color.id
                  ? 'border-gray-400 ring-2 ring-gray-200'
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Basic Types */}
        <div>
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
            Basic
          </h4>
          <div className="space-y-2">
            {basicTypes.map((rowType) => (
              <RowTypeBlock
                key={rowType.id}
                rowType={rowType}
                color={selectedColor}
              />
            ))}
          </div>
        </div>

        {/* Visual Types */}
        <div>
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
            Visual
          </h4>
          <div className="space-y-2">
            {visualTypes.map((rowType) => (
              <RowTypeBlock
                key={rowType.id}
                rowType={rowType}
                color={selectedColor}
              />
            ))}
          </div>
        </div>

        {/* Analytics Types */}
        <div>
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
            Analytics
          </h4>
          <div className="space-y-2">
            {analyticsTypes.map((rowType) => (
              <RowTypeBlock
                key={rowType.id}
                rowType={rowType}
                color={selectedColor}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}