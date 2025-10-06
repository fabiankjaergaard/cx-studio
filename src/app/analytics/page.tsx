'use client'

import { BarChart3Icon, UserIcon, ShieldIcon } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center grid-background p-8">
      <div className="max-w-4xl w-full text-center">
        {/* Icon Row */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 flex items-center justify-center">
            <BarChart3Icon className="h-8 w-8 text-gray-400" />
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
          Analytics & Insights
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-6">
          Comprehensive analytics will be available to track and optimize your customer experience
        </p>

        <p className="text-base text-gray-500 mb-8 max-w-2xl mx-auto">
          Soon you'll be able to analyze KPIs, journey performance, and generate detailed reports to measure and improve your customer experience strategy
        </p>

        {/* Coming Soon Button */}
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl font-medium">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          Coming Soon
        </button>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-left">
            <BarChart3Icon className="h-6 w-6 text-gray-400 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">KPIs</h3>
            <p className="text-sm text-gray-500">
              Manage your KPIs, track financial and non-financial metrics
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 text-left">
            <UserIcon className="h-6 w-6 text-gray-400 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Journey Analytics</h3>
            <p className="text-sm text-gray-500">
              Analyze customer journey performance and identify bottlenecks
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 text-left">
            <ShieldIcon className="h-6 w-6 text-gray-400 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Reports</h3>
            <p className="text-sm text-gray-500">
              Control data privacy, generate detailed reports and insights
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}