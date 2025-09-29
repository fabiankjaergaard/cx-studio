'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  StarIcon, CheckCircleIcon, AlertCircleIcon, XCircleIcon, RefreshCwIcon, PauseCircleIcon, PlusIcon,
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
  // Resize & drag icons
  ChevronLeftIcon, ChevronRightIcon
} from 'lucide-react'
import { EmotionCurve } from './EmotionCurve'
import { PainPointsVisualization } from './PainPointsVisualization'
import { OpportunitiesVisualization } from './OpportunitiesVisualization'
import { MetricsVisualization } from './MetricsVisualization'
import { ChannelsVisualization } from './ChannelsVisualization'

interface JourneyMapCellProps {
  id: string
  content: string
  type: 'text' | 'emoji' | 'number' | 'rating' | 'status' | 'pain-points' | 'opportunities' | 'metrics' | 'channels'
  onChange: (content: string) => void
  onIconChange?: (icon: string) => void
  onClear?: () => void
  selectedIcon?: string
  placeholder?: string
  stageCount?: number
  isEmotionCurveCell?: boolean
  backgroundColor?: string
  colSpan?: number
  onColSpanChange?: (colSpan: number) => void
  isDraggable?: boolean
  position?: number
}

const AVAILABLE_ICONS = [
  { name: 'cloud', icon: CloudIcon },
  { name: 'lightbulb', icon: LightbulbIcon },
  { name: 'shopping-cart', icon: ShoppingCartIcon },
  { name: 'message', icon: MessageCircleIcon },
  { name: 'user', icon: UserIcon },
  { name: 'map-pin', icon: MapPinIcon },
  { name: 'phone', icon: PhoneIcon },
  { name: 'mail', icon: MailIcon },
  { name: 'globe', icon: GlobeIcon },
  { name: 'smartphone', icon: SmartphoneIcon },
  { name: 'monitor', icon: MonitorIcon },
  { name: 'truck', icon: TruckIcon },
  { name: 'credit-card', icon: CreditCardIcon },
  { name: 'shield', icon: ShieldIcon },
  { name: 'award', icon: AwardIcon },
  { name: 'zap', icon: ZapIcon },
  { name: 'trending-up', icon: TrendingUpIcon },
  { name: 'calendar', icon: CalendarIcon },
  { name: 'clock', icon: ClockIcon },
  { name: 'target', icon: TargetIcon },
  { name: 'book', icon: BookIcon },
  { name: 'camera', icon: CameraIcon },
  { name: 'file', icon: FileIcon },
  { name: 'home', icon: HomeIcon },
  { name: 'building', icon: BuildingIcon },
  { name: 'car', icon: CarIcon },
  { name: 'plane', icon: PlaneIcon },
  { name: 'train', icon: TrainIcon },
  { name: 'wifi', icon: WifiIcon },
  { name: 'battery', icon: BatteryIcon },
  { name: 'search', icon: SearchIcon },
  { name: 'settings', icon: SettingsIcon },
  { name: 'bell', icon: BellIcon },
  { name: 'lock', icon: LockIcon },
  { name: 'key', icon: KeyIcon },
  { name: 'thumbs-up', icon: ThumbsUpIcon },
  { name: 'thumbs-down', icon: ThumbsDownIcon },
  { name: 'eye', icon: EyeIcon },
  { name: 'mic', icon: MicIcon },
  { name: 'video', icon: VideoIcon },
  { name: 'headphones', icon: HeadphonesIcon },
  // NEW CX-specific icons (unique names only)
  { name: 'smile', icon: SmileIcon },
  { name: 'frown', icon: FrownIcon },
  { name: 'meh', icon: MehIcon },
  { name: 'angry-face', icon: AngryFaceIcon },
  { name: 'laugh-face', icon: LaughFaceIcon },
  { name: 'heart-emotion', icon: HeartIcon },
  { name: 'route', icon: RouteIcon },
  { name: 'compass', icon: CompassIcon },
  { name: 'navigation', icon: NavigationIcon },
  { name: 'rocket', icon: RocketIcon },
  { name: 'sparkles', icon: SparklesIcon },
  { name: 'message-square', icon: MessageSquareIcon },
  { name: 'brain', icon: BrainIcon },
  { name: 'megaphone', icon: MegaphoneIcon },
  { name: 'clipboard-list', icon: ClipboardListIcon },
  { name: 'clipboard-check', icon: ClipboardCheckIcon },
  { name: 'bar-chart', icon: BarChartIcon },
  { name: 'pie-chart', icon: PieChartIcon },
  { name: 'activity', icon: ActivityIcon },
  { name: 'trending-down', icon: TrendingDownIcon },
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

const STATUS_OPTIONS = [
  { value: 'Good', label: 'Good', icon: CheckCircleIcon, color: 'text-green-600' },
  { value: 'OK', label: 'OK', icon: AlertCircleIcon, color: 'text-yellow-600' },
  { value: 'Bad', label: 'Bad', icon: XCircleIcon, color: 'text-red-600' },
  { value: 'Ongoing', label: 'Ongoing', icon: RefreshCwIcon, color: 'text-slate-600' },
  { value: 'Paused', label: 'Paused', icon: PauseCircleIcon, color: 'text-gray-600' }
]

export function JourneyMapCell({
  id,
  content,
  type,
  onChange,
  onIconChange,
  onClear,
  selectedIcon,
  placeholder = 'Click to edit...',
  stageCount = 4,
  isEmotionCurveCell = false,
  backgroundColor,
  colSpan = 1,
  onColSpanChange,
  isDraggable = false,
  position
}: JourneyMapCellProps) {
  const [isStatusPickerOpen, setIsStatusPickerOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false)
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startColSpan, setStartColSpan] = useState(colSpan)
  const [justSelectedIcon, setJustSelectedIcon] = useState(false)
  const [localSelectedIcon, setLocalSelectedIcon] = useState<string | undefined>(selectedIcon)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const cellRef = useRef<HTMLDivElement>(null)

  // Drag & drop functionality
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    disabled: !isDraggable || isEditing
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // Resize functionality
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Resize start', { colSpan, clientX: e.clientX })
    setIsResizing(true)
    setStartX(e.clientX)
    setStartColSpan(colSpan)

    const handleResizeMove = (e: MouseEvent) => {
      if (!isResizing && !document.body.classList.contains('resizing')) return
      e.preventDefault()

      const deltaX = e.clientX - startX
      // More sensitive calculation
      const cellWidth = 150 // Smaller threshold for more responsive resizing
      const deltaColumns = Math.floor(deltaX / cellWidth)
      const newColSpan = Math.max(1, Math.min(8, startColSpan + deltaColumns)) // Max 8 columns

      console.log('Resize move', { deltaX, deltaColumns, newColSpan, currentColSpan: colSpan })

      if (newColSpan !== colSpan && onColSpanChange) {
        onColSpanChange(newColSpan)
      }
    }

    const handleResizeEnd = () => {
      console.log('Resize end')
      setIsResizing(false)
      document.body.classList.remove('resizing')
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)
    }

    document.body.classList.add('resizing')
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', handleResizeMove)
    document.addEventListener('mouseup', handleResizeEnd)
  }

  // Cleanup event listeners on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('resizing')
    }
  }, [])

  const handleStartEditing = () => {
    setIsEditing(true)
  }

  const handlePlusClick = (e?: React.MouseEvent) => {
    // Always show BOTH icon picker AND start editing
    setIsIconPickerOpen(true)
    setIsEditing(true)
  }

  const handleFinishEditing = () => {
    setIsEditing(false)
    // Close icon picker when finishing editing
    setTimeout(() => setIsIconPickerOpen(false), 100)

    // Reset the justSelectedIcon flag
    if (justSelectedIcon) {
      setTimeout(() => setJustSelectedIcon(false), 200)
    }
  }

  const handleContentChange = (newContent: string) => {
    onChange(newContent)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If cell is empty and user presses Delete or Backspace, clear the cell entirely
    if ((e.key === 'Delete' || e.key === 'Backspace') && !content.trim() && !selectedIcon && onClear) {
      e.preventDefault()
      onClear()
    }
    // If user presses Ctrl+Delete or Cmd+Delete, always clear cell
    else if ((e.key === 'Delete') && (e.ctrlKey || e.metaKey) && onClear) {
      e.preventDefault()
      onClear()
    }
  }

  const handleIconSelect = (iconName: string) => {
    // Update local state immediately
    setLocalSelectedIcon(iconName || undefined)

    // Update parent component
    if (onIconChange) {
      onIconChange(iconName)
    }

    setIsIconPickerOpen(false)
    setJustSelectedIcon(true)

    // Keep editing mode active
    setIsEditing(true)

    // Focus textarea after selecting icon (unless removing icon)
    if (iconName) {
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
        }
      }, 50)
    }
  }

  const getSelectedIconComponent = () => {
    // Use local state as primary, fallback to prop
    const currentIcon = localSelectedIcon || selectedIcon
    if (!currentIcon) return null
    const iconData = AVAILABLE_ICONS.find(icon => icon.name === currentIcon)
    if (!iconData) return null
    const IconComponent = iconData.icon
    return <IconComponent className="h-5 w-5 text-slate-600" />
  }

  // Sync local state with prop
  useEffect(() => {
    setLocalSelectedIcon(selectedIcon)
  }, [selectedIcon])

  useEffect(() => {
    if (isEditing) {
      if (type === 'number' && inputRef.current) {
        inputRef.current.focus()
      } else if (type === 'text' && textareaRef.current) {
        textareaRef.current.focus()
      }
    }
  }, [isEditing, type])

  const handleRatingClick = (rating: number) => {
    onChange(rating.toString())
  }

  const handleStatusSelect = (statusValue: string) => {
    onChange(statusValue)
    setIsStatusPickerOpen(false)
  }

  const getStatusDisplay = (statusValue: string) => {
    const status = STATUS_OPTIONS.find(s => s.value === statusValue)
    if (!status) return null

    const Icon = status.icon
    return (
      <div className="flex items-center space-x-2">
        <Icon className={`h-4 w-4 ${status.color}`} />
        <span className="text-gray-900">{status.label}</span>
      </div>
    )
  }

  switch (type) {
    case 'emoji':
      if (isEmotionCurveCell) {
        // Parse emotions from content (comma separated), preserving empty slots
        const emotions = content ? content.split(',').map(e => e.trim()) : []
        
        return (
          <EmotionCurve
            emotions={emotions}
            onChange={(newEmotions) => onChange(newEmotions.join(','))}
            stageCount={stageCount}
          />
        )
      } else {
        // Return empty cell for non-curve emoji cells
        return <div className="w-full min-h-20"></div>
      }

    case 'pain-points':
      const painPoints = content ? content.split(',').map(e => e.trim()) : []
      return (
        <PainPointsVisualization
          painPoints={painPoints}
          onChange={(newPainPoints) => onChange(newPainPoints.join(','))}
          stageCount={stageCount}
        />
      )

    case 'opportunities':
      const opportunities = content ? content.split(',').map(e => e.trim()) : []
      return (
        <OpportunitiesVisualization
          opportunities={opportunities}
          onChange={(newOpportunities) => onChange(newOpportunities.join(','))}
          stageCount={stageCount}
        />
      )

    case 'metrics':
      const metrics = content ? content.split(',').map(e => e.trim()) : []
      return (
        <MetricsVisualization
          metrics={metrics}
          onChange={(newMetrics) => onChange(newMetrics.join(','))}
          stageCount={stageCount}
        />
      )

    case 'channels':
      const channels = content ? content.split(',').map(e => e.trim()) : []
      return (
        <ChannelsVisualization
          channels={channels}
          onChange={(newChannels) => onChange(newChannels.join(','))}
          stageCount={stageCount}
        />
      )


    case 'number':
      if (!content && !isEditing && !selectedIcon) {
        return (
          <>
            <div
              ref={cellRef}
              className={`w-full min-h-20 group cursor-pointer transition-all duration-200 relative`}
              onClick={handlePlusClick}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-50 group-hover:bg-gray-100 rounded-lg p-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlusClick(e);
                  }}
                >
                  <PlusIcon className="h-6 w-6 text-gray-400 group-hover:text-slate-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-90 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Simple icon picker above cell */}
            {isIconPickerOpen && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-2">
                <div className="grid grid-cols-10 gap-1 w-80">
                  {AVAILABLE_ICONS.map((iconData) => {
                    const IconComponent = iconData.icon
                    return (
                      <button
                        key={iconData.name}
                        onClick={() => handleIconSelect(iconData.name)}
                        className={`p-2 rounded hover:bg-gray-100 transition-colors duration-200 ${
                          selectedIcon === iconData.name ? 'bg-slate-100' : ''
                        }`}
                        title={iconData.name}
                      >
                        <IconComponent className="h-4 w-4 text-slate-600" />
                      </button>
                    )
                  })}
                  {selectedIcon && (
                    <button
                      onClick={() => handleIconSelect('')}
                      className="p-2 rounded hover:bg-gray-100 transition-colors duration-200 text-red-500"
                      title="Remove icon"
                    >
                      <XCircleIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )
      }


      return (
        <div className="relative">
          {/* Icon picker above cell */}
          {isIconPickerOpen && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-2 mb-2">
              <div className="grid grid-cols-10 gap-1 w-80">
                {AVAILABLE_ICONS.map((iconData) => {
                  const IconComponent = iconData.icon
                  return (
                    <button
                      key={iconData.name}
                      onClick={() => handleIconSelect(iconData.name)}
                      className={`p-2 rounded hover:bg-gray-100 transition-colors duration-200 ${
                        (localSelectedIcon || selectedIcon) === iconData.name ? 'bg-slate-100' : ''
                      }`}
                      title={iconData.name}
                    >
                      <IconComponent className="h-4 w-4 text-slate-600" />
                    </button>
                  )
                })}
                {(localSelectedIcon || selectedIcon) && (
                  <button
                    onClick={() => handleIconSelect('')}
                    className="p-2 rounded hover:bg-gray-100 transition-colors duration-200 text-red-500"
                    title="Remove icon"
                  >
                    <XCircleIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              {/* Small arrow pointing up */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-200"></div>
            </div>
          )}

          <div className={`w-full min-h-20 border border-gray-200 rounded transition-all duration-200 relative ${backgroundColor || 'bg-white'}`}>
            {(localSelectedIcon || selectedIcon) && (
              <div className="absolute top-2 right-2 z-10">
                {getSelectedIconComponent()}
              </div>
            )}
            <input
              ref={inputRef}
              type="number"
              value={content}
              onChange={(e) => onChange(e.target.value)}
              onFocus={handleStartEditing}
              onBlur={handleFinishEditing}
              placeholder={placeholder}
              className={`w-full min-h-20 p-2 ${selectedIcon ? 'pr-10' : ''} text-sm text-gray-900 placeholder-gray-400 bg-transparent border-0 rounded text-center focus:outline-none focus:ring-2 focus:ring-slate-500 hover:border-slate-300 hover:shadow-sm transition-all duration-200`}
            />
          </div>

        </div>
      )

    case 'rating':
      const currentRating = parseInt(content) || 0
      return (
        <div className={`w-full min-h-20 p-2 border border-gray-200 rounded flex items-center justify-center hover:border-slate-300 hover:shadow-sm transition-all duration-200 ${backgroundColor || 'bg-white'}`}>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`h-6 w-6 cursor-pointer transition-all duration-200 ${
                  star <= currentRating
                    ? 'text-yellow-400 fill-current hover:scale-110'
                    : 'text-gray-300 hover:text-yellow-300 hover:scale-110'
                }`}
                onClick={() => handleRatingClick(star)}
              />
            ))}
          </div>
        </div>
      )

    case 'status':
      return (
        <div className="relative">
          <div
            className={`w-full min-h-20 p-2 text-sm border border-gray-200 rounded cursor-pointer hover:border-slate-400 hover:shadow-sm hover:scale-[1.02] transition-all duration-200 flex items-center justify-center ${backgroundColor || 'bg-white'}`}
            onClick={() => setIsStatusPickerOpen(!isStatusPickerOpen)}
          >
            {content ? getStatusDisplay(content) : <span className="text-gray-400">Select status</span>}
          </div>
          {isStatusPickerOpen && (
            <div className="absolute bottom-full left-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 mb-1 min-w-40">
              {STATUS_OPTIONS.map((status) => {
                const Icon = status.icon
                return (
                  <button
                    key={status.value}
                    onClick={() => handleStatusSelect(status.value)}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 hover:scale-[1.02] transition-all duration-200 text-sm flex items-center space-x-2"
                  >
                    <Icon className={`h-4 w-4 ${status.color}`} />
                    <span className="text-gray-900 font-medium">{status.label}</span>
                  </button>
                )
              })}
              <div className="border-t mx-2 pt-1">
                <button
                  onClick={() => onChange('')}
                  className="text-xs text-red-600 hover:text-red-800 px-1"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      )

    default: // 'text'
      // Show cell if we have content OR icon (local or prop) OR are editing
      if (content || localSelectedIcon || selectedIcon || isEditing) {
        return (
        <div
          ref={setNodeRef}
          style={style}
          className={`relative ${isDragging ? 'z-50' : ''} ${isDragging ? 'opacity-75' : ''}`}
        >
          {/* Icon picker above cell */}
          {isIconPickerOpen && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-2 mb-2">
              <div className="grid grid-cols-10 gap-1 w-80">
                {AVAILABLE_ICONS.map((iconData) => {
                  const IconComponent = iconData.icon
                  return (
                    <button
                      key={iconData.name}
                      onClick={() => handleIconSelect(iconData.name)}
                      className={`p-2 rounded hover:bg-gray-100 transition-colors duration-200 ${
                        (localSelectedIcon || selectedIcon) === iconData.name ? 'bg-slate-100' : ''
                      }`}
                      title={iconData.name}
                    >
                      <IconComponent className="h-4 w-4 text-slate-600" />
                    </button>
                  )
                })}
                {(localSelectedIcon || selectedIcon) && (
                  <button
                    onClick={() => handleIconSelect('')}
                    className="p-2 rounded hover:bg-gray-100 transition-colors duration-200 text-red-500"
                    title="Remove icon"
                  >
                    <XCircleIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              {/* Small arrow pointing up */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-200"></div>
            </div>
          )}

          <div
            className={`w-full h-20 border border-gray-200 rounded transition-all duration-200 ${backgroundColor || 'bg-white'} ${isDragging ? 'shadow-lg' : ''} ${isResizing ? 'shadow-lg border-slate-400' : ''} relative ${isDraggable && !isEditing && (content || selectedIcon) ? 'cursor-grab active:cursor-grabbing' : ''}`}
            {...(isDraggable && !isEditing && (content || selectedIcon) ? { ...attributes, ...listeners } : {})}
            onClick={() => {
              if (!isEditing && (localSelectedIcon || selectedIcon) && !content) {
                handleStartEditing()
              }
            }}
          >

            {(localSelectedIcon || selectedIcon) && (
              <div className="absolute top-2 right-2 z-10">
                {getSelectedIconComponent()}
              </div>
            )}
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              onFocus={handleStartEditing}
              onBlur={handleFinishEditing}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`w-full h-full p-2 ${selectedIcon ? 'pr-10' : ''} text-sm text-gray-900 placeholder-gray-400 bg-transparent border-0 rounded resize-none focus:outline-none focus:ring-2 focus:ring-slate-500 hover:border-slate-300 hover:shadow-sm transition-all duration-200`}
              rows={3}
            />
          </div>


          {/* Drag-to-resize handle - only show when not editing and has content */}
          {onColSpanChange && !isEditing && (content || selectedIcon) && (
            <div
              className={`absolute top-0 right-0 w-4 h-full cursor-col-resize z-30 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-all duration-300 flex items-center justify-center ${isResizing ? 'opacity-100 bg-slate-100' : ''}`}
              onMouseDown={handleResizeStart}
              title="Drag to resize column width"
            >
              {/* Center grip dots */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col space-y-0.5">
                <div className={`w-1 h-1 bg-slate-400 hover:bg-slate-600 rounded-full transition-all duration-300 ${isResizing ? 'bg-slate-700' : ''}`}></div>
                <div className={`w-1 h-1 bg-slate-400 hover:bg-slate-600 rounded-full transition-all duration-300 ${isResizing ? 'bg-slate-700' : ''}`}></div>
                <div className={`w-1 h-1 bg-slate-400 hover:bg-slate-600 rounded-full transition-all duration-300 ${isResizing ? 'bg-slate-700' : ''}`}></div>
              </div>
            </div>
          )}
        </div>
      )
      }

      // Show plus icon if nothing is selected and not editing
      return (
        <div
          className={`w-full min-h-20 group cursor-pointer transition-all duration-200 relative`}
          onClick={handlePlusClick}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-50 group-hover:bg-gray-100 rounded-lg p-3 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handlePlusClick();
              }}
            >
              <PlusIcon className="h-6 w-6 text-gray-400 group-hover:text-slate-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-90 pointer-events-none" />
            </div>
          </div>
        </div>
      )
  }
}