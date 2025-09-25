'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  FileTextIcon,
  BookTemplateIcon,
  SparklesIcon,
  ArrowLeftIcon,
  PlusIcon
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const creationMethods = [
  {
    id: 'blank',
    title: 'Blank Journey Map',
    description: 'Start with an empty journey map and build it from the ground up',
    icon: FileTextIcon,
    color: 'text-slate-600 bg-slate-100',
    borderColor: 'border-gray-200 hover:border-gray-300',
    buttonText: 'Create from scratch'
  },
  {
    id: 'template',
    title: 'From Template',
    description: 'Use a ready-made template as a starting point for your journey map',
    icon: BookTemplateIcon,
    color: 'text-slate-600 bg-slate-100',
    borderColor: 'border-gray-200 hover:border-gray-300',
    buttonText: 'Choose template'
  },
  {
    id: 'ai',
    title: 'With AI Assistant',
    description: 'Let AI help you generate a journey map based on your input',
    icon: SparklesIcon,
    color: 'text-slate-600 bg-slate-100',
    borderColor: 'border-gray-200 hover:border-gray-300',
    buttonText: 'Start with AI'
  }
]

const journeyMapTemplates = [
  {
    id: 'ecommerce',
    name: 'E-handels Kundresa',
    description: 'Komplett kundresa från upptäckt till köp och efterköp för e-handel',
    stages: ['Medvetenhet', 'Överväga', 'Köp', 'Leverans', 'Support'],
    touchpoints: ['Annons', 'Webbplats', 'Kassan', 'Email', 'Kundtjänst'],
    preview: '🛒 Produktsökning → 🔍 Jämför → 💳 Köp → 📦 Leverans → ⭐ Betyg',
    color: 'bg-blue-50 border-blue-200'
  },
  {
    id: 'saas',
    name: 'SaaS Onboarding',
    description: 'Användaronboarding för SaaS-produkter från registrering till aktivering',
    stages: ['Upptäckt', 'Registrering', 'Setup', 'Första användning', 'Aktivering'],
    touchpoints: ['Landing Page', 'Sign-up', 'Email', 'App', 'Support Chat'],
    preview: '🌐 Landing → ✍️ Registrera → ⚙️ Setup → 🚀 Första användning → ✅ Aktiv',
    color: 'bg-green-50 border-green-200'
  },
  {
    id: 'service',
    name: 'Kundservice Resa',
    description: 'Kundserviceprocess från problem till lösning',
    stages: ['Problem', 'Kontakt', 'Troubleshooting', 'Lösning', 'Uppföljning'],
    touchpoints: ['Website', 'Chat', 'Telefon', 'Email', 'Enkät'],
    preview: '❗ Problem → 💬 Kontakt → 🔧 Felsök → ✅ Lösning → 📋 Uppföljning',
    color: 'bg-purple-50 border-purple-200'
  },
  {
    id: 'restaurant',
    name: 'Restaurang Upplevelse',
    description: 'Gästupplevelsen från bokning till efterbesök',
    stages: ['Bokning', 'Ankomst', 'Måltid', 'Betalning', 'Efterbesök'],
    touchpoints: ['Website', 'Telefon', 'Reception', 'Servering', 'Sociala medier'],
    preview: '📅 Boka → 🏪 Ankomst → 🍽️ Måltid → 💳 Betalning → 📱 Recension',
    color: 'bg-orange-50 border-orange-200'
  },
  {
    id: 'banking',
    name: 'Bank Låneprocess',
    description: 'Låneansökningsprocess från ansökan till utbetalning',
    stages: ['Ansökan', 'Granskning', 'Godkännande', 'Dokumentation', 'Utbetalning'],
    touchpoints: ['Online Form', 'Email', 'Telefon', 'Kontor', 'App'],
    preview: '📋 Ansök → 🔍 Granska → ✅ Godkänn → 📄 Dokument → 💰 Utbetala',
    color: 'bg-slate-50 border-slate-200'
  }
]

export default function NewJourneyMapPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isBlankModalOpen, setIsBlankModalOpen] = useState(false)
  const [newMapName, setNewMapName] = useState('')
  const [newMapDescription, setNewMapDescription] = useState('')

  const handleMethodSelect = (method: string) => {
    switch (method) {
      case 'blank':
        setIsBlankModalOpen(true)
        break
      case 'template':
        router.push('/journey-maps/templates')
        break
      case 'ai':
        router.push('/journey-maps/ai-create')
        break
    }
  }


  const handleCreateBlankMap = () => {
    console.log('handleCreateBlankMap called, newMapName:', newMapName)
    if (newMapName.trim()) {
      console.log('Name is valid, navigating...')
      // Here you would typically save to your backend/state
      const mapName = newMapName.trim()
      setIsBlankModalOpen(false)
      setNewMapName('')
      setNewMapDescription('')

      // Generate a unique ID for the new journey map
      const newMapId = Date.now().toString()
      const url = `/journey-maps/${newMapId}?blank=true&name=${encodeURIComponent(mapName)}`
      console.log('Navigating to:', url)

      // Try multiple navigation methods
      try {
        router.push(url)
      } catch (error) {
        console.log('Router.push failed, trying window.location:', error)
        window.location.href = url
      }
    } else {
      console.log('Name is empty or invalid')
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header
        title="Create Journey Map"
        description="Choose how you want to create your new customer journey map"
        actions={
          <Link href="/journey-maps">
            <Button variant="outline">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How would you like to create your journey map?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the method that best fits your project. You can always modify and customize later.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creationMethods.map((method) => (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all duration-200 border-2 ${method.borderColor} hover:shadow-md ${
                  method.id === 'ai' ? 'relative opacity-75' : ''
                }`}
                onClick={() => method.id !== 'ai' && handleMethodSelect(method.id)}
              >
                <CardContent className="p-6 text-center">
                  {method.id === 'ai' && (
                    <div className="absolute top-2 right-2 bg-slate-700 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      Coming Soon
                    </div>
                  )}

                  <div className={`w-16 h-16 mx-auto mb-4 ${method.color} rounded-2xl flex items-center justify-center`}>
                    <method.icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {method.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    {method.description}
                  </p>

                  <Button
                    variant={method.id === 'ai' ? 'outline' : 'primary'}
                    className="w-full"
                    disabled={method.id === 'ai'}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (method.id !== 'ai') {
                        handleMethodSelect(method.id)
                      }
                    }}
                  >
                    {method.id === 'ai' ? 'Coming Soon' : method.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          <Card className="mt-8 bg-slate-50 border-slate-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Need help choosing?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <strong className="text-gray-900">Blank:</strong> Best when you have a clear vision and want full control over the structure.
                </div>
                <div>
                  <strong className="text-gray-900">Template:</strong> Perfect for getting started quickly with proven structures.
                </div>
                <div>
                  <strong className="text-gray-900">AI:</strong> Ideal when you want suggestions and inspiration based on your needs.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Blank Journey Map Modal */}
      <Modal
        isOpen={isBlankModalOpen}
        onClose={() => setIsBlankModalOpen(false)}
        title="Create blank journey map"
      >
        <div className="space-y-6">
          <p className="text-gray-600">
            Give your journey map a name and description to get started.
          </p>

          <Input
            label="Name *"
            value={newMapName}
            onChange={(e) => setNewMapName(e.target.value)}
            placeholder="e.g. Onboarding Journey"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={newMapDescription}
              onChange={(e) => setNewMapDescription(e.target.value)}
              placeholder="Describe what this journey map will be used for..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white text-gray-900 placeholder-gray-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsBlankModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateBlankMap}
              disabled={!newMapName.trim()}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Create journey map
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  )
}