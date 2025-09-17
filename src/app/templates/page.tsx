'use client'

import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PlusIcon, EyeIcon, DownloadIcon, BookTemplateIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { TemplatePreviewModal } from '@/components/templates/TemplatePreviewModal'

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
  const router = useRouter()
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const templates = getTemplates(t)

  // Filter and sort templates
  const filteredAndSortedTemplates = React.useMemo(() => {
    let filtered = templates

    // Filter by industry
    if (selectedIndustry) {
      filtered = filtered.filter(template =>
        template.industry.toLowerCase() === selectedIndustry.toLowerCase()
      )
    }

    // Sort templates
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name)
          case 'industry':
            return a.industry.localeCompare(b.industry)
          case 'touchpoints':
            return b.touchpoints - a.touchpoints
          default:
            return 0
        }
      })
    }

    return filtered
  }, [templates, selectedIndustry, sortBy])

  const handlePreview = (template: any) => {
    setSelectedTemplate(template)
    setIsPreviewOpen(true)
  }

  const handleCreateCustomTemplate = () => {
    // Navigate to a blank journey map for creating a custom template
    router.push('/journey-maps/new?custom=true&name=Anpassad mall')
  }

  const handleUseTemplate = (template: any) => {
    // Create journey map ID and navigate directly to new journey map with template data
    const templateId = template.id
    const journeyMapId = `template-${templateId}-${Date.now()}`

    // Navigate to journey-maps with template parameter
    router.push(`/journey-maps/new?template=${templateId}&name=${encodeURIComponent(template.name)}`)
  }
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header 
        title={t('templates.title')} 
        description={t('templates.subtitle')}
      />
      
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Filter/Search Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex space-x-4">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="">{t('templates.filters.allIndustries')}</option>
              <option value="E-commerce">{t('templates.filters.ecommerce')}</option>
              <option value="Teknologi">{t('templates.filters.technology')}</option>
              <option value="Service">{t('templates.filters.service')}</option>
              <option value="Hospitality">{t('templates.filters.hospitality')}</option>
              <option value="Finans">{t('templates.filters.finance')}</option>
              <option value="Hälsovård">{t('templates.filters.healthcare')}</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">{t('templates.filters.sortBy')}</option>
              <option value="name">{t('templates.filters.name')}</option>
              <option value="industry">{t('templates.filters.industry')}</option>
              <option value="touchpoints">{t('templates.filters.touchpoints')}</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            {filteredAndSortedTemplates.length} {filteredAndSortedTemplates.length === 1 ? 'mall' : 'mallar'}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTemplates.map((template) => (
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handlePreview(template)}
                  >
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
              <Button variant="primary" onClick={handleCreateCustomTemplate}>
                {t('templates.customSection.getStarted')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Modal */}
      <TemplatePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={selectedTemplate}
        onUseTemplate={handleUseTemplate}
      />
    </div>
  )
}