'use client'

interface ProgressStepsProps {
  totalSteps: number
  currentStep: number
  className?: string
}

export function ProgressSteps({ totalSteps, currentStep, className = '' }: ProgressStepsProps) {
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} className="flex items-center">
          <div className={`
            w-2 h-2 rounded-full transition-colors duration-300
            ${index <= currentStep
              ? 'bg-slate-600'
              : 'bg-gray-300'
            }
          `} />

          {/* Connector line between dots */}
          {index < totalSteps - 1 && (
            <div className={`
              w-8 h-0.5 mx-2 transition-colors duration-300
              ${index < currentStep ? 'bg-slate-600' : 'bg-gray-300'}
            `} />
          )}
        </div>
      ))}
    </div>
  )
}