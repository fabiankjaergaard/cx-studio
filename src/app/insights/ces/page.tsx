'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  BarChart3Icon,
  ZapIcon,
  PlusIcon,
  CheckCircleIcon,
  LightbulbIcon,
  ArrowRightIcon
} from 'lucide-react'
import Link from 'next/link'

const getCesSegments = (t: (key: string) => string) => [
  {
    type: 'Låg ansträngning',
    score: '1-2',
    color: 'text-green-600 bg-green-100',
    description: 'Kunder som upplevde processen som mycket enkel',
    characteristics: [
      'Löste sitt ärende snabbt',
      'Behövde minimal hjälp',
      'Intuitiv användarupplevelse',
      'Högt förtroende för varumärket'
    ],
    actionItems: [
      'Dokumentera vad som fungerade bra',
      'Standardisera framgångsprocesser',
      'Använd som benchmark',
      'Dela bästa praxis internt'
    ]
  },
  {
    type: 'Måttlig ansträngning',
    score: '3-5',
    color: 'text-yellow-600 bg-yellow-100',
    description: 'Kunder som upplevde viss friktion i processen',
    characteristics: [
      'Behövde lite extra hjälp',
      'Några oklarheter i processen',
      'Måttligt nöjda med upplevelsen',
      'Risk för att inte återkomma'
    ],
    actionItems: [
      'Identifiera friktionspunkter',
      'Förbättra dokumentation',
      'Erbjud proaktiv support',
      'Förenkla komplexa steg'
    ]
  },
  {
    type: 'Hög ansträngning',
    score: '6-7',
    color: 'text-red-600 bg-red-100',
    description: 'Kunder som upplevde processen som krånglig och frustrerande',
    characteristics: [
      'Behövde mycket hjälp',
      'Flera försök för att lyckas',
      'Frustrerade och stressade',
      'Risk för negativ word-of-mouth'
    ],
    actionItems: [
      'Prioritera omedelbar åtgärd',
      'Kontakta för personlig support',
      'Redesigna problematiska processer',
      'Implementera förebyggande åtgärder'
    ]
  }
]

const getBestPractices = () => [
  {
    title: 'Mät vid rätt tidpunkt',
    description: 'Samla CES-data när kunden precis avslutat en process',
    tips: [
      'Direkt efter ärendehantering',
      'Efter köp eller registrering',
      'Efter supportinteraktion',
      'Vid processavslut, inte mitt i'
    ]
  },
  {
    title: 'Fokusera på specifika processer',
    description: 'CES fungerar bäst för konkreta, avgränsade upplevelser',
    tips: [
      'En process per enkät',
      'Tydligt definierade start/slut',
      'Fokusera på kundens ansträngning',
      'Undvik allmänna frågor'
    ]
  },
  {
    title: 'Agera på höga CES-poäng',
    description: 'Hög ansträngning är ofta ett tecken på systembrister',
    tips: [
      'Prioritera processer med CES >4',
      'Kartlägg hela kundresan',
      'Implementera snabba förbättringar',
      'Mät effekten av ändringar'
    ]
  }
]

const getIndustryBenchmarks = () => [
  { industry: 'SaaS/Tech', average: 2.8, excellent: 2.0 },
  { industry: 'E-handel', average: 3.1, excellent: 2.2 },
  { industry: 'Bank & Finans', average: 3.4, excellent: 2.5 },
  { industry: 'Telekom', average: 3.8, excellent: 2.8 },
  { industry: 'Försäkring', average: 3.6, excellent: 2.6 },
  { industry: 'Kundservice', average: 3.2, excellent: 2.3 }
]

const getCesTemplate = () => ({
  title: 'Standard CES-enkät',
  description: 'En beprövad mall för att mäta kundansträngning',
  questions: [
    {
      type: 'rating',
      question: 'Hur mycket ansträngning krävdes från din sida för att lösa ditt ärende idag?',
      description: 'Huvudfrågan som mäter upplevd ansträngning på 1-7 skala'
    },
    {
      type: 'text',
      question: 'Vad var mest utmanande i processen?',
      description: 'Identifierar specifika friktionspunkter'
    },
    {
      type: 'text',
      question: 'Hur kunde vi gjort det enklare för dig?',
      description: 'Konkreta förbättringsförslag från kunden'
    }
  ]
})

