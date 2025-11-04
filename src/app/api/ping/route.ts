import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic' // Disable caching for this route

export async function GET() {
  try {
    // Create Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Supabase credentials not configured',
          time: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Make a simple query to keep Supabase active
    // Using beta_testers table since it exists in your schema
    const { data, error } = await supabase
      .from('beta_testers')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Supabase ping error:', error)
      return NextResponse.json(
        {
          ok: false,
          error: error.message,
          time: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ok: true,
      message: 'Supabase is active',
      time: new Date().toISOString(),
      queryResult: data ? 'success' : 'empty'
    })

  } catch (error) {
    console.error('Ping endpoint error:', error)
    return NextResponse.json(
      {
        ok: false,
        error: 'Internal server error',
        time: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
