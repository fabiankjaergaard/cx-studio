'use client'

import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  SparklesIcon,
  MessageCircleIcon,
  LightbulbIcon,
  BugIcon,
  ArrowRightIcon,
  UsersIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  CodeIcon,
  ClockIcon
} from 'lucide-react'
import Link from 'next/link'

export default function BetaPage() {
  const betaOptions = [
    {
      title: 'Give Feedback',
      description: 'Share your thoughts and experiences to help me improve Kustra',
      icon: MessageCircleIcon,
      href: '/beta/feedback'
    },
    {
      title: 'Suggest Feature',
      description: 'Have an idea that would make Kustra even better? Tell me about it!',
      icon: LightbulbIcon,
      href: '/beta/feature-request'
    },
    {
      title: 'Report Bug',
      description: 'Help me fix issues by describing what went wrong',
      icon: BugIcon,
      href: '/beta/bug-report'
    }
  ]

  const developmentItems = [
    'Business value translation: Convert metrics to real financial impact (e.g., "40% support time reduction saves $X")',
    'Financial & non-financial KPIs dashboard',
    'Admin analytics to track user behavior and engagement patterns',
    'Advanced metrics: CLV, CAC, NPS integration',
    'Personalized onboarding based on CX experience level',
    'Journey map sublanes for detailed process mapping',
    'Sticky customer actions header when scrolling'
  ]

  return (
    <div className="h-full flex flex-col">
      <Header
        title="Beta Tester"
        description="Help me build the best possible experience for all users"
      />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <Card className="mb-8 border-0 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center">
                  <SparklesIcon className="h-8 w-8 text-slate-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Welcome to the beta program!
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    As a beta tester, you play a crucial role in Kustra's development.
                    Your feedback, ideas, and bug reports help me create the best
                    possible product for all users.
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <UsersIcon className="h-4 w-4" />
                      <span>Active beta testers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUpIcon className="h-4 w-4" />
                      <span>Satisfaction rate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-4 w-4" />
                      <span>Features implemented</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Beta Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {betaOptions.map((option, index) => (
              <Link key={index} href={option.href}>
                <Card className="group border-0 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-gray-100">
                        <option.icon className="h-6 w-6 text-gray-600 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-200 group-hover:text-slate-700">
                          {option.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed transition-colors duration-200 group-hover:text-gray-700">
                          {option.description}
                        </p>
                        <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-slate-600 transition-colors duration-200">
                          <span>Get started</span>
                          <ArrowRightIcon className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Currently in Development */}
          <Card className="border-0 bg-white rounded-xl shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                  <CodeIcon className="h-5 w-5 text-slate-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">Currently in Development</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Features and improvements I'm actively working on</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {developmentItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <ClockIcon className="h-4 w-4 text-slate-500" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-700">
                  <strong>Note:</strong> Development priorities may change based on user feedback and business needs.
                  Your input as a beta tester directly influences my roadmap!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}