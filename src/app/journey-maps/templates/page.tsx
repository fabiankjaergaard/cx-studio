'use client'

import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PlusIcon, EyeIcon, DownloadIcon, BookTemplateIcon, ChevronDownIcon, ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { TemplatePreviewModal } from '@/components/templates/TemplatePreviewModal'
import Link from 'next/link'

const getJourneyMapTemplates = (t: (key: string) => string) => [
  {
    id: '1',
    name: 'E-commerce Customer Journey',
    description: 'Complete customer journey from awareness to purchase and post-purchase for online retail',
    industry: 'E-commerce',
    touchpoints: 8,
    stages: 5,
    preview: '/api/templates/1/preview'
  },
  {
    id: '2',
    name: 'SaaS Onboarding',
    description: 'User onboarding for SaaS products from registration to activation',
    industry: 'Technology',
    touchpoints: 6,
    stages: 4,
    preview: '/api/templates/2/preview'
  },
  {
    id: '3',
    name: 'Customer Service Journey',
    description: 'Customer service process from problem identification to resolution',
    industry: 'Service',
    touchpoints: 7,
    stages: 5,
    preview: '/api/templates/3/preview'
  },
  {
    id: '4',
    name: 'Restaurant Experience',
    description: 'Guest experience from booking to post-visit engagement',
    industry: 'Restaurant',
    touchpoints: 9,
    stages: 6,
    preview: '/api/templates/4/preview'
  },
  {
    id: '5',
    name: 'Banking Loan Process',
    description: 'Loan application process from initial inquiry to disbursement',
    industry: 'Finance',
    touchpoints: 10,
    stages: 5,
    preview: '/api/templates/5/preview'
  }
]

export default function JourneyMapTemplatesPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const templates = getJourneyMapTemplates(t)

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

  const handleUseTemplate = (template: any) => {
    // Navigate to journey-maps with template parameter
    router.push(`/journey-maps/new?template=${template.id}&name=${encodeURIComponent(template.name)}`)
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header
        title="Journey Map Templates"
        description="Choose a journey map template that fits your project needs"
        actions={
          <Link href="/journey-maps/new">
            <Button variant="outline">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Filter/Search Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex space-x-4">
            <div className="relative">
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                <option value="">All Industries</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Technology">Technology</option>
                <option value="Service">Service</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Finance">Finance</option>
              </select>
              <ChevronDownIcon className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="relative">
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="name">Name</option>
                <option value="industry">Industry</option>
                <option value="touchpoints">Number of touchpoints</option>
              </select>
              <ChevronDownIcon className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {filteredAndSortedTemplates.length} templates
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTemplates.map((template) => (
            <Card key={template.id} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <BookTemplateIcon className="h-6 w-6 text-slate-600" />
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
                    className="flex-1"
                  >
                    <EyeIcon className="h-3 w-3 mr-1" />
                    Preview
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1"
                  >
                    <PlusIcon className="h-3 w-3 mr-1" />
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Template Preview Modal */}
      {isPreviewOpen && selectedTemplate && (
        <TemplatePreviewModal
          template={selectedTemplate}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onUse={() => handleUseTemplate(selectedTemplate)}
        />
      )}
    </div>
  )
}