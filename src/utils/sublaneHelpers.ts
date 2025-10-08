/**
 * Sublane Helpers
 *
 * This file contains all utility functions for managing sublanes in journey maps.
 *
 * Key principles:
 * 1. Sublane background is always white (like main row)
 * 2. Sublane cards inherit a LIGHTER version of the parent cell's color
 * 3. Sublane cards only appear in columns where the parent row has a card
 * 4. If parent row cell is empty → sublane cell is also empty (no card)
 */

import { JourneyMapSublane, JourneyMapCell, JourneyMapRow } from '@/types/journey-map'

/**
 * Converts a Tailwind color class to a lighter variant for sublanes
 * Special handling for red/rose/pink colors which are too light at 100
 *
 * Strategy:
 * - Red/Rose/Pink at 200: Use 200 with 75% opacity for subtle but visible effect
 * - All other colors: Go one step lighter (200 → 100)
 * - This keeps red visible while maintaining hierarchy
 *
 * @param colorClass - The Tailwind color class (e.g., 'bg-blue-200')
 * @param isVibrant - Whether vibrant mode is enabled (not used, kept for API compatibility)
 */
export function getLighterColorVariant(colorClass: string | undefined, isVibrant: boolean = false): string | undefined {
  if (!colorClass) return undefined

  // Extract color name and intensity
  const regex = /bg-(\w+)-(\d+)/
  const match = colorClass.match(regex)

  if (!match) return colorClass

  const [, colorName, intensity] = match
  const currentIntensity = parseInt(intensity)

  // For rose/pink colors, return a lighter variant
  // Parent shows as 300, so sublane should be 200 (but not converted further)
  if (colorName === 'rose' || colorName === 'pink') {
    // Return 200 for sublanes - this will NOT be converted by getAdjustedBackgroundColor
    // because we use disableColorConversion={true}
    return `bg-${colorName}-200`
  }

  // For all other colors, go one step lighter
  const colorMap: Record<string, string> = {
    '900': '800',
    '800': '700',
    '700': '600',
    '600': '500',
    '500': '400',
    '400': '300',
    '300': '200',
    '200': '100',
    '100': '50',
  }

  const lighterIntensity = colorMap[intensity] || intensity
  return `bg-${colorName}-${lighterIntensity}`
}

/**
 * Creates a new sublane for a parent row
 * The sublane will have cells that match the parent row's structure
 *
 * @param parentRow - The parent row
 * @param stageCount - Number of stages in the journey map
 * @param isVibrant - Whether vibrant mode is enabled (optional, defaults to false)
 */
export function createNewSublane(
  parentRow: JourneyMapRow,
  stageCount: number,
  isVibrant: boolean = false
): JourneyMapSublane {
  const sublaneId = `sublane-${Date.now()}`

  // Create cells that match parent row structure
  const cells: JourneyMapCell[] = []

  for (let i = 0; i < stageCount; i++) {
    const parentCell = parentRow.cells[i]
    const parentColor = (parentCell?.content || parentCell?.backgroundColor) ? (parentCell.backgroundColor || parentRow.color) : undefined

    cells.push({
      id: `${sublaneId}-cell-${i}`,
      content: '',
      // Set backgroundColor if parent cell has content OR backgroundColor
      backgroundColor: getLighterColorVariant(parentColor, isVibrant),
      icon: undefined
    })
  }

  return {
    id: sublaneId,
    parentRowId: parentRow.id,
    name: 'New sublane',
    cells
  }
}

/**
 * Checks if a sublane cell should display a card
 * A card should be shown if the parent row has content OR backgroundColor in that column
 */
export function shouldShowSublaneCard(
  parentRow: JourneyMapRow,
  cellIndex: number
): boolean {
  const parentCell = parentRow.cells[cellIndex]
  return Boolean(parentCell?.content || parentCell?.backgroundColor)
}

/**
 * Gets the background color for a sublane cell
 * Returns a variant of the parent cell's backgroundColor based on color intensity mode
 *
 * @param parentRow - The parent row
 * @param cellIndex - The cell index
 * @param isVibrant - Whether vibrant mode is enabled (optional, defaults to false)
 */
export function getSublaneCardColor(
  parentRow: JourneyMapRow,
  cellIndex: number,
  isVibrant: boolean = false
): string | undefined {
  const parentCell = parentRow.cells[cellIndex]

  if (parentCell?.content || parentCell?.backgroundColor) {
    // Use cell's backgroundColor if it exists, otherwise fall back to row color
    const parentColor = parentCell.backgroundColor || parentRow.color
    // Return a variant based on color intensity mode for visual hierarchy
    return getLighterColorVariant(parentColor, isVibrant)
  }

  return undefined
}

/**
 * Updates sublane cells when parent row changes
 * This ensures sublane cards always match the parent row's structure
 */
export function syncSublaneWithParentRow(
  sublane: JourneyMapSublane,
  parentRow: JourneyMapRow,
  stageCount: number
): JourneyMapSublane {
  const updatedCells = sublane.cells.map((cell, index) => {
    const parentCell = parentRow.cells[index]
    const parentColor = (parentCell?.content || parentCell?.backgroundColor) ? (parentCell.backgroundColor || parentRow.color) : undefined

    return {
      ...cell,
      // Update background color based on parent cell content OR backgroundColor
      backgroundColor: getLighterColorVariant(parentColor)
    }
  })

  // Ensure we have the right number of cells
  while (updatedCells.length < stageCount) {
    const index = updatedCells.length
    const parentCell = parentRow.cells[index]
    const parentColor = (parentCell?.content || parentCell?.backgroundColor) ? (parentCell.backgroundColor || parentRow.color) : undefined

    updatedCells.push({
      id: `${sublane.id}-cell-${index}`,
      content: '',
      backgroundColor: getLighterColorVariant(parentColor)
    })
  }

  return {
    ...sublane,
    cells: updatedCells.slice(0, stageCount)
  }
}

/**
 * Updates all sublanes when parent row color changes
 */
export function updateSublanesColorFromParent(
  sublanes: JourneyMapSublane[],
  parentRow: JourneyMapRow
): JourneyMapSublane[] {
  return sublanes.map(sublane => ({
    ...sublane,
    cells: sublane.cells.map((cell, index) => {
      const parentCell = parentRow.cells[index]
      const parentColor = parentCell?.content ? (parentCell.backgroundColor || parentRow.color) : undefined

      return {
        ...cell,
        backgroundColor: getLighterColorVariant(parentColor)
      }
    })
  }))
}
