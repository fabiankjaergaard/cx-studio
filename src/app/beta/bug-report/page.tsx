'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BugIcon, SendIcon, AlertTriangleIcon, CheckCircleIcon, ImageIcon, XIcon } from 'lucide-react'
import { feedbackStorage } from '@/services/feedbackStorage'
import { useAuth } from '@/contexts/AuthContext'

export default function BugReportPage() {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [steps, setSteps] = useState('')
  const [expected, setExpected] = useState('')
  const [actual, setActual] = useState('')
  const [severity, setSeverity] = useState('')
  const [browser, setBrowser] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => [...prev, event.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Get beta tester name from localStorage
      const betaTesterName = typeof window !== 'undefined'
        ? localStorage.getItem('cx-studio-beta-tester-name')
        : null

      // Save bug report to Supabase
      await feedbackStorage.addFeedback({
        type: 'bug-report',
        data: {
          title,
          description,
          steps,
          expected,
          actual,
          priority: severity,
          category: browser,
          images
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
        setSteps('')
        setExpected('')
        setActual('')
        setSeverity('')
        setBrowser('')
        setImages([])
      }, 3000)
    } catch (error) {
      console.error('Failed to submit bug report:', error)
      alert('Failed to submit bug report. Please check the console for details.')
    }
  }

  if (submitted) {
    return (
      <div className="h-full flex flex-col">
        <Header
          title="Thank you for your bug report!"
          description="I will investigate and fix the issue as soon as possible"
        />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Bug report sent!
              </h3>
              <p className="text-gray-600">
                I have received your report and will prioritize it based on severity.
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
        title="Report a Bug"
        description="Help me fix issues by describing what went wrong"
      />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BugIcon className="h-5 w-5 text-slate-600" />
                Describe the problem
              </CardTitle>
              <p className="text-gray-600">
                The more detailed information you provide, the faster I can solve the problem.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Bug Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Brief description of the problem *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 'Journey map doesn't save' or 'Page doesn't load on mobile'"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Severity */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    How severe is the problem?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: 'nice-to-have', label: 'Low - Minor issue', color: 'slate' },
                      { value: 'important', label: 'Medium - Affects functionality', color: 'slate' },
                      { value: 'critical', label: 'High - Blocks work', color: 'slate' }
                    ].map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setSeverity(s.value)}
                        className={`p-3 text-left border rounded-lg transition-all duration-200 ${
                          severity === s.value
                            ? `border-${s.color}-500 bg-${s.color}-50 text-${s.color}-900`
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        <div className="font-medium">{s.label.split(' - ')[0]}</div>
                        <div className="text-xs">{s.label.split(' - ')[1]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Steps to Reproduce */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Steps to reproduce the problem *
                  </label>
                  <textarea
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    placeholder="1. Go to journey maps&#10;2. Click 'Create new'&#10;3. Fill in name and click save&#10;4. Problem occurs..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Expected Behavior */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      What did you expect to happen?
                    </label>
                    <textarea
                      value={expected}
                      onChange={(e) => setExpected(e.target.value)}
                      placeholder="Journey map should save and I should go to the editor..."
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Actual Behavior */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      What happened instead?
                    </label>
                    <textarea
                      value={actual}
                      onChange={(e) => setActual(e.target.value)}
                      placeholder="Page went white and nothing happened..."
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                {/* Browser/Environment */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Which browser are you using?
                  </label>
                  <select
                    value={browser}
                    onChange={(e) => setBrowser(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                  >
                    <option value="">Select browser</option>
                    <option value="chrome">Chrome</option>
                    <option value="firefox">Firefox</option>
                    <option value="safari">Safari</option>
                    <option value="edge">Edge</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Additional Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Additional information
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Is there anything else that might be relevant? Error messages, console logs, etc."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Screenshots (optional)
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    Images help me understand the problem better. You can upload multiple images.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <ImageIcon className="h-4 w-4 text-gray-500" />
                        Choose images
                      </label>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Screenshot ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <XIcon className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!title.trim() || !steps.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-700"
                  >
                    <SendIcon className="h-4 w-4" />
                    Send bug report
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