'use client'

import { useState } from 'react'
import { BarChart3Icon, TrendingUpIcon, TrendingDownIcon, MinusIcon } from 'lucide-react'

interface MetricsVisualizationProps {
  metrics: string[]
  onChange: (metrics: string[]) => void
  stageCount: number
}

// Metric performance levels
const METRIC_LEVELS = [
  { level: 0, name: 'No Data', color: 'bg-gray-100', trend: 'none', textColor: 'text-gray-500' },
  { level: 1, name: 'Poor', color: 'bg-red-400', trend: 'down', textColor: 'text-white' },
  { level: 2, name: 'Below Average', color: 'bg-orange-400', trend: 'down', textColor: 'text-white' },
  { level: 3, name: 'Average', color: 'bg-yellow-400', trend: 'neutral', textColor: 'text-gray-800' },
  { level: 4, name: 'Good', color: 'bg-slate-400', trend: 'up', textColor: 'text-white' },
  { level: 5, name: 'Excellent', color: 'bg-green-500', trend: 'up', textColor: 'text-white' }
]

export function MetricsVisualization({ metrics, onChange, stageCount }: MetricsVisualizationProps) {
  const [editingStage, setEditingStage] = useState<number | null>(null)
  const [tempMetricName, setTempMetricName] = useState('')
  const [tempValue, setTempValue] = useState('')

  const getCurrentMetrics = () => {
    return metrics.slice()
  }

  const currentMetrics = getCurrentMetrics()

  const handleMetricSelect = (stageIndex: number, level: number, metricName: string = '', value: string = '') => {
    const newMetrics = [...currentMetrics]

    while (newMetrics.length <= stageIndex) {
      newMetrics.push('')
    }

    // Format: "level:metricName:value"
    newMetrics[stageIndex] = level === 0 ? '' : `${level}:${metricName}:${value}`

    while (newMetrics.length > 0 && newMetrics[newMetrics.length - 1] === '') {
      newMetrics.pop()
    }

    onChange(newMetrics)
    setEditingStage(null)
    setTempMetricName('')
    setTempValue('')
  }

  const handleLevelSelect = (stageIndex: number, level: number) => {
    const metricName = tempMetricName.trim()
    const value = tempValue.trim()
    handleMetricSelect(stageIndex, level, metricName, value)
  }

  const handleOpenEdit = (stageIndex: number) => {
    const positions = getMetricPositions()
    const position = positions[stageIndex]
    setTempMetricName(position?.metricName || '')
    setTempValue(position?.value || '')
    setEditingStage(stageIndex)
  }

  const getMetricPositions = () => {
    const positions = []
    
    for (let i = 0; i < stageCount; i++) {
      const metricData = currentMetrics[i] || ''
      let level = 0
      let metricName = ''
      let value = ''
      
      if (metricData) {
        const parts = metricData.split(':')
        level = parseInt(parts[0]) || 0
        metricName = parts[1] || ''
        value = parts[2] || ''
      }
      
      const xPercent = (i + 0.5) * (100 / stageCount)
      const yPercent = 50 // Always center position
      
      positions.push({ 
        x: xPercent, 
        y: yPercent, 
        level, 
        metricName,
        value,
        isEmpty: level === 0 
      })
    }
    
    return positions
  }

  const positions = getMetricPositions()

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon className="h-3 w-3" />
      case 'down': return <TrendingDownIcon className="h-3 w-3" />
      default: return <MinusIcon className="h-3 w-3" />
    }
  }

  return (
    <div className="relative w-full h-32 bg-white border border-gray-200 rounded-lg overflow-visible">
      {/* Metric indicators */}
      <div className="absolute inset-0">
        {positions.map((position, index) => (
          <div 
            key={index} 
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`
            }}
          >
            <div className="flex flex-col items-center">
              {/* Metric indicator */}
              <button
                onClick={() => editingStage === index ? setEditingStage(null) : handleOpenEdit(index)}
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200 shadow-sm mb-1 ${
                  position.isEmpty
                    ? 'bg-gray-100 border-gray-300 hover:border-gray-400 hover:bg-gray-200'
                    : `${METRIC_LEVELS[position.level]?.color || 'bg-slate-400'} border-gray-300 hover:border-gray-500 hover:scale-110 ${METRIC_LEVELS[position.level]?.textColor}`
                }`}
                title={position.metricName ? `${position.metricName}: ${position.value}` : undefined}
              >
                {position.isEmpty ? (
                  <span className="text-gray-400 text-sm font-bold">+</span>
                ) : (
                  <BarChart3Icon className="h-4 w-4" />
                )}
              </button>

              {/* Metric info */}
              {!position.isEmpty && (
                <div className="text-xs text-gray-700 font-medium text-center">
                  <div>{METRIC_LEVELS[position.level]?.name || 'Unknown'}</div>
                  {position.metricName && position.metricName !== position.value && (
                    <div className="text-gray-600 font-normal">{position.metricName}</div>
                  )}
                </div>
              )}
            </div>
            
            {/* Metric selector popup */}
            {editingStage === index && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-xl p-3 z-30 w-64">
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-700">Metric</div>
                  
                  {/* Metric inputs */}
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Metric Name</label>
                      <input
                        type="text"
                        placeholder="e.g. NPS, CSAT"
                        value={tempMetricName}
                        onChange={(e) => setTempMetricName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Value</label>
                      <input
                        type="text"
                        placeholder="e.g. 7.2, 85%, $1.2M"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white"
                      />
                    </div>
                  </div>
                  
                  {/* Performance level selector */}
                  <div className="grid grid-cols-3 gap-2">
                    {METRIC_LEVELS.map((metricLevel) => (
                      <button
                        key={metricLevel.level}
                        onClick={() => handleLevelSelect(index, metricLevel.level)}
                        className={`flex flex-col items-center p-2 rounded border transition-colors ${
                          position.level === metricLevel.level 
                            ? 'bg-slate-50 border-slate-300 ring-2 ring-slate-200' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        title={metricLevel.name}
                      >
                        <div className={`w-5 h-5 rounded ${metricLevel.color} flex items-center justify-center text-xs ${metricLevel.textColor}`}>
                          {metricLevel.level === 0 ? '○' : getTrendIcon(metricLevel.trend)}
                        </div>
                        <div className="text-xs font-medium text-gray-700 mt-1">{metricLevel.name}</div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-3 border-t">
                    {!position.isEmpty && (
                      <button
                        onClick={() => handleMetricSelect(index, 0, '', '')}
                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    )}
                    <div className="flex space-x-2 ml-auto">
                      <button
                        onClick={() => {
                          setEditingStage(null)
                          setTempMetricName('')
                          setTempValue('')
                        }}
                        className="text-sm text-gray-500 hover:text-gray-700 font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleLevelSelect(index, Math.max(1, position.level || 1))}
                        className="px-3 py-1 bg-slate-600 text-white text-sm font-medium rounded hover:bg-slate-700 transition-colors"
                        disabled={!tempMetricName.trim()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Value label below indicator */}
            {!position.isEmpty && position.value && (
              <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap font-medium">
                {position.value}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}