'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  PlusIcon, 
  RouteIcon, 
  EditIcon, 
  TrashIcon, 
  CopyIcon,
  CalendarIcon,
  UserIcon,
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

  const handleCreateJourneyMap = () => {
    if (newMapName.trim()) {
      const newMap: JourneyMap = {
        id: Date.now().toString(),
        name: newMapName.trim(),
        description: newMapDescription.trim(),
        persona: '',
        lastModified: new Date().toISOString().split('T')[0],
        createdBy: t('journeyMaps.currentUser'),
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
    setJourneyMaps(journeyMaps.filter(map => map.id !== id))
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
            <Card key={journeyMap.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{journeyMap.name}</CardTitle>
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
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {journeyMap.persona && (
                    <div className="flex items-center text-sm text-gray-600">
                      <UserIcon className="h-4 w-4 mr-2" />
                      {journeyMap.persona}
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {t('journeyMaps.lastModified')}: {new Date(journeyMap.lastModified).toLocaleDateString(language === 'sv' ? 'sv-SE' : 'en-US')}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{journeyMap.stages} {t('journeyMaps.stages')}</span>
                    <span>{t('journeyMaps.createdBy')}: {journeyMap.createdBy}</span>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
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
                </div>
              </CardContent>
            </Card>
            ))}

            {/* Add New Journey Map Card */}
            <Card
              className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors cursor-pointer"
              onClick={() => setIsNewMapModalOpen(true)}
            >
              <CardContent className="p-8 text-center">
                <RouteIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t('journeyMaps.createNewCard.title')}
                </h3>
                <p className="text-gray-500">
                  {t('journeyMaps.createNewCard.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Getting Started Guide */
          <div className="flex items-center justify-center h-full">
            <Card className="bg-slate-50 border-slate-200 max-w-2xl w-full mx-auto">
              <CardContent className="p-8 text-center">
              <RouteIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('journeyMaps.gettingStarted.title')}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {t('journeyMaps.gettingStarted.description')}
              </p>
              <Button 
                variant="primary"
                onClick={() => setIsNewMapModalOpen(true)}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                {t('journeyMaps.gettingStarted.createFirst')}
              </Button>
              </CardContent>
            </Card>
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