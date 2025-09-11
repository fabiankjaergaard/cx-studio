'use client'

import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  UserIcon, 
  LightbulbIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  SearchIcon,
  BarChart3Icon,
  MessageSquareIcon,
  EyeIcon,
  TargetIcon,
  HeartIcon,
  BrainIcon,
  TrendingUpIcon,
  UsersIcon,
  FileTextIcon
} from 'lucide-react'
import Link from 'next/link'

const personaSteps = [
  {
    step: 1,
    title: "Samla in data",
    icon: SearchIcon,
    duration: "2-4 veckor",
    description: "Grundläggande research för att förstå din målgrupp",
    activities: [
      "Kundintervjuer (8-12 personer per segment)",
      "Enkätundersökningar för kvantitativ data",
      "Analytics-data från webbplats/app",
      "Kundserviceloggar och feedback",
      "Säljteamets observationer"
    ],
    deliverables: ["Research-sammanfattning", "Demografi-data", "Beteendemönster", "Citat och insikter"]
  },
  {
    step: 2,
    title: "Analysera & segmentera",
    icon: BarChart3Icon,
    duration: "1-2 veckor", 
    description: "Identifiera tydliga mönster och grupperingar",
    activities: [
      "Identifiera likheter och skillnader",
      "Gruppera liknande beteenden/behov",
      "Skapa preliminära segment",
      "Validera segment mot affärsmål",
      "Prioritera segment efter värde"
    ],
    deliverables: ["Segment-matrix", "Prioriteringslista", "Validering av hypoteser"]
  },
  {
    step: 3,
    title: "Skapa personas",
    icon: UserIcon,
    duration: "1 vecka",
    description: "Bygga detaljerade persona-profiler",
    activities: [
      "Definiera persona-template",
      "Fylla i demografiska data",
      "Beskriva mål och motivationer",
      "Lista pain points och utmaningar",
      "Ge personas namn och personlighet"
    ],
    deliverables: ["Färdiga persona-profiler", "Persona-kort", "Användningsscenarier"]
  },
  {
    step: 4,
    title: "Validera & förfina",
    icon: CheckCircleIcon,
    duration: "1-2 veckor",
    description: "Testa och förbättra personas med stakeholders",
    activities: [
      "Presentera för teamet",
      "Validera mot riktig kunddata",
      "Få feedback från säljteam",
      "Justera baserat på input",
      "Skapa final version"
    ],
    deliverables: ["Validerade personas", "Feedback-sammanfattning", "Implementeringsplan"]
  }
]

