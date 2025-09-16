'use client'

import React, { createContext, useContext, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface DragContextType {
  isDragging: boolean
  setIsDragging: (dragging: boolean) => void
}

const DragContext = createContext<DragContextType | undefined>(undefined)

export function useDragContext() {
  const context = useContext(DragContext)
  if (!context) {
    throw new Error('useDragContext must be used within a DragDropProvider')
  }
  return context
}

interface DragDropProviderProps {
  children: React.ReactNode
}

export function DragDropProvider({ children }: DragDropProviderProps) {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <DndProvider backend={HTML5Backend}>
      <DragContext.Provider value={{ isDragging, setIsDragging }}>
        {children}
      </DragContext.Provider>
    </DndProvider>
  )
}