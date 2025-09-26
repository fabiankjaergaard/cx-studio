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
    if (!formData.category.trim()) return

    // Journey categories always get white background
    const isJourneyCategory = ['actions', 'touchpoints', 'emotions', 'pain-points', 'opportunities', 'backstage'].includes(formData.category.toLowerCase())
    const finalColor = isJourneyCategory ? 'bg-slate-50' : formData.color

    onSave({
      category: formData.category.trim(),
      description: formData.description.trim(),
      type: formData.type as any,
      color: finalColor
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
    >
      <div className="space-y-6">
        <Input
          label="Row name"
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          placeholder="e.g. Customer emotions"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe what this row should contain..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Row type
          </label>
          <div className="space-y-2">
            {ROW_TYPES.map((type) => (
              <label key={type.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-slate-400">
                <input
                  type="radio"
                  name="type"
                  value={type.id}
                  checked={formData.type === type.id}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-gray-900">{type.name}</div>
                  <div className="text-sm text-gray-600">{type.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {!isJourneyCategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Row color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {ROW_COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setFormData(prev => ({ ...prev, color: color.id }))}
                  className={`p-3 rounded-lg border-2 transition-all ${color.class} ${
                    formData.color === color.id
                      ? 'border-slate-500 ring-2 ring-slate-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  title={color.name}
                >
                  <div className="text-sm font-medium text-gray-700">{color.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Preview */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview
          </label>
          <div className={`p-3 rounded-lg border ${isJourneyCategory ? 'bg-slate-50' : formData.color}`}>
            <div className="font-medium text-gray-900 mb-1">
              {formData.category || 'Row name'}
            </div>
            <div className="text-sm text-gray-600">
              {formData.description || 'Row description'}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Type: {selectedRowType?.name}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <div>
            {!isNewRow && onDelete && (
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Delete row
              </Button>
            )}
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave}
              disabled={!formData.category.trim()}
            >
              {isNewRow ? 'Add' : 'Save changes'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}