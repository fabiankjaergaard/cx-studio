'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Touchpoint } from '@/types'
import { cn } from '@/lib/utils'
import { 
  SmileIcon, 
  MehIcon, 
  FrownIcon, 
  PhoneIcon, 
  MailIcon, 
  GlobeIcon, 
  StoreIcon,
  MessageSquareIcon,
  MoreVerticalIcon,
  EditIcon,
  TrashIcon,
  GripVerticalIcon,
  LinkIcon,
  CircleIcon
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useJourneyStore } from '@/store/journey-store'
import { useDrag, useDrop } from 'react-dnd'

interface TouchpointCardProps {
  touchpoint: Touchpoint
  isSelected?: boolean
  onClick?: () => void
  onEdit?: () => void
}

const emotionIcons = {
  positive: SmileIcon,
  neutral: MehIcon,
  negative: FrownIcon
}

const channelIcons = {
  online: GlobeIcon,
  offline: StoreIcon,
  phone: PhoneIcon,
  email: MailIcon,
  social: MessageSquareIcon
}

const emotionColors = {
  positive: 'border-gray-200 bg-white',
  neutral: 'border-gray-200 bg-white',
  negative: 'border-gray-200 bg-white'
}

export function TouchpointCard({ touchpoint, isSelected, onClick, onEdit }: TouchpointCardProps) {
  const EmotionIcon = emotionIcons[touchpoint.emotion]
  const ChannelIcon = channelIcons[touchpoint.channel]
  const [isHovered, setIsHovered] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [editTitle, setEditTitle] = useState(touchpoint.title)
  const [editDescription, setEditDescription] = useState(touchpoint.description)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null)
  const { 
    deleteTouchpoint, 
    updateTouchpoint,
    isConnecting, 
    connectionStart, 
    startConnection, 
    completeConnection, 
    cancelConnection,
    startDragging,
    updateDragPosition,
    stopDragging,
    isDragging: isConnectionDragging
  } = useJourneyStore()

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'touchpoint',
    item: { id: touchpoint.id, currentStage: touchpoint.stage.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const handleConnectionMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    
    if (isConnecting && connectionStart === touchpoint.id) {
      // Cancel if clicking on the same touchpoint that started the connection
      cancelConnection()
      return
    } else if (isConnecting && connectionStart !== touchpoint.id) {
      // Complete connection to this touchpoint
      completeConnection(touchpoint.id)
      return
    }
    
    // Start new connection with drag
    const rect = e.currentTarget.getBoundingClientRect()
    const startPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
    
    startDragging(touchpoint.id, startPosition)
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      updateDragPosition({ x: moveEvent.clientX, y: moveEvent.clientY })
    }
    
    const handleMouseUp = (upEvent: MouseEvent) => {
      stopDragging()
      
      // Check if we're over another touchpoint
      const elementAtPoint = document.elementFromPoint(upEvent.clientX, upEvent.clientY)
      const touchpointCard = elementAtPoint?.closest('[data-touchpoint-id]')
      
      if (touchpointCard) {
        const targetId = touchpointCard.getAttribute('data-touchpoint-id')
        if (targetId && targetId !== touchpoint.id) {
          completeConnection(targetId)
        } else {
          cancelConnection()
        }
      } else {
        cancelConnection()
      }
      
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleCardClick = () => {
    if (isConnecting && connectionStart !== touchpoint.id) {
      completeConnection(touchpoint.id)
    } else if (!isConnecting) {
      onClick?.()
    }
  }

  // Handle double click to edit
  const handleTitleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditingTitle(true)
    setEditTitle(touchpoint.title)
  }

  const handleDescriptionDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditingDescription(true)
    setEditDescription(touchpoint.description)
  }

  // Save edit functions
  const saveTitle = () => {
    if (editTitle.trim() !== touchpoint.title) {
      updateTouchpoint(touchpoint.id, { title: editTitle.trim() })
    }
    setIsEditingTitle(false)
  }

  const saveDescription = () => {
    if (editDescription.trim() !== touchpoint.description) {
      updateTouchpoint(touchpoint.id, { description: editDescription.trim() })
    }
    setIsEditingDescription(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      saveTitle()
    } else if (e.key === 'Escape') {
      setEditTitle(touchpoint.title)
      setIsEditingTitle(false)
    }
  }

  const handleDescriptionKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault()
      saveDescription()
    } else if (e.key === 'Escape') {
      setEditDescription(touchpoint.description)
      setIsEditingDescription(false)
    }
  }

  // Auto-focus when editing starts
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.select()
    }
  }, [isEditingTitle])

  useEffect(() => {
    if (isEditingDescription && descriptionTextareaRef.current) {
      descriptionTextareaRef.current.focus()
      descriptionTextareaRef.current.select()
    }
  }, [isEditingDescription])

  return (
    <>
      {/* Extended hover area that includes connection button area */}
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Invisible hover extension area */}
        <div className="absolute -right-8 top-0 w-8 h-full pointer-events-auto" />
        <Card
          ref={drag}
          data-touchpoint-id={touchpoint.id}
          className={cn(
            'cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] min-h-32 group relative w-full',
            'transform-gpu', // Hardware acceleration
            isSelected && 'ring-2 ring-slate-500 shadow-xl scale-[1.02] bg-slate-50/30',
            isDragging && 'opacity-40 rotate-2 shadow-2xl scale-105',
            isConnecting && connectionStart === touchpoint.id && 'ring-2 ring-orange-400 shadow-lg scale-[1.02]',
            isConnecting && connectionStart !== touchpoint.id && 'hover:ring-2 hover:ring-green-300 hover:bg-green-50',
            emotionColors[touchpoint.emotion]
          )}
          onClick={handleCardClick}
        >
      <CardContent className="p-3 relative">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start space-x-1.5 flex-1 min-w-0">
            <GripVerticalIcon className="h-3 w-3 text-gray-400 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={saveTitle}
                onKeyDown={handleTitleKeyDown}
                className="font-medium text-gray-900 text-xs leading-tight bg-transparent border-none outline-none p-0 w-full"
                maxLength={100}
              />
            ) : (
              <h4 
                className="font-medium text-gray-900 text-xs leading-tight truncate cursor-text hover:bg-gray-50 px-1 py-0.5 rounded -mx-1 -my-0.5 transition-colors"
                onDoubleClick={handleTitleDoubleClick}
                title="Dubbelklicka för att redigera"
              >
                {touchpoint.title}
              </h4>
            )}
          </div>
          <div className="flex items-center space-x-1 ml-1 flex-shrink-0">
            <ChannelIcon className="h-3 w-3 text-gray-500" />
            <EmotionIcon className="h-3 w-3 text-gray-500" />
          </div>
        </div>

        {/* Connection Dot - Visible on hover or when selected */}
        {(isHovered || isSelected) && (
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-1">
            {/* Connection Dot */}
            <div
              onMouseDown={handleConnectionMouseDown}
              className={cn(
                "w-4 h-4 border rounded-full bg-white cursor-pointer transition-all duration-200 shadow-md flex items-center justify-center select-none",
                isConnecting && connectionStart === touchpoint.id 
                  ? "border-orange-500 bg-orange-50 hover:border-orange-600" 
                  : "border-slate-400 hover:border-slate-600 hover:bg-slate-50"
              )}
              title={
                isConnecting && connectionStart === touchpoint.id 
                  ? "Dra för att avbryta koppling" 
                  : isConnecting 
                    ? "Släpp för att slutföra koppling" 
                    : "Dra för att starta koppling"
              }
            >
              <LinkIcon className="w-2 h-2 text-slate-500" />
            </div>
            
            {/* Edit Dot - Only when selected */}
            {isSelected && (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit?.()
                }}
                className="w-4 h-4 border border-slate-400 rounded-full bg-white cursor-pointer hover:border-slate-600 hover:bg-slate-50 transition-all duration-200 shadow-md flex items-center justify-center"
                title="Redigera"
              >
                <EditIcon className="w-2 h-2 text-slate-500" />
              </div>
            )}
            
            {/* Delete Dot - Only when selected */}
            {isSelected && (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  if (confirm('Är du säker på att du vill ta bort denna touchpoint?')) {
                    deleteTouchpoint(touchpoint.id)
                  }
                }}
                className="w-4 h-4 border border-slate-400 rounded-full bg-white cursor-pointer hover:border-slate-600 hover:bg-slate-50 transition-all duration-200 shadow-md flex items-center justify-center"
                title="Ta bort"
              >
                <TrashIcon className="w-2 h-2 text-slate-500" />
              </div>
            )}
          </div>
        )}
        
        <div className="mb-2">
          {isEditingDescription ? (
            <textarea
              ref={descriptionTextareaRef}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              onBlur={saveDescription}
              onKeyDown={handleDescriptionKeyDown}
              className="text-xs text-gray-600 leading-relaxed bg-transparent border-none outline-none p-1 w-full resize-none rounded hover:bg-gray-50 -m-1"
              rows={2}
              maxLength={200}
              placeholder="Lägg till beskrivning..."
            />
          ) : (
            <p 
              className="text-xs text-gray-600 leading-relaxed line-clamp-2 cursor-text hover:bg-gray-50 px-1 py-0.5 rounded -mx-1 -my-0.5 transition-colors"
              onDoubleClick={handleDescriptionDoubleClick}
              title="Dubbelklicka för att redigera"
            >
              {touchpoint.description || (
                <span className="text-gray-400 italic">Dubbelklicka för att lägga till beskrivning</span>
              )}
            </p>
          )}
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="px-1.5 py-0.5 rounded text-xs bg-gray-100 text-gray-600 capitalize truncate">
            {touchpoint.channel}
          </span>
        </div>
      </CardContent>
      </Card>
      </div>
    </>
  )
}