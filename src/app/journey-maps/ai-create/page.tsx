'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  SparklesIcon,
  ArrowLeftIcon,
  UserIcon,
  TargetIcon,
  MessageSquareIcon
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AICreateJourneyMapPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [businessType, setBusinessType] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [objective, setObjective] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateMap = async () => {
    if (!businessType.trim() || !targetAudience.trim() || !objective.trim()) {
      return
    }

    setIsGenerating(true)

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Create a new journey map with AI-generated content
    const newMapId = Date.now().toString()
    setIsGenerating(false)

    // Redirect to the generated map
    router.push(`/journey-maps/${newMapId}?generated=true`)
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header
        title="Create Journey Map with AI"
        description="Tell us about your business and customers, and AI will generate a personalized journey map"
        actions={
          <Link href="/journey-maps/new">
            <Button variant="outline">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        }
      />

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-2xl flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">
                Let AI create your journey map
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Answer a few questions and AI will create a tailored customer journey map for you
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  <label className="block text-sm font-medium text-gray-700">
                    What type of business do you have? *
                  </label>
                </div>
                <Input
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="e.g. Clothing e-commerce, SaaS platform, restaurant..."
                  required
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  <label className="block text-sm font-medium text-gray-700">
                    Who is your primary target audience? *
                  </label>
                </div>
                <Input
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Young adults 20-35 years, small business owners, retirees..."
                  required
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <TargetIcon className="h-4 w-4 text-gray-400" />
                  <label className="block text-sm font-medium text-gray-700">
                    What should the journey map help you understand? *
                  </label>
                </div>
                <Input
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="e.g. Purchase process, onboarding new customers, support cases..."
                  required
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquareIcon className="h-4 w-4 text-gray-400" />
                  <label className="block text-sm font-medium text-gray-700">
                    Additional information (optional)
                  </label>
                </div>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Tell us more about your industry, specific challenges, or what's important to your customers..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-white text-gray-900 placeholder-gray-500"
                  rows={4}
                />
              </div>

              <div className="border-t pt-6">
                <Button
                  variant="primary"
                  onClick={handleGenerateMap}
                  disabled={!businessType.trim() || !targetAudience.trim() || !objective.trim() || isGenerating}
                  className="w-full"
                >
                  <SparklesIcon className="mr-2 h-4 w-4" />
                  {isGenerating ? 'Generating journey map...' : 'Generate journey map with AI'}
                </Button>

                {isGenerating && (
                  <p className="text-sm text-gray-600 text-center mt-3">
                    AI is analyzing your input and creating a personalized journey map...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-slate-900 mb-2">💡 Tips for best results:</h4>
              <ul className="text-sm text-slate-800 space-y-1">
                <li>• Be as specific as possible about your industry and target audience</li>
                <li>• Describe concrete situations and challenges</li>
                <li>• Include information about your customers' behavior and preferences</li>
                <li>• The AI learns from your input - the more details, the better the results</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}