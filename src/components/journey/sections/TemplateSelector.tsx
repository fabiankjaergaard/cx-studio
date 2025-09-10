'use client'

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { 
  ShoppingCartIcon,
  GraduationCapIcon,
  HeartHandshakeIcon,
  BanknotesIcon,
  CarIcon,
  HomeIcon,
  PlaneIcon,
  StethoscopeIcon
} from 'lucide-react'

export interface TouchpointTemplate {
  id: string
  name: string
  industry: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  touchpoints: Array<{
    title: string
    description: string
    channel: 'online' | 'offline' | 'phone' | 'email' | 'social'
    emotion: 'positive' | 'neutral' | 'negative'
    stageIndex: number
  }>
}

interface TemplateSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (template: TouchpointTemplate) => void
}

const TOUCHPOINT_TEMPLATES: TouchpointTemplate[] = [
  {
    id: 'ecommerce-basic',
    name: 'E-handel Grundresa',
    industry: 'E-handel',
    description: 'Klassisk online shoppingresa från upptäckt till leverans',
    icon: ShoppingCartIcon,
    touchpoints: [
      { title: 'Söker på Google', description: 'Kunden söker efter produkter', channel: 'online', emotion: 'neutral', stageIndex: 0 },
      { title: 'Besöker hemsida', description: 'Första intryck av webshop', channel: 'online', emotion: 'positive', stageIndex: 0 },
      { title: 'Läser produktrecensioner', description: 'Utvärderar produktkvalitet', channel: 'online', emotion: 'neutral', stageIndex: 1 },
      { title: 'Jämför priser', description: 'Kontrollerar konkurrenternas priser', channel: 'online', emotion: 'neutral', stageIndex: 1 },
      { title: 'Lägger i kundvagn', description: 'Beslutar sig för att köpa', channel: 'online', emotion: 'positive', stageIndex: 2 },
      { title: 'Checkout-process', description: 'Genomför köpet', channel: 'online', emotion: 'neutral', stageIndex: 2 },
      { title: 'Får orderbekräftelse', description: 'Email-bekräftelse skickas', channel: 'email', emotion: 'positive', stageIndex: 3 },
      { title: 'Paket levereras', description: 'Produkten kommer fram', channel: 'offline', emotion: 'positive', stageIndex: 3 },
      { title: 'Lämnar recension', description: 'Delar upplevelsen med andra', channel: 'online', emotion: 'positive', stageIndex: 4 }
    ]
  },
  {
    id: 'saas-onboarding',
    name: 'SaaS Onboarding',
    industry: 'Tech/SaaS',
    description: 'Från trial till betalande kund för SaaS-produkt',
    icon: GraduationCapIcon,
    touchpoints: [
      { title: 'Ser annons på LinkedIn', description: 'Första kontakten via social media', channel: 'social', emotion: 'neutral', stageIndex: 0 },
      { title: 'Besöker landing page', description: 'Läser om produktens fördelar', channel: 'online', emotion: 'positive', stageIndex: 0 },
      { title: 'Registrerar sig för trial', description: 'Skapar konto för gratis provperiod', channel: 'online', emotion: 'positive', stageIndex: 1 },
      { title: 'Får välkomstmail', description: 'Onboarding-email skickas', channel: 'email', emotion: 'positive', stageIndex: 2 },
      { title: 'Genomför tutorial', description: 'Lär sig använda grundfunktioner', channel: 'online', emotion: 'neutral', stageIndex: 2 },
      { title: 'Kontaktar support', description: 'Ställer frågor om funktioner', channel: 'phone', emotion: 'positive', stageIndex: 3 },
      { title: 'Uppgraderar till betald plan', description: 'Blir betalande kund', channel: 'online', emotion: 'positive', stageIndex: 4 }
    ]
  },
  {
    id: 'healthcare-appointment',
    name: 'Vårdbesök',
    industry: 'Sjukvård',
    description: 'Patientens resa från symtom till behandling',
    icon: StethoscopeIcon,
    touchpoints: [
      { title: 'Känner symtom', description: 'Blir medveten om hälsoproblem', channel: 'offline', emotion: 'negative', stageIndex: 0 },
      { title: 'Söker information online', description: 'Googlar på symtom', channel: 'online', emotion: 'neutral', stageIndex: 0 },
      { title: 'Ringer vårdcentral', description: 'Bokar tid för läkarbesök', channel: 'phone', emotion: 'neutral', stageIndex: 1 },
      { title: 'Får SMS-påminnelse', description: 'Bekräftelse av bokad tid', channel: 'phone', emotion: 'positive', stageIndex: 2 },
      { title: 'Ankomst till mottagning', description: 'Checkar in vid reception', channel: 'offline', emotion: 'neutral', stageIndex: 2 },
      { title: 'Träffar läkare', description: 'Konsultation och diagnos', channel: 'offline', emotion: 'positive', stageIndex: 3 },
      { title: 'Får recept', description: 'Behandling ordineras', channel: 'offline', emotion: 'positive', stageIndex: 3 },
      { title: 'Följer upp behandling', description: 'Återbesök eller telefonkontakt', channel: 'phone', emotion: 'positive', stageIndex: 4 }
    ]
  },
  {
    id: 'restaurant-dining',
    name: 'Restaurangbesök',
    industry: 'Restaurang/Service',
    description: 'Gästens upplevelse från bokning till hemgång',
    icon: HeartHandshakeIcon,
    touchpoints: [
      { title: 'Ser rekommendation', description: 'Vänner tipsar om restaurangen', channel: 'social', emotion: 'positive', stageIndex: 0 },
      { title: 'Kollar menyn online', description: 'Utforskar mat och priser', channel: 'online', emotion: 'neutral', stageIndex: 1 },
      { title: 'Bokar bord', description: 'Reserverar via hemsida eller telefon', channel: 'online', emotion: 'positive', stageIndex: 1 },
      { title: 'Ankomst till restaurang', description: 'Första intryck av miljön', channel: 'offline', emotion: 'positive', stageIndex: 2 },
      { title: 'Beställer mat', description: 'Interaktion med servitören', channel: 'offline', emotion: 'positive', stageIndex: 3 },
      { title: 'Äter middag', description: 'Njuter av maten och atmosfären', channel: 'offline', emotion: 'positive', stageIndex: 3 },
      { title: 'Betalar räkningen', description: 'Avslutar besöket', channel: 'offline', emotion: 'neutral', stageIndex: 3 },
      { title: 'Lämnar recension', description: 'Delar upplevelsen på Google/TripAdvisor', channel: 'online', emotion: 'positive', stageIndex: 4 }
    ]
  }
]

export function TemplateSelector({ isOpen, onClose, onSelectTemplate }: TemplateSelectorProps) {
  const handleSelectTemplate = (template: TouchpointTemplate) => {
    onSelectTemplate(template)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Välj touchpoint-mall" className="max-w-4xl">
      <div className="space-y-4">
        <p className="text-gray-600 text-center">
          Välj en bransch-mall för att få förifyllda touchpoints som du kan anpassa
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOUCHPOINT_TEMPLATES.map((template) => {
            const Icon = template.icon
            return (
              <Button
                key={template.id}
                variant="outline"
                onClick={() => handleSelectTemplate(template)}
                className="h-auto p-4 flex flex-col items-start text-left hover:bg-slate-50 border-2 hover:border-slate-500 transition-all duration-200"
              >
                <div className="flex items-center space-x-3 mb-2 w-full">
                  <Icon className="h-6 w-6 text-gray-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-xs text-gray-500">{template.industry}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {template.description}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {template.touchpoints.length} touchpoints inkluderade
                </div>
              </Button>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}