'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { LightbulbIcon, SendIcon, SparklesIcon } from 'lucide-react'

export default function FeatureRequestPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [useCase, setUseCase] = useState('')
  const [priority, setPriority] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feature request to your backend
    console.log({ title, description, useCase, priority })
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
          title="Tack för ditt förslag!"
          description="Vi uppskattar dina idéer för att förbättra Kustra"
        />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LightbulbIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Förslag skickat!
              </h3>
              <p className="text-gray-600">
                Vi kommer att utvärdera ditt förslag och överväga det för framtida utveckling.
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
        title="Föreslå ny feature"
        description="Har du en idé som skulle göra Kustra ännu bättre? Berätta för oss!"
      />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LightbulbIcon className="h-5 w-5 text-yellow-600" />
                Din idé kan bli verklighet
              </CardTitle>
              <p className="text-gray-600">
                Vi bygger Kustra tillsammans med våra användare. Dina förslag hjälper oss att
                skapa de funktioner som verkligen behövs.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Feature Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Vad vill du att vi ska bygga? *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="T.ex. 'AI-driven insiktsanalys' eller 'Realtidssamarbete i journey maps'"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Hur viktigt är detta för dig?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: 'nice-to-have', label: 'Nice to have', color: 'blue' },
                      { value: 'important', label: 'Viktigt', color: 'yellow' },
                      { value: 'critical', label: 'Kritiskt', color: 'red' }
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
                    Beskriv funktionen i detalj *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Hur skulle funktionen fungera? Vilka problem löser den? Vad skulle användaren kunna göra?"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Use Case */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Ge ett konkret exempel på när du skulle använda detta
                  </label>
                  <textarea
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    placeholder="Berätta om en situation där denna funktion skulle vara till hjälp..."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!title.trim() || !description.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700"
                  >
                    <SendIcon className="h-4 w-4" />
                    Skicka förslag
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Popular Requests */}
          <Card className="mt-6 border-0 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-yellow-600" />
                Populära förslag från andra beta-testare
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-between p-2 bg-white/50 rounded">
                  <span>• Avancerad filtrering i journey maps</span>
                  <span className="text-xs text-gray-500">12 röster</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/50 rounded">
                  <span>• Integration med Slack/Teams</span>
                  <span className="text-xs text-gray-500">8 röster</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/50 rounded">
                  <span>• Mobil app för data collection</span>
                  <span className="text-xs text-gray-500">15 röster</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}