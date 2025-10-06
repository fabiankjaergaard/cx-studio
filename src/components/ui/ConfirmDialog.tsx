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
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      buttonClass: 'bg-red-600 hover:bg-red-700 text-white',
    },
    warning: {
      icon: AlertTriangleIcon,
      iconBg: 'bg-warning-100',
      iconColor: 'text-warning-600',
      buttonClass: 'bg-warning-600 hover:bg-warning-700 text-white',
    },
    info: {
      icon: InfoIcon,
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600',
      buttonClass: 'bg-slate-600 hover:bg-slate-700 text-white',
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
