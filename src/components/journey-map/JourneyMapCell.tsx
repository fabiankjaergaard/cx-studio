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
import { ROW_COLORS } from '@/types/journey-map'

interface JourneyMapCellProps {
  id: string
  content: string
  type: 'text' | 'emoji' | 'number' | 'rating' | 'status' | 'pain-points' | 'opportunities' | 'metrics' | 'channels'
  onChange: (content: string) => void
  onIconChange?: (icon: string) => void
  onColorChange?: (color: string) => void
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

// Actions icons - matching the drag-and-drop panel from the image
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
  onColorChange,
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
  const [isResizing, setIsResizing] = useState(false)
  const [currentIcon, setCurrentIcon] = useState<string | undefined>(selectedIcon)
  const [modalContent, setModalContent] = useState<string>(content)
  const [toolbarPosition, setToolbarPosition] = useState({ left: '50%', transform: 'translateX(-50%)', top: '0px' })
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

    const startX = e.clientX
    const originalColSpan = colSpan
    let hasStartedResizing = false

    console.log('Resize start', { originalColSpan, startX })

    const handleResizeMove = (e: MouseEvent) => {
      e.preventDefault()

      const currentX = e.clientX
      const deltaX = currentX - startX

      // Only start resizing after dragging at least 20 pixels
      if (!hasStartedResizing && Math.abs(deltaX) < 20) {
        return
      }

      if (!hasStartedResizing) {
        hasStartedResizing = true
        setIsResizing(true)
        console.log('Starting resize after sufficient drag')
      }

      // Calculate new column span based on drag distance
      // Every 100 pixels = 1 column change
      const columnsToChange = Math.floor(deltaX / 100)
      const newColSpan = Math.max(1, Math.min(8, originalColSpan + columnsToChange))

      console.log('Resize move', { deltaX, columnsToChange, newColSpan, originalColSpan })

      if (newColSpan !== colSpan && onColSpanChange) {
        onColSpanChange(newColSpan)
      }
    }

