'use client'

import { SettingsIcon, UserIcon, ShieldIcon, BellIcon } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center grid-background p-8">
      <div className="max-w-4xl w-full text-center">
        {/* Icon Row */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 flex items-center justify-center">
            <SettingsIcon className="h-8 w-8 text-gray-400" />
          </div>
          <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 flex items-center justify-center">
            <UserIcon className="h-8 w-8 text-gray-400" />
          </div>
          <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 flex items-center justify-center">
            <ShieldIcon className="h-8 w-8 text-gray-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Settings & Configuration
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-6">
          Comprehensive settings will be available to personalize your customer experience platform
        </p>

        <p className="text-base text-gray-500 mb-8 max-w-2xl mx-auto">
          Soon you'll be able to customize your workspace, manage team preferences, configure notifications, and control privacy settings for your organization
        </p>

        {/* Coming Soon Button */}
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl font-medium">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          Coming Soon
        </button>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-left">
            <UserIcon className="h-6 w-6 text-gray-400 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Profile Management</h3>
            <p className="text-sm text-gray-500">
              Manage your profile, preferences, and personal settings
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 text-left">
            <BellIcon className="h-6 w-6 text-gray-400 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Notifications</h3>
            <p className="text-sm text-gray-500">
              Configure email alerts, in-app notifications, and team updates
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 text-left">
            <ShieldIcon className="h-6 w-6 text-gray-400 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Security & Privacy</h3>
            <p className="text-sm text-gray-500">
              Control data privacy, security settings, and access permissions
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}