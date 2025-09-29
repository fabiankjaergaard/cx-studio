'use client'

import { useState, useEffect } from 'react'
import { XIcon } from 'lucide-react'
import {
  StarIcon, CheckCircleIcon, AlertCircleIcon, XCircleIcon, RefreshCwIcon, PauseCircleIcon,
  CloudIcon, HeartIcon, LightbulbIcon, ShoppingCartIcon, MessageCircleIcon, UserIcon,
  MapPinIcon, PhoneIcon, MailIcon, GlobeIcon, SmartphoneIcon, MonitorIcon,
  TruckIcon, CreditCardIcon, ShieldIcon, AwardIcon, ZapIcon, TrendingUpIcon,
  CalendarIcon, ClockIcon, TargetIcon, BookIcon, CameraIcon, FileIcon,
  HomeIcon, BuildingIcon, CarIcon, PlaneIcon, TrainIcon, WifiIcon,
  BatteryIcon, SearchIcon, SettingsIcon, BellIcon, LockIcon, KeyIcon,
  ThumbsUpIcon, ThumbsDownIcon, EyeIcon, MicIcon, VideoIcon, HeadphonesIcon,
  SmileIcon, FrownIcon, MehIcon, SunIcon, MoonIcon,
  AlertTriangleIcon, InfoIcon, MinusCircleIcon, HelpCircleIcon, FlagIcon,
  TrendingDownIcon, ArrowUpIcon, ArrowDownIcon, CircleIcon, SquareIcon,
  ZapIcon as FlashIcon, CoffeeIcon, UmbrellaIcon,
  // CX-specific icons
  UsersIcon, UserCheckIcon, UserXIcon, BrainIcon,
  CompassIcon, RouteIcon, NavigationIcon, MegaphoneIcon,
  MessageSquareIcon, ClipboardListIcon, ClipboardCheckIcon,
  BarChartIcon, PieChartIcon, ActivityIcon,
  RocketIcon, SparklesIcon, GiftIcon, BadgeIcon,
  Angry as AngryFaceIcon, Laugh as LaughFaceIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ROW_COLORS } from '@/types/journey-map'

// Actions icons - same as in JourneyMapCell
const AVAILABLE_ICONS = [
  // First row - basic actions/objects
  { name: 'monitor', icon: MonitorIcon },
  { name: 'camera', icon: CameraIcon },
  { name: 'file', icon: FileIcon },
  { name: 'home', icon: HomeIcon },
  { name: 'building', icon: BuildingIcon },
  { name: 'car', icon: CarIcon },
  { name: 'plane', icon: PlaneIcon },
  { name: 'wifi', icon: WifiIcon },
  { name: 'video', icon: VideoIcon },

  // Second row - tools/actions
  { name: 'search', icon: SearchIcon },
  { name: 'settings', icon: SettingsIcon },
  { name: 'bell', icon: BellIcon },
  { name: 'lock', icon: LockIcon },
  { name: 'key', icon: KeyIcon },
  { name: 'thumbs-up', icon: ThumbsUpIcon },
  { name: 'thumbs-down', icon: ThumbsDownIcon },
  { name: 'eye', icon: EyeIcon },
  { name: 'mic', icon: MicIcon },
  { name: 'headphones', icon: HeadphonesIcon },

  // Third row - emotions
  { name: 'smile', icon: SmileIcon },
  { name: 'frown', icon: FrownIcon },
  { name: 'meh', icon: MehIcon },
  { name: 'angry-face', icon: AngryFaceIcon },
  { name: 'laugh-face', icon: LaughFaceIcon },
  { name: 'heart-emotion', icon: HeartIcon },
  { name: 'route', icon: RouteIcon },
  { name: 'compass', icon: CompassIcon },
  { name: 'rocket', icon: RocketIcon },

  // Fourth row - communication/business
  { name: 'message', icon: MessageCircleIcon },
  { name: 'brain', icon: BrainIcon },
  { name: 'megaphone', icon: MegaphoneIcon },
  { name: 'clipboard-list', icon: ClipboardListIcon },
  { name: 'clipboard-check', icon: ClipboardCheckIcon },
  { name: 'bar-chart', icon: BarChartIcon },
  { name: 'activity', icon: ActivityIcon },
  { name: 'trending-up', icon: TrendingUpIcon },
  { name: 'trending-down', icon: TrendingDownIcon },

  // Fifth row - users/info
  { name: 'users', icon: UsersIcon },
  { name: 'user-check', icon: UserCheckIcon },
  { name: 'user-x', icon: UserXIcon },
  { name: 'alert-triangle', icon: AlertTriangleIcon },
  { name: 'info', icon: InfoIcon },
  { name: 'flag', icon: FlagIcon },
  { name: 'flash', icon: FlashIcon },
  { name: 'badge', icon: BadgeIcon },
  { name: 'gift', icon: GiftIcon },
]

interface CellEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { content: string; icon?: string; backgroundColor?: string }) => void
  initialContent?: string
  initialIcon?: string
  initialBackgroundColor?: string
  cellType: 'text' | 'number' | 'emoji' | 'rating' | 'status' | 'pain-points' | 'opportunities' | 'metrics' | 'channels'
  placeholder?: string
}

