import { useState, useCallback, useRef, useEffect } from 'react'
import { JourneyMapData } from '@/types/journey-map'

interface HistoryState {
  past: JourneyMapData[]
  present: JourneyMapData | null
  future: JourneyMapData[]
}

const MAX_HISTORY = 50

/**
 * Enhanced useState hook with undo/redo functionality
 *
 * This hook wraps useState and adds history tracking for undo/redo
 * without requiring a complete refactor of existing code.
 *
 * Usage:
 * ```tsx
 * const [journeyMap, setJourneyMap, { undo, redo, canUndo, canRedo }] = useJourneyMapHistory(null)
 * ```
 */
export const useJourneyMapHistory = (initialValue: JourneyMapData | null) => {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: initialValue,
    future: []
  })

  // Track if we're in an undo/redo operation to prevent adding to history
  const isUndoRedoRef = useRef(false)

  // Get current value
  const value = history.present

  // Set value (with history tracking)
  const setValue = useCallback((newValue: JourneyMapData | null | ((prev: JourneyMapData | null) => JourneyMapData | null)) => {
    setHistory(currentHistory => {
      // Compute new value
      const computedValue = typeof newValue === 'function'
        ? newValue(currentHistory.present)
        : newValue

      // Don't add to history if we're doing undo/redo
      if (isUndoRedoRef.current) {
        isUndoRedoRef.current = false
        return {
          ...currentHistory,
          present: computedValue
        }
      }

      // Don't add to history if value didn't change
      if (JSON.stringify(computedValue) === JSON.stringify(currentHistory.present)) {
        return currentHistory
      }

      // Add current present to past
      const newPast = currentHistory.present
        ? [...currentHistory.past, currentHistory.present].slice(-MAX_HISTORY)
        : currentHistory.past

      return {
        past: newPast,
        present: computedValue,
        future: [] // Clear future when new action is performed
      }
    })
  }, [])

  // Undo function
  const undo = useCallback(() => {
    setHistory(currentHistory => {
      if (currentHistory.past.length === 0) {
        console.log('⚠️ No more actions to undo')
        return currentHistory
      }

      const previous = currentHistory.past[currentHistory.past.length - 1]
      const newPast = currentHistory.past.slice(0, -1)
      const newFuture = currentHistory.present
        ? [currentHistory.present, ...currentHistory.future]
        : currentHistory.future

      isUndoRedoRef.current = true

      console.log('↩️ Undo performed')
      return {
        past: newPast,
        present: previous,
        future: newFuture
      }
    })
  }, [])

  // Redo function
  const redo = useCallback(() => {
    setHistory(currentHistory => {
      if (currentHistory.future.length === 0) {
        console.log('⚠️ No more actions to redo')
        return currentHistory
      }

      const next = currentHistory.future[0]
      const newFuture = currentHistory.future.slice(1)
      const newPast = currentHistory.present
        ? [...currentHistory.past, currentHistory.present]
        : currentHistory.past

      isUndoRedoRef.current = true

      console.log('↪️ Redo performed')
      return {
        past: newPast,
        present: next,
        future: newFuture
      }
    })
  }, [])

  // Can undo/redo
  const canUndo = history.past.length > 0
  const canRedo = history.future.length > 0

  // Reset history (useful when loading new journey map)
  const reset = useCallback((newValue: JourneyMapData | null) => {
    setHistory({
      past: [],
      present: newValue,
      future: []
    })
  }, [])

  return [
    value,
    setValue,
    {
      undo,
      redo,
      canUndo,
      canRedo,
      reset,
      historyLength: history.past.length
    }
  ] as const
}
