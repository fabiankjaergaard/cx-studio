'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { BellIcon, PlusIcon, CheckIcon, ClockIcon, Sparkles, ExternalLink, MapIcon, LightbulbIcon, BarChart3Icon, UserPlusIcon, X, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Tooltip } from '@/components/ui/Tooltip'
import { Modal } from '@/components/ui/Modal'
import Link from 'next/link'

interface HeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'info' | 'success' | 'warning'
}


export function Header({ title, description, actions }: HeaderProps) {
  const { t } = useLanguage()
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isAIFeaturesModalOpen, setIsAIFeaturesModalOpen] = useState(false)

  // Updated notifications with translation keys
  const notifications: Notification[] = [
    {
      id: 'ai-features',
      title: 'New AI Features Available! ✨',
      message: 'Discover 5 new AI-powered tools to enhance your customer experience work',
      time: 'New',
      read: false,
      type: 'info'
    },
    {
      id: '1',
      title: t('notifications.journeyUpdated'),
      message: t('notifications.journeyUpdatedMessage', { title: 'Onboarding Flow' }),
      time: t('notifications.timeAgo2h'),
      read: true,
      type: 'info'
    },
    {
      id: '2',
      title: t('notifications.newPersona'),
      message: t('notifications.newPersonaMessage', { name: 'Anna Andersson' }),
      time: t('notifications.timeAgo1d'),
      read: true,
      type: 'success'
    },
    {
      id: '3',
      title: t('notifications.reminder'),
      message: t('notifications.reminderMessage'),
      time: t('notifications.timeAgo3d'),
      read: true,
      type: 'warning'
    }
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  // AI Features with detailed descriptions
  const aiFeatures = [
    {
      id: '1',
      title: 'Import Insights to Journey Maps',
      shortDescription: 'Import AI-generated insights from your research data directly into journey maps',
      fullDescription: 'Import insights from customer research directly into your journey maps. AI automatically links them to relevant touchpoints.',
      link: '/journey-maps',
      icon: MapIcon,
      category: 'Journey Maps',
      benefits: ['Auto-link to journey stages', 'Save hours of work']
    },
    {
      id: '2',
      title: 'Insights Panel',
      shortDescription: 'View and manage AI-generated insights in the sidebar with severity ratings and evidence points',
      fullDescription: 'View all journey map insights in one sidebar panel with severity ratings (1-5) and evidence counts.',
      link: '/journey-maps',
      icon: LightbulbIcon,
      category: 'Journey Maps',
      benefits: ['Severity indicators', 'Evidence tracking']
    },
    {
      id: '3',
      title: 'Insights Library',
      shortDescription: 'Centralized insights library with automatic aggregation, filtering, status tracking, and severity levels',
      fullDescription: 'Central hub for all insights across projects. Filter by severity, status, and category. Track progress from "To Do" to "Done".',
      link: '/analytics/insights',
      icon: BarChart3Icon,
      category: 'Analytics',
      benefits: ['Cross-project view', 'Advanced filtering', 'Progress tracking']
    },
    {
      id: '4',
      title: 'Create Custom Insights',
      shortDescription: 'Create and customize your own insights manually with full control over severity and evidence',
      fullDescription: 'Create custom insights manually with full control over severity levels, evidence points, and categories.',
      link: '/journey-maps',
      icon: Sparkles,
      category: 'Journey Maps',
      benefits: ['Full customization', 'Manual severity control']
    },
    {
      id: '5',
      title: 'AI-Powered Persona Import',
      shortDescription: 'Import personas from CSV and API integrations with smart field mapping',
      fullDescription: 'Import personas from CSV or API with smart field mapping and duplicate detection. No manual data entry needed.',
      link: '/personas/import',
      icon: UserPlusIcon,
      category: 'Personas',
      benefits: ['Smart field mapping', 'Duplicate detection'],
      comingSoon: true
    }
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckIcon className="w-4 h-4 text-green-600" />
      case 'warning': return <ClockIcon className="w-4 h-4 text-yellow-600" />
      default: return <BellIcon className="w-4 h-4 text-slate-600" />
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 h-20">
      <div className="flex items-center justify-between h-full">
        <div>
          <h1 className="text-2xl font-bold text-[#778DB0]">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications Dropdown */}
          <div className="relative">
            <Tooltip content={t('header.notifications')} position="bottom">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 relative hover:scale-110 transition-all duration-200 ease-out"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <BellIcon className={`h-5 w-5 transition-transform duration-300 ${isNotificationOpen ? 'rotate-12 text-slate-600' : 'hover:rotate-6'}`} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </Tooltip>

            {isNotificationOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsNotificationOpen(false)}
                />

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-96 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200 ease-out">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">{t('header.notifications')}</h3>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {unreadCount === 0 && notifications.length === 0 ? (
                      <div className="p-6 text-center">
                        <BellIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h4 className="text-sm font-medium text-gray-900 mb-1">{t('header.noNewNotifications')}</h4>
                        <p className="text-sm text-gray-500">{t('header.allCaughtUp')}</p>
                      </div>
                    ) : unreadCount === 0 && notifications.length > 0 ? (
                      <div className="p-4">
                        <div className="text-center mb-4">
                          <p className="text-sm text-gray-500">{t('header.noNewNotifications')}</p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">{t('header.readNotifications')}</h4>
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="p-3 opacity-60 hover:opacity-90 transition-all duration-200 ease-out cursor-pointer rounded-lg hover:bg-gray-50 hover:scale-[1.02] hover:shadow-sm"
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-1">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-600 truncate">
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-2">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {notifications
                          .filter(n => !n.read)
                          .map((notification) => (
                            <div
                              key={notification.id}
                              className="p-4 hover:bg-gray-50 cursor-pointer hover:scale-[1.02] transition-all duration-200 ease-out hover:shadow-sm"
                              onClick={() => {
                                if (notification.id === 'ai-features') {
                                  setIsNotificationOpen(false)
                                  setIsAIFeaturesModalOpen(true)
                                }
                              }}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-1">
                                  {notification.id === 'ai-features' ? (
                                    <Sparkles className="w-4 h-4 text-[#778DB0]" />
                                  ) : (
                                    getNotificationIcon(notification.type)
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900">
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-[#778DB0] font-medium mt-2">
                                    {notification.time}
                                  </p>
                                  {notification.id === 'ai-features' && (
                                    <button className="text-xs text-[#778DB0] hover:text-[#9BA8C4] font-medium mt-2 flex items-center gap-1">
                                      Click to explore <ArrowRight className="w-3 h-3" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                      <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                        {t('header.viewAllNotifications')}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {actions}
        </div>
      </div>

      {/* AI Features Modal */}
      <Modal
        isOpen={isAIFeaturesModalOpen}
        onClose={() => setIsAIFeaturesModalOpen(false)}
        title=""
        maxWidth="4xl"
      >
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#778DB0] to-[#9BA8C4] rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">New AI Features!</h2>
            <p className="text-gray-600">Discover the latest AI-powered tools added to Kustra</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto px-2">
            {aiFeatures.map((feature) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={feature.id}
                  className="border border-gray-200 rounded-xl p-6 hover:border-[#778DB0] hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white to-gray-50"
                >
                  {/* Icon & Category */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#778DB0]/10 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#778DB0]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[#778DB0] bg-[#778DB0]/10 px-3 py-1 rounded-full">
                        {feature.category}
                      </span>
                      {feature.comingSoon && (
                        <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  {/* Full Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {feature.fullDescription}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2 mb-4">
                    {feature.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-[#778DB0] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Link href={feature.link} onClick={() => setIsAIFeaturesModalOpen(false)}>
                    <Button
                      variant={feature.comingSoon ? "outline" : "primary"}
                      className="w-full"
                      disabled={feature.comingSoon}
                    >
                      {feature.comingSoon ? 'Coming Soon' : (
                        <>
                          Try it now <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsAIFeaturesModalOpen(false)}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </header>
  )
}