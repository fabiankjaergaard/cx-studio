'use client'

import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  ArrowRightIcon, 
  CheckCircleIcon, 
  AlertCircleIcon,
  TrendingUpIcon,
  BarChart3Icon,
  MessageSquareIcon,
  ClipboardIcon,
  UsersIcon,
  MicIcon,
  EyeIcon,
  LightbulbIcon
} from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    step: 1,
    title: "Definiera ditt syfte",
    description: "Vad vill du ta reda på och varför?",
    details: [
      "Identifiera specifika frågor du vill ha svar på",
      "Bestäm vilka beslut som kommer att baseras på resultaten", 
      "Sätt upp tydliga mål och framgångskriterier"
    ]
  },
  {
    step: 2,
    title: "Välj rätt metod",
    description: "Kvantitativ för 'vad' och 'hur mycket', kvalitativ för 'varför'",
    details: [
      "Kvantitativa metoder: NPS, CSAT, CES för mätbara insikter",
      "Kvalitativa metoder: Intervjuer, observationer för fördjupad förståelse",
      "Kombinera båda för en heltäckande bild"
    ]
  },
  {
    step: 3,
    title: "Planera datainsamling",
    description: "Vem ska du fråga, när och hur ofta?",
    details: [
      "Definiera din målgrupp och urvalskriterier",
      "Bestäm sampelstorlek baserat på dina mål",
      "Planera timing - undvik helger, semestrar, stora förändringar"
    ]
  },
  {
    step: 4,
    title: "Samla in data",
    description: "Genomför din undersökning professionellt",
    details: [
      "Använd tydliga, neutrala frågor utan ledande formuleringar",
      "Testa dina verktyg innan lansering",
      "Följ upp för att säkerställa tillräcklig respons"
    ]
  },
  {
    step: 5,
    title: "Analysera & agera",
    description: "Omvandla data till handlingsbara insikter",
    details: [
      "Identifiera mönster och trender i datan",
      "Koppla insikterna till specifika touchpoints i kundresan",
      "Skapa konkreta handlingsplaner baserat på resultaten"
    ]
  }
]

const methodGuide = [
  {
    category: "När ska jag använda...",
    methods: [
      {
        name: "NPS-enkäter",
        icon: TrendingUpIcon,
        when: "Du vill mäta kundlojalitet över tid",
        frequency: "Kvartalsvis eller efter viktiga milstolpar",
        sample: "200+ respondenter för statistisk säkerhet",
        color: "text-blue-600"
      },
      {
        name: "CSAT-enkäter", 
        icon: BarChart3Icon,
        when: "Du vill mäta nöjdhet med specifika interaktioner",
        frequency: "Efter varje transaktion eller kontakt",
        sample: "50+ per touchpoint för tillförlitliga resultat",
        color: "text-green-600"
      },
      {
        name: "CES-enkäter",
        icon: ClipboardIcon,
        when: "Du vill identifiera friktion i processer",
        frequency: "Efter komplexa processer eller när problem rapporteras",
        sample: "100+ för att identifiera förbättringsområden",
        color: "text-purple-600"
      },
      {
        name: "Kundintervjuer",
        icon: MicIcon,
        when: "Du behöver djupförståelse för beteenden och motivationer",
        frequency: "Månadsvis eller innan större förändringar",
        sample: "8-12 intervjuer per målgrupp för mättnad",
        color: "text-orange-600"
      },
      {
        name: "Fokusgrupper",
        icon: UsersIcon,
        when: "Du vill utforska nya idéer eller koncept",
        frequency: "Vid produktutveckling eller strategiska beslut",
        sample: "2-3 grupper med 6-8 deltagare vardera",
        color: "text-pink-600"
      },
      {
        name: "Observation",
        icon: EyeIcon,
        when: "Du vill se vad kunder verkligen gör (inte bara säger)",
        frequency: "Vid större förändringar eller problemlösning",
        sample: "10-20 observationer för mönsteridentifiering",
        color: "text-indigo-600"
      }
    ]
  }
]

const commonMistakes = [
  {
    mistake: "För långa enkäter",
    solution: "Håll enkäter under 5 minuter. Fokusera på det viktigaste."
  },
  {
    mistake: "Ledande frågor",
    solution: "Använd neutrala formuleringar. Testa frågor innan lansering."
  },
  {
    mistake: "Dålig timing",
    solution: "Skicka enkäter när upplevelsen är färsk i minnet."
  },
  {
    mistake: "Inget uppföljning",
    solution: "Kommunicera tillbaka vad du lärt dig och vilka ändringar du gör."
  },
  {
    mistake: "Data utan handling",
    solution: "Skapa konkreta handlingsplaner för varje viktig insikt."
  }
]

export default function GettingStartedPage() {
  return (
    <div className="h-full flex flex-col">
      <Header 
        title="Kom igång med kundinsikter" 
        description="En steg-för-steg guide för att samla in och använda kunddata effektivt"
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
        <Card className="mb-8 border-l-4 border-l-green-500 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <LightbulbIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Framgångsrik datainsamling i 5 steg
                </h3>
                <p className="text-gray-700">
                  Följ denna guide för att säkerställa att du samlar in rätt data, på rätt sätt, 
                  från rätt personer - och mest viktigt, att du faktiskt använder insikterna för att förbättra kundupplevelsen.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Processen steg för steg</h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card key={step.step} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      {index < steps.length - 1 && (
                        <div className="flex justify-end mt-4">
                          <ArrowRightIcon className="h-5 w-5 text-gray-300" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Method Selection Guide */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Metodval - när ska jag använda vad?</h2>
          <div className="space-y-6">
            {methodGuide.map((section) => (
              <Card key={section.category}>
                <CardHeader>
                  <CardTitle>{section.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {section.methods.map((method) => (
                      <div key={method.name} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center space-x-3 mb-3">
                          <method.icon className={`h-5 w-5 ${method.color}`} />
                          <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">När:</span>
                            <span className="text-gray-600 ml-1">{method.when}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Frekvens:</span>
                            <span className="text-gray-600 ml-1">{method.frequency}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Sampel:</span>
                            <span className="text-gray-600 ml-1">{method.sample}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vanliga misstag att undvika</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {commonMistakes.map((item, index) => (
                  <div key={index} className="border-l-4 border-l-red-200 pl-4 py-2">
                    <div className="flex items-start space-x-3">
                      <AlertCircleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-800 mb-1">{item.mistake}</h4>
                        <p className="text-gray-600 text-sm">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Redo att börja?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Nu när du förstår grunderna, dags att välja din första metod och börja samla in kundinsikter.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/survey-builder">
                  <Button variant="primary">
                    Skapa din första enkät
                  </Button>
                </Link>
                <Link href="/insights/best-practices">
                  <Button variant="outline">
                    Läs best practices
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