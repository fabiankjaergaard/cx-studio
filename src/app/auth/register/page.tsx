'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { FormError } from '@/components/ui/FormError'
import { EyeIcon, EyeOffIcon, CheckIcon } from 'lucide-react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [touched, setTouched] = useState({ email: false, password: false, confirmPassword: false })

  const { signUp } = useAuth()
  const router = useRouter()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8
    const hasNumber = /\d/.test(password)
    const hasLetter = /[a-zA-Z]/.test(password)
    return { minLength, hasNumber, hasLetter, isValid: minLength && hasNumber && hasLetter }
  }

  const passwordValidation = validatePassword(password)

  // Validate on blur
  const handleEmailBlur = () => {
    setTouched(prev => ({ ...prev, email: true }))
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handlePasswordBlur = () => {
    setTouched(prev => ({ ...prev, password: true }))
    if (password && !passwordValidation.isValid) {
      setPasswordError('Password must meet all requirements')
    } else {
      setPasswordError('')
    }
  }

  const handleConfirmPasswordBlur = () => {
    setTouched(prev => ({ ...prev, confirmPassword: true }))
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
    } else {
      setConfirmPasswordError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (!passwordValidation.isValid) {
      setError('Please ensure your password meets all requirements')
      setLoading(false)
      return
    }

    const { error } = await signUp(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    
    setLoading(false)
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-4">
          <div className="text-center">
            <img
              src="/Kustra-logo.png"
              alt="Kustra"
              className="h-36 w-auto mx-auto mb-6"
            />
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckIcon className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-3xl font-light text-gray-900 mb-2">
              Check your email
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              We&apos;ve sent you a confirmation link at <span className="font-medium">{email}</span>
            </p>
            <Link href="/auth/login">
              <Button variant="primary" className="w-full">
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        {/* Logo */}
        <div className="text-center">
          <img
            src="/Kustra-logo.png"
            alt="Kustra"
            className="h-36 w-auto mx-auto mb-6"
          />
          <h2 className="text-3xl font-light text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link href="/auth/login" className="font-medium text-slate-600 hover:text-slate-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
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
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (touched.email) {
                      if (e.target.value && !validateEmail(e.target.value)) {
                        setEmailError('Please enter a valid email address')
                      } else {
                        setEmailError('')
                      }
                    }
                  }}
                  onBlur={handleEmailBlur}
                  placeholder="Enter your email"
                  error={!!emailError}
                />
                <FormError message={emailError} />
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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (touched.password) {
                        const validation = validatePassword(e.target.value)
                        if (e.target.value && !validation.isValid) {
                          setPasswordError('Password must meet all requirements')
                        } else {
                          setPasswordError('')
                        }
                      }
                    }}
                    onBlur={handlePasswordBlur}
                    placeholder="Create a password"
                    error={!!passwordError}
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
                
                {/* Password Requirements */}
                {password && (
                  <div className="mt-2 space-y-1">
                    <div className={`flex items-center text-xs ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                      <CheckIcon className={`h-3 w-3 mr-1 ${passwordValidation.minLength ? 'opacity-100' : 'opacity-30'}`} />
                      At least 8 characters
                    </div>
                    <div className={`flex items-center text-xs ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                      <CheckIcon className={`h-3 w-3 mr-1 ${passwordValidation.hasNumber ? 'opacity-100' : 'opacity-30'}`} />
                      Contains a number
                    </div>
                    <div className={`flex items-center text-xs ${passwordValidation.hasLetter ? 'text-green-600' : 'text-gray-500'}`}>
                      <CheckIcon className={`h-3 w-3 mr-1 ${passwordValidation.hasLetter ? 'opacity-100' : 'opacity-30'}`} />
                      Contains a letter
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      if (touched.confirmPassword) {
                        if (e.target.value && password !== e.target.value) {
                          setConfirmPasswordError('Passwords do not match')
                        } else {
                          setConfirmPasswordError('')
                        }
                      }
                    }}
                    onBlur={handleConfirmPasswordBlur}
                    placeholder="Confirm your password"
                    error={!!confirmPasswordError}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-600" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                </div>
                <FormError message={confirmPasswordError} />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading || !passwordValidation.isValid || password !== confirmPassword}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}