const personaElements = [
  {
    category: "Demografisk information",
    icon: FileTextIcon,
    color: "text-slate-600 bg-slate-100",
    elements: [
      {
        field: "Namn & foto",
        description: "Gör personen verklig och minnesvärd",
        tips: ["Använd realistiska namn för din marknad", "Undvik stockfotos - använd illustrationer eller avatars", "Välj namn som teamet kan relatera till"],
        example: "Anna Andersson, 34 år"
      },
      {
        field: "Ålder & livsfas",
        description: "Påverkar behov, teknologianvändning och prioriteringar",
        tips: ["Använd åldersintervall (25-30) snarare än exakt ålder", "Inkludera livsfas (student, förälder, pensionär)", "Koppla till produktens målgrupp"],
        example: "28-35 år, etablerad i karriären"
      },
      {
        field: "Geografi & miljö",
        description: "Påverkar tillgänglighet, kultur och användarkontext",
        tips: ["Specificera stad/region vid behov", "Inkludera urban/rural om relevant", "Beakta tidszoner för globala produkter"],
        example: "Stockholm, urban miljö"
      }
    ]
  },
  {
    category: "Psykografisk profil",
    icon: BrainIcon,
    color: "text-slate-600 bg-slate-100",
    elements: [
      {
        field: "Mål & ambitioner",
        description: "Vad driver personen och vad vill de uppnå?",
        tips: ["Fokusera på mål relaterade till din produkt", "Inkludera både kortsiktiga och långsiktiga mål", "Koppla till personens värderingar"],
        example: "Effektivisera arbetsprocesser, utveckla karriären"
      },
      {
        field: "Motivationer",
        description: "Varför gör de det de gör? Vad är viktigt för dem?",
        tips: ["Gå djupare än ytan - vad är den verkliga drivkraften?", "Inkludera både rationella och emotionella motivationer", "Koppla till Maslow's behovshierarki"],
        example: "Erkännande från kollegor, trygghet i rollen"
      },
      {
        field: "Värderingar & attityder",
        description: "Personens världssyn och vad de tycker är viktigt",
        tips: ["Inkludera både personliga och professionella värderingar", "Beskriv attityd till teknik, förändring, etc.", "Använd för att förklara beteenden"],
        example: "Värdesätter work-life balance, teknikoptimist"
      }
    ]
  },
  {
    category: "Beteenden & vanor",
    icon: TrendingUpIcon,
    color: "text-slate-600 bg-slate-100",
    elements: [
      {
        field: "Dagliga rutiner",
        description: "Hur ser en typisk dag ut för personen?",
        tips: ["Fokusera på rutiner relevanta för din produkt", "Inkludera både arbets- och fritidsrutiner", "Notera när de är mest/minst aktiva"],
        example: "Kollar email första på morgonen, använder mobila appar pendling"
      },
      {
        field: "Teknologianvändning",
        description: "Vilka verktyg och plattformar använder de?",
        tips: ["Lista både professionella och personliga verktyg", "Inkludera preferenser för kommunikation", "Notera teknik-mognadsgrad"],
        example: "Power-user av Slack, föredrar desktop för arbete"
      },
      {
        field: "Köpbeteende",
        description: "Hur fattar de köpbeslut och vad påverkar dem?",
        tips: ["Beskriv beslutsprocessen steg för steg", "Identifiera påverkare och beslutsfattare", "Inkludera tidsramar för beslut"],
        example: "Researchar noggrant, läser recensioner, frågar kollegor"
      }
    ]
  },
  {
    category: "Pain points & utmaningar",
    icon: AlertTriangleIcon,
    color: "text-slate-600 bg-slate-100",
    elements: [
      {
        field: "Huvudutmaningar",
        description: "Vilka är deras största problem och frustrationer?",
        tips: ["Fokusera på problem din produkt kan lösa", "Rangordna efter allvarlighetsgrad", "Inkludera både funktionella och emotionella pain points"],
        example: "Svårt att hålla koll på alla projekt, för många verktyg"
      },
      {
        field: "Hinder & blockerare",
        description: "Vad hindrar dem från att nå sina mål?",
        tips: ["Identifiera både interna och externa hinder", "Inkludera tidsbrist, budget, politik, etc.", "Förstå konsekvenserna av hindren"],
        example: "Budget-begränsningar, godkännandeprocesser"
      },
      {
        field: "Rädslor & oro",
        description: "Vad är de oroliga för eller rädda att missa?",
        tips: ["Inkludera både rationella och irrationella rädslor", "Förstå vad som står på spel", "Koppla till riskaversion"],
        example: "Rädd att missa deadlines, oro för att inte hänga med"
      }
    ]
  }
]

const commonMistakes = [
  {
    mistake: "Basera personas på antaganden",
    impact: "Personas som inte representerar verkliga användare",
    solution: "Samla in riktig data genom intervjuer, enkäter och observationer",
    prevention: "Kräv minst 8-12 intervjuer per persona-segment"
  },
  {
    mistake: "Skapa för många personas",
    impact: "Team blir förvirrade och fokuserar inte",
    solution: "Begränsa till 3-5 primära personas max",
    prevention: "Prioritera efter affärsvärde och användarvolym"
  },
  {
    mistake: "För generiska eller stereotypa personas",
    impact: "Ger ingen riktning för design eller produktbeslut",
    solution: "Inkludera specifika detaljer och verkliga citat",
    prevention: "Testa om personas känns som riktiga personer teamet kan relatera till"
  },
  {
    mistake: "Personas som 'sätts på hyllan'",
    impact: "Ingen påverkan på faktiska produktbeslut",
    solution: "Integrera personas i alla designprocesser och beslutsfattande",
    prevention: "Skapa persona-posters och använd i alla projekt-kickoffs"
  },
  {
    mistake: "Fokusera bara på demografi",
    impact: "Missar psykografiska insikter som driver beteende",
    solution: "Prioritera mål, motivationer och pain points över ålder/kön",
    prevention: "Använd 80/20-regeln: 20% demografi, 80% psykografi"
  }
]

