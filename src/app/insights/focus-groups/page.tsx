'use client'

import { Header } from '@/components/dashboard/Header'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  UsersIcon, 
  ClockIcon, 
  LightbulbIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  UserCheckIcon,
  MessageSquareIcon,
  TargetIcon,
  PlayIcon,
  PauseIcon,
  RecordIcon
} from 'lucide-react'
import Link from 'next/link'

const getFocusGroupPhases = (t: (key: string) => string) => [
  {
    phase: t('focusGroups.planningPhase'),
    duration: t('focusGroups.planningDuration'),
    icon: TargetIcon,
    tasks: [
      "Definiera syfte och forskningsfrågor",
      "Rekrytera deltagare (6-8 personer per grupp)",
      "Boka lokal och teknisk utrustning",
      "Skapa diskussionsguide",
      "Förbered material och prototyper"
    ]
  },
  {
    phase: t('focusGroups.implementationPhase'), 
    duration: t('focusGroups.implementationDuration'),
    icon: PlayIcon,
    tasks: [
      "Välkomna deltagare och introduktion",
      "Genomför diskussion enligt guide",
      "Moderera och hålla fokus",
      "Spela in (med tillstånd)",
      "Avsluta med tack och kompensation"
    ]
  },
  {
    phase: t('focusGroups.analysisPhase'),
    duration: t('focusGroups.analysisDuration'), 
    icon: LightbulbIcon,
    tasks: [
      "Transkribera inspelningar",
      "Identifiera teman och mönster",
      "Analysera gruppodynamik",
      "Sammanställa huvudinsikter",
      "Skapa rapport med rekommendationer"
    ]
  }
]

const bestPractices = [
  {
    category: "Rekrytering",
    icon: UserCheckIcon,
    color: "text-gray-600 bg-gray-100",
    practices: [
      {
        title: "Homogen men inte för likartad",
        description: "Deltagare bör ha liknande bakgrund men olika perspektiv",
        tips: ["Samma målgrupp/segment", "Varierande åsikter/erfarenheter", "Undvik extremt olika bakgrunder", "6-8 deltagare per grupp"]
      },
      {
        title: "Rätt incitament",
        description: "Kompensation som motiverar deltagande utan att snedvrida svar",
        tips: ["Pengakompensation eller presentkort", "Rimlig ersättning för tid", "Undvik för höga belopp", "Tydlig kommunikation om ersättning"]
      }
    ]
  },
  {
    category: "Moderering",
    icon: MessageSquareIcon,
    color: "text-gray-600 bg-gray-100", 
    practices: [
      {
        title: "Neutral men engagerad ledning",
        description: "Guida samtalet utan att påverka svaren",
        tips: ["Ställ öppna frågor", "Uppmuntra alla att delta", "Hantera dominanta deltagare", "Följ upp med 'Varför?'"]
      },
      {
        title: "Hantera gruppynamik",
        description: "Se till att alla röster hörs och grupptänk undviks",
        tips: ["Rotera vem som börjar svara", "Separata rundor innan diskussion", "Hantera konflikter professionellt", "Observera kroppsspråk"]
      }
    ]
  },
  {
    category: "Analys",
    icon: LightbulbIcon,
    color: "text-gray-600 bg-gray-100",
    practices: [
      {
        title: "Separera individuell vs grupp-åsikter",
        description: "Förstå vad som är personliga åsikter vs gruppinfluerat",
        tips: ["Notera vem som sa vad", "Identifiera grupptänk", "Jämför mellan grupper", "Titta på förändring under sessionen"]
      },
      {
        title: "Kvalitativ tematisk analys",
        description: "Hitta mönster och teman i diskussionerna",
        tips: ["Koda uttalanden", "Gruppera liknande teman", "Räkna frekvens av teman", "Inkludera citat i rapporten"]
      }
    ]
  }
]

const commonMistakes = [
  {
    mistake: "För många frågor i diskussionsguiden",
    impact: "Ytlig behandling av viktiga ämnen",
    solution: "Fokusera på 3-5 huvudämnen max. Djup före bredd."
  },
  {
    mistake: "Blanda befintliga och potentiella kunder",
    impact: "Olika referensramar skapar förvirring",
    solution: "Separata grupper för olika kundsegment."
  },
  {
    mistake: "För stora grupper (9+ personer)",
    impact: "Vissa får inte chans att prata, svårt att moderera",
    solution: "Håll grupper på 6-8 deltagare för optimal dynamik."
  },
  {
    mistake: "Ingen backup-plan för no-shows",
    impact: "För små grupper eller inställda sessioner",
    solution: "Boka 10-12 deltagare för att få 6-8 som kommer."
  },
  {
    mistake: "Försöka kvantifiera kvalitativ data",
    impact: "Missvisande slutsatser från små sampel",
    solution: "Fokusera på insikter och förståelse, inte procentsatser."
  }
]

