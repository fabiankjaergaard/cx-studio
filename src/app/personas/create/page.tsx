'use client'

import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useLanguage } from '@/contexts/LanguageContext'
import { PlusIcon, UserIcon } from 'lucide-react'

export default function CreatePersonaPage() {
  const { t } = useLanguage()

  return (
    <div className="h-full flex flex-col">
      <Header 
        title={t('nav.createPersona')} 
        description="Skapa en ny detaljerad persona för dina customer journeys"
        actions={
          <Button variant="primary">
            <PlusIcon className="mr-2 h-4 w-4" />
            Skapa persona
          </Button>
        }
      />
      
      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserIcon className="mr-2 h-5 w-5" />
              Skapa ny persona
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center py-12">
              <UserIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Persona-skapare kommer här
              </h3>
              <p className="text-gray-600">
                Denna sida kommer att innehålla ett formulär för att skapa nya personas
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}