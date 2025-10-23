'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDrop } from 'react-dnd'
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
  ChevronLeftIcon, ChevronRightIcon,
  // Checkbox icon
  Check
} from 'lucide-react'
import { EmotionCurve } from './EmotionCurve'
import { PainPointsVisualization } from './PainPointsVisualization'
import { OpportunitiesVisualization } from './OpportunitiesVisualization'
import { MetricsVisualization } from './MetricsVisualization'
import { ChannelsVisualization } from './ChannelsVisualization'
import { ROW_COLORS, Insight } from '@/types/journey-map'

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
  showEmptyState?: boolean
  isCritical?: boolean
  onCriticalChange?: (isCritical: boolean) => void
  isLocked?: boolean
  onLockedChange?: (isLocked: boolean) => void
  insightIds?: string[]
  insights?: Insight[]
  onInsightAttach?: (insightId: string) => void
  onInsightRemove?: (insightId: string) => void
  onInsightClick?: (insightId: string, rowId: string, cellId: string) => void
  rowId?: string
  disableColorConversion?: boolean
  isCommentMode?: boolean
}

// Actions icons - CX-optimized ordering with most relevant icons first
const AVAILABLE_ICONS = [
  // MOST CX-RELEVANT - Customer emotions & feedback
  { name: 'smile', icon: SmileIcon },
  { name: 'frown', icon: FrownIcon },
  { name: 'meh', icon: MehIcon },
  { name: 'angry-face', icon: AngryFaceIcon },
  { name: 'laugh-face', icon: LaughFaceIcon },
  { name: 'heart-emotion', icon: HeartIcon },
  { name: 'thumbs-up', icon: ThumbsUpIcon },
  { name: 'thumbs-down', icon: ThumbsDownIcon },

  // CX Journey & touchpoints
  { name: 'users', icon: UsersIcon },
  { name: 'user', icon: UserIcon },
  { name: 'user-check', icon: UserCheckIcon },
  { name: 'user-x', icon: UserXIcon },
  { name: 'route', icon: RouteIcon },
  { name: 'compass', icon: CompassIcon },
  { name: 'navigation', icon: NavigationIcon },
  { name: 'map-pin', icon: MapPinIcon },
  { name: 'target', icon: TargetIcon },

  // Communication & feedback channels
  { name: 'message', icon: MessageCircleIcon },
  { name: 'message-square', icon: MessageSquareIcon },
  { name: 'phone', icon: PhoneIcon },
  { name: 'mail', icon: MailIcon },
  { name: 'megaphone', icon: MegaphoneIcon },
  { name: 'bell', icon: BellIcon },

  // Analytics & insights
  { name: 'brain', icon: BrainIcon },
  { name: 'bar-chart', icon: BarChartIcon },
  { name: 'pie-chart', icon: PieChartIcon },
  { name: 'activity', icon: ActivityIcon },
  { name: 'trending-up', icon: TrendingUpIcon },
  { name: 'trending-down', icon: TrendingDownIcon },
  { name: 'eye', icon: EyeIcon },

  // Digital touchpoints
  { name: 'monitor', icon: MonitorIcon },
  { name: 'smartphone', icon: SmartphoneIcon },
  { name: 'globe', icon: GlobeIcon },
  { name: 'wifi', icon: WifiIcon },
  { name: 'video', icon: VideoIcon },
  { name: 'search', icon: SearchIcon },

  // Actions & processes
  { name: 'shopping-cart', icon: ShoppingCartIcon },
  { name: 'credit-card', icon: CreditCardIcon },
  { name: 'clipboard-list', icon: ClipboardListIcon },
  { name: 'clipboard-check', icon: ClipboardCheckIcon },
  { name: 'check-circle', icon: CheckCircleIcon },
  { name: 'x-circle', icon: XCircleIcon },

  // Status & alerts
  { name: 'alert-triangle', icon: AlertTriangleIcon },
  { name: 'alert-circle', icon: AlertCircleIcon },
  { name: 'info', icon: InfoIcon },
  { name: 'help-circle', icon: HelpCircleIcon },
  { name: 'flag', icon: FlagIcon },

  // Achievements & goals
  { name: 'star', icon: StarIcon },
  { name: 'award', icon: AwardIcon },
  { name: 'badge', icon: BadgeIcon },
  { name: 'gift', icon: GiftIcon },
  { name: 'rocket', icon: RocketIcon },
  { name: 'sparkles', icon: SparklesIcon },
  { name: 'zap', icon: ZapIcon },

  // SUPPORTING ICONS - General business & objects
  { name: 'lightbulb', icon: LightbulbIcon },
  { name: 'calendar', icon: CalendarIcon },
  { name: 'clock', icon: ClockIcon },
  { name: 'book', icon: BookIcon },
  { name: 'file', icon: FileIcon },
  { name: 'camera', icon: CameraIcon },
  { name: 'settings', icon: SettingsIcon },

  // Transport & location
  { name: 'home', icon: HomeIcon },
  { name: 'building', icon: BuildingIcon },
  { name: 'car', icon: CarIcon },
  { name: 'plane', icon: PlaneIcon },
  { name: 'train', icon: TrainIcon },
  { name: 'truck', icon: TruckIcon },

  // Tech & security
  { name: 'lock', icon: LockIcon },
  { name: 'key', icon: KeyIcon },
  { name: 'shield', icon: ShieldIcon },
  { name: 'battery', icon: BatteryIcon },
  { name: 'cloud', icon: CloudIcon },

  // Misc & lifestyle
  { name: 'mic', icon: MicIcon },
  { name: 'headphones', icon: HeadphonesIcon },
  { name: 'coffee', icon: CoffeeIcon },
  { name: 'sun', icon: SunIcon },
  { name: 'moon', icon: MoonIcon },
  { name: 'umbrella', icon: UmbrellaIcon },

  // Shapes & arrows
  { name: 'circle', icon: CircleIcon },
  { name: 'square', icon: SquareIcon },
  { name: 'arrow-up', icon: ArrowUpIcon },
  { name: 'arrow-down', icon: ArrowDownIcon },
  { name: 'flash', icon: FlashIcon },
  { name: 'minus-circle', icon: MinusCircleIcon },
  { name: 'refresh-cw', icon: RefreshCwIcon },
  { name: 'pause-circle', icon: PauseCircleIcon },
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
  position,
  showEmptyState = false,
  isCritical = false,
  onCriticalChange,
  isLocked = false,
  onLockedChange,
  insightIds = [],
  insights = [],
  onInsightAttach,
  onInsightRemove,
  onInsightClick,
  rowId,
  disableColorConversion = false,
  isCommentMode = false
}: JourneyMapCellProps) {
  const [isStatusPickerOpen, setIsStatusPickerOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [currentIcon, setCurrentIcon] = useState<string | undefined>(selectedIcon)
  const [toolbarPosition, setToolbarPosition] = useState({ left: '50%', transform: 'translateX(-50%)', top: '0px' })
  const [recentlyUsedIcons, setRecentlyUsedIcons] = useState<string[]>([])
  const [iconSearchQuery, setIconSearchQuery] = useState<string>('')
  const [colorIntensity, setColorIntensity] = useState<'subtle' | 'vibrant'>('subtle')

  // Drop handling for insights
  const [{ isOver }, drop] = useDrop({
    accept: 'INSIGHT',
    drop: (item: { insight: Insight }) => {
      if (onInsightAttach) {
        onInsightAttach(item.insight.id)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  // Load recently used icons from localStorage on mount
  useEffect(() => {
    const loadRecentIcons = () => {
      try {
        const saved = localStorage.getItem('cx-app-recent-icons')
        if (saved) {
          const parsed = JSON.parse(saved)
          setRecentlyUsedIcons(Array.isArray(parsed) ? parsed : [])
        }
      } catch (error) {
        console.warn('Failed to load recent icons:', error)
      }
    }

    loadRecentIcons()
  }, [])

  // Load and listen for color intensity changes
  useEffect(() => {
    const loadColorIntensity = () => {
      const saved = localStorage.getItem('cx-app-color-intensity')
      if (saved === 'vibrant' || saved === 'subtle') {
        setColorIntensity(saved)
      }
    }

    const handleColorIntensityChange = (event: Event) => {
      const customEvent = event as CustomEvent<'subtle' | 'vibrant'>
      setColorIntensity(customEvent.detail)
    }

    loadColorIntensity()
    window.addEventListener('color-intensity-change', handleColorIntensityChange)

    return () => {
      window.removeEventListener('color-intensity-change', handleColorIntensityChange)
    }
  }, [])
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const cellRef = useRef<HTMLDivElement>(null)
  const iconContainerRef = useRef<HTMLDivElement>(null)

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
    disabled: !isDraggable || isEditing || isLocked // Disable drag if locked
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

  // Close editing mode when comment mode is activated
  useEffect(() => {
    if (isCommentMode && isEditing) {
      setIsEditing(false)
    }
  }, [isCommentMode, isEditing])

  // Close toolbar when clicking outside and save changes
  useEffect(() => {
    if (!isEditing) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element

      // Don't close if clicking on the cell itself
      if (cellRef.current?.contains(target)) return

      // Don't close if clicking on the toolbar
      const toolbars = document.querySelectorAll('[data-toolbar]')
      for (const toolbar of toolbars) {
        if (toolbar.contains(target)) return
      }

      // Auto-save and close when clicking outside
      setIsEditing(false)
    }

    // Add event listener after a short delay to avoid immediate closure
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing])

  const handleStartEditing = () => {
    if (isCommentMode) return  // Prevent editing in comment mode
    setIsEditing(true)
  }

  // Calculate toolbar position to prevent clipping
  const calculateToolbarPosition = () => {
    if (!cellRef.current) return { left: '50%', transform: 'translateX(-50%)', top: '0px' }

    const cellRect = cellRef.current.getBoundingClientRect()
    const toolbarWidth = 500 // Much wider toolbar
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Calculate ideal center position
    const cellCenterX = cellRect.left + cellRect.width / 2
    const toolbarLeft = cellCenterX - toolbarWidth / 2

    // Position toolbar directly above the cell with minimal gap
    // Using transform: translateY(-100%) to position it right above
    const toolbarTop = cellRect.top - 5

    // Check if toolbar would be clipped on the right
    if (toolbarLeft + toolbarWidth > viewportWidth - 20) {
      // Position toolbar so it's 20px from right edge
      const adjustedLeft = viewportWidth - toolbarWidth - 20
      return {
        left: `${adjustedLeft}px`,
        transform: 'translateY(-100%)',
        top: `${toolbarTop}px`
      }
    }

    // Check if toolbar would be clipped on the left
    if (toolbarLeft < 20) {
      // Position toolbar 20px from left edge
      return {
        left: '20px',
        transform: 'translateY(-100%)',
        top: `${toolbarTop}px`
      }
    }

    // Default centered position - translate both X (center) and Y (above)
    return {
      left: `${cellCenterX}px`,
      transform: 'translateX(-50%) translateY(-100%)',
      top: `${toolbarTop}px`
    }
  }

  const handlePlusClick = (e?: React.MouseEvent) => {
    if (isCommentMode) return  // Prevent editing in comment mode
    setIsEditing(true)

    // Refresh recent icons when starting to edit
    try {
      const saved = localStorage.getItem('cx-app-recent-icons')
      if (saved) {
        const parsed = JSON.parse(saved)
        setRecentlyUsedIcons(Array.isArray(parsed) ? parsed : [])
      }
    } catch (error) {
      console.warn('Failed to refresh recent icons:', error)
    }

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
    // Update local state immediately for instant visual feedback
    setCurrentIcon(iconName || undefined)

    // Save to parent component to persist the change
    if (onIconChange) {
      onIconChange(iconName)
    }

    // Update recently used icons (only for non-empty icons)
    if (iconName && iconName.trim()) {
      setRecentlyUsedIcons(prev => {
        const updated = [iconName, ...prev.filter(icon => icon !== iconName)].slice(0, 8) // Keep max 8 recent
        // Save to localStorage
        try {
          localStorage.setItem('cx-app-recent-icons', JSON.stringify(updated))
        } catch (error) {
          console.warn('Failed to save recent icons:', error)
        }
        return updated
      })
    }

    // Force a small re-render to ensure icon appears immediately
    setTimeout(() => {
      setCurrentIcon(iconName || undefined)
    }, 0)

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
    if (!iconToShow) return null
    const iconData = AVAILABLE_ICONS.find(icon => icon.name === iconToShow)
    if (!iconData) return null
    const IconComponent = iconData.icon
    return <IconComponent className="h-5 w-5 text-slate-600" />
  }

  // Convert background color based on intensity
  const getAdjustedBackgroundColor = (bgColor: string | undefined) => {
    if (!bgColor || bgColor === 'bg-white' || bgColor === '') return 'bg-white'

    // If color conversion is disabled (for sublanes), return original color
    if (disableColorConversion) return bgColor

    // Extract base color (remove opacity if present)
    // e.g., "bg-[#778DB0]/40" -> "bg-[#778DB0]"
    const parts = bgColor.split('/')
    const baseColor = parts[0]

    // Map Kustra colors to correct intensity
    // Vibrant: Main row = full original color
    // Subtle: Main row = middle-ground hex color (between original and very light)
    const colorMap: Record<string, string> = {
      // 8 Kustra colors
      'bg-[#F9FAFB]': colorIntensity === 'vibrant' ? 'bg-[#F9FAFB]' : 'bg-[#FBFCFC]',
      'bg-[#778DB0]': colorIntensity === 'vibrant' ? 'bg-[#778DB0]' : 'bg-[#A3B2C9]',
      'bg-[#77BB92]': colorIntensity === 'vibrant' ? 'bg-[#77BB92]' : 'bg-[#A3D2B7]',
      'bg-[#F4C542]': colorIntensity === 'vibrant' ? 'bg-[#F4C542]' : 'bg-[#F7D976]',
      'bg-[#ED6B5A]': colorIntensity === 'vibrant' ? 'bg-[#ED6B5A]' : 'bg-[#F39A8E]',
      'bg-[#A67FB5]': colorIntensity === 'vibrant' ? 'bg-[#A67FB5]' : 'bg-[#BFA0CA]',
      'bg-[#E89FAB]': colorIntensity === 'vibrant' ? 'bg-[#E89FAB]' : 'bg-[#EFBCC4]',
      'bg-[#8A8A8A]': colorIntensity === 'vibrant' ? 'bg-[#8A8A8A]' : 'bg-[#B1B1B1]',
      // Legacy color support (for backward compatibility)
      'bg-slate-50': colorIntensity === 'vibrant' ? 'bg-[#F9FAFB]' : 'bg-[#FBFCFC]',
      'bg-blue-200': colorIntensity === 'vibrant' ? 'bg-[#778DB0]' : 'bg-[#A3B2C9]',
      'bg-rose-200': colorIntensity === 'vibrant' ? 'bg-[#ED6B5A]' : 'bg-[#F39A8E]',
      'bg-emerald-200': colorIntensity === 'vibrant' ? 'bg-[#77BB92]' : 'bg-[#A3D2B7]',
    }

    // Use base color to look up in map, ignoring any existing opacity
    return colorMap[baseColor] || bgColor
  }

  // Extract hex color from Tailwind class for inline styles
  const getHexColorFromBg = (bgColor: string | undefined): string => {
    if (!bgColor || bgColor === 'bg-white' || bgColor === '') return '#e5e7eb' // gray-200 fallback

    // Extract hex from bg-[#HEXCODE] format
    const match = bgColor.match(/bg-\[#([0-9A-Fa-f]{6})\]/)
    if (match) {
      return `#${match[1]}`
    }

    // Fallback to gray if no hex found
    return '#e5e7eb'
  }

  const getFilteredIcons = () => {
    if (!iconSearchQuery.trim()) return AVAILABLE_ICONS

    const query = iconSearchQuery.toLowerCase().trim()
    return AVAILABLE_ICONS.filter(icon =>
      icon.name.toLowerCase().includes(query)
    )
  }

  // Sync currentIcon with prop when it changes
  useEffect(() => {
    if (selectedIcon !== undefined) {
      setCurrentIcon(selectedIcon)
    }
  }, [selectedIcon])

  // Auto-scroll to first matching icon when search query changes
  useEffect(() => {
    if (iconSearchQuery.trim()) {
      const filteredIcons = getFilteredIcons()
      if (filteredIcons.length > 0) {
        const firstIconName = filteredIcons[0].name

        // Scroll in toolbar
        const toolbarIcon = document.querySelector(`[title="${firstIconName}"]`)
        if (toolbarIcon && iconContainerRef.current) {
          toolbarIcon.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
        }
      }
    }
  }, [iconSearchQuery])

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
        <span className="text-[#2E2E2E]">{status.label}</span>
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
        // Determine if we should show background color
        const hasBackgroundColor = backgroundColor && backgroundColor.trim() && backgroundColor !== '' && backgroundColor !== 'bg-white'

        return (
          <div
            ref={cellRef}
            className={`w-full h-20 group/cell cursor-pointer transition-all duration-200 relative flex items-center justify-center ${
              hasBackgroundColor ? `${backgroundColor} border border-gray-200 rounded-xl` : ''
            }`}
            onClick={handlePlusClick}
          >
            <div className="w-10 h-10 flex items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-opacity duration-200 border-2 border-dashed border-gray-200 hover:border-gray-400 rounded-lg">
              <PlusIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        )
      }

      return (
        <div ref={(el) => { cellRef.current = el; drop(el); }} className="relative">

          <div className={`w-full min-h-20 border rounded-xl transition-all duration-300 relative ${getAdjustedBackgroundColor(backgroundColor)} ${isEditing ? 'ring-2 ring-[#778DB0] ring-offset-1' : ''} ${isOver ? 'ring-2 ring-purple-500 ring-offset-1' : ''} ${isCritical ? 'border-2 border-orange-500 shadow-[0_0_0_3px_rgba(249,115,22,0.15)] ring-1 ring-orange-400/20' : 'border border-gray-200'}`}>
            {/* Lock indicator - centered at top, overlapping the cell border */}
            {isLocked && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 z-20 p-1 bg-white rounded-full shadow-sm ring-2 ring-slate-300" title="Position locked">
                <LockIcon className="w-2.5 h-2.5 text-slate-500" />
              </div>
            )}
            {/* Insight badges - positioned at bottom */}
            {insightIds.length > 0 && (
              <div className="absolute bottom-1 left-1 right-1 z-10 flex gap-1">
                {insightIds.slice(0, 3).map((insightId) => {
                  const insight = insights.find(i => i.id === insightId)
                  if (!insight) return null

                  // Subtle color scheme based on severity
                  const severityStyle = insight.severity >= 4
                    ? 'bg-[#C45A49]/10 text-[#C45A49] border border-[#C45A49]/20 hover:bg-[#C45A49]/20'
                    : insight.severity === 3
                    ? 'bg-[#ED6B5A]/10 text-[#ED6B5A] border border-[#ED6B5A]/20 hover:bg-[#ED6B5A]/20'
                    : 'bg-[#778DB0]/10 text-[#778DB0] border border-[#778DB0]/20 hover:bg-[#778DB0]/20'

                  return (
                    <div
                      key={insightId}
                      className={`flex items-center gap-1 px-1.5 py-0.5 ${severityStyle} rounded text-[10px] font-medium cursor-pointer transition-colors`}
                      title={insight.title}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (onInsightClick && rowId) {
                          onInsightClick(insightId, rowId, id)
                        }
                      }}
                    >
                      <LightbulbIcon className="w-2.5 h-2.5" />
                      <span className="text-[9px]">{insight.severity}</span>
                    </div>
                  )
                })}
                {insightIds.length > 3 && (
                  <div className="px-1.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded text-[10px] font-medium">
                    +{insightIds.length - 3}
                  </div>
                )}
              </div>
            )}
            {(currentIcon || selectedIcon) && (
              <div
                className="absolute -top-2 -right-2 z-10 p-1.5 cursor-pointer bg-white rounded-full shadow-sm border-2 transition-all"
                style={{
                  borderColor: getHexColorFromBg(getAdjustedBackgroundColor(backgroundColor))
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  if (isCommentMode) return  // Prevent editing in comment mode
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
                if (isCommentMode) return  // Prevent editing in comment mode
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
              readOnly={isCommentMode}
              tabIndex={isCommentMode ? -1 : 0}
              className={`w-full min-h-20 p-2 ${selectedIcon && !isEditing ? 'pr-10' : ''} text-sm text-[#2E2E2E] placeholder-[#8A8A8A] bg-transparent border-0 rounded text-center focus:outline-none transition-all duration-200 ${isCommentMode ? 'pointer-events-none' : ''}`}
            />
          </div>
        </div>
      )

    case 'rating':
      const currentRating = parseInt(content) || 0
      return (
        <div className={`w-full min-h-20 p-2 border border-gray-200 rounded flex items-center justify-center hover:border-slate-300 hover:shadow-sm transition-all duration-200 ${getAdjustedBackgroundColor(backgroundColor)}`}>
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
            className={`w-full min-h-20 p-2 text-sm border border-gray-200 rounded cursor-pointer hover:border-slate-400 hover:shadow-sm hover:scale-[1.02] transition-all duration-200 flex items-center justify-center ${getAdjustedBackgroundColor(backgroundColor)}`}
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
                    <span className="text-[#2E2E2E] font-medium">{status.label}</span>
                  </button>
                )
              })}
              <div className="border-t mx-2 pt-1">
                <button
                  onClick={() => onChange('')}
                  className="text-xs text-[#C45A49] hover:text-[#B04A3A] px-1"
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
        // Determine if we should show background color
        const hasBackgroundColor = backgroundColor && backgroundColor.trim() && backgroundColor !== '' && backgroundColor !== 'bg-white'

        return (
          <div
            ref={cellRef}
            className={`w-full h-20 group/cell cursor-pointer transition-all duration-200 relative flex items-center justify-center ${
              hasBackgroundColor ? `${backgroundColor} border border-gray-200 rounded-xl` : ''
            }`}
            onClick={handlePlusClick}
          >
            <div className="w-10 h-10 flex items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-opacity duration-200 border-2 border-dashed border-gray-200 hover:border-gray-400 rounded-lg">
              <PlusIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        )
      }

      return (
        <div
          ref={(el) => {
            setNodeRef(el)
            cellRef.current = el
            drop(el)
          }}
          style={style}
          className={`relative ${isDragging ? 'z-50' : ''} ${isDragging ? 'opacity-75' : ''}`}
        >

          <div className={`w-full h-20 border rounded-xl transition-all duration-300 ${getAdjustedBackgroundColor(backgroundColor)} ${isDragging ? 'shadow-lg' : ''} ${isResizing ? 'shadow-lg border-slate-400' : ''} ${isEditing ? 'ring-2 ring-[#778DB0] ring-offset-1' : ''} ${isOver ? 'ring-2 ring-purple-500 ring-offset-1' : ''} ${isCritical ? 'border-2 border-orange-500 shadow-[0_0_0_3px_rgba(249,115,22,0.15)] ring-1 ring-orange-400/20' : 'border border-gray-200'} relative group`}>
            {/* Lock indicator - centered at top, overlapping the cell border */}
            {isLocked && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 z-20 p-1 bg-white rounded-full shadow-sm ring-2 ring-slate-300" title="Position locked">
                <LockIcon className="w-2.5 h-2.5 text-slate-500" />
              </div>
            )}
            {/* Insight badges - positioned at bottom */}
            {insightIds.length > 0 && (
              <div className="absolute bottom-1 left-1 right-1 z-10 flex gap-1">
                {insightIds.slice(0, 3).map((insightId) => {
                  const insight = insights.find(i => i.id === insightId)
                  if (!insight) return null

                  // Subtle color scheme based on severity
                  const severityStyle = insight.severity >= 4
                    ? 'bg-[#C45A49]/10 text-[#C45A49] border border-[#C45A49]/20 hover:bg-[#C45A49]/20'
                    : insight.severity === 3
                    ? 'bg-[#ED6B5A]/10 text-[#ED6B5A] border border-[#ED6B5A]/20 hover:bg-[#ED6B5A]/20'
                    : 'bg-[#778DB0]/10 text-[#778DB0] border border-[#778DB0]/20 hover:bg-[#778DB0]/20'

                  return (
                    <div
                      key={insightId}
                      className={`flex items-center gap-1 px-1.5 py-0.5 ${severityStyle} rounded text-[10px] font-medium cursor-pointer transition-colors`}
                      title={insight.title}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (onInsightClick && rowId) {
                          onInsightClick(insightId, rowId, id)
                        }
                      }}
                    >
                      <LightbulbIcon className="w-2.5 h-2.5" />
                      <span className="text-[9px]">{insight.severity}</span>
                    </div>
                  )
                })}
                {insightIds.length > 3 && (
                  <div className="px-1.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded text-[10px] font-medium">
                    +{insightIds.length - 3}
                  </div>
                )}
              </div>
            )}
            {(currentIcon || selectedIcon) && (
              <div
                className="absolute -top-2 -right-2 z-10 p-1.5 cursor-pointer bg-white rounded-full shadow-sm border-2 transition-all"
                style={{
                  borderColor: getHexColorFromBg(getAdjustedBackgroundColor(backgroundColor))
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  if (isCommentMode) return  // Prevent editing in comment mode
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
                if (isCommentMode) return  // Prevent editing in comment mode
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
              readOnly={isCommentMode}
              tabIndex={isCommentMode ? -1 : 0}
              className={`w-full h-full p-2 ${selectedIcon && !isEditing ? 'pr-10' : ''} text-sm text-[#2E2E2E] placeholder-[#8A8A8A] bg-transparent border-0 rounded resize-none focus:outline-none transition-all duration-200 ${isCommentMode ? 'pointer-events-none' : ''}`}
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

  // Show empty state with plus button if showEmptyState is true
  if (showEmptyState && !isEditing) {
    return (
      <div className="w-full h-full min-h-[80px] flex items-center justify-center group">
        <button
          onClick={() => {
            if (isCommentMode) return  // Prevent editing in comment mode
            setIsEditing(true)
            // Focus the input after a short delay to ensure it's rendered
            setTimeout(() => {
              if (type === 'text' && textareaRef.current) {
                textareaRef.current.focus()
              } else if (inputRef.current) {
                inputRef.current.focus()
              }
            }, 10)
          }}
          className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-2 border-dashed border-gray-200 hover:border-gray-400 rounded-lg"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
    )
  }

  return (
    <>
      {renderCellContent()}

      {/* Toolbar portal - rendered at document.body level */}
      {isEditing && createPortal(
        <div
          data-toolbar
          className="fixed z-[9999] bg-white border border-gray-200/60 rounded-xl shadow-xl backdrop-blur-sm p-3"
          style={{
            left: toolbarPosition.left,
            transform: toolbarPosition.transform,
            top: toolbarPosition.top,
            width: '500px'
          }}
        >
          {/* Icons */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-[#2E2E2E]">Icons</label>
              <input
                type="text"
                value={iconSearchQuery}
                onChange={(e) => setIconSearchQuery(e.target.value)}
                placeholder="Search icons..."
                className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all w-32 bg-white shadow-sm"
              />
            </div>

            {/* Recently Used Section */}
            {recentlyUsedIcons.length > 0 && (
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-600 mb-1">Recently used</div>
                <div className="flex gap-1.5 flex-wrap">
                  {recentlyUsedIcons.map((iconName) => {
                    const iconData = AVAILABLE_ICONS.find(icon => icon.name === iconName)
                    if (!iconData) return null
                    const IconComponent = iconData.icon
                    return (
                      <button
                        key={`recent-${iconName}`}
                        onClick={() => handleIconSelect(iconName)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all shadow-sm ${
                          (currentIcon || selectedIcon) === iconName
                            ? 'bg-[#778DB0] border-[#778DB0] text-white'
                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400'
                        }`}
                        title={iconName}
                      >
                        <IconComponent className="h-4 w-4" />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* All Icons Section */}
            <div className="text-xs font-medium text-gray-600 mb-1">
              {iconSearchQuery ? `Results for "${iconSearchQuery}"` : 'All icons'}
            </div>
            <div className="overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'thin' }}>
              <div ref={iconContainerRef} className="grid grid-rows-1 grid-flow-col gap-1.5 w-max">
                {!iconSearchQuery && (
                  <button
                    onClick={() => handleIconSelect('')}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-100 hover:border-gray-400 transition-all shadow-sm"
                    title="No icon"
                  >
                    <XCircleIcon className="h-4 w-4 text-gray-400" />
                  </button>
                )}
                {getFilteredIcons().map((iconData) => {
                  const IconComponent = iconData.icon
                  return (
                    <button
                      key={iconData.name}
                      onClick={() => handleIconSelect(iconData.name)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all shadow-sm ${
                        (currentIcon || selectedIcon) === iconData.name
                          ? 'bg-[#778DB0] border-[#778DB0] text-white'
                          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400'
                      }`}
                      title={iconData.name}
                    >
                      <IconComponent className="h-4 w-4" />
                    </button>
                  )
                })}
                {getFilteredIcons().length === 0 && iconSearchQuery && (
                  <div className="text-xs text-gray-500 px-2 py-1 italic">
                    No icons found for "{iconSearchQuery}"
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-[#2E2E2E] mb-2">Background color</label>
            <div className="grid grid-cols-12 gap-1.5">
              <button
                onClick={() => handleColorSelect('')}
                className="w-8 h-8 rounded-lg border-2 border-dashed border-gray-300 bg-white hover:border-gray-400 transition-all shadow-sm flex items-center justify-center"
                title="No color"
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

          {/* High Importance Toggle */}
          <div className="mb-2">
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all border border-transparent hover:border-gray-200">
              <div
                onClick={(e) => {
                  e.preventDefault()
                  if (onCriticalChange) {
                    onCriticalChange(!isCritical)
                  }
                }}
                className={`
                  w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all
                  ${isCritical
                    ? 'bg-slate-500 border-slate-500'
                    : 'bg-white border-gray-300 hover:border-slate-400'
                  }
                `}
              >
                {isCritical && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <span className="text-sm font-medium text-[#2E2E2E]">Mark as high importance</span>
            </label>
          </div>

          {/* Lock Position Toggle */}
          <div className="mb-2">
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all border border-transparent hover:border-gray-200">
              <div
                onClick={(e) => {
                  e.preventDefault()
                  if (onLockedChange) {
                    onLockedChange(!isLocked)
                  }
                }}
                className={`
                  w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all
                  ${isLocked
                    ? 'bg-slate-500 border-slate-500'
                    : 'bg-white border-gray-300 hover:border-slate-400'
                  }
                `}
              >
                {isLocked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <span className="text-sm font-medium text-[#2E2E2E]">Lock position</span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center border-t border-gray-100 pt-2 -mx-3 px-3 -mb-3 pb-3 bg-gray-50/30 rounded-b-xl">
            <button
              onClick={() => {
                // Clear text content
                onChange('')
                // Clear icon
                setCurrentIcon(undefined)
                if (onIconChange) {
                  onIconChange('')
                }
                // Clear background color
                if (onColorChange) {
                  onColorChange('')
                }
                // Clear via parent callback if provided
                if (onClear) {
                  onClear()
                }
                setIsEditing(false)
              }}
              className="px-4 py-2 text-sm font-medium text-[#C45A49] hover:text-[#B04A3A] hover:bg-[#C45A49]/10 border border-[#C45A49]/30 hover:border-[#C45A49]/50 rounded-lg transition-all shadow-sm"
            >
              Delete
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-white bg-slate-500 hover:bg-slate-600 rounded-lg transition-all shadow-sm"
            >
              Save
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )