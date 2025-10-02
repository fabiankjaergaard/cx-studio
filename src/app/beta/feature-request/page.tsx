'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { LightbulbIcon, SendIcon, SparklesIcon } from 'lucide-react'
import { feedbackStorage } from '@/services/feedbackStorage'
import { useAuth } from '@/contexts/AuthContext'

export default function FeatureRequestPage() {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [useCase, setUseCase] = useState('')
  const [priority, setPriority] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Get beta tester name from localStorage
    const betaTesterName = typeof window !== 'undefined'
      ? localStorage.getItem('cx-studio-beta-tester-name')
      : null

    // Save feature request to Supabase
    await feedbackStorage.addFeedback({
      type: 'feature-request',
      data: {
        title,
        description,
        useCase,
        priority
      },
      userInfo: {
        isBetaTester: true,
        userId: user?.email || 'anonymous',
        userName: betaTesterName || undefined
      }
    })

    setSubmitted(true)

    // Reset form after a delay
    setTimeout(() => {
      setSubmitted(false)
      setTitle('')
      setDescription('')
      setUseCase('')
      setPriority('')
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="h-full flex flex-col">
        <Header
          title="Thank you for your suggestion!"
          description="I appreciate your ideas for improving Kustra"
        />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LightbulbIcon className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Suggestion sent!
              </h3>
              <p className="text-gray-600">
                I will evaluate your suggestion and consider it for future development.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Header
        title="Suggest New Feature"
        description="Have an idea that would make Kustra even better? Tell me about it!"
      />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LightbulbIcon className="h-5 w-5 text-slate-600" />
                Your idea can become reality
              </CardTitle>
              <p className="text-gray-600">
                I build Kustra together with my users. Your suggestions help me
                create the features that are truly needed.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Feature Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    What would you like me to build? *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 'AI-driven insights analysis' or 'Real-time collaboration in journey maps'"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    How important is this to you?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: 'nice-to-have', label: 'Nice to have', color: 'slate' },
                      { value: 'important', label: 'Important', color: 'slate' },
                      { value: 'critical', label: 'Critical', color: 'slate' }
                    ].map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setPriority(p.value)}
                        className={`p-3 text-center border rounded-lg transition-all duration-200 ${
                          priority === p.value
                            ? `border-${p.color}-500 bg-${p.color}-50 text-${p.color}-900`
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Describe the feature in detail *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="How would the feature work? What problems does it solve? What would the user be able to do?"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Use Case */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Give a concrete example of when you would use this
                  </label>
                  <textarea
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    placeholder="Tell me about a situation where this feature would be helpful..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!title.trim() || !description.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700"
                  >
                    <SendIcon className="h-4 w-4" />
                    Send suggestion
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}