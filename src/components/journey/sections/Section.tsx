'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { PlusIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon, MoreHorizontalIcon, EditIcon, CopyIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SectionProps {
  id: string
  type: string
  title: string
  onAddSection?: (afterId: string) => void
  onDeleteSection?: (id: string) => void
  canDelete?: boolean
  className?: string
  children: React.ReactNode
}

export function Section({
  id,
  type,
  title,
  onAddSection,
  onDeleteSection,
  canDelete = true,
  className,
  children
}: SectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className={cn("relative mb-8", className)}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-slate-100"
          >
            {isCollapsed ? (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            )}
          </Button>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {isCollapsed && (
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Minimerad
            </span>
          )}
        </div>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-slate-100"
          >
            <MoreHorizontalIcon className="h-4 w-4 text-gray-500" />
          </Button>
          
          {/* Dropdown Menu */}
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Menu */}
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false)
                      // Add edit functionality here later
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <EditIcon className="h-4 w-4 mr-2" />
                    Redigera sektion
                  </button>
                  
                  <button
                    onClick={() => {
                      setIsMenuOpen(false)
                      // Add duplicate functionality here later  
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <CopyIcon className="h-4 w-4 mr-2" />
                    Duplicera sektion
                  </button>
                  
                  <hr className="my-1 border-gray-200" />
                  
                  {canDelete && onDeleteSection && (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        onDeleteSection(id)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Ta bort sektion
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Section Content */}
      {!isCollapsed && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 transition-all duration-300">
          {children}
        </div>
      )}

      {/* Add Section Button */}
      {onAddSection && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => onAddSection(id)}
            className="border-dashed border-2 border-gray-300 hover:border-gray-400 text-gray-500 hover:text-gray-600 bg-white hover:bg-gray-50"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Lägg till sektion
          </Button>
        </div>
      )}
    </div>
  )
}