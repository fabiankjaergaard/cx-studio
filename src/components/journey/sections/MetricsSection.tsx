'use client'

import { Section, SectionProps } from './Section'
import { CustomerJourney } from '@/types'
import { BarChartIcon, XIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Metric {
  name: string
  description: string
  target: string
  currentValue?: string
}

interface MetricsSectionProps extends Omit<SectionProps, 'children' | 'title'> {
  journey: CustomerJourney
  metrics?: Record<string, Metric[]>
  onUpdateMetrics?: (stageId: string, metrics: Metric[]) => void
}

export function MetricsSection({ 
  journey, 
  metrics = {}, 
  onUpdateMetrics, 
  ...sectionProps 
}: MetricsSectionProps) {

  const handleAddMetric = (stageId: string) => {
    const stageMetrics = metrics[stageId] || []
    const newMetric: Metric = { name: '', description: '', target: '', currentValue: '' }
    const updatedMetrics = [...stageMetrics, newMetric]
    onUpdateMetrics?.(stageId, updatedMetrics)
  }

  const handleUpdateMetric = (stageId: string, index: number, field: keyof Metric, value: string) => {
    const stageMetrics = metrics[stageId] || []
    const updatedMetrics = [...stageMetrics]
    updatedMetrics[index] = { ...updatedMetrics[index], [field]: value }
    onUpdateMetrics?.(stageId, updatedMetrics)
  }

  const handleRemoveMetric = (stageId: string, index: number) => {
    const stageMetrics = metrics[stageId] || []
    const updatedMetrics = stageMetrics.filter((_, i) => i !== index)
    onUpdateMetrics?.(stageId, updatedMetrics)
  }

  return (
    <Section {...sectionProps} title="Mätpunkter">
      <div className="space-y-8">
        {/* Metrics Scale Legend */}
        <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <BarChartIcon className="h-6 w-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Definiera KPI:er och mätvärden för varje steg</span>
          </div>
        </div>

        {/* Journey Stages with Metrics */}
        <div className="grid grid-cols-5 gap-6">
          {journey.stages.map((stage) => {
            const stageMetrics = metrics[stage.id] || []
            
            return (
              <div key={stage.id} className="space-y-4">
                {/* Stage Info */}
                <div className="text-center p-3 rounded-lg border" style={{ backgroundColor: stage.color + '15' }}>
                  <div 
                    className="w-3 h-3 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: stage.color }}
                  />
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{stage.name}</h3>
                  <p className="text-xs text-gray-600">{stage.description}</p>
                </div>

                {/* Metrics List */}
                <div className="space-y-3">
                  <p className="text-xs font-medium text-gray-700">KPI:er & Mätpunkter</p>
                  
                  <div className="space-y-4">
                    {stageMetrics.map((metric, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <Input
                            placeholder="KPI namn"
                            value={metric.name}
                            onChange={(e) => handleUpdateMetric(stage.id, index, 'name', e.target.value)}
                            className="text-sm font-medium"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveMetric(stage.id, index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 ml-2"
                          >
                            <XIcon className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Input
                          placeholder="Beskrivning"
                          value={metric.description}
                          onChange={(e) => handleUpdateMetric(stage.id, index, 'description', e.target.value)}
                          className="text-xs"
                        />
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Målvärde"
                            value={metric.target}
                            onChange={(e) => handleUpdateMetric(stage.id, index, 'target', e.target.value)}
                            className="text-xs"
                          />
                          <Input
                            placeholder="Nuvarande"
                            value={metric.currentValue || ''}
                            onChange={(e) => handleUpdateMetric(stage.id, index, 'currentValue', e.target.value)}
                            className="text-xs"
                          />
                        </div>
                      </div>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddMetric(stage.id)}
                      className="w-full border-dashed text-gray-500 hover:text-gray-700"
                    >
                      <PlusIcon className="h-3 w-3 mr-1" />
                      Lägg till KPI
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Metrics Dashboard */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center">
            <BarChartIcon className="h-5 w-5 text-blue-600 mr-2" />
            KPI Dashboard
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {journey.stages.map((stage) => {
              const stageMetrics = metrics[stage.id] || []
              if (stageMetrics.length === 0) return null
              
              return (
                <div key={stage.id} className="bg-white p-4 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <div 
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: stage.color }}
                    />
                    {stage.name}
                  </h4>
                  <div className="space-y-3">
                    {stageMetrics.map((metric, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium text-gray-900">{metric.name}</div>
                        {metric.description && (
                          <div className="text-gray-600 text-xs mb-1">{metric.description}</div>
                        )}
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Mål: {metric.target}</span>
                          {metric.currentValue && (
                            <span className="text-blue-600 font-medium">Nu: {metric.currentValue}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}