'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  StarIcon,
  UsersIcon,
  PlusIcon,
  TargetIcon,
  CheckCircleIcon,
  LightbulbIcon,
  BarChart3Icon
} from 'lucide-react'
import Link from 'next/link'

const getCsatSegments = (t: (key: string) => string) => [
  {
    type: 'Mycket nöjda',
    score: '4-5',
    color: 'text-green-600 bg-green-100',
    description: 'Kunder som är mycket nöjda med produkten eller tjänsten',
    characteristics: [
      'Ger höga betyg konsekvent',
      'Troliga att återköpa',
      'Rekommenderar till andra',
      'Lojala ambassadörer'
    ],
    actionItems: [
      'Be om recensioner och testimonials',
      'Erbjud lojalitetsprogram',
      'Använd som case studies',
      'Fråga vad som gör dem nöjda'
    ]
  },
  {
    type: 'Nöjda',
    score: '3',
    color: 'text-yellow-600 bg-yellow-100',
    description: 'Kunder som är neutralt nöjda, risk för att byta',
    characteristics: [
      'Ger genomsnittliga betyg',
      'Kan påverkas av konkurrenter',
      'Behöver extra uppmärksamhet',
      'Potential att bli ambassadörer'
    ],
    actionItems: [
      'Identifiera förbättringsområden',
      'Erbjud personlig service',
      'Följ upp regelbundet',
      'Visa värde och fördelar'
    ]
  },
  {
    type: 'Missnöjda',
    score: '1-2',
    color: 'text-red-600 bg-red-100',
    description: 'Kunder som är missnöjda och riskerar att lämna',
    characteristics: [
      'Ger låga betyg',
      'Risk för negativa recensioner',
      'Troliga att byta leverantör',
      'Kan skada varumärket'
    ],
    actionItems: [
      'Kontakta omedelbart',
      'Lös problem proaktivt',
      'Erbjud kompensation',
      'Förebygg framtida problem'
    ]
  }
]

const getBestPractices = () => [
  {
    title: 'Timing är kritiskt',
    description: 'Skicka CSAT-enkäter vid rätt tidpunkt för bästa svar',
    tips: [
      'Direkt efter köp eller tjänsteanvändning',
      'Inom 24-48 timmar efter interaktion',
      'Undvik helger och stressiga perioder',
      'Anpassa till kundens tidszon'
    ]
  },
  {
    title: 'Håll det enkelt',
    description: 'Korta, fokuserade enkäter ger högre svarsfrekvens',
    tips: [
      'Max 3-5 frågor',
      'Använd tydliga stjärnbetyg',
      'En huvudfråga + uppföljningsfrågor',
      'Mobilvänlig design'
    ]
  },
  {
    title: 'Agera på feedback',
    description: 'Följ upp negativ feedback snabbt och systematiskt',
    tips: [
      'Kontakta missnöjda kunder inom 24h',
      'Ha en tydlig eskaleringsprocess',
      'Dokumentera vanliga problem',
      'Stäng loopen med kunden'
    ]
  }
]

const getIndustryBenchmarks = () => [
  { industry: 'E-handel', average: 4.0, excellent: 4.5 },
  { industry: 'SaaS/Tech', average: 4.2, excellent: 4.7 },
  { industry: 'Detaljhandel', average: 3.8, excellent: 4.4 },
  { industry: 'Bank & Finans', average: 3.9, excellent: 4.3 },
  { industry: 'Telekom', average: 3.6, excellent: 4.2 },
  { industry: 'Hälsovård', average: 4.1, excellent: 4.6 }
]

const getCsatTemplate = () => ({
  title: 'Standard CSAT-enkät',
  description: 'En beprövad mall för att mäta kundnöjdhet',
  questions: [
    {
      type: 'rating',
      question: 'Hur nöjd är du med din upplevelse idag?',
      description: 'Huvudfrågan som mäter övergripande nöjdhet'
    },
    {
      type: 'text',
      question: 'Vad kan vi göra bättre?',
      description: 'Öppen fråga för förbättringsförslag'
    },
    {
      type: 'text',
      question: 'Något annat du vill dela med dig av?',
      description: 'Allmän feedback och kommentarer'
    }
  ]
})

export default function CSATPage() {
  const { t } = useLanguage()
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

  const csatSegments = getCsatSegments(t)
  const bestPractices = getBestPractices()
  const industryBenchmarks = getIndustryBenchmarks()
  const csatTemplate = getCsatTemplate()

  return (
    <div className="h-full flex flex-col">
      <Header
        title="Customer Satisfaction (CSAT)"
        description="Mät kundnöjdhet och förbättra kundupplevelsen"
        actions={
          <Link href="/insights/survey-builder">
            <Button variant="primary">
              <PlusIcon className="mr-2 h-4 w-4" />
              Skapa CSAT-enkät
            </Button>
          </Link>
        }
      />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Introduction */}
        <Card className="mb-8 border-0 bg-white rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <StarIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Vad är Customer Satisfaction (CSAT)?
                </h3>
                <p className="text-gray-600 mb-4">
                  CSAT mäter hur nöjda kunder är med en specifik produkt, tjänst eller interaktion. Det är ett enkelt men kraftfullt verktyg för att förstå kundupplevelsen i realtid.
                </p>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-lg font-semibold text-center mb-2 text-gray-900">
                    CSAT = (Nöjda kunder / Totalt antal svar) × 100
                  </div>
                  <div className="text-sm text-gray-600 text-center">
                    Vanligtvis mätt på en 1-5 skala där 4-5 räknas som "nöjda"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* CSAT Segments */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">De tre CSAT-segmenten</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {csatSegments.map((segment) => (
              <Card
                key={segment.type}
                className={`cursor-pointer transition-all hover:shadow-md border-0 bg-white rounded-xl overflow-hidden ${
                  selectedSegment === segment.type ? 'ring-2 ring-slate-500' : ''
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bästa praxis för CSAT</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bestPractices.map((practice, index) => (
              <Card key={index} className="border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <LightbulbIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>{practice.title}</span>
                  </CardTitle>
                  <p className="text-gray-600 text-sm">{practice.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {practice.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Branschgenomsnitt för CSAT</h2>
          <Card className="border-0 bg-white rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Jämför din CSAT-poäng med branschgenomsnittet för att förstå din position på marknaden.
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
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-slate-100 text-slate-800">
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

        {/* CSAT Template */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">CSAT-enkätmall</h2>
          <Card className="border-0 bg-white rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle>{csatTemplate.title}</CardTitle>
              <p className="text-gray-600">{csatTemplate.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {csatTemplate.questions.map((question, index) => (
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
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div key={star} className="flex flex-col items-center">
                                <StarIcon className="w-8 h-8 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-500 mt-1">{star}</span>
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
                Redo att mäta kundnöjdhet?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Kom igång med CSAT-mätning idag. Skapa din första enkät och börja samla värdefull feedback från dina kunder.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/survey-builder">
                  <Button variant="primary">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Skapa CSAT-enkät
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