'use client'

import { useOnboarding } from '@/hooks/useOnboarding'
import { useAuth } from '@/contexts/AuthContext'
import { useGuidedTour } from '@/hooks/useGuidedTour'
import { Button } from '@/components/ui/Button'

export function OnboardingTestHelper() {
  const { resetOnboarding } = useOnboarding()
  const { setFirstLogin } = useAuth()
  const { startTour } = useGuidedTour()

  const handleTestGuidedTour = () => {
    console.log('Starting guided tour directly...')
    startTour()
  }

  const handleTestOnboardingReset = () => {
    console.log('Testing onboarding - resetting status...')
    // Reset onboarding status
    resetOnboarding()
    console.log('Setting first login to true...')
    // Set first login flag (this will save to sessionStorage)
    setFirstLogin(true)
    // Also save directly to sessionStorage to be sure
    sessionStorage.setItem('cx-studio-first-login', 'true')
    console.log('Reloading page...')
    // Small delay before reload to ensure state is set
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <Button 
        variant="outline" 
        onClick={handleTestGuidedTour}
        className="bg-blue-500 text-white border border-blue-600 shadow-lg hover:bg-blue-600 block w-full"
      >
        🧭 Start Tour
      </Button>
      <Button 
        variant="outline" 
        onClick={handleTestOnboardingReset}
        className="bg-white border border-gray-300 shadow-lg block w-full"
      >
        🔄 Reset & Test
      </Button>
    </div>
  )
}