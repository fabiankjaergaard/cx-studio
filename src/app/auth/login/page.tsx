'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { EyeIcon, EyeOffIcon, Zap, SparklesIcon } from 'lucide-react'
import { saveBetaTesterLogin } from '@/services/betaTracking'
import { SimpleDots } from '@/components/ui/simple-dots'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [debugInfo, setDebugInfo] = useState('')
  const [showBetaCodeModal, setShowBetaCodeModal] = useState(false)
  const [betaCode, setBetaCode] = useState(['', '', '', ''])
  const [betaCodeError, setBetaCodeError] = useState('')
  const [betaTesterName, setBetaTesterName] = useState('')
  
  const { signIn, signInAsBetaTester, user, loading } = useAuth()
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
          <LoadingSpinner size="md" className="text-slate-600" />
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

  const handleBetaCodeChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return // Only allow digits

    const newCode = [...betaCode]
    newCode[index] = value
    setBetaCode(newCode)
    setBetaCodeError('')

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`beta-code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleBetaCodeSubmit = async () => {
    const code = betaCode.join('')
    console.log('🚀 Beta code submit attempt:', { code, name: betaTesterName })

    // Save beta tester to database with code validation
    const result = await saveBetaTesterLogin(betaTesterName, code)
    console.log('💾 Save result:', result)

    if (result.success) {
      console.log('✅ Valid beta code, login successful')
      setShowBetaCodeModal(false)
      setBetaCode(['', '', '', ''])
      setBetaCodeError('')
      signInAsBetaTester(betaTesterName)
      router.replace('/')
    } else {
      console.log('❌ Invalid beta code:', code)
      setBetaCodeError(result.error?.message || 'Invalid or already used code. Please try again.')
    }
  }

  const handleBetaCodeKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      if (index === 3 && betaCode.every(digit => digit !== '')) {
        handleBetaCodeSubmit()
      }
    } else if (e.key === 'Backspace' && !betaCode[index] && index > 0) {
      const prevInput = document.getElementById(`beta-code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleBetaTesterLogin = () => {
    setShowBetaCodeModal(true)
  }


  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative bg-white overflow-hidden">
      {/* Animated dot pattern on white background */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <SimpleDots />
      </div>

      {/* White background with orange flowing wave */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {/* Large orange flowing wave - bottom, full width */}
        <div className="absolute -bottom-4 -left-8 w-[calc(100vw+4rem)] h-[60vh]">
          <svg className="w-full h-full" viewBox="0 0 120 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-10 40 Q25 10 50 25 T130 20 L130 110 L-10 110 Z" fill="#64748b" fillOpacity="0.95">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 4 -1; 0 0; -3 1.5; 0 0"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M-10 50 Q30 20 70 35 T130 30 L130 110 L-10 110 Z" fill="#475569" fillOpacity="0.9">
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; -3.5 0.8; 0 0; 4.5 -1.2; 0 0"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>


      </div>
      <div className="max-w-md w-full space-y-4 relative z-10">
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

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-600" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-600" />
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
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
        </div>

        {/* Beta Tester Access */}
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 py-1 bg-slate-500 text-white font-medium rounded-full border border-white/30">or</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleBetaTesterLogin}
              variant="outline"
              className="w-full bg-gradient-to-r from-slate-100 to-slate-200 border-slate-300 text-slate-700 hover:from-slate-200 hover:to-slate-300 hover:border-slate-400 hover:scale-105 hover:shadow-md transition-all duration-300 ease-out flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              I'm a beta tester
            </Button>
            <p className="mt-2 text-xs text-white font-medium drop-shadow-sm">
              Skip registration and explore the platform
            </p>
          </div>
        </div>

        {/* Beta Code Modal */}
        <Modal
          isOpen={showBetaCodeModal}
          onClose={() => {
            setShowBetaCodeModal(false)
            setBetaCode(['', '', '', ''])
            setBetaCodeError('')
            setBetaTesterName('')
          }}
          title=""
          maxWidth="xl"
        >
          <div className="space-y-6 p-2">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 rounded-2xl flex items-center justify-center shadow-lg">
                  <SparklesIcon className="h-10 w-10 text-slate-700" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome, Beta Tester!</h3>
              <p className="text-gray-600">Please enter your details to continue</p>
            </div>

            <div className="space-y-5 px-2">
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200">
                <label htmlFor="beta-tester-name" className="block text-sm font-semibold text-gray-800 mb-3">
                  Full Name
                </label>
                <Input
                  id="beta-tester-name"
                  type="text"
                  value={betaTesterName}
                  onChange={(e) => setBetaTesterName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full text-base"
                />
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200">
                <fieldset>
                  <legend className="block text-sm font-semibold text-gray-800 mb-3 text-center">
                    4-Digit Access Code
                  </legend>
                  <div className="flex justify-center space-x-3" role="group" aria-label="4-digit access code">
                    {betaCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`beta-code-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleBetaCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleBetaCodeKeyPress(e, index)}
                        aria-label={`Access code digit ${index + 1}`}
                        className="w-16 h-16 text-center text-2xl font-bold border-2 border-slate-300 rounded-xl focus:border-slate-500 focus:ring-2 focus:ring-slate-200 focus:outline-none transition-all bg-white shadow-sm"
                      />
                    ))}
                  </div>
                </fieldset>
              </div>

              {betaCodeError && (
                <div className="bg-red-50 border border-red-300 rounded-lg p-3">
                  <p className="text-red-800 text-sm font-semibold text-center">{betaCodeError}</p>
                </div>
              )}
            </div>

            <div className="flex justify-center space-x-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => {
                  setShowBetaCodeModal(false)
                  setBetaCode(['', '', '', ''])
                  setBetaCodeError('')
                  setBetaTesterName('')
                }}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleBetaCodeSubmit}
                disabled={!betaCode.every(digit => digit !== '') || !betaTesterName.trim()}
                className="px-6 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
              >
                Verify & Continue
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}