'use client'

import { useState, useEffect } from 'react'

const ONBOARDING_STORAGE_KEY = 'cx-studio-onboarding-completed'

export function useOnboarding() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(true) // Default to true to prevent flash
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if onboarding has been completed
    const checkOnboardingStatus = () => {
      try {
        const completed = localStorage.getItem(ONBOARDING_STORAGE_KEY)
        setIsOnboardingCompleted(completed === 'true')
      } catch (error) {
        // If localStorage is not available, default to not completed
        setIsOnboardingCompleted(false)
      }
      setIsLoading(false)
    }

    checkOnboardingStatus()
  }, [])

  const completeOnboarding = () => {
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true')
      setIsOnboardingCompleted(true)
    } catch (error) {
      console.error('Failed to save onboarding status:', error)
    }
  }

  const resetOnboarding = () => {
    try {
      localStorage.removeItem(ONBOARDING_STORAGE_KEY)
      setIsOnboardingCompleted(false)
    } catch (error) {
      console.error('Failed to reset onboarding status:', error)
    }
  }

  return {
    isOnboardingCompleted,
    isLoading,
    completeOnboarding,
    resetOnboarding,
  }
}