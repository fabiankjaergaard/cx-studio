'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  CheckCircleIcon,
  AlertTriangleIcon,
  HeadphonesIcon,
  Users2Icon,
  ClipboardListIcon,
  BarChart3Icon,
  BookOpenIcon,
  LightbulbIcon
} from 'lucide-react'
import Link from 'next/link'

export default function InterviewGuidePage() {
  return (
    <div className="h-full flex flex-col">
      <Header
        title="Lär dig intervjua"
        description="Komplett guide för att genomföra effektiva användarintervjuer"
        actions={
          <Link href="/insights/interview-builder">
            <Button variant="primary">
              Börja skapa intervjuer
            </Button>
          </Link>
        }
      />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        {/* Introduction */}
        <Card className="mb-8 border-0 bg-white rounded-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <HeadphonesIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Vad är användarintervjuer?
                </h3>
                <p className="text-gray-600 mb-4">
                  Användarintervjuer är djupgående samtal med dina kunder för att förstå deras behov, beteenden och smärtpunkter. De ger dig kvalitativa insights som kompletterar kvantitativa data från enkäter.
                </p>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">30-60</div>
                      <div className="text-sm text-gray-600">minuter per intervju</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">5-8</div>
                      <div className="text-sm text-gray-600">intervjuer per studie</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">85%</div>
                      <div className="text-sm text-gray-600">av insights efter 5 intervjuer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Types */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Intervjutyper</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Exploratory Interviews */}
            <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                    <Users2Icon className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Utforskande</h3>
                    <p className="text-sm text-blue-600 font-medium">Förstå behov & kontext</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Öppna samtal för att förstå användarnas värld, mål och utmaningar
                </p>
                <div className="text-lg font-bold text-blue-600 mb-2">När: Tidigt i processen</div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">• Innan design påbörjas</p>
                  <p className="text-sm text-gray-600">• För att definiera problemet</p>
                  <p className="text-sm text-gray-600">• Upptäcka okända behov</p>
                </div>
              </CardContent>
            </Card>

            {/* Usability Interviews */}
            <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
                    <ClipboardListIcon className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Användbarhet</h3>
                    <p className="text-sm text-green-600 font-medium">Testa & förbättra</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Observera användare medan de utför uppgifter i din produkt
                </p>
                <div className="text-lg font-bold text-green-600 mb-2">När: Under utveckling</div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">• Testa prototyper</p>
                  <p className="text-sm text-gray-600">• Identifiera användbarhetsbrister</p>
                  <p className="text-sm text-gray-600">• Validera designbeslut</p>
                </div>
              </CardContent>
            </Card>

            {/* Evaluative Interviews */}
            <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
                    <BarChart3Icon className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Utvärderande</h3>
                    <p className="text-sm text-orange-600 font-medium">Mät & optimera</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Samla feedback på befintlig produkt och identifiera förbättringsområden
                </p>
                <div className="text-lg font-bold text-orange-600 mb-2">När: Efter lansering</div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">• Utvärdera befintlig produkt</p>
                  <p className="text-sm text-gray-600">• Mäta nöjdhet och prestanda</p>
                  <p className="text-sm text-gray-600">• Planera nästa iteration</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Conduct Good Interviews */}
        <Card className="group mb-8 border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl transition-colors duration-200 group-hover:text-slate-700">Så genomför du bra intervjuer</CardTitle>
            <p className="text-gray-600">Proven tekniker för att få djupare insights</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Före intervjun</h4>
                <ul className="space-y-2">
                  {[
                    "Definiera tydliga mål och hypoteser",
                    "Rekrytera rätt målgrupp (5-8 deltagare)",
                    "Förbered flexibel intervjuguide",
                    "Testa teknik och miljö",
                    "Planera för 45-60 minuter"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Under intervjun</h4>
                <ul className="space-y-2">
                  {[
                    "Börja med öppna, icke-ledande frågor",
                    "Lyssna aktivt och följ upp intressanta spår",
                    "Använd 'varför' och 'berätta mer' ofta",
                    "Observera kroppsspråk och pauser",
                    "Anteckna konkreta citat och exempel"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <CheckCircleIcon className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Efter intervjun</h4>
                <ul className="space-y-2">
                  {[
                    "Skriv ner reflektioner inom 24 timmar",
                    "Identifiera patterns och teman",
                    "Koda viktiga insights och citat",
                    "Uppdatera hypoteser baserat på lärdomar",
                    "Planera nästa steg i research"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <CheckCircleIcon className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Vanliga misstag att undvika</h4>
                <ul className="space-y-2">
                  {[
                    "Ställa ledande frågor som 'Tycker du inte att...?'",
                    "Avbryta när deltagaren tänker eller pausar",
                    "Fokusera på funktioner istället för behov",
                    "Inte följa upp på intressanta kommentarer",
                    "Glömma att fråga om konkreta exempel"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <AlertTriangleIcon className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Question Framework */}
        <Card className="group mb-8 border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl transition-colors duration-200 group-hover:text-slate-700">Frågeramverk och mallar</CardTitle>
            <p className="text-gray-600">Beprövade frågetyper för olika situationer</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Öppningsfrågor</h4>
                <div className="space-y-2">
                  {[
                    "Berätta lite om dig själv och din bakgrund",
                    "Vad är din roll i [företaget/projektet]?",
                    "Hur ser en typisk dag ut för dig?"
                  ].map((question, index) => (
                    <p key={index} className="text-sm text-gray-700 italic">"{question}"</p>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Beteendefrågor</h4>
                <div className="space-y-2">
                  {[
                    "Berätta om senaste gången du [utförde aktiviteten]",
                    "Vilka steg går du igenom när du...?",
                    "Vad händer om något går fel i processen?"
                  ].map((question, index) => (
                    <p key={index} className="text-sm text-gray-700 italic">"{question}"</p>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Emotionella frågor</h4>
                <div className="space-y-2">
                  {[
                    "Hur känner du dig när du använder [produkten]?",
                    "Vad frustrerar dig mest med nuvarande lösningen?",
                    "Vad skulle göra dig riktigt glad/nöjd?"
                  ].map((question, index) => (
                    <p key={index} className="text-sm text-gray-700 italic">"{question}"</p>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Uppföljningsfrågor</h4>
                <div className="space-y-2">
                  {[
                    "Kan du berätta mer om det?",
                    "Varför är det viktigt för dig?",
                    "Kan du ge mig ett konkret exempel?"
                  ].map((question, index) => (
                    <p key={index} className="text-sm text-gray-700 italic">"{question}"</p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Steps */}
        <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 transition-colors duration-200 group-hover:text-slate-700">
                Redo att genomföra din första intervju?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Nu när du har lärt dig grunderna - börja med att skapa en intervjuguide och planera din första session.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/interview-builder?tab=create">
                  <Button variant="primary" className="hover:scale-[1.02] transition-transform duration-200">
                    <LightbulbIcon className="mr-2 h-4 w-4" />
                    Skapa intervjuguide
                  </Button>
                </Link>
                <Link href="/insights/interview-builder">
                  <Button variant="outline" className="hover:bg-gray-100 transition-colors duration-200">
                    <BookOpenIcon className="mr-2 h-4 w-4" />
                    Öppna Interview Builder
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