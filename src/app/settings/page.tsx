'use client'

import { Header } from '@/components/dashboard/Header'
import { SettingsIcon, UserIcon, ShieldIcon, BellIcon } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="h-full flex flex-col">
      <Header
        title=""
        description=""
      />

      <div className="flex-1 flex items-center justify-center bg-gray-50 py-8">
        <div className="text-center max-w-6xl mx-auto px-6">
          {/* Header with icons */}
          <div className="flex justify-center mb-6">
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                <SettingsIcon className="h-8 w-8 text-gray-600" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                <UserIcon className="h-8 w-8 text-gray-600" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                <ShieldIcon className="h-8 w-8 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Settings & Configuration
            </h1>

            <div className="space-y-2">
              <p className="text-lg text-gray-600 font-medium">
                We're building comprehensive settings to personalize
              </p>
              <p className="text-lg text-gray-600 font-medium">
                your customer experience platform
              </p>
            </div>

            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Customize your workspace, manage team preferences, configure notifications,
              and control privacy settings for your organization
            </p>
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mb-8">
            <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse shadow-sm"></div>
            <span className="font-semibold tracking-wide">Coming Soon</span>
          </div>

          {/* Feature Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <UserIcon className="h-5 w-5 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Profile Management</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Manage your profile, preferences, and personal settings
              </p>
            </div>

            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BellIcon className="h-5 w-5 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Notifications</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Configure email alerts, in-app notifications, and team updates
              </p>
            </div>

            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <ShieldIcon className="h-5 w-5 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Security & Privacy</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Control data privacy, security settings, and access permissions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}