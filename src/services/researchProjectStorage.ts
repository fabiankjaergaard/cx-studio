import type { ResearchFolder, ResearchItem } from '@/types/research'

const RESEARCH_PROJECTS_KEY = 'cx-research-projects'
const RESEARCH_ITEMS_KEY = 'cx-research-items'

export interface ResearchProject extends ResearchFolder {
  // Interface extends the existing ResearchFolder from research page
}

// Research Projects Management
export function getSavedResearchProjects(): ResearchProject[] {
  try {
    const saved = localStorage.getItem(RESEARCH_PROJECTS_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Error loading research projects:', error)
    return []
  }
}

export function saveResearchProject(project: ResearchProject): void {
  try {
    const projects = getSavedResearchProjects()
    const existingIndex = projects.findIndex(p => p.id === project.id)

    if (existingIndex >= 0) {
      projects[existingIndex] = project
    } else {
      projects.push(project)
    }

    localStorage.setItem(RESEARCH_PROJECTS_KEY, JSON.stringify(projects))
  } catch (error) {
    console.error('Error saving research project:', error)
  }
}

export function deleteResearchProject(projectId: string): void {
  try {
    const projects = getSavedResearchProjects()
    const updatedProjects = projects.filter(p => p.id !== projectId)
    localStorage.setItem(RESEARCH_PROJECTS_KEY, JSON.stringify(updatedProjects))

    // Also update any research items that were linked to this project
    const items = getSavedResearchItems()
    const updatedItems = items.map(item =>
      item.folderId === projectId
        ? { ...item, folderId: undefined }
        : item
    )
    localStorage.setItem(RESEARCH_ITEMS_KEY, JSON.stringify(updatedItems))
  } catch (error) {
    console.error('Error deleting research project:', error)
  }
}

// Research Items Management
export function getSavedResearchItems(): ResearchItem[] {
  try {
    const saved = localStorage.getItem(RESEARCH_ITEMS_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Error loading research items:', error)
    return []
  }
}

export function saveResearchItem(item: ResearchItem): void {
  try {
    const items = getSavedResearchItems()
    const existingIndex = items.findIndex(i => i.id === item.id)

    if (existingIndex >= 0) {
      items[existingIndex] = item
    } else {
      items.push(item)
    }

    localStorage.setItem(RESEARCH_ITEMS_KEY, JSON.stringify(items))

    // Update project's item count and last activity
    if (item.folderId) {
      updateProjectStats(item.folderId)
    }
  } catch (error) {
    console.error('Error saving research item:', error)
  }
}

export function deleteResearchItem(itemId: string): void {
  try {
    const items = getSavedResearchItems()
    const item = items.find(i => i.id === itemId)
    const filtered = items.filter(i => i.id !== itemId)
    localStorage.setItem(RESEARCH_ITEMS_KEY, JSON.stringify(filtered))

    // Update project stats if item was in a project
    if (item?.folderId) {
      updateProjectStats(item.folderId)
    }
  } catch (error) {
    console.error('Error deleting research item:', error)
  }
}

export function getResearchItemsByProject(projectId: string): ResearchItem[] {
  const items = getSavedResearchItems()
  return items.filter(item => item.folderId === projectId)
}

// Helper function to update project statistics
function updateProjectStats(projectId: string): void {
  try {
    const projects = getSavedResearchProjects()
    const projectIndex = projects.findIndex(p => p.id === projectId)

    if (projectIndex >= 0) {
      const project = projects[projectIndex]
      const projectItems = getResearchItemsByProject(projectId)

      // Update item count
      project.itemCount = projectItems.length

      // Update last activity
      project.lastActivity = new Date().toISOString().split('T')[0]

      // Update research types
      const types = Array.from(new Set(projectItems.map(item => item.type)))
      project.types = types as Array<'interview' | 'survey' | 'focusgroup' | 'usability'>

      localStorage.setItem(RESEARCH_PROJECTS_KEY, JSON.stringify(projects))
    }
  } catch (error) {
    console.error('Error updating project stats:', error)
  }
}

// Utility function to move research item to different project
export function moveResearchItemToProject(itemId: string, newProjectId: string | null): void {
  try {
    const items = getSavedResearchItems()
    const itemIndex = items.findIndex(i => i.id === itemId)

    if (itemIndex >= 0) {
      const oldProjectId = items[itemIndex].folderId
      items[itemIndex].folderId = newProjectId || undefined

      localStorage.setItem(RESEARCH_ITEMS_KEY, JSON.stringify(items))

      // Update stats for both old and new projects
      if (oldProjectId) {
        updateProjectStats(oldProjectId)
      }
      if (newProjectId) {
        updateProjectStats(newProjectId)
      }
    }
  } catch (error) {
    console.error('Error moving research item:', error)
  }
}