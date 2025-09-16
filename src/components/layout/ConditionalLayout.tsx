'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from "@/components/dashboard/Sidebar"
import { SidebarProvider } from "@/contexts/SidebarContext"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Check if current path is an auth route
  const isAuthRoute = pathname?.startsWith('/auth')

  // Check if current path is journey map editor route
  const isJourneyMapRoute = pathname?.includes('/journey-maps/') && pathname !== '/journey-maps'

  if (isAuthRoute) {
    // Auth pages: no sidebar, fullscreen
    return <>{children}</>
  }

  // Regular pages and journey maps: with sidebar
  return (
    <SidebarProvider initialCollapsed={isJourneyMapRoute}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-hidden bg-gray-50 transition-all duration-300">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}