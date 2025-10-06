'use client'

import { useState } from 'react'
import { X, ChevronRight, Zap } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

interface WelcomeOnboardingProps {
  isOpen: boolean
  onClose: () => void
  onStartTour: () => void
  userName?: string
}

export function WelcomeOnboarding({ isOpen, onClose, onStartTour, userName }: WelcomeOnboardingProps) {
  const { t } = useLanguage()

  if (!isOpen) return null

  // Check if user is a beta tester
  const isBetaTester = userName === 'betatester@example.com'
  const betaTesterName = typeof window !== 'undefined' ? localStorage.getItem('cx-studio-beta-tester-name') : null

  const handleStartTour = () => {
    onClose()
    // Small delay to ensure modal closes before tour starts
    setTimeout(() => {
      onStartTour()
    }, 300)
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-hidden p-4">
      <div className="max-w-2xl w-full max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1">
          {/* Logo & Title */}
          <div className="text-center mb-6">
            <img
              src="/Kustra.png"
              alt="Kustra"
              className="h-40 w-auto mx-auto -mb-6"
            />
            <h1 className="text-xl font-bold text-gray-900 mb-1">
              {isBetaTester
                ? `Hello there${betaTesterName ? `, ${betaTesterName}` : ''}!`
                : `${t('onboarding.welcome')}${userName ? `, ${userName.split('@')[0]}` : ''}!`
              }
            </h1>
            <p className="text-gray-600">
              {isBetaTester
                ? 'Welcome to Kustra, your go-to CX platform'
                : t('onboarding.subtitle')
              }
            </p>
          </div>

          {isBetaTester && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Beta Testing</h4>
                  <p className="text-slate-700 text-sm leading-relaxed mb-2">
                    You're experiencing Kustra in its beta phase. Some features may not work as expected or might be missing entirely. The visual identity is also not yet finalized, so the app may feel quite minimal.
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <strong>Your feedback is greatly appreciated!</strong> Find more information in the menu under "Beta Tester".
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleStartTour}
              className="w-full flex items-center justify-center px-6 py-3 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
            >
              {t('onboarding.startTour')}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>

            <button
              onClick={onClose}
              className="w-full px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
            >
              {t('onboarding.skipTour')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}