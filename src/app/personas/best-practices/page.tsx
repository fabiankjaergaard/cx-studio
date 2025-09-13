'use client'

import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useLanguage } from '@/contexts/LanguageContext'
import { BookOpenIcon } from 'lucide-react'

export default function PersonaBestPracticesPage() {
  const { t } = useLanguage()

  return (
    <div className="h-full flex flex-col">
      <Header 
        title={t('nav.personaBestPractices')} 
        description="Lär dig bästa praxis för att skapa effektiva personas"
      />
      
      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpenIcon className="mr-2 h-5 w-5" />
              Bästa praxis för personas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center py-12">
              <BookOpenIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Best practices-guide kommer här
              </h3>
              <p className="text-gray-600">
                Denna sida kommer att innehålla detaljerade riktlinjer och bästa praxis för persona-skapande
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}