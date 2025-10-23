'use client'

import { useState } from 'react'
import { X, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Insight, Evidence } from '@/types/journey-map'

interface CreateInsightDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSave: (insight: Omit<Insight, 'id' | 'created_at'>) => void
  journeyId: string
  availableEvidence?: Evidence[]
}

export function CreateInsightDrawer({
  isOpen,
  onClose,
  onSave,
  journeyId,
  availableEvidence = []
}: CreateInsightDrawerProps) {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [severity, setSeverity] = useState<1 | 2 | 3 | 4 | 5>(3)
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState<string[]>([])

  const handleSave = () => {
    if (!title.trim()) return

    const selectedEvidence = availableEvidence.filter(e =>
      selectedEvidenceIds.includes(e.id)
    )

    onSave({
      journey_id: journeyId,
      title: title.trim(),
      summary: summary.trim(),
      severity,
      evidence: selectedEvidence,
    })

    // Reset form
    setTitle('')
    setSummary('')
    setSeverity(3)
    setSelectedEvidenceIds([])
    onClose()
  }

  const toggleEvidence = (id: string) => {
    setSelectedEvidenceIds(prev =>
      prev.includes(id)
        ? prev.filter(eid => eid !== id)
        : [...prev, id]
    )
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[500px] bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-gray-900">Create Insight</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Slow delivery times causing frustration"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all text-sm"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe the insight in more detail..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all text-sm resize-none"
            />
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Severity
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setSeverity(level as 1 | 2 | 3 | 4 | 5)}
                  className={`
                    w-10 h-10 rounded-full border-2 transition-all font-medium text-sm
                    ${severity === level
                      ? level >= 4 ? 'bg-[#C45A49] border-[#C45A49] text-white'
                        : level === 3 ? 'bg-[#ED6B5A] border-[#ED6B5A] text-white'
                        : 'bg-[#778DB0] border-[#778DB0] text-white'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-slate-400'
                    }
                  `}
                >
                  {level}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {severity >= 4 && 'Critical - High priority'}
              {severity === 3 && 'Medium - Should be addressed'}
              {severity <= 2 && 'Low - Minor issue'}
            </p>
          </div>

          {/* Evidence (optional) */}
          {availableEvidence.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link Evidence (optional)
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableEvidence.map((evidence) => (
                  <label
                    key={evidence.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedEvidenceIds.includes(evidence.id)}
                      onChange={() => toggleEvidence(evidence.id)}
                      className="w-4 h-4 mt-0.5 accent-slate-500 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-900 truncate">
                        {evidence.text || `${evidence.type} - ${evidence.value}`}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        {evidence.source}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!title.trim()}
            className="flex-1"
          >
            Create Insight
          </Button>
        </div>
      </div>
    </>
  )
}