const personaTemplate = {
  sections: [
    {
      title: "Grundinfo",
      fields: ["Namn", "Ålder", "Plats", "Yrke", "Familjestatus", "Inkomst"]
    },
    {
      title: "Personlighet", 
      fields: ["Beskrivning (2-3 meningar)", "Värderingar", "Personlighetstyp", "Citat som sammanfattar attityd"]
    },
    {
      title: "Mål & Motivationer",
      fields: ["Primära mål", "Sekundära mål", "Vad motiverar dem?", "Vad är framgång för dem?"]
    },
    {
      title: "Utmaningar",
      fields: ["Största frustrationer", "Hinder för att nå mål", "Rädslor & oro", "Vad hindrar köp?"]
    },
    {
      title: "Beteenden",
      fields: ["Daglig rutin", "Teknikanvändning", "Informationskonsumtion", "Köpprocess"]
    },
    {
      title: "Produktrelation",
      fields: ["Nuvarande lösningar", "Varför skulle de välja oss?", "Användningsscenarier", "Success metrics"]
    }
  ]
}

export default function PersonaGuidePage() {
  return (
    <div className="h-full flex flex-col">
      <Header 
        title="Guide: Skapa effektiva personas" 
        description="Lär dig att bygga datadrivna personas som driver bättre produktbeslut"
        actions={
          <div className="flex space-x-2">
            <Link href="/personas">
              <Button variant="outline">
                Tillbaka till personas
              </Button>
            </Link>
            <Link href="/personas">
              <Button variant="primary">
                <UserIcon className="mr-2 h-4 w-4" />
                Skapa persona
              </Button>
            </Link>
          </div>
        }
      />
      
      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        {/* Introduction */}
        <Card className="mb-8 border-l-4 border-l-slate-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-slate-100 rounded-lg">
                <UsersIcon className="h-6 w-6 text-slate-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Vad gör en bra persona?
                </h3>
                <p className="text-gray-600 mb-4">
                  En effektiv persona är mer än demografiska data - den fångar motivationer, beteenden 
                  och pain points som hjälper teamet att förstå och empathisera med riktiga användare. 
                  Bra personas baseras på riktig data och används aktivt i produktbeslut.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="text-lg font-semibold text-gray-900">3-5</div>
                    <div className="text-sm text-gray-600">Personas max per produkt</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="text-lg font-semibold text-gray-900">8-12</div>
                    <div className="text-sm text-gray-600">Intervjuer per persona</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="text-lg font-semibold text-gray-900">80/20</div>
                    <div className="text-sm text-gray-600">Psykografi/Demografi</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Persona-skapande i 4 steg</h2>
          <div className="space-y-6">
            {personaSteps.map((step, index) => (
              <Card key={index} className="border-l-4 border-l-slate-500">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold text-sm">
                          {step.step}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <step.icon className="h-4 w-4 mr-1" />
                        {step.duration}
                      </div>
                    </div>

                    <div className="lg:col-span-1">
                      <h4 className="font-medium text-gray-900 mb-2">Aktiviteter:</h4>
                      <ul className="space-y-1">
                        {step.activities.map((activity, activityIndex) => (
                          <li key={activityIndex} className="text-sm text-gray-600 flex items-start">
                            <CheckCircleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="lg:col-span-1">
                      <h4 className="font-medium text-gray-900 mb-2">Leverabler:</h4>
                      <ul className="space-y-1">
                        {step.deliverables.map((deliverable, delivIndex) => (
                          <li key={delivIndex} className="text-sm text-gray-600 pl-4 border-l-2 border-l-slate-200">
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Persona Elements */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vad ska ingå i en persona?</h2>
          <div className="space-y-8">
            {personaElements.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                  {category.elements.map((element, elementIndex) => (
                    <Card key={elementIndex}>
                      <CardHeader>
                        <CardTitle className="text-base">{element.field}</CardTitle>
                        <p className="text-sm text-gray-600">{element.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Tips:</h5>
                          <ul className="space-y-1">
                            {element.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-sm text-gray-600 flex items-start">
                                <LightbulbIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                          <h5 className="font-medium text-gray-900 mb-1">Exempel:</h5>
                          <p className="text-sm text-gray-700 italic">"{element.example}"</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Persona Template */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Persona-mall</h2>
          <Card>
            <CardHeader>
              <CardTitle>Komplett persona-template</CardTitle>
              <p className="text-gray-600">Använd denna struktur för att skapa konsekventa personas</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personaTemplate.sections.map((section, index) => (
                  <div key={index} className="border-l-4 border-l-gray-200 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-3">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.fields.map((field, fieldIndex) => (
                        <li key={fieldIndex} className="text-sm text-gray-700 flex items-center">
                          <div className="w-2 h-2 bg-slate-400 rounded-full mr-2 flex-shrink-0"></div>
                          {field}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <FileTextIcon className="h-5 w-5 text-slate-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-slate-800 mb-1">Pro-tips för personas</h5>
                    <ul className="text-sm text-slate-700 space-y-1">
                      <li>• Håll personas till 1-2 sidor max - längre läser ingen</li>
                      <li>• Använd verkliga citat från intervjuer för autenticitet</li>
                      <li>• Inkludera foto eller avatar som teamet kan komma ihåg</li>
                      <li>• Uppdatera personas varje 6-12 månader</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Common Mistakes */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vanliga misstag att undvika</h2>
          <div className="space-y-4">
            {commonMistakes.map((mistake, index) => (
              <Card key={index} className="border-l-4 border-l-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <AlertTriangleIcon className="h-6 w-6 text-slate-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{mistake.mistake}</h3>
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

        {/* Research Methods */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Research-metoder för persona-data</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-slate-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MessageSquareIcon className="h-6 w-6 text-slate-600" />
                  <CardTitle>Kvalitativa metoder</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Kundintervjuer</h4>
                    <p className="text-sm text-gray-600">8-12 djupintervjuer per segment för att förstå motivationer</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Observationer</h4>
                    <p className="text-sm text-gray-600">Se hur kunder faktiskt beter sig i naturlig miljö</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Fokusgrupper</h4>
                    <p className="text-sm text-gray-600">Utforska attityder och sociala påverkningsfaktorer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-slate-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <BarChart3Icon className="h-6 w-6 text-slate-600" />
                  <CardTitle>Kvantitativa metoder</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Enkätundersökningar</h4>
                    <p className="text-sm text-gray-600">Validera hypoteser och få statistisk data om segments</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Analytics</h4>
                    <p className="text-sm text-gray-600">Beteendedata från webbplats, app eller andra digitala touchpoints</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">A/B-tester</h4>
                    <p className="text-sm text-gray-600">Testa persona-antaganden mot faktiskt användarbeteende</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-slate-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <EyeIcon className="h-6 w-6 text-slate-600" />
                  <CardTitle>Sekundära källor</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">Kundservice-loggar</h4>
                    <p className="text-sm text-gray-600">Pain points och vanliga frågor från support-kanaler</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Säljteamets insights</h4>
                    <p className="text-sm text-gray-600">Direktkontakt med kunder ger värdefulla observationer</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Branschrapporter</h4>
                    <p className="text-sm text-gray-600">Marknadsdata och trender för att komplettera egen research</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Redo att skapa dina första personas?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Kom ihåg att personas är verktyg för att hjälpa teamet förstå användare - de ska vara 
                baserade på riktig data och användas aktivt i produktbeslut för att vara värdefulla.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/personas">
                  <Button variant="primary">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Skapa din första persona
                  </Button>
                </Link>
                <Link href="/insights/interviews">
                  <Button variant="outline">
                    Lär dig om kundintervjuer
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