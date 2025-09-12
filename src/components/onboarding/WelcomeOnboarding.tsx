'use client'

import { useState } from 'react'
import { X, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface WelcomeOnboardingProps {
  isOpen: boolean
  onClose: () => void
  onStartTour: () => void
  userName?: string
}

export function WelcomeOnboarding({ isOpen, onClose, onStartTour, userName }: WelcomeOnboardingProps) {
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
            <div className="mb-6">
              <img 
                src="/Nava blue text.png" 
                alt="Nava" 
                className="h-16 w-auto mx-auto filter brightness-0 invert"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              Välkommen till Nava{userName ? `, ${userName.split('@')[0]}` : ''}! 🎉
            </h1>
            <p className="text-slate-200 text-lg">
              Din plattform för Customer Experience Excellence
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Video Placeholder */}
          <div className="mb-6">
            <div className="h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-gray-500 font-medium text-sm">Introduktionsvideo</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg leading-relaxed">
              Lär dig hur du använder Nava för att skapa exceptionella kundupplevelser
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleStartTour}
              className="w-full flex items-center justify-center px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              Starta guidad rundtur
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            
            <button
              onClick={onClose}
              className="w-full px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors font-medium text-sm"
            >
              Hoppa över rundturen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}