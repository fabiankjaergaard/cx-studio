'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useLanguage } from '@/contexts/LanguageContext'
import { PersonaTemplatePreviewModal } from '@/components/personas/PersonaTemplatePreviewModal'
import {
  BookTemplateIcon,
  UserIcon,
  ShoppingCartIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  HeartIcon,
  BuildingIcon,
  CarIcon,
  GamepadIcon,
  PlaneIcon,
  CoffeeIcon,
  ChevronDownIcon,
  EyeIcon,
  DownloadIcon,
  PlusIcon,
  RocketIcon,
  CreditCardIcon,
  UtensilsIcon
} from 'lucide-react'

interface PersonaTemplate {
  id: string
  name: string
  description: string
  category: string
  age: string
  occupation: string
  goals: string[]
  painPoints: string[]
  demographics: {
    income: string
    education: string
    family: string
  }
  behaviors: string[]
  motivations: string[]
  avatar: string
  icon: string
}

const personaTemplates: PersonaTemplate[] = [
  // E-commerce
  {
    id: 'ecommerce-frequent-shopper',
    name: 'Emma - Frekvent Online-shoppare',
    description: 'Trendmedveten kvinna som älskar att shoppa online och följa mode',
    category: 'E-commerce',
    age: '28',
    occupation: 'Marketing Coordinator',
    avatar: '',
    icon: 'ShoppingCartIcon',
    goals: [
      'Hitta senaste modetrenden',
      'Få bästa värde för pengarna',
      'Snabb och smidig leverans',
      'Lätt att returnera varor'
    ],
    painPoints: [
      'Osäker på storlekar vid online-shopping',
      'Långa leveranstider',
      'Komplicerade returprocesser',
      'Svårt att jämföra priser'
    ],
    demographics: {
      income: '35 000 - 45 000 kr/mån',
      education: 'Högskola',
      family: 'Singel, bor i lägenhet'
    },
    behaviors: [
      'Shoppar 2-3 gånger per vecka online',
      'Läser recensioner innan köp',
      'Följer influencers på Instagram',
      'Använder mobilappen mest'
    ],
    motivations: [
      'Vill känna sig trendig och uppdaterad',
      'Uppskattar bekvämlighet',
      'Värdesätter kvalitet',
      'Vill spara tid'
    ]
  },
  {
    id: 'ecommerce-bargain-hunter',
    name: 'Bengt - Fynd-jägaren',
    description: 'Prismedveten konsument som alltid letar efter bästa erbjudanden',
    category: 'E-commerce',
    age: '52',
    occupation: 'Projektledare',
    avatar: '',
    icon: 'ShoppingCartIcon',
    goals: [
      'Hitta bästa priserna',
      'Jämföra produkter mellan sajter',
      'Få rabatter och erbjudanden',
      'Köpa kvalitetsprodukter till lägre pris'
    ],
    painPoints: [
      'Tidskrävande att jämföra priser',
      'Missar bra erbjudanden',
      'Osäkerhet kring produktkvalitet',
      'Komplext att använda rabattkoder'
    ],
    demographics: {
      income: '45 000 - 55 000 kr/mån',
      education: 'Högskola',
      family: 'Gift, 2 barn'
    },
    behaviors: [
      'Använder prisjämförelsesajter',
      'Prenumererar på nyhetsbrev för rabatter',
      'Shoppar främst på desktop',
      'Läser detaljerade produktrecensioner'
    ],
    motivations: [
      'Vill maximera värdet för pengarna',
      'Känner sig smart när han hittar bra fynd',
      'Vill inte bli lurad',
      'Uppskattar transparens i prissättning'
    ]
  },

  // SaaS/Teknologi
  {
    id: 'saas-startup-founder',
    name: 'Alex - Startup-grundare',
    description: 'Entreprenör som bygger teknikföretag och behöver effektiva verktyg',
    category: 'SaaS',
    age: '34',
    occupation: 'CEO/Grundare',
    avatar: '',
    icon: 'RocketIcon',
    goals: [
      'Hitta kostnadseffektiva lösningar',
      'Skala verksamheten snabbt',
      'Automatisera processer',
      'Förbättra teamproduktiviteten'
    ],
    painPoints: [
      'Begränsad budget för verktyg',
      'Svårt att integrera olika system',
      'Behöver snabb implementation',
      'Osäkerhet kring säkerhet'
    ],
    demographics: {
      income: '60 000 - 80 000 kr/mån',
      education: 'Teknisk högskola',
      family: 'Sambo, inga barn än'
    },
    behaviors: [
      'Testar många gratis versioner',
      'Läser tech-bloggar och forum',
      'Nätverkar med andra grundare',
      'Använder mobila appar för att hålla koll'
    ],
    motivations: [
      'Vill bygga något meningsfullt',
      'Driven av effektivitet',
      'Värdesätter innovation',
      'Vill växa snabbt men hållbart'
    ]
  },

  // Utbildning
  {
    id: 'education-teacher',
    name: 'Sara - Lärare',
    description: 'Engagerad grundskollärare som vill förbättra elevernas lärande',
    category: 'Utbildning',
    age: '41',
    occupation: 'Grundskollärare',
    avatar: '',
    icon: 'GraduationCapIcon',
    goals: [
      'Engagera eleverna i lärandet',
      'Spara tid på administration',
      'Individualisera undervisningen',
      'Förbättra kommunikation med föräldrar'
    ],
    painPoints: [
      'Tidsbrist för planering',
      'Svårt att nå alla elever',
      'Mycket administration',
      'Begränsade resurser'
    ],
    demographics: {
      income: '38 000 - 42 000 kr/mån',
      education: 'Lärarutbildning',
      family: 'Gift, 1 barn'
    },
    behaviors: [
      'Använder digitala verktyg i undervisningen',
      'Deltar i fortbildningar',
      'Samarbetar med kollegor',
      'Söker inspiration online'
    ],
    motivations: [
      'Vill göra skillnad för eleverna',
      'Passionerad för lärande',
      'Värdesätter kreativitet',
      'Vill utvecklas professionellt'
    ]
  },

  // Hälsovård
  {
    id: 'healthcare-patient',
    name: 'Margareta - Vårdpatient',
    description: 'Äldre person som regelbundet behöver vårdsystem och tjänster',
    category: 'Hälsovård',
    age: '67',
    occupation: 'Pensionär',
    avatar: '',
    icon: 'HeartIcon',
    goals: [
      'Få tillgång till vård enkelt',
      'Förstå sin hälsoinformation',
      'Hålla kontakt med vårdgivare',
      'Förebygga hälsoproblem'
    ],
    painPoints: [
      'Komplicerade digitala system',
      'Långa väntetider',
      'Svår att förstå medicinsk information',
      'Känner sig osäker med teknik'
    ],
    demographics: {
      income: '22 000 - 28 000 kr/mån',
      education: 'Gymnasiet',
      family: 'Änka, 3 vuxna barn'
    },
    behaviors: [
      'Föredrar telefonkontakt',
      'Får hjälp av barn med teknik',
      'Läser vårdguider på papper',
      'Går till vårdcentralen personligen'
    ],
    motivations: [
      'Vill behålla sin självständighet',
      'Värdesätter personlig service',
      'Vill förstå sin hälsa',
      'Känner trygghet med rutiner'
    ]
  },

  // Finans
  {
    id: 'finance-young-professional',
    name: 'David - Ung professionell',
    description: 'Ambitiös finansanalytiker som börjar bygga sin förmögenhet',
    category: 'Finans',
    age: '26',
    occupation: 'Finansanalytiker',
    avatar: '',
    icon: 'CreditCardIcon',
    goals: [
      'Spara till första bostaden',
      'Börja investera smart',
      'Förstå sina finanser bättre',
      'Planera för framtiden'
    ],
    painPoints: [
      'Osäker på investeringsalternativ',
      'Svårt att förstå finansiella termer',
      'Känner sig överväldigad av valmöjligheter',
      'Vill inte förlora pengar'
    ],
    demographics: {
      income: '42 000 - 48 000 kr/mån',
      education: 'Ekonomi, högskola',
      family: 'Singel, bor ensam'
    },
    behaviors: [
      'Använder finansappar dagligen',
      'Läser finansnyheter',
      'Jämför olika bankers erbjudanden',
      'Söker råd från äldre kollegor'
    ],
    motivations: [
      'Vill bygga finansiell trygghet',
      'Driven av framgång',
      'Värdesätter kunskap',
      'Vill göra smarta val'
    ]
  },

  // Resa & Turism
  {
    id: 'travel-adventurer',
    name: 'Lisa - Äventyrlig resenär',
    description: 'Spontan person som älskar att utforska nya platser och kulturer',
    category: 'Resa',
    age: '29',
    occupation: 'Grafisk designer',
    avatar: '',
    icon: 'PlaneIcon',
    goals: [
      'Upptäcka nya destinationer',
      'Hitta unika upplevelser',
      'Resa budgetvänligt',
      'Dokumentera sina resor'
    ],
    painPoints: [
      'Överkomplicerade bokningssystem',
      'Dold kostnader vid bokning',
      'Svårt att hitta autentiska upplevelser',
      'Osäkerhet kring säkerhet'
    ],
    demographics: {
      income: '32 000 - 38 000 kr/mån',
      education: 'Konsthögskola',
      family: 'Singel, inga barn'
    },
    behaviors: [
      'Använder reseappar för planering',
      'Läser reserecensioner',
      'Följer reseinfluencers',
      'Bokar ofta i sista minuten'
    ],
    motivations: [
      'Vill skapa minnen',
      'Driven av nyfikenhet',
      'Värdesätter autenticitet',
      'Vill växa som person'
    ]
  },

  // Food & Beverage
  {
    id: 'food-health-conscious',
    name: 'Anna - Hälsomedveten foodie',
    description: 'Hälsofokuserad person som älskar mat och vill äta näringsrikt',
    category: 'Mat & Dryck',
    age: '33',
    occupation: 'Personlig tränare',
    avatar: '',
    icon: 'UtensilsIcon',
    goals: [
      'Hitta näringsrika måltider',
      'Stödja lokala producenter',
      'Spara tid på matplanering',
      'Inspireras av nya recept'
    ],
    painPoints: [
      'Svårt att hitta hälsosam mat ute',
      'Tidskrävande att planera måltider',
      'Dyrt med ekologiska alternativ',
      'Begränsade vegetariska alternativ'
    ],
    demographics: {
      income: '35 000 - 42 000 kr/mån',
      education: 'Idrottshögskola',
      family: 'Sambo, tränar tillsammans'
    },
    behaviors: [
      'Läser näringsinnehåll noga',
      'Handlar på lokala marknader',
      'Använder matleveransappar',
      'Delar matfoton på sociala medier'
    ],
    motivations: [
      'Vill leva hälsosamt',
      'Bryr sig om miljön',
      'Värdesätter kvalitet',
      'Vill inspirera andra'
    ]
  }
]

