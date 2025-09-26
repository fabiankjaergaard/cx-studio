'use client'

import { useState, useMemo } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { glossaryTerms, GlossaryTerm } from '@/data/glossary'
import { SearchIcon, BookOpenIcon, TagIcon } from 'lucide-react'

interface GlossaryModalProps {
  isOpen: boolean
  onClose: () => void
}

const categoryLabels = {
  general: 'Allmänt',
  journey: 'Kundresa',
  touchpoint: 'Touchpoints',
  emotion: 'Känslor',
  metrics: 'Mätningar'
}

const categoryColors = {
  general: 'bg-slate-100 text-slate-800',
  journey: 'bg-green-100 text-green-800',
  touchpoint: 'bg-purple-100 text-purple-800',
  emotion: 'bg-orange-100 text-orange-800',
  metrics: 'bg-red-100 text-red-800'
}

export function GlossaryModal({ isOpen, onClose }: GlossaryModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null)

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           term.definition.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const categories = Object.keys(categoryLabels) as (keyof typeof categoryLabels)[]

  const handleTermClick = (term: GlossaryTerm) => {
    setSelectedTerm(selectedTerm?.id === term.id ? null : term)
  }

  const handleRelatedTermClick = (termId: string) => {
    const term = glossaryTerms.find(t => t.id === termId)
    if (term) {
      setSelectedTerm(term)
      setSearchTerm('')
      setSelectedCategory('all')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="CX Begreppslexikon"
      className="max-w-4xl max-h-[80vh]"
    >
      <div className="space-y-4">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Sök efter begrepp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="all">Alla kategorier</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {categoryLabels[category]}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500">
          {filteredTerms.length} av {glossaryTerms.length} begrepp
        </div>

        {/* Terms list */}
        <div className="max-h-96 overflow-y-auto space-y-2">
          {filteredTerms.map((term) => (
            <div key={term.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => handleTermClick(term)}
                className="w-full text-left p-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{term.term}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[term.category]}`}>
                        {categoryLabels[term.category]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {term.definition}
                    </p>
                  </div>
                  <BookOpenIcon className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                </div>
              </button>

              {/* Expanded details */}
              {selectedTerm?.id === term.id && (
                <div className="px-4 pb-4 border-t border-gray-100 mt-2 pt-3">
                  <p className="text-sm text-gray-700 mb-3">
                    {term.definition}
                  </p>

                  {term.examples && (
                    <div className="mb-3">
                      <h4 className="font-medium text-gray-900 text-sm mb-2">Exempel:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {term.examples.map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm mb-2">Relaterade begrepp:</h4>
                      <div className="flex flex-wrap gap-2">
                        {term.relatedTerms.map((relatedId) => {
                          const relatedTerm = glossaryTerms.find(t => t.id === relatedId)
                          return relatedTerm ? (
                            <button
                              key={relatedId}
                              onClick={() => handleRelatedTermClick(relatedId)}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs hover:bg-slate-200 transition-colors"
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
            </div>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <BookOpenIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p>Inga begrepp matchade din sökning.</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Stäng
          </Button>
        </div>
      </div>
    </Modal>
  )
}