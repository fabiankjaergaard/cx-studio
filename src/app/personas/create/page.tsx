'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useLanguage } from '@/contexts/LanguageContext'
import { PlusIcon, UserIcon, SaveIcon, ArrowLeftIcon } from 'lucide-react'
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

function CreatePersonaContent() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [persona, setPersona] = useState<Partial<Persona>>({
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

  // Load template data if available
  useEffect(() => {
    const templateParam = searchParams.get('template')
    if (templateParam) {
      try {
        const templateData = JSON.parse(decodeURIComponent(templateParam))
        setPersona({
          name: templateData.name || '',
          age: templateData.age || '',
          location: '',
          occupation: templateData.occupation || '',
          avatar: templateData.avatar || '👤',
          goals: templateData.goals || [''],
          painPoints: templateData.painPoints || [''],
          description: templateData.description || '',
          demographics: {
            income: templateData.demographics?.income || '',
            education: templateData.demographics?.education || '',
            family: templateData.demographics?.family || ''
          },
          behaviors: templateData.behaviors || [''],
          motivations: templateData.motivations || ['']
        })
      } catch (error) {
        console.error('Error loading template data:', error)
      }
    }
  }, [searchParams])

  const [isCreating, setIsCreating] = useState(false)

  const handleCreatePersona = async () => {
    if (persona.name && persona.age && persona.occupation) {
      setIsCreating(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Here you would normally save to your database
      console.log('Creating persona:', {
        ...persona,
        id: Date.now().toString(),
        goals: persona.goals?.filter(Boolean) || [],
        painPoints: persona.painPoints?.filter(Boolean) || [],
        behaviors: persona.behaviors?.filter(Boolean) || [],
        motivations: persona.motivations?.filter(Boolean) || []
      })

      setIsCreating(false)
      router.push('/personas')
    }
  }

  const isFromTemplate = searchParams.get('template') !== null

  const updatePersonaField = (field: string, value: any) => {
    setPersona(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const updateDemographicField = (field: string, value: string) => {
    setPersona(prev => ({
      ...prev,
      demographics: {
        ...prev.demographics,
        [field]: value
      }
    }))
  }

  const addListItem = (field: 'goals' | 'painPoints' | 'behaviors' | 'motivations') => {
    const currentList = persona[field] || []
    updatePersonaField(field, [...currentList, ''])
  }

  const updateListItem = (field: 'goals' | 'painPoints' | 'behaviors' | 'motivations', index: number, value: string) => {
    const currentList = persona[field] || []
    const updatedList = [...currentList]
    updatedList[index] = value
    updatePersonaField(field, updatedList)
  }

  const removeListItem = (field: 'goals' | 'painPoints' | 'behaviors' | 'motivations', index: number) => {
    const currentList = persona[field] || []
    const updatedList = currentList.filter((_, i) => i !== index)
    updatePersonaField(field, updatedList.length > 0 ? updatedList : [''])
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header
        title={isFromTemplate ? "Skapa persona från mall" : "Skapa ny persona"}
        description={isFromTemplate ? "Anpassa mallens data för att skapa din persona" : "Definiera en detaljerad persona för dina customer journeys"}
        actions={
          <div className="flex space-x-3">
            <Link href="/personas">
              <Button variant="outline">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Tillbaka
              </Button>
            </Link>
            <Button
              variant="primary"
              onClick={handleCreatePersona}
              disabled={!persona.name || !persona.age || !persona.occupation || isCreating}
            >
              <SaveIcon className="mr-2 h-4 w-4" />
              {isCreating ? 'Skapar...' : 'Skapa persona'}
            </Button>
          </div>
        }
      />

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserIcon className="mr-2 h-5 w-5" />
                Grundläggande information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Namn *"
                  value={persona.name || ''}
                  onChange={(e) => updatePersonaField('name', e.target.value)}
                  placeholder="Anna Andersson"
                />
                <Input
                  label="Ålder *"
                  value={persona.age || ''}
                  onChange={(e) => updatePersonaField('age', e.target.value)}
                  placeholder="32"
                />
                <Input
                  label="Plats"
                  value={persona.location || ''}
                  onChange={(e) => updatePersonaField('location', e.target.value)}
                  placeholder="Stockholm"
                />
                <Input
                  label="Yrke *"
                  value={persona.occupation || ''}
                  onChange={(e) => updatePersonaField('occupation', e.target.value)}
                  placeholder="Produktchef"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Beskrivning</label>
                <textarea
                  value={persona.description || ''}
                  onChange={(e) => updatePersonaField('description', e.target.value)}
                  placeholder="Beskriv denna persona och deras bakgrund..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white text-gray-900 placeholder-gray-500"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mål & Behov</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(persona.goals || ['']).map((goal, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={goal}
                        onChange={(e) => updateListItem('goals', index, e.target.value)}
                        placeholder={`Mål ${index + 1}`}
                        className="flex-1"
                      />
                      {(persona.goals || []).length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeListItem('goals', index)}
                          className="px-3"
                        >
                          ×
                        </Button>
                      )}
                    </div>
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
              </CardContent>
            </Card>

            {/* Pain Points */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Utmaningar & Smärtpunkter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(persona.painPoints || ['']).map((pain, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={pain}
                        onChange={(e) => updateListItem('painPoints', index, e.target.value)}
                        placeholder={`Utmaning ${index + 1}`}
                        className="flex-1"
                      />
                      {(persona.painPoints || []).length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeListItem('painPoints', index)}
                          className="px-3"
                        >
                          ×
                        </Button>
                      )}
                    </div>
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
              </CardContent>
            </Card>
          </div>

          {/* Demographics */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Demografisk information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Inkomst"
                  value={persona.demographics?.income || ''}
                  onChange={(e) => updateDemographicField('income', e.target.value)}
                  placeholder="45 000 - 60 000 kr/mån"
                />
                <Input
                  label="Utbildning"
                  value={persona.demographics?.education || ''}
                  onChange={(e) => updateDemographicField('education', e.target.value)}
                  placeholder="Högskola/Universitet"
                />
                <Input
                  label="Familjesituation"
                  value={persona.demographics?.family || ''}
                  onChange={(e) => updateDemographicField('family', e.target.value)}
                  placeholder="Gift, 2 barn"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Behaviors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Beteenden</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(persona.behaviors || ['']).map((behavior, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={behavior}
                        onChange={(e) => updateListItem('behaviors', index, e.target.value)}
                        placeholder={`Beteende ${index + 1}`}
                        className="flex-1"
                      />
                      {(persona.behaviors || []).length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeListItem('behaviors', index)}
                          className="px-3"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addListItem('behaviors')}
                    className="w-full border-dashed"
                  >
                    <PlusIcon className="h-3 w-3 mr-1" />
                    Lägg till beteende
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Motivations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Motivationer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(persona.motivations || ['']).map((motivation, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={motivation}
                        onChange={(e) => updateListItem('motivations', index, e.target.value)}
                        placeholder={`Motivation ${index + 1}`}
                        className="flex-1"
                      />
                      {(persona.motivations || []).length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeListItem('motivations', index)}
                          className="px-3"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addListItem('motivations')}
                    className="w-full border-dashed"
                  >
                    <PlusIcon className="h-3 w-3 mr-1" />
                    Lägg till motivation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Section */}
          <div className="mt-8 pb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Klar att skapa persona?</h3>
                    <p className="text-gray-600 mt-1">
                      Kontrollera att all information är korrekt innan du skapar personan.
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Link href="/personas">
                      <Button variant="outline">
                        Avbryt
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      onClick={handleCreatePersona}
                      disabled={!persona.name || !persona.age || !persona.occupation || isCreating}
                    >
                      <SaveIcon className="mr-2 h-4 w-4" />
                      {isCreating ? 'Skapar persona...' : 'Skapa persona'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CreatePersonaPage() {
  return (
    <Suspense fallback={<div className="p-6">Laddar...</div>}>
      <CreatePersonaContent />
    </Suspense>
  )
}