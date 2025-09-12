'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  isFirstLogin: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  setFirstLogin: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFirstLogin, setIsFirstLogin] = useState(false)

  // Initialize isFirstLogin from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFirstLogin = sessionStorage.getItem('cx-studio-first-login')
      if (savedFirstLogin === 'true') {
        setIsFirstLogin(true)
        console.log('Restored first login flag from sessionStorage')
      }
    }
  }, [])

  useEffect(() => {
    // Skip if Supabase credentials are not configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { error: { message: 'Supabase credentials not configured' } }
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    // If login was successful, check if this is their first time logging in
    if (!error) {
      // For now, we'll use localStorage to determine if this is a first login
      // In a production app, you might store this in user metadata
      const hasLoggedInBefore = localStorage.getItem('cx-studio-has-logged-in')
      if (!hasLoggedInBefore) {
        setIsFirstLogin(true)
        localStorage.setItem('cx-studio-has-logged-in', 'true')
      }
    }
    
    return { error }
  }

  const signUp = async (email: string, password: string) => {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { error: { message: 'Supabase credentials not configured' } }
    }
    
    // Use environment variable for site URL in production, fallback to current origin in development
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback`
      }
    })
    
    // Note: We don't set first login here because the user needs to confirm their email first
    // The first login flag will be set in the callback page after email confirmation
    
    return { error }
  }

  const signOut = async () => {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return
    }
    
    await supabase.auth.signOut()
    
    // Redirect to login page after logout using current origin
    const loginUrl = `${window.location.origin}/auth/login`
    window.location.href = loginUrl
  }

  const setFirstLogin = (value: boolean) => {
    setIsFirstLogin(value)
    // Save to sessionStorage to persist across page reloads
    if (typeof window !== 'undefined') {
      if (value) {
        sessionStorage.setItem('cx-studio-first-login', 'true')
        console.log('Saved first login flag to sessionStorage')
      } else {
        sessionStorage.removeItem('cx-studio-first-login')
        console.log('Removed first login flag from sessionStorage')
      }
    }
  }

  const value = {
    user,
    loading,
    isFirstLogin,
    signIn,
    signUp,
    signOut,
    setFirstLogin,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}