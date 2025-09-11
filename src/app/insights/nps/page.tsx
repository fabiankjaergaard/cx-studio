'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  TrendingUpIcon, 
  UsersIcon, 
  AlertTriangleIcon,
  HeartIcon,
  PlusIcon,
  BarChart3Icon,
  CalendarIcon,
  TargetIcon,
  LightbulbIcon,
  CheckCircleIcon
} from 'lucide-react'
import Link from 'next/link'

const npsSegments = [
  {
    type: 'Promoters',
    score: '9-10',
    color: 'text-green-600 bg-green-100',
    description: 'Lojala entusiaster som kommer att fortsätta köpa och hänvisa andra',
    characteristics: [
      'Mycket nöjda med produkten/tjänsten',
      'Troliga att rekommendera till andra',
      'Lägre churn-risk',
      'Högre lifetime value'
    ],
    actionItems: [
      'Be dem om referenser och recensioner',
      'Involvera dem i case studies',
      'Erbjud referral-program',
      'Få feedback på nya produkter'
    ]
  },
  {
    type: 'Passives',
    score: '7-8',
    color: 'text-yellow-600 bg-yellow-100',
    description: 'Nöjda men inte entusiastiska kunder som är sårbara för konkurrenter',
    characteristics: [
      'Nöjda men inte engagerade',
      'Neutral till rekommendationer',
      'Risk för att växla till konkurrent',
      'Påverkas av pris och erbjudanden'
    ],
    actionItems: [
      'Identifiera vad som kan göra dem till Promoters',
      'Förbättra kundupplevelsen',
      'Personliga erbjudanden',
      'Proaktiv kundservice'
    ]
  },
  {
    type: 'Detractors',
    score: '0-6',
    color: 'text-red-600 bg-red-100',
    description: 'Missnöjda kunder som kan skada varumärket genom negativ word-of-mouth',
    characteristics: [
      'Missnöjda med upplevelsen',
      'Risk för negativa recensioner',
      'Hög churn-sannolikhet',
      'Kan avråda andra från köp'
    ],
    actionItems: [
      'Prioritera att förstå deras problem',
      'Åtgärda klagomål snabbt',
      'Erbjud kompensation vid behov',
      'Förbättra identifierade problem'
    ]
  }
]

const bestPractices = [
  {
    title: 'Timing är avgörande',
    description: 'Skicka NPS-enkäter när upplevelsen är färsk i kundens minne',
    tips: [
      'Direkt efter köp eller leverans',
      'Efter kundserviceinteraktion',
      'Vid förnyelse av abonnemang',
      'Efter viktiga milstolpar i kundresan'
    ]
  },
  {
    title: 'Rätt frekvens',
    description: 'Undvik enkättrötthet genom att balansera insikt med kundupplevelse',
    tips: [
      'Kvartalsvis för de flesta företag',
      'Månadsvis för snabbföränderliga branscher',
      'Efter större produktförändringar',
      'Max 1 gång per månad per kund'
    ]
  },
  {
    title: 'Följ upp med handling',
    description: 'NPS-värdet är meningslöst utan konkreta förbättringsåtgärder',
    tips: [
      'Kontakta Detractors inom 24-48 timmar',
      'Be Promoters om referencias',
      'Analysera vanliga teman i kommentarer',
      'Kommunicera förändringar till kunder'
    ]
  }
]

const industryBenchmarks = [
  { industry: 'SaaS/Teknologi', average: 31, top: 72 },
  { industry: 'E-handel', average: 47, top: 84 },
  { industry: 'Telekom', average: 31, top: 68 },
  { industry: 'Banker', average: 34, top: 73 },
  { industry: 'Försäkring', average: 34, top: 73 },
  { industry: 'Detaljhandel', average: 39, top: 78 }
]

