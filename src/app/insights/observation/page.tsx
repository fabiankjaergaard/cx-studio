'use client'

import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  EyeIcon, 
  ClockIcon, 
  LightbulbIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  CameraIcon,
  MapIcon,
  UserIcon,
  NotebookIcon,
  ShieldIcon,
  TrendingUpIcon
} from 'lucide-react'
import Link from 'next/link'

const observationTypes = [
  {
    type: "Naturalistisk observation",
    icon: EyeIcon,
    description: "Observera i naturlig miljö utan inblandning",
    duration: "2-4 timmar per session",
    when: "För att förstå spontant beteende och naturliga arbetssätt",
    pros: ["Autentiskt beteende", "Oväntade upptäckter", "Kontext och miljöfaktorer"],
    cons: ["Svårt att kontrollera", "Etiska överväganden", "Kan vara tidskrävande"],
    examples: ["Observera kunder i butik", "Följa en användare på jobbet", "Se hur familjer använder produkten hemma"]
  },
  {
    type: "Strukturerad observation",
    icon: NotebookIcon,
    description: "Förutbestämd checklista och fokusområden",
    duration: "1-2 timmar per session",
    when: "När du har specifika frågor att besvara",
    pros: ["Fokuserade insikter", "Enklare att analysera", "Jämförbara data"],
    cons: ["Kan missa oväntade beteenden", "Mindre flexibel", "Risk för confirmation bias"],
    examples: ["Usability-tester", "Checkout-process observation", "Onboarding-flow analys"]
  },
  {
    type: "Participant observation",
    icon: UserIcon,
    description: "Forskaren deltar i aktiviteten som observeras",
    duration: "Flera timmar till dagar",
    when: "För djup förståelse av komplexa processer",
    pros: ["Mycket djup förståelse", "Första handsperspektiv", "Bygger stark empati"],
    cons: ["Mycket tidskrävande", "Risk att påverka utfallet", "Svårt att förbli objektiv"],
    examples: ["Shadow en säljare hela dagen", "Använda produkten som kund", "Delta i kundmöten"]
  }
]

const observationSteps = [
  {
    step: 1,
    title: "Förberedelse",
    icon: MapIcon,
    tasks: [
      "Definiera vad du vill observera och varför",
      "Få tillstånd från deltagare och organisation",
      "Förbered observationsguide/checklista",
      "Testa inspelningsutrustning",
      "Planera logistik och access"
    ]
  },
  {
    step: 2,
    title: "Genomförande", 
    icon: EyeIcon,
    tasks: [
      "Introducera dig diskret och neutralt",
      "Dokumentera beteenden, inte tolkningar",
      "Notera tid, plats och sammanhang",
      "Observera både verbala och icke-verbala signaler",
      "Ställ klargörande frågor vid behov"
    ]
  },
  {
    step: 3,
    title: "Dokumentation",
    icon: CameraIcon,
    tasks: [
      "Skriv ut detaljerade fältanteckningar direkt",
      "Organisera foton och videoklipp",
      "Notera dina egna reflektioner separat",
      "Säkerställ konfidentialitet i all dokumentation",
      "Skapa initial sammanfattning samma dag"
    ]
  },
  {
    step: 4,
    title: "Analys",
    icon: TrendingUpIcon,
    tasks: [
      "Identifiera mönster och avvikelser",
      "Koppla observationer till ursprungliga frågor",
      "Triangulera med andra datakällor",
      "Skapa persona-insights och user journeys",
      "Utveckla handlingsbara rekommendationer"
    ]
  }
]

