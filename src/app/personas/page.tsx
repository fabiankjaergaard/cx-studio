'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { PlusIcon, UserIcon, MapPinIcon, BriefcaseIcon, HeartIcon, AlertTriangleIcon, EditIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

interface Persona {
  id: string
  name: string
  age: string
  location: string
  occupation: string
  avatar: string
  goals: string[]
  painPoints: string[]
  description: string
  demographics: {
    income: string
    education: string
    family: string
  }
  behaviors: string[]
  motivations: string[]
}

const samplePersonas: Persona[] = [
  {
    id: '1',
    name: 'Anna Andersson',
    age: '32',
    location: 'Stockholm',
    occupation: 'Produktchef',
    avatar: '',
    goals: ['Effektivisera arbetsprocesser', 'Utveckla karriären', 'Balansera work-life'],
    painPoints: ['För många möten', 'Svår att hitta rätt verktyg', 'Tidsbrist'],
    description: 'Anna är en driven produktchef som arbetar på ett tech-företag. Hon värdesätter effektivitet och söker alltid sätt att förbättra processer.',
    demographics: {
      income: '45 000 - 60 000 kr/mån',
      education: 'Högskola/Universitet',
      family: 'Gift, 1 barn'
    },
    behaviors: ['Använder mobilappen dagligen', 'Läser branschblogs', 'Deltar i networking'],
    motivations: ['Karriärutveckling', 'Problemlösning', 'Innovation']
  },
  {
    id: '2',
    name: 'Erik Nilsson',
    age: '28',
    location: 'Göteborg',
    occupation: 'Freelance Designer',
    avatar: '',
    goals: ['Hitta fler kunder', 'Förbättra portfolio', 'Öka intäkterna'],
    painPoints: ['Osäker inkomst', 'Ensamt arbete', 'Administrativt krångel'],
    description: 'Erik är en kreativ freelancer som specialiserar sig på webdesign och branding. Han söker stabilitet och tillväxt i sin verksamhet.',
    demographics: {
      income: '25 000 - 40 000 kr/mån',
      education: 'Yrkeshögskola',
      family: 'Singel'
    },
    behaviors: ['Aktiv på sociala medier', 'Använder designverktyg dagligen', 'Nätverkar online'],
    motivations: ['Kreativ frihet', 'Ekonomisk trygghet', 'Erkännande']
  },
  {
    id: '3',
    name: 'Maria Johansson',
    age: '45',
    location: 'Malmö',
    occupation: 'Verksamhetschef',
    avatar: '',
    goals: ['Digitalisera processer', 'Leda teamet effektivt', 'Öka lönsamheten'],
    painPoints: ['Motstånd mot förändring', 'Budget begränsningar', 'Komplexa beslut'],
    description: 'Maria leder ett traditionellt företag genom digital transformation. Hon behöver balansera innovation med stabilitet.',
    demographics: {
      income: '60 000 - 80 000 kr/mån',
      education: 'Högskola/Universitet + MBA',
      family: 'Gift, 2 vuxna barn'
    },
    behaviors: ['Läser affärstidningar', 'Deltar i branschkonferenser', 'Använder LinkedIn aktivt'],
    motivations: ['Ledarskap', 'Företagsutveckling', 'Laganda']
  }
]

