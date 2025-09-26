'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [debugInfo, setDebugInfo] = useState('')
  
  const { signIn, user, loading } = useAuth()
  const router = useRouter()

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !loading) {
      router.replace('/')
    }
  }, [user, loading, router])

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <img
            src="/Kustra.png"
            alt="Kustra"
            className="h-16 w-auto mx-auto mb-4"
          />
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    setError('')
    
    // Enhanced debug logging for environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    setDebugInfo(`Environment Check:
    - URL: ${supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'MISSING'}
    - Key: ${supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'MISSING'}
    - Origin: ${typeof window !== 'undefined' ? window.location.origin : 'server'}`)

    try {
      setDebugInfo(prev => prev + '\nCalling signIn...')
      const result = await signIn(email, password)
      setDebugInfo(prev => prev + `\nSignIn result: ${result.error ? 'ERROR' : 'SUCCESS'}`)
      
      if (result.error) {
        setError(`Login failed: ${result.error.message}`)
        setDebugInfo(prev => prev + `\nError details: ${result.error.message}`)
      } else {
        setDebugInfo(prev => prev + '\nLogin successful, redirecting...')
        // Redirect to dashboard
        const url = `${window.location.origin}/`
        setDebugInfo(prev => prev + `\nRedirecting to: ${url}`)
        setTimeout(() => {
          window.location.assign(url)
        }, 100)
        return
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error'
      setError(`Login failed: ${errorMsg}`)
      setDebugInfo(prev => prev + `\nException: ${errorMsg}`)
    }
    
    setIsSubmitting(false)
  }


  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        {/* Logo */}
        <div className="text-center">
          <img
            src="/Kustra.png"
            alt="Kustra"
            className="h-36 w-auto mx-auto mb-6"
          />
          <h2 className="text-3xl font-light text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link href="/auth/register" className="font-medium text-slate-600 hover:text-slate-500">
              create a new account
            </Link>
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  <strong>Error:</strong> {error}
                </div>
              )}

              {debugInfo && (
                <div className="bg-slate-50 border border-slate-200 text-slate-700 px-4 py-3 rounded-lg text-sm">
                  <strong>Debug:</strong> {debugInfo}
                </div>
              )}


              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="font-medium text-slate-600 hover:text-slate-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>


              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}