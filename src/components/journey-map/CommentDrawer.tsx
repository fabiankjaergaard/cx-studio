'use client'

import React, { useState, useEffect } from 'react'
import { X, Send, Check, MessageCircle, MoreVertical, Trash2 } from 'lucide-react'
import { Comment, CommentReply } from '@/types/journey-map'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'

interface CommentDrawerProps {
  comment: Comment | null
  isOpen: boolean
  onClose: () => void
  onSave: (text: string) => void
  onReply: (commentId: string, text: string) => void
  onResolve: (commentId: string) => void
  onDelete: (commentId: string) => void
  isNewComment?: boolean
}

export const CommentDrawer: React.FC<CommentDrawerProps> = ({
  comment,
  isOpen,
  onClose,
  onSave,
  onReply,
  onResolve,
  onDelete,
  isNewComment = false
}) => {
  const [text, setText] = useState('')
  const [replyText, setReplyText] = useState('')
  const [showReplyInput, setShowReplyInput] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (isNewComment) {
      setText('')
    } else if (comment) {
      setText(comment.text)
    }
  }, [comment, isNewComment])

  useEffect(() => {
    if (!isOpen) {
      setShowReplyInput(false)
      setReplyText('')
      if (isNewComment) {
        setText('')
      }
    }
  }, [isOpen, isNewComment])

  const handleSave = () => {
    if (text.trim()) {
      onSave(text.trim())
      setText('')
      onClose()
    }
  }

  const handleReply = () => {
    if (replyText.trim() && comment) {
      onReply(comment.id, replyText.trim())
      setReplyText('')
      setShowReplyInput(false)
    }
  }

  const handleResolve = () => {
    if (comment) {
      onResolve(comment.id)
    }
  }

  const handleDelete = () => {
    if (comment && confirm('Are you sure you want to delete this comment?')) {
      onDelete(comment.id)
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

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div data-comment-drawer className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {isNewComment ? 'New Comment' : 'Comment'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isNewComment ? (
            /* New comment input */
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Add your comment
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your comment here..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                autoFocus
              />
            </div>
          ) : comment ? (
            /* Existing comment display */
            <div className="space-y-4">
              {/* Original comment */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {comment.author.avatar ? (
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                        {comment.author.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{comment.author.name}</div>
                      <div className="text-xs text-gray-500">{formatDate(comment.createdAt)}</div>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{comment.text}</p>
              </div>

              {/* Resolved status */}
              {comment.resolved && (
                <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
                  <Check className="w-4 h-4" />
                  <span className="font-medium">Resolved</span>
                </div>
              )}

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="space-y-3">
                  <div className="text-sm font-medium text-gray-700">
                    Replies ({comment.replies.length})
                  </div>
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2 mb-2">
                        {reply.author.avatar ? (
                          <img
                            src={reply.author.avatar}
                            alt={reply.author.name}
                            className="w-6 h-6 rounded-full"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-medium">
                            {reply.author.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 text-sm">{reply.author.name}</span>
                            <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
                          </div>
                          <p className="text-gray-700 text-sm mt-1 whitespace-pre-wrap">{reply.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply input */}
              {showReplyInput ? (
                <div className="space-y-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    autoFocus
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowReplyInput(false)
                        setReplyText('')
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleReply}
                      disabled={!replyText.trim()}
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowReplyInput(true)}
                  className="w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Reply
                </Button>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer actions */}
        <div className="border-t border-gray-200 p-4 space-y-2">
          {isNewComment ? (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={!text.trim()}
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </Button>
            </div>
          ) : comment ? (
            <div className="space-y-2">
              {!comment.resolved && (
                <Button
                  variant="outline"
                  onClick={handleResolve}
                  className="w-full"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark as Resolved
                </Button>
              )}
              <Button
                variant="outline"
                onClick={handleDelete}
                className="w-full text-red-600 hover:bg-red-50 border-red-200"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Comment
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
