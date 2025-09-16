'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { ArrowRightIcon, XIcon } from 'lucide-react'

interface OnboardingStep {
  id: string
  title: string
  description: string
  targetSelector: string
  position: 'top' | 'bottom' | 'left' | 'right'
}

interface JourneyMapOnboardingProps {
  isActive: boolean
  onComplete: () => void
  onSkip: () => void
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'palette',
    title: 'Block-palette',
    description: 'Här hittar du alla verktyg för att bygga din journey map. Dra block från paletten för att lägga till nya rader och innehållstyper.',
    targetSelector: '[data-onboarding="palette"]',
    position: 'right'
  },
  {
    id: 'persona',
    title: 'Persona',
    description: 'Välj eller skapa en persona för din journey map. Detta hjälper dig att fokusera på en specifik målgrupp och deras behov.',
    targetSelector: '[data-onboarding="persona"]',
    position: 'bottom'
  },
  {
    id: 'phases',
    title: 'Faser',
    description: 'Faser representerar de övergripande etapperna i kundresan. Klicka på fasnamnet för att redigera det.',
    targetSelector: '[data-onboarding="phases"]',
    position: 'bottom'
  },
  {
    id: 'stages',
    title: 'Steg',
    description: 'Steg är mer detaljerade åtgärder inom varje fas. Du kan lägga till, ta bort och redigera steg.',
    targetSelector: '[data-onboarding="stages"]',
    position: 'bottom'
  },
  {
    id: 'categories',
    title: 'Kategorier',
    description: 'Kategorier hjälper dig att organisera information som kundaktioner, känslor, smärtpunkter och möjligheter.',
    targetSelector: '[data-onboarding="categories"]',
    position: 'bottom'
  },
  {
    id: 'cells',
    title: 'Redigera innehåll',
    description: 'Klicka på valfri cell för att lägga till innehåll. Här skapar du din journey map genom att fylla i relevant information.',
    targetSelector: '[data-onboarding="cells"]',
    position: 'bottom'
  }
]

export function JourneyMapOnboarding({ isActive, onComplete, onSkip }: JourneyMapOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [highlightPosition, setHighlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })

  useEffect(() => {
    if (!isActive) return

    const updateHighlight = () => {
      const step = onboardingSteps[currentStep]
      const element = document.querySelector(step.targetSelector) as HTMLElement

      if (element) {
        const rect = element.getBoundingClientRect()
        setHighlightPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        })
      }
    }

    updateHighlight()
    window.addEventListener('resize', updateHighlight)
    window.addEventListener('scroll', updateHighlight)

    return () => {
      window.removeEventListener('resize', updateHighlight)
      window.removeEventListener('scroll', updateHighlight)
    }
  }, [currentStep, isActive])

  if (!isActive) return null

  const currentStepData = onboardingSteps[currentStep]
  const isLastStep = currentStep === onboardingSteps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      // Add small delay for smoother animation
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 100)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <>
      {/* Highlight border only */}
      <div
        className="fixed z-50 border-4 border-blue-500 rounded shadow-xl pointer-events-none transition-all duration-500 ease-in-out"
        style={{
          top: highlightPosition.top - 4,
          left: highlightPosition.left - 4,
          width: highlightPosition.width + 8,
          height: highlightPosition.height + 8,
        }}
      />

      {/* Tooltip */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-xl p-6 max-w-sm border border-gray-200 transition-all duration-300 ease-in-out"
        style={{
          // Smart positioning with visual alignment
          top: (() => {
            // For palette, center vertically with the highlighted area
            if (currentStepData.id === 'palette') {
              return highlightPosition.top + (highlightPosition.height / 2) - 100
            }
            // For persona, phases and stages (top elements), place below with aligned tops
            if (currentStepData.id === 'persona' || currentStepData.id === 'phases' || currentStepData.id === 'stages') {
              return highlightPosition.top + highlightPosition.height + 16
            }
            // For categories and cells, align top edges
            return highlightPosition.top
          })(),
          left: (() => {
            // For palette, position to the right
            if (currentStepData.id === 'palette') {
              return highlightPosition.left + highlightPosition.width + 24
            }
            // For persona, phases and stages (placed below), align left edges
            if (currentStepData.id === 'persona' || currentStepData.id === 'phases' || currentStepData.id === 'stages') {
              return Math.max(16, highlightPosition.left)
            }

            // For categories and cells, position to the right or left
            const popupWidth = 350
            const rightSpace = window.innerWidth - (highlightPosition.left + highlightPosition.width)

            if (rightSpace >= popupWidth + 24) {
              // Enough space on the right - align with right edge of highlighted area
              return highlightPosition.left + highlightPosition.width + 24
            } else {
              // Place on the left - align with left edge of highlighted area
              return Math.max(16, highlightPosition.left - popupWidth - 24)
            }
          })(),
          maxWidth: '350px'
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{currentStepData.title}</h3>
          <button
            onClick={onSkip}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {currentStepData.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex space-x-2">
            {currentStep > 0 && (
              <Button variant="outline" size="sm" onClick={handlePrevious}>
                Tillbaka
              </Button>
            )}
            <Button variant="primary" size="sm" onClick={handleNext}>
              {isLastStep ? 'Klar' : 'Nästa'}
              {!isLastStep && <ArrowRightIcon className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <button
            onClick={onSkip}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Hoppa över guiden
          </button>
        </div>
      </div>
    </>
  )
}