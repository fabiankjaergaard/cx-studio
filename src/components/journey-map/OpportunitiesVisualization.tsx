'use client'

import { useState } from 'react'
import { LightbulbIcon, TrendingUpIcon } from 'lucide-react'

interface OpportunitiesVisualizationProps {
  opportunities: string[]
  onChange: (opportunities: string[]) => void
  stageCount: number
}

// Opportunity priority levels
const OPPORTUNITY_LEVELS = [
  { level: 0, name: 'None', color: 'bg-gray-100', priority: 'None' },
  { level: 1, name: 'Low Priority', color: 'bg-slate-200', priority: 'Low' },
  { level: 2, name: 'Medium Priority', color: 'bg-slate-400', priority: 'Medium' },
  { level: 3, name: 'High Priority', color: 'bg-green-400', priority: 'High' },
  { level: 4, name: 'Critical Opportunity', color: 'bg-green-600', priority: 'Critical' }
]

export function OpportunitiesVisualization({ opportunities, onChange, stageCount }: OpportunitiesVisualizationProps) {
  const [editingStage, setEditingStage] = useState<number | null>(null)

  const getCurrentOpportunities = () => {
    return opportunities.slice()
  }

  const currentOpportunities = getCurrentOpportunities()

  const handleOpportunitySelect = (stageIndex: number, level: number, description: string = '') => {
    const newOpportunities = [...currentOpportunities]
    
    while (newOpportunities.length <= stageIndex) {
      newOpportunities.push('')
    }
    
    newOpportunities[stageIndex] = level === 0 ? '' : `${level}:${description}`
    
    while (newOpportunities.length > 0 && newOpportunities[newOpportunities.length - 1] === '') {
      newOpportunities.pop()
    }
    
    onChange(newOpportunities)
    setEditingStage(null)
  }

  const getOpportunityPositions = () => {
    const positions = []
    
    for (let i = 0; i < stageCount; i++) {
      const oppData = currentOpportunities[i] || ''
      let level = 0
      let description = ''
      
      if (oppData) {
        const [levelStr, ...descParts] = oppData.split(':')
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

  const positions = getOpportunityPositions()

  return (
    <div className="relative w-full h-32 bg-white border border-gray-200 rounded-lg overflow-visible">
      {/* Opportunity indicators */}
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
              {/* Opportunity indicator */}
              <button
                onClick={() => {
                  setEditingStage(editingStage === index ? null : index)
                }}
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200 shadow-sm mb-1 ${
                  position.isEmpty
                    ? 'bg-gray-100 border-gray-300 hover:border-gray-400 hover:bg-gray-200'
                    : `${OPPORTUNITY_LEVELS[position.level]?.color || 'bg-green-400'} border-gray-300 hover:border-gray-500 hover:scale-110 text-white`
                }`}
              >
                {position.isEmpty ? (
                  <span className="text-gray-400 text-sm font-bold">+</span>
                ) : (
                  <LightbulbIcon className="h-4 w-4" />
                )}
              </button>

              {/* Opportunity level label */}
              {!position.isEmpty && (
                <div className="text-xs text-gray-700 font-medium text-center">
                  {OPPORTUNITY_LEVELS[position.level]?.name || 'Unknown'}
                </div>
              )}
            </div>
            
            {/* Opportunity selector popup */}
            {editingStage === index && (
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-xl p-4 z-30 w-80">
                <div className="space-y-3">
                  <div className="text-base font-semibold text-gray-700">Opportunities</div>
                  
                  {/* Priority level selector */}
                  <div className="grid grid-cols-3 gap-2">
                    {OPPORTUNITY_LEVELS.map((oppLevel) => (
                      <button
                        key={oppLevel.level}
                        onClick={() => handleOpportunitySelect(index, oppLevel.level, position.description)}
                        className={`flex flex-col items-center p-3 rounded border transition-colors ${
                          position.level === oppLevel.level 
                            ? 'bg-slate-50 border-slate-300 ring-2 ring-slate-200' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        title={`${oppLevel.name} - ${oppLevel.priority} Priority`}
                      >
                        <div className={`w-6 h-6 rounded-full ${oppLevel.color} flex items-center justify-center text-sm`}>
                          {oppLevel.level === 0 ? '○' : <LightbulbIcon className="h-4 w-4" />}
                        </div>
                        <div className="text-sm font-medium text-gray-700 mt-2">{oppLevel.name}</div>
                      </button>
                    ))}
                  </div>

                  {/* Description input */}
                  {position.level > 0 && (
                    <div className="pt-3 border-t">
                      <input
                        type="text"
                        placeholder="Describe the opportunity..."
                        value={position.description}
                        onChange={(e) => handleOpportunitySelect(index, position.level, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white"
                        autoFocus
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-3 border-t">
                    {!position.isEmpty && (
                      <button
                        onClick={() => handleOpportunitySelect(index, 0, '')}
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