export default function CESPage() {
  const { t } = useLanguage()
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

  const cesSegments = getCesSegments(t)
  const bestPractices = getBestPractices()
  const industryBenchmarks = getIndustryBenchmarks()
  const cesTemplate = getCesTemplate()

  return (
    <div className="h-full flex flex-col">
      <Header
        title="Customer Effort Score (CES)"
        description="Mät kundansträngning och eliminera friktion i kundresan"
        actions={
          <Link href="/insights/survey-builder">
            <Button variant="primary">
              <PlusIcon className="mr-2 h-4 w-4" />
              Skapa CES-enkät
            </Button>
          </Link>
        }
      />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Introduction */}
        <Card className="mb-8 border-0 bg-white rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <ZapIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Vad är Customer Effort Score (CES)?
                </h3>
                <p className="text-gray-600 mb-4">
                  CES mäter hur mycket ansträngning kunder behöver lägga för att få hjälp, lösa ett problem eller slutföra en process. Låg ansträngning leder till högre kundlojalitet och minskad churn.
                </p>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-lg font-semibold text-center mb-2 text-gray-900">
                    CES = Genomsnittlig ansträngningspoäng (1-7 skala)
                  </div>
                  <div className="text-sm text-gray-600 text-center">
                    Lägre poäng = Bättre (mindre ansträngning för kunden)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* CES Segments */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">De tre CES-segmenten</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {cesSegments.map((segment) => (
              <Card
                key={segment.type}
                className={`cursor-pointer transition-all hover:shadow-md border-0 bg-white rounded-xl overflow-hidden ${
                  selectedSegment === segment.type ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedSegment(selectedSegment === segment.type ? null : segment.type)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{segment.type}</CardTitle>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${segment.color}`}>
                      {segment.score}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{segment.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Kännetecken</h4>
                      <ul className="space-y-1">
                        {segment.characteristics.map((char, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedSegment === segment.type && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Rekommenderade åtgärder</h4>
                        <ul className="space-y-1">
                          {segment.actionItems.map((action, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600">
                              <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bästa praxis för CES</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bestPractices.map((practice, index) => (
              <Card key={index} className="border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                      <LightbulbIcon className="h-4 w-4 text-orange-600" />
                    </div>
                    <span>{practice.title}</span>
                  </CardTitle>
                  <p className="text-gray-600 text-sm">{practice.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {practice.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Industry Benchmarks */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Branschgenomsnitt för CES</h2>
          <Card className="border-0 bg-white rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Jämför din CES-poäng med branschgenomsnittet. Kom ihåg att lägre poäng är bättre för CES.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Bransch</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Genomsnitt</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Utmärkt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryBenchmarks.map((benchmark, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{benchmark.industry}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            {benchmark.average}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {benchmark.excellent}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CES Template */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">CES-enkätmall</h2>
          <Card className="border-0 bg-white rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle>{cesTemplate.title}</CardTitle>
              <p className="text-gray-600">{cesTemplate.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {cesTemplate.questions.map((question, index) => (
                  <div key={index} className="border-l-4 border-l-gray-200 pl-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{question.question}</h4>
                        <p className="text-sm text-gray-600">{question.description}</p>
                        {question.type === 'rating' && (
                          <div className="flex space-x-2 mt-3">
                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                              <div key={num} className="flex flex-col items-center">
                                <div className={`w-8 h-8 border border-gray-300 rounded flex items-center justify-center bg-gray-50 text-sm text-gray-900 font-medium ${
                                  num <= 2 ? 'bg-green-50 border-green-300' :
                                  num <= 5 ? 'bg-yellow-50 border-yellow-300' :
                                  'bg-red-50 border-red-300'
                                }`}>
                                  {num}
                                </div>
                                {num === 1 && <span className="text-xs text-gray-500 mt-1">Mycket lätt</span>}
                                {num === 7 && <span className="text-xs text-gray-500 mt-1">Mycket svårt</span>}
                              </div>
                            ))}
                          </div>
                        )}
                        {question.type === 'text' && (
                          <div className="mt-3 border border-gray-300 rounded p-3 bg-gray-50 text-sm text-gray-500">
                            Textområde för kundens feedback...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t text-center">
                <Link href="/insights/survey-builder">
                  <Button variant="primary" className="mr-3">
                    Använd denna mall
                  </Button>
                </Link>
                <Button variant="outline">
                  Anpassa mallen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Steps */}
        <Card className="border-0 bg-white rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Redo att minska kundansträngning?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Kom igång med CES-mätning idag. Identifiera friktionspunkter och förbättra kundupplevelsen genom att minska ansträngningen.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/survey-builder">
                  <Button variant="primary">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Skapa CES-enkät
                  </Button>
                </Link>
                <Link href="/insights/best-practices">
                  <Button variant="outline">
                    Läs mer om bästa praxis
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}