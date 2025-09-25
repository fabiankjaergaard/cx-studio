'use client'

import { Button } from '@/components/ui/Button'
import { BellIcon, PlusIcon } from 'lucide-react'

interface HeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

export function Header({ title, description, actions }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 h-20">
      <div className="flex items-center justify-between h-full">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-2">
            <BellIcon className="h-5 w-5" />
          </Button>

          {actions}
        </div>
      </div>
    </header>
  )
}