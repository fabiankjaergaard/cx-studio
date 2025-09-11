import { JourneyMapData } from '@/types/journey-map'

class JourneyMapService {
  private storageKey = 'cx-app-journey-maps'

  // Get all journey maps
  getAllJourneyMaps(): JourneyMapData[] {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading journey maps:', error)
      return []
    }
  }

  // Get a specific journey map by ID
  getJourneyMapById(id: string): JourneyMapData | null {
    const journeyMaps = this.getAllJourneyMaps()
    return journeyMaps.find(map => map.id === id) || null
  }

  // Save a journey map
  saveJourneyMap(journeyMap: JourneyMapData): Promise<JourneyMapData> {
    return new Promise((resolve, reject) => {
      try {
        const journeyMaps = this.getAllJourneyMaps()
        const existingIndex = journeyMaps.findIndex(map => map.id === journeyMap.id)
        
        const updatedJourneyMap = {
          ...journeyMap,
          updatedAt: new Date().toISOString()
        }

        if (existingIndex >= 0) {
          journeyMaps[existingIndex] = updatedJourneyMap
        } else {
          journeyMaps.unshift(updatedJourneyMap)
        }

        localStorage.setItem(this.storageKey, JSON.stringify(journeyMaps))
        resolve(updatedJourneyMap)
      } catch (error) {
        console.error('Error saving journey map:', error)
        reject(error)
      }
    })
  }

  // Delete a journey map
  deleteJourneyMap(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const journeyMaps = this.getAllJourneyMaps()
        const filteredJourneyMaps = journeyMaps.filter(map => map.id !== id)
        
        localStorage.setItem(this.storageKey, JSON.stringify(filteredJourneyMaps))
        resolve()
      } catch (error) {
        console.error('Error deleting journey map:', error)
        reject(error)
      }
    })
  }

  // Duplicate a journey map
  duplicateJourneyMap(id: string): Promise<JourneyMapData | null> {
    return new Promise((resolve, reject) => {
      try {
        const originalMap = this.getJourneyMapById(id)
        if (!originalMap) {
          resolve(null)
          return
        }

        const duplicatedMap: JourneyMapData = {
          ...originalMap,
          id: Date.now().toString(),
          name: `${originalMap.name} (Kopia)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'draft'
        }

        this.saveJourneyMap(duplicatedMap)
          .then(() => resolve(duplicatedMap))
          .catch(reject)
      } catch (error) {
        console.error('Error duplicating journey map:', error)
        reject(error)
      }
    })
  }

  // Export journey map to JSON
  exportJourneyMap(id: string): void {
    const journeyMap = this.getJourneyMapById(id)
    if (!journeyMap) return

    const dataStr = JSON.stringify(journeyMap, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const link = document.createElement('a')
    link.href = URL.createObjectURL(dataBlob)
    link.download = `${journeyMap.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`
    link.click()
  }

  // Import journey map from JSON
  importJourneyMap(file: File): Promise<JourneyMapData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const jsonStr = e.target?.result as string
          const journeyMap = JSON.parse(jsonStr) as JourneyMapData
          
          // Generate new ID and update timestamps
          const importedMap: JourneyMapData = {
            ...journeyMap,
            id: Date.now().toString(),
            name: `${journeyMap.name} (Importerad)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: 'draft'
          }

          this.saveJourneyMap(importedMap)
            .then(() => resolve(importedMap))
            .catch(reject)
        } catch (error) {
          console.error('Error parsing imported journey map:', error)
          reject(new Error('Ogiltig journey map fil'))
        }
      }

      reader.onerror = () => {
        reject(new Error('Fel vid läsning av fil'))
      }

      reader.readAsText(file)
    })
  }
}

// Export singleton instance
export const journeyMapService = new JourneyMapService()
export default journeyMapService