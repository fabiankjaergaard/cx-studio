'use client'

import { useState } from 'react'
import { X, Sticker, ChevronLeft, ChevronRight } from 'lucide-react'
import { STICKER_TYPES, STICKER_CATEGORIES, StickerType } from '@/types/stickers'
import { useDrag } from 'react-dnd'

interface FloatingStickerPaletteProps {
  isOpen: boolean
  onClose: () => void
  onStickerSelect: (sticker: StickerType) => void
}

interface DraggableStickerProps {
  sticker: StickerType
  onSelect: (sticker: StickerType) => void
}

function DraggableSticker({ sticker, onSelect }: DraggableStickerProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'sticker',
    item: sticker,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`
        p-3 rounded-lg border-2 cursor-grab transition-all hover:scale-110
        ${sticker.bgColor} border-gray-200 hover:border-gray-300
        ${isDragging ? 'opacity-50' : ''}
      `}
      onClick={() => onSelect(sticker)}
      title={sticker.name}
    >
      <span className="text-2xl select-none">{sticker.icon}</span>
    </div>
  )
}

export function FloatingStickerPalette({ isOpen, onClose, onStickerSelect }: FloatingStickerPaletteProps) {
  const [selectedCategory, setSelectedCategory] = useState(STICKER_CATEGORIES[0].id)
  const [isMinimized, setIsMinimized] = useState(false)

  if (!isOpen) return null

  const categorizedStickers = STICKER_TYPES.filter(sticker => sticker.category === selectedCategory)
  const currentCategoryIndex = STICKER_CATEGORIES.findIndex(cat => cat.id === selectedCategory)

  const nextCategory = () => {
    const nextIndex = (currentCategoryIndex + 1) % STICKER_CATEGORIES.length
    setSelectedCategory(STICKER_CATEGORIES[nextIndex].id)
  }

  const prevCategory = () => {
    const prevIndex = currentCategoryIndex === 0 ? STICKER_CATEGORIES.length - 1 : currentCategoryIndex - 1
    setSelectedCategory(STICKER_CATEGORIES[prevIndex].id)
  }

  const currentCategory = STICKER_CATEGORIES[currentCategoryIndex]

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 max-w-80">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Sticker className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-gray-800">Stickers</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Category Navigation */}
          <div className="flex items-center justify-between p-3 border-b border-gray-100">
            <button
              onClick={prevCategory}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              disabled={STICKER_CATEGORIES.length <= 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-center">
              <div className={`text-sm font-medium ${currentCategory.color}`}>
                {currentCategory.name}
              </div>
              <div className="text-xs text-gray-500">
                {currentCategoryIndex + 1} of {STICKER_CATEGORIES.length}
              </div>
            </div>

            <button
              onClick={nextCategory}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              disabled={STICKER_CATEGORIES.length <= 1}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sticker Grid */}
          <div className="p-3">
            <div className="grid grid-cols-4 gap-2">
              {categorizedStickers.map((sticker) => (
                <DraggableSticker
                  key={sticker.id}
                  sticker={sticker}
                  onSelect={onStickerSelect}
                />
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-xs text-blue-800">
                💡 Dra stickers till journey map-en eller klicka för att välja
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}