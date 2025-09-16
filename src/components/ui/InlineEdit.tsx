'use client'

import { useState, useRef, useEffect } from 'react'

interface InlineEditProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  inputClassName?: string
  multiline?: boolean
  onStartEdit?: () => void
  onFinishEdit?: () => void
  variant?: 'phase-title' | 'stage-title' | 'row-title' | 'row-header' | 'description' | 'default'
}

export function InlineEdit({
  value,
  onChange,
  placeholder = "Click to edit...",
  className = "",
  inputClassName = "",
  multiline = false,
  onStartEdit,
  onFinishEdit,
  variant = 'default'
}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    setEditValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleStartEdit = () => {
    setIsEditing(true)
    setEditValue(value)
    onStartEdit?.()
  }

  const handleFinishEdit = () => {
    setIsEditing(false)
    onChange(editValue.trim())
    onFinishEdit?.()
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditValue(value)
    onFinishEdit?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      handleFinishEdit()
    } else if (e.key === 'Enter' && multiline && e.ctrlKey) {
      e.preventDefault()
      handleFinishEdit()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    }
  }

  const handleBlur = () => {
    handleFinishEdit()
  }

  // Get variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'phase-title':
        return {
          display: 'font-medium text-gray-800 text-sm',
          input: 'font-medium text-gray-800 text-sm'
        }
      case 'stage-title':
        return {
          display: 'font-medium text-gray-800 text-sm',
          input: 'font-medium text-gray-800 text-sm'
        }
      case 'row-title':
        return {
          display: 'font-medium text-gray-800 text-sm',
          input: 'font-medium text-gray-800 text-sm'
        }
      case 'row-header':
        return {
          display: 'font-medium text-gray-800 text-sm',
          input: 'font-medium text-gray-800 text-sm'
        }
      case 'description':
        return {
          display: 'text-gray-500 text-xs',
          input: 'text-gray-500 text-xs'
        }
      default:
        return {
          display: 'text-gray-700 text-sm',
          input: 'text-gray-700 text-sm'
        }
    }
  }

  const variantStyles = getVariantStyles()

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input'

    return (
      <InputComponent
        ref={inputRef as any}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`${inputClassName} ${variantStyles.input} bg-white border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500`}
        {...(multiline ? { rows: 2 } : {})}
      />
    )
  }

  return (
    <div
      onDoubleClick={handleStartEdit}
      className={`${className} ${variantStyles.display} cursor-pointer hover:bg-gray-50 rounded px-2 py-1 transition-colors`}
      title="Double-click to edit"
    >
      {value || <span className="text-gray-400 italic text-sm">{placeholder}</span>}
    </div>
  )
}