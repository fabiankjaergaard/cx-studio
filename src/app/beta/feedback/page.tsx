'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MessageCircleIcon, StarIcon, SendIcon } from 'lucide-react'
import { feedbackStorage } from '@/services/feedbackStorage'
import { useAuth } from '@/contexts/AuthContext'

export default function BetaFeedbackPage() {
  const { user } = useAuth()
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(0)
  const [category, setCategory] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Get beta tester name from localStorage
    const betaTesterName = typeof window !== 'undefined'
      ? localStorage.getItem('cx-studio-beta-tester-name')
      : null

    // Save feedback to Supabase
    await feedbackStorage.addFeedback({
      type: 'feedback',
      data: {
        feedback,
        rating,
        category
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
      setFeedback('')
      setRating(0)
      setCategory('')
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="h-full flex flex-col">
        <Header
          title="Tack för din feedback!"
          description="Vi uppskattar att du hjälper oss förbättra Kustra"
        />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Feedback skickat!
              </h3>
              <p className="text-gray-600">
                Vi kommer att granska din feedback och använda den för att förbättra produkten.
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
        title="Ge feedback"
        description="Hjälp oss förbättra Kustra genom att dela dina tankar och upplevelser"
      />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircleIcon className="h-5 w-5 text-blue-600" />
                Din feedback är viktig för oss
              </CardTitle>
              <p className="text-gray-600">
                Som beta-testare spelar din åsikt en avgörande roll i utvecklingen av Kustra.
                Berätta vad du tycker, vad som fungerar bra och vad som kan förbättras.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Vad handlar din feedback om?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Användargränssnitt',
                      'Funktionalitet',
                      'Prestanda',
                      'Användbarhet',
                      'Design',
                      'Annat'
                    ].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`p-3 text-left border rounded-lg transition-all duration-200 ${
                          category === cat
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Overall Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Hur nöjd är du med Kustra överlag?
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="transition-colors duration-200"
                      >
                        <StarIcon
                          className={`h-8 w-8 ${
                            star <= rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Berätta mer om din upplevelse
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Vad fungerar bra? Vad kan förbättras? Vilka funktioner saknar du? Dela gärna specifika exempel..."
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!feedback.trim() || !category}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <SendIcon className="h-4 w-4" />
                    Skicka feedback
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card className="mt-6 border-0 bg-green-50 rounded-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-green-900 mb-3">
                ✨ Senaste uppdateringar baserat på er feedback
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white/60 p-3 rounded-lg">
                  <div className="font-medium text-green-800">📱 Förbättrad mobilupplevelse</div>
                  <div className="text-green-700 text-xs mt-1">Tack till Anna, Erik och 5 andra som rapporterade detta</div>
                </div>
                <div className="bg-white/60 p-3 rounded-lg">
                  <div className="font-medium text-green-800">⚡ Snabbare laddningstider</div>
                  <div className="text-green-700 text-xs mt-1">Baserat på prestanda-feedback från 12 beta-testare</div>
                </div>
                <div className="bg-white/60 p-3 rounded-lg">
                  <div className="font-medium text-green-800">🎨 Nya hover-effekter</div>
                  <div className="text-green-700 text-xs mt-1">Som Maria föreslog för bättre interaktivitet</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-6 border-0 bg-blue-50 rounded-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                Vad händer med min feedback?
              </h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Vi läser all feedback noggrant</li>
                <li>• Vanliga förslag prioriteras i utvecklingen</li>
                <li>• Du kan få uppföljning via email</li>
                <li>• Din feedback hjälper oss forma framtiden för Kustra</li>
              </ul>
            </CardContent>
          </Card>

          {/* Beta Community Stats */}
          <Card className="mt-6 border-0 bg-purple-50 rounded-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-purple-900 mb-4">
                🚀 Beta-community statistik
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-700">47</div>
                  <div className="text-sm text-purple-600">Aktiva beta-testare</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">156</div>
                  <div className="text-sm text-purple-600">Feedback skickad</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">23</div>
                  <div className="text-sm text-purple-600">Features implementerade</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">89%</div>
                  <div className="text-sm text-purple-600">Nöjdhetsgrad</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}