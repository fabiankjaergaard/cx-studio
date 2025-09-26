'use client'

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  DownloadIcon,
  UserIcon,
  MapPinIcon,
  BriefcaseIcon,
  HeartIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  TargetIcon,
  GraduationCapIcon,
  DollarSignIcon,
  UsersIcon,
  SparklesIcon
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

interface PersonaTemplatePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  template: PersonaTemplate | null
  onUseTemplate: (template: PersonaTemplate) => void
}

export function PersonaTemplatePreviewModal({
  isOpen,
  onClose,
  template,
  onUseTemplate
}: PersonaTemplatePreviewModalProps) {
  if (!template) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Förhandsgranska: ${template.name}`}
      maxWidth="4xl"
    >
      <div className="space-y-8">
        {/* Header Section */}
        <div className="bg-slate-50 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-slate-200 transition-colors">
              <UserIcon className="w-8 h-8 text-slate-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                <Badge className="bg-slate-100 text-slate-700">{template.category}</Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <span>{template.age} år</span>
                <span>•</span>
                <div className="flex items-center">
                  <BriefcaseIcon className="w-4 h-4 mr-1" />
                  <span>{template.occupation}</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{template.description}</p>
            </div>
          </div>
        </div>

        {/* Demographics */}
        <div className="bg-white border rounded-lg p-5">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <UserIcon className="w-4 h-4 mr-2 text-slate-600" />
            Demografisk information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="flex items-center mb-1">
                <DollarSignIcon className="w-4 h-4 mr-1 text-slate-500" />
                <span className="font-medium text-gray-700">Inkomst</span>
              </div>
              <p className="text-gray-600">{template.demographics.income}</p>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <GraduationCapIcon className="w-4 h-4 mr-1 text-slate-500" />
                <span className="font-medium text-gray-700">Utbildning</span>
              </div>
              <p className="text-gray-600">{template.demographics.education}</p>
            </div>
            <div>
              <div className="flex items-center mb-1">
                <UsersIcon className="w-4 h-4 mr-1 text-slate-500" />
                <span className="font-medium text-gray-700">Familj</span>
              </div>
              <p className="text-gray-600">{template.demographics.family}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Goals & Needs */}
          <div className="bg-white border rounded-lg p-5 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                  <HeartIcon className="w-4 h-4 text-slate-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Mål & Behov</h4>
              </div>
              <Badge className="bg-slate-100 text-slate-700">{template.goals.length}</Badge>
            </div>
            <ul className="space-y-2">
              {template.goals.map((goal, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pain Points */}
          <div className="bg-white border rounded-lg p-5 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                  <AlertTriangleIcon className="w-4 h-4 text-slate-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Utmaningar</h4>
              </div>
              <Badge className="bg-slate-100 text-slate-700">{template.painPoints.length}</Badge>
            </div>
            <ul className="space-y-2">
              {template.painPoints.map((pain, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{pain}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Behaviors */}
          <div className="bg-white border rounded-lg p-5 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUpIcon className="w-4 h-4 text-slate-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Beteenden</h4>
              </div>
              <Badge className="bg-slate-100 text-slate-700">{template.behaviors.length}</Badge>
            </div>
            <ul className="space-y-2">
              {template.behaviors.map((behavior, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{behavior}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Motivations */}
          <div className="bg-white border rounded-lg p-5 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                  <TargetIcon className="w-4 h-4 text-slate-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Motivationer</h4>
              </div>
              <Badge className="bg-slate-100 text-slate-700">{template.motivations.length}</Badge>
            </div>
            <ul className="space-y-2">
              {template.motivations.map((motivation, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{motivation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="bg-slate-50 rounded-lg p-6">
          <h4 className="text-center font-semibold text-gray-900 mb-4">Översikt</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-700">{template.goals.length}</div>
              <div className="text-xs text-gray-500">Mål & Behov</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-700">{template.painPoints.length}</div>
              <div className="text-xs text-gray-500">Utmaningar</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-700">{template.behaviors.length}</div>
              <div className="text-xs text-gray-500">Beteenden</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-700">{template.motivations.length}</div>
              <div className="text-xs text-gray-500">Motivationer</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Stäng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onUseTemplate(template)
              onClose()
            }}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Använd denna mall
          </Button>
        </div>
      </div>
    </Modal>
  )
}