'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthCallback() {
  const router = useRouter()
  const { setFirstLogin } = useAuth()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Auth callback: Processing email confirmation...')
        
        // Get the session from the URL hash
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          router.push('/auth/login?error=confirmation_failed')
          return
        }

        if (data.session) {
          console.log('Auth callback: User confirmed, setting first login flag')
          // This is a new user who just confirmed their email
          // Set the first login flag so they see onboarding
          setFirstLogin(true)
          
          // Save to sessionStorage to persist across redirect
          sessionStorage.setItem('cx-studio-first-login', 'true')
          
          // Also set the localStorage flag to prevent future first login checks
          localStorage.setItem('cx-studio-has-logged-in', 'true')
          
          console.log('Auth callback: Redirecting to dashboard with onboarding')
          router.push('/')
        } else {
          console.log('Auth callback: No session found, redirecting to login')
          router.push('/auth/login')
        }
      } catch (error) {
        console.error('Auth callback: Unexpected error:', error)
        router.push('/auth/login?error=callback_error')
      }
    }

    handleAuthCallback()
  }, [router, setFirstLogin])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <img
          src="/Kustra.png"
          alt="Kustra"
          className="h-16 w-auto mx-auto mb-6"
        />
        <div className="text-lg text-gray-700 mb-2">Bekräftar din e-post...</div>
        <div className="text-sm text-gray-500">Du kommer snart att omdirigeras till dashboard</div>
        
        {/* Loading animation */}
        <div className="mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}