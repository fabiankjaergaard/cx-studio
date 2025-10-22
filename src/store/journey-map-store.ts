import { create } from 'zustand'
import { JourneyMapData, JourneyMapCell, JourneyMapRow, Insight } from '@/types/journey-map'
import { saveJourneyMap } from '@/services/journeyMapStorage'

// History state for undo/redo
interface HistoryState {
  past: JourneyMapData[]
  present: JourneyMapData | null
  future: JourneyMapData[]
}

interface JourneyMapStore {
  // History state
  history: HistoryState

  // Auto-save state
  isSaving: boolean
  lastSaved: Date | null

  // Actions
  setJourneyMap: (journeyMap: JourneyMapData) => void
  updateJourneyMap: (updates: Partial<JourneyMapData>) => void
  updateCell: (rowId: string, cellId: string, updates: Partial<JourneyMapCell>) => void
  updateRow: (rowId: string, updates: Partial<JourneyMapRow>) => void
  addRow: (row: JourneyMapRow) => void
  deleteRow: (rowId: string) => void
  addInsight: (insight: Insight) => void
  updateInsight: (insightId: string, updates: Partial<Insight>) => void
  deleteInsight: (insightId: string) => void

  // Undo/Redo actions
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean

  // Save action
  save: () => Promise<void>

  // Reset action
  reset: () => void
}

// Maximum number of history states to keep (prevent memory issues)
const MAX_HISTORY_LENGTH = 50

// Helper: Create a new history state
const createHistoryState = (journeyMap: JourneyMapData | null): HistoryState => ({
  past: [],
  present: journeyMap,
  future: []
})

// Helper: Push a new state to history
const pushToHistory = (
  history: HistoryState,
  newPresent: JourneyMapData
): HistoryState => {
  const newPast = history.present
    ? [...history.past, history.present].slice(-MAX_HISTORY_LENGTH)
    : history.past

  return {
    past: newPast,
    present: newPresent,
    future: [] // Clear future when new action is performed
  }
}

// Helper: Deep clone journey map to prevent mutations
const cloneJourneyMap = (journeyMap: JourneyMapData): JourneyMapData => {
  return JSON.parse(JSON.stringify(journeyMap))
}