export default function PersonasPage() {
  const [personas, setPersonas] = useState<Persona[]>(samplePersonas)
  const [isNewPersonaModalOpen, setIsNewPersonaModalOpen] = useState(false)
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null)
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)

  const [newPersona, setNewPersona] = useState<Partial<Persona>>({
    name: '',
    age: '',
    location: '',
    occupation: '',
    avatar: '👤',
    goals: [''],
    painPoints: [''],
    description: '',
    demographics: {
      income: '',
      education: '',
      family: ''
    },
    behaviors: [''],
    motivations: ['']
  })

  const handleCreatePersona = () => {
    if (newPersona.name && newPersona.age && newPersona.occupation) {
      const persona: Persona = {
        id: Date.now().toString(),
        name: newPersona.name || '',
        age: newPersona.age || '',
        location: newPersona.location || '',
        occupation: newPersona.occupation || '',
        avatar: newPersona.avatar || '👤',
        goals: newPersona.goals?.filter(Boolean) || [],
        painPoints: newPersona.painPoints?.filter(Boolean) || [],
        description: newPersona.description || '',
        demographics: newPersona.demographics || { income: '', education: '', family: '' },
        behaviors: newPersona.behaviors?.filter(Boolean) || [],
        motivations: newPersona.motivations?.filter(Boolean) || []
      }
      
      setPersonas([...personas, persona])
      setIsNewPersonaModalOpen(false)
      setNewPersona({
        name: '',
        age: '',
        location: '',
        occupation: '',
        avatar: '',
        goals: [''],
        painPoints: [''],
        description: '',
        demographics: { income: '', education: '', family: '' },
        behaviors: [''],
        motivations: ['']
      })
    }
  }

  const handleDeletePersona = (id: string) => {
    setPersonas(personas.filter(p => p.id !== id))
  }

  const updateNewPersonaField = (field: string, value: any) => {
    setNewPersona(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addListItem = (field: 'goals' | 'painPoints' | 'behaviors' | 'motivations') => {
    const currentList = newPersona[field] || []
    updateNewPersonaField(field, [...currentList, ''])
  }

  const updateListItem = (field: 'goals' | 'painPoints' | 'behaviors' | 'motivations', index: number, value: string) => {
    const currentList = newPersona[field] || []
    const updatedList = [...currentList]
    updatedList[index] = value
    updateNewPersonaField(field, updatedList.filter(Boolean))
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header 
        title="Personas" 
        description="Skapa och hantera kundpersonas för dina journey maps"
        actions={
          <div className="flex space-x-2">
            <Link href="/personas/guide">
              <Button variant="outline">
                Guide till personas
              </Button>
            </Link>
            <Button 
              variant="primary"
              onClick={() => setIsNewPersonaModalOpen(true)}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Ny Persona
            </Button>
          </div>
        }
      />
      
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <Card key={persona.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {persona.avatar && <div className="text-3xl">{persona.avatar}</div>}
                    {!persona.avatar && (
                      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-medium">
                        {persona.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg">{persona.name}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className="mr-3">{persona.age} år</span>
                        <MapPinIcon className="h-3 w-3 mr-1" />
                        <span>{persona.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPersona(persona)}
                      className="p-2"
                    >
                      <EditIcon className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePersona(persona.id)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <BriefcaseIcon className="h-4 w-4 mr-2" />
                    {persona.occupation}
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">{persona.description}</p>
                  
                  <div className="space-y-3">
                    {persona.goals.length > 0 && (
                      <div>
                        <div className="flex items-center text-xs font-medium text-gray-700 mb-2">
                          <HeartIcon className="h-3 w-3 mr-1 text-slate-600" />
                          Mål ({persona.goals.length})
                        </div>
                        <div className="space-y-1">
                          {persona.goals.slice(0, 2).map((goal, index) => (
                            <div key={index} className="text-xs text-gray-600 flex items-start">
                              <span className="text-slate-500 mr-1">•</span>
                              {goal}
                            </div>
                          ))}
                          {persona.goals.length > 2 && (
                            <div className="text-xs text-gray-400">+{persona.goals.length - 2} mer</div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {persona.painPoints.length > 0 && (
                      <div>
                        <div className="flex items-center text-xs font-medium text-gray-700 mb-2">
                          <AlertTriangleIcon className="h-3 w-3 mr-1 text-slate-600" />
                          Utmaningar ({persona.painPoints.length})
                        </div>
                        <div className="space-y-1">
                          {persona.painPoints.slice(0, 2).map((pain, index) => (
                            <div key={index} className="text-xs text-gray-600 flex items-start">
                              <span className="text-slate-500 mr-1">•</span>
                              {pain}
                            </div>
                          ))}
                          {persona.painPoints.length > 2 && (
                            <div className="text-xs text-gray-400">+{persona.painPoints.length - 2} mer</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={() => setSelectedPersona(persona)}
                  >
                    Visa detaljer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Add New Persona Card */}
          <Card 
            className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
            onClick={() => setIsNewPersonaModalOpen(true)}
          >
            <CardContent className="p-8 text-center">
              <PlusIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Skapa ny persona
              </h3>
              <p className="text-gray-500">
                Definiera en ny kundpersona för dina journey maps
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* New Persona Modal */}
      <Modal 
        isOpen={isNewPersonaModalOpen} 
        onClose={() => setIsNewPersonaModalOpen(false)}
        title="Skapa ny persona"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Namn"
              value={newPersona.name || ''}
              onChange={(e) => updateNewPersonaField('name', e.target.value)}
              placeholder="Anna Andersson"
            />
            <Input
              label="Ålder"
              value={newPersona.age || ''}
              onChange={(e) => updateNewPersonaField('age', e.target.value)}
              placeholder="32"
            />
            <Input
              label="Plats"
              value={newPersona.location || ''}
              onChange={(e) => updateNewPersonaField('location', e.target.value)}
              placeholder="Stockholm"
            />
            <Input
              label="Yrke"
              value={newPersona.occupation || ''}
              onChange={(e) => updateNewPersonaField('occupation', e.target.value)}
              placeholder="Produktchef"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Beskrivning</label>
            <textarea
              value={newPersona.description || ''}
              onChange={(e) => updateNewPersonaField('description', e.target.value)}
              placeholder="Beskriv personas bakgrund, beteenden och motivationer..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mål</label>
              <div className="space-y-2">
                {(newPersona.goals || ['']).map((goal, index) => (
                  <Input
                    key={index}
                    value={goal}
                    onChange={(e) => updateListItem('goals', index, e.target.value)}
                    placeholder={`Mål ${index + 1}`}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addListItem('goals')}
                  className="w-full border-dashed"
                >
                  <PlusIcon className="h-3 w-3 mr-1" />
                  Lägg till mål
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Utmaningar</label>
              <div className="space-y-2">
                {(newPersona.painPoints || ['']).map((pain, index) => (
                  <Input
                    key={index}
                    value={pain}
                    onChange={(e) => updateListItem('painPoints', index, e.target.value)}
                    placeholder={`Utmaning ${index + 1}`}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addListItem('painPoints')}
                  className="w-full border-dashed"
                >
                  <PlusIcon className="h-3 w-3 mr-1" />
                  Lägg till utmaning
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => setIsNewPersonaModalOpen(false)}
            >
              Avbryt
            </Button>
            <Button 
              variant="primary" 
              onClick={handleCreatePersona}
              disabled={!newPersona.name || !newPersona.age || !newPersona.occupation}
            >
              Skapa persona
            </Button>
          </div>
        </div>
      </Modal>

      {/* Persona Details Modal */}
      <Modal 
        isOpen={selectedPersona !== null} 
        onClose={() => setSelectedPersona(null)}
        title={selectedPersona?.name || ''}
      >
        {selectedPersona && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              {selectedPersona.avatar && <div className="text-4xl">{selectedPersona.avatar}</div>}
              {!selectedPersona.avatar && (
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-medium text-xl">
                  {selectedPersona.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold">{selectedPersona.name}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <span className="mr-4">{selectedPersona.age} år</span>
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span className="mr-4">{selectedPersona.location}</span>
                  <BriefcaseIcon className="h-4 w-4 mr-1" />
                  <span>{selectedPersona.occupation}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Beskrivning</h4>
              <p className="text-gray-600">{selectedPersona.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <HeartIcon className="h-4 w-4 mr-2 text-slate-600" />
                  Mål & Behov
                </h4>
                <ul className="space-y-2">
                  {selectedPersona.goals.map((goal, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-slate-500 mr-2">•</span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <AlertTriangleIcon className="h-4 w-4 mr-2 text-slate-600" />
                  Utmaningar
                </h4>
                <ul className="space-y-2">
                  {selectedPersona.painPoints.map((pain, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-slate-500 mr-2">•</span>
                      {pain}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {selectedPersona.behaviors.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Beteenden</h4>
                <ul className="space-y-2">
                  {selectedPersona.behaviors.map((behavior, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-slate-500 mr-2">•</span>
                      {behavior}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => setSelectedPersona(null)}
                className="w-full"
              >
                Stäng
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}