'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { XIcon } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
}

export function Modal({ isOpen, onClose, children, title, className, maxWidth = 'md' }: ModalProps) {
  if (!isOpen) return null

  const getMaxWidthClass = (size: string) => {
    switch (size) {
      case 'sm': return 'max-w-sm'
      case 'md': return 'max-w-md'
      case 'lg': return 'max-w-lg'
      case 'xl': return 'max-w-xl'
      case '2xl': return 'max-w-2xl'
      case '3xl': return 'max-w-3xl'
      case '4xl': return 'max-w-4xl'
      case '5xl': return 'max-w-5xl'
      default: return 'max-w-2xl'
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm" onClick={onClose} />

        <div className={cn(
          "relative bg-white rounded-xl shadow-lg border border-gray-100 w-full mx-auto transform transition-all",
          getMaxWidthClass(maxWidth),
          className
        )}>
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          )}
          
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}