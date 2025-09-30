'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { MessageCircleIcon, StarIcon, SendIcon, ImageIcon, XIcon } from 'lucide-react'
import { feedbackStorage } from '@/services/feedbackStorage'
import { useAuth } from '@/contexts/AuthContext'

export default function BetaFeedbackPage() {
  const { user } = useAuth()
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(0)
  const [category, setCategory] = useState('')
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
        category,
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
      setFeedback('')
      setRating(0)
      setCategory('')
      setImages([])
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
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircleIcon className="h-8 w-8 text-slate-600" />
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
                <MessageCircleIcon className="h-5 w-5 text-gray-600" />
                Din feedback är viktig för mig
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
                            ? 'border-slate-500 bg-slate-50 text-slate-900'
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Skärmdumpar (valfritt)
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    Bilder hjälper mig förstå din feedback bättre. Du kan ladda upp flera bilder.
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="feedback-image-upload"
                      />
                      <label
                        htmlFor="feedback-image-upload"
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <ImageIcon className="h-4 w-4 text-gray-500" />
                        Välj bilder
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


        </div>
      </div>
    </div>
  )
}