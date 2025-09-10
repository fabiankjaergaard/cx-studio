'use client'

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { 
  PlusIcon,
  BookTemplateIcon,
  FileIcon,
  LayersIcon
} from 'lucide-react'

interface TouchpointTypeSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelectType: (type: 'blank' | 'template') => void
  onShowTemplateSelector?: () => void
}

export function TouchpointTypeSelector({ isOpen, onClose, onSelectType, onShowTemplateSelector }: TouchpointTypeSelectorProps) {
  const handleSelectType = (type: 'blank' | 'template') => {
    if (type === 'template' && onShowTemplateSelector) {
      onClose()
      onShowTemplateSelector()
    } else {
      onSelectType(type)
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Skapa Touchpoints sektion">
      <div className="space-y-4">
        <p className="text-gray-600 text-center">
          Hur vill du skapa din touchpoints sektion?
        </p>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Blank Option */}
          <Button
            variant="outline"
            onClick={() => handleSelectType('blank')}
            className="h-auto p-6 flex flex-col items-center text-center hover:bg-slate-50 border-2 hover:border-slate-500 transition-all duration-200"
          >
            <PlusIcon className="h-8 w-8 text-gray-600 mb-3" />
            <div className="space-y-1">
              <div className="font-medium text-gray-900">Börja från blank</div>
              <div className="text-sm text-gray-500">Skapa dina egna touchpoints från början</div>
            </div>
          </Button>

          {/* Template Option */}
          <Button
            variant="outline"
            onClick={() => handleSelectType('template')}
            className="h-auto p-6 flex flex-col items-center text-center hover:bg-slate-50 border-2 hover:border-slate-500 transition-all duration-200"
          >
            <LayersIcon className="h-8 w-8 text-gray-600 mb-3" />
            <div className="space-y-1">
              <div className="font-medium text-gray-900">Använd template</div>
              <div className="text-sm text-gray-500">Börja med förifyllda exempel-touchpoints</div>
            </div>
          </Button>
        </div>
      </div>
    </Modal>
  )
}