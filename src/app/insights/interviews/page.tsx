'use client'

import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  MicIcon, 
  ClockIcon, 
  LightbulbIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  UserIcon,
  MessageSquareIcon,
  HeadphonesIcon,
  FileTextIcon,
  PhoneIcon,
  VideoIcon,
  MapPinIcon
} from 'lucide-react'
import Link from 'next/link'

const interviewTypes = [
  {
    type: "Strukturerade intervjuer",
    icon: FileTextIcon,
    description: "Förutbestämda frågor i fast ordning",
    duration: "30-45 min",
    when: "När du behöver jämförbara svar mellan respondenter",
    pros: ["Enkla att analysera", "Konsistenta data", "Går snabbt att genomföra"],
    cons: ["Mindre flexibilitet", "Kan missa oväntade insikter", "Mer ytliga svar"]
  },
  {
    type: "Semi-strukturerade intervjuer",
    icon: MessageSquareIcon,
    description: "Grundfrågor med möjlighet att följa upp",
    duration: "45-60 min", 
    when: "För balans mellan struktur och flexibilitet (mest vanliga)",
    pros: ["Flexibel och naturlig", "Djupare insikter", "Följer respondentens fokus"],
    cons: ["Tar mer tid", "Svårare att jämföra", "Kräver skicklig intervjuare"]
  },
  {
    type: "Ostrukturerade intervjuer",
    icon: LightbulbIcon,
    description: "Öppen konversation kring ett ämne",
    duration: "60-90 min",
    when: "För explorativ forskning och djup förståelse",
    pros: ["Maximala insikter", "Oväntade upptäckter", "Respondenten leder"],
    cons: ["Mycket tidskrävande", "Svår analys", "Kräver expert-intervjuare"]
  }
]

const interviewChannels = [
  {
    channel: "Fysiska möten",
    icon: MapPinIcon,
    pros: ["Bäst för att bygga rapport", "Kan observera kroppsspråk", "Visa fysiska produkter"],
    cons: ["Tidskrävande att koordinera", "Geografiska begränsningar", "Dyrare"],
    bestFor: "Känsliga ämnen, nya produkter, B2B-kunder"
  },
  {
    channel: "Videointervjuer", 
    icon: VideoIcon,
    pros: ["Ser ansiktsuttryck", "Screen sharing möjlig", "Kan spelas in enkelt"],
    cons: ["Tekniska problem", "Distraktioner hemma", "Zoom-trötthet"],
    bestFor: "Remote användare, korta intervjuer, internationella kunder"
  },
  {
    channel: "Telefonintervjuer",
    icon: PhoneIcon,
    pros: ["Ingen teknik-stress", "Fokus på röst", "Lätt att schemalägga"],
    cons: ["Missar visuella ledtrådar", "Svårare att bygga rapport", "Risk för multitasking"],
    bestFor: "Snabba feedback-samtal, äldre målgrupper, komplexa scheman"
  }
]

const interviewGuideTemplate = [
  {
    section: "Introduktion (5 min)",
    purpose: "Bygga rapport och sätta ramarna",
    questions: [
      "Tack för att du tar dig tid. Berätta kort om dig själv.",
      "Har du några frågor innan vi börjar?",
      "[Förklara syfte, inspelning, konfidentialitet]"
    ]
  },
  {
    section: "Bakgrundsfrågor (10 min)",
    purpose: "Förstå kontext och användarens situation", 
    questions: [
      "Hur använder du [produkt/tjänst] idag?",
      "Vad var din första upplevelse med oss?",
      "Hur löste du [problemet] innan du hittade oss?"
    ]
  },
  {
    section: "Djupfrågor (30-40 min)",
    purpose: "Få djupare insikter om behov och motivationer",
    questions: [
      "Berätta om senaste gången du använde [produkt]. Vad hände?",
      "Vad fungerar bra? Vad är frustrerande?",
      "Om du hade en trollstav - vad skulle du ändra?",
      "Vilka alternativ övervägde du?",
      "Vad skulle få dig att sluta använda [produkt]?"
    ]
  },
  {
    section: "Avslutning (5 min)",
    purpose: "Sammanfatta och få sista intryck",
    questions: [
      "Har vi missat något viktigt?",
      "Tre ord som beskriver din upplevelse?",
      "Skulle du rekommendera oss till en vän? Varför/varför inte?"
    ]
  }
]

