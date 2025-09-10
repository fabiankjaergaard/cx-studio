'use client'

import { Section, SectionProps } from './Section'
import { CustomerJourney } from '@/types'
import { SmileIcon, MehIcon, FrownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmotionSectionProps extends Omit<SectionProps, 'children' | 'title'> {
  journey: CustomerJourney
  emotions?: Record<string, 'positive' | 'neutral' | 'negative'>
  onUpdateEmotion?: (stageId: string, emotion: 'positive' | 'neutral' | 'negative') => void
}

const emotionIcons = {
  positive: SmileIcon,
  neutral: MehIcon,
  negative: FrownIcon
}

const emotionColors = {
  positive: 'text-green-600 bg-green-100 hover:bg-green-200',
  neutral: 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200', 
  negative: 'text-red-600 bg-red-100 hover:bg-red-200'
}

export function EmotionSection({ 
  journey, 
  emotions = {}, 
  onUpdateEmotion, 
  ...sectionProps 
}: EmotionSectionProps) {

  const handleEmotionClick = (stageId: string, emotion: 'positive' | 'neutral' | 'negative') => {
    onUpdateEmotion?.(stageId, emotion)
  }

  return (
    <Section {...sectionProps} title="Känsloresan">
      <div className="space-y-8">
        {/* Emotion Scale Legend */}
        <div className="flex items-center justify-center space-x-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <FrownIcon className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium text-gray-700">Negativ</span>
          </div>
          <div className="flex items-center space-x-2">
            <MehIcon className="h-6 w-6 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Neutral</span>
          </div>
          <div className="flex items-center space-x-2">
            <SmileIcon className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Positiv</span>
          </div>
        </div>

        {/* Journey Stages with Emotions */}
        <div className="grid grid-cols-5 gap-6">
          {journey.stages.map((stage) => {
            const currentEmotion = emotions[stage.id] || 'neutral'
            
            return (
              <div key={stage.id} className="text-center">
                {/* Stage Info */}
                <div className="mb-4 p-3 rounded-lg border" style={{ backgroundColor: stage.color + '15' }}>
                  <div 
                    className="w-3 h-3 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: stage.color }}
                  />
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{stage.name}</h3>
                  <p className="text-xs text-gray-600">{stage.description}</p>
                </div>

                {/* Emotion Selector */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700 mb-3">Hur mår kunden?</p>
                  <div className="space-y-2">
                    {(['positive', 'neutral', 'negative'] as const).map((emotion) => {
                      const Icon = emotionIcons[emotion]
                      const isSelected = currentEmotion === emotion
                      
                      return (
                        <button
                          key={emotion}
                          onClick={() => handleEmotionClick(stage.id, emotion)}
                          className={cn(
                            'w-full p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center',
                            isSelected 
                              ? `${emotionColors[emotion]} border-current` 
                              : 'text-gray-400 bg-white border-gray-200 hover:bg-gray-50'
                          )}
                        >
                          <Icon className={cn(
                            'h-5 w-5',
                            isSelected ? '' : 'opacity-50'
                          )} />
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Current Selection Display */}
                {currentEmotion && (
                  <div className="mt-3 p-2 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-center space-x-2">
                      {(() => {
                        const Icon = emotionIcons[currentEmotion]
                        return <Icon className={cn('h-4 w-4', emotionColors[currentEmotion].split(' ')[0])} />
                      })()}
                      <span className="text-xs font-medium text-gray-700 capitalize">
                        {currentEmotion === 'positive' ? 'Positiv' : 
                         currentEmotion === 'negative' ? 'Negativ' : 'Neutral'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Emotion Journey Visualization */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-4">Känslodiagram</h3>
          <div className="flex items-end justify-between space-x-2 h-32">
            {journey.stages.map((stage, index) => {
              const emotion = emotions[stage.id] || 'neutral'
              const height = emotion === 'positive' ? 'h-24' : emotion === 'negative' ? 'h-8' : 'h-16'
              const color = emotion === 'positive' ? 'bg-green-400' : emotion === 'negative' ? 'bg-red-400' : 'bg-yellow-400'
              
              return (
                <div key={stage.id} className="flex-1 flex flex-col items-center">
                  <div className={cn('w-full rounded-t', height, color)}></div>
                  <div className="text-xs text-gray-600 mt-2 text-center font-medium">
                    {stage.name}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}