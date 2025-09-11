'use client'

import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { JourneyBuilder } from '@/components/journey/JourneyBuilder'
import { ProgressIndicator } from '@/components/journey/ProgressIndicator'
import { useJourneyStore } from '@/store/journey-store'
import { PlusIcon, SaveIcon, ShareIcon, DownloadIcon } from 'lucide-react'

export default function JourneysPage() {
  const { 
    currentJourney, 
    journeys,
    selectedTouchpointId, 
    setSelectedTouchpoint 
  } = useJourneyStore()


  if (!currentJourney) {
    return (
      <div className="h-full flex flex-col">
        <Header 
          title="Journey Maps" 
          description="Skapa och hantera customer journey maps"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Ingen journey map vald</p>
            <Button variant="primary">
              <PlusIcon className="mr-2 h-4 w-4" />
              Skapa ny Journey Map
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Header 
        title={currentJourney.title}
        description={`Persona: ${currentJourney.persona} • ${currentJourney.touchpoints.length} touchpoints`}
        actions={
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ShareIcon className="mr-2 h-4 w-4" />
              Dela
            </Button>
            <Button variant="outline" size="sm">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Exportera
            </Button>
            <Button variant="primary" size="sm">
              <SaveIcon className="mr-2 h-4 w-4" />
              Spara
            </Button>
          </div>
        }
      />
      
      <ProgressIndicator journey={currentJourney} />
      
      <div className="flex-1 overflow-auto bg-gray-50">
        <JourneyBuilder
          journey={currentJourney}
        />
      </div>
    </div>
  )
}