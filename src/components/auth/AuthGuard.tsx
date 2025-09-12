'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useOnboarding } from '@/hooks/useOnboarding'
import { OnboardingModal } from '@/components/onboarding/OnboardingModal'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, redirectTo = '/auth/login' }: AuthGuardProps) {
  const { user, loading, isFirstLogin, setFirstLogin } = useAuth()
  const { isOnboardingCompleted, isLoading: isOnboardingLoading } = useOnboarding()
  const router = useRouter()
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    if (!loading && !isOnboardingLoading) {
      if (!user) {
        setShouldRedirect(true)
        router.push(redirectTo)
      } else {
        setShouldRedirect(false)
      }
    }
  }, [user, loading, isOnboardingLoading, router, redirectTo])

  // Separate effect for handling onboarding modal
  useEffect(() => {
    if (!loading && !isOnboardingLoading && user) {
      console.log('AuthGuard onboarding check:', { 
        isFirstLogin, 
        isOnboardingCompleted, 
        showOnboarding,
        user: !!user 
      })
      
      if (isFirstLogin && !isOnboardingCompleted && !showOnboarding) {
        console.log('Setting showOnboarding to true')
        setShowOnboarding(true)
      } else if (!isFirstLogin || isOnboardingCompleted) {
        console.log('Setting showOnboarding to false')
        setShowOnboarding(false)
      }
    }
  }, [loading, isOnboardingLoading, user, isFirstLogin, isOnboardingCompleted, showOnboarding])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setFirstLogin(false)
  }

  const handleOnboardingClose = () => {
    setShowOnboarding(false)
    setFirstLogin(false)
  }

  // Show loading while checking auth or onboarding
  if (loading || isOnboardingLoading) {
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

  return (
    <>
      {children}
      
      {/* Show onboarding modal if needed */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
        onComplete={handleOnboardingComplete}
      />
    </>
  )
}