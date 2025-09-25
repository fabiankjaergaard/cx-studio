'use client'

import React, { useState } from 'react'
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
  FileTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  ClockIcon
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
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = personaSteps.length

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))
  const goToStep = (step: number) => setCurrentStep(step)

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header
        title="Guide: Skapa effektiva personas"
        description={`Steg ${currentStep + 1} av ${totalSteps}: ${personaSteps[currentStep].title}`}
        actions={
          <div className="flex space-x-2">
            <Link href="/personas">
              <Button variant="outline">
                Tillbaka till personas
              </Button>
            </Link>
            <Link href="/personas/create">
              <Button variant="primary">
                <PlayIcon className="mr-2 h-4 w-4" />
                Börja skapa persona
              </Button>
            </Link>
          </div>
        }
      />
      <div className="flex-1 overflow-auto bg-gray-50 min-h-0">
        {/* Progress Steps Navigation */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            {/* Step indicators */}
            <div className="flex items-center space-x-4">
              {personaSteps.map((step, index) => (
                <button
                  key={step.step}
                  onClick={() => goToStep(index)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    index === currentStep
                      ? 'bg-slate-700 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    index === currentStep ? 'bg-white text-slate-700' : ''
                  }`}>
                    {index < currentStep ? (
                      <CheckCircleIcon className="w-4 h-4" />
                    ) : (
                      step.step
                    )}
                  </div>
                  <span className="text-sm font-medium hidden md:block">{step.title}</span>
                </button>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                Föregående
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextStep}
                disabled={currentStep === totalSteps - 1}
              >
                Nästa
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-8">
          {/* Current Step Content */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-slate-100 rounded-xl">
                  {React.createElement(personaSteps[currentStep].icon, {
                    className: "h-8 w-8 text-slate-600"
                  })}
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    Steg {personaSteps[currentStep].step}: {personaSteps[currentStep].title}
                  </CardTitle>
                  <p className="text-gray-600 mt-2">{personaSteps[currentStep].description}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    Tidsåtgång: {personaSteps[currentStep].duration}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktiviteter</h3>
                  <ul className="space-y-3">
                    {personaSteps[currentStep].activities.map((activity, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-5 w-5 text-slate-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Leverabler</h3>
                  <div className="space-y-3">
                    {personaSteps[currentStep].deliverables.map((deliverable, index) => (
                      <div key={index} className="p-3 bg-gray-50 border-l-4 border-l-slate-400 rounded-r">
                        <span className="text-gray-700 font-medium">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step-specific content */}
          {currentStep === 0 && (
            <div className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vad gör en bra persona?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    En effektiv persona är mer än demografiska data - den fångar motivationer, beteenden
                    och pain points som hjälper teamet att förstå och empathisera med riktiga användare.
                    Bra personas baseras på riktig data och används aktivt i produktbeslut.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-slate-700 mb-1">3-5</div>
                      <div className="text-sm text-gray-600">Personas max per produkt</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-slate-700 mb-1">8-12</div>
                      <div className="text-sm text-gray-600">Intervjuer per persona</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-2xl font-bold text-slate-700 mb-1">80/20</div>
                      <div className="text-sm text-gray-600">Psykografi/Demografi</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Viktiga tips för datainsamling</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 border border-green-200 rounded">
                        <div className="flex items-start space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-green-800 text-sm mb-1">Gör så här:</h5>
                            <p className="text-sm text-green-700">Starta alltid med research innan du skapar personas</p>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-600 flex items-start">
                          <LightbulbIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Kombinera intervjuer med enkätdata för att validera mönster
                        </li>
                        <li className="text-sm text-gray-600 flex items-start">
                          <LightbulbIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Inkludera säljteamets och kundsupportens observationer
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 bg-red-50 border border-red-200 rounded">
                        <div className="flex items-start space-x-2">
                          <AlertTriangleIcon className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-red-800 text-sm mb-1">Undvik detta:</h5>
                            <p className="text-sm text-red-700">Skapa personas baserat enbart på antaganden</p>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-600 flex items-start">
                          <AlertTriangleIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Anta vad användare vill utan att fråga dem
                        </li>
                        <li className="text-sm text-gray-600 flex items-start">
                          <AlertTriangleIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Fokusera bara på demografi som ålder och kön
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 1 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Research-metoder för persona-data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="border-l-4 border-l-slate-500 pl-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <MessageSquareIcon className="h-5 w-5 text-slate-600" />
                      <h3 className="font-semibold text-gray-900">Kvalitativa metoder</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900">Kundintervjuer</h4>
                        <p className="text-sm text-gray-600">8-12 djupintervjuer per segment för att förstå motivationer</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Observationer</h4>
                        <p className="text-sm text-gray-600">Se hur kunder faktiskt beter sig i naturlig miljö</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-l-slate-500 pl-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <BarChart3Icon className="h-5 w-5 text-slate-600" />
                      <h3 className="font-semibold text-gray-900">Kvantitativa metoder</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900">Enkätundersökningar</h4>
                        <p className="text-sm text-gray-600">Validera hypoteser och få statistisk data</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Analytics</h4>
                        <p className="text-sm text-gray-600">Beteendedata från webbplats och app</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-l-4 border-l-slate-500 pl-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <EyeIcon className="h-5 w-5 text-slate-600" />
                      <h3 className="font-semibold text-gray-900">Sekundära källor</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900">Kundservice-loggar</h4>
                        <p className="text-sm text-gray-600">Pain points från support-kanaler</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Säljteamets insights</h4>
                        <p className="text-sm text-gray-600">Värdefulla observationer från säljare</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vad ska ingå i en persona?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Fokusera på psykografi (80%) över demografi (20%). Det är motivationer och mål som driver beteende, inte ålder eller kön.
                  </p>
                  <div className="space-y-6">
                    {personaElements.slice(0, 2).map((category, categoryIndex) => (
                      <div key={categoryIndex}>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`p-2 rounded-lg ${category.color}`}>
                            {React.createElement(category.icon, { className: "h-5 w-5" })}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {category.elements.slice(0, 2).map((element, elementIndex) => (
                            <div key={elementIndex} className="p-4 bg-gray-50 rounded-lg border">
                              <h4 className="font-medium text-gray-900 mb-2">{element.field}</h4>
                              <p className="text-sm text-gray-600 mb-3">{element.description}</p>
                              <div className="text-xs text-gray-700 italic">"{element.example}"</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best practices för persona-skapande</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 border border-green-200 rounded">
                        <div className="flex items-start space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-green-800 text-sm mb-1">Gör så här:</h5>
                            <p className="text-sm text-green-700">Håll personas till 1-2 sidor max</p>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-600 flex items-start">
                          <LightbulbIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Använd verkliga citat från intervjuer för autenticitet
                        </li>
                        <li className="text-sm text-gray-600 flex items-start">
                          <LightbulbIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Ge personas namn som teamet kan komma ihåg
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 bg-red-50 border border-red-200 rounded">
                        <div className="flex items-start space-x-2">
                          <AlertTriangleIcon className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-red-800 text-sm mb-1">Undvik detta:</h5>
                            <p className="text-sm text-red-700">Skapa så många personas att teamet blir förvirrat</p>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-600 flex items-start">
                          <AlertTriangleIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Långa texter som ingen kommer att läsa
                        </li>
                        <li className="text-sm text-gray-600 flex items-start">
                          <AlertTriangleIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Generiska beskrivningar utan karaktär
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vanliga misstag att undvika</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    Lär av andra team misstag och spara tid genom att undvika dessa vanliga fallgropar i persona-validering.
                  </p>
                  <div className="space-y-4">
                    {commonMistakes.slice(0, 3).map((mistake, index) => (
                      <div key={index} className="border-l-4 border-l-red-200 pl-4 py-3">
                        <div className="flex items-start space-x-3">
                          <AlertTriangleIcon className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">{mistake.mistake}</h3>
                            <p className="text-sm text-gray-600 mb-2"><strong>Påverkan:</strong> {mistake.impact}</p>
                            <p className="text-sm text-gray-600"><strong>Lösning:</strong> {mistake.solution}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tips för framgångsrik implementation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 border border-green-200 rounded">
                        <div className="flex items-start space-x-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-green-800 text-sm mb-1">Gör så här:</h5>
                            <p className="text-sm text-green-700">Integrera personas i alla processer från dag ett</p>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-600 flex items-start">
                          <LightbulbIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Ha persona-posters synliga i arbetsområdet
                        </li>
                        <li className="text-sm text-gray-600 flex items-start">
                          <LightbulbIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Ställ frågan "Vad skulle Anna göra?" i beslutssituationer
                        </li>
                        <li className="text-sm text-gray-600 flex items-start">
                          <LightbulbIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Granska och uppdatera personas var 6:e månad
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <div className="p-3 bg-red-50 border border-red-200 rounded">
                        <div className="flex items-start space-x-2">
                          <AlertTriangleIcon className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-red-800 text-sm mb-1">Undvik detta:</h5>
                            <p className="text-sm text-red-700">Skapa personas som bara läggs på hyllan</p>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-600 flex items-start">
                          <AlertTriangleIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Låta personas bli inaktuella och föråldrade
                        </li>
                        <li className="text-sm text-gray-600 flex items-start">
                          <AlertTriangleIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Skapa personas isolerat utan team-input
                        </li>
                        <li className="text-sm text-gray-600 flex items-start">
                          <AlertTriangleIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                          Perfekta personas utan realistiska brister
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <Card className="bg-slate-50 border-slate-200 mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {currentStep === totalSteps - 1
                  ? "Redo att skapa dina första personas?"
                  : "Fortsätt till nästa steg"}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {currentStep === totalSteps - 1
                  ? "Kom ihåg att personas är verktyg för att hjälpa teamet förstå användare - de ska vara baserade på riktig data och används aktivt i produktbeslut för att vara värdefulla."
                  : "Navigera mellan stegen för att lära dig mer om persona-skapande processen."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {currentStep === totalSteps - 1 ? (
                  <>
                    <Link href="/personas/create">
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
                  </>
                ) : (
                  <Button variant="primary" onClick={nextStep}>
                    Nästa steg: {personaSteps[currentStep + 1]?.title}
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}