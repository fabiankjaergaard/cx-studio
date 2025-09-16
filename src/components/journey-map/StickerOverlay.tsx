'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { STICKER_TYPES, StickerType } from '@/types/stickers'
import { useDrop } from 'react-dnd'

interface PlacedSticker {
  id: string
  stickerId: string
  x: number
  y: number
  position: 'absolute' // Position relative to the overlay container
}

interface StickerOverlayProps {
  stickers: PlacedSticker[]
  onChange: (stickers: PlacedSticker[]) => void
  selectedSticker: StickerType | null
  onStickerPlace: () => void
}

export function StickerOverlay({ stickers, onChange, selectedSticker, onStickerPlace }: StickerOverlayProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'sticker',
    drop: (item: StickerType, monitor) => {
      const dropResult = monitor.getDropResult()
      if (!dropResult) {
        // Get the drop position relative to the overlay
        const clientOffset = monitor.getClientOffset()
        const targetElement = document.getElementById('journey-map-overlay')

        if (clientOffset && targetElement) {
          const rect = targetElement.getBoundingClientRect()
          const x = ((clientOffset.x - rect.left) / rect.width) * 100
          const y = ((clientOffset.y - rect.top) / rect.height) * 100

          handleStickerPlace(item, x, y)
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const handleStickerPlace = (sticker: StickerType, x: number, y: number) => {
    const newSticker: PlacedSticker = {
      id: Date.now().toString(),
      stickerId: sticker.id,
      x: Math.max(2, Math.min(98, x)), // Keep within bounds with margin
      y: Math.max(2, Math.min(98, y)),
      position: 'absolute'
    }

    onChange([...stickers, newSticker])
    onStickerPlace()
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedSticker) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    handleStickerPlace(selectedSticker, x, y)
  }

  const handleStickerRemove = (stickerId: string) => {
    onChange(stickers.filter(s => s.id !== stickerId))
  }

  const getStickerType = (stickerId: string) => {
    return STICKER_TYPES.find(s => s.id === stickerId)
  }

  return (
    <div
      id="journey-map-overlay"
      ref={drop}
      className={`
        absolute inset-0 pointer-events-auto
        ${selectedSticker ? 'cursor-crosshair' : 'cursor-default'}
        ${isOver ? 'bg-blue-50/20' : ''}
      `}
      onClick={handleOverlayClick}
    >
      {/* Placed Stickers */}
      {stickers.map((placedSticker) => {
        const stickerType = getStickerType(placedSticker.stickerId)
        if (!stickerType) return null

        return (
          <div
            key={placedSticker.id}
            className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${placedSticker.x}%`,
              top: `${placedSticker.y}%`
            }}
            onClick={(e) => e.stopPropagation()} // Prevent triggering overlay click
          >
            <div className={`
              p-2 rounded-full border border-white shadow-sm
              hover:scale-110 transition-transform
              ${stickerType.bgColor}
            `}>
              <span className="text-xl select-none">{stickerType.icon}</span>
            </div>

            {/* Remove Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleStickerRemove(placedSticker.id)
              }}
              className="
                absolute -top-1 -right-1 w-5 h-5
                bg-red-500 text-white rounded-full
                opacity-0 group-hover:opacity-100
                transition-opacity flex items-center justify-center
                hover:bg-red-600
              "
              title="Ta bort sticker"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )
      })}

      {/* Selected Sticker Preview */}
      {selectedSticker && (
        <div className="absolute top-2 left-2 p-2 bg-black/75 text-white rounded-lg text-sm pointer-events-none">
          <span className="mr-2">{selectedSticker.icon}</span>
          Klicka för att placera "{selectedSticker.name}"
        </div>
      )}
    </div>
  )
}