const categories = [
  'Alla kategorier',
  'E-commerce',
  'SaaS',
  'Utbildning',
  'Hälsovård',
  'Finans',
  'Resa',
  'Mat & Dryck'
]

// Map icon names to icon components
const getPersonaIcon = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    'ShoppingCartIcon': ShoppingCartIcon,
    'RocketIcon': RocketIcon,
    'GraduationCapIcon': GraduationCapIcon,
    'HeartIcon': HeartIcon,
    'CreditCardIcon': CreditCardIcon,
    'PlaneIcon': PlaneIcon,
    'UtensilsIcon': UtensilsIcon,
  }

  return iconMap[iconName] || UserIcon
}

export default function PersonaTemplatesPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('Alla kategorier')
  const [selectedTemplate, setSelectedTemplate] = useState<PersonaTemplate | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const filteredTemplates = selectedCategory === 'Alla kategorier'
    ? personaTemplates
    : personaTemplates.filter(template => template.category === selectedCategory)

  const handleUseTemplate = (template: PersonaTemplate) => {
    // Navigate to create persona page with template data
    const templateData = encodeURIComponent(JSON.stringify(template))
    router.push(`/personas/create?template=${templateData}`)
  }

  const handlePreview = (template: PersonaTemplate) => {
    setSelectedTemplate(template)
    setIsPreviewOpen(true)
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header
        title={t('nav.personaTemplates')}
        description="Välj från färdiga persona-mallar för snabb start"
      />

      <div className="flex-1 p-6 overflow-auto">
        {/* Filter Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex space-x-4">
            <div className="relative">
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {filteredTemplates.length} {filteredTemplates.length === 1 ? 'mall' : 'mallar'}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out hover:bg-white/80 cursor-pointer group">
              <CardContent className="p-6">
                {/* Icon and category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 group-hover:scale-110 transition-all duration-300 ease-out">
                    {React.createElement(getPersonaIcon(template.icon), {
                      className: "h-6 w-6 text-slate-600 group-hover:text-slate-700 transition-colors duration-200"
                    })}
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold leading-tight text-gray-900 mb-3">
                  {template.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {template.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{template.age} år • {template.occupation}</span>
                  <span>{template.goals.length} mål</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(template)}
                    className="flex-1 hover:scale-105 transform transition-all duration-200 ease-out"
                  >
                    <EyeIcon className="h-3 w-3 mr-1 transition-transform duration-200 group-hover:scale-110" />
                    Preview
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 hover:scale-105 transform transition-all duration-200 ease-out hover:shadow-lg"
                  >
                    <PlusIcon className="h-3 w-3 mr-1 transition-transform duration-200 group-hover:rotate-90" />
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Custom Template Card */}
          <Card className="border-2 border-dashed border-gray-300 shadow-none hover:border-slate-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group hover:bg-slate-50/30" onClick={() => router.push('/personas/create')}>
            <CardContent className="pt-6 h-full flex flex-col">
              <div className="text-center py-12 flex-1 flex flex-col justify-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-100 group-hover:scale-110 transition-all duration-300 ease-out">
                  <PlusIcon className="w-8 h-8 text-gray-400 group-hover:text-slate-600 group-hover:rotate-90 transition-all duration-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-500 mb-2 group-hover:text-slate-700 transition-colors duration-200">
                  Create Custom Persona
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-slate-600 transition-colors duration-200">
                  Start with a blank template and customize it
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Inga mallar hittades
            </h3>
            <p className="text-gray-600">
              Prova att välja en annan kategori eller återställ filtret
            </p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PersonaTemplatePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={selectedTemplate}
        onUseTemplate={handleUseTemplate}
      />
    </div>
  )
}