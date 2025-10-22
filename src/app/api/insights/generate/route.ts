import { NextRequest, NextResponse } from 'next/server'
import { generateInsightsFromResearch } from '@/services/insightGenerator'
import { NPSData, CSATData, CESData, InterviewData, SurveyData } from '@/types/insight-import'
import { JourneyMapData } from '@/types/journey-map'
import { RateLimitError } from '@/services/openRouter'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { journeyId, sourceType, data, journeyMap } = body

    if (!journeyId || !sourceType || !data || !journeyMap) {
      return NextResponse.json(
        { error: 'Missing required fields: journeyId, sourceType, data, journeyMap' },
        { status: 400 }
      )
    }

    // Generate insights with journey map context
    const result = await generateInsightsFromResearch(
      journeyId,
      sourceType as 'nps' | 'csat' | 'ces' | 'interview' | 'survey',
      data as NPSData | CSATData | CESData | InterviewData | SurveyData,
      journeyMap as JourneyMapData
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error generating insights:', error)

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
      { error: error instanceof Error ? error.message : 'Failed to generate insights' },
      { status: 500 }
    )
  }
}
