'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Smile, Send } from 'lucide-react'

interface CommentInputProps {
  position: { x: number; y: number }
  onSave: (text: string) => void
  onCancel: () => void
}

// Popular emojis for quick access
const EMOJI_LIST = [
  '😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊',
  '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘',
  '😗', '😙', '😚', '☺️', '😋', '😛', '😝', '😜',
  '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏',
  '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠',
  '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨',
  '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥',
  '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧',
  '👍', '👎', '👌', '✌️', '🤞', '🤝', '👏', '🙌',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍',
  '💯', '✨', '⭐', '🌟', '💫', '🔥', '💥', '⚡',
]

export const CommentInput: React.FC<CommentInputProps> = ({
  position,
  onSave,
  onCancel
}) => {
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(true)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    // Close emoji picker when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false)
      }
    }

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEmojiPicker])

  const handleSubmit = () => {
    if (text.trim()) {
      onSave(text.trim())
      setText('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onCancel()
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    // Auto-cancel if empty after a short delay
    setTimeout(() => {
      if (!text.trim() && !showEmojiPicker) {
        onCancel()
      }
    }, 200)
  }

  const handleEmojiClick = (emoji: string) => {
    setText(prev => prev + emoji)
    setShowEmojiPicker(false)
    // Refocus input after selecting emoji
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <>
      <div
        className="fixed z-50 flex items-center bg-white rounded-full shadow-lg border border-gray-300 hover:shadow-xl transition-shadow"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '360px',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Input field */}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder="Add a comment. Use @ to mention."
          className="flex-1 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-transparent border-0 rounded-l-full focus:outline-none"
        />

        {/* Emoji button */}
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          title="Add emoji"
          onMouseDown={(e) => e.preventDefault()} // Prevent blur
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="p-2 mr-2 text-gray-400 hover:text-[#778DB0] disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
          title="Post comment (Enter)"
          onMouseDown={(e) => e.preventDefault()} // Prevent blur
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="fixed z-[60] bg-white rounded-lg shadow-2xl border border-gray-200 p-2"
          style={{
            left: `${position.x}px`,
            top: `${position.y + 35}px`,
            width: '280px',
            maxHeight: '240px',
            transform: 'translate(-50%, 0)',
            overflowY: 'auto'
          }}
        >
          <div className="grid grid-cols-8 gap-1">
            {EMOJI_LIST.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="w-8 h-8 flex items-center justify-center text-xl hover:bg-gray-100 rounded transition-colors"
                title={emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
