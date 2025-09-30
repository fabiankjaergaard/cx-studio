'use client'

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { DownloadIcon, XIcon } from 'lucide-react'
import { useRef, useEffect } from 'react'
import twemoji from 'twemoji'
import { useLanguage } from '@/contexts/LanguageContext'

interface TemplatePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  template: {
    id: string
    name: string
    description: string
    industry: string
    touchpoints: number
    stages: number
  } | null
  onUseTemplate: (template: any) => void
}

// Component to render Twemoji
function TwemojiEmoji({ emoji, size = 18 }: { emoji: string; size?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      const html = twemoji.parse(emoji, {
        folder: 'svg',
        ext: '.svg',
        base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
      })
      ref.current.innerHTML = html

      // Set size for the generated img elements
      const imgs = ref.current.querySelectorAll('img')
      imgs.forEach(img => {
        img.style.width = `${size}px`
        img.style.height = `${size}px`
        img.style.display = 'inline-block'
        img.style.verticalAlign = 'middle'
      })
    }
  }, [emoji, size])

  return <span ref={ref} style={{ display: 'inline-block', lineHeight: 1 }}></span>
}

export function TemplatePreviewModal({
  isOpen,
  onClose,
  template,
  onUseTemplate
}: TemplatePreviewModalProps) {
  const { t } = useLanguage()
  if (!template) return null

  // Function to get translated category name
  const getCategoryName = (categoryName: string) => {
    switch (categoryName) {
      case 'Åtgärder': return t('templates.categories.actions')
      case 'Känslor': return t('templates.categories.emotions')
      case 'Smärtpunkter': return t('templates.categories.painPoints')
      case 'Möjligheter': return t('templates.categories.opportunities')
      case 'Touchpoints': return t('templates.categories.touchpoints')
      default: return categoryName
    }
  }

  // Mock preview data based on template ID
  const getPreviewData = (templateId: string) => {
    switch (templateId) {
      case '1': // E-commerce
        return {
          stages: [
            { name: t('templates.ecommerce.stages.awareness'), description: t('templates.ecommerce.stages.awarenessDesc') },
            { name: t('templates.ecommerce.stages.purchase'), description: t('templates.ecommerce.stages.purchaseDesc') },
            { name: t('templates.ecommerce.stages.usage'), description: t('templates.ecommerce.stages.usageDesc') },
            { name: t('templates.ecommerce.stages.loyalty'), description: t('templates.ecommerce.stages.loyaltyDesc') }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: [
                t('templates.ecommerce.actions.1'),
                t('templates.ecommerce.actions.2'),
                t('templates.ecommerce.actions.3'),
                t('templates.ecommerce.actions.4')
              ]
            },
            {
              name: 'Känslor',
              examples: ['😊', '🤔', '😍', '😊']
            },
            {
              name: 'Smärtpunkter',
              examples: [
                t('templates.ecommerce.painPoints.1'),
                t('templates.ecommerce.painPoints.2'),
                t('templates.ecommerce.painPoints.3'),
                t('templates.ecommerce.painPoints.4')
              ]
            },
            {
              name: 'Möjligheter',
              examples: [
                t('templates.ecommerce.opportunities.1'),
                t('templates.ecommerce.opportunities.2'),
                t('templates.ecommerce.opportunities.3'),
                t('templates.ecommerce.opportunities.4')
              ]
            }
          ]
        }
      case '2': // SaaS
        return {
          stages: [
            { name: t('templates.saas.stages.awareness'), description: t('templates.saas.stages.awarenessDesc') },
            { name: t('templates.saas.stages.evaluation'), description: t('templates.saas.stages.evaluationDesc') },
            { name: t('templates.saas.stages.onboarding'), description: t('templates.saas.stages.onboardingDesc') },
            { name: t('templates.saas.stages.usage'), description: t('templates.saas.stages.usageDesc') }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: [
                t('templates.saas.actions.1'),
                t('templates.saas.actions.2'),
                t('templates.saas.actions.3'),
                t('templates.saas.actions.4')
              ]
            },
            {
              name: 'Touchpoints',
              examples: [
                t('templates.saas.touchpoints.1'),
                t('templates.saas.touchpoints.2'),
                t('templates.saas.touchpoints.3'),
                t('templates.saas.touchpoints.4')
              ]
            },
            {
              name: 'Känslor',
              examples: ['😊', '😐', '😅', '😊']
            },
            {
              name: 'Smärtpunkter',
              examples: [
                t('templates.saas.painPoints.1'),
                t('templates.saas.painPoints.2'),
                t('templates.saas.painPoints.3'),
                t('templates.saas.painPoints.4')
              ]
            }
          ]
        }
      case '3': // Customer Service
        return {
          stages: [
            { name: t('templates.customerService.stages.contact'), description: t('templates.customerService.stages.contactDesc') },
            { name: t('templates.customerService.stages.identification'), description: t('templates.customerService.stages.identificationDesc') },
            { name: t('templates.customerService.stages.solution'), description: t('templates.customerService.stages.solutionDesc') },
            { name: t('templates.customerService.stages.followup'), description: t('templates.customerService.stages.followupDesc') },
            { name: t('templates.customerService.stages.reflection'), description: t('templates.customerService.stages.reflectionDesc') }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: [
                t('templates.customerService.actions.1'),
                t('templates.customerService.actions.2'),
                t('templates.customerService.actions.3'),
                t('templates.customerService.actions.4'),
                t('templates.customerService.actions.5')
              ]
            },
            {
              name: 'Känslor',
              examples: ['😰', '😔', '🤔', '😊', '😄']
            },
            {
              name: 'Smärtpunkter',
              examples: [
                t('templates.customerService.painPoints.1'),
                t('templates.customerService.painPoints.2'),
                t('templates.customerService.painPoints.3'),
                t('templates.customerService.painPoints.4'),
                t('templates.customerService.painPoints.5')
              ]
            },
            {
              name: 'Möjligheter',
              examples: [
                t('templates.customerService.opportunities.1'),
                t('templates.customerService.opportunities.2'),
                t('templates.customerService.opportunities.3'),
                t('templates.customerService.opportunities.4'),
                t('templates.customerService.opportunities.5')
              ]
            }
          ]
        }
      case '4': // Restaurant
        return {
          stages: [
            { name: t('templates.restaurant.stages.inspiration'), description: t('templates.restaurant.stages.inspirationDesc') },
            { name: t('templates.restaurant.stages.search'), description: t('templates.restaurant.stages.searchDesc') },
            { name: t('templates.restaurant.stages.booking'), description: t('templates.restaurant.stages.bookingDesc') },
            { name: t('templates.restaurant.stages.arrival'), description: t('templates.restaurant.stages.arrivalDesc') },
            { name: t('templates.restaurant.stages.meal'), description: t('templates.restaurant.stages.mealDesc') },
            { name: t('templates.restaurant.stages.departure'), description: t('templates.restaurant.stages.departureDesc') }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: [
                t('templates.restaurant.actions.1'),
                t('templates.restaurant.actions.2'),
                t('templates.restaurant.actions.3'),
                t('templates.restaurant.actions.4'),
                t('templates.restaurant.actions.5'),
                t('templates.restaurant.actions.6')
              ]
            },
            {
              name: 'Känslor',
              examples: ['😋', '🤔', '😊', '😍', '😄', '😊']
            },
            {
              name: 'Touchpoints',
              examples: [
                t('templates.restaurant.touchpoints.1'),
                t('templates.restaurant.touchpoints.2'),
                t('templates.restaurant.touchpoints.3'),
                t('templates.restaurant.touchpoints.4'),
                t('templates.restaurant.touchpoints.5'),
                t('templates.restaurant.touchpoints.6')
              ]
            },
            {
              name: 'Smärtpunkter',
              examples: [
                t('templates.restaurant.painPoints.1'),
                t('templates.restaurant.painPoints.2'),
                t('templates.restaurant.painPoints.3'),
                t('templates.restaurant.painPoints.4'),
                t('templates.restaurant.painPoints.5'),
                t('templates.restaurant.painPoints.6')
              ]
            },
            {
              name: 'Möjligheter',
              examples: [
                t('templates.restaurant.opportunities.1'),
                t('templates.restaurant.opportunities.2'),
                t('templates.restaurant.opportunities.3'),
                t('templates.restaurant.opportunities.4'),
                t('templates.restaurant.opportunities.5'),
                t('templates.restaurant.opportunities.6')
              ]
            }
          ]
        }
      case '5': // Banking
        return {
          stages: [
            { name: t('templates.banking.stages.need'), description: t('templates.banking.stages.needDesc') },
            { name: t('templates.banking.stages.exploration'), description: t('templates.banking.stages.explorationDesc') },
            { name: t('templates.banking.stages.application'), description: t('templates.banking.stages.applicationDesc') },
            { name: t('templates.banking.stages.approval'), description: t('templates.banking.stages.approvalDesc') },
            { name: t('templates.banking.stages.usage'), description: t('templates.banking.stages.usageDesc') }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: [
                t('templates.banking.actions.1'),
                t('templates.banking.actions.2'),
                t('templates.banking.actions.3'),
                t('templates.banking.actions.4'),
                t('templates.banking.actions.5')
              ]
            },
            {
              name: 'Känslor',
              examples: ['🤔', '😰', '🤞', '😰', '😊']
            },
            {
              name: 'Touchpoints',
              examples: [
                t('templates.banking.touchpoints.1'),
                t('templates.banking.touchpoints.2'),
                t('templates.banking.touchpoints.3'),
                t('templates.banking.touchpoints.4'),
                t('templates.banking.touchpoints.5')
              ]
            },
            {
              name: 'Smärtpunkter',
              examples: [
                t('templates.banking.painPoints.1'),
                t('templates.banking.painPoints.2'),
                t('templates.banking.painPoints.3'),
                t('templates.banking.painPoints.4'),
                t('templates.banking.painPoints.5')
              ]
            },
            {
              name: 'Möjligheter',
              examples: [
                t('templates.banking.opportunities.1'),
                t('templates.banking.opportunities.2'),
                t('templates.banking.opportunities.3'),
                t('templates.banking.opportunities.4'),
                t('templates.banking.opportunities.5')
              ]
            }
          ]
        }
      case '6': // Healthcare
        return {
          stages: [
            { name: t('templates.healthcare.stages.symptoms'), description: t('templates.healthcare.stages.symptomsDesc') },
            { name: t('templates.healthcare.stages.assessment'), description: t('templates.healthcare.stages.assessmentDesc') },
            { name: t('templates.healthcare.stages.booking'), description: t('templates.healthcare.stages.bookingDesc') },
            { name: t('templates.healthcare.stages.visit'), description: t('templates.healthcare.stages.visitDesc') },
            { name: t('templates.healthcare.stages.treatment'), description: t('templates.healthcare.stages.treatmentDesc') },
            { name: t('templates.healthcare.stages.followup'), description: t('templates.healthcare.stages.followupDesc') }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: [
                t('templates.healthcare.actions.1'),
                t('templates.healthcare.actions.2'),
                t('templates.healthcare.actions.3'),
                t('templates.healthcare.actions.4'),
                t('templates.healthcare.actions.5'),
                t('templates.healthcare.actions.6')
              ]
            },
            {
              name: 'Känslor',
              examples: ['😟', '😰', '🤞', '😌', '😊', '😄']
            },
            {
              name: 'Touchpoints',
              examples: [
                t('templates.healthcare.touchpoints.1'),
                t('templates.healthcare.touchpoints.2'),
                t('templates.healthcare.touchpoints.3'),
                t('templates.healthcare.touchpoints.4'),
                t('templates.healthcare.touchpoints.5'),
                t('templates.healthcare.touchpoints.6')
              ]
            },
            {
              name: 'Smärtpunkter',
              examples: [
                t('templates.healthcare.painPoints.1'),
                t('templates.healthcare.painPoints.2'),
                t('templates.healthcare.painPoints.3'),
                t('templates.healthcare.painPoints.4'),
                t('templates.healthcare.painPoints.5'),
                t('templates.healthcare.painPoints.6')
              ]
            },
            {
              name: 'Möjligheter',
              examples: [
                t('templates.healthcare.opportunities.1'),
                t('templates.healthcare.opportunities.2'),
                t('templates.healthcare.opportunities.3'),
                t('templates.healthcare.opportunities.4'),
                t('templates.healthcare.opportunities.5'),
                t('templates.healthcare.opportunities.6')
              ]
            }
          ]
        }
      case '7': // B2B Sales
        return {
          stages: [
            { name: t('templates.b2bSales.stages.prospecting'), description: t('templates.b2bSales.stages.prospectingDesc') },
            { name: t('templates.b2bSales.stages.qualification'), description: t('templates.b2bSales.stages.qualificationDesc') },
            { name: t('templates.b2bSales.stages.proposal'), description: t('templates.b2bSales.stages.proposalDesc') },
            { name: t('templates.b2bSales.stages.negotiation'), description: t('templates.b2bSales.stages.negotiationDesc') },
            { name: t('templates.b2bSales.stages.decision'), description: t('templates.b2bSales.stages.decisionDesc') },
            { name: t('templates.b2bSales.stages.implementation'), description: t('templates.b2bSales.stages.implementationDesc') },
            { name: t('templates.b2bSales.stages.relationship'), description: t('templates.b2bSales.stages.relationshipDesc') }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: [
                t('templates.b2bSales.actions.1'),
                t('templates.b2bSales.actions.2'),
                t('templates.b2bSales.actions.3'),
                t('templates.b2bSales.actions.4'),
                t('templates.b2bSales.actions.5'),
                t('templates.b2bSales.actions.6'),
                t('templates.b2bSales.actions.7')
              ]
            },
            {
              name: 'Känslor',
              examples: ['🤔', '😊', '😮', '😰', '🤞', '😌', '😊']
            },
            {
              name: 'Touchpoints',
              examples: [
                t('templates.b2bSales.touchpoints.1'),
                t('templates.b2bSales.touchpoints.2'),
                t('templates.b2bSales.touchpoints.3'),
                t('templates.b2bSales.touchpoints.4'),
                t('templates.b2bSales.touchpoints.5'),
                t('templates.b2bSales.touchpoints.6'),
                t('templates.b2bSales.touchpoints.7')
              ]
            },
            {
              name: 'Smärtpunkter',
              examples: [
                t('templates.b2bSales.painPoints.1'),
                t('templates.b2bSales.painPoints.2'),
                t('templates.b2bSales.painPoints.3'),
                t('templates.b2bSales.painPoints.4'),
                t('templates.b2bSales.painPoints.5'),
                t('templates.b2bSales.painPoints.6'),
                t('templates.b2bSales.painPoints.7')
              ]
            }
          ]
        }
      case '8': // E-learning
        return {
          stages: [
            { name: t('templates.elearning.stages.discovery'), description: t('templates.elearning.stages.discoveryDesc') },
            { name: t('templates.elearning.stages.registration'), description: t('templates.elearning.stages.registrationDesc') },
            { name: t('templates.elearning.stages.learning'), description: t('templates.elearning.stages.learningDesc') },
            { name: t('templates.elearning.stages.assessment'), description: t('templates.elearning.stages.assessmentDesc') },
            { name: t('templates.elearning.stages.completion'), description: t('templates.elearning.stages.completionDesc') }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: [
                t('templates.elearning.actions.1'),
                t('templates.elearning.actions.2'),
                t('templates.elearning.actions.3'),
                t('templates.elearning.actions.4'),
                t('templates.elearning.actions.5')
              ]
            },
            {
              name: 'Känslor',
              examples: ['😊', '😐', '🤓', '😰', '😄']
            },
            {
              name: 'Touchpoints',
              examples: [
                t('templates.elearning.touchpoints.1'),
                t('templates.elearning.touchpoints.2'),
                t('templates.elearning.touchpoints.3'),
                t('templates.elearning.touchpoints.4'),
                t('templates.elearning.touchpoints.5')
              ]
            },
            {
              name: 'Smärtpunkter',
              examples: [
                t('templates.elearning.painPoints.1'),
                t('templates.elearning.painPoints.2'),
                t('templates.elearning.painPoints.3'),
                t('templates.elearning.painPoints.4'),
                t('templates.elearning.painPoints.5')
              ]
            }
          ]
        }
      case '9': // Mobile App Onboarding
        return {
          stages: [
            { name: t('templates.mobileOnboarding.stages.download'), description: t('templates.mobileOnboarding.stages.downloadDesc') },
            { name: t('templates.mobileOnboarding.stages.registration'), description: t('templates.mobileOnboarding.stages.registrationDesc') },
            { name: t('templates.mobileOnboarding.stages.introduction'), description: t('templates.mobileOnboarding.stages.introductionDesc') },
            { name: t('templates.mobileOnboarding.stages.firstUse'), description: t('templates.mobileOnboarding.stages.firstUseDesc') }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: [
                t('templates.mobileOnboarding.actions.1'),
                t('templates.mobileOnboarding.actions.2'),
                t('templates.mobileOnboarding.actions.3'),
                t('templates.mobileOnboarding.actions.4')
              ]
            },
            {
              name: 'Känslor',
              examples: ['😊', '😐', '🤓', '😍']
            },
            {
              name: 'Touchpoints',
              examples: [
                t('templates.mobileOnboarding.touchpoints.1'),
                t('templates.mobileOnboarding.touchpoints.2'),
                t('templates.mobileOnboarding.touchpoints.3'),
                t('templates.mobileOnboarding.touchpoints.4')
              ]
            },
            {
              name: 'Smärtpunkter',
              examples: [
                t('templates.mobileOnboarding.painPoints.1'),
                t('templates.mobileOnboarding.painPoints.2'),
                t('templates.mobileOnboarding.painPoints.3'),
                t('templates.mobileOnboarding.painPoints.4')
              ]
            }
          ]
        }
      case '10': // Event Management
        return {
          stages: [
            { name: t('templates.eventManagement.stages.planning'), description: t('templates.eventManagement.stages.planningDesc') },
            { name: t('templates.eventManagement.stages.registration'), description: t('templates.eventManagement.stages.registrationDesc') },
            { name: t('templates.eventManagement.stages.preparation'), description: t('templates.eventManagement.stages.preparationDesc') },
            { name: t('templates.eventManagement.stages.arrival'), description: t('templates.eventManagement.stages.arrivalDesc') },
            { name: t('templates.eventManagement.stages.participation'), description: t('templates.eventManagement.stages.participationDesc') },
            { name: t('templates.eventManagement.stages.followup'), description: t('templates.eventManagement.stages.followupDesc') }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: [
                t('templates.eventManagement.actions.1'),
                t('templates.eventManagement.actions.2'),
                t('templates.eventManagement.actions.3'),
                t('templates.eventManagement.actions.4'),
                t('templates.eventManagement.actions.5'),
                t('templates.eventManagement.actions.6')
              ]
            },
            {
              name: 'Känslor',
              examples: ['🤔', '😊', '😰', '😍', '🤓', '😊']
            },
            {
              name: 'Touchpoints',
              examples: [
                t('templates.eventManagement.touchpoints.1'),
                t('templates.eventManagement.touchpoints.2'),
                t('templates.eventManagement.touchpoints.3'),
                t('templates.eventManagement.touchpoints.4'),
                t('templates.eventManagement.touchpoints.5'),
                t('templates.eventManagement.touchpoints.6')
              ]
            },
            {
              name: 'Smärtpunkter',
              examples: [
                t('templates.eventManagement.painPoints.1'),
                t('templates.eventManagement.painPoints.2'),
                t('templates.eventManagement.painPoints.3'),
                t('templates.eventManagement.painPoints.4'),
                t('templates.eventManagement.painPoints.5'),
                t('templates.eventManagement.painPoints.6')
              ]
            }
          ]
        }
      case '11': // Recruitment Process
        return {
          stages: [
            { name: t('templates.recruitment.stages.discovery'), description: t('templates.recruitment.stages.discoveryDesc') },
            { name: t('templates.recruitment.stages.application'), description: t('templates.recruitment.stages.applicationDesc') },
            { name: t('templates.recruitment.stages.screening'), description: t('templates.recruitment.stages.screeningDesc') },
            { name: t('templates.recruitment.stages.interview'), description: t('templates.recruitment.stages.interviewDesc') },
            { name: t('templates.recruitment.stages.decision'), description: t('templates.recruitment.stages.decisionDesc') }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: [
                t('templates.recruitment.actions.1'),
                t('templates.recruitment.actions.2'),
                t('templates.recruitment.actions.3'),
                t('templates.recruitment.actions.4'),
                t('templates.recruitment.actions.5')
              ]
            },
            {
              name: 'Känslor',
              examples: ['😊', '🤞', '😰', '😅', '😍']
            },
            {
              name: 'Touchpoints',
              examples: [
                t('templates.recruitment.touchpoints.1'),
                t('templates.recruitment.touchpoints.2'),
                t('templates.recruitment.touchpoints.3'),
                t('templates.recruitment.touchpoints.4'),
                t('templates.recruitment.touchpoints.5')
              ]
            },
            {
              name: 'Smärtpunkter',
              examples: [
                t('templates.recruitment.painPoints.1'),
                t('templates.recruitment.painPoints.2'),
                t('templates.recruitment.painPoints.3'),
                t('templates.recruitment.painPoints.4'),
                t('templates.recruitment.painPoints.5')
              ]
            }
          ]
        }
      case '12': // Insurance Claim
        return {
          stages: [
            { name: t('templates.insurance.stages.incident'), description: t('templates.insurance.stages.incidentDesc') },
            { name: t('templates.insurance.stages.reporting'), description: t('templates.insurance.stages.reportingDesc') },
            { name: t('templates.insurance.stages.documentation'), description: t('templates.insurance.stages.documentationDesc') },
            { name: t('templates.insurance.stages.assessment'), description: t('templates.insurance.stages.assessmentDesc') },
            { name: t('templates.insurance.stages.closure'), description: t('templates.insurance.stages.closureDesc') }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: [
                t('templates.insurance.actions.1'),
                t('templates.insurance.actions.2'),
                t('templates.insurance.actions.3'),
                t('templates.insurance.actions.4'),
                t('templates.insurance.actions.5')
              ]
            },
            {
              name: 'Känslor',
              examples: ['😱', '😰', '😤', '🤞', '😊']
            },
            {
              name: 'Touchpoints',
              examples: [
                t('templates.insurance.touchpoints.1'),
                t('templates.insurance.touchpoints.2'),
                t('templates.insurance.touchpoints.3'),
                t('templates.insurance.touchpoints.4'),
                t('templates.insurance.touchpoints.5')
              ]
            },
            {
              name: 'Smärtpunkter',
              examples: [
                t('templates.insurance.painPoints.1'),
                t('templates.insurance.painPoints.2'),
                t('templates.insurance.painPoints.3'),
                t('templates.insurance.painPoints.4'),
                t('templates.insurance.painPoints.5')
              ]
            }
          ]
        }
      default:
        return {
          stages: [
            { name: t('templates.default.stages.phase1'), description: t('templates.default.stages.phase1Desc') },
            { name: t('templates.default.stages.phase2'), description: t('templates.default.stages.phase2Desc') },
            { name: t('templates.default.stages.phase3'), description: t('templates.default.stages.phase3Desc') }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: [
                t('templates.default.actions.1'),
                t('templates.default.actions.2'),
                t('templates.default.actions.3')
              ]
            }
          ]
        }
    }
  }

  const previewData = getPreviewData(template.id)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${t('templates.preview.title')}: ${template.name}`}
      maxWidth="5xl"
    >
      <div className="space-y-6">
        {/* Template Info */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
            <p className="text-gray-600 mt-1">{template.description}</p>
            <div className="flex items-center space-x-4 mt-3">
              <Badge variant="secondary">{template.industry}</Badge>
              <span className="text-sm text-gray-500">
                {template.touchpoints} touchpoints • {template.stages} {t('templates.preview.stages')}
              </span>
            </div>
          </div>
        </div>


        {/* Preview Grid */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-3 text-sm font-medium text-gray-700 w-32">
                  {t('templates.preview.categories')}
                </th>
                {previewData.stages.map((stage, index) => (
                  <th key={index} className="text-left p-3 text-sm font-medium text-gray-700">
                    <div>
                      <div className="font-semibold">{stage.name}</div>
                      <div className="text-xs text-gray-500 font-normal">{stage.description}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.categories.map((category, categoryIndex) => (
                <tr key={categoryIndex} className="border-b">
                  <td className="p-3 bg-gray-50 font-medium text-sm text-gray-700">
                    {getCategoryName(category.name)}
                  </td>
                  {category.examples.map((example, exampleIndex) => (
                    <td key={exampleIndex} className="p-3 text-sm text-gray-600">
                      {category.name === 'Känslor' ? (
                        <TwemojiEmoji emoji={example} size={20} />
                      ) : (
                        example
                      )}
                    </td>
                  ))}
                  {/* Fill remaining cells if needed */}
                  {Array.from({ length: Math.max(0, previewData.stages.length - category.examples.length) }).map((_, index) => (
                    <td key={`empty-${index}`} className="p-3 text-sm text-gray-400">
                      -
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            {t('templates.preview.close')}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onUseTemplate(template)
              onClose()
            }}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            {t('templates.preview.useTemplate')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}