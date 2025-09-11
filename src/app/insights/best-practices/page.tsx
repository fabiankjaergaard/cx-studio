'use client'

import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CheckCircleIcon, 
  AlertTriangleIcon,
  LightbulbIcon,
  UsersIcon,
  ClockIcon,
  BarChart3Icon,
  MessageSquareIcon,
  TrendingUpIcon,
  TargetIcon,
  ArrowRightIcon,
  BookOpenIcon
} from 'lucide-react'
import Link from 'next/link'

const bestPractices = [
  {
    category: 'Planering & Design',
    icon: TargetIcon,
    color: 'text-blue-600 bg-blue-100',
    practices: [
      {
        title: 'Börja med tydliga mål',
        description: 'Definiera specifikt vad du vill ta reda på innan du börjar',
        dos: [
          'Skriv ner konkreta frågeställningar',
          'Bestäm vilka beslut som ska baseras på resultaten',
          'Sätt upp mätbara framgångskriterier',
          'Identifiera målgrupp och segment'
        ],
        donts: [
          'Samla data "för att vi borde"',
          'Skapa för breda eller vaga mål',
          'Glömma att planera för uppföljning'
        ]
      },
      {
        title: 'Välj rätt metod för rätt syfte',
        description: 'Kvantitativ för "vad" och "hur mycket", kvalitativ för "varför" och "hur"',
        dos: [
          'Använd enkäter för att mäta och jämföra',
          'Använd intervjuer för att förstå djupare',
          'Kombinera metoder för heltäckande bild',
          'Börja kvalitativt, validera kvantitativt'
        ],
        donts: [
          'Använda bara en metod för komplexa frågor',
          'Försöka kvantifiera allt',
          'Ignorera kostnads-nyttoförhållandet'
        ]
      }
    ]
  },
  {
    category: 'Datainsamling',
    icon: ClipboardListIcon,
    color: 'text-green-600 bg-green-100',
    practices: [
      {
        title: 'Timing är avgörande',
        description: 'Rätt tidpunkt avgör kvaliteten på svaren',
        dos: [
          'Skicka enkäter när upplevelsen är färsk',
          'Undvik helger och semesterperioder',
          'Testa timing med små grupper först',
          'Följ upp påminnelser strategiskt'
        ],
        donts: [
          'Skicka enkäter månader efter upplevelsen',
          'Bombardera kunder med för många enkäter',
          'Ignorera tidszoner och arbetstider'
        ]
      },
      {
        title: 'Skriv bra frågor',
        description: 'Neutrala, tydliga frågor ger tillförlitliga svar',
        dos: [
          'Använd enkelt, vardagligt språk',
          'Ställ en fråga i taget',
          'Testa frågor innan lansering',
          'Var specifik och konkret'
        ],
        donts: [
          'Använda ledande eller vinklade frågor',
          'Inkludera branschspecifika termer',
          'Skapa dubbel-negationer eller komplexa meningar'
        ]
      }
    ]
  },
  {
    category: 'Analys & Åtgärder',
    icon: TrendingUpIcon,
    color: 'text-purple-600 bg-purple-100',
    practices: [
      {
        title: 'Från data till insikt',
        description: 'Omvandla rådata till handlingsbara insikter',
        dos: [
          'Leta efter mönster och trender',
          'Segmentera data för djupare förståelse',
          'Korskoppla olika datakällor',
          'Prioritera insikter baserat på påverkan'
        ],
        donts: [
          'Dra slutsatser från för liten data',
          'Ignorera avvikande eller oväntade resultat',
          'Presentera bara beskrivande statistik'
        ]
      },
      {
        title: 'Agera på insikterna',
        description: 'Värdet skapas genom handling, inte genom data',
        dos: [
          'Skapa konkreta handlingsplaner',
          'Prioritera förbättringsområden',
          'Kommunicera förändringar till kunder',
          'Mät effekten av förbättringar'
        ],
        donts: [
          'Låta insikter "ligga på hyllan"',
          'Göra för många förändringar samtidigt',
          'Glömma att följa upp resultaten'
        ]
      }
    ]
  }
]

