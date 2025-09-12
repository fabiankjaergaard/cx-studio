'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { CheckIcon } from 'lucide-react'

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage()
  const [saved, setSaved] = useState(false)

  const handleLanguageChange = (newLanguage: 'sv' | 'en') => {
    setLanguage(newLanguage)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('settings.title')}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="space-y-6">
            {/* Language Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('settings.language')}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {t('settings.languageDescription')}
              </p>
              
              <div className="space-y-3">
                <div 
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                    language === 'sv' 
                      ? 'border-slate-500 bg-slate-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleLanguageChange('sv')}
                >
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">🇸🇪</div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {t('settings.swedish')}
                      </div>
                      <div className="text-sm text-gray-500">Svenska</div>
                    </div>
                  </div>
                  {language === 'sv' && (
                    <CheckIcon className="h-5 w-5 text-slate-600" />
                  )}
                </div>

                <div 
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                    language === 'en' 
                      ? 'border-slate-500 bg-slate-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleLanguageChange('en')}
                >
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">🇺🇸</div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {t('settings.english')}
                      </div>
                      <div className="text-sm text-gray-500">English</div>
                    </div>
                  </div>
                  {language === 'en' && (
                    <CheckIcon className="h-5 w-5 text-slate-600" />
                  )}
                </div>
              </div>

              {saved && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-green-800">
                      {t('settings.saved')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}