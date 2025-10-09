'use client'

import React, { useState, useRef, useEffect } from 'react'
import { X, Send, Check, Trash2, MoreVertical } from 'lucide-react'
import { Comment } from '@/types/journey-map'

interface CommentPopupProps {
  comment: Comment
  position: { x: number; y: number }
  onClose: () => void
  onReply: (commentId: string, text: string) => void
  onResolve: (commentId: string) => void
  onDelete: (commentId: string) => void
}

export const CommentPopup: React.FC<CommentPopupProps> = ({
  comment,
  position,
  onClose,
  onReply,
  onResolve,
  onDelete
}) => {
  const [replyText, setReplyText] = useState('')
  const [showReplyInput, setShowReplyInput] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText.trim())
      setReplyText('')
      setShowReplyInput(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleReply()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div
      ref={popupRef}
      className="fixed z-[60] bg-white rounded-lg shadow-2xl border border-gray-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '320px',
        maxHeight: '400px',
        transform: 'translate(-50%, calc(-100% - 16px))', // Position above the marker
        overflowY: 'auto'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-[#F9FAFB] rounded-t-lg sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          {comment.author.avatar ? (
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-[#778DB0] flex items-center justify-center text-white text-xs font-medium">
              {comment.author.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className="text-sm font-medium text-gray-900">{comment.author.name}</div>
            <div className="text-xs text-gray-500">{formatDate(comment.createdAt)}</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Comment text */}
      <div className="p-3">
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.text}</p>

        {comment.resolved && (
          <div className="flex items-center space-x-1 text-xs text-[#77BB92] bg-[#77BB92]/10 rounded px-2 py-1 mt-2 w-fit">
            <Check className="w-3 h-3" />
            <span>Resolved</span>
          </div>
        )}
      </div>

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="px-3 pb-2 space-y-2 border-t border-gray-100">
          <div className="text-xs font-medium text-gray-600 pt-2">
            {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
          </div>
          {comment.replies.map((reply) => (
            <div key={reply.id} className="bg-[#F9FAFB] rounded-lg p-2">
              <div className="flex items-start space-x-2">
                {reply.author.avatar ? (
                  <img
                    src={reply.author.avatar}
                    alt={reply.author.name}
                    className="w-5 h-5 rounded-full mt-0.5"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#A67FB5] flex items-center justify-center text-white text-[10px] font-medium mt-0.5">
                    {reply.author.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-900">{reply.author.name}</span>
                    <span className="text-[10px] text-gray-500">{formatDate(reply.createdAt)}</span>
                  </div>
                  <p className="text-xs text-gray-700 mt-0.5 whitespace-pre-wrap">{reply.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply input or button */}
      <div className="border-t border-gray-200 p-2">
        {showReplyInput ? (
          <div className="space-y-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a reply..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowReplyInput(false)
                  setReplyText('')
                }}
                className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-white bg-[#778DB0] hover:bg-[#6a7fa0] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <Send className="w-3 h-3" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowReplyInput(true)}
            className="w-full px-3 py-2 text-sm text-gray-600 hover:bg-[#F9FAFB] rounded-lg transition-colors text-left"
          >
            Reply...
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-gray-100 p-2 space-y-1">
        {!comment.resolved && (
          <button
            onClick={() => onResolve(comment.id)}
            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-[#F9FAFB] rounded-lg transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Mark as Resolved</span>
          </button>
        )}
        <button
          onClick={() => {
            if (confirm('Are you sure you want to delete this comment?')) {
              onDelete(comment.id)
              onClose()
            }
          }}
          className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-[#ED6B5A] hover:bg-[#ED6B5A]/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}
