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
  { level: 4, name: 'Good', color: 'bg-blue-400', trend: 'up', textColor: 'text-white' },
  { level: 5, name: 'Excellent', color: 'bg-green-500', trend: 'up', textColor: 'text-white' }
]

export function MetricsVisualization({ metrics, onChange, stageCount }: MetricsVisualizationProps) {
  const [editingStage, setEditingStage] = useState<number | null>(null)

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
            {/* Metric indicator */}
            <button
              onClick={() => setEditingStage(editingStage === index ? null : index)}
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200 shadow-sm ${
                position.isEmpty 
                  ? 'bg-gray-100 border-gray-300 hover:border-gray-400 hover:bg-gray-200' 
                  : `${METRIC_LEVELS[position.level]?.color || 'bg-blue-400'} border-gray-300 hover:border-gray-500 hover:scale-110 ${METRIC_LEVELS[position.level]?.textColor}`
              }`}
              title={position.metricName ? `${position.metricName}: ${position.value}` : undefined}
            >
              {position.isEmpty ? (
                <span className="text-gray-400 text-sm font-bold">+</span>
              ) : (
                <BarChart3Icon className="h-4 w-4" />
              )}
            </button>
            
            {/* Metric selector popup */}
            {editingStage === index && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-xl p-4 z-30 w-80">
                <div className="space-y-3">
                  <div className="text-base font-semibold text-gray-700">Metric</div>
                  
                  {/* Metric inputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Metric name (e.g. NPS)"
                      value={position.metricName}
                      onChange={(e) => handleMetricSelect(index, Math.max(1, position.level), e.target.value, position.value)}
                      className="p-3 border border-gray-300 rounded text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 7.2)"
                      value={position.value}
                      onChange={(e) => handleMetricSelect(index, Math.max(1, position.level), position.metricName, e.target.value)}
                      className="p-3 border border-gray-300 rounded text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  </div>
                  
                  {/* Performance level selector */}
                  <div className="grid grid-cols-3 gap-2">
                    {METRIC_LEVELS.map((metricLevel) => (
                      <button
                        key={metricLevel.level}
                        onClick={() => handleMetricSelect(index, metricLevel.level, position.metricName, position.value)}
                        className={`flex flex-col items-center p-3 rounded border transition-colors ${
                          position.level === metricLevel.level 
                            ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        title={metricLevel.name}
                      >
                        <div className={`w-6 h-6 rounded ${metricLevel.color} flex items-center justify-center text-sm ${metricLevel.textColor}`}>
                          {metricLevel.level === 0 ? '○' : getTrendIcon(metricLevel.trend)}
                        </div>
                        <div className="text-sm font-medium text-gray-700 mt-2">{metricLevel.name}</div>
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
                    <button
                      onClick={() => setEditingStage(null)}
                      className="text-sm text-gray-500 hover:text-gray-700 ml-auto font-medium"
                    >
                      Close
                    </button>
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

      {/* Performance scale on the right */}
      <div className="absolute right-2 top-2 bottom-2 w-16 flex flex-col justify-between text-xs text-gray-500">
        <div className="flex items-center">
          <TrendingUpIcon className="h-3 w-3 mr-1 text-green-500" />
          <span>High</span>
        </div>
        <div className="flex items-center">
          <TrendingDownIcon className="h-3 w-3 mr-1 text-red-500" />
          <span>Low</span>
        </div>
      </div>
    </div>
  )
}