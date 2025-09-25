'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { UsersIcon, PlusIcon, ArrowLeftIcon, ArrowRightIcon, UserCheckIcon, UserPlusIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { ProgressSteps } from '@/components/ui/ProgressSteps'

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'owner' | 'editor' | 'viewer'
  avatar: string
  status: 'pending' | 'accepted'
}


export default function JourneyMapSetupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mapName, setMapName] = useState('')
  const [mapDescription, setMapDescription] = useState('')
  const [isFromTemplate, setIsFromTemplate] = useState(false)
  const [templateId, setTemplateId] = useState('')

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'fabiankjaergaard',
      email: 'fabian@example.com',
      role: 'owner',
      avatar: 'F',
      status: 'accepted'
    }
  ])

  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'editor' | 'viewer'>('editor')

  // Load parameters from URL
  useEffect(() => {
    const name = searchParams.get('name')
    const description = searchParams.get('description')
    const template = searchParams.get('template')
    const blank = searchParams.get('blank')

    if (name) setMapName(decodeURIComponent(name))
    if (description) setMapDescription(decodeURIComponent(description))
    if (template) {
      setIsFromTemplate(true)
      setTemplateId(template)
    }
  }, [searchParams])

  const addTeamMember = () => {
    if (inviteEmail.trim()) {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: inviteEmail.split('@')[0],
        email: inviteEmail.trim(),
        role: inviteRole,
        avatar: inviteEmail.charAt(0).toUpperCase(),
        status: 'pending'
      }

      setTeamMembers([...teamMembers, newMember])
      setInviteEmail('')
    }
  }

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id))
  }

  const updateMemberRole = (id: string, role: 'editor' | 'viewer') => {
    setTeamMembers(teamMembers.map(member =>
      member.id === id ? { ...member, role } : member
    ))
  }

  const handleContinue = () => {
    // Generate a new ID for the journey map
    const newMapId = Date.now().toString()
    const params = new URLSearchParams({
      name: mapName,
      description: mapDescription
    })

    if (isFromTemplate && templateId) {
      params.append('template', templateId)
    } else {
      params.append('blank', 'true')
    }

    // Add team members as parameter
    params.append('team', JSON.stringify(teamMembers))

    // Navigate to the actual journey map editor, not the creation page
    router.push(`/journey-maps/${newMapId}?${params.toString()}`)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-slate-700 text-white'
      case 'editor': return 'bg-blue-500 text-white'
      case 'viewer': return 'bg-gray-400 text-white'
      default: return 'bg-gray-400 text-white'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'owner': return 'Ägare'
      case 'editor': return 'Redigerare'
      case 'viewer': return 'Läsare'
      default: return role
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header
        title="Team Setup"
        description="Bjud in teammedlemmar till din journey map"
        actions={
          <Link href="/journey-maps/new">
            <Button variant="outline">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Tillbaka
            </Button>
          </Link>
        }
      />

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Progress Steps */}
          <div className="mb-8">
            <ProgressSteps
              totalSteps={4}
              currentStep={2} // Team setup is step 2 (0-indexed)
            />
          </div>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UsersIcon className="mr-2 h-5 w-5" />
                Team ({teamMembers.length})
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Bjud in teammedlemmar för att samarbeta på din journey map. Du kan ändra behörigheter när som helst.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Team Members */}
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${getRoleColor(member.role)}`}>
                        {member.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900">{member.name}</p>
                          {member.status === 'pending' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                              Väntar
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {member.role !== 'owner' && (
                        <select
                          value={member.role}
                          onChange={(e) => updateMemberRole(member.id, e.target.value as 'editor' | 'viewer')}
                          className="text-sm border border-gray-300 rounded pl-3 pr-8 py-2 text-gray-900 bg-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none"
                        >
                          <option value="editor">Redigerare</option>
                          <option value="viewer">Läsare</option>
                        </select>
                      )}
                      {member.role === 'owner' && (
                        <span className="text-sm text-gray-500 font-medium">
                          {getRoleLabel(member.role)}
                        </span>
                      )}
                      {member.role !== 'owner' && (
                        <button
                          onClick={() => removeTeamMember(member.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Invite New Member */}
              <div className="border-t pt-4">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <Input
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="E-post adress"
                      type="email"
                    />
                  </div>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as 'editor' | 'viewer')}
                    className="border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-slate-500 focus:border-slate-500 appearance-none"
                  >
                    <option value="editor">Redigerare</option>
                    <option value="viewer">Läsare</option>
                  </select>
                  <Button
                    variant="outline"
                    onClick={addTeamMember}
                    disabled={!inviteEmail.trim()}
                  >
                    <UserPlusIcon className="mr-2 h-4 w-4" />
                    Bjud in
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Teammedlemmar kommer få en inbjudan via e-post
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Permissions Info */}
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-gray-900 mb-3">Behörigheter</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
                  <span><strong>Ägare:</strong> Full kontroll, kan redigera allt och hantera teamet</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span><strong>Redigerare:</strong> Kan redigera journey map-innehåll</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span><strong>Läsare:</strong> Kan bara visa journey map</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="flex justify-center pt-6 border-t">
            <Button
              variant="primary"
              onClick={handleContinue}
              className="px-8"
            >
              <ArrowRightIcon className="mr-2 h-4 w-4" />
              Fortsätt till editorn
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}