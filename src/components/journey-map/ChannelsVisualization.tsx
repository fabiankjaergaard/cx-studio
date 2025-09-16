'use client'

import { useState } from 'react'
import { CHANNEL_TYPES } from '@/types/channels'
import { ChevronDownIcon } from 'lucide-react'

interface ChannelsVisualizationProps {
  channels: string[]
  onChange: (channels: string[]) => void
  stageCount: number
}

export function ChannelsVisualization({ channels, onChange, stageCount }: ChannelsVisualizationProps) {
  const [activeStage, setActiveStage] = useState<number | null>(null)

  const handleChannelSelect = (stageIndex: number, channelId: string) => {
    const newChannels = [...channels]

    // Ensure we have enough slots
    while (newChannels.length <= stageIndex) {
      newChannels.push('')
    }

    // Toggle channel selection
    const currentChannels = newChannels[stageIndex] ? newChannels[stageIndex].split(',').filter(c => c.trim()) : []
    const channelExists = currentChannels.includes(channelId)

    if (channelExists) {
      // Remove channel
      newChannels[stageIndex] = currentChannels.filter(c => c !== channelId).join(',')
    } else {
      // Add channel (limit to 3 per stage)
      if (currentChannels.length < 3) {
        currentChannels.push(channelId)
        newChannels[stageIndex] = currentChannels.join(',')
      }
    }

    onChange(newChannels)
    setActiveStage(null)
  }

  const getChannelsForStage = (stageIndex: number): string[] => {
    if (!channels[stageIndex]) return []
    return channels[stageIndex].split(',').filter(c => c.trim())
  }

  return (
    <div className="w-full min-h-24 p-3 border border-gray-200 rounded bg-white">
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${stageCount}, 1fr)` }}>
        {Array.from({ length: stageCount }).map((_, stageIndex) => {
          const stageChannels = getChannelsForStage(stageIndex)

          return (
            <div key={stageIndex} className="relative">
              {/* Channel Icons Display */}
              <div className="flex flex-wrap gap-1 mb-2 min-h-[32px] justify-center">
                {stageChannels.length > 0 ? (
                  stageChannels.map((channelId, channelIndex) => {
                    const channel = CHANNEL_TYPES.find(c => c.id === channelId)
                    if (!channel) return null

                    return (
                      <div
                        key={`${channelId}-${channelIndex}`}
                        className={`
                          w-8 h-8 rounded flex items-center justify-center text-white text-sm font-medium
                          ${channel.bgColor} shadow-sm
                        `}
                        title={channel.name}
                      >
                        {channel.icon}
                      </div>
                    )
                  })
                ) : (
                  <div className="w-8 h-8 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                    <span className="text-gray-400 text-xs">+</span>
                  </div>
                )}
              </div>

              {/* Add Channel Button */}
              <div className="relative">
                <button
                  onClick={() => setActiveStage(activeStage === stageIndex ? null : stageIndex)}
                  className="w-full px-2 py-1 text-xs bg-gray-50 border border-gray-200 rounded hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
                >
                  <span>Add Channel</span>
                  <ChevronDownIcon className={`w-3 h-3 transition-transform ${activeStage === stageIndex ? 'rotate-180' : ''}`} />
                </button>

                {/* Channel Selection Dropdown */}
                {activeStage === stageIndex && (
                  <div className="absolute bottom-full left-0 right-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg mb-1 max-h-48 overflow-y-auto">
                    <div className="p-2 space-y-1">
                      {CHANNEL_TYPES.map((channel) => {
                        const isSelected = stageChannels.includes(channel.id)
                        const canAdd = stageChannels.length < 3

                        return (
                          <button
                            key={channel.id}
                            onClick={() => handleChannelSelect(stageIndex, channel.id)}
                            disabled={!isSelected && !canAdd}
                            className={`
                              w-full flex items-center gap-2 p-2 rounded text-left text-xs transition-colors
                              ${isSelected
                                ? 'bg-blue-50 border border-blue-200'
                                : canAdd
                                  ? 'hover:bg-gray-50 border border-transparent'
                                  : 'opacity-50 cursor-not-allowed border border-transparent'
                              }
                            `}
                          >
                            <div className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs ${channel.bgColor}`}>
                              {channel.icon}
                            </div>
                            <span className="flex-1">{channel.name}</span>
                            {isSelected && <span className="text-blue-600">✓</span>}
                          </button>
                        )
                      })}
                    </div>

                    {stageChannels.length >= 3 && (
                      <div className="px-2 pb-2">
                        <div className="text-xs text-gray-500 text-center py-1">
                          Max 3 channels per stage
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}