    const handleResizeEnd = () => {
      console.log('Resize end', { hasStartedResizing })
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

  // Recalculate toolbar position on resize/scroll when editing
  useEffect(() => {
    if (!isEditing) return

    const handleReposition = () => {
      setToolbarPosition(calculateToolbarPosition())
    }

    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition)

    return () => {
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition)
    }
  }, [isEditing])

  const handleStartEditing = () => {
    setIsEditing(true)
  }

  // Calculate toolbar position to prevent clipping
  const calculateToolbarPosition = () => {
    if (!cellRef.current) return { left: '50%', transform: 'translateX(-50%)', top: '0px' }

    const cellRect = cellRef.current.getBoundingClientRect()
    const toolbarWidth = 320
    const toolbarHeight = 200 // Approximate toolbar height
    const viewportWidth = window.innerWidth
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // Calculate ideal center position above the cell with enough space to see the whole cell
    const cellCenterX = cellRect.left + cellRect.width / 2
    const toolbarLeft = cellCenterX - toolbarWidth / 2
    const toolbarTop = cellRect.top - 330 // Position toolbar above so you can see the entire cell

    // Check if toolbar would be clipped on the right
    if (toolbarLeft + toolbarWidth > viewportWidth - 20) {
      // Position toolbar so it's 20px from right edge but still above the cell
      const adjustedLeft = viewportWidth - toolbarWidth - 20
      return {
        left: `${adjustedLeft}px`,
        transform: 'none',
        top: `${toolbarTop}px`
      }
    }

    // Check if toolbar would be clipped on the left
    if (toolbarLeft < 20) {
      // Position toolbar 20px from left edge but still above the cell
      return {
        left: '20px',
        transform: 'none',
        top: `${toolbarTop}px`
      }
    }

    // Default centered position above the cell with enough space
    return {
      left: `${cellCenterX}px`,
      transform: 'translateX(-50%)',
      top: `${toolbarTop}px`
    }
  }

  const handlePlusClick = (e?: React.MouseEvent) => {
    setIsEditing(true)
    // Calculate position when editing starts
    setTimeout(() => {
      setToolbarPosition(calculateToolbarPosition())
      if (type === 'number' && inputRef.current) {
        inputRef.current.focus()
      } else if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }, 0)
  }

  const handleFinishEditing = () => {
    setIsEditing(false)
  }

  const handleContentChange = (newContent: string) => {
    onChange(newContent)
  }

  const handleIconSelect = (iconName: string) => {
    setCurrentIcon(iconName || undefined)
    if (onIconChange) {
      onIconChange(iconName)
    }
    setIsEditing(true)
  }

  const handleColorSelect = (colorClass: string) => {
    if (onColorChange) {
      onColorChange(colorClass)
    }
  }

  const getSelectedIconComponent = () => {
    // Prioritize currentIcon (local state) over selectedIcon (prop) to avoid sync issues
    const iconToShow = currentIcon !== undefined ? currentIcon : selectedIcon
    console.log('getSelectedIconComponent called', { currentIcon, selectedIcon, iconToShow })
    if (!iconToShow) return null
    const iconData = AVAILABLE_ICONS.find(icon => icon.name === iconToShow)
    if (!iconData) {
      console.log('Icon not found in AVAILABLE_ICONS:', iconToShow)
      return null
    }
    const IconComponent = iconData.icon
    return <IconComponent className="h-5 w-5 text-slate-600" />
  }

  // Sync currentIcon with prop when it changes
  useEffect(() => {
    if (selectedIcon !== undefined) {
      setCurrentIcon(selectedIcon)
    }
  }, [selectedIcon])

  // Sync modalContent with content when modal opens
  useEffect(() => {
    if (isIconPickerOpen) {
      setModalContent(content)
    }
  }, [isIconPickerOpen, content])

  // Close icon picker when clicking outside
  useEffect(() => {
    if (!isIconPickerOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (cellRef.current?.contains(target)) return
      const iconPickers = document.querySelectorAll('[data-icon-picker]')
      for (const picker of iconPickers) {
        if (picker.contains(target)) return
      }
      setIsIconPickerOpen(false)
    }

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isIconPickerOpen])

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

  function renderCellContent() {
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
          <div
            ref={cellRef}
            className={`w-full min-h-20 group cursor-pointer transition-all duration-200 relative border border-gray-200 rounded ${backgroundColor || 'bg-white'} hover:border-slate-300 hover:shadow-sm`}
            onClick={handlePlusClick}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer p-2"
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

      return (
        <div className="relative">

          <div className={`w-full min-h-20 border border-gray-200 rounded transition-all duration-200 relative ${backgroundColor || 'bg-white'} ${isEditing ? 'ring-2 ring-blue-500' : ''}`}>
            {(currentIcon || selectedIcon) && !isEditing && (
              <div
                className="absolute top-1 right-1 z-10 p-1 cursor-pointer hover:bg-gray-100 rounded transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setIsEditing(true)
                  setTimeout(() => setToolbarPosition(calculateToolbarPosition()), 0)
                }}
                title="Click to edit"
              >
                {getSelectedIconComponent()}
              </div>
            )}
            <input
              ref={inputRef}
              type="number"
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              onFocus={() => {
                setIsEditing(true)
                setTimeout(() => setToolbarPosition(calculateToolbarPosition()), 0)
              }}
              onBlur={(e) => {
                // Don't close if clicking on toolbar
                const relatedTarget = e.relatedTarget as HTMLElement
                if (relatedTarget?.closest('.absolute.-top-40')) {
                  return
                }
                // Don't auto-close editing mode - let user choose when to finish
                // setTimeout(() => setIsEditing(false), 100)
              }}
              placeholder={placeholder}
              className={`w-full min-h-20 p-2 ${selectedIcon && !isEditing ? 'pr-10' : ''} text-sm text-gray-900 placeholder-gray-400 bg-transparent border-0 rounded text-center focus:outline-none transition-all duration-200`}
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
      if (!content && !isEditing && !selectedIcon) {
        return (
          <div
            className={`w-full group cursor-pointer transition-all duration-200 relative ${
              backgroundColor && backgroundColor.trim() && backgroundColor !== '' && backgroundColor !== 'bg-white'
                ? backgroundColor + ' h-20 rounded border border-gray-200'
                : ''
            }`}
            style={{
              minHeight: backgroundColor && backgroundColor.trim() && backgroundColor !== '' && backgroundColor !== 'bg-white' ? '80px' : '80px'
            }}
            onClick={handlePlusClick}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer p-2"
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

      return (
        <div
          ref={(el) => {
            setNodeRef(el)
            cellRef.current = el
          }}
          style={style}
          className={`relative ${isDragging ? 'z-50' : ''} ${isDragging ? 'opacity-75' : ''}`}
        >


          <div className={`w-full h-20 border border-gray-200 rounded transition-all duration-200 ${backgroundColor || 'bg-white'} ${isDragging ? 'shadow-lg' : ''} ${isResizing ? 'shadow-lg border-slate-400' : ''} ${isEditing ? 'ring-2 ring-blue-500' : ''} relative group`}>
            {(currentIcon || selectedIcon) && !isEditing && (
              <div
                className="absolute top-1 right-1 z-10 p-1 cursor-pointer hover:bg-gray-100 rounded transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setIsEditing(true)
                  setTimeout(() => setToolbarPosition(calculateToolbarPosition()), 0)
                }}
                title="Click to edit"
              >
                {getSelectedIconComponent()}
              </div>
            )}
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              onFocus={() => {
                setIsEditing(true)
                setTimeout(() => setToolbarPosition(calculateToolbarPosition()), 0)
              }}
              onBlur={(e) => {
                // Don't close if clicking on toolbar
                const relatedTarget = e.relatedTarget as HTMLElement
                if (relatedTarget?.closest('.absolute.-top-40')) {
                  return
                }
                // Don't auto-close editing mode - let user choose when to finish
                // setTimeout(() => setIsEditing(false), 100)
              }}
              placeholder={placeholder}
              className={`w-full h-full p-2 ${selectedIcon && !isEditing ? 'pr-10' : ''} text-sm text-gray-900 placeholder-gray-400 bg-transparent border-0 rounded resize-none focus:outline-none transition-all duration-200`}
              {...(isDraggable && !isEditing ? { ...attributes, ...listeners } : {})}
            />
          </div>

          {/* Invisible drag-to-resize handle - only show when not editing and has content */}
          {onColSpanChange && (content || selectedIcon) && !isEditing && (
            <div
              className={`absolute top-0 right-0 w-4 h-full cursor-col-resize z-30 ${isResizing ? 'bg-slate-100 opacity-30' : ''}`}
              onMouseDown={handleResizeStart}
              title="Drag to resize column width"
            >
            </div>
          )}
        </div>
      )

      {/* Add the modal - this needs to be outside the switch but inside the component */}
  }
  }

  return (
    <>
      {renderCellContent()}

      {/* Toolbar portal - rendered at document.body level */}
      {isEditing && createPortal(
        <div
          className="fixed z-[9999] bg-white border border-gray-200/60 rounded-xl shadow-xl backdrop-blur-sm p-4"
          style={{
            left: toolbarPosition.left,
            transform: toolbarPosition.transform,
            top: toolbarPosition.top,
            width: '320px'
          }}
        >
          {/* Icons */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Ikoner</label>
            <div className="grid grid-cols-8 gap-1.5">
              <button
                onClick={() => handleIconSelect('')}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 transition-all shadow-sm"
                title="Ingen ikon"
              >
                <XCircleIcon className="h-4 w-4 text-gray-400" />
              </button>
              {AVAILABLE_ICONS.slice(0, 15).map((iconData) => {
                const IconComponent = iconData.icon
                return (
                  <button
                    key={iconData.name}
                    onClick={() => handleIconSelect(iconData.name)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all shadow-sm ${
                      (currentIcon || selectedIcon) === iconData.name
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400'
                    }`}
                    title={iconData.name}
                  >
                    <IconComponent className="h-4 w-4" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bakgrundsfärg</label>
            <div className="grid grid-cols-8 gap-1.5">
              <button
                onClick={() => handleColorSelect('')}
                className="w-8 h-8 rounded-lg border-2 border-dashed border-gray-300 bg-white hover:border-gray-400 transition-all shadow-sm flex items-center justify-center"
                title="Ingen färg"
              >
                <XCircleIcon className="h-4 w-4 text-gray-400" />
              </button>
              {ROW_COLORS.slice(0, 15).map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorSelect(color.class)}
                  className={`w-8 h-8 ${color.class} rounded-lg border-2 transition-all shadow-sm hover:scale-105 ${
                    backgroundColor === color.class
                      ? 'border-gray-800 ring-2 ring-gray-300'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Done button */}
          <div className="flex justify-end border-t border-gray-100 pt-3 -mx-4 px-4 -mb-4 pb-4 bg-gray-50/30 rounded-b-xl">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm"
            >
              Klar
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* ICON PICKER POPUP */}
      {isIconPickerOpen && (
        <div
          data-icon-picker
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] bg-white rounded-xl shadow-xl border border-gray-200/60 backdrop-blur-sm"
          style={{ width: '600px' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modern header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="text-lg font-semibold text-gray-900">Redigera cell</div>
          </div>

          <div className="p-6 space-y-5">
            {/* Text input first */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
              {type === 'number' ? (
                <input
                  type="number"
                  value={modalContent}
                  onChange={(e) => setModalContent(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm"
                />
              ) : (
                <textarea
                  value={modalContent}
                  onChange={(e) => setModalContent(e.target.value)}
                  placeholder={placeholder}
                  rows={3}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none bg-white shadow-sm"
                />
              )}
            </div>

            {/* Icons in modern grid */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Ikoner</label>
              <div className="grid grid-cols-14 gap-2 p-4 bg-gray-50/50 rounded-lg border border-gray-200">
                <button
                  onClick={() => handleIconSelect('')}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all shadow-sm"
                  title="Ingen ikon"
                >
                  <XCircleIcon className="h-4 w-4 text-gray-400" />
                </button>
                {AVAILABLE_ICONS.map((iconData) => {
                  const IconComponent = iconData.icon
                  return (
                    <button
                      key={iconData.name}
                      onClick={() => handleIconSelect(iconData.name)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all shadow-sm ${
                        (currentIcon || selectedIcon) === iconData.name
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400'
                      }`}
                      title={iconData.name}
                    >
                      <IconComponent className="h-4 w-4" />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Colors in modern layout */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Bakgrundsfärg</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleColorSelect('')}
                  className="w-10 h-10 rounded-lg border-2 border-dashed border-gray-300 bg-white hover:border-gray-400 transition-all shadow-sm flex items-center justify-center"
                  title="Ingen färg"
                >
                  <XCircleIcon className="h-4 w-4 text-gray-400" />
                </button>
                {ROW_COLORS.slice(0, 11).map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleColorSelect(color.class)}
                    className={`w-10 h-10 ${color.class} rounded-lg border-2 transition-all shadow-sm hover:scale-105 ${
                      backgroundColor === color.class
                        ? 'border-gray-800 ring-2 ring-gray-300'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Modern bottom actions */}
          <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100 flex justify-between rounded-b-xl">
            <button
              onClick={() => {
                setModalContent('')
                onChange('')
                handleIconSelect('')
                handleColorSelect('')
                if (onClear) {
                  onClear()
                }
                setIsIconPickerOpen(false)
                setIsEditing(false)
              }}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
            >
              Rensa
            </button>
            <button
              onClick={() => {
                onChange(modalContent)
                setIsIconPickerOpen(false)
                setIsEditing(false)
              }}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
            >
              Spara
            </button>
          </div>
        </div>
      )}
    </>
  )