const npsTemplate = {
  title: 'Net Promoter Score Enkät',
  description: 'Mät kundlojalitet och identifiera ambassadörer',
  questions: [
    {
      type: 'nps',
      question: 'Hur troligt är det att du rekommenderar [Företagsnamn] till en vän eller kollega?',
      description: 'Svara på en skala från 0 (inte alls troligt) till 10 (extremt troligt)'
    },
    {
      type: 'text',
      question: 'Vad är den främsta anledningen till ditt betyg?',
      description: 'Hjälp oss att förstå vad som driver ditt betyg'
    },
    {
      type: 'text',
      question: 'Vad skulle få dig att ge oss ett högre betyg?',
      description: 'Valfri - men värdeful för våra förbättringsinsatser'
    }
  ]
}

export default function NPSPage() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

  return (
    <div className="h-full flex flex-col">
      <Header 
        title="Net Promoter Score (NPS)" 
        description="Mät kundlojalitet och identifiera dina främsta ambassadörer"
        actions={
          <Link href="/insights/survey-builder">
            <Button variant="primary">
              <PlusIcon className="mr-2 h-4 w-4" />
              Skapa NPS-enkät
            </Button>
          </Link>
        }
      />
      
      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        {/* Introduction */}
        <Card className="mb-8 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUpIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Vad är Net Promoter Score?
                </h3>
                <p className="text-gray-600 mb-4">
                  NPS är ett enkelt men kraftfullt mått som frågar kunder: "Hur troligt är det att du rekommenderar oss?" 
                  Svaren delas in i tre grupper som avslöjar din kundbas lojalitet och tillväxtpotential.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-center mb-2">
                    NPS = % Promoters - % Detractors
                  </div>
                  <div className="text-sm text-gray-600 text-center">
                    Resultat sträcker sig från -100 (alla Detractors) till +100 (alla Promoters)
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NPS Segments */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">De tre NPS-segmenten</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {npsSegments.map((segment) => (
              <Card 
                key={segment.type} 
                className={`cursor-pointer transition-all hover:shadow-md ${
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
                      <h4 className="font-medium text-gray-900 mb-2">Egenskaper:</h4>
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
                        <h4 className="font-medium text-gray-900 mb-2">Rekommenderade åtgärder:</h4>
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Best Practices för NPS</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bestPractices.map((practice, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LightbulbIcon className="h-5 w-5 text-yellow-500" />
                    <span>{practice.title}</span>
                  </CardTitle>
                  <p className="text-gray-600 text-sm">{practice.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {practice.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Branschgenomsnitt</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                Jämför ditt NPS med andra i din bransch. Kom ihåg att NPS kan variera mycket beroende på 
                marknad, kundtyp och mätmetod.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Bransch</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Genomsnitt</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-900">Topp 25%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryBenchmarks.map((benchmark, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{benchmark.industry}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {benchmark.average}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {benchmark.top}
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

        {/* NPS Template */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">NPS Enkätmall</h2>
          <Card>
            <CardHeader>
              <CardTitle>{npsTemplate.title}</CardTitle>
              <p className="text-gray-600">{npsTemplate.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {npsTemplate.questions.map((question, index) => (
                  <div key={index} className="border-l-4 border-l-gray-200 pl-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{question.question}</h4>
                        <p className="text-sm text-gray-600">{question.description}</p>
                        {question.type === 'nps' && (
                          <div className="flex space-x-2 mt-3">
                            {[...Array(11)].map((_, i) => (
                              <div key={i} className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center bg-gray-50 text-sm">
                                {i}
                              </div>
                            ))}
                          </div>
                        )}
                        {question.type === 'text' && (
                          <div className="mt-3 border border-gray-300 rounded p-3 bg-gray-50 text-sm text-gray-500">
                            Fritextområde för kundens svar...
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
                  Anpassa mall
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Steps */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Redo att mäta din NPS?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Kom ihåg: NPS är bara början. Det verkliga värdet kommer från att följa upp 
                med konkreta åtgärder baserat på vad du lär dig från dina kunder.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/survey-builder">
                  <Button variant="primary">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Skapa NPS-enkät
                  </Button>
                </Link>
                <Link href="/insights/getting-started">
                  <Button variant="outline">
                    Läs mer om genomförande
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