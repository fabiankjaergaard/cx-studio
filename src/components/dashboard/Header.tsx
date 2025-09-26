'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { BellIcon, PlusIcon, CheckIcon, ClockIcon } from 'lucide-react'

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

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Journey map uppdaterad',
    message: 'Din journey map "Onboarding Flow" har uppdaterats av teammedlem',
    time: '2 timmar sedan',
    read: true,
    type: 'info'
  },
  {
    id: '2',
    title: 'Ny persona skapad',
    message: 'Anna Andersson-persona har lagts till i ditt projekt',
    time: '1 dag sedan',
    read: true,
    type: 'success'
  },
  {
    id: '3',
    title: 'Påminnelse',
    message: 'Kom ihåg att granska din customer journey denna vecka',
    time: '3 dagar sedan',
    read: true,
    type: 'warning'
  }
]

export function Header({ title, description, actions }: HeaderProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const notifications = mockNotifications
  const unreadCount = notifications.filter(n => !n.read).length

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
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications Dropdown */}
          <div className="relative">
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
                    <h3 className="text-lg font-semibold text-gray-900">Notifikationer</h3>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {unreadCount === 0 && notifications.length === 0 ? (
                      <div className="p-6 text-center">
                        <BellIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Inga nya notiser</h4>
                        <p className="text-sm text-gray-500">Du är uppdaterad med allt!</p>
                      </div>
                    ) : unreadCount === 0 && notifications.length > 0 ? (
                      <div className="p-4">
                        <div className="text-center mb-4">
                          <p className="text-sm text-gray-500">Inga nya notiser</p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">Lästa notifikationer</h4>
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
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-1">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {notification.title}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1">
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
                    )}
                  </div>

                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                      <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">
                        Visa alla notifikationer
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
    </header>
  )
}