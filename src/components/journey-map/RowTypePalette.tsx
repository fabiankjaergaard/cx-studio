'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Palette } from 'lucide-react'
import { RowTypeBlock } from './RowTypeBlock'
import { ROW_TYPES, ROW_COLORS } from '@/types/journey-map'
import { Button } from '@/components/ui/Button'

interface RowTypePaletteProps {
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
  'data-onboarding'?: string
}

export function RowTypePalette({
  isCollapsed = false,
  onToggleCollapse,
  className = '',
  'data-onboarding': dataOnboarding
}: RowTypePaletteProps) {
  const [selectedColor, setSelectedColor] = useState(ROW_COLORS[0].id)

  // Group row types by category for better organization
  const basicTypes = ROW_TYPES.filter(type => ['text', 'number', 'status'].includes(type.id))
  const visualTypes = ROW_TYPES.filter(type => ['emoji', 'rating', 'channels'].includes(type.id))
  const analyticsTypes = ROW_TYPES.filter(type => ['pain-points', 'opportunities', 'metrics'].includes(type.id))

  const selectedColorInfo = ROW_COLORS.find(color => color.id === selectedColor)

  if (isCollapsed) {
    return (
      <div className={`w-12 bg-white border-r border-gray-200 flex flex-col items-center py-4 h-full ${className}`} data-onboarding={dataOnboarding}>
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleCollapse}
          className="w-8 h-8 p-0 mb-4"
          title="Expand palette"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
          <Palette className="w-3 h-3 text-gray-400" />
        </div>
      </div>
    )
  }

  return (
    <div className={`w-80 bg-white border-r border-gray-200 flex flex-col h-full ${className}`} data-onboarding={dataOnboarding}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-gray-600" />
            <h3 className="font-medium text-gray-900">Row Types</h3>
          </div>
          {onToggleCollapse && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleCollapse}
              className="w-6 h-6 p-0"
              title="Collapse palette"
            >
              <ChevronLeft className="w-3 h-3" />
            </Button>
          )}
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

        {/* Instructions */}
        <div className="pt-4 border-t border-gray-100">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800 leading-relaxed">
              💡 <strong>Tip:</strong> Drag any block to the "Add row" area in your journey map to quickly add that type of row.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Current color:</span>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded border ${selectedColorInfo?.class}`} />
            <span className="font-medium">{selectedColorInfo?.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}