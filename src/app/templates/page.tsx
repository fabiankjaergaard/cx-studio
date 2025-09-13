'use client'

import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { NewJourneyModal } from '@/components/journey/NewJourneyModal'
import { useJourneyStore } from '@/store/journey-store'
import { PlusIcon, EyeIcon, DownloadIcon, BookTemplateIcon } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

const getTemplates = (t: (key: string) => string) => [
  {
    id: '1',
    name: t('templates.ecommerce.name'),
    description: t('templates.ecommerce.description'),
    industry: t('templates.ecommerce.industry'),
    touchpoints: 8,
    stages: 5,
    preview: '/api/templates/1/preview'
  },
  {
    id: '2', 
    name: t('templates.saas.name'),
    description: t('templates.saas.description'),
    industry: t('templates.saas.industry'),
    touchpoints: 6,
    stages: 4,
    preview: '/api/templates/2/preview'
  },
  {
    id: '3',
    name: t('templates.customerService.name'),
    description: t('templates.customerService.description'),
    industry: t('templates.customerService.industry'),
    touchpoints: 7,
    stages: 5,
    preview: '/api/templates/3/preview'
  },
  {
    id: '4',
    name: t('templates.restaurant.name'),
    description: t('templates.restaurant.description'),
    industry: t('templates.restaurant.industry'),
    touchpoints: 9,
    stages: 6,
    preview: '/api/templates/4/preview'
  },
  {
    id: '5',
    name: t('templates.banking.name'),
    description: t('templates.banking.description'),
    industry: t('templates.banking.industry'),
    touchpoints: 10,
    stages: 5,
    preview: '/api/templates/5/preview'
  },
  {
    id: '6',
    name: t('templates.healthcare.name'),
    description: t('templates.healthcare.description'),
    industry: t('templates.healthcare.industry'),
    touchpoints: 8,
    stages: 6,
    preview: '/api/templates/6/preview'
  }
]

export default function TemplatesPage() {
  const { t } = useLanguage()
  const [isNewJourneyModalOpen, setIsNewJourneyModalOpen] = useState(false)
  const { addJourney, setCurrentJourney } = useJourneyStore()
  const router = useRouter()
  const templates = getTemplates(t)

  const handleUseTemplate = (template: any) => {
    // Create a journey from template
    const newJourney = {
      title: `${template.name} (${t('templates.fromTemplate')})`,
      description: template.description,
      persona: t('templates.customerFromTemplate'),
      touchpoints: [], // Could add template touchpoints here
      stages: [
        { id: '1', name: t('templates.stages.awareness'), description: t('templates.stageDescriptions.awareness'), color: '#3B82F6' },
        { id: '2', name: t('templates.stages.consideration'), description: t('templates.stageDescriptions.consideration'), color: '#8B5CF6' },
        { id: '3', name: t('templates.stages.purchase'), description: t('templates.stageDescriptions.purchase'), color: '#10B981' },
        { id: '4', name: t('templates.stages.usage'), description: t('templates.stageDescriptions.usage'), color: '#F59E0B' },
        { id: '5', name: t('templates.stages.loyalty'), description: t('templates.stageDescriptions.loyalty'), color: '#EF4444' }
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
        title={t('templates.title')} 
        description={t('templates.subtitle')}
        actions={
          <Button 
            variant="primary"
            onClick={() => setIsNewJourneyModalOpen(true)}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            {t('templates.createCustom')}
          </Button>
        }
      />
      
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Filter/Search Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex space-x-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900">
              <option value="">{t('templates.filters.allIndustries')}</option>
              <option value="e-commerce">{t('templates.filters.ecommerce')}</option>
              <option value="teknologi">{t('templates.filters.technology')}</option>
              <option value="service">{t('templates.filters.service')}</option>
              <option value="hospitality">{t('templates.filters.hospitality')}</option>
              <option value="finans">{t('templates.filters.finance')}</option>
              <option value="hälsovård">{t('templates.filters.healthcare')}</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900">
              <option value="">{t('templates.filters.sortBy')}</option>
              <option value="name">{t('templates.filters.name')}</option>
              <option value="industry">{t('templates.filters.industry')}</option>
              <option value="touchpoints">{t('templates.filters.touchpoints')}</option>
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
                  <span>{template.touchpoints} {t('templates.touchpoints')}</span>
                  <span>{template.stages} {t('templates.stages')}</span>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <EyeIcon className="mr-1 h-4 w-4" />
                    {t('templates.actions.preview')}
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <DownloadIcon className="mr-1 h-4 w-4" />
                    {t('templates.actions.useTemplate')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Template Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('templates.customSection.title')}</h2>
          <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors">
            <CardContent className="p-8 text-center">
              <PlusIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('templates.customSection.cardTitle')}
              </h3>
              <p className="text-gray-500 mb-4">
                {t('templates.customSection.cardDescription')}
              </p>
              <Button variant="primary">
                {t('templates.customSection.getStarted')}
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