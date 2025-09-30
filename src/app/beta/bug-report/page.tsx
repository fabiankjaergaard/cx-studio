'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { BugIcon, SendIcon, AlertTriangleIcon, CheckCircleIcon } from 'lucide-react'
import { feedbackStorage } from '@/services/feedbackStorage'
import { useAuth } from '@/contexts/AuthContext'

export default function BugReportPage() {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [steps, setSteps] = useState('')
  const [expected, setExpected] = useState('')
  const [actual, setActual] = useState('')
  const [severity, setSeverity] = useState('')
  const [browser, setBrowser] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Get beta tester name from localStorage
    const betaTesterName = typeof window !== 'undefined'
      ? localStorage.getItem('cx-studio-beta-tester-name')
      : null

    // Save bug report to Supabase
    await feedbackStorage.addFeedback({
      type: 'bug-report',
      data: {
        title,
        description,
        steps,
        expected,
        actual,
        priority: severity,
        category: browser
      },
      userInfo: {
        isBetaTester: true,
        userId: user?.email || 'anonymous',
        userName: betaTesterName || undefined
      }
    })

    setSubmitted(true)

    // Reset form after a delay
    setTimeout(() => {
      setSubmitted(false)
      setTitle('')
      setDescription('')
      setSteps('')
      setExpected('')
      setActual('')
      setSeverity('')
      setBrowser('')
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="h-full flex flex-col">
        <Header
          title="Tack för din buggrapport!"
          description="Vi kommer att undersöka och åtgärda problemet så snart som möjligt"
        />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Buggrapport skickad!
              </h3>
              <p className="text-gray-600">
                Vi har mottagit din rapport och kommer att prioritera den baserat på allvarlighetsgrad.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Header
        title="Rapportera en bug"
        description="Hjälp oss fixa problem genom att beskriva vad som gick fel"
      />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-white rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BugIcon className="h-5 w-5 text-red-600" />
                Beskriv problemet
              </CardTitle>
              <p className="text-gray-600">
                Ju mer detaljerad information du ger, desto snabbare kan vi lösa problemet.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Bug Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Kort beskrivning av problemet *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="T.ex. 'Journey map sparas inte' eller 'Sidan laddar inte på mobil'"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Severity */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Hur allvarligt är problemet?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: 'low', label: 'Låg - Mindre problem', color: 'green' },
                      { value: 'medium', label: 'Medium - Påverkar funktionalitet', color: 'yellow' },
                      { value: 'high', label: 'Hög - Blockerar arbete', color: 'red' }
                    ].map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setSeverity(s.value)}
                        className={`p-3 text-left border rounded-lg transition-all duration-200 ${
                          severity === s.value
                            ? `border-${s.color}-500 bg-${s.color}-50 text-${s.color}-900`
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        <div className="font-medium">{s.label.split(' - ')[0]}</div>
                        <div className="text-xs">{s.label.split(' - ')[1]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Steps to Reproduce */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Steg för att återskapa problemet *
                  </label>
                  <textarea
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    placeholder="1. Gå till journey maps&#10;2. Klicka på 'Skapa ny'&#10;3. Fyll i namn och klicka spara&#10;4. Problemet uppstår..."
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Expected Behavior */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Vad förväntade du dig skulle hända?
                    </label>
                    <textarea
                      value={expected}
                      onChange={(e) => setExpected(e.target.value)}
                      placeholder="Journey map skulle sparas och jag skulle komma till editorn..."
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Actual Behavior */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Vad hände istället?
                    </label>
                    <textarea
                      value={actual}
                      onChange={(e) => setActual(e.target.value)}
                      placeholder="Sidan blev vit och inget hände..."
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                {/* Browser/Environment */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Vilken webbläsare använder du?
                  </label>
                  <select
                    value={browser}
                    onChange={(e) => setBrowser(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Välj webbläsare</option>
                    <option value="chrome">Chrome</option>
                    <option value="firefox">Firefox</option>
                    <option value="safari">Safari</option>
                    <option value="edge">Edge</option>
                    <option value="other">Annan</option>
                  </select>
                </div>

                {/* Additional Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Ytterligare information
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Finns det något annat som kan vara relevant? Felmeddelanden, konsol-loggar, etc."
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!title.trim() || !steps.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
                  >
                    <SendIcon className="h-4 w-4" />
                    Skicka buggrapport
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card className="mt-6 border-0 bg-blue-50 rounded-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <AlertTriangleIcon className="h-5 w-5" />
                Tips för en bra buggrapport
              </h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Var så specifik som möjligt i stegen för att återskapa</li>
                <li>• Inkludera skärmdumpar om möjligt</li>
                <li>• Testa om problemet uppstår i andra webbläsare</li>
                <li>• Kontrollera om problemet redan är rapporterat</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}