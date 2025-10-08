import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#778DB0] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-[#2E2E2E] text-white hover:bg-[#2E2E2E]/90": variant === "default",
            "bg-[#778DB0] text-white hover:bg-[#AFC2D9]": variant === "primary",
            "bg-[#F9FAFB] text-[#2E2E2E] hover:bg-[#AFC2D9]/20": variant === "secondary",
            "border border-[#8A8A8A]/30 bg-white text-[#2E2E2E] hover:bg-[#F9FAFB]": variant === "outline",
            "text-[#2E2E2E] hover:bg-[#F9FAFB]": variant === "ghost",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }