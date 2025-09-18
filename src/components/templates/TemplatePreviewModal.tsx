'use client'

import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { DownloadIcon, XIcon } from 'lucide-react'
import { useRef, useEffect } from 'react'
import twemoji from 'twemoji'

interface TemplatePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  template: {
    id: string
    name: string
    description: string
    industry: string
    touchpoints: number
    stages: number
  } | null
  onUseTemplate: (template: any) => void
}

// Component to render Twemoji
function TwemojiEmoji({ emoji, size = 18 }: { emoji: string; size?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      const html = twemoji.parse(emoji, {
        folder: 'svg',
        ext: '.svg',
        base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/'
      })
      ref.current.innerHTML = html

      // Set size for the generated img elements
      const imgs = ref.current.querySelectorAll('img')
      imgs.forEach(img => {
        img.style.width = `${size}px`
        img.style.height = `${size}px`
        img.style.display = 'inline-block'
        img.style.verticalAlign = 'middle'
      })
    }
  }, [emoji, size])

  return <span ref={ref} style={{ display: 'inline-block', lineHeight: 1 }}></span>
}

export function TemplatePreviewModal({
  isOpen,
  onClose,
  template,
  onUseTemplate
}: TemplatePreviewModalProps) {
  if (!template) return null

  // Mock preview data based on template ID
  const getPreviewData = (templateId: string) => {
    switch (templateId) {
      case '1': // E-commerce
        return {
          stages: [
            { name: 'Medvetenhet', description: 'Kunden upptäcker behov' },
            { name: 'Köp/Beslut', description: 'Kunden jämför och beslutar' },
            { name: 'Användning', description: 'Kunden använder produkten' },
            { name: 'Lojalitet', description: 'Kunden blir återkommande' }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: ['Söker online', 'Jämför priser', 'Genomför köp', 'Delar upplevelse']
            },
            {
              name: 'Känslor',
              examples: ['😊', '🤔', '😍', '😊']
            },
            {
              name: 'Smärtpunkter',
              examples: ['Svårt att hitta info', 'Komplicerad checkout', 'Långsam leverans', 'Oklara returer']
            },
            {
              name: 'Möjligheter',
              examples: ['Personaliserade rekommendationer', 'Smidigare betalning', 'Snabbare leverans', 'Lojalitetsprogram']
            }
          ]
        }
      case '2': // SaaS
        return {
          stages: [
            { name: 'Medvetenhet', description: 'Upptäcker lösningen' },
            { name: 'Utvärdering', description: 'Testar och utvärderar' },
            { name: 'Onboarding', description: 'Kommer igång' },
            { name: 'Användning', description: 'Daglig användning' }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: ['Läser om lösningar', 'Startar trial', 'Skapar konto', 'Använder dagligen']
            },
            {
              name: 'Touchpoints',
              examples: ['Webbsida', 'Demo', 'Onboarding emails', 'Support chat']
            },
            {
              name: 'Känslor',
              examples: ['😊', '😐', '😅', '😊']
            },
            {
              name: 'Smärtpunkter',
              examples: ['Komplex registrering', 'Svår att förstå värde', 'För många funktioner', 'Bristande support']
            }
          ]
        }
      case '3': // Customer Service
        return {
          stages: [
            { name: 'Kontakt', description: 'Kunden söker hjälp' },
            { name: 'Identifiering', description: 'Problem identifieras' },
            { name: 'Lösning', description: 'Problem löses' },
            { name: 'Uppföljning', description: 'Kvalitetssäkring' },
            { name: 'Reflektion', description: 'Utvärdering av upplevelse' }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: ['Kontaktar support', 'Förklarar problem', 'Följer instruktioner', 'Bekräftar lösning', 'Ger feedback']
            },
            {
              name: 'Känslor',
              examples: ['😰', '😔', '🤔', '😊', '😄']
            },
            {
              name: 'Smärtpunkter',
              examples: ['Långa väntetider', 'Komplicerade menyer', 'Behöver upprepa info', 'Otydliga instruktioner', 'Ingen uppföljning']
            },
            {
              name: 'Möjligheter',
              examples: ['Snabb svarstid', 'Proaktiv kommunikation', 'Personlig service', 'Tydliga lösningar', 'Automatisk uppföljning']
            }
          ]
        }
      case '4': // Restaurant
        return {
          stages: [
            { name: 'Inspiration', description: 'Får lust att äta ute' },
            { name: 'Sökning', description: 'Letar efter restaurang' },
            { name: 'Bokning', description: 'Reserverar bord' },
            { name: 'Ankomst', description: 'Kommer till restaurangen' },
            { name: 'Måltid', description: 'Äter och upplever' },
            { name: 'Avslut', description: 'Betalar och lämnar' }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: ['Söker inspiration', 'Läser recensioner', 'Bokar online', 'Kommer i tid', 'Beställer mat', 'Betalar notan']
            },
            {
              name: 'Känslor',
              examples: ['😋', '🤔', '😊', '😍', '😄', '😊']
            },
            {
              name: 'Touchpoints',
              examples: ['Sociala medier', 'Google/TripAdvisor', 'Bokningssystem', 'Värd/Personal', 'Mat & miljö', 'Betalningssystem']
            },
            {
              name: 'Smärtpunkter',
              examples: ['Svårt hitta info', 'Komplicerad bokning', 'Långa väntetider', 'Fel beställning', 'Hög ljudnivå', 'Långsam service']
            },
            {
              name: 'Möjligheter',
              examples: ['Inspirerande innehåll', 'Smidig bokning', 'Personlig välkomst', 'Överraska positivt', 'Minnesvärda detaljer', 'Enkla betalningar']
            }
          ]
        }
      case '5': // Banking
        return {
          stages: [
            { name: 'Behov', description: 'Identifierar finansiellt behov' },
            { name: 'Utforskning', description: 'Undersöker alternativ' },
            { name: 'Ansökan', description: 'Ansöker om tjänst' },
            { name: 'Godkännande', description: 'Väntar på beslut' },
            { name: 'Användning', description: 'Använder tjänsten' }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: ['Identifierar behov', 'Jämför banker', 'Skickar ansökan', 'Väntar på svar', 'Aktiverar tjänst']
            },
            {
              name: 'Känslor',
              examples: ['🤔', '😰', '🤞', '😰', '😊']
            },
            {
              name: 'Touchpoints',
              examples: ['Webbsida', 'Bankkontor', 'App/Digital tjänst', 'Telefonsupport', 'Email/Brev']
            },
            {
              name: 'Smärtpunkter',
              examples: ['Komplexa villkor', 'Lång handläggningstid', 'Många dokument', 'Otydlig kommunikation', 'Tekniska problem']
            },
            {
              name: 'Möjligheter',
              examples: ['Tydlig information', 'Snabb handläggning', 'Digital signering', 'Proaktiv uppdatering', 'Personlig rådgivning']
            }
          ]
        }
      case '6': // Healthcare
        return {
          stages: [
            { name: 'Symptom', description: 'Märker hälsoproblem' },
            { name: 'Bedömning', description: 'Bedömer allvarlighetsgrad' },
            { name: 'Bokning', description: 'Bokar tid' },
            { name: 'Besök', description: 'Träffar vårdpersonal' },
            { name: 'Behandling', description: 'Får behandling' },
            { name: 'Uppföljning', description: 'Följer upp resultat' }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: ['Märker symptom', 'Söker information', 'Kontaktar vård', 'Kommer till besök', 'Följer behandling', 'Bokar uppföljning']
            },
            {
              name: 'Känslor',
              examples: ['😟', '😰', '🤞', '😌', '😊', '😄']
            },
            {
              name: 'Touchpoints',
              examples: ['1177.se', 'Telefon/App', 'Vårdcentral', 'Läkare/Sköterska', 'Behandlingsrum', 'Uppföljningssystem']
            },
            {
              name: 'Smärtpunkter',
              examples: ['Svårt bedöma allvar', 'Långa väntetider', 'Komplicerad bokning', 'Otydlig information', 'Brist på uppföljning', 'Tekniska hinder']
            },
            {
              name: 'Möjligheter',
              examples: ['Tydlig självriskbedömning', 'Snabb tillgänglighet', 'Digital support', 'Empatisk kommunikation', 'Integrerad uppföljning', 'Proaktiv hälsovård']
            }
          ]
        }
      default:
        return {
          stages: [
            { name: 'Fas 1', description: 'Första fasen' },
            { name: 'Fas 2', description: 'Andra fasen' },
            { name: 'Fas 3', description: 'Tredje fasen' }
          ],
          categories: [
            {
              name: 'Åtgärder',
              examples: ['Exempel 1', 'Exempel 2', 'Exempel 3']
            }
          ]
        }
    }
  }

  const previewData = getPreviewData(template.id)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Förhandsgranska: ${template.name}`}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Template Info */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
            <p className="text-gray-600 mt-1">{template.description}</p>
            <div className="flex items-center space-x-4 mt-3">
              <Badge variant="secondary">{template.industry}</Badge>
              <span className="text-sm text-gray-500">
                {template.touchpoints} touchpoints • {template.stages} faser
              </span>
            </div>
          </div>
        </div>


        {/* Preview Grid */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-3 text-sm font-medium text-gray-700 w-32">
                  Kategorier
                </th>
                {previewData.stages.map((stage, index) => (
                  <th key={index} className="text-left p-3 text-sm font-medium text-gray-700">
                    <div>
                      <div className="font-semibold">{stage.name}</div>
                      <div className="text-xs text-gray-500 font-normal">{stage.description}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewData.categories.map((category, categoryIndex) => (
                <tr key={categoryIndex} className="border-b">
                  <td className="p-3 bg-gray-50 font-medium text-sm text-gray-700">
                    {category.name}
                  </td>
                  {category.examples.map((example, exampleIndex) => (
                    <td key={exampleIndex} className="p-3 text-sm text-gray-600">
                      {category.name === 'Känslor' ? (
                        <TwemojiEmoji emoji={example} size={20} />
                      ) : (
                        example
                      )}
                    </td>
                  ))}
                  {/* Fill remaining cells if needed */}
                  {Array.from({ length: Math.max(0, previewData.stages.length - category.examples.length) }).map((_, index) => (
                    <td key={`empty-${index}`} className="p-3 text-sm text-gray-400">
                      -
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Stäng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onUseTemplate(template)
              onClose()
            }}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Använd denna mall
          </Button>
        </div>
      </div>
    </Modal>
  )
}