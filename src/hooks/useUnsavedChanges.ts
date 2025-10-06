'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export function useUnsavedChanges(hasUnsavedChanges: boolean) {
  const router = useRouter()
  const [showPrompt, setShowPrompt] = useState(false)
  const [nextUrl, setNextUrl] = useState<string | null>(null)

  // Warn before closing/refreshing the browser tab
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasUnsavedChanges])

  const confirmNavigation = useCallback(() => {
    if (nextUrl) {
      setShowPrompt(false)
      router.push(nextUrl)
    }
  }, [nextUrl, router])

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false)
    setNextUrl(null)
  }, [])

  return {
    showPrompt,
    setShowPrompt,
    nextUrl,
    setNextUrl,
    confirmNavigation,
    cancelNavigation,
  }
}
