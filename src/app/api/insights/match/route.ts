import { NextRequest, NextResponse } from 'next/server'
import { matchInsightsToMap } from '@/services/insightMatcher'
import { GeneratedInsight } from '@/types/insight-import'
import { JourneyMapData } from '@/types/journey-map'
import { RateLimitError } from '@/services/openRouter'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { insights, journeyMap } = body

    if (!insights || !journeyMap) {
      return NextResponse.json(
        { error: 'Missing required fields: insights, journeyMap' },
        { status: 400 }
      )
    }

    // Match insights to journey map
    const matchedInsights = await matchInsightsToMap(
      insights as GeneratedInsight[],
      journeyMap as JourneyMapData
    )

    return NextResponse.json({ insights: matchedInsights })
  } catch (error) {
    console.error('Error matching insights:', error)

    // Handle rate limiting specially
    if (error instanceof RateLimitError) {
      return NextResponse.json(
        {
          error: 'rate_limit',
          message: error.message,
          resetTime: error.resetTime,
          limit: error.limit,
          remaining: error.remaining
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to match insights' },
      { status: 500 }
    )
  }
}
