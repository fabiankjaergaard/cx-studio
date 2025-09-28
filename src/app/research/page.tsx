'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import {
  FolderIcon,
  PlusIcon,
  SearchIcon,
  MoreVerticalIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  MoveIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ClipboardListIcon,
  EyeIcon,
  MessageCircleIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  FolderPlusIcon,
  FileIcon,
  MicIcon,
  BarChart3Icon,
  UsersIcon,
  TrendingUpIcon,
  StarIcon,
  Target,
  ArrowRightIcon,
  PlayIcon,
  FileTextIcon
} from 'lucide-react'
import { getCompletedInterviews, type CompletedInterview } from '@/services/interviewStorage'
import { getSavedResearchProjects, getSavedResearchItems, saveResearchProject, type ResearchProject } from '@/services/researchProjectStorage'
import Link from 'next/link'

interface ResearchFolder {
  id: string
  name: string
  description: string
  color: string
  createdAt: string
  itemCount: number
  lastActivity: string
  types: Array<'interview' | 'survey' | 'focusgroup' | 'usability'>
}

interface ResearchItem {
  id: string
  type: 'interview' | 'survey' | 'focusgroup' | 'usability'
  title: string
  participant?: string
  date: string
  duration?: number
  status: 'completed' | 'in-progress' | 'draft'
  folderId?: string
  responses?: number
  insights?: number
}