const whatToObserve = [
  {
    category: "Beteenden",
    description: "Vad gör människor faktiskt?",
    examples: [
      "Vilka steg tar de för att lösa uppgifter?",
      "Var pausar eller tvekar de?",
      "Vilka genvägar eller workarounds använder de?",
      "Hur hanterar de fel eller problem?",
      "Vilka verktyg/resurser använder de mest?"
    ]
  },
  {
    category: "Interaktioner",
    description: "Hur samspelar de med andra och miljön?",
    examples: [
      "Vem frågar de när de behöver hjälp?",
      "Hur kommunicerar de med kollegor/familj?",
      "Vilka sociala normer följer eller bryter de?",
      "Hur påverkar omgivningen deras beteende?",
      "Vilka avbrott eller störningar händer?"
    ]
  },
  {
    category: "Känslor & reaktioner",
    description: "Vad avslöjar kroppsspråk och uttryck?",
    examples: [
      "När ser de frustrerade, nöjda eller förvirrade ut?",
      "Vilka ansiktsuttryck gör de vid olika moment?",
      "Hur förändras deras energinivå över tid?",
      "Vilka verbala och icke-verbala tecken på stress?",
      "När verkar de mest engagerade eller distraherade?"
    ]
  },
  {
    category: "Miljö & kontext",
    description: "Hur påverkar omgivningen beteendet?",
    examples: [
      "Vilka fysiska hinder eller möjliggörare finns?",
      "Hur används rummet/platsen?",
      "Vilka distraktioner eller störningar förekommer?",
      "Vilken teknisk miljö arbetar de i?",
      "Hur påverkas de av tid på dagen/vecka?"
    ]
  }
]

const ethicalGuidelines = [
  {
    principle: "Informerat samtycke",
    description: "Deltagare ska veta vad som observeras och varför",
    practices: [
      "Förklara syftet tydligt innan observation",
      "Ge rätt att avbryta när som helst",
      "Tydliggör vad som kommer att spelas in",
      "Förklara hur data kommer att användas"
    ]
  },
  {
    principle: "Konfidentialitet",
    description: "Skydda deltagarnas integritet och privatliv",
    practices: [
      "Anonymisera all dokumentation",
      "Säker lagring av känslig data",
      "Begränsa vem som har tillgång till rådata",
      "Var försiktig med foton som visar ansikten"
    ]
  },
  {
    principle: "Minimal påverkan",
    description: "Störa så lite som möjligt i naturligt beteende",
    practices: [
      "Var diskret och icke-påträngande",
      "Undvik att ställa ledande frågor",
      "Respektera personliga och professionella gränser",
      "Anpassa observationsstil efter situation"
    ]
  }
]

const commonChallenges = [
  {
    challenge: "Observer bias",
    description: "Att se det du förväntar dig att se",
    solution: "Använd strukturerade observationsguider och flera observatörer",
    prevention: "Diskutera förväntningar och bias innan observation"
  },
  {
    challenge: "Hawthorne-effekten",
    description: "Personer beter sig annorlunda när de vet att de observeras",
    solution: "Långa observationsperioder och diskret närvaro",
    prevention: "Förklara att du observerar processer, inte bedömer personer"
  },
  {
    challenge: "Confirmation bias",
    description: "Fokusera på data som bekräftar befintliga teorier",
    solution: "Aktivt leta efter motbevis och alternativa förklaringar",
    prevention: "Ha tydliga, neutrala observationskriterier"
  },
  {
    challenge: "För mycket data",
    description: "Överväldigas av mängden observationer",
    solution: "Fokusera på specifika forskningsfrågor och teman",
    prevention: "Skapa struktur för vad som ska observeras och dokumenteras"
  }
]

