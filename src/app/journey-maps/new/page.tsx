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
    description: 'Starta från en tom journey map och bygg den från grunden',
    icon: FileTextIcon,
    color: 'text-slate-600 bg-slate-100',
    borderColor: 'border-slate-200 hover:border-slate-300',
    buttonText: 'Skapa blank map'
  },
  {
    id: 'template',
    title: 'Från Template',
    description: 'Använd en färdig template som utgångspunkt för din journey map',
    icon: BookTemplateIcon,
    color: 'text-blue-600 bg-blue-100',
    borderColor: 'border-blue-200 hover:border-blue-300',
    buttonText: 'Välj template'
  },
  {
    id: 'ai',
    title: 'Med AI-assistans',
    description: 'Låt AI hjälpa dig att generera en journey map baserat på din input',
    icon: SparklesIcon,
    color: 'text-purple-600 bg-purple-100',
    borderColor: 'border-purple-200 hover:border-purple-300',
    buttonText: 'Starta med AI'
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
        router.push('/templates?type=journey-maps')
        break
      case 'ai':
        router.push('/journey-maps/ai-create')
        break
    }
  }

  const handleCreateBlankMap = () => {
    if (newMapName.trim()) {
      const newMapId = Date.now().toString()
      // Here you would typically save to your backend/state
      setIsBlankModalOpen(false)
      setNewMapName('')
      setNewMapDescription('')

      // Redirect to journey map editor with blank template
      router.push(`/journey-maps/${newMapId}`)
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header
        title="Skapa Journey Map"
        description="Välj hur du vill skapa din nya customer journey map"
        actions={
          <Link href="/journey-maps">
            <Button variant="outline">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Tillbaka
            </Button>
          </Link>
        }
      />

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Hur vill du skapa din journey map?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Välj den metod som passar bäst för ditt projekt. Du kan alltid ändra och anpassa senare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creationMethods.map((method) => (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all duration-200 border-2 ${method.borderColor} hover:shadow-md`}
                onClick={() => handleMethodSelect(method.id)}
              >
                <CardContent className="p-6 text-center">
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
                    variant="primary"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleMethodSelect(method.id)
                    }}
                  >
                    {method.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          <Card className="mt-8 bg-slate-50 border-slate-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Behöver du hjälp att välja?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <strong className="text-gray-900">Blank:</strong> Bäst när du har en klar vision och vill ha full kontroll över strukturen.
                </div>
                <div>
                  <strong className="text-gray-900">Template:</strong> Perfekt för att komma igång snabbt med beprövade strukturer.
                </div>
                <div>
                  <strong className="text-gray-900">AI:</strong> Idealiskt när du vill få förslag och inspiration baserat på dina behov.
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
        title="Skapa blank journey map"
      >
        <div className="space-y-6">
          <p className="text-gray-600">
            Ge din journey map ett namn och en beskrivning för att komma igång.
          </p>

          <Input
            label="Namn *"
            value={newMapName}
            onChange={(e) => setNewMapName(e.target.value)}
            placeholder="T.ex. Onboarding Journey"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beskrivning
            </label>
            <textarea
              value={newMapDescription}
              onChange={(e) => setNewMapDescription(e.target.value)}
              placeholder="Beskriv vad denna journey map ska användas för..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white text-gray-900 placeholder-gray-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsBlankModalOpen(false)}
            >
              Avbryt
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateBlankMap}
              disabled={!newMapName.trim()}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Skapa journey map
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}