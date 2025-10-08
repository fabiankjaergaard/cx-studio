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

  // Kustra Color System - sublanes always get very light colors
  // Both vibrant and subtle mode: Use very light hex colors (almost white)
  const kustraSublaneMap: Record<string, string> = {
    // 8 main Kustra colors - vibrant to sublane
    'bg-[#F9FAFB]': 'bg-[#FCFCFD]',  // Cloud White → very light
    'bg-[#778DB0]': 'bg-[#CED6E2]',  // Calm Blue → very light
    'bg-[#77BB92]': 'bg-[#CEE8DB]',  // Mint Green → very light
    'bg-[#F4C542]': 'bg-[#FDF3C8]',  // Golden Sun → very light
    'bg-[#ED6B5A]': 'bg-[#F8C8C1]',  // Coral Orange → very light
    'bg-[#A67FB5]': 'bg-[#DDD0E6]',  // Soft Purple → very light
    'bg-[#E89FAB]': 'bg-[#F5D8DE]',  // Rose Pink → very light
    'bg-[#8A8A8A]': 'bg-[#D7D7D7]',  // Slate Gray → very light
    // Map middle-ground (subtle) colors to very light
    'bg-[#FBFCFC]': 'bg-[#FCFCFD]',
    'bg-[#A3B2C9]': 'bg-[#CED6E2]',
    'bg-[#A3D2B7]': 'bg-[#CEE8DB]',
    'bg-[#F7D976]': 'bg-[#FDF3C8]',
    'bg-[#F39A8E]': 'bg-[#F8C8C1]',
    'bg-[#BFA0CA]': 'bg-[#DDD0E6]',
    'bg-[#EFBCC4]': 'bg-[#F5D8DE]',
    'bg-[#B1B1B1]': 'bg-[#D7D7D7]'
  }

  // Check if it's a Kustra color
  // Split to extract base color (ignore opacity)
  const parts = colorClass.split('/')
  const baseColor = parts[0]

  // Always return very light color for sublanes
  if (kustraSublaneMap[baseColor]) {
    return kustraSublaneMap[baseColor]
  }

  // Extract color name and intensity for legacy colors
  const regex = /bg-(\w+)-(\d+)/
  const match = colorClass.match(regex)

  if (!match) return colorClass

  const [, colorName, intensity] = match
  const currentIntensity = parseInt(intensity)

  // Legacy support for old color system
  if (colorName === 'rose' || colorName === 'pink') {
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
 * NOTE: Background colors are NOT set here - they are calculated at render time
 * in SublaneRow component based on the current color intensity mode.
 *
 * @param parentRow - The parent row
 * @param stageCount - Number of stages in the journey map
 * @param isVibrant - Deprecated parameter, kept for API compatibility but not used
 */
export function createNewSublane(
  parentRow: JourneyMapRow,
  stageCount: number,
  isVibrant: boolean = false
): JourneyMapSublane {
  const sublaneId = `sublane-${Date.now()}`

  // Create cells that match parent row structure
  // Do NOT set backgroundColor here - it will be calculated at render time
  const cells: JourneyMapCell[] = []

  for (let i = 0; i < stageCount; i++) {
    cells.push({
      id: `${sublaneId}-cell-${i}`,
      content: '',
      // backgroundColor is intentionally undefined - calculated at render time
      backgroundColor: undefined,
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
 * @param isVibrant - Whether vibrant mode is enabled (optional, auto-detect from localStorage)
 */
export function getSublaneCardColor(
  parentRow: JourneyMapRow,
  cellIndex: number,
  isVibrant?: boolean
): string | undefined {
  const parentCell = parentRow.cells[cellIndex]

  if (parentCell?.content || parentCell?.backgroundColor) {
    // Auto-detect vibrant mode from localStorage if not provided
    if (isVibrant === undefined) {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('cx-app-color-intensity') : null
      isVibrant = saved === 'vibrant'
    }

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
 *
 * NOTE: Background colors are NOT set here - they are calculated at render time
 */
export function syncSublaneWithParentRow(
  sublane: JourneyMapSublane,
  parentRow: JourneyMapRow,
  stageCount: number
): JourneyMapSublane {
  const updatedCells = sublane.cells.map((cell) => {
    return {
      ...cell,
      // backgroundColor is intentionally not set - calculated at render time
    }
  })

  // Ensure we have the right number of cells
  while (updatedCells.length < stageCount) {
    const index = updatedCells.length

    updatedCells.push({
      id: `${sublane.id}-cell-${index}`,
      content: '',
      // backgroundColor is intentionally undefined - calculated at render time
      backgroundColor: undefined
    })
  }

  return {
    ...sublane,
    cells: updatedCells.slice(0, stageCount)
  }
}

/**
 * Updates all sublanes when parent row color changes
 *
 * NOTE: This function is deprecated and should not be used.
 * Background colors are calculated at render time in SublaneRow component.
 */
export function updateSublanesColorFromParent(
  sublanes: JourneyMapSublane[],
  parentRow: JourneyMapRow
): JourneyMapSublane[] {
  // Simply return sublanes without modifying backgroundColor
  // Color calculation happens at render time
  return sublanes.map(sublane => ({
    ...sublane,
    cells: sublane.cells.map((cell) => ({
      ...cell,
      // backgroundColor is intentionally not modified - calculated at render time
    }))
  }))
}
