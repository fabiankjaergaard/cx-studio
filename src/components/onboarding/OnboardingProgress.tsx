'use client'

import { cn } from '@/lib/utils'

interface OnboardingProgressProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function OnboardingProgress({ currentStep, totalSteps, className }: OnboardingProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Steg {currentStep} av {totalSteps}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}