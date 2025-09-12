'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { OnboardingProgress } from './OnboardingProgress'
import { OnboardingStepComponent } from './OnboardingStep'
import { onboardingSteps } from '@/data/onboardingSteps'
import { useOnboarding } from '@/hooks/useOnboarding'
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from 'lucide-react'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
}

export function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const { completeOnboarding } = useOnboarding()
  
  console.log('OnboardingModal render:', { isOpen, currentStepIndex })

  const currentStep = onboardingSteps[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === onboardingSteps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      handleComplete()
    } else {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const handleComplete = () => {
    completeOnboarding()
    onComplete?.()
    onClose()
  }

  const handleSkip = () => {
    completeOnboarding()
    onClose()
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => {}} // Disable closing by clicking outside
      className="max-w-4xl"
    >
      <div className="p-8">
        {/* Header with logo */}
        <div className="text-center mb-8">
          <img 
            src="/Nava blue text.png" 
            alt="Nava" 
            className="h-12 w-auto mx-auto mb-4"
          />
          <OnboardingProgress 
            currentStep={currentStepIndex + 1}
            totalSteps={onboardingSteps.length}
            className="max-w-md mx-auto"
          />
        </div>

        {/* Current step content */}
        <div className="mb-8">
          <OnboardingStepComponent step={currentStep} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div>
            {!isFirstStep && (
              <Button 
                variant="ghost" 
                onClick={handlePrevious}
                className="flex items-center space-x-2"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                <span>Föregående</span>
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {/* Skip button (not on last step) */}
            {!isLastStep && (
              <Button 
                variant="ghost" 
                onClick={handleSkip}
                className="text-gray-500 hover:text-gray-700"
              >
                Hoppa över
              </Button>
            )}

            {/* Next/Complete button */}
            <Button 
              variant="primary" 
              onClick={handleNext}
              className="flex items-center space-x-2 min-w-[140px] justify-center"
            >
              {isLastStep ? (
                <>
                  <CheckIcon className="h-4 w-4" />
                  <span>Kom igång!</span>
                </>
              ) : (
                <>
                  <span>Nästa</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}