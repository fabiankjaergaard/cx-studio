'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useOnboarding } from '@/hooks/useOnboarding'
import { useGuidedTour } from '@/hooks/useGuidedTour'
import { WelcomeOnboarding } from '@/components/onboarding/WelcomeOnboarding'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, redirectTo = '/auth/login' }: AuthGuardProps) {
  const { user, loading, isFirstLogin, setFirstLogin } = useAuth()
  const { isOnboardingCompleted, isLoading: isOnboardingLoading } = useOnboarding()
  const { startTour, isActive } = useGuidedTour()
  const router = useRouter()
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [showWelcomeOnboarding, setShowWelcomeOnboarding] = useState(false)

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

  // Separate effect for handling welcome onboarding
  useEffect(() => {
    if (!loading && !isOnboardingLoading && user) {
      console.log('AuthGuard onboarding check:', { 
        isFirstLogin, 
        isOnboardingCompleted,
        user: !!user 
      })
      
      if (isFirstLogin) {
        console.log('Showing welcome onboarding for first-time user')
        // Reset onboarding completion for new user to ensure they see the new welcome flow
        localStorage.removeItem('cx-studio-onboarding-completed')
        // Show welcome onboarding after a short delay
        setTimeout(() => {
          setShowWelcomeOnboarding(true)
        }, 500)
      }
    }
  }, [loading, isOnboardingLoading, user, isFirstLogin, isOnboardingCompleted])

  const handleWelcomeClose = () => {
    setShowWelcomeOnboarding(false)
    setFirstLogin(false) // Mark first login as completed
  }

  const handleStartTour = () => {
    setShowWelcomeOnboarding(false)
    setFirstLogin(false) // Mark first login as completed
    // Start guided tour after modal closes
    setTimeout(() => {
      startTour()
    }, 300)
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
      <WelcomeOnboarding
        isOpen={showWelcomeOnboarding}
        onClose={handleWelcomeClose}
        onStartTour={handleStartTour}
        userName={user?.email}
      />
    </>
  )
}