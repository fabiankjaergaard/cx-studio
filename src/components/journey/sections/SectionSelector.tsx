'use client'

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { 
  MapIcon, 
  UserIcon, 
  SmileIcon, 
  AlertTriangleIcon, 
  LightbulbIcon,
  BarChartIcon
} from 'lucide-react'

export interface SectionType {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

interface SectionSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelectSection: (sectionType: string) => void
  onSelectTouchpointType?: (type: 'blank' | 'template') => void
}

const SECTION_TYPES: SectionType[] = [
  {
    id: 'touchpoints',
    name: 'Touchpoints',
    description: 'Kartlägg kundkontaktytor genom resan',
    icon: MapIcon
  },
  {
    id: 'persona',
    name: 'Persona',
    description: 'Definiera målgruppens profil och egenskaper',
    icon: UserIcon
  },
  {
    id: 'emotions',
    name: 'Känsloresan',
    description: 'Spåra kundens känslor genom varje steg',
    icon: SmileIcon
  },
  {
    id: 'painpoints',
    name: 'Pain Points',
    description: 'Identifiera problem och frustrationer',
    icon: AlertTriangleIcon
  },
  {
    id: 'opportunities',
    name: 'Möjligheter',
    description: 'Hitta förbättringsområden och chanser',
    icon: LightbulbIcon
  },
  {
    id: 'metrics',
    name: 'Mätpunkter',
    description: 'KPI:er och mätvärden för varje steg',
    icon: BarChartIcon
  }
]

export function SectionSelector({ isOpen, onClose, onSelectSection }: SectionSelectorProps) {
  const handleSelectSection = (sectionType: string) => {
    onSelectSection(sectionType)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Välj sektionstyp">
      <div className="grid grid-cols-2 gap-4">
        {SECTION_TYPES.map((section) => {
          const Icon = section.icon
          return (
            <Button
              key={section.id}
              variant="outline"
              onClick={() => handleSelectSection(section.id)}
              className="h-auto p-6 flex flex-col items-center text-center hover:bg-slate-50 border-2 hover:border-slate-500 transition-all duration-200"
            >
              <Icon className="h-8 w-8 text-gray-600 mb-3" />
              <div className="space-y-1">
                <div className="font-medium text-gray-900">{section.name}</div>
                <div className="text-sm text-gray-500">{section.description}</div>
              </div>
            </Button>
          )
        })}
      </div>
    </Modal>
  )
}