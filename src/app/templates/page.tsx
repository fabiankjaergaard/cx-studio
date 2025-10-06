'use client'

import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import {
  PlusIcon,
  EyeIcon,
  DownloadIcon,
  BookTemplateIcon,
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
import { Tooltip } from '@/components/ui/Tooltip'

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

// Get category-specific colors
const getCategoryColors = (industry: string) => {
  const colorMap: { [key: string]: { gradient: string, badge: string, icon: string } } = {
    'E-commerce': {
      gradient: 'linear-gradient(135deg, #FEF3E2 0%, #F0E4D0 100%)',
      badge: 'bg-orange-100 text-orange-700',
      icon: 'text-orange-600'
    },
    'Technology': {
      gradient: 'linear-gradient(135deg, #E0F2FE 0%, #BFDBFE 100%)',
      badge: 'bg-blue-100 text-blue-700',
      icon: 'text-blue-600'
    },
    'Service': {
      gradient: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
      badge: 'bg-green-100 text-green-700',
      icon: 'text-green-600'
    },
    'Restaurant': {
      gradient: 'linear-gradient(135deg, #FEF7F0 0%, #FDE8D0 100%)',
      badge: 'bg-amber-100 text-amber-700',
      icon: 'text-amber-600'
    },
    'Finance': {
      gradient: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
      badge: 'bg-cyan-100 text-cyan-700',
      icon: 'text-cyan-600'
    },
    'Healthcare': {
      gradient: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
      badge: 'bg-pink-100 text-pink-700',
      icon: 'text-pink-600'
    },
    'B2B': {
      gradient: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
      badge: 'bg-gray-100 text-gray-700',
      icon: 'text-gray-600'
    },
    'Education': {
      gradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
      badge: 'bg-yellow-100 text-yellow-700',
      icon: 'text-yellow-600'
    },
    'Events': {
      gradient: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
      badge: 'bg-purple-100 text-purple-700',
      icon: 'text-purple-600'
    },
    'HR': {
      gradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
      badge: 'bg-emerald-100 text-emerald-700',
      icon: 'text-emerald-600'
    },
    'Insurance': {
      gradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
      badge: 'bg-indigo-100 text-indigo-700',
      icon: 'text-indigo-600'
    }
  }

  return colorMap[industry] || {
    gradient: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
    badge: 'bg-slate-100 text-slate-700',
    icon: 'text-slate-600'
  }
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
    // Create journey map ID and navigate directly to journey map editor with template data
    const templateId = template.id
    const journeyMapId = `template-${templateId}-${Date.now()}`

    // Navigate directly to journey map editor with template parameter
    router.push(`/journey-maps/${journeyMapId}?template=${templateId}&name=${encodeURIComponent(template.name)}`)
  }
  return (
    <div className="h-full flex flex-col grid-background">
      <Header
        title={t('templates.title')}
        description={t('templates.subtitle')}
      />

      <div className="flex-1 p-6 overflow-auto bg-transparent">
        {/* Filter/Search Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex space-x-4">
            <Select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              <option value="">All Industries</option>
              {TEMPLATE_INDUSTRIES.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </Select>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">{t('templates.filters.sortBy')}</option>
              <option value="name">{t('templates.filters.name')}</option>
              <option value="industry">{t('templates.filters.industry')}</option>
              <option value="touchpoints">{t('templates.filters.touchpoints')}</option>
            </Select>
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
              {categoryTemplates.map((template) => {
                const categoryColors = getCategoryColors(template.industry)
                return (
            <Card key={template.id} className="hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer group bg-white rounded-2xl border-gray-200 shadow-card hover:shadow-card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 ease-out" style={{background: categoryColors.gradient}}>
                    {React.createElement(getTemplateIcon(template.icon), {
                      className: `h-6 w-6 ${categoryColors.icon} group-hover:scale-110 transition-all duration-200`
                    })}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${categoryColors.badge}`}>
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
                  <Tooltip content="Preview template" position="bottom">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(template)}
                      className="flex-1 hover:scale-105 transform transition-all duration-200 ease-out"
                    >
                      <EyeIcon className="h-3 w-3 mr-1 transition-transform duration-200 group-hover:scale-110" />
                      Preview
                    </Button>
                  </Tooltip>
                  <Tooltip content="Use this template" position="bottom">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleUseTemplate(template)}
                      className="flex-1 hover:scale-105 transform transition-all duration-200 ease-out hover:shadow-lg"
                    >
                      <PlusIcon className="h-3 w-3 mr-1 transition-transform duration-200 group-hover:rotate-90" />
                      Use Template
                    </Button>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
                )
              })}

              {/* Custom Template Card - only show in the last category */}
              {categoryName === Object.keys(categorizedTemplates)[Object.keys(categorizedTemplates).length - 1] && (
                <Card className="border-2 border-dashed border-gray-200 hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer group bg-white rounded-2xl shadow-subtle hover:shadow-card" onClick={handleCreateCustomTemplate}>
                  <CardContent className="pt-6 h-full flex flex-col">
                    <div className="text-center py-12 flex-1 flex flex-col justify-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 ease-out bg-gradient-to-br from-primary-50 to-primary-200">
                        <PlusIcon className="w-8 h-8 text-gray-600 group-hover:text-slate-600 group-hover:rotate-90 transition-all duration-300 ease-out" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-500 mb-2 group-hover:text-slate-700 transition-colors duration-200">
                        Create Custom Template
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-slate-600 transition-colors duration-200">
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