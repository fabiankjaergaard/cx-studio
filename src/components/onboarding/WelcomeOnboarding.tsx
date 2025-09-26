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

  const handleStartTour = () => {
    onClose()
    // Small delay to ensure modal closes before tour starts
    setTimeout(() => {
      onStartTour()
    }, 300)
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="mx-4 max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-600 to-slate-700 px-8 py-12 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="mb-2">
              <img
                src="/Kustra.png"
                alt="Kustra"
                className="h-48 w-auto mx-auto filter brightness-0 invert"
              />
            </div>
            <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              {t('onboarding.welcome')}{userName ? `, ${userName.split('@')[0]}` : ''}!
              <Zap className="w-7 h-7 text-slate-200" />
            </h1>
            <p className="text-slate-200 text-lg">
              {t('onboarding.subtitle')}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Video Placeholder */}
          <div className="mb-6 relative">
            <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden relative">
              {/* Blurred background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-gray-200 to-slate-300 blur-sm opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent blur-md"></div>

              {/* Content overlay */}
              <div className="relative h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-slate-700 font-semibold text-lg mb-2">{t('onboarding.introVideo')}</p>
                </div>
              </div>

              {/* Coming Soon Badge */}
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1 bg-slate-600 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg leading-relaxed">
              {t('onboarding.description')}
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleStartTour}
              className="w-full flex items-center justify-center px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-out font-medium"
            >
              {t('onboarding.startTour')}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            
            <button
              onClick={onClose}
              className="w-full px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors font-medium text-sm"
            >
              {t('onboarding.skipTour')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}