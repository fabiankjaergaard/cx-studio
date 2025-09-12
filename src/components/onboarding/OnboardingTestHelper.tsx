'use client'

import { useOnboarding } from '@/hooks/useOnboarding'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'

export function OnboardingTestHelper() {
  const { resetOnboarding } = useOnboarding()
  const { setFirstLogin } = useAuth()

  const handleTestOnboarding = () => {
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
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        variant="outline" 
        onClick={handleTestOnboarding}
        className="bg-white border border-gray-300 shadow-lg"
      >
        Test Onboarding
      </Button>
    </div>
  )
}