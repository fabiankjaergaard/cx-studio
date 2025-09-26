'use client'

import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  PlusIcon,
  EyeIcon,
  DownloadIcon,
  BookTemplateIcon,
  ChevronDownIcon,
  ShoppingCartIcon,
  RocketIcon,
  HeadphonesIcon,
  UtensilsIcon,
  CreditCardIcon,
  HeartIcon,
  TrendingUpIcon,
  GraduationCapIcon,
  SmartphoneIcon,
  CalendarIcon,
  UsersIcon,
  ShieldIcon
} from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { TemplatePreviewModal } from '@/components/templates/TemplatePreviewModal'
import { getSharedTemplates, TEMPLATE_INDUSTRIES, getCategorizedTemplates } from '@/data/templates'

const getTemplates = getSharedTemplates

// Map icon names to icon components
const getTemplateIcon = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    'ShoppingCartIcon': ShoppingCartIcon,
    'RocketIcon': RocketIcon,
    'HeadphonesIcon': HeadphonesIcon,
    'UtensilsIcon': UtensilsIcon,
    'CreditCardIcon': CreditCardIcon,
    'HeartIcon': HeartIcon,
    'TrendingUpIcon': TrendingUpIcon,
    'GraduationCapIcon': GraduationCapIcon,
    'SmartphoneIcon': SmartphoneIcon,
    'CalendarIcon': CalendarIcon,
    'UsersIcon': UsersIcon,
    'ShieldIcon': ShieldIcon,
  }

  return iconMap[iconName] || BookTemplateIcon
}

export default function TemplatesPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const templates = getTemplates(t)

  // Get categorized templates
  const categorizedTemplates = React.useMemo(() => {
    let allTemplates = templates

    // Filter by industry if selected
    if (selectedIndustry) {
      allTemplates = allTemplates.filter(template =>
        template.industry.toLowerCase() === selectedIndustry.toLowerCase()
      )
    }

    // Sort templates
    if (sortBy) {
      allTemplates = [...allTemplates].sort((a, b) => {
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

    // If no industry filter is applied, return categorized templates
    if (!selectedIndustry) {
      return getCategorizedTemplates(allTemplates)
    }

    // If industry filter is applied, return all templates in a single category
    return { 'Filtered Results': allTemplates }
  }, [templates, selectedIndustry, sortBy])

  // Get total template count for display
  const totalTemplates = Object.values(categorizedTemplates).flat().length

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
            <div className="relative">
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none bg-white"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
              <option value="">All Industries</option>
              {TEMPLATE_INDUSTRIES.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
              </select>
              <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
              <option value="">{t('templates.filters.sortBy')}</option>
              <option value="name">{t('templates.filters.name')}</option>
              <option value="industry">{t('templates.filters.industry')}</option>
              <option value="touchpoints">{t('templates.filters.touchpoints')}</option>
              </select>
              <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {totalTemplates} templates
          </div>
        </div>

        {/* Categorized Templates */}
        {Object.entries(categorizedTemplates).map(([categoryName, categoryTemplates]) => (
          <div key={categoryName} className="mb-8">
            {categoryName !== 'Filtered Results' && (
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                {categoryName}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({categoryTemplates.length} templates)
                </span>
              </h3>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryTemplates.map((template) => (
            <Card key={template.id} className="border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out hover:bg-white/80 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 group-hover:scale-110 transition-all duration-300 ease-out">
                    {React.createElement(getTemplateIcon(template.icon), {
                      className: "h-6 w-6 text-slate-600 group-hover:text-slate-700 transition-colors duration-200"
                    })}
                  </div>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                    {template.industry}
                  </span>
                </div>
                <CardTitle className="text-lg leading-tight">{template.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {template.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{template.touchpoints} touchpoints</span>
                  <span>{template.stages} stages</span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(template)}
                    className="flex-1 hover:scale-105 transform transition-all duration-200 ease-out"
                  >
                    <EyeIcon className="h-3 w-3 mr-1 transition-transform duration-200 group-hover:scale-110" />
                    Preview
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 hover:scale-105 transform transition-all duration-200 ease-out hover:shadow-lg"
                  >
                    <PlusIcon className="h-3 w-3 mr-1 transition-transform duration-200 group-hover:rotate-90" />
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
              ))}

              {/* Custom Template Card - only show in the last category */}
              {categoryName === Object.keys(categorizedTemplates)[Object.keys(categorizedTemplates).length - 1] && (
                <Card className="border-2 border-dashed border-gray-300 shadow-none hover:border-slate-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group hover:bg-slate-50/30" onClick={handleCreateCustomTemplate}>
                  <CardContent className="pt-6 h-full flex flex-col">
                    <div className="text-center py-12 flex-1 flex flex-col justify-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-100 group-hover:scale-110 transition-all duration-300 ease-out">
                        <PlusIcon className="w-8 h-8 text-gray-400 group-hover:text-slate-600 group-hover:rotate-90 transition-all duration-300" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-500 mb-2 group-hover:text-slate-700 transition-colors duration-200">
                        Create Custom Template
                      </h3>
                      <p className="text-sm text-gray-400 group-hover:text-slate-600 transition-colors duration-200">
                        Start with a blank template and customize it
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ))}
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