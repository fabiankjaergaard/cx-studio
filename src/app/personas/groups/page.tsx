'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  UsersIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  FolderIcon,
  UserIcon,
  TagIcon,
  MoreVerticalIcon,
  SearchIcon
} from 'lucide-react'

interface PersonaGroup {
  id: string
  name: string
  description: string
  color: string
  personaCount: number
  createdAt: string
  personas: string[] // Array of persona IDs
}

const mockGroups: PersonaGroup[] = [
  {
    id: '1',
    name: 'E-commerce Kunder',
    description: 'Personas för online-shoppare och digitala kunder',
    color: 'bg-blue-500',
    personaCount: 5,
    createdAt: '2024-01-15',
    personas: ['emma-shopper', 'bengt-bargain']
  },
  {
    id: '2',
    name: 'B2B Beslutare',
    description: 'Företagskunder och beslutsfattare inom tech',
    color: 'bg-green-500',
    personaCount: 3,
    createdAt: '2024-01-20',
    personas: ['alex-founder', 'sara-teacher']
  },
  {
    id: '3',
    name: 'Hälsovård',
    description: 'Patienter och vårdpersonal inom hälsosektorn',
    color: 'bg-red-500',
    personaCount: 4,
    createdAt: '2024-01-25',
    personas: ['margareta-patient']
  },
  {
    id: '4',
    name: 'Finans & Investering',
    description: 'Personas inom finansbranschen och investerare',
    color: 'bg-purple-500',
    personaCount: 2,
    createdAt: '2024-02-01',
    personas: ['david-analyst']
  },
  {
    id: '5',
    name: 'Resa & Turism',
    description: 'Resenärer och turismintresserade personas',
    color: 'bg-orange-500',
    personaCount: 3,
    createdAt: '2024-02-05',
    personas: ['lisa-traveler']
  }
]

export default function PersonaGroupsPage() {
  const { t } = useLanguage()
  const [groups, setGroups] = useState<PersonaGroup[]>(mockGroups)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    color: 'bg-blue-500'
  })

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
  ]

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateGroup = () => {
    if (newGroup.name.trim()) {
      const group: PersonaGroup = {
        id: Date.now().toString(),
        name: newGroup.name,
        description: newGroup.description,
        color: newGroup.color,
        personaCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        personas: []
      }
      setGroups([...groups, group])
      setNewGroup({ name: '', description: '', color: 'bg-blue-500' })
      setIsCreating(false)
    }
  }

  const handleDeleteGroup = (id: string) => {
    setGroups(groups.filter(group => group.id !== id))
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header
        title={t('nav.personaGroups')}
        description="Organisera personas i grupper för bättre hantering"
        actions={
          <Button
            variant="primary"
            onClick={() => setIsCreating(true)}
            className="flex items-center"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Skapa grupp
          </Button>
        }
      />

      <div className="flex-1 p-6 overflow-auto">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Sök grupper..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Create Group Form */}
        {isCreating && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlusIcon className="mr-2 h-5 w-5" />
                Skapa ny grupp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Gruppnamn *"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                placeholder="T.ex. E-commerce Kunder"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Beskrivning</label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  placeholder="Beskriv vad denna grupp innehåller..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Färg</label>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewGroup({ ...newGroup, color })}
                      className={`w-8 h-8 rounded-full ${color} ${
                        newGroup.color === color ? 'ring-2 ring-gray-400 ring-offset-2' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Avbryt
                </Button>
                <Button variant="primary" onClick={handleCreateGroup}>
                  Skapa grupp
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="hover:shadow-md transition-shadow border-0 bg-white rounded-xl overflow-hidden">
              <div className="p-4">
                {/* Header with color badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${group.color} mr-2`} />
                    <span className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-full">
                      {group.personaCount} personas
                    </span>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVerticalIcon className="h-4 w-4 text-gray-400" />
                  </button>
                </div>

                {/* Main content */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                    {group.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {group.description}
                  </p>
                </div>

                {/* Date */}
                <div className="mb-4">
                  <span className="text-xs text-gray-500">Skapad: {group.createdAt}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center w-10 h-8 p-0"
                    title="Redigera grupp"
                  >
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex items-center justify-center px-3 py-2 flex-1"
                  >
                    <FolderIcon className="h-4 w-4 mr-1" />
                    Hantera
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center w-10 h-8 p-0 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteGroup(group.id)}
                    title="Ta bort grupp"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {/* Create Custom Group Card */}
          <Card className="hover:shadow-md transition-shadow border-dashed border-2 border-gray-300 hover:border-gray-400 cursor-pointer rounded-xl" onClick={() => setIsCreating(true)}>
            <div className="p-4 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
              <div className="w-12 h-12 mx-auto mb-3 bg-gray-50 rounded-xl flex items-center justify-center">
                <PlusIcon className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Skapa ny grupp
              </h3>
              <p className="text-xs text-gray-400">
                Organisera personas i kategorier
              </p>
            </div>
          </Card>
        </div>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <FolderIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'Inga grupper hittades' : 'Inga grupper än'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? 'Prova att söka efter något annat eller skapa en ny grupp'
                : 'Skapa din första persona-grupp för att organisera dina personas'
              }
            </p>
            {!searchTerm && (
              <Button
                variant="primary"
                onClick={() => setIsCreating(true)}
                className="flex items-center mx-auto"
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                Skapa första gruppen
              </Button>
            )}
          </div>
        )}

        {/* Stats */}
        {filteredGroups.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <FolderIcon className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{groups.length}</p>
                    <p className="text-sm text-gray-600">Totalt grupper</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <UserIcon className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">
                      {groups.reduce((sum, group) => sum + group.personaCount, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Organiserade personas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <TagIcon className="h-8 w-8 text-purple-500 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">
                      {Math.round(groups.reduce((sum, group) => sum + group.personaCount, 0) / groups.length)}
                    </p>
                    <p className="text-sm text-gray-600">⌀ Personas per grupp</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}