const goodQuestions = [
  {
    category: "Beteende",
    questions: [
      "Berätta om senaste gången du...",
      "Hur ser en typisk dag ut när du använder...?",
      "Vad gjorde du innan/efter det?"
    ]
  },
  {
    category: "Motivationer", 
    questions: [
      "Vad var viktigast för dig när du valde...?",
      "Vad fick dig att känna så?",
      "Vad skulle få dig att ändra åsikt?"
    ]
  },
  {
    category: "Problem",
    questions: [
      "Vad är mest frustrerande med...?",
      "När fungerar det inte som förväntat?",
      "Hur löser du det när X händer?"
    ]
  },
  {
    category: "Fördjupning",
    questions: [
      "Kan du ge mig ett exempel på det?",
      "Vad menar du med...?",
      "Hur kändes det när det hände?"
    ]
  }
]

const avoidQuestions = [
  "Vad tycker du om vår hemsida?",
  "Skulle du använda den här funktionen?", 
  "Vilka funktioner vill du ha?",
  "Är du nöjd med vår service?",
  "Vad tycker du är viktigt?"
]

const analysisSteps = [
  {
    step: 1,
    title: "Transkribering",
    description: "Få allt på pränt för analys",
    tips: ["Spela in med tillstånd", "Använd transkriptionstjänst", "Inkludera pauser och tonfall", "Rensa upp för läsbarhet"]
  },
  {
    step: 2, 
    title: "Kodning",
    description: "Identifiera teman och mönster",
    tips: ["Läs genom allt först", "Märk ut viktiga citat", "Skapa tematiska koder", "Leta efter motmönster"]
  },
  {
    step: 3,
    title: "Syntes",
    description: "Omvandla data till insikter",
    tips: ["Gruppera liknande teman", "Räkna frekvenser", "Hitta kausala samband", "Validera mot andra data"]
  },
  {
    step: 4,
    title: "Rapportering", 
    description: "Kommunicera handlingsbara insikter",
    tips: ["Börja med huvudinsikter", "Använd citat som stöd", "Inkludera rekommendationer", "Presentera för stakeholders"]
  }
]

