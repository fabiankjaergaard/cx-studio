'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useLanguage } from '@/contexts/LanguageContext'
import { PersonaTemplatePreviewModal } from '@/components/personas/PersonaTemplatePreviewModal'
import {
  BookTemplateIcon,
  UserIcon,
  ShoppingCartIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  HeartIcon,
  BuildingIcon,
  CarIcon,
  GamepadIcon,
  PlaneIcon,
  CoffeeIcon,
  ChevronDownIcon,
  EyeIcon,
  DownloadIcon,
  PlusIcon,
  RocketIcon,
  CreditCardIcon,
  UtensilsIcon
} from 'lucide-react'

interface PersonaTemplate {
  id: string
  name: string
  description: string
  category: string
  age: string
  occupation: string
  goals: string[]
  painPoints: string[]
  demographics: {
    income: string
    education: string
    family: string
  }
  behaviors: string[]
  motivations: string[]
  avatar: string
  icon: string
}

// Helper function to get persona template data with translations
const getPersonaTemplates = (t: (key: string) => string): PersonaTemplate[] => [
  // E-commerce
  {
    id: 'ecommerce-frequent-shopper',
    name: t('persona.emma.name'),
    description: t('persona.emma.description'),
    category: t('personaTemplates.ecommerce'),
    age: '28',
    occupation: t('persona.emma.occupation'),
    avatar: '',
    icon: 'ShoppingCartIcon',
    goals: [
      t('persona.emma.goal1'),
      t('persona.emma.goal2'),
      t('persona.emma.goal3'),
      t('persona.emma.goal4')
    ],
    painPoints: [
      t('persona.emma.painPoint1'),
      t('persona.emma.painPoint2'),
      t('persona.emma.painPoint3'),
      t('persona.emma.painPoint4')
    ],
    demographics: {
      income: t('persona.emma.income'),
      education: t('persona.emma.education'),
      family: t('persona.emma.family')
    },
    behaviors: [
      t('persona.emma.behavior1'),
      t('persona.emma.behavior2'),
      t('persona.emma.behavior3'),
      t('persona.emma.behavior4')
    ],
    motivations: [
      t('persona.emma.motivation1'),
      t('persona.emma.motivation2'),
      t('persona.emma.motivation3'),
      t('persona.emma.motivation4')
    ]
  },
  {
    id: 'ecommerce-bargain-hunter',
    name: t('persona.bengt.name'),
    description: t('persona.bengt.description'),
    category: t('personaTemplates.ecommerce'),
    age: '52',
    occupation: t('persona.bengt.occupation'),
    avatar: '',
    icon: 'ShoppingCartIcon',
    goals: [
      t('persona.bengt.goal1'),
      t('persona.bengt.goal2'),
      t('persona.bengt.goal3'),
      t('persona.bengt.goal4')
    ],
    painPoints: [
      t('persona.bengt.painPoint1'),
      t('persona.bengt.painPoint2'),
      t('persona.bengt.painPoint3'),
      t('persona.bengt.painPoint4')
    ],
    demographics: {
      income: t('persona.bengt.income'),
      education: t('persona.bengt.education'),
      family: t('persona.bengt.family')
    },
    behaviors: [
      t('persona.bengt.behavior1'),
      t('persona.bengt.behavior2'),
      t('persona.bengt.behavior3'),
      t('persona.bengt.behavior4')
    ],
    motivations: [
      t('persona.bengt.motivation1'),
      t('persona.bengt.motivation2'),
      t('persona.bengt.motivation3'),
      t('persona.bengt.motivation4')
    ]
  },

  // SaaS/Teknologi
  {
    id: 'saas-startup-founder',
    name: t('persona.alex.name'),
    description: t('persona.alex.description'),
    category: t('personaTemplates.saas'),
    age: '34',
    occupation: t('persona.alex.occupation'),
    avatar: '',
    icon: 'RocketIcon',
    goals: [
      t('persona.alex.goal1'),
      t('persona.alex.goal2'),
      t('persona.alex.goal3'),
      t('persona.alex.goal4')
    ],
    painPoints: [
      t('persona.alex.painPoint1'),
      t('persona.alex.painPoint2'),
      t('persona.alex.painPoint3'),
      t('persona.alex.painPoint4')
    ],
    demographics: {
      income: t('persona.alex.income'),
      education: t('persona.alex.education'),
      family: t('persona.alex.family')
    },
    behaviors: [
      t('persona.alex.behavior1'),
      t('persona.alex.behavior2'),
      t('persona.alex.behavior3'),
      t('persona.alex.behavior4')
    ],
    motivations: [
      t('persona.alex.motivation1'),
      t('persona.alex.motivation2'),
      t('persona.alex.motivation3'),
      t('persona.alex.motivation4')
    ]
  },

  // Utbildning
  {
    id: 'education-teacher',
    name: t('persona.sara.name'),
    description: t('persona.sara.description'),
    category: t('personaTemplates.education'),
    age: '41',
    occupation: t('persona.sara.occupation'),
    avatar: '',
    icon: 'GraduationCapIcon',
    goals: [
      t('persona.sara.goal1'),
      t('persona.sara.goal2'),
      t('persona.sara.goal3'),
      t('persona.sara.goal4')
    ],
    painPoints: [
      t('persona.sara.painPoint1'),
      t('persona.sara.painPoint2'),
      t('persona.sara.painPoint3'),
      t('persona.sara.painPoint4')
    ],
    demographics: {
      income: t('persona.sara.income'),
      education: t('persona.sara.education'),
      family: t('persona.sara.family')
    },
    behaviors: [
      t('persona.sara.behavior1'),
      t('persona.sara.behavior2'),
      t('persona.sara.behavior3'),
      t('persona.sara.behavior4')
    ],
    motivations: [
      t('persona.sara.motivation1'),
      t('persona.sara.motivation2'),
      t('persona.sara.motivation3'),
      t('persona.sara.motivation4')
    ]
  },

  // Hälsovård
  {
    id: 'healthcare-patient',
    name: t('persona.margareta.name'),
    description: t('persona.margareta.description'),
    category: t('personaTemplates.healthcare'),
    age: '67',
    occupation: t('persona.margareta.occupation'),
    avatar: '',
    icon: 'HeartIcon',
    goals: [
      t('persona.margareta.goal1'),
      t('persona.margareta.goal2'),
      t('persona.margareta.goal3'),
      t('persona.margareta.goal4')
    ],
    painPoints: [
      t('persona.margareta.painPoint1'),
      t('persona.margareta.painPoint2'),
      t('persona.margareta.painPoint3'),
      t('persona.margareta.painPoint4')
    ],
    demographics: {
      income: t('persona.margareta.income'),
      education: t('persona.margareta.education'),
      family: t('persona.margareta.family')
    },
    behaviors: [
      t('persona.margareta.behavior1'),
      t('persona.margareta.behavior2'),
      t('persona.margareta.behavior3'),
      t('persona.margareta.behavior4')
    ],
    motivations: [
      t('persona.margareta.motivation1'),
      t('persona.margareta.motivation2'),
      t('persona.margareta.motivation3'),
      t('persona.margareta.motivation4')
    ]
  },

  // Finans
  {
    id: 'finance-young-professional',
    name: t('persona.david.name'),
    description: t('persona.david.description'),
    category: t('personaTemplates.finance'),
    age: '26',
    occupation: t('persona.david.occupation'),
    avatar: '',
    icon: 'CreditCardIcon',
    goals: [
      t('persona.david.goal1'),
      t('persona.david.goal2'),
      t('persona.david.goal3'),
      t('persona.david.goal4')
    ],
    painPoints: [
      t('persona.david.painPoint1'),
      t('persona.david.painPoint2'),
      t('persona.david.painPoint3'),
      t('persona.david.painPoint4')
    ],
    demographics: {
      income: t('persona.david.income'),
      education: t('persona.david.education'),
      family: t('persona.david.family')
    },
    behaviors: [
      t('persona.david.behavior1'),
      t('persona.david.behavior2'),
      t('persona.david.behavior3'),
      t('persona.david.behavior4')
    ],
    motivations: [
      t('persona.david.motivation1'),
      t('persona.david.motivation2'),
      t('persona.david.motivation3'),
      t('persona.david.motivation4')
    ]
  },

  // Resa & Turism
  {
    id: 'travel-adventurer',
    name: t('persona.lisa.name'),
    description: t('persona.lisa.description'),
    category: t('personaTemplates.travel'),
    age: '29',
    occupation: t('persona.lisa.occupation'),
    avatar: '',
    icon: 'PlaneIcon',
    goals: [
      t('persona.lisa.goal1'),
      t('persona.lisa.goal2'),
      t('persona.lisa.goal3'),
      t('persona.lisa.goal4')
    ],
    painPoints: [
      t('persona.lisa.painPoint1'),
      t('persona.lisa.painPoint2'),
      t('persona.lisa.painPoint3'),
      t('persona.lisa.painPoint4')
    ],
    demographics: {
      income: t('persona.lisa.income'),
      education: t('persona.lisa.education'),
      family: t('persona.lisa.family')
    },
    behaviors: [
      t('persona.lisa.behavior1'),
      t('persona.lisa.behavior2'),
      t('persona.lisa.behavior3'),
      t('persona.lisa.behavior4')
    ],
    motivations: [
      t('persona.lisa.motivation1'),
      t('persona.lisa.motivation2'),
      t('persona.lisa.motivation3'),
      t('persona.lisa.motivation4')
    ]
  },

  // Food & Beverage
  {
    id: 'food-health-conscious',
    name: t('persona.anna.name'),
    description: t('persona.anna.description'),
    category: t('personaTemplates.foodBeverage'),
    age: '33',
    occupation: t('persona.anna.occupation'),
    avatar: '',
    icon: 'UtensilsIcon',
    goals: [
      t('persona.anna.goal1'),
      t('persona.anna.goal2'),
      t('persona.anna.goal3'),
      t('persona.anna.goal4')
    ],
    painPoints: [
      t('persona.anna.painPoint1'),
      t('persona.anna.painPoint2'),
      t('persona.anna.painPoint3'),
      t('persona.anna.painPoint4')
    ],
    demographics: {
      income: t('persona.anna.income'),
      education: t('persona.anna.education'),
      family: t('persona.anna.family')
    },
    behaviors: [
      t('persona.anna.behavior1'),
      t('persona.anna.behavior2'),
      t('persona.anna.behavior3'),
      t('persona.anna.behavior4')
    ],
    motivations: [
      t('persona.anna.motivation1'),
      t('persona.anna.motivation2'),
      t('persona.anna.motivation3'),
      t('persona.anna.motivation4')
    ]
  }
]

