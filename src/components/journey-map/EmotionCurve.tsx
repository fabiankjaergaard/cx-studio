'use client'

import React, { useState, useRef, useEffect } from 'react'
import twemoji from 'twemoji'

interface EmotionCurveProps {
  emotions: string[]
  onChange: (emotions: string[]) => void
  stageCount: number
}

interface EmotionPosition {
  emoji: string
  yPercent: number
}

// Twemoji emotion mapping - real emoji faces
const EMOTIONS = [
  { emoji: '😭', name: 'Crying', value: 1 },
  { emoji: '😢', name: 'Sad', value: 1 },
  { emoji: '😰', name: 'Anxious', value: 1 },
  { emoji: '😡', name: 'Angry', value: 1 },
  { emoji: '😞', name: 'Disappointed', value: 2 },
  { emoji: '😔', name: 'Dejected', value: 2 },
  { emoji: '😟', name: 'Worried', value: 2 },
  { emoji: '😕', name: 'Slightly Frowning', value: 2 },
  { emoji: '😐', name: 'Neutral', value: 3 },
  { emoji: '😶', name: 'Blank', value: 3 },
  { emoji: '🤔', name: 'Thinking', value: 3 },
  { emoji: '😑', name: 'Expressionless', value: 3 },
  { emoji: '😊', name: 'Happy', value: 4 },
  { emoji: '😌', name: 'Relieved', value: 4 },
  { emoji: '🙂', name: 'Slightly Smiling', value: 4 },
  { emoji: '😏', name: 'Smirking', value: 4 },
  { emoji: '😍', name: 'Heart Eyes', value: 5 },
  { emoji: '🤩', name: 'Star Eyes', value: 5 },
  { emoji: '😄', name: 'Grinning', value: 5 },
  { emoji: '🥰', name: 'Loving', value: 5 },
  { emoji: '😻', name: 'Cat Heart Eyes', value: 5 },
  { emoji: '🎉', name: 'Celebrating', value: 5 }
]

// Component to render Twemoji
function TwemojiEmoji({ emoji, size = 18 }: { emoji: string; size?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      const html = twemoji.parse(emoji, {
        folder: 'svg',
        ext: '.svg',
        base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
      })
      ref.current.innerHTML = html

      // Apply size to the img element
      const img = ref.current.querySelector('img')
      if (img) {
        img.style.width = `${size}px`
        img.style.height = `${size}px`
        img.style.display = 'inline-block'
      }
    }
  }, [emoji, size])

  return <span ref={ref} style={{ display: 'inline-block', lineHeight: 1 }}></span>
}

