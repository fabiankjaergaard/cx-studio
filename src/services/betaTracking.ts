import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface BetaTester {
  id?: string
  name: string
  login_time?: string
  access_code?: string
  ip_address?: string
  user_agent?: string
  session_count?: number
  last_active?: string
  created_at?: string
}

// Save beta tester login
export async function saveBetaTesterLogin(name: string, accessCode: string = '1111') {
  try {
    // Get user agent and IP (IP will be null on client side, could be captured server-side)
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : null

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('beta_testers')
      .select('id, session_count')
      .eq('name', name)
      .single()

    if (existingUser) {
      // Update existing user
      const { error } = await supabase
        .from('beta_testers')
        .update({
          session_count: (existingUser.session_count || 0) + 1,
          last_active: new Date().toISOString(),
          user_agent: userAgent
        })
        .eq('id', existingUser.id)

      if (error) {
        console.error('Error updating beta tester:', error)
        return { success: false, error }
      }
    } else {
      // Insert new user
      const { error } = await supabase
        .from('beta_testers')
        .insert({
          name,
          access_code: accessCode,
          user_agent: userAgent
        })

      if (error) {
        console.error('Error saving beta tester:', error)
        return { success: false, error }
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error in saveBetaTesterLogin:', error)
    return { success: false, error }
  }
}

// Get all beta testers (for admin)
export async function getBetaTesters() {
  try {
    const { data, error } = await supabase
      .from('beta_testers')
      .select('*')
      .order('login_time', { ascending: false })

    if (error) {
      console.error('Error fetching beta testers:', error)
      // Return empty data on error (e.g., table doesn't exist)
      return { success: true, data: [] }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Error in getBetaTesters:', error)
    // Return empty data on any error
    return { success: true, data: [] }
  }
}

// Get beta tester statistics
export async function getBetaTesterStats() {
  try {
    const { data, error } = await supabase
      .from('beta_testers')
      .select('*')

    if (error) {
      console.error('Error fetching beta tester stats:', error)
      // Return default stats if table doesn't exist or other error
      return {
        totalTesters: 0,
        activeToday: 0,
        totalSessions: 0,
        averageSessions: 0
      }
    }

    if (!data || data.length === 0) {
      return {
        totalTesters: 0,
        activeToday: 0,
        totalSessions: 0,
        averageSessions: 0
      }
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const activeToday = data.filter(tester => {
      if (!tester.last_active) return false
      const lastActive = new Date(tester.last_active)
      return lastActive >= today
    }).length

    const totalSessions = data.reduce((sum, tester) => sum + (tester.session_count || 1), 0)
    const averageSessions = data.length > 0 ? totalSessions / data.length : 0

    return {
      totalTesters: data.length,
      activeToday,
      totalSessions,
      averageSessions: Math.round(averageSessions * 10) / 10
    }
  } catch (error) {
    console.error('Error in getBetaTesterStats:', error)
    // Always return safe defaults on any error
    return {
      totalTesters: 0,
      activeToday: 0,
      totalSessions: 0,
      averageSessions: 0
    }
  }
}