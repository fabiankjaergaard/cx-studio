'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useLanguage } from '@/contexts/LanguageContext'
import { PlusIcon, UserIcon, SaveIcon, ArrowLeftIcon, CameraIcon, UploadIcon, SparklesIcon } from 'lucide-react'
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
    avatar: '',
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
          avatar: templateData.avatar || '',
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
  const [avatarImage, setAvatarImage] = useState<string | null>(null)

  const handleCreatePersona = async () => {
    if (persona.name && persona.age && persona.occupation) {
      setIsCreating(true)

      // Create the persona object
      const newPersona: Persona = {
        ...persona,
        id: Date.now().toString(),
        name: persona.name || '',
        age: persona.age || '',
        location: persona.location || '',
        occupation: persona.occupation || '',
        avatar: persona.avatar || '',
        goals: persona.goals?.filter(Boolean) || [],
        painPoints: persona.painPoints?.filter(Boolean) || [],
        description: persona.description || '',
        demographics: persona.demographics || { income: '', education: '', family: '' },
        behaviors: persona.behaviors?.filter(Boolean) || [],
        motivations: persona.motivations?.filter(Boolean) || []
      }

      // Save to localStorage
      try {
        const existingPersonas = JSON.parse(localStorage.getItem('user-personas') || '[]')
        const updatedPersonas = [...existingPersonas, newPersona]
        localStorage.setItem('user-personas', JSON.stringify(updatedPersonas))
        console.log('Persona saved to localStorage:', newPersona)
      } catch (error) {
        console.error('Error saving persona to localStorage:', error)
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setAvatarImage(result)
        updatePersonaField('avatar', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setAvatarImage(null)
    updatePersonaField('avatar', '')
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
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
              <CardTitle className="flex items-center text-slate-800">
                <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center mr-3">
                  <UserIcon className="h-4 w-4 text-white" />
                </div>
                Grundläggande information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image Section */}
              <div className="flex justify-center mb-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden group-hover:shadow-xl transition-shadow duration-300">
                    {avatarImage || (typeof persona.avatar === 'string' && persona.avatar.startsWith('data:')) ? (
                      <img
                        src={avatarImage || persona.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400 group-hover:text-slate-500 transition-colors duration-300">
                        <UserIcon className="w-12 h-12" />
                        <span className="text-xs mt-1 opacity-70">Lägg till bild</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 flex space-x-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <label className="w-8 h-8 bg-slate-600 hover:bg-slate-700 hover:scale-110 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all duration-300">
                      <CameraIcon className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {(avatarImage || (typeof persona.avatar === 'string' && persona.avatar.startsWith('data:'))) && (
                      <button
                        onClick={removeImage}
                        className="w-8 h-8 bg-red-500 hover:bg-red-600 hover:scale-110 rounded-full flex items-center justify-center shadow-md transition-all duration-300"
                      >
                        <span className="text-white text-xs font-bold">×</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <Input
                    label="Namn *"
                    value={persona.name || ''}
                    onChange={(e) => updatePersonaField('name', e.target.value)}
                    placeholder="Anna Andersson"
                    className="transition-all duration-300 focus:scale-[1.02] group-hover:border-slate-400"
                  />
                </div>
                <div className="group">
                  <Input
                    label="Ålder *"
                    value={persona.age || ''}
                    onChange={(e) => updatePersonaField('age', e.target.value)}
                    placeholder="32"
                    className="transition-all duration-300 focus:scale-[1.02] group-hover:border-slate-400"
                  />
                </div>
                <div className="group">
                  <Input
                    label="Plats"
                    value={persona.location || ''}
                    onChange={(e) => updatePersonaField('location', e.target.value)}
                    placeholder="Stockholm"
                    className="transition-all duration-300 focus:scale-[1.02] group-hover:border-slate-400"
                  />
                </div>
                <div className="group">
                  <Input
                    label="Yrke *"
                    value={persona.occupation || ''}
                    onChange={(e) => updatePersonaField('occupation', e.target.value)}
                    placeholder="Produktchef"
                    className="transition-all duration-300 focus:scale-[1.02] group-hover:border-slate-400"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-slate-800 transition-colors duration-300">Beskrivning</label>
                <textarea
                  value={persona.description || ''}
                  onChange={(e) => updatePersonaField('description', e.target.value)}
                  placeholder="Beskriv denna persona och deras bakgrund..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-slate-400 focus:scale-[1.02]"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Goals */}
            <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
                <CardTitle className="text-lg flex items-center text-slate-800">
                  <div className="w-6 h-6 bg-slate-600 rounded-lg flex items-center justify-center mr-2">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  Mål & Behov
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(persona.goals || ['']).map((goal, index) => (
                    <div key={index} className="flex space-x-2 group">
                      <Input
                        value={goal}
                        onChange={(e) => updateListItem('goals', index, e.target.value)}
                        placeholder={`Mål ${index + 1}`}
                        className="flex-1 transition-all duration-300 focus:scale-[1.02] group-hover:border-slate-400"
                      />
                      {(persona.goals || []).length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeListItem('goals', index)}
                          className="px-3 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300 hover:scale-110"
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
                    className="w-full border-dashed hover:border-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-all duration-300 hover:scale-105"
                  >
                    <PlusIcon className="h-3 w-3 mr-1" />
                    Lägg till mål
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pain Points */}
            <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
                <CardTitle className="text-lg flex items-center text-slate-800">
                  <div className="w-6 h-6 bg-slate-600 rounded-lg flex items-center justify-center mr-2">
                    <span className="text-white text-xs">!</span>
                  </div>
                  Utmaningar & Smärtpunkter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(persona.painPoints || ['']).map((pain, index) => (
                    <div key={index} className="flex space-x-2 group">
                      <Input
                        value={pain}
                        onChange={(e) => updateListItem('painPoints', index, e.target.value)}
                        placeholder={`Utmaning ${index + 1}`}
                        className="flex-1 transition-all duration-300 focus:scale-[1.02] group-hover:border-slate-400"
                      />
                      {(persona.painPoints || []).length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeListItem('painPoints', index)}
                          className="px-3 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300 hover:scale-110"
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
                    className="w-full border-dashed hover:border-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-all duration-300 hover:scale-105"
                  >
                    <PlusIcon className="h-3 w-3 mr-1" />
                    Lägg till utmaning
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Demographics */}
          <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
              <CardTitle className="text-lg flex items-center text-slate-800">
                <div className="w-6 h-6 bg-slate-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white text-xs">i</span>
                </div>
                Demografisk information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group">
                  <Input
                    label="Inkomst"
                    value={persona.demographics?.income || ''}
                    onChange={(e) => updateDemographicField('income', e.target.value)}
                    placeholder="45 000 - 60 000 kr/mån"
                    className="transition-all duration-300 focus:scale-[1.02] group-hover:border-slate-400"
                  />
                </div>
                <div className="group">
                  <Input
                    label="Utbildning"
                    value={persona.demographics?.education || ''}
                    onChange={(e) => updateDemographicField('education', e.target.value)}
                    placeholder="Högskola/Universitet"
                    className="transition-all duration-300 focus:scale-[1.02] group-hover:border-slate-400"
                  />
                </div>
                <div className="group">
                  <Input
                    label="Familjesituation"
                    value={persona.demographics?.family || ''}
                    onChange={(e) => updateDemographicField('family', e.target.value)}
                    placeholder="Gift, 2 barn"
                    className="transition-all duration-300 focus:scale-[1.02] group-hover:border-slate-400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Behaviors */}
            <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
                <CardTitle className="text-lg flex items-center text-slate-800">
                  <div className="w-6 h-6 bg-slate-600 rounded-lg flex items-center justify-center mr-2">
                    <span className="text-white text-xs">→</span>
                  </div>
                  Beteenden
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(persona.behaviors || ['']).map((behavior, index) => (
                    <div key={index} className="flex space-x-2 group">
                      <Input
                        value={behavior}
                        onChange={(e) => updateListItem('behaviors', index, e.target.value)}
                        placeholder={`Beteende ${index + 1}`}
                        className="flex-1 transition-all duration-300 focus:scale-[1.02] group-hover:border-slate-400"
                      />
                      {(persona.behaviors || []).length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeListItem('behaviors', index)}
                          className="px-3 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300 hover:scale-110"
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
                    className="w-full border-dashed hover:border-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-all duration-300 hover:scale-105"
                  >
                    <PlusIcon className="h-3 w-3 mr-1" />
                    Lägg till beteende
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Motivations */}
            <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
                <CardTitle className="text-lg flex items-center text-slate-800">
                  <div className="w-6 h-6 bg-slate-600 rounded-lg flex items-center justify-center mr-2">
                    <SparklesIcon className="h-3 w-3 text-white" />
                  </div>
                  Motivationer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(persona.motivations || ['']).map((motivation, index) => (
                    <div key={index} className="flex space-x-2 group">
                      <Input
                        value={motivation}
                        onChange={(e) => updateListItem('motivations', index, e.target.value)}
                        placeholder={`Motivation ${index + 1}`}
                        className="flex-1 transition-all duration-300 focus:scale-[1.02] group-hover:border-slate-400"
                      />
                      {(persona.motivations || []).length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeListItem('motivations', index)}
                          className="px-3 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300 hover:scale-110"
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
                    className="w-full border-dashed hover:border-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-all duration-300 hover:scale-105"
                  >
                    <PlusIcon className="h-3 w-3 mr-1" />
                    Lägg till motivation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Section */}
          <div className="pb-8">
            <Card className="border-0 bg-gradient-to-r from-slate-50 to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-slate-800 flex items-center justify-center md:justify-start">
                      <SparklesIcon className="h-5 w-5 mr-2 text-slate-600" />
                      Klar att skapa persona?
                    </h3>
                    <p className="text-slate-600 mt-2">
                      Kontrollera att all information är korrekt innan du skapar personan.
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Link href="/personas">
                      <Button variant="outline" className="hover:scale-105 transition-transform duration-300">
                        Avbryt
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      onClick={handleCreatePersona}
                      disabled={!persona.name || !persona.age || !persona.occupation || isCreating}
                      className="bg-slate-600 hover:bg-slate-700 hover:scale-105 transition-all duration-300 shadow-lg"
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