const commonMistakes = [
  {
    mistake: 'För långa enkäter',
    impact: 'Låg svarsfrekvens och sämre datakvalitet',
    solution: 'Håll enkäter under 5 minuter. Fokusera på det viktigaste.',
    prevention: 'Testa enkätlängd med kollegor innan lansering'
  },
  {
    mistake: 'Ingen uppföljning till respondenterna',
    impact: 'Kunder känner sig ignorerade och svarar mindre nästa gång',
    solution: 'Kommunicera vad du lärt dig och vilka förändringar du gör',
    prevention: 'Planera kommunikation som en del av enkätprocessen'
  },
  {
    mistake: 'Samla data utan handlingsplan',
    impact: 'Slöseri med resurser och missade förbättringsmöjligheter',
    solution: 'Definiera hur du kommer att använda resultaten innan datainsamling',
    prevention: 'Skapa en "så här agerar vi"-plan för olika scenarier'
  },
  {
    mistake: 'Fel målgrupp eller sampling',
    impact: 'Missvisande resultat som leder till felaktiga beslut',
    solution: 'Definiera tydligt vem du vill nå och använd rätt urvalsmetoder',
    prevention: 'Validera att ditt urval representerar din målgrupp'
  },
  {
    mistake: 'Ledande eller vinklade frågor',
    impact: 'Partiska svar som bekräftar förväntningar istället för verklighet',
    solution: 'Använd neutrala formuleringar och testa med kollegor',
    prevention: 'Låt någon annan granska dina frågor innan lansering'
  }
]

const methodSpecificTips = [
  {
    method: 'NPS-enkäter',
    icon: TrendingUpIcon,
    tips: [
      'Ställ uppföljningsfrågan "Varför?" för att förstå betyget',
      'Segmentera resultat för att hitta specifika förbättringsområden',
      'Kontakta Detractors inom 24-48 timmar',
      'Be Promoters om referenser och recensioner'
    ]
  },
  {
    method: 'CSAT-enkäter',
    icon: BarChart3Icon,
    tips: [
      'Skicka direkt efter interaktionen för bäst minne',
      'Anpassa skalan till din bransch (1-5 vs 1-10)',
      'Inkludera en öppen fråga för kvalitativ feedback',
      'Jämför resultat mellan olika kanaler och touchpoints'
    ]
  },
  {
    method: 'Kundintervjuer',
    icon: MessageSquareIcon,
    tips: [
      'Starta med öppna frågor och gräv djupare med "Varför?"',
      'Lyssna mer än du pratar (80/20-regeln)',
      'Spela in (med tillstånd) för att fokusera på samtalet',
      'Sök efter känslor och motivationer, inte bara fakta'
    ]
  },
  {
    method: 'Fokusgrupper',
    icon: UsersIcon,
    tips: [
      'Blanda inte befintliga och potentiella kunder',
      'Använd en erfaren moderator för bäst resultat',
      'Planera för gruppynamik och tysta deltagare',
      'Komplettera med individuella metoder för djupare insikter'
    ]
  }
]

const progressiveDisclosure = [
  {
    phase: 'Explorativ fas',
    description: 'Förstå problemområdet och identifiera frågeställningar',
    methods: ['Kundintervjuer', 'Observationer', 'Fokusgrupper'],
    outcome: 'Hypoteser och insiktsfrågor att testa',
    nextStep: 'Gå till valideringsfas'
  },
  {
    phase: 'Valideringsfas',
    description: 'Testa hypoteser och mät omfattning av identifierade problem',
    methods: ['NPS', 'CSAT', 'CES', 'Stora enkäter'],
    outcome: 'Validerade insikter och prioriterade förbättringsområden',
    nextStep: 'Gå till optimeringsfas'
  },
  {
    phase: 'Optimeringsfas',
    description: 'Testa lösningar och mät effekt av förändringar',
    methods: ['A/B-tester', 'Pilotstudier', 'Före/efter-mätningar'],
    outcome: 'Bevisade förbättringar och optimerade processer',
    nextStep: 'Tillbaka till explorativ fas för nya områden'
  }
]

