'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { JourneyMapRow } from '@/types/journey-map'
import { ROW_TYPES, ROW_COLORS } from '@/types/journey-map'

interface RowEditorProps {
  isOpen: boolean
  onClose: () => void
  row: JourneyMapRow | null
  onSave: (row: Partial<JourneyMapRow>) => void
  onDelete?: () => void
  isNewRow?: boolean
}

export function RowEditor({ isOpen, onClose, row, onSave, onDelete, isNewRow = false }: RowEditorProps) {
  const [formData, setFormData] = useState({
    category: row?.category || '',
    description: row?.description || '',
    type: row?.type || 'text',
    color: row?.color || 'bg-slate-50'
  })

  const handleSave = () => {
    const selectedRowType = ROW_TYPES.find(type => type.id === formData.type)
    const defaultName = selectedRowType?.name || 'New Row'

    onSave({
      category: defaultName,
      description: selectedRowType?.description || '',
      type: formData.type as any,
      color: formData.color
    })
    onClose()
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete()
      onClose()
    }
  }

  const selectedRowType = ROW_TYPES.find(type => type.id === formData.type)
  const selectedColor = ROW_COLORS.find(color => color.id === formData.color)
  const isJourneyCategory = ['actions', 'touchpoints', 'emotions', 'pain-points', 'opportunities', 'backstage'].includes(formData.category.toLowerCase())

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isNewRow ? 'Add new row' : 'Edit row'}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Row Type Selection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Choose Type</h3>
            <div className="h-px bg-gradient-to-r from-slate-200 to-transparent flex-1 ml-4"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ROW_TYPES.map((type, index) => (
              <button
                key={type.id}
                onClick={() => setFormData(prev => ({ ...prev, type: type.id as any }))}
                className={`group relative p-4 text-left border-2 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
                  formData.type === type.id
                    ? 'border-slate-400 bg-slate-50 shadow-lg ring-2 ring-slate-200'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-25'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className={`font-semibold text-sm mb-1 transition-colors ${
                  formData.type === type.id ? 'text-slate-700' : 'text-slate-800 group-hover:text-slate-700'
                }`}>
                  {type.name}
                </div>
                <div className={`text-xs leading-relaxed transition-colors ${
                  formData.type === type.id ? 'text-slate-600' : 'text-slate-500 group-hover:text-slate-600'
                }`}>
                  {type.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        {!isJourneyCategory && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Choose Color</h3>
              <div className="h-px bg-gradient-to-r from-slate-200 to-transparent flex-1 ml-4"></div>
            </div>
            <div className="flex flex-wrap gap-3">
              {ROW_COLORS.map((color, index) => (
                <button
                  key={color.id}
                  onClick={() => setFormData(prev => ({ ...prev, color: color.id }))}
                  className={`group relative w-12 h-12 rounded-xl border-2 transition-all duration-300 hover:scale-110 ${color.class} ${
                    formData.color === color.id
                      ? 'border-slate-600 shadow-lg ring-2 ring-slate-200 scale-105'
                      : 'border-slate-300 hover:border-slate-400 shadow-sm hover:shadow-md'
                  }`}
                  title={color.name}
                  style={{
                    animationDelay: `${index * 30}ms`
                  }}
                >
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs font-medium text-slate-600 bg-white px-2 py-0.5 rounded-md shadow-sm whitespace-nowrap">
                      {color.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 mt-8 border-t border-slate-200">
          <div>
            {!isNewRow && onDelete && (
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-6 py-2.5 transition-all duration-200 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {isNewRow ? 'Add Row' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}