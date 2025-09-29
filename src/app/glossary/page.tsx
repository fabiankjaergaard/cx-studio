'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { getGlossaryTerms, GlossaryTerm } from '@/data/glossary'
import { SearchIcon, BookOpenIcon, TagIcon } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const getCategoryLabels = (t: (key: string) => string) => ({
  general: t('glossary.categoryGeneral'),
  journey: t('glossary.categoryJourney'),
  touchpoint: t('glossary.categoryTouchpoint'),
  emotion: t('glossary.categoryEmotion'),
  metrics: t('glossary.categoryMetrics')
})

const categoryColors = {
  general: 'bg-slate-50 text-slate-600 border-slate-200',
  journey: 'bg-blue-50 text-blue-700 border-blue-200',
  touchpoint: 'bg-violet-50 text-violet-700 border-violet-200',
  emotion: 'bg-amber-50 text-amber-700 border-amber-200',
  metrics: 'bg-indigo-50 text-indigo-700 border-indigo-200'
}

const categoryHoverColors = {
  general: 'hover:bg-slate-100 hover:border-slate-300 hover:shadow-slate-200/50',
  journey: 'hover:bg-blue-100 hover:border-blue-300 hover:shadow-blue-200/50',
  touchpoint: 'hover:bg-violet-100 hover:border-violet-300 hover:shadow-violet-200/50',
  emotion: 'hover:bg-amber-100 hover:border-amber-300 hover:shadow-amber-200/50',
  metrics: 'hover:bg-indigo-100 hover:border-indigo-300 hover:shadow-indigo-200/50'
}

const categoryBorderColors = {
  general: 'border-l-slate-400',
  journey: 'border-l-blue-400',
  touchpoint: 'border-l-violet-400',
  emotion: 'border-l-amber-400',
  metrics: 'border-l-indigo-400'
}

const categoryBackgroundColors = {
  general: 'bg-slate-50',
  journey: 'bg-blue-50',
  touchpoint: 'bg-violet-50',
  emotion: 'bg-amber-50',
  metrics: 'bg-indigo-50'
}

export default function GlossaryPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set())

  const glossaryTerms = useMemo(() => getGlossaryTerms(t), [t])
  const categoryLabels = useMemo(() => getCategoryLabels(t), [t])

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const categories = Object.keys(categoryLabels) as (keyof typeof categoryLabels)[]

  const toggleExpanded = (termId: string) => {
    const newExpanded = new Set(expandedTerms)
    if (newExpanded.has(termId)) {
      newExpanded.delete(termId)
    } else {
      newExpanded.add(termId)
    }
    setExpandedTerms(newExpanded)
  }

  const handleRelatedTermClick = (termId: string) => {
    const newExpanded = new Set(expandedTerms)
    newExpanded.add(termId)
    setExpandedTerms(newExpanded)
    
    // Scroll to term
    const element = document.getElementById(`term-${termId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const categoryStats = useMemo(() => {
    return categories.map(category => ({
      category,
      count: glossaryTerms.filter(term => term.category === category).length
    }))
  }, [categories])

  return (
    <div className="h-full flex flex-col">
      <Header 
        title={t('glossary.title')} 
        description={t('glossary.subtitle')}
      />
      
      <div className="flex-1 p-8 overflow-auto bg-white">
        {/* Search and Filter Section */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-slate-50 to-gray-50">
          <CardContent className="p-8">
            {/* Search */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('glossary.searchLabel')}
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder={t('glossary.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 h-12 border-gray-300 focus:border-slate-400 focus:ring-slate-200 bg-white shadow-sm"
                />
              </div>
            </div>

            {/* Results info */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                {t('glossary.resultsShowing', { filtered: filteredTerms.length, total: glossaryTerms.length })}
              </p>
              
              {/* Category badges */}
              <div className="flex flex-wrap gap-2">
                {categoryStats.map(({ category, count }) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? 'all' : category)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                      selectedCategory === category
                        ? `${categoryColors[category]} shadow-md scale-105`
                        : `bg-white text-gray-600 border-gray-300 hover:scale-105 hover:shadow-md hover:border-gray-400`
                    }`}
                  >
                    {categoryLabels[category]} ({count})
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Grid */}
        <div className="space-y-6">
          {filteredTerms.map((term) => (
            <Card key={term.id} id={`term-${term.id}`} className={`border-0 border-l-4 shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer bg-white ${categoryBorderColors[term.category]}`}>
              <CardContent className="p-0">
                <button
                  onClick={() => toggleExpanded(term.id)}
                  className="w-full text-left p-8 focus:outline-none transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{term.term}</h3>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${categoryColors[term.category]}`}>
                          {categoryLabels[term.category]}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {expandedTerms.has(term.id) ? term.definition : `${term.definition.slice(0, 150)}${term.definition.length > 150 ? '...' : ''}`}
                      </p>
                    </div>
                    <div className="ml-6 flex-shrink-0 flex flex-col items-center">
                      <BookOpenIcon className={`h-6 w-6 text-gray-400 transition-all duration-300 group-hover:text-gray-600 group-hover:scale-110 ${expandedTerms.has(term.id) ? 'rotate-180' : ''}`} />
                      <span className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {expandedTerms.has(term.id) ? 'Collapse' : 'Expand'}
                      </span>
                    </div>
                  </div>
                </button>

                {/* Expanded details */}
                {expandedTerms.has(term.id) && (
                  <div className="px-8 pb-8 border-t border-gray-200 bg-gradient-to-br from-slate-50/50 to-white">
                    {term.examples && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{t('glossary.examplesLabel')}</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {term.examples.map((example, index) => (
                            <li key={index}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{t('glossary.relatedTermsLabel')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {term.relatedTerms.map((relatedId) => {
                            const relatedTerm = glossaryTerms.find(t => t.id === relatedId)
                            return relatedTerm ? (
                              <button
                                key={relatedId}
                                onClick={() => handleRelatedTermClick(relatedId)}
                                className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm hover:scale-105 hover:shadow-md transition-all duration-200 border ${categoryColors[relatedTerm.category]}`}
                              >
                                <TagIcon className="h-3 w-3" />
                                {relatedTerm.term}
                              </button>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-gray-50">
            <CardContent className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                <BookOpenIcon className="h-10 w-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('glossary.noTermsFound')}</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">{t('glossary.noTermsFoundDesc')}</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400 hover:scale-105 hover:shadow-md transition-all duration-200"
              >
                {t('glossary.clearFilters')}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}