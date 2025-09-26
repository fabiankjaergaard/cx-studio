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
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon
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
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({})
  const totalSteps = personaSteps.length

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))
  const goToStep = (step: number) => setCurrentStep(step)

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

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

        {/* Step Content */}
        <div className="p-8 pb-32">
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

          {/* Step-Specific Quick Reference Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {currentStep === 0 && (
              <>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <MessageSquareIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">Intervjuteknik</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Ställ öppna frågor och lyssna mer än du talar</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <FileTextIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">Dokumentera allt</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Spela in intervjuer och anteckna observationer</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <UsersIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">Olika perspektiv</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">8-12 intervjuer per segment för mångfald</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            {currentStep === 1 && (
              <>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <BarChart3Icon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">Sök mönster</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Hitta likheter och skillnader i datan</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <TrendingUpIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">Segmentera smart</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Fokusera på beteende och motivation</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <EyeIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">Validera hypoteser</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Testa dina antaganden mot datan</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            {currentStep === 2 && (
              <>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <HeartIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">Empati först</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Fokusera på känslor och motivationer</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <FileTextIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">Berätta historier</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Gör personas levande med narrativ</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <TargetIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">Håll det relevant</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Inkludera bara information som påverkar beslut</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            {currentStep === 3 && (
              <>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <UsersIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">Involvera teamet</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Få alla att känna ägarskap för personorna</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <CheckCircleIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">Testa med kunder</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Validera med riktiga användare</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:bg-slate-200 group-hover:scale-110">
                        <LightbulbIcon className="h-6 w-6 text-slate-600 transition-all duration-300 group-hover:text-slate-700" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-slate-800">Uppdatera regelbundet</h3>
                      <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Håll personas levande och aktuella</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Expandable Sections */}
          <div className="space-y-4 mt-8">
            {/* Step-Specific Expandable Content */}
            {currentStep === 0 && (
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleSection('research')}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <MessageSquareIcon className="h-5 w-5 text-slate-600" />
                      <span>Research-metoder</span>
                    </CardTitle>
                    {expandedSections.research ?
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" /> :
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                </CardHeader>
                {expandedSections.research && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Kundintervjuer</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">8-12 djupintervjuer per segment</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Enkäter</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Kvantitativ validering av hypoteser</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Analytics</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Beteendedata från webb/app</p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )}

            {currentStep === 1 && (
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleSection('analysis')}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <BarChart3Icon className="h-5 w-5 text-slate-600" />
                      <span>Analys-tekniker</span>
                    </CardTitle>
                    {expandedSections.analysis ?
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" /> :
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                </CardHeader>
                {expandedSections.analysis && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Affinity Mapping</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Gruppera liknande insikter och mönster</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Behavioural Clustering</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Segmentera baserat på beteenden</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Pain Point Analysis</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Identifiera och prioritera utmaningar</p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleSection('creation')}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <UserIcon className="h-5 w-5 text-slate-600" />
                      <span>Persona-mallar</span>
                    </CardTitle>
                    {expandedSections.creation ?
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" /> :
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                </CardHeader>
                {expandedSections.creation && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <BrainIcon className="h-4 w-4 mr-2 text-slate-600" />
                          Psykografi (80%)
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Mål och ambitioner</li>
                          <li>• Motivationer och drivkrafter</li>
                          <li>• Värderingar och attityder</li>
                          <li>• Pain points och utmaningar</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <FileTextIcon className="h-4 w-4 mr-2 text-slate-600" />
                          Demografi (20%)
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Namn och ålder</li>
                          <li>• Yrke och inkomst</li>
                          <li>• Geografi och miljö</li>
                          <li>• Teknologianvändning</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => toggleSection('implementation')}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-3">
                      <CheckCircleIcon className="h-5 w-5 text-slate-600" />
                      <span>Implementeringstips</span>
                    </CardTitle>
                    {expandedSections.implementation ?
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" /> :
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                </CardHeader>
                {expandedSections.implementation && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Team Workshops</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Introducera personas för alla teammedlemmar</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Validering</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Testa personas med riktiga användare</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Underhåll</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Uppdatera baserat på ny data och feedback</p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )}


            {/* Step-Specific Mistakes Section */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader
                className="cursor-pointer"
                onClick={() => toggleSection('mistakes')}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    <AlertTriangleIcon className="h-5 w-5 text-red-600" />
                    <span>Vanliga misstag för detta steg</span>
                  </CardTitle>
                  {expandedSections.mistakes ?
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" /> :
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  }
                </div>
              </CardHeader>
              {expandedSections.mistakes && (
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {currentStep === 0 && (
                      <>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">Ledande frågor</h4>
                          <p className="text-sm text-red-600 mb-2">Ställer frågor som leder respondenten mot förväntade svar</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>Lösning:</strong> Använd öppna frågor som "Berätta om..." istället för ja/nej frågor</p>
                        </div>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">För få intervjuer</h4>
                          <p className="text-sm text-red-600 mb-2">Baserar personas på för få datapunkter</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>Lösning:</strong> Minimum 8-12 intervjuer per persona-segment</p>
                        </div>
                      </>
                    )}
                    {currentStep === 1 && (
                      <>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">Demografisk segmentering</h4>
                          <p className="text-sm text-red-600 mb-2">Segmenterar endast baserat på ålder, kön eller geografi</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>Lösning:</strong> Fokusera på beteenden, mål och motivationer</p>
                        </div>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">Konfirmationsbias</h4>
                          <p className="text-sm text-red-600 mb-2">Ser bara mönster som bekräftar befintliga antaganden</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>Lösning:</strong> Aktivt leta efter motsägelser och överraskningar</p>
                        </div>
                      </>
                    )}
                    {currentStep === 2 && (
                      <>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">Stereotyper</h4>
                          <p className="text-sm text-red-600 mb-2">Skapar personas baserade på antaganden snarare än data</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>Lösning:</strong> Använd riktiga citat och specifika beteenden från research</p>
                        </div>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">För många detaljer</h4>
                          <p className="text-sm text-red-600 mb-2">Inkluderar irrelevant information som förvirrar</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>Lösning:</strong> Fokusera på information som påverkar produktbeslut</p>
                        </div>
                      </>
                    )}
                    {currentStep === 3 && (
                      <>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">Glömmer uppdatering</h4>
                          <p className="text-sm text-red-600 mb-2">Personas blir inaktuella och irrelevanta över tid</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>Lösning:</strong> Schemalägg regelbundna uppdateringar baserat på ny data</p>
                        </div>
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-1">Ingen teamkoppling</h4>
                          <p className="text-sm text-red-600 mb-2">Personas förblir abstrakta och används inte aktivt</p>
                          <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700"><strong>Lösning:</strong> Koppla personas till konkreta beslut och användarscenarier</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </div>


        {/* Bottom Navigation with Progress */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="max-w-4xl mx-auto px-8 py-4">
            <div className="flex items-center justify-center space-x-6">
              {/* Back Button */}
              {currentStep > 0 ? (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center"
                >
                  <ChevronLeftIcon className="h-4 w-4 mr-1" />
                  Tillbaka
                </Button>
              ) : (
                <div className="w-20"></div>
              )}

              {/* Progress Bar Center */}
              <div className="flex items-center space-x-3 px-4">
                <span className="text-sm font-medium text-gray-700">
                  {currentStep + 1}/{totalSteps}
                </span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-slate-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentStep + 1) / totalSteps) * 100)}%
                </span>
              </div>

              {/* Next Button */}
              {currentStep < totalSteps - 1 ? (
                <Button
                  variant="primary"
                  onClick={nextStep}
                  className="flex items-center"
                >
                  Nästa
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Link href="/personas/create">
                  <Button variant="primary" className="flex items-center">
                    <PlayIcon className="h-4 w-4 mr-2" />
                    Kom igång
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}