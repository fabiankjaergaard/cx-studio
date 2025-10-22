'use client'

import { useState, useEffect } from 'react'
import { Palette, Lightbulb, Plus } from 'lucide-react'
import { RowTypeBlock } from './RowTypeBlock'
import { InsightBlock } from './InsightBlock'
import { CreateInsightDrawer } from './CreateInsightDrawer'
import { ROW_TYPES, ROW_COLORS, Insight, JourneyMapData } from '@/types/journey-map'

interface RowTypePaletteProps {
  className?: string
  'data-onboarding'?: string
  journeyId?: string
  journeyMap?: JourneyMapData
  insights?: Insight[]
  onCreateInsight?: (insight: Omit<Insight, 'id' | 'created_at'>) => void
  onInsightClick?: (insight: Insight) => void
}

export function RowTypePalette({
  className = '',
  'data-onboarding': dataOnboarding,
  journeyId,
  journeyMap,
  insights = [],
  onCreateInsight,
  onInsightClick
}: RowTypePaletteProps) {
  const [selectedColor, setSelectedColor] = useState('bg-slate-50')
  const [colorIntensity, setColorIntensity] = useState<'subtle' | 'vibrant'>('subtle')
  const [showCreateDrawer, setShowCreateDrawer] = useState(false)

  // Load color intensity preference
  useEffect(() => {
    const saved = localStorage.getItem('cx-app-color-intensity')
    if (saved === 'vibrant' || saved === 'subtle') {
      setColorIntensity(saved)
    }
  }, [])

  // Save color intensity preference when changed
  const handleColorIntensityChange = (intensity: 'subtle' | 'vibrant') => {
    setColorIntensity(intensity)
    localStorage.setItem('cx-app-color-intensity', intensity)
    // Trigger a custom event so other components can react immediately
    window.dispatchEvent(new CustomEvent('color-intensity-change', { detail: intensity }))
  }

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

      {/* Color Intensity Toggle */}
      <div className="px-4 py-2 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-700">
            Intensity
          </label>
          <div className="flex space-x-1">
            <button
              onClick={() => handleColorIntensityChange('subtle')}
              className={`px-2 py-1 rounded text-xs transition-all ${
                colorIntensity === 'subtle'
                  ? 'bg-gray-200 text-gray-900 font-medium'
                  : 'bg-transparent text-gray-500 hover:bg-gray-100'
              }`}
            >
              Subtle
            </button>
            <button
              onClick={() => handleColorIntensityChange('vibrant')}
              className={`px-2 py-1 rounded text-xs transition-all ${
                colorIntensity === 'vibrant'
                  ? 'bg-gray-200 text-gray-900 font-medium'
                  : 'bg-transparent text-gray-500 hover:bg-gray-100'
              }`}
            >
              Vibrant
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4">
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
                colorIntensity={colorIntensity}
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
                colorIntensity={colorIntensity}
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
                colorIntensity={colorIntensity}
              />
            ))}
          </div>
        </div>

        {/* Insights Section */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-gray-600" />
              <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Insights
              </h4>
            </div>
            {insights.length > 0 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {insights.length}
              </span>
            )}
          </div>

          {/* Insights list */}
          {insights.length > 0 ? (
            <div className="space-y-2 mb-3">
              {insights.map((insight) => (
                <InsightBlock
                  key={insight.id}
                  insight={insight}
                  onClick={() => onInsightClick?.(insight)}
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 mb-3 italic">
              No insights yet. Create one to get started.
            </p>
          )}

          {/* Action button */}
          <button
            onClick={() => setShowCreateDrawer(true)}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Create Insight
          </button>
        </div>

      </div>

      {/* Create Insight Drawer */}
      {journeyId && onCreateInsight && (
        <CreateInsightDrawer
          isOpen={showCreateDrawer}
          onClose={() => setShowCreateDrawer(false)}
          onSave={onCreateInsight}
          journeyId={journeyId}
        />
      )}
    </div>
  )
}