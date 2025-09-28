'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSavedJourneyMaps, deleteJourneyMap } from '@/services/journeyMapStorage'
import {
  PlusIcon,
  RouteIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  UsersIcon,
  ExternalLinkIcon
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface JourneyMap {
  id: string
  name: string
  description: string
  persona: string
  lastModified: string
  createdBy: string
  stages: number
  status: 'draft' | 'completed' | 'in-review'
  collaborators?: Array<{
    id: string
    name: string
    avatar?: string
    role?: 'owner' | 'editor' | 'viewer'
  }>
}


const statusColors = {
  draft: 'bg-slate-100 text-slate-700',
  completed: 'bg-slate-100 text-slate-700', 
  'in-review': 'bg-slate-100 text-slate-700'
}

const getStatusLabels = (t: (key: string) => string) => ({
  draft: t('journeyMaps.status.draft'),
  completed: t('journeyMaps.status.completed'),
  'in-review': t('journeyMaps.status.inReview')
})

export default function JourneyMapsPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [journeyMaps, setJourneyMaps] = useState<JourneyMap[]>([])
  const statusLabels = getStatusLabels(t)
  const [isNewMapModalOpen, setIsNewMapModalOpen] = useState(false)
  const [newMapName, setNewMapName] = useState('')
  const [newMapDescription, setNewMapDescription] = useState('')

  // Load saved journey maps on component mount
  useEffect(() => {
    const loadSavedMaps = () => {
      try {
        const savedMaps = getSavedJourneyMaps()
        console.log('Loading saved journey maps:', savedMaps.length, 'maps found')
        console.log('Saved maps data:', savedMaps)
        const formattedMaps: JourneyMap[] = savedMaps.map(savedMap => ({
          id: savedMap.id,
          name: savedMap.name,
          description: savedMap.description,
          persona: savedMap.persona?.name || '',
          lastModified: savedMap.lastModified || savedMap.updatedAt,
          createdBy: (savedMap.createdBy === 'Nuvarande användare' || !savedMap.createdBy) ? 'fabiankjaergaard' : savedMap.createdBy,
          stages: savedMap.stages?.length || 0,
          status: savedMap.status || 'draft',
          collaborators: [
            {
              id: '1',
              name: (savedMap.createdBy === 'Nuvarande användare' || !savedMap.createdBy) ? 'fabiankjaergaard' : savedMap.createdBy,
              avatar: ((savedMap.createdBy === 'Nuvarande användare' || !savedMap.createdBy) ? 'fabiankjaergaard' : savedMap.createdBy).charAt(0).toUpperCase(),
              role: 'owner' as const
            },
            // Mock collaborators for demo
            {
              id: '2',
              name: 'Anna Andersson',
              avatar: 'A',
              role: 'editor' as const
            },
            {
              id: '3',
              name: 'Erik Nilsson',
              avatar: 'E',
              role: 'viewer' as const
            }
          ]
        }))
        setJourneyMaps(formattedMaps)
      } catch (error) {
        console.error('Error loading saved journey maps:', error)
      }
    }

    loadSavedMaps()

    // Also reload when page comes into focus (when user navigates back)
    const handleFocus = () => {
      console.log('Page focused, reloading journey maps')
      loadSavedMaps()
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const handleCreateJourneyMap = () => {
    if (newMapName.trim()) {
      const newMap: JourneyMap = {
        id: Date.now().toString(),
        name: newMapName.trim(),
        description: newMapDescription.trim(),
        persona: '',
        lastModified: new Date().toISOString().split('T')[0],
        createdBy: 'fabiankjaergaard',
        stages: 4,
        status: 'draft'
      }
      setJourneyMaps([newMap, ...journeyMaps])
      setIsNewMapModalOpen(false)
      setNewMapName('')
      setNewMapDescription('')

      // Redirect to journey map editor
      router.push(`/journey-maps/${newMap.id}`)
    }
  }

  const handleDeleteJourneyMap = (id: string) => {
    try {
      deleteJourneyMap(id)
      setJourneyMaps(journeyMaps.filter(map => map.id !== id))
      console.log('Journey map deleted successfully')
    } catch (error) {
      console.error('Error deleting journey map:', error)
      // You could show an error message to the user here
    }
  }

  const handleDuplicateJourneyMap = (map: JourneyMap) => {
    const duplicatedMap: JourneyMap = {
      ...map,
      id: Date.now().toString(),
      name: `${map.name} (${t('journeyMaps.copy')})`,
      lastModified: new Date().toISOString().split('T')[0],
      status: 'draft'
    }
    setJourneyMaps([duplicatedMap, ...journeyMaps])
  }

  return (
    <div className="h-full flex flex-col">
      <Header
        title={t('journeyMaps.title')}
        description={t('journeyMaps.subtitle')}
      />
      
      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        {journeyMaps.length > 0 ? (
          /* Journey Maps Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeyMaps.map((journeyMap) => (
            <Card key={journeyMap.id} className="border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out h-96 group cursor-pointer">
              <CardContent className="pt-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{journeyMap.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[journeyMap.status]}`}>
                        {statusLabels[journeyMap.status]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{journeyMap.description}</p>
                  </div>
                  <div className="flex space-x-1 ml-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDuplicateJourneyMap(journeyMap)}
                      className="p-2"
                      title={t('journeyMaps.actions.duplicate')}
                    >
                      <CopyIcon className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteJourneyMap(journeyMap.id)}
                      className="p-2 text-red-600 hover:text-red-700"
                      title={t('journeyMaps.actions.delete')}
                    >
                      <TrashIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  {journeyMap.persona && (
                    <div className="flex items-center text-sm text-gray-600">
                      <UserIcon className="h-4 w-4 mr-2" />
                      {journeyMap.persona}
                    </div>
                  )}

                  <div className="text-sm">
                    <div className="font-medium text-gray-700 mb-1">Senast ändrad</div>
                    <div className="space-y-1 text-gray-500">
                      <div className="flex items-center">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {new Date(journeyMap.lastModified).toLocaleDateString(language === 'sv' ? 'sv-SE' : 'en-US')}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        {new Date(journeyMap.lastModified).toLocaleTimeString(language === 'sv' ? 'sv-SE' : 'en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="flex items-center">
                        <UserIcon className="h-3 w-3 mr-1" />
                        {journeyMap.createdBy}
                      </div>
                    </div>
                  </div>

                  {/* Collaborators Section */}
                  {journeyMap.collaborators && journeyMap.collaborators.length > 0 && (
                    <div className="text-sm">
                      <div className="font-medium text-gray-700 mb-2 flex items-center">
                        <UsersIcon className="h-3 w-3 mr-1" />
                        Team ({journeyMap.collaborators.length})
                      </div>
                      <div className="flex items-center">
                        {journeyMap.collaborators.slice(0, 4).map((collaborator, index) => (
                          <div
                            key={collaborator.id}
                            className="relative group"
                            style={{ zIndex: journeyMap.collaborators!.length - index }}
                          >
                            <div
                              className={`
                                w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium
                                ${collaborator.role === 'owner'
                                  ? 'bg-slate-700 text-white'
                                  : collaborator.role === 'editor'
                                  ? 'bg-slate-500 text-white'
                                  : 'bg-gray-400 text-white'
                                }
                                ${index > 0 ? '-ml-2' : ''}
                                border-2 border-white
                                hover:z-10 hover:scale-110 transition-transform cursor-pointer
                              `}
                              title={`${collaborator.name} (${collaborator.role})`}
                            >
                              {collaborator.avatar}
                            </div>
                          </div>
                        ))}
                        {journeyMap.collaborators.length > 4 && (
                          <div
                            className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-medium -ml-2 border-2 border-white cursor-pointer hover:bg-gray-300 transition-colors"
                            title={`+${journeyMap.collaborators.length - 4} more collaborators`}
                          >
                            +{journeyMap.collaborators.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{journeyMap.stages} {t('journeyMaps.stages')}</span>
                  <span>Owner: {journeyMap.createdBy}</span>
                </div>

                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <Link href={`/journey-maps/${journeyMap.id}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      <EditIcon className="h-3 w-3 mr-1" />
                      {t('journeyMaps.actions.edit')}
                    </Button>
                  </Link>
                  <Link href={`/journey-maps/${journeyMap.id}/view`}>
                    <Button variant="outline" size="sm">
                      <ExternalLinkIcon className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            ))}

            {/* Add New Journey Map Card */}
            <Link href="/journey-maps/new">
              <Card className="border-2 border-dashed border-gray-300 shadow-none hover:border-slate-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out h-96 cursor-pointer group hover:bg-slate-50/30">
                <CardContent className="pt-6 h-full flex flex-col">
                  <div className="text-center py-12 flex-1 flex flex-col justify-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-100 group-hover:scale-110 transition-all duration-300 ease-out">
                      <RouteIcon className="w-8 h-8 text-gray-400 group-hover:text-slate-600 transition-colors duration-200" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-500 mb-2 group-hover:text-slate-700 transition-colors duration-200">
                      {t('journeyMaps.createNewCard.title')}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-slate-600 transition-colors duration-200">
                      {t('journeyMaps.createNewCard.description')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        ) : (
          /* Getting Started Guide */
          <div className="flex items-center justify-center h-full">
            <Link href="/journey-maps/new" className="max-w-2xl w-full mx-auto">
              <Card className="group border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">
                <CardContent className="pt-6 h-full flex flex-col">
                  <div className="text-center py-12 flex-1 flex flex-col justify-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-slate-200 group-hover:scale-110 transition-all duration-300 ease-out">
                      <RouteIcon className="w-8 h-8 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-slate-700 transition-colors duration-200">
                      {t('journeyMaps.gettingStarted.title')}
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto group-hover:text-gray-700 transition-colors duration-200">
                      {t('journeyMaps.gettingStarted.description')}
                    </p>
                    <Button variant="primary">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      {t('journeyMaps.gettingStarted.createFirst')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}
      </div>
      
      {/* New Journey Map Modal */}
      <Modal 
        isOpen={isNewMapModalOpen} 
        onClose={() => setIsNewMapModalOpen(false)}
        title={t('journeyMaps.modal.createTitle')}
      >
        <div className="space-y-6">
          <Input
            label={t('journeyMaps.modal.nameLabel')}
            value={newMapName}
            onChange={(e) => setNewMapName(e.target.value)}
            placeholder={t('journeyMaps.modal.namePlaceholder')}
            required
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('journeyMaps.modal.descriptionLabel')}
            </label>
            <textarea
              value={newMapDescription}
              onChange={(e) => setNewMapDescription(e.target.value)}
              placeholder={t('journeyMaps.modal.descriptionPlaceholder')}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white text-gray-900 placeholder-gray-500"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => setIsNewMapModalOpen(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button 
              variant="primary" 
              onClick={handleCreateJourneyMap}
              disabled={!newMapName.trim()}
            >
              {t('journeyMaps.modal.create')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}