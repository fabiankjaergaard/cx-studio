'use client'

import { useEffect, useState } from 'react'

interface CustomDriverNavProps {
  isActive: boolean
}

export function CustomDriverNav({ isActive }: CustomDriverNavProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(8) // We know we have 8 steps
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isActive || !mounted) return

    // Simple check for highlighted element to determine step
    const checkDriverState = () => {
      const highlighted = document.querySelector('.driver-highlighted-element')
      if (highlighted) {
        const tourId = highlighted.getAttribute('data-tour')
        const stepMap: { [key: string]: number } = {
          'dashboard': 0,
          'journey-maps': 1,
          'personas': 2,
          'insights': 3,
          'templates': 4
        }
        if (tourId && stepMap[tourId] !== undefined) {
          setCurrentStep(stepMap[tourId])
        }
      }
    }

    checkDriverState()
    const interval = setInterval(checkDriverState, 200)
    return () => clearInterval(interval)
  }, [isActive, mounted])

  const handleNext = () => {
    if (typeof window !== 'undefined' && (window as any).guidedTourDriver) {
      const driver = (window as any).guidedTourDriver
      if (currentStep < totalSteps - 1) {
        driver.moveNext()
      } else {
        driver.destroy()
      }
    }
  }

  const handlePrev = () => {
    if (typeof window !== 'undefined' && (window as any).guidedTourDriver) {
      const driver = (window as any).guidedTourDriver
      driver.movePrevious()
    }
  }

  const handleClose = () => {
    if (typeof window !== 'undefined' && (window as any).guidedTourDriver) {
      const driver = (window as any).guidedTourDriver
      driver.destroy()
    }
  }

  if (!isActive || !mounted) return null

  console.log('CustomDriverNav rendering:', { isActive, currentStep, totalSteps })

  return (
    <div 
      className="custom-driver-nav"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        gap: '8px',
        zIndex: 999999,
        pointerEvents: 'all'
      }}
    >
      {currentStep > 0 && (
        <button 
          onClick={handlePrev}
          className="custom-driver-btn custom-driver-prev"
          style={{
            background: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Föregående
        </button>
      )}
      
      <button 
        onClick={handleNext}
        className="custom-driver-btn custom-driver-next"
        style={{
          background: '#4b5563',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        {currentStep < totalSteps - 1 ? 'Nästa' : 'Klar'}
      </button>
      
      <button 
        onClick={handleClose}
        className="custom-driver-btn"
        style={{ 
          background: 'transparent', 
          color: '#6b7280',
          border: 'none',
          minWidth: '30px',
          padding: '8px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        ✕
      </button>
    </div>
  )
}