// Helper function to get categories with translations
const getCategories = (t: (key: string) => string): string[] => [
  t('personaTemplates.allCategories'),
  t('personaTemplates.ecommerce'),
  t('personaTemplates.saas'),
  t('personaTemplates.education'),
  t('personaTemplates.healthcare'),
  t('personaTemplates.finance'),
  t('personaTemplates.travel'),
  t('personaTemplates.foodBeverage')
]

// Map icon names to icon components
const getPersonaIcon = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    'ShoppingCartIcon': ShoppingCartIcon,
    'RocketIcon': RocketIcon,
    'GraduationCapIcon': GraduationCapIcon,
    'HeartIcon': HeartIcon,
    'CreditCardIcon': CreditCardIcon,
    'PlaneIcon': PlaneIcon,
    'UtensilsIcon': UtensilsIcon,
  }

  return iconMap[iconName] || UserIcon
}

// Get category-specific colors using Kustra Color System
const getCategoryColors = (category: string) => {
  const colorMap: { [key: string]: { bg: string, badge: string, icon: string } } = {
    'E-commerce': {
      bg: 'bg-[#F4C542]', // Golden Sun
      badge: 'bg-[#F4C542]/10 text-[#F4C542]',
      icon: 'text-slate-700'
    },
    'SaaS': {
      bg: 'bg-[#778DB0]', // Calm Blue
      badge: 'bg-[#778DB0]/10 text-[#778DB0]',
      icon: 'text-white'
    },
    'Education': {
      bg: 'bg-[#A67FB5]', // Soft Purple
      badge: 'bg-[#A67FB5]/10 text-[#A67FB5]',
      icon: 'text-white'
    },
    'Healthcare': {
      bg: 'bg-[#77BB92]', // Fresh Green
      badge: 'bg-[#77BB92]/10 text-[#77BB92]',
      icon: 'text-white'
    },
    'Finance': {
      bg: 'bg-[#778DB0]', // Calm Blue
      badge: 'bg-[#778DB0]/10 text-[#778DB0]',
      icon: 'text-white'
    },
    'Travel': {
      bg: 'bg-[#E89FAB]', // Warm Pink
      badge: 'bg-[#E89FAB]/10 text-[#E89FAB]',
      icon: 'text-white'
    },
    'Food & Beverage': {
      bg: 'bg-[#ED6B5A]', // Vibrant Coral
      badge: 'bg-[#ED6B5A]/10 text-[#ED6B5A]',
      icon: 'text-white'
    }
  }

  return colorMap[category] || {
    bg: 'bg-slate-100',
    badge: 'bg-slate-100 text-slate-700',
    icon: 'text-slate-600'
  }
}

