'use client'

import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { NewJourneyModal } from '@/components/journey/NewJourneyModal'
import { useJourneyStore } from '@/store/journey-store'
import { PlusIcon, EyeIcon, DownloadIcon, BookTemplateIcon } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const templates = [
  {
    id: '1',
    name: 'E-commerce Köpresa',
    description: 'Komplett kundresa för online shopping från medvetenhet till lojalitet',
    industry: 'E-commerce',
    touchpoints: 8,
    stages: 5,
    preview: '/api/templates/1/preview'
  },
  {
    id: '2', 
    name: 'SaaS Onboarding',
    description: 'Användarresa för software-as-a-service onboarding process',
    industry: 'Teknologi',
    touchpoints: 6,
    stages: 4,
    preview: '/api/templates/2/preview'
  },
  {
    id: '3',
    name: 'Kundtjänst Journey',
    description: 'Kundresa för support och kundtjänstinteraktioner',
    industry: 'Service',
    touchpoints: 7,
    stages: 5,
    preview: '/api/templates/3/preview'
  },
  {
    id: '4',
    name: 'Restaurang Upplevelse',
    description: 'Gästresa från bokning till uppföljning för restauranger',
    industry: 'Hospitality',
    touchpoints: 9,
    stages: 6,
    preview: '/api/templates/4/preview'
  },
  {
    id: '5',
    name: 'Bank & Finans',
    description: 'Kundresa för finansiella tjänster och bankprodukter',
    industry: 'Finans',
    touchpoints: 10,
    stages: 5,
    preview: '/api/templates/5/preview'
  },
  {
    id: '6',
    name: 'Healthcare Journey',
    description: 'Patientresa från symptom till uppföljning',
    industry: 'Hälsovård',
    touchpoints: 8,
    stages: 6,
    preview: '/api/templates/6/preview'
  }
]

export default function TemplatesPage() {
  const [isNewJourneyModalOpen, setIsNewJourneyModalOpen] = useState(false)
  const { addJourney, setCurrentJourney } = useJourneyStore()
  const router = useRouter()

  const handleUseTemplate = (template: any) => {
    // Create a journey from template
    const newJourney = {
      title: `${template.name} (från mall)`,
      description: template.description,
      persona: 'Kund från mall',
      touchpoints: [], // Could add template touchpoints here
      stages: [
        { id: '1', name: 'Medvetenhet', description: 'Kunden blir medveten om behov', color: '#3B82F6' },
        { id: '2', name: 'Övervägande', description: 'Kunden utvärderar alternativ', color: '#8B5CF6' },
        { id: '3', name: 'Köp', description: 'Kunden fattar köpbeslut', color: '#10B981' },
        { id: '4', name: 'Användning', description: 'Kunden använder produkten/tjänsten', color: '#F59E0B' },
        { id: '5', name: 'Lojalitet', description: 'Kunden blir lojal och rekommenderar', color: '#EF4444' }
      ]
    }
    
    addJourney(newJourney)
    
    // Set as current and navigate
    const journeys = useJourneyStore.getState().journeys
    const createdJourney = journeys[journeys.length - 1]
    setCurrentJourney(createdJourney)
    
    router.push('/journeys')
  }
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header 
        title="Templates" 
        description="Välj från förbyggda journey map templates för din bransch"
        actions={
          <Button 
            variant="primary"
            onClick={() => setIsNewJourneyModalOpen(true)}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Skapa egen mall
          </Button>
        }
      />
      
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Filter/Search Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex space-x-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="">Alla branscher</option>
              <option value="e-commerce">E-commerce</option>
              <option value="teknologi">Teknologi</option>
              <option value="service">Service</option>
              <option value="hospitality">Hospitality</option>
              <option value="finans">Finans</option>
              <option value="hälsovård">Hälsovård</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="">Sortera efter</option>
              <option value="name">Namn</option>
              <option value="industry">Bransch</option>
              <option value="touchpoints">Antal touchpoints</option>
            </select>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {template.industry}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{template.touchpoints} touchpoints</span>
                  <span>{template.stages} faser</span>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <EyeIcon className="mr-1 h-4 w-4" />
                    Förhandsgranska
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <DownloadIcon className="mr-1 h-4 w-4" />
                    Använd mall
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Template Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skapa egen mall</h2>
          <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
            <CardContent className="p-8 text-center">
              <PlusIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Bygg din egen journey map mall
              </h3>
              <p className="text-gray-500 mb-4">
                Skapa anpassade mallar för din specifika bransch eller användningsområde
              </p>
              <Button variant="primary">
                Kom igång
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <NewJourneyModal
        isOpen={isNewJourneyModalOpen}
        onClose={() => setIsNewJourneyModalOpen(false)}
      />
    </div>
  )
}