export default function InterviewsPage() {
  return (
    <div className="h-full flex flex-col">
      <Header 
        title="Kundintervjuer" 
        description="Djupgående en-till-en-samtal för att förstå användarmotivationer"
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
        <Card className="mb-8 border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <MicIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Varför kundintervjuer?
                </h3>
                <p className="text-gray-600 mb-4">
                  Intervjuer är den bästa metoden för att förstå "varför" bakom kunders beteenden. 
                  De ger djupa, nyanserade insikter som enkäter inte kan fånga - motivationer, 
                  känslor och den fullständiga kontexten bakom användarbeslut.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="text-lg font-semibold text-orange-600">8-12</div>
                    <div className="text-sm text-gray-600">Intervjuer för mönster</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="text-lg font-semibold text-orange-600">45-60 min</div>
                    <div className="text-sm text-gray-600">Optimal längd</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border">
                    <div className="text-lg font-semibold text-orange-600">80/20</div>
                    <div className="text-sm text-gray-600">Lyssna/prata-förhållande</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Typer av intervjuer</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {interviewTypes.map((type, index) => (
              <Card key={index} className="border-t-4 border-t-orange-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <type.icon className="h-6 w-6 text-orange-600" />
                    <CardTitle className="text-lg">{type.type}</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">{type.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {type.duration}
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">När att använda:</h4>
                    <p className="text-sm text-gray-600">{type.when}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs font-medium text-green-700 mb-2">Fördelar:</h5>
                      <ul className="space-y-1">
                        {type.pros.map((pro, proIndex) => (
                          <li key={proIndex} className="text-xs text-gray-600 flex items-start">
                            <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium text-red-700 mb-2">Nackdelar:</h5>
                      <ul className="space-y-1">
                        {type.cons.map((con, conIndex) => (
                          <li key={conIndex} className="text-xs text-gray-600 flex items-start">
                            <AlertTriangleIcon className="h-3 w-3 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                            {con}
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

        {/* Interview Channels */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Genomförande-kanaler</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {interviewChannels.map((channel, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <channel.icon className="h-6 w-6 text-blue-600" />
                    <CardTitle className="text-lg">{channel.channel}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Fördelar:</h4>
                    <ul className="space-y-1">
                      {channel.pros.map((pro, proIndex) => (
                        <li key={proIndex} className="text-sm text-gray-600 flex items-start">
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-red-700 mb-2">Nackdelar:</h4>
                    <ul className="space-y-1">
                      {channel.cons.map((con, conIndex) => (
                        <li key={conIndex} className="text-sm text-gray-600 flex items-start">
                          <AlertTriangleIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <h4 className="font-medium text-gray-900 mb-1">Bäst för:</h4>
                    <p className="text-sm text-gray-600">{channel.bestFor}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interview Guide Template */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Mall för intervjuguide</h2>
          <Card>
            <CardHeader>
              <CardTitle>Strukturerad intervjuguide</CardTitle>
              <p className="text-gray-600">Anpassa frågorna till ditt specifika syfte och målgrupp</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {interviewGuideTemplate.map((section, index) => (
                  <div key={index} className="border-l-4 border-l-orange-200 pl-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{section.section}</h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{section.purpose}</span>
                    </div>
                    <ul className="space-y-2">
                      {section.questions.map((question, questionIndex) => (
                        <li key={questionIndex} className="text-sm text-gray-700 flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Good vs Bad Questions */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frågeteknik</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Good Questions */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-green-800">Bra frågor som ger djupa svar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {goodQuestions.map((category, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-900 mb-2">{category.category}:</h4>
                      <ul className="space-y-1">
                        {category.questions.map((question, qIndex) => (
                          <li key={qIndex} className="text-sm text-gray-700 pl-4 border-l-2 border-l-green-200">
                            "{question}"
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bad Questions */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-red-800">Undvik ledande/vaga frågor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-4">
                    Dessa frågor leder till ytliga eller partiska svar:
                  </p>
                  {avoidQuestions.map((question, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertTriangleIcon className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-700 line-through">"{question}"</p>
                        <p className="text-xs text-red-600 mt-1">
                          {index === 0 && "För generell - be om specifik upplevelse"}
                          {index === 1 && "Hypotetisk - fråga om faktiskt beteende"}
                          {index === 2 && "Leder till önskelista - fokusera på problem"}
                          {index === 3 && "Ja/nej-fråga - be om berättelse"}
                          {index === 4 && "Abstrakt - fråga om konkret situation"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded">
                  <h5 className="font-medium text-red-800 mb-2">Gyllene regel:</h5>
                  <p className="text-sm text-red-700">
                    Fråga om vad som <em>hände</em>, inte vad de <em>tycker</em>. 
                    Be om <em>specifika exempel</em>, inte generella åsikter.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Analysis Process */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Analysprocess</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {analysisSteps.map((step, index) => (
              <Card key={index} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                    <CardTitle className="text-base">{step.title}</CardTitle>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-xs text-gray-600 flex items-start">
                        <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                {/* Arrow to next step */}
                {index < analysisSteps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Final Tips */}
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-0 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <HeadphonesIcon className="h-8 w-8 text-orange-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Intervjutips för framgång
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Lyssna mer än du pratar</strong> - 80/20-regeln</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Använd tystnader</strong> - vänta efter frågor för djupare svar</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Följ upp med "Varför?"</strong> - gräv djupare i svaren</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Spela in</strong> - fokusera på samtalet, inte anteckningar</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Var nyfiken</strong> - visa genuint intresse för deras upplevelse</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span><strong>Sammanfatta</strong> - "Så du menar att..." för att validera förståelse</span>
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
                Starta dina första intervjuer
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Kom ihåg: Målet är att förstå din kunds värld. Var nyfiken, lyssna aktivt 
                och låt deras berättelser guida dig till djupare insikter.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/getting-started">
                  <Button variant="primary">
                    Kom igång-guide
                  </Button>
                </Link>
                <Link href="/insights/focus-groups">
                  <Button variant="outline">
                    Jämför med fokusgrupper
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