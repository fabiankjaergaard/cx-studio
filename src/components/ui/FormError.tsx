import * as React from "react"
import { AlertCircleIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FormErrorProps {
  message?: string
  className?: string
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null

  return (
    <div className={cn("flex items-start gap-2 text-red-600 text-sm mt-1", className)}>
      <AlertCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <p>{message}</p>
    </div>
  )
}

export interface FormSuccessProps {
  message?: string
  className?: string
}

export function FormSuccess({ message, className }: FormSuccessProps) {
  if (!message) return null

  return (
    <div className={cn("flex items-start gap-2 text-success-600 text-sm mt-1", className)}>
      <AlertCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <p>{message}</p>
    </div>
  )
}
