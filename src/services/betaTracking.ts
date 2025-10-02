import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

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

// Validate access code
export async function validateAccessCode(code: string) {
  try {
    console.log('🔍 Validating access code:', code)

    // Master code - always valid (same as admin code)
    if (code === '2713') {
      console.log('✅ Master access code used')
      return { valid: true, isMasterCode: true }
    }

    // Check if code exists and is not used
    const { data: validCode, error } = await supabase
      .from('access_codes')
      .select('id, code, is_used')
      .eq('code', code)
      .eq('is_used', false)
      .single()

    if (error || !validCode) {
      console.log('❌ Invalid or already used code')
      return { valid: false }
    }

    console.log('✅ Valid access code found')
    return { valid: true, codeId: validCode.id }
  } catch (error) {
    console.error('❌ Error validating access code:', error)
    return { valid: false }
  }
}

// Save beta tester login
export async function saveBetaTesterLogin(name: string, accessCode: string) {
  try {
    console.log('🔍 Beta tester login attempt:', { name, accessCode })

    // First validate the access code
    const validation = await validateAccessCode(accessCode)
    if (!validation.valid) {
      console.log('❌ Invalid access code')
      return { success: false, error: { message: 'Invalid or already used access code' } }
    }

    // Get user agent and IP (IP will be null on client side, could be captured server-side)
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : null
    console.log('📱 User agent:', userAgent)

    // Only mark non-master codes as used
    if (!validation.isMasterCode) {
      const { error: updateCodeError } = await supabase
        .from('access_codes')
        .update({
          is_used: true,
          used_by: name,
          used_at: new Date().toISOString()
        })
        .eq('code', accessCode)
        .eq('is_used', false)

      if (updateCodeError) {
        console.error('❌ Error updating access code:', updateCodeError)
        return { success: false, error: updateCodeError }
      }
    } else {
      console.log('🔑 Master code used - not marking as consumed')
    }

    // Check if user already exists
    console.log('🔍 Checking for existing user...')
    const { data: existingUser, error: selectError } = await supabase
      .from('beta_testers')
      .select('id, session_count')
      .eq('name', name)
      .single()

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('❌ Error checking existing user:', selectError)
      return { success: false, error: selectError }
    }

    console.log('👤 Existing user found:', existingUser)

    if (existingUser) {
      console.log('🔄 Updating existing user...')
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
        console.error('❌ Error updating beta tester:', error)
        return { success: false, error }
      }
      console.log('✅ Existing user updated successfully')
    } else {
      console.log('➕ Creating new user...')
      // Insert new user
      const { data, error } = await supabase
        .from('beta_testers')
        .insert({
          name,
          access_code: accessCode,
          user_agent: userAgent
        })
        .select()

      if (error) {
        console.error('❌ Error saving beta tester:', error)
        return { success: false, error }
      }
      console.log('✅ New user created successfully:', data)
    }

    return { success: true }
  } catch (error) {
    console.error('❌ Error in saveBetaTesterLogin:', error)
    return { success: false, error }
  }
}

// Get all beta testers (for admin)
export async function getBetaTesters() {
  try {
    console.log('📊 Fetching beta testers from database...')
    const { data, error } = await supabase
      .from('beta_testers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Error fetching beta testers:', error)
      // Return empty data on error (e.g., table doesn't exist)
      return { success: true, data: [] }
    }

    console.log('📊 Beta testers fetched:', data)
    console.log('📊 Number of beta testers:', data?.length || 0)

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('❌ Error in getBetaTesters:', error)
    // Return empty data on any error
    return { success: true, data: [] }
  }
}

// Get access codes status (for admin)
export async function getAccessCodes() {
  try {
    console.log('📊 Fetching access codes from database...')
    const { data, error } = await supabase
      .from('access_codes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Error fetching access codes:', error)
      return { success: false, data: [] }
    }

    console.log('📊 Access codes fetched:', data?.length || 0)
    return { success: true, data: data || [] }
  } catch (error) {
    console.error('❌ Error in getAccessCodes:', error)
    return { success: false, data: [] }
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