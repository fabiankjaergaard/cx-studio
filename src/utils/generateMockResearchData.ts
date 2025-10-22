import { ImportableResearchData } from '@/types/insight-import'
import { JourneyMapData } from '@/types/journey-map'

/**
 * Generate contextual mock research data based on the journey map
 * This creates realistic feedback that matches the journey stages and context
 */
export function generateMockResearchData(journeyMap: JourneyMapData): ImportableResearchData[] {
  const stages = journeyMap.stages
  const context = inferJourneyContext(journeyMap)

  // Generate NPS data with feedback matching journey stages
  const npsData: ImportableResearchData = {
    id: 'nps-demo',
    type: 'nps',
    name: 'NPS Survey - Demo Data',
    description: `Net Promoter Score survey for ${journeyMap.name}`,
    collectedAt: new Date().toISOString().split('T')[0],
    itemCount: 6,
    data: {
      id: 'nps-demo',
      campaignName: 'NPS Survey - Demo Data',
      collectedAt: new Date().toISOString().split('T')[0],
      responses: generateNPSResponses(stages, context)
    }
  }

  // Generate CSAT data
  const csatData: ImportableResearchData = {
    id: 'csat-demo',
    type: 'csat',
    name: 'CSAT Survey - Demo Data',
    description: `Customer satisfaction scores for ${journeyMap.name}`,
    collectedAt: new Date().toISOString().split('T')[0],
    itemCount: 4,
    data: {
      id: 'csat-demo',
      campaignName: 'CSAT Survey - Demo Data',
      collectedAt: new Date().toISOString().split('T')[0],
      responses: generateCSATResponses(stages, context)
    }
  }

  // Generate Interview data
  const interviewData: ImportableResearchData = {
    id: 'interview-demo',
    type: 'interview',
    name: 'User Interview - Demo',
    description: `In-depth interview about ${journeyMap.name}`,
    collectedAt: new Date().toISOString().split('T')[0],
    itemCount: 4,
    data: {
      id: 'interview-demo',
      interviewName: 'User Interview - Demo',
      conductedAt: new Date().toISOString().split('T')[0],
      participant: { id: 'demo-user', name: 'Demo User' },
      highlights: generateInterviewHighlights(stages, context)
    }
  }

  return [npsData, csatData, interviewData]
}

/**
 * Infer the context/industry from journey map name and stages
 */
function inferJourneyContext(journeyMap: JourneyMapData): string {
  const name = journeyMap.name.toLowerCase()
  const description = journeyMap.description?.toLowerCase() || ''

  // E-commerce patterns
  if (name.includes('e-commerce') || name.includes('shopping') || name.includes('purchase') ||
      description.includes('shopping') || description.includes('checkout')) {
    return 'e-commerce'
  }

  // SaaS patterns
  if (name.includes('saas') || name.includes('software') || name.includes('app') ||
      description.includes('software') || description.includes('platform')) {
    return 'saas'
  }

  // Healthcare patterns
  if (name.includes('healthcare') || name.includes('patient') || name.includes('medical')) {
    return 'healthcare'
  }

  // Banking patterns
  if (name.includes('bank') || name.includes('finance') || name.includes('loan')) {
    return 'banking'
  }

  // Travel patterns
  if (name.includes('travel') || name.includes('booking') || name.includes('hotel')) {
    return 'travel'
  }

  // Default to generic service
  return 'service'
}

/**
 * Generate NPS responses matching the journey stages
 */
function generateNPSResponses(stages: any[], context: string) {
  const templates = getContextTemplates(context)

  return [
    {
      id: 'nps-1',
      score: 4,
      comment: templates.detractor1,
      respondentId: 'user-1',
      date: new Date().toISOString()
    },
    {
      id: 'nps-2',
      score: 3,
      comment: templates.detractor2,
      respondentId: 'user-2',
      date: new Date().toISOString()
    },
    {
      id: 'nps-3',
      score: 5,
      comment: templates.detractor3,
      respondentId: 'user-3',
      date: new Date().toISOString()
    },
    {
      id: 'nps-4',
      score: 6,
      comment: templates.passive1,
      respondentId: 'user-4',
      date: new Date().toISOString()
    },
    {
      id: 'nps-5',
      score: 7,
      comment: templates.passive2,
      respondentId: 'user-5',
      date: new Date().toISOString()
    },
    {
      id: 'nps-6',
      score: 2,
      comment: templates.detractor4,
      respondentId: 'user-6',
      date: new Date().toISOString()
    }
  ]
}

/**
 * Generate CSAT responses
 */
function generateCSATResponses(stages: any[], context: string) {
  const templates = getContextTemplates(context)

  return [
    {
      id: 'csat-1',
      score: 2,
      comment: templates.csat1,
      respondentId: 'user-7',
      date: new Date().toISOString()
    },
    {
      id: 'csat-2',
      score: 1,
      comment: templates.csat2,
      respondentId: 'user-8',
      date: new Date().toISOString()
    },
    {
      id: 'csat-3',
      score: 3,
      comment: templates.csat3,
      respondentId: 'user-9',
      date: new Date().toISOString()
    },
    {
      id: 'csat-4',
      score: 2,
      comment: templates.csat4,
      respondentId: 'user-10',
      date: new Date().toISOString()
    }
  ]
}

/**
 * Generate interview highlights
 */