export function EmotionCurve({ emotions, onChange, stageCount }: EmotionCurveProps) {
  const [editingStage, setEditingStage] = useState<number | null>(null)
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null)
  const [showAddButton, setShowAddButton] = useState(false)
  const [hoveredEmoji, setHoveredEmoji] = useState<string | null>(null)
  const [dragState, setDragState] = useState<{
    isDragging: boolean
    stageIndex: number
    startY: number
    startYPercent: number
  } | null>(null)

  // Handle click outside to close emoji picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (editingStage !== null && !target.closest('.emoji-picker-container')) {
        setEditingStage(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [editingStage])

  // Parse emotions from the stored format: "emoji:yPercent,emoji:yPercent,..."
  const parseEmotions = (): (EmotionPosition | null)[] => {
    const result: (EmotionPosition | null)[] = []

    emotions.forEach((emotionStr, index) => {
      if (!emotionStr || emotionStr.trim() === '') {
        result[index] = null
        return
      }

      // Check if it contains position data (format: "emoji:yPercent")
      if (emotionStr.includes(':')) {
        const [emoji, yPercentStr] = emotionStr.split(':')
        const yPercent = parseFloat(yPercentStr) || 50
        result[index] = { emoji: emoji.trim(), yPercent }
      } else {
        // Legacy format - just emoji, calculate default position based on emotion value
        const emotion = EMOTIONS.find(e => e.emoji === emotionStr.trim()) || EMOTIONS[10] // default to thinking
        const yPercent = ((5 - emotion.value) / 4) * 60 + 20
        result[index] = { emoji: emotion.emoji, yPercent }
      }
    })

    return result
  }

  const currentEmotions = parseEmotions()

  const handleEmotionSelect = (stageIndex: number, emoji: string) => {
    const newEmotionsData = [...currentEmotions]

    // Ensure the array is long enough
    while (newEmotionsData.length <= stageIndex) {
      newEmotionsData.push(null)
    }

    if (emoji === '') {
      // Remove emotion
      newEmotionsData[stageIndex] = null
    } else {
      // Add new emotion with default position based on its emotion value
      const emotionDef = EMOTIONS.find(e => e.emoji === emoji)
      const defaultYPercent = emotionDef ? ((5 - emotionDef.value) / 4) * 60 + 20 : 50
      newEmotionsData[stageIndex] = { emoji, yPercent: defaultYPercent }
    }

    // Convert back to string format for storage
    const emotionStrings = newEmotionsData.map(emotionPos =>
      emotionPos ? `${emotionPos.emoji}:${emotionPos.yPercent}` : ''
    )

    // Remove trailing empty strings
    while (emotionStrings.length > 0 && emotionStrings[emotionStrings.length - 1] === '') {
      emotionStrings.pop()
    }

    onChange(emotionStrings)
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
      const emotionPos = currentEmotions[i]
      const xPercent = (i + 0.5) * (100 / stageCount) // Center in each column
      const yPercent = emotionPos ? emotionPos.yPercent : 50 // Higher emotion value = higher position

      positions.push({
        x: xPercent,
        y: yPercent,
        emoji: emotionPos?.emoji || '',
        isEmpty: !emotionPos
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

  // Handle drag operations
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState || !dragState.isDragging) return

    e.preventDefault()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const deltaY = e.clientY - dragState.startY
    const deltaPercent = (deltaY / rect.height) * 100

    // Dragging down increases yPercent (moves emoji down on curve)
    let newYPercent = dragState.startYPercent + deltaPercent
    newYPercent = Math.max(10, Math.min(90, newYPercent)) // Constrain to 10-90%

    // Update the position in real-time
    const newEmotionsData = [...currentEmotions]
    if (newEmotionsData[dragState.stageIndex]) {
      newEmotionsData[dragState.stageIndex] = {
        ...newEmotionsData[dragState.stageIndex],
        yPercent: newYPercent
      }
    }

    // Convert back to string format
    const emotionStrings = newEmotionsData.map(emotionPos =>
      emotionPos ? `${emotionPos.emoji}:${emotionPos.yPercent}` : ''
    )

    // Remove trailing empty strings
    while (emotionStrings.length > 0 && emotionStrings[emotionStrings.length - 1] === '') {
      emotionStrings.pop()
    }

    onChange(emotionStrings)
  }

  const handleMouseUp = () => {
    if (dragState) {
      setDragState(null)
    }
  }

  return (
    <div
      className="emotion-curve-container relative w-full h-32 bg-white border border-gray-200 rounded-lg overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
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
            className="group absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`
            }}
          >
            {/* Emoji or empty dot with plus */}
            <button
              onClick={(e) => {
                if (!dragState) {
                  setEditingStage(editingStage === index ? null : index)
                }
              }}
              onMouseDown={(e) => {
                if (!position.isEmpty) {
                  e.preventDefault()
                  setDragState({
                    isDragging: true,
                    stageIndex: index,
                    startY: e.clientY,
                    startYPercent: currentEmotions[index]?.yPercent || 50
                  })
                }
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200 shadow-sm ${
                position.isEmpty
                  ? 'bg-gray-100 border-gray-300 hover:border-gray-400 hover:bg-gray-200 hover:shadow-md'
                  : 'bg-white border-gray-200 hover:border-gray-400 hover:scale-110 hover:shadow-lg cursor-move'
              } ${dragState?.stageIndex === index ? 'ring-2 ring-blue-400 scale-110' : ''}`}
            >
              {position.isEmpty ? (
                <span className="text-gray-400 text-sm font-bold">+</span>
              ) : (
                <TwemojiEmoji emoji={position.emoji} size={18} />
              )}
            </button>
            
            {/* Hover tooltip for existing emojis */}
            {!position.isEmpty && !editingStage && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-40">
                {EMOTIONS.find(e => e.emoji === position.emoji)?.name || 'Unknown'} • Dra för att ändra position
              </div>
            )}

            {/* Emotion picker popup */}
            {editingStage === index && (
              <div className="emoji-picker-container absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-30 w-80">
                <div className="text-xs text-gray-600 mb-2 text-center font-medium">
                  Välj en känsla <span className="text-gray-500">(du kan sedan dra den för att ändra position)</span>
                </div>
                <div className="grid grid-cols-6 gap-1 max-h-48 overflow-y-auto">
                  {EMOTIONS.map((emotion, emotionIndex) => {
                    // Check if this emotion is in the top row (first 6 emotions)
                    const isTopRow = emotionIndex < 6
                    return (
                      <button
                        key={emotion.emoji}
                        onClick={() => handleEmotionSelect(index, emotion.emoji)}
                        onMouseEnter={() => setHoveredEmoji(emotion.emoji)}
                        onMouseLeave={() => setHoveredEmoji(null)}
                        className={`relative p-3 hover:bg-gray-100 rounded-lg transition-colors ${
                          position.emoji === emotion.emoji ? 'bg-blue-100 ring-2 ring-blue-300' : ''
                        }`}
                      >
                        <TwemojiEmoji emoji={emotion.emoji} size={20} />
                        {/* Individual hover tooltip - position based on row */}
                        {hoveredEmoji === emotion.emoji && (
                          <div className={`absolute left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded pointer-events-none whitespace-nowrap z-50 ${
                            isTopRow ? 'top-full mt-1' : 'bottom-full mb-1'
                          }`}>
                            {emotion.name}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
                {!position.isEmpty && (
                  <div className="text-center mt-2 pt-2 border-t">
                    <button
                      onClick={() => handleEmotionSelect(index, '')}
                      className="text-xs text-red-500 hover:text-red-700 mr-4"
                    >
                      Ta bort
                    </button>
                    <button
                      onClick={() => setEditingStage(null)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Stäng
                    </button>
                  </div>
                )}
                {position.isEmpty && (
                  <div className="text-center mt-2 pt-2 border-t">
                    <button
                      onClick={() => setEditingStage(null)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Stäng
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