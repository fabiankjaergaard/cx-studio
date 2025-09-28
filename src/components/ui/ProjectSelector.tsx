'use client'

import { useState, useEffect } from 'react'
import { FolderIcon, ChevronDownIcon, CheckIcon, PlusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getSavedResearchProjects } from '@/services/researchProjectStorage'
import type { ResearchProject } from '@/services/researchProjectStorage'

interface ProjectSelectorProps {
  selectedProjectId?: string | null
  onProjectChange: (projectId: string | null) => void
  placeholder?: string
  className?: string
  required?: boolean
  showCreateNew?: boolean
  onCreateNew?: () => void
}

export function ProjectSelector({
  selectedProjectId,
  onProjectChange,
  placeholder = "Välj projekt (valfritt)",
  className,
  required = false,
  showCreateNew = false,
  onCreateNew
}: ProjectSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [projects, setProjects] = useState<ResearchProject[]>([])

  useEffect(() => {
    const loadProjects = () => {
      const savedProjects = getSavedResearchProjects()
      setProjects(savedProjects)
    }

    loadProjects()

    // Listen for storage changes to update when projects are created elsewhere
    const handleStorageChange = () => {
      loadProjects()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const selectedProject = projects.find(p => p.id === selectedProjectId)

  const handleProjectSelect = (projectId: string | null) => {
    onProjectChange(projectId)
    setIsOpen(false)
  }

  return (
    <div className={cn("relative", className)}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Forskningsprojekt {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white text-left focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors",
            !selectedProject && "text-gray-500"
          )}
        >
          <div className="flex items-center flex-1 min-w-0">
            {selectedProject ? (
              <>
                <FolderIcon className="w-3 h-3 mr-2 flex-shrink-0 text-gray-600" />
                <span className="text-gray-900 truncate">{selectedProject.name}</span>
              </>
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
          <ChevronDownIcon
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform ml-2 flex-shrink-0",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            <div className="py-1">
              {/* No project option */}
              <button
                type="button"
                onClick={() => handleProjectSelect(null)}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors",
                  !selectedProjectId && "bg-slate-50"
                )}
              >
                <div className="w-3 h-3 mr-2" /> {/* Spacer */}
                <span className="text-gray-600">Inget projekt</span>
                {!selectedProjectId && (
                  <CheckIcon className="h-4 w-4 text-slate-600 ml-auto" />
                )}
              </button>

              {/* Project options */}
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleProjectSelect(project.id)}
                  className={cn(
                    "w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors",
                    selectedProjectId === project.id && "bg-slate-50"
                  )}
                >
                  <FolderIcon className="w-3 h-3 mr-2 flex-shrink-0 text-gray-600" />
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-medium text-gray-900 truncate">{project.name}</div>
                    {project.description && (
                      <div className="text-xs text-gray-500 truncate">{project.description}</div>
                    )}
                  </div>
                  {selectedProjectId === project.id && (
                    <CheckIcon className="h-4 w-4 text-slate-600 ml-2 flex-shrink-0" />
                  )}
                </button>
              ))}

              {/* Create new project option */}
              {showCreateNew && onCreateNew && (
                <>
                  {projects.length > 0 && <div className="border-t border-gray-100 my-1" />}
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                      if (onCreateNew) {
                        onCreateNew()
                      }
                    }}
                    className="w-full flex items-center px-3 py-2 text-sm hover:bg-gray-50 transition-colors text-slate-600"
                  >
                    <PlusIcon className="h-3 w-3 mr-2" />
                    <span>Skapa nytt projekt</span>
                  </button>
                </>
              )}

              {projects.length === 0 && (
                <div className="px-3 py-8 text-center text-gray-500">
                  <FolderIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm font-medium">Inga projekt</p>
                  <p className="text-xs">Skapa ditt första projekt på Research Projects-sidan</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}