export default function BestPracticesPage() {
  return (
    <div className="h-full flex flex-col">
      <Header 
        title="Best Practices för Kundinsikter" 
        description="Professionella råd för att maximera värdet av din datainsamling"
        actions={
          <Link href="/insights">
            <Button variant="outline">
              Tillbaka till översikt
            </Button>
          </Link>
        }
      />
      
      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        {/* Introduction */}
        <Card className="mb-8 border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <LightbulbIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Från OK till Excellent
                </h3>
                <p className="text-gray-600">
                  Skillnaden mellan framgångsrika och misslyckade kundinsiktsprojekt ligger ofta i detaljerna. 
                  Denna guide samlar beprövade metoder som hjälper dig att få tillförlitliga insikter som verkligen driver förbättring.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progressive Approach */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ett progressivt tillvägagångssätt</h2>
          <div className="space-y-6">
            {progressiveDisclosure.map((phase, index) => (
              <Card key={phase.phase} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{phase.phase}</h3>
                      <p className="text-gray-600 mb-4">{phase.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Metoder:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {phase.methods.map((method, methodIndex) => (
                              <li key={methodIndex} className="flex items-center">
                                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                                {method}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Resultat:</h4>
                          <p className="text-sm text-gray-600">{phase.outcome}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Nästa steg:</h4>
                          <div className="flex items-center text-sm text-blue-600">
                            <ArrowRightIcon className="h-4 w-4 mr-1" />
                            {phase.nextStep}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Practices by Category */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Best Practices per kategori</h2>
          <div className="space-y-8">
            {bestPractices.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {category.practices.map((practice, practiceIndex) => (
                    <Card key={practiceIndex}>
                      <CardHeader>
                        <CardTitle className="text-lg">{practice.title}</CardTitle>
                        <p className="text-gray-600">{practice.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="flex items-center font-medium text-green-700 mb-3">
                            <CheckCircleIcon className="h-4 w-4 mr-2" />
                            Gör så här:
                          </h4>
                          <ul className="space-y-1">
                            {practice.dos.map((doItem, doIndex) => (
                              <li key={doIndex} className="flex items-start text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                {doItem}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="flex items-center font-medium text-red-700 mb-3">
                            <AlertTriangleIcon className="h-4 w-4 mr-2" />
                            Undvik detta:
                          </h4>
                          <ul className="space-y-1">
                            {practice.donts.map((dontItem, dontIndex) => (
                              <li key={dontIndex} className="flex items-start text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                                {dontItem}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vanliga misstag och hur du undviker dem</h2>
          <div className="space-y-4">
            {commonMistakes.map((mistake, index) => (
              <Card key={index} className="border-l-4 border-l-red-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <AlertTriangleIcon className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-red-800 mb-2">{mistake.mistake}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Påverkan:</h4>
                          <p className="text-gray-600">{mistake.impact}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Lösning:</h4>
                          <p className="text-gray-600">{mistake.solution}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Förebygga:</h4>
                          <p className="text-gray-600">{mistake.prevention}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Method-Specific Tips */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Metodspecifika tips</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {methodSpecificTips.map((methodTip, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <methodTip.icon className="h-5 w-5 text-blue-600" />
                    <span>{methodTip.method}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {methodTip.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                        <LightbulbIcon className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Redo att tillämpa best practices?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Kom ihåg att framgångsrika kundinsikter handlar om att ställa rätt frågor, 
                till rätt personer, vid rätt tidpunkt - och sedan agera på svaren.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/getting-started">
                  <Button variant="primary">
                    <BookOpenIcon className="mr-2 h-4 w-4" />
                    Kom igång-guide
                  </Button>
                </Link>
                <Link href="/insights/survey-builder">
                  <Button variant="outline">
                    Skapa din första enkät
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