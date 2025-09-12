'use client'

import { OnboardingStep } from '@/types/onboarding'
import { cn } from '@/lib/utils'

interface OnboardingStepProps {
  step: OnboardingStep
  className?: string
}

export function OnboardingStepComponent({ step, className }: OnboardingStepProps) {
  return (
    <div className={cn("text-center max-w-2xl mx-auto", className)}>
      {step.icon && (
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-50 rounded-2xl">
            <step.icon className="h-12 w-12 text-blue-600" />
          </div>
        </div>
      )}
      
      <h2 className="text-2xl font-light text-gray-900 mb-4">
        {step.title}
      </h2>
      
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        {step.description}
      </p>
      
      <div className="bg-gray-50 rounded-xl p-6">
        {step.content}
      </div>
    </div>
  )
}