function generateInterviewHighlights(stages: any[], context: string) {
  const templates = getContextTemplates(context)

  return [
    {
      id: 'hl-1',
      quote: templates.interview1,
      category: 'pain-point' as const,
      timestamp: '00:05:30'
    },
    {
      id: 'hl-2',
      quote: templates.interview2,
      category: 'negative' as const,
      timestamp: '00:12:45'
    },
    {
      id: 'hl-3',
      quote: templates.interview3,
      category: 'pain-point' as const,
      timestamp: '00:18:20'
    },
    {
      id: 'hl-4',
      quote: templates.interview4,
      category: 'negative' as const,
      timestamp: '00:23:10'
    }
  ]
}

/**
 * Get context-specific feedback templates
 */
function getContextTemplates(context: string) {
  const templates = {
    'e-commerce': {
      detractor1: 'Checkout process is too complicated. Took me 10 minutes to complete payment.',
      detractor2: 'Cannot find shipping information anywhere. Very frustrating!',
      detractor3: 'Customer support never responds. Been waiting for 3 days.',
      detractor4: 'Mobile app crashes when adding payment method.',
      passive1: 'Good products but delivery takes too long.',
      passive2: 'Overall okay but checkout could be simpler.',
      csat1: 'Support agent was unhelpful. Long wait time of 45 minutes.',
      csat2: 'Issue not resolved after calling three times.',
      csat3: 'Took too long to get a response. Need faster support.',
      csat4: 'Got different answers from different agents. Very confusing.',
      interview1: 'The checkout page is confusing. Can never find the promo code field.',
      interview2: 'Delivery tracking is non-existent. No idea when my order arrives.',
      interview3: 'The mobile app keeps logging me out. So annoying!',
      interview4: 'Product descriptions lack important details. Have to contact support.'
    },
    'saas': {
      detractor1: 'Onboarding is confusing. No clear guidance on getting started.',
      detractor2: 'Cannot figure out how to integrate with our tools.',
      detractor3: 'Support documentation is outdated and unhelpful.',
      detractor4: 'Dashboard is too complex. Takes forever to find features.',
      passive1: 'Good features but interface is not intuitive.',
      passive2: 'Works okay but needs better tutorials.',
      csat1: 'Technical support did not understand my issue.',
      csat2: 'Waited hours for a response to urgent issue.',
      csat3: 'Documentation does not match actual product.',
      csat4: 'Support team keeps asking me to repeat information.',
      interview1: 'The setup process has too many steps. Lost twice.',
      interview2: 'Cannot find the feature I need. Navigation is unclear.',
      interview3: 'Integration with our CRM keeps failing.',
      interview4: 'Mobile app has limited functionality compared to desktop.'
    },
    'healthcare': {
      detractor1: 'Appointment booking system is confusing and slow.',
      detractor2: 'Cannot access my test results online.',
      detractor3: 'Support staff is unhelpful and dismissive.',
      detractor4: 'Mobile app does not sync with portal.',
      passive1: 'Service is okay but wait times are long.',
      passive2: 'Staff is friendly but process is complicated.',
      csat1: 'Receptionist was rude. Long wait without updates.',
      csat2: 'My concerns were not taken seriously.',
      csat3: 'Billing department gave conflicting information.',
      csat4: 'Prescription refill process is too complicated.',
      interview1: 'The patient portal is difficult to navigate.',
      interview2: 'Appointment reminders come too late.',
      interview3: 'Cannot find information about my insurance coverage.',
      interview4: 'The check-in process takes too long.'
    },
    'banking': {
      detractor1: 'Loan application process is too complex and slow.',
      detractor2: 'Cannot find clear information about fees.',
      detractor3: 'Mobile banking app crashes frequently.',
      detractor4: 'Customer service wait times are unacceptable.',
      passive1: 'Service is decent but fees are high.',
      passive2: 'App works but interface could be more modern.',
      csat1: 'Branch staff was unhelpful with my issue.',
      csat2: 'Spent 40 minutes on hold only to be transferred.',
      csat3: 'Online chat support gave wrong information.',
      csat4: 'Account opening process required too many documents.',
      interview1: 'The mortgage application has too many steps.',
      interview2: 'Cannot easily transfer between my accounts.',
      interview3: 'Security verification is frustratingly slow.',
      interview4: 'ATM locations are not shown in the app.'
    },
    'travel': {
      detractor1: 'Booking process has too many confusing steps.',
      detractor2: 'Cannot find information about cancellation policy.',
      detractor3: 'Support does not respond to urgent issues.',
      detractor4: 'Mobile app does not save my preferences.',
      passive1: 'Good selection but search filters are limited.',
      passive2: 'Booking works but checkout is slow.',
      csat1: 'Customer service was unhelpful with rebooking.',
      csat2: 'Refund process took weeks with no updates.',
      csat3: 'Got different answers from different agents.',
      csat4: 'Changes to booking are too expensive.',
      interview1: 'Cannot compare hotel options easily.',
      interview2: 'The payment process keeps timing out.',
      interview3: 'Itinerary management is confusing.',
      interview4: 'Cannot find important travel details after booking.'
    },
    'service': {
      detractor1: 'Process is too complicated and time-consuming.',
      detractor2: 'Cannot find the information I need.',
      detractor3: 'Support is slow to respond.',
      detractor4: 'System has too many technical issues.',
      passive1: 'Service is okay but could be improved.',
      passive2: 'Works fine but interface is outdated.',
      csat1: 'Staff was not helpful with my questions.',
      csat2: 'Had to contact support multiple times.',
      csat3: 'Response time is too slow.',
      csat4: 'Process is more complex than necessary.',
      interview1: 'The main process has too many steps.',
      interview2: 'Cannot easily access the features I need.',
      interview3: 'Technical issues interrupt my workflow.',
      interview4: 'Navigation is not intuitive.'
    }
  }

  return templates[context as keyof typeof templates] || templates.service
}
