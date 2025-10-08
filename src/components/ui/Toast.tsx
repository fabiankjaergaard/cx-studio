import React, { useEffect, useState } from 'react'
import { CheckIcon, XIcon, AlertTriangleIcon } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'warning'
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000
}) => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
        setTimeout(onClose, 300) // Wait for exit animation
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible && !isAnimating) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckIcon className="h-5 w-5 text-white" />
      case 'error':
        return <XIcon className="h-5 w-5 text-[#C45A49]" />
      case 'warning':
        return <AlertTriangleIcon className="h-5 w-5 text-[#ED6B5A]" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-[#77BB92] border-[#77BB92]'
      case 'error':
        return 'bg-[#C45A49]/10 border-[#C45A49]'
      case 'warning':
        return 'bg-[#ED6B5A]/10 border-[#ED6B5A]'
    }
  }

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-white'
      case 'error':
        return 'text-[#C45A49]'
      case 'warning':
        return 'text-[#ED6B5A]'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`
          flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg border
          ${getBackgroundColor()}
          ${getTextColor()}
          transform transition-all duration-300 ease-in-out
          ${isAnimating && isVisible
            ? 'translate-x-0 opacity-100'
            : 'translate-x-full opacity-0'
          }
        `}
        style={{ minWidth: '300px' }}
      >
        {getIcon()}
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className={`
            ml-2 p-1 rounded-full
            ${type === 'success' ? 'text-white hover:bg-white/20' : type === 'error' ? 'text-[#C45A49] hover:bg-[#F9FAFB]' : 'text-[#ED6B5A] hover:bg-[#F9FAFB]'}
          `}
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}