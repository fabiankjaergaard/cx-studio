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
        return <CheckIcon className="h-5 w-5 text-slate-600" />
      case 'error':
        return <XIcon className="h-5 w-5 text-red-600" />
      case 'warning':
        return <AlertTriangleIcon className="h-5 w-5 text-yellow-600" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-white border-slate-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
    }
  }

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-slate-700'
      case 'error':
        return 'text-red-800'
      case 'warning':
        return 'text-yellow-800'
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
            ml-2 p-1 rounded-full hover:bg-slate-100
            ${type === 'success' ? 'text-slate-500 hover:text-slate-700' : type === 'error' ? 'text-red-600' : 'text-yellow-600'}
          `}
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}