import * as React from "react"
import { Modal } from "./Modal"
import { Button } from "./Button"
import { AlertTriangleIcon, Trash2Icon, InfoIcon } from "lucide-react"

export interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  isLoading?: boolean
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}: ConfirmDialogProps) {
  const variantConfig = {
    danger: {
      icon: Trash2Icon,
      iconBg: 'bg-[#C45A49]/10',
      iconColor: 'text-[#C45A49]',
      buttonClass: 'bg-[#C45A49] hover:bg-[#C45A49]/90 text-white',
    },
    warning: {
      icon: AlertTriangleIcon,
      iconBg: 'bg-[#ED6B5A]/10',
      iconColor: 'text-[#ED6B5A]',
      buttonClass: 'bg-[#ED6B5A] hover:bg-[#ED6B5A]/90 text-white',
    },
    info: {
      icon: InfoIcon,
      iconBg: 'bg-[#778DB0]/10',
      iconColor: 'text-[#778DB0]',
      buttonClass: 'bg-[#778DB0] hover:bg-[#AFC2D9] text-white',
    },
  }

  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="md">
      <div className="text-center p-2">
        <div className={`mx-auto flex items-center justify-center w-12 h-12 rounded-full mb-4 ${config.iconBg}`}>
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{description}</p>
        <div className="flex justify-center space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="px-6"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-6 ${config.buttonClass}`}
          >
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
