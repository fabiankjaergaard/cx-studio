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
              <div className="flex flex-col items-center justify-center min-h-[60px]">
                <div className="flex flex-wrap gap-1 mb-1 justify-center">
                  {stageChannels.length > 0 ? (
                    stageChannels.map((channelId, channelIndex) => {
                      const channel = CHANNEL_TYPES.find(c => c.id === channelId)
                      if (!channel) return null

                      const Icon = channel.icon
                      return (
                        <div
                          key={`${channelId}-${channelIndex}`}
                          className={`
                            w-8 h-8 rounded flex items-center justify-center text-white text-sm font-medium
                            ${channel.bgColor} shadow-sm
                          `}
                          title={channel.name}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                      )
                    })
                  ) : (
                    <button
                      onClick={() => setActiveStage(activeStage === stageIndex ? null : stageIndex)}
                      className="w-8 h-8 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                    >
                      <span className="text-gray-400 text-xs">+</span>
                    </button>
                  )}
                </div>

                {/* Channel Names */}
                {stageChannels.length > 0 && (
                  <div className="text-xs text-gray-600 text-center">
                    {stageChannels.map((channelId, channelIndex) => {
                      const channel = CHANNEL_TYPES.find(c => c.id === channelId)
                      if (!channel) return null
                      return (
                        <div key={channelIndex} className="truncate">
                          {channel.name}
                        </div>
                      )
                    }).filter(Boolean).slice(0, 2)} {/* Show max 2 names to avoid crowding */}
                    {stageChannels.length > 2 && (
                      <div className="text-gray-400">+{stageChannels.length - 2} more</div>
                    )}
                  </div>
                )}
              </div>

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
                                ? 'bg-slate-50 border border-slate-200'
                                : canAdd
                                  ? 'hover:bg-gray-50 border border-transparent'
                                  : 'opacity-50 cursor-not-allowed border border-transparent'
                              }
                            `}
                          >
                            <div className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs ${channel.bgColor}`}>
                              <channel.icon className="h-3 w-3" />
                            </div>
                            <span className="flex-1 text-gray-900 font-medium">{channel.name}</span>
                            {isSelected && <span className="text-slate-600">✓</span>}
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
          )
        })}
      </div>
    </div>
  )
}