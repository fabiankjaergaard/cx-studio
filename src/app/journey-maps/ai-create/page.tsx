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
        title="Skapa Journey Map med AI"
        description="Berätta om ditt företag och dina kunder så genererar AI en personlig journey map"
        actions={
          <Link href="/journey-maps/new">
            <Button variant="outline">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Tillbaka
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
                Låt AI skapa din journey map
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Svara på några frågor så skapar AI en skräddarsydd customer journey map för dig
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  <label className="block text-sm font-medium text-gray-700">
                    Vad för typ av företag har du? *
                  </label>
                </div>
                <Input
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="T.ex. E-handel med kläder, SaaS-plattform, restaurang..."
                  required
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  <label className="block text-sm font-medium text-gray-700">
                    Vem är din primära målgrupp? *
                  </label>
                </div>
                <Input
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="T.ex. Unga vuxna 20-35 år, små företagare, pensionärer..."
                  required
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <TargetIcon className="h-4 w-4 text-gray-400" />
                  <label className="block text-sm font-medium text-gray-700">
                    Vad ska journey mappen hjälpa dig att förstå? *
                  </label>
                </div>
                <Input
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="T.ex. Köpprocessen, onboarding av nya kunder, supportärenden..."
                  required
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquareIcon className="h-4 w-4 text-gray-400" />
                  <label className="block text-sm font-medium text-gray-700">
                    Ytterligare information (valfritt)
                  </label>
                </div>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Berätta mer om din bransch, specifika utmaningar, eller vad som är viktigt för dina kunder..."
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
                  {isGenerating ? 'Genererar journey map...' : 'Generera journey map med AI'}
                </Button>

                {isGenerating && (
                  <p className="text-sm text-gray-600 text-center mt-3">
                    AI analyserar din input och skapar en personlig journey map...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-900 mb-2">💡 Tips för bästa resultat:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Var så specifik som möjligt om din bransch och målgrupp</li>
                <li>• Beskriv konkreta situationer och utmaningar</li>
                <li>• Inkludera information om dina kunders beteende och preferenser</li>
                <li>• AI:n lär sig från din input - ju mer detaljer, desto bättre resultat</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}