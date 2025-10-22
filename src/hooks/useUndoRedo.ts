import { useEffect } from 'react'

/**
 * Custom hook to handle undo/redo keyboard shortcuts
 *
 * Keyboard shortcuts:
 * - Cmd+Z (Mac) / Ctrl+Z (Windows/Linux): Undo
 * - Cmd+Shift+Z (Mac) / Ctrl+Shift+Z (Windows/Linux): Redo
 *
 * Note: Also supports Cmd+Y / Ctrl+Y as alternative redo shortcut
 */
export const useUndoRedo = (
  undo: () => void,
  redo: () => void,
  canUndo: boolean,
  canRedo: boolean
) => {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Cmd (Mac) or Ctrl (Windows/Linux)
      const isModifierPressed = event.metaKey || event.ctrlKey

      if (!isModifierPressed) return

      // Prevent default browser behavior for these shortcuts
      if (event.key === 'z' || event.key === 'Z' || event.key === 'y' || event.key === 'Y') {
        event.preventDefault()
      }

      // Undo: Cmd+Z or Ctrl+Z
      if (event.key === 'z' && !event.shiftKey && canUndo) {
        console.log('🔄 Undo triggered via keyboard shortcut')
        undo()
        return
      }

      // Redo: Cmd+Shift+Z or Ctrl+Shift+Z
      if (event.key === 'z' && event.shiftKey && canRedo) {
        console.log('🔄 Redo triggered via keyboard shortcut')
        redo()
        return
      }

      // Redo: Cmd+Y or Ctrl+Y (alternative shortcut)
      if (event.key === 'y' && canRedo) {
        console.log('🔄 Redo triggered via keyboard shortcut (Cmd+Y)')
        redo()
        return
      }
    }

    // Add event listener
    window.addEventListener('keydown', handleKeyDown)

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [undo, redo, canUndo, canRedo])
}
