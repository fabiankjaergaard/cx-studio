'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'
import { Comment } from '@/types/journey-map'

interface CommentMarkerProps {
  comment: Comment
  onClick: () => void
  isActive?: boolean
}

export const CommentMarker: React.FC<CommentMarkerProps> = ({
  comment,
  onClick,
  isActive = false
}) => {
  const markerColor = comment.color || '#778DB0' // Default to Calm Blue
  const hasReplies = comment.replies.length > 0
  const isResolved = comment.resolved

  return (
    <button
      data-comment-marker
      onClick={onClick}
      className={`absolute group cursor-pointer transition-all duration-200 ease-out hover:scale-110 pointer-events-auto ${
        isActive ? 'scale-125 z-50' : 'z-40'
      }`}
      style={{
        left: `${comment.position.x}px`,
        top: `${comment.position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
      aria-label={`Comment by ${comment.author.name}`}
    >
      {/* Main marker circle */}
      <div
        className={`
          relative w-8 h-8 rounded-full flex items-center justify-center
          border-2 border-white shadow-lg
          ${isResolved ? 'opacity-60' : 'opacity-100'}
          ${isActive ? 'ring-4 ring-blue-200' : ''}
        `}
        style={{ backgroundColor: markerColor }}
      >
        <MessageCircle
          className="w-4 h-4 text-white"
          strokeWidth={2.5}
        />

        {/* Reply count badge */}
        {hasReplies && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white border border-gray-200 rounded-full flex items-center justify-center">
            <span className="text-[9px] font-bold text-gray-700">
              {comment.replies.length}
            </span>
          </div>
        )}

        {/* Resolved checkmark */}
        {isResolved && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border border-white rounded-full flex items-center justify-center">
            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Hover tooltip */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
          <div className="font-medium">{comment.author.name}</div>
          <div className="text-gray-300 max-w-[200px] truncate">
            {comment.text}
          </div>
          {/* Tooltip arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </button>
  )
}
