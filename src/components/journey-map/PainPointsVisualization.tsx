'use client'

import { useState } from 'react'
import { AlertTriangleIcon, XIcon, CircleIcon, AlertCircleIcon, XCircleIcon, ZapIcon } from 'lucide-react'

interface PainPointsVisualizationProps {
  painPoints: string[]
  onChange: (painPoints: string[]) => void
  stageCount: number
}

// Pain point intensity levels
const PAIN_LEVELS = [
  { level: 0, name: 'None', color: 'bg-gray-100', icon: CircleIcon, iconColor: 'text-gray-400', intensity: 0 },
  { level: 1, name: 'Minor', color: 'bg-yellow-200', icon: AlertCircleIcon, iconColor: 'text-yellow-700', intensity: 1 },
  { level: 2, name: 'Moderate', color: 'bg-orange-300', icon: AlertTriangleIcon, iconColor: 'text-orange-700', intensity: 2 },
  { level: 3, name: 'Major', color: 'bg-red-400', icon: XCircleIcon, iconColor: 'text-red-700', intensity: 3 },
  { level: 4, name: 'Critical', color: 'bg-red-600', icon: ZapIcon, iconColor: 'text-red-100', intensity: 4 }
]

export function PainPointsVisualization({ painPoints, onChange, stageCount }: PainPointsVisualizationProps) {
  const [editingStage, setEditingStage] = useState<number | null>(null)

  // Parse pain points data (format: "level:description")
  const getCurrentPainPoints = () => {
    return painPoints.slice()
  }

  const currentPainPoints = getCurrentPainPoints()

  const handlePainPointSelect = (stageIndex: number, level: number, description: string = '') => {
    const newPainPoints = [...currentPainPoints]
    
    // Ensure array is long enough
    while (newPainPoints.length <= stageIndex) {
      newPainPoints.push('')
    }
    
    // Store as "level:description" format
    newPainPoints[stageIndex] = level === 0 ? '' : `${level}:${description}`
    
    // Remove trailing empty strings
    while (newPainPoints.length > 0 && newPainPoints[newPainPoints.length - 1] === '') {
      newPainPoints.pop()
    }
    
    onChange(newPainPoints)
    setEditingStage(null)
  }

  // Get pain point positions and data
  const getPainPointPositions = () => {
    const positions = []
    
    for (let i = 0; i < stageCount; i++) {
      const painData = currentPainPoints[i] || ''
      let level = 0
      let description = ''
      
      if (painData) {
        const [levelStr, ...descParts] = painData.split(':')
        level = parseInt(levelStr) || 0
        description = descParts.join(':')
      }
      
      const xPercent = (i + 0.5) * (100 / stageCount)
      const yPercent = 50 // Always center position
      
      positions.push({ 
        x: xPercent, 
        y: yPercent, 
        level, 
        description,
        isEmpty: level === 0 
      })
    }
    
    return positions
  }

  const positions = getPainPointPositions()

  return (
    <div className="relative w-full h-32 bg-white border border-gray-200 rounded-lg overflow-visible">
      {/* Pain point indicators */}
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
              {/* Pain point indicator */}
              <button
                onClick={() => setEditingStage(editingStage === index ? null : index)}
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200 shadow-sm mb-1 ${
                  position.isEmpty
                    ? 'bg-gray-100 border-gray-300 hover:border-gray-400 hover:bg-gray-200'
                    : `${PAIN_LEVELS[position.level]?.color || 'bg-red-400'} border-gray-300 hover:border-gray-500 hover:scale-110 text-white font-bold`
                }`}
              >
                {position.isEmpty ? (
                  <span className="text-gray-400 text-sm font-bold">+</span>
                ) : (
                  (() => {
                    const painLevel = PAIN_LEVELS[position.level]
                    if (!painLevel) return <AlertTriangleIcon className="h-4 w-4" />
                    const Icon = painLevel.icon
                    return <Icon className="h-4 w-4 text-white" />
                  })()
                )}
              </button>

              {/* Pain point label */}
              {!position.isEmpty && (
                <div className="text-xs text-gray-700 font-medium text-center">
                  {PAIN_LEVELS[position.level]?.name || 'Unknown'}
                </div>
              )}
            </div>
            
            {/* Pain point selector popup */}
            {editingStage === index && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-xl p-4 z-30 w-80">
                <div className="space-y-3">
                  <div className="text-base font-semibold text-gray-700">Pain Points</div>
                  
                  {/* Pain level selector */}
                  <div className="grid grid-cols-3 gap-2">
                    {PAIN_LEVELS.map((painLevel) => (
                      <button
                        key={painLevel.level}
                        onClick={() => handlePainPointSelect(index, painLevel.level, position.description)}
                        className={`flex flex-col items-center p-3 rounded border transition-colors ${
                          position.level === painLevel.level
                            ? 'bg-slate-50 border-slate-300 ring-2 ring-slate-200'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        title={painLevel.name}
                      >
                        <div className={`w-8 h-8 rounded ${painLevel.color} flex items-center justify-center text-sm mb-2`}>
                          <painLevel.icon className={`h-4 w-4 ${painLevel.iconColor}`} />
                        </div>
                        <div className="text-sm font-medium text-gray-900 text-center">{painLevel.name}</div>
                      </button>
                    ))}
                  </div>

                  {/* Description input for non-zero levels */}
                  {position.level > 0 && (
                    <div className="pt-3 border-t">
                      <input
                        type="text"
                        placeholder="Describe the pain point..."
                        value={position.description}
                        onChange={(e) => handlePainPointSelect(index, position.level, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white"
                        autoFocus
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-3 border-t">
                    {!position.isEmpty && (
                      <button
                        onClick={() => handlePainPointSelect(index, 0, '')}
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
          </div>
        ))}
      </div>

    </div>
  )
}