export default function PersonaTemplatesPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState(t('personaTemplates.allCategories'))
  const [selectedTemplate, setSelectedTemplate] = useState<PersonaTemplate | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Get dynamic data
  const personaTemplates = getPersonaTemplates(t)
  const categories = getCategories(t)

  const filteredTemplates = selectedCategory === t('personaTemplates.allCategories')
    ? personaTemplates
    : personaTemplates.filter(template => template.category === selectedCategory)

  const handleUseTemplate = (template: PersonaTemplate) => {
    // Navigate to create persona page with template data
    const templateData = encodeURIComponent(JSON.stringify(template))
    router.push(`/personas/create?template=${templateData}`)
  }

  const handlePreview = (template: PersonaTemplate) => {
    setSelectedTemplate(template)
    setIsPreviewOpen(true)
  }

  return (
    <div className="h-full flex flex-col grid-background">
      <Header
        title={t('nav.personaTemplates')}
        description={t('personaTemplates.description')}
      />

      <div className="flex-1 p-6 overflow-auto">
        {/* Filter Section */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex space-x-4">
            <div className="relative">
              <select
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {filteredTemplates.length} {filteredTemplates.length === 1 ? t('personaTemplates.resultsCount.single') : t('personaTemplates.resultsCount.plural')}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const categoryColors = getCategoryColors(template.category)
            return (
            <Card key={template.id} className="border-0 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out hover:bg-white/80 cursor-pointer group">
              <CardContent className="p-6">
                {/* Icon and category */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 ease-out ${categoryColors.bg}`}>
                    {React.createElement(getPersonaIcon(template.icon), {
                      className: `h-6 w-6 ${categoryColors.icon} group-hover:scale-110 transition-all duration-200`
                    })}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${categoryColors.badge}`}>
                    {template.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold leading-tight text-gray-900 mb-3">
                  {template.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {template.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{template.age} {t('personaTemplates.years')} • {template.occupation}</span>
                  <span>{template.goals.length} {t('personaTemplates.goals')}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(template)}
                    className="flex-1 hover:scale-105 transform transition-all duration-200 ease-out"
                  >
                    <EyeIcon className="h-3 w-3 mr-1 transition-transform duration-200 group-hover:scale-110" />
                    {t('personaTemplates.preview')}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 hover:scale-105 transform transition-all duration-200 ease-out hover:shadow-lg"
                  >
                    <PlusIcon className="h-3 w-3 mr-1 transition-transform duration-200 group-hover:rotate-90" />
                    {t('personaTemplates.useTemplate')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
          })}

          {/* Custom Template Card */}
          <Card className="border-2 border-dashed border-gray-300 shadow-none hover:border-slate-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group hover:bg-slate-50/30" onClick={() => router.push('/personas/create')}>
            <CardContent className="pt-6 h-full flex flex-col">
              <div className="text-center py-12 flex-1 flex flex-col justify-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-100 group-hover:scale-110 transition-all duration-300 ease-out">
                  <PlusIcon className="w-8 h-8 text-gray-400 group-hover:text-slate-600 group-hover:rotate-90 transition-all duration-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-500 mb-2 group-hover:text-slate-700 transition-colors duration-200">
                  {t('personaTemplates.createCustom')}
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-slate-600 transition-colors duration-200">
                  {t('personaTemplates.createCustomDescription')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <UserIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('personaTemplates.noTemplatesFound')}
            </h3>
            <p className="text-gray-600">
              {t('personaTemplates.noTemplatesDescription')}
            </p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PersonaTemplatePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={selectedTemplate}
        onUseTemplate={handleUseTemplate}
      />
    </div>
  )
}