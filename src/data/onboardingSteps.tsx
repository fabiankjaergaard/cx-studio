'use client'

import { OnboardingStep } from '@/types/onboarding'
import { HeartIcon, MapIcon, UserIcon, RocketIcon, LayoutDashboardIcon } from 'lucide-react'

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Välkommen till CX Studio',
    description: 'Skapa professionella customer journey maps och förstå dina kunders upplevelser på ett helt nytt sätt.',
    icon: HeartIcon,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <MapIcon className="h-8 w-8 text-blue-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Journey Maps</h4>
            <p className="text-sm text-gray-600">Visualisera kundresan från första intryck till lojalitet</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <UserIcon className="h-8 w-8 text-green-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Personas</h4>
            <p className="text-sm text-gray-600">Skapa detaljerade kundprofiler för bättre förståelse</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <RocketIcon className="h-8 w-8 text-purple-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Insights</h4>
            <p className="text-sm text-gray-600">Upptäck möjligheter och förbättringsområden</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'dashboard',
    title: 'Din Dashboard',
    description: 'Här får du en snabb överblick över alla dina projekt och kan starta nya journey maps.',
    icon: LayoutDashboardIcon,
    content: (
      <div className="space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900">0</div>
              <div className="text-sm text-gray-600">Aktiva Journey Maps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900">0</div>
              <div className="text-sm text-gray-600">Touchpoints</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900">0</div>
              <div className="text-sm text-gray-600">Personas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900">6</div>
              <div className="text-sm text-gray-600">Templates</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Din dashboard uppdateras automatiskt när du skapar nya projekt
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'journey-maps',
    title: 'Journey Maps',
    description: 'En journey map visualiserar hela kundresan och hjälper dig identifiera kritiska touchpoints och förbättringsmöjligheter.',
    icon: MapIcon,
    content: (
      <div className="space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Vad är en Journey Map?</h4>
          <div className="space-y-3 text-left text-sm text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Phases:</strong> Dela upp kundresan i logiska faser som Awareness, Consideration, Purchase
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Touchpoints:</strong> Identifiera alla kontaktpunkter kunden har med ditt varumärke
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Emotions:</strong> Kartlägg kundens känslomässiga resa genom varje fas
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Opportunities:</strong> Hitta konkreta förbättringsområden och nya möjligheter
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'touchpoints',
    title: 'Touchpoints & Personas',
    description: 'Touchpoints är alla kontaktpunkter med kunden, medan personas hjälper dig förstå olika kundtyper.',
    icon: UserIcon,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Touchpoints</h4>
            <div className="space-y-2 text-left text-sm text-gray-600">
              <div>📱 Digitala: Webbsida, app, sociala medier</div>
              <div>🏪 Fysiska: Butik, event, säljmöten</div>
              <div>📞 Service: Kundtjänst, support, feedback</div>
              <div>📧 Kommunikation: Email, SMS, push-notiser</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Personas</h4>
            <div className="space-y-2 text-left text-sm text-gray-600">
              <div>👤 Demografi: Ålder, kön, inkomst</div>
              <div>🎯 Mål: Vad vill kunden uppnå?</div>
              <div>😟 Smärtpunkter: Vad frustrerar kunden?</div>
              <div>💡 Motivation: Vad driver kunden?</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'get-started',
    title: 'Redo att börja!',
    description: 'Nu känner du till grunderna. Låt oss skapa din första journey map och utforska kundens värld tillsammans.',
    icon: RocketIcon,
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Välkommen till CX Studio!
            </h4>
            <p className="text-gray-600 mb-4">
              Du är nu redo att skapa professionella customer journey maps och förbättra kundupplevelsen.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h5 className="font-medium text-gray-900 mb-3">Nästa steg:</h5>
          <div className="text-left space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>Skapa din första journey map</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
              <span>Lägg till touchpoints och personas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
              <span>Analysera känslokurvan</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
              <span>Identifiera förbättringsmöjligheter</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
]