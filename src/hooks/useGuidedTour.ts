'use client'

import { useEffect, useState } from 'react'
import { driver } from 'driver.js'

const tourSteps = [
  {
    element: '[data-tour="dashboard"]',
    popover: {
      title: 'Dashboard',
      description: 'Här får du en snabb översikt över din Customer Experience data och viktiga insights.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="journey-maps"]',
    popover: {
      title: 'Journey Maps',
      description: 'Skapa och hantera dina customer journey maps för att förstå hela kundupplevelsen.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="templates"]',
    popover: {
      title: 'Mallar',
      description: 'Använd färdiga mallar för att snabbt komma igång med dina CX-projekt.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="analytics"]',
    popover: {
      title: 'Analytics',
      description: 'Analysera dina CX-data och få värdefulla insikter om kundupplevelsen.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="personas"]',
    popover: {
      title: 'Personas',
      description: 'Definiera och hantera dina kundpersonas för bättre målgruppsförståelse.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="insights"]',
    popover: {
      title: 'Insights',
      description: 'Samla in kundinsikter genom enkäter, intervjuer och andra metoder.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="glossary"]',
    popover: {
      title: 'Glossary',
      description: 'En ordlista med viktiga begrepp och definitioner inom Customer Experience.',
      position: 'bottom'
    }
  },
  {
    element: '[data-tour="settings"]',
    popover: {
      title: 'Inställningar',
      description: 'Anpassa dina kontoinställningar och preferenser här.',
      position: 'bottom'
    }
  }
]

export function useGuidedTour() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Initialize driver with default buttons
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous'],
      nextBtnText: 'Nästa',
      prevBtnText: 'Föregående',
      progressText: 'Steg {{current}} av {{total}}',
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
  }, [])

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