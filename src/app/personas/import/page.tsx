'use client'

import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useLanguage } from '@/contexts/LanguageContext'
import { DatabaseIcon } from 'lucide-react'

export default function ImportPersonaPage() {
  const { t } = useLanguage()

  return (
    <div className="h-full flex flex-col">
      <Header 
        title={t('nav.importPersona')} 
        description="Importera personas från externa datakällor"
      />
      
      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DatabaseIcon className="mr-2 h-5 w-5" />
              Importera från data
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center py-12">
              <DatabaseIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Data-import kommer här
              </h3>
              <p className="text-gray-600">
                Denna sida kommer att hantera import av personas från CSV, APIs eller andra datakällor
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}