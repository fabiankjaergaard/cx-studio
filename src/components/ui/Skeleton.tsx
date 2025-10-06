import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  ...props
}: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  }

  return (
    <div
      className={cn(
        "bg-gray-200",
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      {...props}
    />
  )
}

// Pre-built skeleton components for common use cases
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-3/4" />
            <Skeleton variant="text" className="w-1/2" />
          </div>
        </div>
        <Skeleton variant="rectangular" className="w-full h-32" />
        <div className="space-y-2">
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-5/6" />
          <Skeleton variant="text" className="w-4/6" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonJourneyCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-card h-96">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <Skeleton variant="text" className="w-1/2" />
            <Skeleton variant="text" className="w-16 h-6" />
          </div>
          <Skeleton variant="text" className="w-3/4" />
        </div>
        <Skeleton variant="rectangular" width={32} height={32} />
      </div>
      <div className="space-y-3 mb-4">
        <Skeleton variant="rectangular" className="w-full h-20" />
        <Skeleton variant="rectangular" className="w-full h-20" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <Skeleton variant="text" className="w-24" />
        <div className="flex items-center space-x-2">
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="circular" width={28} height={28} />
        </div>
      </div>
    </div>
  )
}

export function SkeletonTemplateCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-card">
      <div className="p-6 pb-3">
        <div className="flex items-center justify-between mb-3">
          <Skeleton variant="rectangular" width={48} height={48} className="rounded-xl" />
          <Skeleton variant="text" className="w-20 h-6" />
        </div>
        <div className="space-y-2">
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-full" />
          <Skeleton variant="text" className="w-5/6" />
        </div>
      </div>
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton variant="rectangular" width={16} height={16} />
            <Skeleton variant="text" className="w-24" />
          </div>
          <Skeleton variant="rectangular" width={80} height={32} className="rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonDashboardWidget() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-card h-80">
      <div className="flex items-center mb-4">
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="text" className="w-32 ml-2" />
      </div>
      <div className="space-y-3 flex-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start space-x-3">
            <Skeleton variant="circular" width={8} height={8} className="mt-2" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" className="w-full" />
              <Skeleton variant="text" className="w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
