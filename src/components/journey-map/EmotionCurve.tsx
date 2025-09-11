'use client'

import { useState } from 'react'

interface EmotionCurveProps {
  emotions: string[]
  onChange: (emotions: string[]) => void
  stageCount: number
}

// Simple emotion mapping (1-5 scale)
const EMOTIONS = [
  { emoji: '😢', name: 'Ledsen', value: 1 },
  { emoji: '😞', name: 'Besviken', value: 2 },
  { emoji: '😐', name: 'Neutral', value: 3 },
  { emoji: '😊', name: 'Nöjd', value: 4 },
  { emoji: '😍', name: 'Mycket nöjd', value: 5 }
]

export function EmotionCurve({ emotions, onChange, stageCount }: EmotionCurveProps) {
  const [editingStage, setEditingStage] = useState<number | null>(null)

  // Get current emotions, defaulting to neutral
  const getCurrentEmotions = () => {
    const result: string[] = []
    for (let i = 0; i < stageCount; i++) {
      result[i] = emotions[i] || '😐'
    }
    return result
  }

  const currentEmotions = getCurrentEmotions()

  const handleEmotionSelect = (stageIndex: number, emoji: string) => {
    const newEmotions = [...currentEmotions]
    newEmotions[stageIndex] = emoji
    onChange(newEmotions)
    setEditingStage(null)
  }

  // Calculate positions based on emotion values
  const getEmotionPositions = () => {
    return currentEmotions.map((emoji, index) => {
      const emotion = EMOTIONS.find(e => e.emoji === emoji) || EMOTIONS[2] // default to neutral
      // Center emojis in their grid columns
      const xPercent = (index + 0.5) * (100 / stageCount) // Center in each column
      const yPercent = ((5 - emotion.value) / 4) * 60 + 20 // Map 1-5 to 80%-20% from top
      return { x: xPercent, y: yPercent, emoji, value: emotion.value }
    })
  }

  const positions = getEmotionPositions()

  // Create simple line path connecting all emotions in sequence
  const createLinePath = () => {
    if (positions.length < 2) return ''
    
    // Always start with the first position
    let path = `M ${positions[0].x} ${positions[0].y}`
    
    // Connect to each subsequent position - ensure we iterate through ALL positions
    for (let i = 1; i < positions.length; i++) {
      path += ` L ${positions[i].x} ${positions[i].y}`
    }
    
    // Debug log to check the path
    console.log('Path:', path, 'Positions:', positions.length)
    
    return path
  }

  return (
    <div className="relative w-full h-32 bg-white border border-gray-200 rounded-lg overflow-visible">
      {/* SVG for the connecting line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Simple line connecting emotions */}
        <path
          d={createLinePath()}
          stroke="#6b7280"
          strokeWidth="1.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
          className="transition-all duration-300"
        />
      </svg>
      
      {/* Emojis positioned based on emotion values */}
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
            {/* Emoji button */}
            <button
              onClick={() => setEditingStage(editingStage === index ? null : index)}
              className="text-lg bg-white border-2 border-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:border-gray-400 hover:scale-110 transition-all shadow-sm"
            >
              {position.emoji}
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
                <div className="text-center mt-2 pt-2 border-t">
                  <button
                    onClick={() => setEditingStage(null)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Stäng
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}