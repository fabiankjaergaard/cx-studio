'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Undo2, Redo2 } from 'lucide-react'

interface UndoRedoToolbarProps {
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  historyLength?: number
  className?: string
}

/**
 * Toolbar component for undo/redo actions
 *
 * Features:
 * - Visual feedback for available/unavailable actions
 * - Tooltips showing keyboard shortcuts
 * - History count indicator
 */
export const UndoRedoToolbar: React.FC<UndoRedoToolbarProps> = ({
  undo,
  redo,
  canUndo,
  canRedo,
  historyLength = 0,
  className = ''
}) => {

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Undo Button */}
      <div className="relative group">
        <Button
          variant="outline"
          size="sm"
          onClick={undo}
          disabled={!canUndo}
          className={`flex items-center gap-1.5 ${
            !canUndo ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50'
          }`}
          aria-label="Undo last action"
        >
          <Undo2 className="w-4 h-4" />
          <span className="hidden sm:inline">Undo</span>
        </Button>
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          Undo (⌘Z)
        </div>
      </div>

      {/* Redo Button */}
      <div className="relative group">
        <Button
          variant="outline"
          size="sm"
          onClick={redo}
          disabled={!canRedo}
          className={`flex items-center gap-1.5 ${
            !canRedo ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50'
          }`}
          aria-label="Redo last undone action"
        >
          <Redo2 className="w-4 h-4" />
          <span className="hidden sm:inline">Redo</span>
        </Button>
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          Redo (⌘⇧Z)
        </div>
      </div>

      {/* History count (optional) */}
      {historyLength > 0 && (
        <>
          <div className="w-px h-6 bg-slate-200 mx-1" />
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="hidden md:inline">{historyLength} change{historyLength !== 1 ? 's' : ''}</span>
          </div>
        </>
      )}
    </div>
  )
}
