'use client'

import { useState } from 'react'

interface EmotionCurveProps {
  emotions: string[]
  onChange: (emotions: string[]) => void
  stageCount: number
}

// Simple emotion mapping (1-5 scale)
const EMOTIONS = [
  { emoji: '😢', name: 'Sad', value: 1 },
  { emoji: '😞', name: 'Disappointed', value: 2 },
  { emoji: '😐', name: 'Neutral', value: 3 },
  { emoji: '😊', name: 'Happy', value: 4 },
  { emoji: '😍', name: 'Very Happy', value: 5 }
]

export function EmotionCurve({ emotions, onChange, stageCount }: EmotionCurveProps) {
  const [editingStage, setEditingStage] = useState<number | null>(null)
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null)
  const [showAddButton, setShowAddButton] = useState(false)

  // Get current emotions, only keeping actual selections (no padding)
  const getCurrentEmotions = () => {
    // Return emotions as-is, without any padding or filling
    return emotions.slice() // Just a copy of the original array
  }

  const currentEmotions = getCurrentEmotions()

  const handleEmotionSelect = (stageIndex: number, emoji: string) => {
    console.log('handleEmotionSelect called:', { stageIndex, emoji, currentEmotions })
    
    // Create array that only contains the emotions that actually exist
    const newEmotions = [...currentEmotions]
    
    // Ensure the array is long enough to hold the new emotion
    while (newEmotions.length <= stageIndex) {
      newEmotions.push('')
    }
    
    // Set the new emotion at the specific index
    newEmotions[stageIndex] = emoji
    
    // Remove trailing empty strings to avoid unnecessary data
    while (newEmotions.length > 0 && newEmotions[newEmotions.length - 1] === '') {
      newEmotions.pop()
    }
    
    console.log('Sending new emotions:', newEmotions)
    onChange(newEmotions)
    setEditingStage(null)
  }

  // Handle mouse movement over the curve line
  const handleLineMouseMove = (event: React.MouseEvent<SVGPathElement>) => {
    const rect = event.currentTarget.closest('svg')?.getBoundingClientRect()
    if (!rect) return
    
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    
    setHoverPosition({ x, y })
    setShowAddButton(true)
  }

  const handleLineMouseLeave = () => {
    setShowAddButton(false)
    setHoverPosition(null)
  }

  // Calculate which stage position to insert at based on x coordinate
  const calculateInsertPosition = (xPercent: number) => {
    const stageWidth = 100 / stageCount
    return Math.min(Math.floor(xPercent / stageWidth), stageCount - 1)
  }

  const handleAddEmoji = () => {
    if (!hoverPosition) return
    
    const insertIndex = calculateInsertPosition(hoverPosition.x)
    // For now, just trigger editing at the nearest stage
    setEditingStage(insertIndex)
    setShowAddButton(false)
    setHoverPosition(null)
  }

  // Calculate positions for all stages, including empty ones
  const getEmotionPositions = () => {
    const positions = []
    
    for (let i = 0; i < stageCount; i++) {
      const emoji = currentEmotions[i] || '' // Get emoji at this position or empty string
      const emotion = EMOTIONS.find(e => e.emoji === emoji) || EMOTIONS[2] // default to neutral for calculation
      const xPercent = (i + 0.5) * (100 / stageCount) // Center in each column
      const yPercent = emoji ? ((5 - emotion.value) / 4) * 60 + 20 : 50 // Center if empty, otherwise emotion-based
      
      positions.push({ 
        x: xPercent, 
        y: yPercent, 
        emoji, 
        value: emotion.value, 
        isEmpty: !emoji 
      })
    }
    
    return positions
  }

  const positions = getEmotionPositions()

  // Create smooth curved line path connecting emotions that have been set
  const createLinePath = () => {
    const filledPositions = positions.filter(p => !p.isEmpty)
    
    // Only show line when there are 2 or more emotions selected
    if (filledPositions.length < 2) {
      return '' // No line at all
    }
    
    // Start with the first filled position
    let path = `M ${filledPositions[0].x} ${filledPositions[0].y}`
    
    if (filledPositions.length === 2) {
      // Simple line for just 2 points
      path += ` L ${filledPositions[1].x} ${filledPositions[1].y}`
    } else {
      // Create smooth curves for multiple points
      for (let i = 1; i < filledPositions.length; i++) {
        const prevPoint = filledPositions[i - 1]
        const currentPoint = filledPositions[i]
        
        if (i === 1) {
          // First curve - start with quadratic curve
          const controlX = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.5
          const controlY = prevPoint.y + (currentPoint.y - prevPoint.y) * 0.3
          path += ` Q ${controlX} ${controlY}, ${currentPoint.x} ${currentPoint.y}`
        } else if (i === filledPositions.length - 1) {
          // Last point - simple smooth curve
          const controlX = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.7
          const controlY = prevPoint.y + (currentPoint.y - prevPoint.y) * 0.3
          path += ` Q ${controlX} ${controlY}, ${currentPoint.x} ${currentPoint.y}`
        } else {
          // Middle points - use smooth S curves
          const controlX1 = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.6
          const controlY1 = prevPoint.y
          const controlX2 = currentPoint.x - (currentPoint.x - prevPoint.x) * 0.4
          const controlY2 = currentPoint.y
          path += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${currentPoint.x} ${currentPoint.y}`
        }
      }
    }
    
    return path
  }

  return (
    <div className="relative w-full h-32 bg-white border border-gray-200 rounded-lg overflow-visible">
      {/* SVG for the connecting line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Invisible thicker line for hover detection */}
        <path
          d={createLinePath()}
          stroke="transparent"
          strokeWidth="8"
          fill="none"
          className="cursor-pointer"
          onMouseMove={handleLineMouseMove}
          onMouseLeave={handleLineMouseLeave}
        />
        
        {/* Visible line connecting emotions */}
        <path
          d={createLinePath()}
          stroke="#6b7280"
          strokeWidth="1.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 pointer-events-none"
        />
      </svg>
      
      {/* Floating add button on hover */}
      {showAddButton && hoverPosition && (
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
          style={{
            left: `${hoverPosition.x}%`,
            top: `${hoverPosition.y}%`
          }}
        >
          <button
            onClick={handleAddEmoji}
            className="w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 pointer-events-auto"
            title="Add emoji here"
          >
            <span className="text-xs font-bold">+</span>
          </button>
        </div>
      )}
      
      {/* Emotion points positioned based on emotion values */}
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
            {/* Emoji or empty dot with plus */}
            <button
              onClick={() => setEditingStage(editingStage === index ? null : index)}
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200 shadow-sm ${
                position.isEmpty 
                  ? 'bg-gray-100 border-gray-300 hover:border-gray-400 hover:bg-gray-200 hover:shadow-md' 
                  : 'bg-white border-gray-200 hover:border-gray-400 hover:scale-110 hover:shadow-lg'
              }`}
            >
              {position.isEmpty ? (
                <span className="text-gray-400 text-sm font-bold">+</span>
              ) : (
                <span className="text-lg">{position.emoji}</span>
              )}
            </button>
            
            {/* Emotion picker popup */}
            {editingStage === index && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-30 min-w-max">
                <div className="flex space-x-2">
                  {EMOTIONS.map((emotion) => (
                    <button
                      key={emotion.emoji}
                      onClick={() => handleEmotionSelect(index, emotion.emoji)}
                      className={`p-3 text-xl hover:bg-gray-100 rounded-lg transition-colors ${
                        position.emoji === emotion.emoji ? 'bg-blue-100 ring-2 ring-blue-300' : ''
                      }`}
                      title={emotion.name}
                    >
                      {emotion.emoji}
                    </button>
                  ))}
                </div>
                {!position.isEmpty && (
                  <div className="text-center mt-2 pt-2 border-t">
                    <button
                      onClick={() => handleEmotionSelect(index, '')}
                      className="text-xs text-red-500 hover:text-red-700 mr-4"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => setEditingStage(null)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Close
                    </button>
                  </div>
                )}
                {position.isEmpty && (
                  <div className="text-center mt-2 pt-2 border-t">
                    <button
                      onClick={() => setEditingStage(null)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}