'use client'

import { Header } from '@/components/dashboard/Header'
import { BarChart3Icon, TrendingUpIcon, ClipboardIcon } from 'lucide-react'

export default function AnalyticsPage() {
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
                <BarChart3Icon className="h-8 w-8 text-gray-600" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                <TrendingUpIcon className="h-8 w-8 text-gray-600" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                <ClipboardIcon className="h-8 w-8 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Analytics Dashboard
            </h1>

            <div className="space-y-2">
              <p className="text-lg text-gray-600 font-medium">
                Powerful analytics tools to understand and optimize
              </p>
              <p className="text-lg text-gray-600 font-medium">
                your customer experience data
              </p>
            </div>

            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Get insights from journey maps, track customer satisfaction trends, and measure the
              impact of your customer experience improvements
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
                <TrendingUpIcon className="h-5 w-5 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Journey Insights</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Track customer journey performance and identify improvement opportunities
              </p>
            </div>

            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <ClipboardIcon className="h-5 w-5 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Pain Point Analysis</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Visualize and analyze customer pain points across all touchpoints
              </p>
            </div>

            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3Icon className="h-5 w-5 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Performance Metrics</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Monitor key CX metrics and track improvements over time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}