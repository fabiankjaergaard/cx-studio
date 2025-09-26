'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { getGlossaryTerms, GlossaryTerm } from '@/data/glossary'
import { SearchIcon, BookOpenIcon, TagIcon, FilterIcon } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const getCategoryLabels = (t: (key: string) => string) => ({
  general: t('glossary.categoryGeneral'),
  journey: t('glossary.categoryJourney'),
  touchpoint: t('glossary.categoryTouchpoint'),
  emotion: t('glossary.categoryEmotion'),
  metrics: t('glossary.categoryMetrics')
})

const categoryColors = {
  general: 'bg-slate-100 text-slate-800',
  journey: 'bg-green-100 text-green-800',
  touchpoint: 'bg-purple-100 text-purple-800',
  emotion: 'bg-orange-100 text-orange-800',
  metrics: 'bg-red-100 text-red-800'
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
      
      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        {/* Search and Filter Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('glossary.searchLabel')}
                </label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder={t('glossary.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-11 h-11"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('glossary.categoryLabel')}
                </label>
                <div className="relative">
                  <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white"
                  >
                    <option value="all">{t('glossary.allCategories')}</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {categoryLabels[category]}
                      </option>
                    ))}
                  </select>
                </div>
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
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === category 
                        ? categoryColors[category] 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
        <div className="space-y-4">
          {filteredTerms.map((term) => (
            <Card key={term.id} id={`term-${term.id}`} className="border-l-4" style={{borderLeftColor: categoryColors[term.category].split(' ')[0].replace('bg-', '#').replace('blue', '3b82f6').replace('green', '10b981').replace('purple', '8b5cf6').replace('orange', 'f59e0b').replace('red', 'ef4444').replace('-100', '')}}>
              <CardContent className="p-0">
                <button
                  onClick={() => toggleExpanded(term.id)}
                  className="w-full text-left p-6 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{term.term}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[term.category]}`}>
                          {categoryLabels[term.category]}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {expandedTerms.has(term.id) ? term.definition : `${term.definition.slice(0, 150)}${term.definition.length > 150 ? '...' : ''}`}
                      </p>
                    </div>
                    <BookOpenIcon className={`h-5 w-5 text-gray-400 ml-4 flex-shrink-0 transition-transform ${expandedTerms.has(term.id) ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Expanded details */}
                {expandedTerms.has(term.id) && (
                  <div className="px-6 pb-6 border-t border-gray-100">
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
                                className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200 transition-colors"
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
          <Card>
            <CardContent className="text-center py-12">
              <BookOpenIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('glossary.noTermsFound')}</h3>
              <p className="text-gray-500 mb-4">{t('glossary.noTermsFoundDesc')}</p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
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