const discussionGuideTemplate = [
  {
    section: "Uppvärmning (10 min)",
    questions: [
      "Presentera er kort - namn och något roligt",
      "Hur länge har ni känt till [företag/produkt]?",
      "Vad är er första association med [märke/kategori]?"
    ]
  },
  {
    section: "Huvuddiskussion (60-70 min)",
    questions: [
      "Berätta om senaste gången ni använde [produkt/tjänst]",
      "Vad fungerar bra? Vad fungerar mindre bra?",
      "Om ni kunde ändra en sak, vad skulle det vara?",
      "Visa [prototyp/koncept] - vad är era första intryck?",
      "Hur skulle detta förändra ert beteende?",
      "Vilka bekymmer eller frågor har ni?"
    ]
  },
  {
    section: "Avslutning (10 min)",
    questions: [
      "Sammanfattning: vad är det viktigaste vi pratat om?",
      "Något vi glömt att fråga om?",
      "Slutkommentarer eller reflektioner?"
    ]
  }
]

export default function FocusGroupsPage() {
  const { t } = useLanguage()
  const focusGroupPhases = getFocusGroupPhases(t)
  
  return (
    <div className="h-full flex flex-col">
      <Header 
        title={t('focusGroups.title')} 
        description={t('focusGroups.description')}
        actions={
          <Link href="/insights">
            <Button variant="outline">
              {t('focusGroups.backToOverview')}
            </Button>
          </Link>
        }
      />
      
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Introduction */}
        <Card className="mb-8 border-0 bg-white rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <UsersIcon className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Vad är fokusgrupper?
                </h3>
                <p className="text-gray-600 mb-4">
                  Fokusgrupper är modererade diskussioner med 6-8 deltagare från din målgrupp. 
                  De ger djupa insikter om attityder, motivationer och grupptänk, men kräver 
                  skicklig moderering för att undvika bias och gruppinfluenser.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <div className="text-lg font-semibold text-gray-900">6-8</div>
                    <div className="text-sm text-gray-600">Optimalt antal deltagare</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <div className="text-lg font-semibold text-gray-900">90-120 min</div>
                    <div className="text-sm text-gray-600">Typisk sessionslängd</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <div className="text-lg font-semibold text-gray-900">2-4 grupper</div>
                    <div className="text-sm text-gray-600">För mönstervalidering</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Process Phases */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Processen i tre faser</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {focusGroupPhases.map((phase, index) => (
              <Card key={index} className="border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                      <phase.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{phase.phase}</CardTitle>
                      <div className="flex items-center text-sm text-gray-600">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {phase.duration}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start text-sm text-gray-600">
                        <CheckCircleIcon className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Best Practices</h2>
          <div className="space-y-8">
            {bestPractices.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                    <category.icon className="h-4 w-4 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {category.practices.map((practice, practiceIndex) => (
                    <Card key={practiceIndex} className="border-0 bg-white rounded-xl overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-base">{practice.title}</CardTitle>
                        <p className="text-sm text-gray-600">{practice.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-1">
                          {practice.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discussion Guide Template */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Mall för diskussionsguide</h2>
          <Card className="border-0 bg-white rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle>Exempel på diskussionsstruktur</CardTitle>
              <p className="text-gray-600">Anpassa frågorna till ditt specifika ämne och syfte</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {discussionGuideTemplate.map((section, index) => (
                  <div key={index} className="border-l-4 border-l-gray-200 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-3">{section.section}</h4>
                    <ul className="space-y-2">
                      {section.questions.map((question, questionIndex) => (
                        <li key={questionIndex} className="text-sm text-gray-700">
                          • {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangleIcon className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-gray-800 mb-1">Moderatortips</h5>
                    <p className="text-sm text-gray-700">
                      Ha alltid följdfrågor redo: "Kan du utveckla det?", "Vad får dig att känna så?", 
                      "Instämmer alla?". Låt tystnaden göra sitt jobb - vänta efter frågor så kommer fler svar.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Common Mistakes */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vanliga misstag</h2>
          <div className="space-y-4">
            {commonMistakes.map((mistake, index) => (
              <Card key={index} className="border-0 bg-white rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertTriangleIcon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{mistake.mistake}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Påverkan:</h4>
                          <p className="text-gray-600">{mistake.impact}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">Lösning:</h4>
                          <p className="text-gray-600">{mistake.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* When to Use / When Not to Use */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 bg-white rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="h-4 w-4 text-gray-900" />
                </div>
                <span>Använd fokusgrupper när du vill:</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Utforska nya produktkoncept eller idéer",
                  "Förstå gruppinfluenser på beslut",
                  "Generera kreativa lösningar tillsammans",
                  "Testa marknadsföringsbudskap",
                  "Förstå kulturdynamik och sociala normer",
                  "Observera spontana reaktioner i grupp"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <CheckCircleIcon className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                  <AlertTriangleIcon className="h-4 w-4 text-gray-600" />
                </div>
                <span>Undvik fokusgrupper för:</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Känsliga eller personliga ämnen",
                  "När du behöver kvantifierbara resultat",
                  "Statistisk representation av en population",
                  "Detaljerade användbarhetstester",
                  "B2B-beslut (använd individuella intervjuer)",
                  "Validering av specifika designval"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <AlertTriangleIcon className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="border-0 bg-white rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Planera din första fokusgrupp
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Kom ihåg att fokusgrupper ger insikter om "varför" och "hur", inte "vad" eller "hur många". 
                Komplettera alltid med andra metoder för en heltäckande bild.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/getting-started">
                  <Button variant="primary">
                    Kom igång-guide
                  </Button>
                </Link>
                <Link href="/insights/interviews">
                  <Button variant="outline">
                    Jämför med intervjuer
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