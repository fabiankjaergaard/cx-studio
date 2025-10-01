'use client'

import { useState, useEffect, useRef } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  MessageCircleIcon,
  LightbulbIcon,
  BugIcon,
  StarIcon,
  TrashIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  KeyIcon,
  LogOutIcon,
  XIcon,
  EyeIcon,
  ImageIcon,
  UsersIcon,
  ClockIcon
} from 'lucide-react'
import { feedbackStorage, FeedbackItem } from '@/services/feedbackStorage'
import { getBetaTesters, getBetaTesterStats, BetaTester } from '@/services/betaTracking'

const ADMIN_CODE = '2713'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [code, setCode] = useState(['', '', '', ''])
  const [isError, setIsError] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([])
  const [selectedType, setSelectedType] = useState<'all' | 'feedback' | 'feature-request' | 'bug-report'>('all')
  const [selectedItem, setSelectedItem] = useState<FeedbackItem | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    feedback: 0,
    featureRequests: 0,
    bugReports: 0,
    averageRating: 0
  })

  const [betaTesters, setBetaTesters] = useState<BetaTester[]>([])
  const [betaStats, setBetaStats] = useState({
    totalTesters: 0,
    activeToday: 0,
    totalSessions: 0,
    averageSessions: 0
  })

  // No persistent authentication - require code every time
  const [isLoading, setIsLoading] = useState(false)

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setIsError(false)

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }

    // Check if code is complete
    if (newCode.every(digit => digit !== '') && newCode.join('') === ADMIN_CODE) {
      setIsAuthenticated(true)
      // Don't save to localStorage - require code every time
    } else if (newCode.every(digit => digit !== '')) {
      setIsError(true)
      // Clear code after error
      setTimeout(() => {
        setCode(['', '', '', ''])
        setIsError(false)
        inputRefs.current[0]?.focus()
      }, 1000)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCode(['', '', '', ''])
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadFeedback()
      loadBetaTesters()
    }
  }, [selectedType, isAuthenticated])

  const loadFeedback = async () => {
    const allFeedback = selectedType === 'all'
      ? await feedbackStorage.getAllFeedback()
      : await feedbackStorage.getFeedbackByType(selectedType)

    setFeedbackItems(allFeedback)
    const statsData = await feedbackStorage.getStats()
    setStats(statsData)
  }

  const loadBetaTesters = async () => {
    try {
      const [testersResult, statsResult] = await Promise.all([
        getBetaTesters(),
        getBetaTesterStats()
      ])

      if (testersResult.success && testersResult.data) {
        setBetaTesters(testersResult.data)
      }

      setBetaStats(statsResult)
    } catch (error) {
      console.error('Error loading beta testers:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Är du säker på att du vill ta bort denna feedback?')) {
      await feedbackStorage.deleteFeedback(id)
      loadFeedback()
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTypeIcon = (type: FeedbackItem['type']) => {
    switch (type) {
      case 'feedback':
        return MessageCircleIcon
      case 'feature-request':
        return LightbulbIcon
      case 'bug-report':
        return BugIcon
      default:
        return MessageCircleIcon
    }
  }

  const getTypeLabel = (type: FeedbackItem['type']) => {
    switch (type) {
      case 'feedback':
        return 'Feedback'
      case 'feature-request':
        return 'Feature Request'
      case 'bug-report':
        return 'Bug Report'
      default:
        return type
    }
  }

  const getTypeColor = (type: FeedbackItem['type']) => {
    switch (type) {
      case 'feedback':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'feature-request':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'bug-report':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'important':
        return 'bg-yellow-100 text-yellow-800'
      case 'nice-to-have':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }


  // Show authentication screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="h-full flex flex-col">
        <Header
          title="Admin"
          description="Ange fyrsiffrig kod för att komma åt admin-panelen"
        />

        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <Card className="w-full max-w-md border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="h-8 w-8 text-slate-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h2>
                <p className="text-gray-600">Ange fyrsiffrig kod för att fortsätta</p>
              </div>

              <div className="space-y-6">
                <div className="flex justify-center space-x-4">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      value={digit}
                      onChange={e => handleCodeChange(index, e.target.value)}
                      onKeyDown={e => handleKeyDown(index, e)}
                      className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        isError
                          ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:border-slate-500 focus:ring-slate-200'
                      }`}
                      maxLength={1}
                    />
                  ))}
                </div>

                {isError && (
                  <div className="text-center">
                    <p className="text-red-600 text-sm font-medium">
                      Fel kod. Försök igen.
                    </p>
                  </div>
                )}

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <KeyIcon className="h-4 w-4" />
                    <span>Koden sparas säkert i din webbläsare</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Header
        title="Admin"
        description="Hantera och granska feedback från användare och beta-testare"
      />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Logout Button */}
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logga ut
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 bg-white rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <TrendingUpIcon className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total feedback</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <MessageCircleIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.feedback}</div>
                    <div className="text-sm text-gray-600">Feedback</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <LightbulbIcon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.featureRequests}</div>
                    <div className="text-sm text-gray-600">Feature requests</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white rounded-xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <div className="flex space-x-0.5">
                      {stats.averageRating > 0 ? renderStars(Math.round(stats.averageRating)) : <span className="text-xs text-gray-400">-</span>}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.averageRating || '-'}</div>
                    <div className="text-sm text-gray-600">Avg rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Tabs */}
          <Card className="mb-6 border-0 bg-white rounded-xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'all', label: 'Alla', count: stats.total },
                  { key: 'feedback', label: 'Feedback', count: stats.feedback },
                  { key: 'feature-request', label: 'Feature Requests', count: stats.featureRequests },
                  { key: 'bug-report', label: 'Bug Reports', count: stats.bugReports }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedType(filter.key as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedType === filter.key
                        ? 'bg-slate-100 text-slate-900 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Feedback Items */}
          <div className="space-y-6 mb-12">
            {feedbackItems.map((item) => {
              const TypeIcon = getTypeIcon(item.type)
              return (
                <Card key={item.id} className="border-0 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(item.type)}`}>
                          <TypeIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(item.type)}`}>
                              {getTypeLabel(item.type)}
                            </span>
                            {item.data.priority && (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.data.priority)}`}>
                                {item.data.priority}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{formatDate(item.timestamp)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <UserIcon className="h-4 w-4" />
                              <span>{item.userInfo?.userName || item.userInfo?.userId || 'Anonym'}</span>
                              {item.userInfo?.isBetaTester && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                  Beta
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedItem(item)
                          }}
                          className="text-slate-600 hover:bg-slate-50 hover:text-slate-700"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(item.id)
                          }}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {item.data.title && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.data.title}
                          </h3>
                        </div>
                      )}

                      {item.data.category && (
                        <div className="flex items-center space-x-2">
                          <TagIcon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Kategori: {item.data.category}</span>
                        </div>
                      )}

                      {item.data.rating && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Betyg:</span>
                          <div className="flex space-x-1">
                            {renderStars(item.data.rating)}
                          </div>
                          <span className="text-sm text-gray-600">({item.data.rating}/5)</span>
                        </div>
                      )}

                      {(item.data.description || item.data.feedback) && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700 leading-relaxed">
                            {item.data.description || item.data.feedback}
                          </p>
                        </div>
                      )}

                      {item.data.useCase && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Use Case:</h4>
                          <p className="text-gray-700 leading-relaxed">
                            {item.data.useCase}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {feedbackItems.length === 0 && (
              <Card className="border-0 bg-white rounded-xl shadow-sm">
                <CardContent className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <MessageCircleIcon className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Ingen feedback ännu
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Det finns ingen feedback av denna typ ännu. När beta-testare skickar in feedback kommer den att visas här.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Beta Testers Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Beta Testers</h2>
                <p className="text-gray-600">Användare som har gått med i beta-programmet</p>
              </div>
              <div className="text-sm text-gray-500">
                {betaTesters.length} registrerade testare
              </div>
            </div>

            {/* Beta Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="border-0 bg-white rounded-xl shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <UsersIcon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{betaStats.totalTesters}</div>
                      <div className="text-sm text-gray-600">Total testare</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white rounded-xl shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <UserIcon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{betaStats.activeToday}</div>
                      <div className="text-sm text-gray-600">Aktiva idag</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white rounded-xl shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <TrendingUpIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{betaStats.totalSessions}</div>
                      <div className="text-sm text-gray-600">Totala sessioner</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white rounded-xl shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <CalendarIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{betaStats.averageSessions}</div>
                      <div className="text-sm text-gray-600">Snitt sessioner</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Beta Testers List */}
            <Card className="border-0 bg-white rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>Registrerade Beta Testare</CardTitle>
              </CardHeader>
              <CardContent>
                {betaTesters.length === 0 ? (
                  <div className="text-center py-12">
                    <UsersIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Inga beta-testare har registrerat sig än</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {betaTesters.map((tester, index) => {
                      const isActiveToday = tester.last_active &&
                        new Date(tester.last_active).toDateString() === new Date().toDateString()

                      return (
                        <div key={tester.id || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                              <UserIcon className="h-5 w-5 text-slate-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{tester.name}</div>
                              <div className="text-sm text-gray-600 flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <CalendarIcon className="h-3 w-3" />
                                  <span>Registrerad: {new Date(tester.login_time || '').toLocaleDateString('sv-SE')}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <ClockIcon className="h-3 w-3" />
                                  <span>Senast aktiv: {new Date(tester.last_active || '').toLocaleDateString('sv-SE')}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className="text-lg font-semibold text-gray-900">{tester.session_count || 1}</div>
                              <div className="text-xs text-gray-600">sessioner</div>
                            </div>
                            {isActiveToday ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
                                Aktiv idag
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                Inaktiv
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Detail Modal - Same as before... */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal content - keeping same as original */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(selectedItem.type)}`}>
                  {(() => {
                    const TypeIcon = getTypeIcon(selectedItem.type)
                    return <TypeIcon className="h-5 w-5" />
                  })()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedItem.data.title || getTypeLabel(selectedItem.type)}
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{formatDate(selectedItem.timestamp)}</span>
                    <span>•</span>
                    <span>{selectedItem.userInfo?.userName || selectedItem.userInfo?.userId || 'Anonym'}</span>
                    {selectedItem.userInfo?.isBetaTester && (
                      <>
                        <span>•</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          Beta
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Content Details */}
              {selectedItem.data.category && (
                <div className="flex items-center space-x-2">
                  <TagIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Kategori: {selectedItem.data.category}</span>
                </div>
              )}

              {selectedItem.data.priority && (
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedItem.data.priority)}`}>
                    {selectedItem.data.priority}
                  </span>
                </div>
              )}

              {selectedItem.data.rating && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Betyg:</span>
                  <div className="flex space-x-1">
                    {renderStars(selectedItem.data.rating)}
                  </div>
                  <span className="text-sm text-gray-600">({selectedItem.data.rating}/5)</span>
                </div>
              )}

              {(selectedItem.data.description || selectedItem.data.feedback) && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Beskrivning:</h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedItem.data.description || selectedItem.data.feedback}
                  </p>
                </div>
              )}

              {selectedItem.data.useCase && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Use Case:</h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedItem.data.useCase}
                  </p>
                </div>
              )}

              {selectedItem.data.steps && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Steg för att återskapa:</h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedItem.data.steps}
                  </p>
                </div>
              )}

              {selectedItem.data.expectedResult && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Förväntat resultat:</h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedItem.data.expectedResult}
                  </p>
                </div>
              )}

              {selectedItem.data.actualResult && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Faktiskt resultat:</h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedItem.data.actualResult}
                  </p>
                </div>
              )}

              {/* Images */}
              {selectedItem.data.images && selectedItem.data.images.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                    <ImageIcon className="h-4 w-4" />
                    <span>Bifogade bilder ({selectedItem.data.images.length})</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedItem.data.images.map((image, index) => (
                      <div key={index} className="relative bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`Bifogad bild ${index + 1}`}
                          className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(image, '_blank')}
                        />
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => window.open(image, '_blank')}
                            className="bg-black bg-opacity-50 text-white p-1 rounded text-xs hover:bg-opacity-70"
                          >
                            Öppna
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Stäng
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(selectedItem.id)
                    setSelectedItem(null)
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Radera
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}