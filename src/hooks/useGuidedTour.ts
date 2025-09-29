'use client'

import { useEffect, useState } from 'react'
import { driver } from 'driver.js'
import { useLanguage } from '@/contexts/LanguageContext'

const getTourSteps = (t: (key: string) => string) => [
  {
    element: '[data-tour="dashboard"]',
    popover: {
      title: t('tour.dashboard'),
      description: t('tour.dashboardDesc'),
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="journey-maps"]',
    popover: {
      title: t('tour.journeyMaps'),
      description: t('tour.journeyMapsDesc'),
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="templates"]',
    popover: {
      title: t('tour.templates'),
      description: t('tour.templatesDesc'),
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="analytics"]',
    popover: {
      title: t('tour.analytics'),
      description: t('tour.analyticsDesc'),
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="personas"]',
    popover: {
      title: t('tour.personas'),
      description: t('tour.personasDesc'),
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="insights"]',
    popover: {
      title: t('tour.insights'),
      description: t('tour.insightsDesc'),
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="glossary"]',
    popover: {
      title: t('tour.glossary'),
      description: t('tour.glossaryDesc'),
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="beta-tester"]',
    popover: {
      title: 'Beta Tester',
      description: 'Access beta testing information, feedback submission, and help improve the platform. This section contains important information for beta testers.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="admin"]',
    popover: {
      title: 'Admin',
      description: 'Administrative panel for managing and reviewing user feedback, feature requests, and bug reports. Protected access for administrators only.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="settings"]',
    popover: {
      title: t('tour.settings'),
      description: t('tour.settingsDesc'),
      position: 'bottom'
    }
  }
]

export function useGuidedTour() {
  const [isActive, setIsActive] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const tourSteps = getTourSteps(t)
    
    // Initialize driver with default buttons
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous'],
      nextBtnText: t('tour.next'),
      prevBtnText: t('tour.previous'),
      progressText: t('tour.step'),
      steps: tourSteps,
      popoverClass: 'guided-tour-popover',
      onHighlighted: (element, step, options) => {
        console.log('Driver.js highlighted:', { 
          element: element?.getAttribute('data-tour'),
          stepIndex: step.stepIndex,
          totalSteps: tourSteps.length
        })
      },
      onDestroyed: () => {
        setIsActive(false)
      }
    })

    // Store driver instance globally so we can access it
    if (typeof window !== 'undefined') {
      ;(window as any).guidedTourDriver = driverObj
    }

    return () => {
      if (driverObj) {
        driverObj.destroy()
      }
    }
  }, [t])

  const startTour = () => {
    setIsActive(true)
    if (typeof window !== 'undefined') {
      const driverObj = (window as any).guidedTourDriver
      if (driverObj) {
        driverObj.drive()
      }
    }
  }

  const stopTour = () => {
    setIsActive(false)
    if (typeof window !== 'undefined') {
      const driverObj = (window as any).guidedTourDriver
      if (driverObj) {
        driverObj.destroy()
      }
    }
  }

  return {
    startTour,
    stopTour,
    isActive
  }
}