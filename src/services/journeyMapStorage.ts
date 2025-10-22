import { JourneyMapData } from '@/types/journey-map'

const STORAGE_KEY = 'cx-app-journey-maps'

export interface StoredJourneyMap extends JourneyMapData {
  lastModified: string
}

// Get all saved journey maps from localStorage
export const getSavedJourneyMaps = (): StoredJourneyMap[] => {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading journey maps from storage:', error)
    return []
  }
}

// Save a journey map to localStorage
export const saveJourneyMap = async (journeyMap: JourneyMapData): Promise<void> => {
  if (typeof window === 'undefined') return Promise.resolve()

  return new Promise((resolve, reject) => {
    try {
      const existingMaps = getSavedJourneyMaps()
      const updatedMap: StoredJourneyMap = {
        ...journeyMap,
        updatedAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      }

      // Find if map already exists and update it, or add new one
      const existingIndex = existingMaps.findIndex(map => map.id === journeyMap.id)
      if (existingIndex >= 0) {
        existingMaps[existingIndex] = updatedMap
      } else {
        existingMaps.push(updatedMap)
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingMaps))
      console.log('Journey map saved successfully:', journeyMap.name)
      console.log('Total maps in storage now:', existingMaps.length)
      console.log('Saved map data:', updatedMap)

      // Dispatch custom event to notify other components (e.g., Insights Library)
      window.dispatchEvent(new CustomEvent('journey-maps-updated', {
        detail: { action: 'save', journeyMapId: journeyMap.id }
      }))

      resolve()
    } catch (error) {
      console.error('Error saving journey map to storage:', error)
      reject(new Error('Failed to save journey map'))
    }
  })
}

// Get a specific journey map by ID
export const getJourneyMapById = (id: string): StoredJourneyMap | null => {
  const maps = getSavedJourneyMaps()
  return maps.find(map => map.id === id) || null
}

// Delete a journey map
export const deleteJourneyMap = (id: string): void => {
  if (typeof window === 'undefined') return

  try {
    const existingMaps = getSavedJourneyMaps()
    const filteredMaps = existingMaps.filter(map => map.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredMaps))
    console.log('Journey map deleted successfully:', id)

    // Dispatch custom event to notify other components (e.g., Insights Library)
    window.dispatchEvent(new CustomEvent('journey-maps-updated', {
      detail: { action: 'delete', journeyMapId: id }
    }))
  } catch (error) {
    console.error('Error deleting journey map from storage:', error)
    throw new Error('Failed to delete journey map')
  }
}

// Check if localStorage is available (for SSR safety)
export const isStorageAvailable = (): boolean => {
  if (typeof window === 'undefined') return false

  try {
    const test = '__localStorage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}