export interface OnboardingStep {
  id: string
  title: string
  description: string
  content: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
}

export type OnboardingStepId = 'welcome' | 'dashboard' | 'journey-maps' | 'touchpoints' | 'get-started'