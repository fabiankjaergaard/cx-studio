'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { getBetaTesters, getBetaTesterStats, BetaTester } from '@/services/betaTracking'
import {
  UsersIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  HashIcon,
  ActivityIcon,
  TrendingUpIcon,
  SearchIcon,
  RefreshCwIcon,
  ShieldIcon,
  DownloadIcon
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function BetaTestersAdminPage() {
  const [betaTesters, setBetaTesters] = useState<BetaTester[]>([])
  const [filteredTesters, setFilteredTesters] = useState<BetaTester[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalTesters: 0,
    activeToday: 0,
    totalSessions: 0,
    averageSessions: 0
  })
  const { user } = useAuth()
  const router = useRouter()

  // Check if user is admin (you can customize this check)
  useEffect(() => {
    // Only allow specific admin emails
    const adminEmails = ['fabiankjaergaard@gmail.com', 'admin@kustra.com']
    if (!user || !adminEmails.includes(user.email || '')) {
      router.push('/')
    }
  }, [user, router])

  // Load beta testers
  useEffect(() => {
    loadBetaTesters()
  }, [])

  // Filter testers based on search
  useEffect(() => {
    const filtered = betaTesters.filter(tester =>
      tester.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredTesters(filtered)
  }, [searchTerm, betaTesters])

  const loadBetaTesters = async () => {
    setLoading(true)
    try {
      const [testersResult, statsResult] = await Promise.all([
        getBetaTesters(),
        getBetaTesterStats()
      ])

      if (testersResult.success && testersResult.data) {
        setBetaTesters(testersResult.data)
        setFilteredTesters(testersResult.data)
      }

      setStats(statsResult)
    } catch (error) {
      console.error('Error loading beta testers:', error)
    }
    setLoading(false)
  }

  const exportToCSV = () => {
    const headers = ['Name', 'First Login', 'Last Active', 'Sessions', 'Access Code']
    const rows = betaTesters.map(tester => [
      tester.name,
      new Date(tester.login_time || '').toLocaleString(),
      new Date(tester.last_active || '').toLocaleString(),
      tester.session_count?.toString() || '1',
      tester.access_code || '1111'
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `beta-testers-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeSinceLogin = (dateString?: string) => {
    if (!dateString) return 'Never'
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) return `${diffDays} days ago`
    if (diffHours > 0) return `${diffHours} hours ago`
    return 'Just now'
  }

  return (
    <div className="h-full flex flex-col">
      <Header
        title="Beta Testers Admin"
        description="Manage and track beta program participants"
      />

      <div className="flex-1 p-8 overflow-auto bg-gray-50">
        {/* Admin Badge */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-lg">
            <ShieldIcon className="h-5 w-5" />
            <span className="font-medium">Admin Access</span>
          </div>
          <Button
            variant="outline"
            onClick={loadBetaTesters}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <RefreshCwIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Beta Testers</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalTesters}</p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <UsersIcon className="h-6 w-6 text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Today</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeToday}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <ActivityIcon className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Sessions</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalSessions}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUpIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Sessions</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.averageSessions}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <HashIcon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Beta Testers List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Beta Testers</CardTitle>
                <p className="text-sm text-gray-600 mt-1">All users who have accessed the beta program</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={exportToCSV}
                  className="flex items-center space-x-2"
                >
                  <DownloadIcon className="h-4 w-4" />
                  <span>Export CSV</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center space-x-2 text-gray-500">
                  <RefreshCwIcon className="h-5 w-5 animate-spin" />
                  <span>Loading beta testers...</span>
                </div>
              </div>
            ) : filteredTesters.length === 0 ? (
              <div className="text-center py-12">
                <UsersIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchTerm ? 'No testers found matching your search' : 'No beta testers yet'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">First Login</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Last Active</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Sessions</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-700">Code Used</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTesters.map((tester) => {
                      const isActiveToday = tester.last_active &&
                        new Date(tester.last_active).toDateString() === new Date().toDateString()

                      return (
                        <tr key={tester.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                <UserIcon className="h-5 w-5 text-slate-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{tester.name}</p>
                                <p className="text-xs text-gray-500">ID: {tester.id?.slice(0, 8)}...</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm">
                              <div className="flex items-center text-gray-600">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {formatDate(tester.login_time)}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {getTimeSinceLogin(tester.login_time)}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm">
                              <div className="flex items-center text-gray-600">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                {formatDate(tester.last_active)}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {getTimeSinceLogin(tester.last_active)}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 text-slate-700 rounded-full font-medium text-sm">
                              {tester.session_count || 1}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                              {tester.access_code || '1111'}
                            </code>
                          </td>
                          <td className="py-4 px-4">
                            {isActiveToday ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
                                Active today
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                Inactive
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}