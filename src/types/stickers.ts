export interface StickerType {
  id: string
  name: string
  icon: string
  category: string
  bgColor: string
}

export const STICKER_TYPES: StickerType[] = [
  // Emotions
  { id: 'happy', name: 'Happy', icon: '😊', category: 'emotions', bgColor: 'bg-yellow-100' },
  { id: 'excited', name: 'Excited', icon: '🤩', category: 'emotions', bgColor: 'bg-orange-100' },
  { id: 'confused', name: 'Confused', icon: '😕', category: 'emotions', bgColor: 'bg-gray-100' },
  { id: 'frustrated', name: 'Frustrated', icon: '😤', category: 'emotions', bgColor: 'bg-red-100' },
  { id: 'satisfied', name: 'Satisfied', icon: '😌', category: 'emotions', bgColor: 'bg-green-100' },

  // Indicators
  { id: 'important', name: 'Important', icon: '❗', category: 'indicators', bgColor: 'bg-red-100' },
  { id: 'warning', name: 'Warning', icon: '⚠️', category: 'indicators', bgColor: 'bg-yellow-100' },
  { id: 'success', name: 'Success', icon: '✅', category: 'indicators', bgColor: 'bg-green-100' },
  { id: 'idea', name: 'Idea', icon: '💡', category: 'indicators', bgColor: 'bg-yellow-100' },
  { id: 'question', name: 'Question', icon: '❓', category: 'indicators', bgColor: 'bg-blue-100' },

  // Actions
  { id: 'thumbs-up', name: 'Thumbs Up', icon: '👍', category: 'actions', bgColor: 'bg-green-100' },
  { id: 'thumbs-down', name: 'Thumbs Down', icon: '👎', category: 'actions', bgColor: 'bg-red-100' },
  { id: 'star', name: 'Star', icon: '⭐', category: 'actions', bgColor: 'bg-yellow-100' },
  { id: 'heart', name: 'Heart', icon: '❤️', category: 'actions', bgColor: 'bg-pink-100' },
  { id: 'fire', name: 'Fire', icon: '🔥', category: 'actions', bgColor: 'bg-orange-100' },

  // Objects
  { id: 'target', name: 'Target', icon: '🎯', category: 'objects', bgColor: 'bg-red-100' },
  { id: 'rocket', name: 'Rocket', icon: '🚀', category: 'objects', bgColor: 'bg-blue-100' },
  { id: 'diamond', name: 'Diamond', icon: '💎', category: 'objects', bgColor: 'bg-blue-100' },
  { id: 'trophy', name: 'Trophy', icon: '🏆', category: 'objects', bgColor: 'bg-yellow-100' },
  { id: 'crown', name: 'Crown', icon: '👑', category: 'objects', bgColor: 'bg-yellow-100' }
]

export const STICKER_CATEGORIES = [
  { id: 'emotions', name: 'Emotions', color: 'text-blue-600' },
  { id: 'indicators', name: 'Indicators', color: 'text-green-600' },
  { id: 'actions', name: 'Actions', color: 'text-purple-600' },
  { id: 'objects', name: 'Objects', color: 'text-orange-600' }
]