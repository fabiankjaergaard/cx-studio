'use client'

import { X, Lightbulb, AlertTriangle, AlertCircle, CheckCircle, Trash2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Insight } from '@/types/journey-map'

interface InsightDetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
  insight: Insight | null
  onRemoveFromCell?: () => void
  onEdit?: () => void
}

export function InsightDetailsDrawer({
  isOpen,
  onClose,
  insight,
  onRemoveFromCell,
  onEdit
}: InsightDetailsDrawerProps) {
  if (!isOpen || !insight) return null

  // Get severity info
  const getSeverityInfo = (severity: 1 | 2 | 3 | 4 | 5) => {
    if (severity >= 4) {
      return {
        label: 'Critical',
        description: 'High priority - requires immediate attention',
        icon: AlertTriangle,
        color: 'text-[#ED6B5A]',
        bgColor: 'bg-[#ED6B5A]/10',
        borderColor: 'border-[#ED6B5A]/30'
      }
    }
    if (severity === 3) {
      return {
        label: 'Medium',
        description: 'Should be addressed',
        icon: AlertCircle,
        color: 'text-amber-700',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200'
      }
    }
    return {
      label: 'Low',
      description: 'Minor issue',
      icon: CheckCircle,
      color: 'text-slate-700',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200'
    }
  }

  const severityInfo = getSeverityInfo(insight.severity)
  const SeverityIcon = severityInfo.icon

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
            <h2 className="text-lg font-semibold text-gray-900">Insight Details</h2>
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
            <h3 className="text-2xl font-bold text-gray-900 leading-tight">
              {insight.title}
            </h3>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Severity Level
            </label>
            <div className={`flex items-center gap-4 p-4 rounded-xl border-2 ${severityInfo.bgColor} ${severityInfo.borderColor} shadow-sm`}>
              <div className={`w-12 h-12 rounded-full ${severityInfo.bgColor} border-2 ${severityInfo.borderColor} flex items-center justify-center`}>
                <SeverityIcon className={`w-6 h-6 ${severityInfo.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-lg font-bold ${severityInfo.color}`}>
                    {severityInfo.label}
                  </span>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${severityInfo.bgColor} ${severityInfo.color} border ${severityInfo.borderColor}`}>
                    {insight.severity}/5
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {severityInfo.description}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {insight.summary && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Description
              </label>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {insight.summary}
                </p>
              </div>
            </div>
          )}

          {/* Evidence */}
          {insight.evidence && insight.evidence.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Evidence <span className="ml-1 text-slate-400 font-normal">({insight.evidence.length})</span>
              </label>
              <div className="space-y-3">
                {insight.evidence.map((evidence) => (
                  <div
                    key={evidence.id}
                    className="p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {evidence.source}
                      </span>
                      <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-md font-medium uppercase tracking-wide">
                        {evidence.type}
                      </span>
                    </div>
                    {evidence.text && (
                      <p className="text-sm text-gray-700 mt-3 italic leading-relaxed border-l-2 border-slate-300 pl-3">
                        "{evidence.text}"
                      </p>
                    )}
                    {evidence.value !== undefined && (
                      <div className="text-sm text-gray-700 mt-3">
                        <span className="font-bold text-lg">{evidence.value}</span>
                        {evidence.unit && (
                          <span className="text-gray-500 ml-1 font-medium">{evidence.unit}</span>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-slate-100">
                      Collected: {new Date(evidence.collected_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="pt-6 border-t border-slate-200">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Metadata
            </label>
            <div className="text-sm text-gray-600 space-y-1 bg-slate-50 p-3 rounded-lg">
              <p>
                <span className="font-medium">Created:</span>{' '}
                {new Date(insight.created_at).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              {insight.created_by && (
                <p>
                  <span className="font-medium">Created by:</span> {insight.created_by}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6 bg-slate-50 flex gap-3 justify-between">
          <div className="flex gap-3">
            {onRemoveFromCell && (
              <Button
                variant="outline"
                onClick={() => {
                  onRemoveFromCell()
                  onClose()
                }}
                className="flex items-center justify-center gap-2 text-[#ED6B5A] hover:text-[#E5574A] hover:bg-[#ED6B5A]/10 border-[#ED6B5A]/30 hover:border-[#ED6B5A]/50 font-medium px-4"
              >
                <Trash2 className="w-4 h-4" />
                Remove from Cell
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            {onEdit && (
              <Button
                variant="outline"
                onClick={() => {
                  onEdit()
                  onClose()
                }}
                className="flex items-center justify-center gap-2 font-medium px-4"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            )}
            <Button
              variant="primary"
              onClick={onClose}
              className="font-medium px-6"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
