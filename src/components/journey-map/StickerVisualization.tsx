'use client'

import { useState } from 'react'
import { ChevronDownIcon, XIcon, PlusIcon } from 'lucide-react'
import { STICKER_TYPES, STICKER_CATEGORIES, StickerType } from '@/types/stickers'

interface StickerVisualizationProps {
  content: string
  onChange: (content: string) => void
  stages: Array<{ id: string; name: string }>
}

interface PlacedSticker {
  id: string
  stickerId: string
  stageId: string
  x: number
  y: number
}

export function StickerVisualization({ content, onChange, stages }: StickerVisualizationProps) {
  const [selectedCategory, setSelectedCategory] = useState(STICKER_CATEGORIES[0].id)
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [draggedSticker, setDraggedSticker] = useState<StickerType | null>(null)

  // Parse content to get placed stickers
  const placedStickers: PlacedSticker[] = content ? JSON.parse(content) : []

  const categorizedStickers = STICKER_TYPES.filter(sticker => sticker.category === selectedCategory)

  const handleStickerSelect = (sticker: StickerType) => {
    setDraggedSticker(sticker)
    setIsPickerOpen(false)
  }

  const handleStageClick = (stageId: string, event: React.MouseEvent<HTMLDivElement>) => {
    if (!draggedSticker) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    const newSticker: PlacedSticker = {
      id: Date.now().toString(),
      stickerId: draggedSticker.id,
      stageId,
      x: Math.max(10, Math.min(90, x)), // Keep within bounds
      y: Math.max(10, Math.min(90, y))
    }

    const updatedStickers = [...placedStickers, newSticker]
    onChange(JSON.stringify(updatedStickers))
    setDraggedSticker(null)
  }

  const handleStickerRemove = (stickerId: string) => {
    const updatedStickers = placedStickers.filter(s => s.id !== stickerId)
    onChange(JSON.stringify(updatedStickers))
  }

  const getStickerType = (stickerId: string) => {
    return STICKER_TYPES.find(s => s.id === stickerId)
  }

  return (
    <div className="w-full">
      {/* Sticker Picker */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">Add Stickers</h4>
          <button
            onClick={() => setIsPickerOpen(!isPickerOpen)}
            className="flex items-center space-x-2 px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="text-sm">Choose sticker</span>
            <ChevronDownIcon className={`w-4 h-4 transition-transform ${isPickerOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isPickerOpen && (
          <div className="border border-gray-200 rounded-lg bg-white p-4">
            {/* Category Tabs */}
            <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
              {STICKER_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sticker Grid */}
            <div className="grid grid-cols-5 gap-2">
              {categorizedStickers.map((sticker) => (
                <button
                  key={sticker.id}
                  onClick={() => handleStickerSelect(sticker)}
                  className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${sticker.bgColor} ${
                    draggedSticker?.id === sticker.id
                      ? 'border-blue-400 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  title={sticker.name}
                >
                  <span className="text-2xl">{sticker.icon}</span>
                </button>
              ))}
            </div>

            {draggedSticker && (
              <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <span className="text-lg mr-2">{draggedSticker.icon}</span>
                  Click on any stage area to place "{draggedSticker.name}" sticker
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stage Grid */}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${stages.length}, 1fr)` }}>
        {stages.map((stage) => {
          const stageStickers = placedStickers.filter(s => s.stageId === stage.id)

          return (
            <div
              key={stage.id}
              className={`relative min-h-32 border-2 border-dashed rounded-lg transition-colors ${
                draggedSticker
                  ? 'border-blue-300 bg-blue-50 cursor-crosshair'
                  : 'border-gray-200 bg-gray-50'
              }`}
              onClick={(e) => handleStageClick(stage.id, e)}
            >
              <div className="absolute top-2 left-2 text-xs font-medium text-gray-500">
                {stage.name}
              </div>

              {/* Placed Stickers */}
              {stageStickers.map((placedSticker) => {
                const stickerType = getStickerType(placedSticker.stickerId)
                if (!stickerType) return null

                return (
                  <div
                    key={placedSticker.id}
                    className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${placedSticker.x}%`,
                      top: `${placedSticker.y}%`
                    }}
                  >
                    <div className={`p-2 rounded-full ${stickerType.bgColor} border border-white shadow-sm hover:scale-110 transition-transform`}>
                      <span className="text-xl">{stickerType.icon}</span>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleStickerRemove(placedSticker.id)
                      }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <XIcon className="w-3 h-3" />
                    </button>
                  </div>
                )
              })}

              {/* Empty State */}
              {stageStickers.length === 0 && !draggedSticker && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No stickers</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}