export default function ResearchPage() {
  const [folders, setFolders] = useState<ResearchFolder[]>([])

  const [researchItems, setResearchItems] = useState<ResearchItem[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [newFolderDescription, setNewFolderDescription] = useState('')
  const [selectedColor, setSelectedColor] = useState('#6B7280')

  const subtleColors = [
    '#6B7280', '#64748B', '#78716C', '#71717A', '#6B7280',
    '#6B7280', '#64748B', '#78716C'
  ]

  const researchTypes = [
    {
      type: 'interview' as const,
      name: 'Intervju',
      icon: MicIcon,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      href: '/insights/interviews?tab=create'
    },
    {
      type: 'survey' as const,
      name: 'Enkät',
      icon: ClipboardListIcon,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      href: '/insights/nps'
    },
    {
      type: 'focusgroup' as const,
      name: 'Fokusgrupp',
      icon: UsersIcon,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      href: '/insights/focus-groups'
    },
    {
      type: 'usability' as const,
      name: 'Användbarhet',
      icon: Target,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      href: '/insights/usability'
    }
  ]

  // Load research data on mount
  useEffect(() => {
    const loadData = () => {
      // Load research projects
      const savedProjects = getSavedResearchProjects()
      setFolders(savedProjects)

      // Load research items
      const savedItems = getSavedResearchItems()
      setResearchItems(savedItems)

      console.log('Loaded research projects:', savedProjects.length)
      console.log('Loaded research items:', savedItems.length)
    }

    loadData()

    // Listen for storage changes to reload when data is updated from other parts of the app
    const handleStorageChange = () => {
      loadData()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: ResearchProject = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
        description: newFolderDescription.trim(),
        color: selectedColor,
        createdAt: new Date().toISOString().split('T')[0],
        itemCount: 0,
        lastActivity: new Date().toISOString().split('T')[0],
        types: []
      }

      saveResearchProject(newFolder)
      setFolders([newFolder, ...folders])
      setIsNewFolderModalOpen(false)
      setNewFolderName('')
      setNewFolderDescription('')
    }
  }

  const filteredFolders = folders.filter(folder =>
    folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    folder.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTypeIcon = (type: ResearchItem['type']) => {
    const config = researchTypes.find(t => t.type === type)
    if (!config) return FileIcon
    return config.icon
  }

  const getTypeColor = (type: ResearchItem['type']) => {
    const config = researchTypes.find(t => t.type === type)
    return config?.color || 'text-gray-600'
  }

  const getTypeName = (type: ResearchItem['type']) => {
    const config = researchTypes.find(t => t.type === type)
    return config?.name || type
  }

  if (selectedFolder) {
    const folder = folders.find(f => f.id === selectedFolder)
    const folderItems = researchItems.filter(item => item.folderId === selectedFolder)

    return (
      <div className="h-full flex flex-col">
        <Header
          title={folder?.name || 'Projekt'}
          description={folder?.description || 'Visa forskning i detta projekt'}
        />

        <div className="flex-1 p-8 overflow-auto bg-gray-50">
          <div className="space-y-6">
            {/* Back and Actions */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setSelectedFolder(null)}
                className="hover:bg-gray-100"
              >
                ← Tillbaka till projekt
              </Button>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Sök forskning..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent w-64"
                  />
                </div>

                <div className="flex border border-gray-300 rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="border-0 rounded-r-none"
                  >
                    <GridIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="border-0 rounded-l-none border-l"
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Research Items */}
            {folderItems.length === 0 ? (
              <div className="text-center py-16">
                <FileIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen forskning i detta projekt</h3>
                <p className="text-gray-600 mb-6">Börja genom att skapa ny forskning eller flytta befintlig hit</p>
                <div className="flex justify-center space-x-3">
                  {researchTypes.slice(0, 2).map((type) => (
                    <Link key={type.type} href={type.href}>
                      <Button variant="primary">
                        <type.icon className="mr-2 h-4 w-4" />
                        Ny {type.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className={viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
              }>
                {folderItems.map((item) => {
                  const Icon = getTypeIcon(item.type)
                  return (
                    <Card key={item.id} className="border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out group cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${researchTypes.find(t => t.type === item.type)?.bg}`}>
                              <Icon className={`h-5 w-5 ${getTypeColor(item.type)}`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h3>
                              <p className="text-sm text-gray-600">{getTypeName(item.type)}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="p-2">
                            <MoreVerticalIcon className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="space-y-2 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {item.date}
                          </div>
                          {item.duration && (
                            <div className="flex items-center">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              {Math.floor(item.duration / 60)} minuter
                            </div>
                          )}
                          {item.responses && (
                            <div className="flex items-center">
                              <UserIcon className="h-3 w-3 mr-1" />
                              {item.responses} svar
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-2 pt-4 border-t border-gray-100">
                          <Button variant="primary" size="sm" className="flex-1">
                            <EyeIcon className="h-3 w-3 mr-1" />
                            Visa
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageCircleIcon className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Header
        title="Research Projects"
        description="Organisera och hantera alla dina forskningsprojekt på ett ställe"
      />

      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Skapa ny forskning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {researchTypes.map((type) => (
                <Link key={type.type} href={type.href}>
                  <Card className="border-0 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${type.bg} flex items-center justify-center`}>
                          <type.icon className={`h-5 w-5 ${type.color}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-slate-700 transition-colors">
                            {type.name}
                          </h3>
                          <p className="text-sm text-gray-600">Skapa ny</p>
                        </div>
                        <ArrowRightIcon className="h-4 w-4 text-gray-400 ml-auto group-hover:text-slate-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center justify-between">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Sök projekt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent w-64"
              />
            </div>

            <Button
              variant="primary"
              onClick={() => setIsNewFolderModalOpen(true)}
            >
              <FolderPlusIcon className="mr-2 h-4 w-4" />
              Nytt projekt
            </Button>
          </div>

          {/* Folders Grid */}
          {folders.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <FolderIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Skapa ditt första projekt
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Organisera din användarforskning i projekt för bättre struktur och översikt
                </p>
                <Button
                  variant="primary"
                  onClick={() => setIsNewFolderModalOpen(true)}
                >
                  <FolderPlusIcon className="mr-2 h-4 w-4" />
                  Skapa projekt
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFolders.map((folder) => (
                <Card
                  key={folder.id}
                  className="border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group"
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100">
                          <FolderIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 group-hover:text-slate-700 transition-colors">
                            {folder.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {folder.itemCount} objekt
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle folder menu
                        }}
                      >
                        <MoreVerticalIcon className="h-3 w-3" />
                      </Button>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {folder.description}
                    </p>

                    {/* Research Types */}
                    <div className="flex items-center space-x-2 mb-4">
                      {folder.types.slice(0, 3).map((type) => {
                        const Icon = getTypeIcon(type)
                        const color = getTypeColor(type)
                        return (
                          <div key={type} className="flex items-center space-x-1 text-xs text-gray-500">
                            <Icon className={`h-3 w-3 ${color}`} />
                            <span>{getTypeName(type)}</span>
                          </div>
                        )
                      })}
                      {folder.types.length > 3 && (
                        <span className="text-xs text-gray-500">+{folder.types.length - 3}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Senast ändrad {folder.lastActivity}</span>
                      <span>Skapad {folder.createdAt}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Create New Project Card */}
              <Card
                className="border-2 border-dashed border-gray-300 shadow-none hover:border-slate-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group hover:bg-slate-50/30"
                onClick={() => setIsNewFolderModalOpen(true)}
              >
                <CardContent className="pt-6 h-full flex flex-col justify-center">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-100 group-hover:scale-110 transition-all duration-300 ease-out">
                      <FolderPlusIcon className="w-8 h-8 text-gray-400 group-hover:text-slate-600 transition-colors duration-200" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-500 mb-2 group-hover:text-slate-700 transition-colors duration-200">
                      Nytt projekt
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-slate-600 transition-colors duration-200">
                      Skapa ett nytt forskningsprojekt
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quick Stats */}
          {folders.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-0 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <FolderIcon className="h-8 w-8 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Projekt</p>
                      <p className="text-2xl font-bold text-gray-900">{folders.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <FileTextIcon className="h-8 w-8 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Total forskning</p>
                      <p className="text-2xl font-bold text-gray-900">{researchItems.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <MicIcon className="h-8 w-8 text-purple-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Intervjuer</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {researchItems.filter(item => item.type === 'interview').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <ClipboardListIcon className="h-8 w-8 text-orange-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Enkäter</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {researchItems.filter(item => item.type === 'survey').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* New Project Modal */}
      <Modal
        isOpen={isNewFolderModalOpen}
        onClose={() => setIsNewFolderModalOpen(false)}
        title="Skapa nytt projekt"
      >
        <div className="space-y-6">
          <Input
            label="Projektnamn"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="T.ex. Onboarding Research"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beskrivning
            </label>
            <textarea
              value={newFolderDescription}
              onChange={(e) => setNewFolderDescription(e.target.value)}
              placeholder="Beskriv vad detta projekt kommer innehålla..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white text-gray-900 placeholder-gray-500"
              rows={3}
            />
          </div>


          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setIsNewFolderModalOpen(false)
                setNewFolderName('')
                setNewFolderDescription('')
              }}
            >
              Avbryt
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateFolder}
              disabled={!newFolderName.trim()}
            >
              Skapa projekt
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}