'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({
  children,
  initialCollapsed = true
}: {
  children: React.ReactNode
  initialCollapsed?: boolean
}) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed)

  // Update collapsed state when route changes
  useEffect(() => {
    const isJourneyMapRoute = pathname?.includes('/journey-maps/') && pathname !== '/journey-maps'
    setIsCollapsed(isJourneyMapRoute)
  }, [pathname])

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}