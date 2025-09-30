import { supabase } from '@/lib/supabase'

export interface FeedbackItem {
  id: string
  type: 'feedback' | 'feature-request' | 'bug-report'
  timestamp: string
  data: {
    category?: string
    priority?: string
    feedback?: string
    rating?: number
    title?: string
    description?: string
    useCase?: string
    steps?: string
    expected?: string
    actual?: string
  }
  userInfo?: {
    isBetaTester: boolean
    userId?: string
    userName?: string
  }
}

class FeedbackStorageService {
  public async addFeedback(feedback: Omit<FeedbackItem, 'id' | 'timestamp'>): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .insert({
          type: feedback.type,
          user_name: feedback.userInfo?.userName || null,
          user_id: feedback.userInfo?.userId || null,
          is_beta_tester: feedback.userInfo?.isBetaTester || false,
          category: feedback.data.category || null,
          priority: feedback.data.priority || null,
          rating: feedback.data.rating || null,
          feedback_text: feedback.data.feedback || null,
          title: feedback.data.title || null,
          description: feedback.data.description || null,
          use_case: feedback.data.useCase || null,
          steps: feedback.data.steps || null,
          expected_result: feedback.data.expected || null,
          actual_result: feedback.data.actual || null
        })
        .select('id')
        .single()

      if (error) {
        console.error('Error saving feedback to Supabase:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        throw error
      }

      return data?.id || null
    } catch (error: any) {
      console.error('Unexpected error saving feedback:', error)
      console.error('Error message:', error?.message)
      console.error('Error details:', JSON.stringify(error, null, 2))
      throw error
    }
  }

  public async getAllFeedback(): Promise<FeedbackItem[]> {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching feedback from Supabase:', error)
        return []
      }

      return this.mapSupabaseToFeedbackItems(data || [])
    } catch (error) {
      console.error('Unexpected error fetching feedback:', error)
      return []
    }
  }

  public async getFeedbackByType(type: FeedbackItem['type']): Promise<FeedbackItem[]> {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('type', type)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching feedback by type from Supabase:', error)
        return []
      }

      return this.mapSupabaseToFeedbackItems(data || [])
    } catch (error) {
      console.error('Unexpected error fetching feedback by type:', error)
      return []
    }
  }

  public async getFeedbackById(id: string): Promise<FeedbackItem | null> {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching feedback by ID from Supabase:', error)
        return null
      }

      const mapped = this.mapSupabaseToFeedbackItems([data])
      return mapped[0] || null
    } catch (error) {
      console.error('Unexpected error fetching feedback by ID:', error)
      return null
    }
  }

  public async deleteFeedback(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('feedback')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting feedback from Supabase:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Unexpected error deleting feedback:', error)
      return false
    }
  }

  public async getStats() {
    try {
      const allFeedback = await this.getAllFeedback()

      return {
        total: allFeedback.length,
        feedback: allFeedback.filter(item => item.type === 'feedback').length,
        featureRequests: allFeedback.filter(item => item.type === 'feature-request').length,
        bugReports: allFeedback.filter(item => item.type === 'bug-report').length,
        averageRating: this.calculateAverageRating(allFeedback)
      }
    } catch (error) {
      console.error('Error calculating stats:', error)
      return {
        total: 0,
        feedback: 0,
        featureRequests: 0,
        bugReports: 0,
        averageRating: 0
      }
    }
  }

  private mapSupabaseToFeedbackItems(supabaseData: any[]): FeedbackItem[] {
    return supabaseData.map(item => ({
      id: item.id,
      type: item.type,
      timestamp: item.created_at,
      data: {
        category: item.category,
        priority: item.priority,
        feedback: item.feedback_text,
        rating: item.rating,
        title: item.title,
        description: item.description,
        useCase: item.use_case,
        steps: item.steps,
        expected: item.expected_result,
        actual: item.actual_result
      },
      userInfo: {
        isBetaTester: item.is_beta_tester,
        userId: item.user_id,
        userName: item.user_name
      }
    }))
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