'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from "@/components/dashboard/Sidebar"
import { SidebarProvider } from "@/contexts/SidebarContext"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Check if current path is an auth route
  const isAuthRoute = pathname?.startsWith('/auth')
  
  if (isAuthRoute) {
    // Auth pages: no sidebar, fullscreen
    return <>{children}</>
  }
  
  // Regular pages: with sidebar
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-hidden bg-gray-50 transition-all duration-300">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}