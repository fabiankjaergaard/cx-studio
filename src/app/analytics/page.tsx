'use client'

import { Header } from '@/components/dashboard/Header'
import { BarChart3, TrendingUp, PieChart, Activity, Zap } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-8">
        <div className="max-w-2xl w-full text-center">
          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl p-12 border-0">
            {/* Icons Grid */}
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-100 to-slate-100 blur-sm opacity-60 rounded-xl"></div>
              <div className="relative p-8 grid grid-cols-3 gap-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-slate-400" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center ring-2 ring-slate-200">
                    <TrendingUp className="w-10 h-10 text-slate-600" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                    <PieChart className="w-8 h-8 text-slate-400" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center">
                    <Activity className="w-6 w-6 text-slate-300" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-18 h-18 bg-slate-200 rounded-full flex items-center justify-center opacity-50">
                    <Zap className="w-8 h-8 text-slate-500" />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 w-6 text-slate-300" />
                  </div>
                </div>
              </div>

              {/* Coming Soon Badge */}
              <div className="absolute top-4 right-4">
                <div className="px-4 py-2 bg-slate-600 text-white text-sm font-semibold rounded-full shadow-lg">
                  Coming Soon
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
                Analytics Dashboard
                <Zap className="w-8 h-8 text-slate-600" />
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                We're building powerful analytics to help you understand your customer experience data
              </p>

              <div className="pt-4">
                <p className="text-sm text-gray-500">
                  Get insights from journey maps, track customer satisfaction trends, and measure the impact of your CX improvements
                </p>
              </div>
            </div>

            {/* Feature Preview */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Journey Insights</h3>
                <p className="text-sm text-gray-600">Track customer journey performance and identify improvement opportunities</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center mb-3">
                  <PieChart className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Pain Point Analysis</h3>
                <p className="text-sm text-gray-600">Visualize and analyze customer pain points across all touchpoints</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center mb-3">
                  <BarChart3 className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Performance Metrics</h3>
                <p className="text-sm text-gray-600">Monitor key CX metrics and track improvements over time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}