export default function ObservationPage() {
  return (
    <div className="h-full flex flex-col">
      <Header 
        title="Användarobservation" 
        description="Se vad användare verkligen gör, inte bara vad de säger"
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
        <Card className="mb-8 border-l-4 border-l-indigo-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <EyeIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Varför observera användare?
                </h3>
                <p className="text-gray-600 mb-4">
                  Observation avslöjar skillnaden mellan vad människor säger att de gör och vad de 
                  faktiskt gör. Det ger autentiska insikter om faktiskt beteende, dolda behov och 
                  oväntade användningsmönster som intervjuer och enkäter missar.
                </p>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-lg font-semibold text-indigo-700 mb-2">
                    "Actions speak louder than words"
                  </div>
                  <p className="text-sm text-indigo-600">
                    Människor är ofta omedvetna om sina egna beteendemönster eller rationaliserar 
                    dem i efterhand. Observation fångar sanningen i realtid.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Observation Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Typer av observation</h2>
          <div className="space-y-6">
            {observationTypes.map((type, index) => (
              <Card key={index} className="border-l-4 border-l-indigo-500">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <type.icon className="h-6 w-6 text-indigo-600" />
                        <h3 className="text-lg font-semibold text-gray-900">{type.type}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {type.duration}
                      </div>
                      <div className="mt-3">
                        <h4 className="font-medium text-gray-900 mb-1">När att använda:</h4>
                        <p className="text-sm text-gray-600">{type.when}</p>
                      </div>
                    </div>

                    <div className="lg:col-span-1">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-green-700 mb-2">Fördelar:</h4>
                          <ul className="space-y-1">
                            {type.pros.map((pro, proIndex) => (
                              <li key={proIndex} className="text-sm text-gray-600 flex items-start">
                                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-red-700 mb-2">Utmaningar:</h4>
                          <ul className="space-y-1">
                            {type.cons.map((con, conIndex) => (
                              <li key={conIndex} className="text-sm text-gray-600 flex items-start">
                                <AlertTriangleIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-1">
                      <h4 className="font-medium text-gray-900 mb-2">Exempel:</h4>
                      <ul className="space-y-1">
                        {type.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="text-sm text-gray-600 pl-4 border-l-2 border-l-indigo-200">
                            {example}
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

        {/* Process Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Observationsprocessen</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {observationSteps.map((step, index) => (
              <Card key={index} className="relative border-t-4 border-t-indigo-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                    <CardTitle className="text-base">{step.title}</CardTitle>
                  </div>
                  <step.icon className="h-6 w-6 text-indigo-600 mt-2" />
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {step.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="text-xs text-gray-600 flex items-start">
                        <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                {/* Arrow to next step */}
                {index < observationSteps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* What to Observe */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibend text-gray-900 mb-6">Vad ska du observera?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {whatToObserve.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                  <p className="text-gray-600">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="text-sm text-gray-700 flex items-start">
                        <EyeIcon className="h-4 w-4 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ethical Guidelines */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Etiska riktlinjer</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ethicalGuidelines.map((guideline, index) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <ShieldIcon className="h-6 w-6 text-green-600" />
                    <CardTitle className="text-lg">{guideline.principle}</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">{guideline.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {guideline.practices.map((practice, practiceIndex) => (
                      <li key={practiceIndex} className="text-sm text-gray-700 flex items-start">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {practice}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Challenges */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vanliga utmaningar</h2>
          <div className="space-y-4">
            {commonChallenges.map((challenge, index) => (
              <Card key={index} className="border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <AlertTriangleIcon className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">{challenge.challenge}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Problem:</h4>
                          <p className="text-gray-600">{challenge.description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Lösning:</h4>
                          <p className="text-gray-600">{challenge.solution}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Förebygga:</h4>
                          <p className="text-gray-600">{challenge.prevention}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Documentation Tips */}
        <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-0">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <NotebookIcon className="h-8 w-8 text-indigo-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Tips för effektiv dokumentation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Notera beteenden, inte tolkningar</strong> - "Användaren klickade 3 gånger" inte "användaren verkade förvirrad"</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Använd timestamps</strong> - dokumentera när saker händer för analys</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Separera fakta från tolkningar</strong> - ha olika kolumner för varje</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Dokumentera omgivning</strong> - fysisk miljö påverkar beteende</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Fånga citat</strong> - verbala uttryck ger kontext till beteenden</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Skriv ut direkt efter</strong> - minnet försvinner snabbt</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Planera din första observation
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Kom ihåg: Observation handlar om att förstå skillnaden mellan vad människor säger 
                och vad de gör. Var tålmodig, neutral och öppen för överraskningar.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/getting-started">
                  <Button variant="primary">
                    Kom igång-guide
                  </Button>
                </Link>
                <Link href="/insights/interviews">
                  <Button variant="outline">
                    Kombinera med intervjuer
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