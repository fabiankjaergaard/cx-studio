export interface FeedbackItem {
  id: string
  type: 'feedback' | 'feature-request' | 'bug-report'
  timestamp: string
  data: {
    // Common fields
    category?: string
    priority?: string
    // Feedback specific
    feedback?: string
    rating?: number
    // Feature request specific
    title?: string
    description?: string
    useCase?: string
    // Bug report specific (if we add that later)
    steps?: string
    expected?: string
    actual?: string
  }
  userInfo?: {
    isBetaTester: boolean
    userId?: string
  }
}

class FeedbackStorageService {
  private storageKey = 'kustra_feedback_data'

  private getStorageData(): FeedbackItem[] {
    if (typeof window === 'undefined') return []

    try {
      const data = localStorage.getItem(this.storageKey)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error reading feedback data:', error)
      return []
    }
  }

  private saveStorageData(data: FeedbackItem[]): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving feedback data:', error)
    }
  }

  public addFeedback(feedback: Omit<FeedbackItem, 'id' | 'timestamp'>): string {
    const newFeedback: FeedbackItem = {
      ...feedback,
      id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    }

    const currentData = this.getStorageData()
    currentData.push(newFeedback)
    this.saveStorageData(currentData)

    return newFeedback.id
  }

  public getAllFeedback(): FeedbackItem[] {
    return this.getStorageData().sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  }

  public getFeedbackByType(type: FeedbackItem['type']): FeedbackItem[] {
    return this.getAllFeedback().filter(item => item.type === type)
  }

  public getFeedbackById(id: string): FeedbackItem | null {
    return this.getStorageData().find(item => item.id === id) || null
  }

  public deleteFeedback(id: string): boolean {
    const currentData = this.getStorageData()
    const filteredData = currentData.filter(item => item.id !== id)

    if (filteredData.length !== currentData.length) {
      this.saveStorageData(filteredData)
      return true
    }

    return false
  }

  public getStats() {
    const allFeedback = this.getAllFeedback()

    return {
      total: allFeedback.length,
      feedback: allFeedback.filter(item => item.type === 'feedback').length,
      featureRequests: allFeedback.filter(item => item.type === 'feature-request').length,
      bugReports: allFeedback.filter(item => item.type === 'bug-report').length,
      averageRating: this.calculateAverageRating(allFeedback)
    }
  }

  private calculateAverageRating(feedback: FeedbackItem[]): number {
    const ratingsData = feedback
      .filter(item => item.type === 'feedback' && item.data.rating)
      .map(item => item.data.rating!)

    if (ratingsData.length === 0) return 0

    const sum = ratingsData.reduce((acc, rating) => acc + rating, 0)
    return Math.round((sum / ratingsData.length) * 10) / 10
  }
}

export const feedbackStorage = new FeedbackStorageService()