export const useJourneyMapStore = create<JourneyMapStore>((set, get) => ({
  // Initial state
  history: createHistoryState(null),
  isSaving: false,
  lastSaved: null,

  // Set initial journey map (e.g., when loading from storage)
  setJourneyMap: (journeyMap) => {
    set({
      history: createHistoryState(cloneJourneyMap(journeyMap))
    })
  },

  // Update journey map (creates history entry)
  updateJourneyMap: (updates) => {
    const { history } = get()
    if (!history.present) return

    const updatedMap: JourneyMapData = {
      ...history.present,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    set({
      history: pushToHistory(history, cloneJourneyMap(updatedMap))
    })

    // Auto-save after update
    get().save()
  },

  // Update a specific cell
  updateCell: (rowId, cellId, updates) => {
    const { history } = get()
    if (!history.present) return

    const updatedRows = history.present.rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          cells: row.cells.map(cell =>
            cell.id === cellId ? { ...cell, ...updates } : cell
          )
        }
      }
      return row
    })

    const updatedMap: JourneyMapData = {
      ...history.present,
      rows: updatedRows,
      updatedAt: new Date().toISOString()
    }

    set({
      history: pushToHistory(history, cloneJourneyMap(updatedMap))
    })

    // Auto-save after update
    get().save()
  },

  // Update a specific row
  updateRow: (rowId, updates) => {
    const { history } = get()
    if (!history.present) return

    const updatedRows = history.present.rows.map(row =>
      row.id === rowId ? { ...row, ...updates } : row
    )

    const updatedMap: JourneyMapData = {
      ...history.present,
      rows: updatedRows,
      updatedAt: new Date().toISOString()
    }

    set({
      history: pushToHistory(history, cloneJourneyMap(updatedMap))
    })

    // Auto-save after update
    get().save()
  },

  // Add a new row
  addRow: (row) => {
    const { history } = get()
    if (!history.present) return

    const updatedMap: JourneyMapData = {
      ...history.present,
      rows: [...history.present.rows, row],
      updatedAt: new Date().toISOString()
    }

    set({
      history: pushToHistory(history, cloneJourneyMap(updatedMap))
    })

    // Auto-save after update
    get().save()
  },

  // Delete a row
  deleteRow: (rowId) => {
    const { history } = get()
    if (!history.present) return

    const updatedMap: JourneyMapData = {
      ...history.present,
      rows: history.present.rows.filter(row => row.id !== rowId),
      updatedAt: new Date().toISOString()
    }

    set({
      history: pushToHistory(history, cloneJourneyMap(updatedMap))
    })

    // Auto-save after update
    get().save()
  },

  // Add an insight
  addInsight: (insight) => {
    const { history } = get()
    if (!history.present) return

    const updatedMap: JourneyMapData = {
      ...history.present,
      insights: [...(history.present.insights || []), insight],
      updatedAt: new Date().toISOString()
    }

    set({
      history: pushToHistory(history, cloneJourneyMap(updatedMap))
    })

    // Auto-save after update
    get().save()
  },

  // Update an insight
  updateInsight: (insightId, updates) => {
    const { history } = get()
    if (!history.present) return

    const updatedInsights = (history.present.insights || []).map(insight =>
      insight.id === insightId ? { ...insight, ...updates } : insight
    )

    const updatedMap: JourneyMapData = {
      ...history.present,
      insights: updatedInsights,
      updatedAt: new Date().toISOString()
    }

    set({
      history: pushToHistory(history, cloneJourneyMap(updatedMap))
    })

    // Auto-save after update
    get().save()
  },

  // Delete an insight
  deleteInsight: (insightId) => {
    const { history } = get()
    if (!history.present) return

    const updatedMap: JourneyMapData = {
      ...history.present,
      insights: (history.present.insights || []).filter(
        insight => insight.id !== insightId
      ),
      updatedAt: new Date().toISOString()
    }

    set({
      history: pushToHistory(history, cloneJourneyMap(updatedMap))
    })

    // Auto-save after update
    get().save()
  },

  // Undo action
  undo: () => {
    const { history } = get()

    if (history.past.length === 0) {
      console.log('No more actions to undo')
      return
    }

    const previous = history.past[history.past.length - 1]
    const newPast = history.past.slice(0, history.past.length - 1)
    const newFuture = history.present
      ? [history.present, ...history.future]
      : history.future

    set({
      history: {
        past: newPast,
        present: previous,
        future: newFuture
      }
    })

    // Auto-save after undo
    get().save()
  },

  // Redo action
  redo: () => {
    const { history } = get()

    if (history.future.length === 0) {
      console.log('No more actions to redo')
      return
    }

    const next = history.future[0]
    const newFuture = history.future.slice(1)
    const newPast = history.present
      ? [...history.past, history.present]
      : history.past

    set({
      history: {
        past: newPast,
        present: next,
        future: newFuture
      }
    })

    // Auto-save after redo
    get().save()
  },

  // Check if undo is available
  canUndo: () => {
    return get().history.past.length > 0
  },

  // Check if redo is available
  canRedo: () => {
    return get().history.future.length > 0
  },

  // Save to localStorage
  save: async () => {
    const { history } = get()
    if (!history.present) return

    set({ isSaving: true })

    try {
      await saveJourneyMap(history.present)
      set({
        lastSaved: new Date(),
        isSaving: false
      })
      console.log('Journey map auto-saved successfully')
    } catch (error) {
      console.error('Failed to save journey map:', error)
      set({ isSaving: false })
    }
  },

  // Reset store
  reset: () => {
    set({
      history: createHistoryState(null),
      isSaving: false,
      lastSaved: null
    })
  }
}))
