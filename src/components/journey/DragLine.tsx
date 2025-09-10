'use client'

import React, { useEffect, useState } from 'react'
import { useJourneyStore } from '@/store/journey-store'

interface DragLineProps {
  canvasRef: React.RefObject<HTMLDivElement>
}

export function DragLine({ canvasRef }: DragLineProps) {
  const { 
    isConnecting, 
    connectionStart, 
    isDragging: isConnectionDragging, 
    dragStartPosition, 
    dragCurrentPosition 
  } = useJourneyStore()

  // Convert global coordinates to canvas-relative coordinates
  const getCanvasPosition = (globalPos: { x: number; y: number }) => {
    if (!canvasRef.current) return { x: 0, y: 0 }
    
    const canvasRect = canvasRef.current.getBoundingClientRect()
    return {
      x: globalPos.x - canvasRect.left,
      y: globalPos.y - canvasRect.top
    }
  }

  if (!isConnectionDragging || !dragStartPosition || !dragCurrentPosition) return null

  const startPos = getCanvasPosition(dragStartPosition)
  const mousePos = getCanvasPosition(dragCurrentPosition)

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-30"
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <path
        d={`M ${startPos.x} ${startPos.y} L ${mousePos.x} ${mousePos.y}`}
        stroke="#f59e0b"
        strokeWidth="3"
        fill="none"
        opacity="0.9"
        strokeDasharray="6 3"
        style={{
          transition: 'none',
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
        }}
      />
    </svg>
  )
}