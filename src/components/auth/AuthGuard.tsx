'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, redirectTo = '/auth/login' }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        setShouldRedirect(true)
        router.push(redirectTo)
      } else {
        setShouldRedirect(false)
      }
    }
  }, [user, loading, router, redirectTo])

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img 
            src="/Nava blue text.png" 
            alt="Nava" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  // Don't render content if user is not authenticated or redirecting
  if (!user || shouldRedirect) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img 
            src="/Nava blue text.png" 
            alt="Nava" 
            className="h-16 w-auto mx-auto mb-4"
          />
          <div className="text-sm text-gray-500">Redirecting to login...</div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}