export function CellEditModal({
  isOpen,
  onClose,
  onSave,
  initialContent = '',
  initialIcon = '',
  initialBackgroundColor = '',
  cellType,
  placeholder = 'Skriv här...'
}: CellEditModalProps) {
  const [content, setContent] = useState(initialContent)
  const [selectedIcon, setSelectedIcon] = useState(initialIcon)
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(initialBackgroundColor)

  // Reset form when modal opens with new data
  useEffect(() => {
    if (isOpen) {
      setContent(initialContent)
      setSelectedIcon(initialIcon)
      setSelectedBackgroundColor(initialBackgroundColor)
    }
  }, [isOpen, initialContent, initialIcon, initialBackgroundColor])

  const handleSave = () => {
    onSave({
      content: content.trim(),
      icon: selectedIcon,
      backgroundColor: selectedBackgroundColor
    })
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  const getSelectedIconComponent = () => {
    if (!selectedIcon) return null
    const iconData = AVAILABLE_ICONS.find(icon => icon.name === selectedIcon)
    if (!iconData) return null
    const IconComponent = iconData.icon
    return <IconComponent className="h-5 w-5 text-slate-600" />
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-[800px] max-w-[95vw] border border-gray-200/50 backdrop-blur-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/30">
          <h2 className="text-xl font-semibold text-gray-900">Redigera cell</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <XIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Content - Horizontal layout */}
        <div className="p-8 grid grid-cols-3 gap-8">
          {/* Left column - Text input and preview */}
          <div className="space-y-6">
            <div>
              <label className="block text-base font-medium text-gray-800 mb-3">
                {cellType === 'number' ? 'Värde' : 'Text'}
              </label>
              {cellType === 'number' ? (
                <input
                  type="number"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={placeholder}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base shadow-sm"
                />
              ) : (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={placeholder}
                  rows={3}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-base shadow-sm"
                />
              )}
            </div>

            {/* Preview */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-3">Förhandsgranskning</label>
              <div className={`p-4 border-2 border-dashed border-gray-300 rounded-lg ${selectedBackgroundColor || 'bg-white'} relative min-h-[80px] flex items-center justify-center shadow-inner`}>
                {selectedIcon && (
                  <div className="absolute top-2 right-2">
                    {getSelectedIconComponent()}
                  </div>
                )}
                <div className="text-center text-gray-900">
                  {content || <span className="text-gray-400 italic">{placeholder}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Middle column - Icon selection */}
          <div>
            <label className="block text-base font-medium text-gray-800 mb-3">
              Ikon
              {selectedIcon && (
                <span className="ml-3 inline-flex items-center px-2 py-1 bg-gray-100 rounded-md">
                  {getSelectedIconComponent()}
                </span>
              )}
            </label>
            <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50/30">
              <button
                onClick={() => setSelectedIcon('')}
                className={`p-2 rounded-md hover:bg-gray-200 transition-colors border-2 ${
                  !selectedIcon ? 'border-red-300 bg-red-50' : 'border-transparent bg-white'
                } shadow-sm`}
                title="Ingen ikon"
              >
                <XIcon className="h-4 w-4 text-red-500" />
              </button>
              {AVAILABLE_ICONS.map((iconData) => {
                const IconComponent = iconData.icon
                return (
                  <button
                    key={iconData.name}
                    onClick={() => setSelectedIcon(iconData.name)}
                    className={`p-2 rounded-md hover:bg-gray-200 transition-colors border-2 ${
                      selectedIcon === iconData.name ? 'border-blue-300 bg-blue-50' : 'border-transparent bg-white'
                    } shadow-sm`}
                    title={iconData.name}
                  >
                    <IconComponent className="h-4 w-4 text-slate-700" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right column - Color selection */}
          <div>
            <label className="block text-base font-medium text-gray-800 mb-3">Bakgrundsfärg</label>
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => setSelectedBackgroundColor('')}
                className={`w-12 h-12 rounded-lg border-2 bg-white ${
                  !selectedBackgroundColor ? 'border-slate-400 ring-2 ring-slate-200' : 'border-gray-300'
                } hover:border-gray-400 transition-all relative shadow-md`}
                title="Ingen färg"
              >
                <XIcon className="h-4 w-4 text-red-500 absolute inset-0 m-auto" />
              </button>
              {ROW_COLORS.slice(0, 11).map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedBackgroundColor(color.class)}
                  className={`w-12 h-12 rounded-lg border-2 ${color.class} ${
                    selectedBackgroundColor === color.class ? 'border-slate-400 ring-2 ring-slate-300 scale-110' : 'border-gray-300'
                  } hover:border-gray-400 hover:scale-105 transition-all shadow-md`}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-100 bg-gray-50/50">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="px-6 py-2.5 text-base"
          >
            Avbryt
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="px-8 py-2.5 text-base bg-blue-600 hover:bg-blue-700"
          >
            Spara
          </Button>
        </div>
      </div>
    </div>
  )
}