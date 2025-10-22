import type { SurveyData, SurveyResponse } from '@/types/insight-import'

/**
 * Generates mock survey data for testing
 */

export function generateMockSurveys(): Array<{ id: string; surveyData: SurveyData; metadata: { name: string; description: string; date: string } }> {
  const today = new Date().toISOString().split('T')[0]
  const lastWeek = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0]
  const lastMonth = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]

  return [
    // Survey 1: Post-Purchase Experience Survey
    {
      id: `mock-survey-${Date.now()}-1`,
      metadata: {
        name: 'Post-Purchase Experience Survey',
        description: 'Survey sent to customers after completing a purchase',
        date: today
      },
      surveyData: {
        id: `mock-survey-${Date.now()}-1`,
        surveyName: 'Post-Purchase Experience Survey',
        collectedAt: today,
        responses: [
          {
            id: 'response-1',
            respondentId: 'customer-001',
            date: today,
            answers: [
              {
                questionId: 'q1',
                question: 'How would you rate your overall purchase experience?',
                answer: 'Good'
              },
              {
                questionId: 'q2',
                question: 'Was the checkout process easy to complete?',
                answer: 'No'
              },
              {
                questionId: 'q3',
                question: 'What could we improve about the checkout process?',
                answer: 'Too many steps. It took me through 5 different pages just to complete one purchase. Also, I had no idea about shipping costs until the very end.'
              },
              {
                questionId: 'q4',
                question: 'How likely are you to purchase from us again? (1-10)',
                answer: 6
              }
            ]
          },
          {
            id: 'response-2',
            respondentId: 'customer-002',
            date: today,
            answers: [
              {
                questionId: 'q1',
                question: 'How would you rate your overall purchase experience?',
                answer: 'Excellent'
              },
              {
                questionId: 'q2',
                question: 'Was the checkout process easy to complete?',
                answer: 'Yes'
              },
              {
                questionId: 'q3',
                question: 'What could we improve about the checkout process?',
                answer: 'Nothing, it was perfect!'
              },
              {
                questionId: 'q4',
                question: 'How likely are you to purchase from us again? (1-10)',
                answer: 9
              }
            ]
          },
          {
            id: 'response-3',
            respondentId: 'customer-003',
            date: today,
            answers: [
              {
                questionId: 'q1',
                question: 'How would you rate your overall purchase experience?',
                answer: 'Fair'
              },
              {
                questionId: 'q2',
                question: 'Was the checkout process easy to complete?',
                answer: 'No'
              },
              {
                questionId: 'q3',
                question: 'What could we improve about the checkout process?',
                answer: 'The mobile app kept crashing when I tried to add my credit card. I had to switch to my laptop to complete the purchase.'
              },
              {
                questionId: 'q4',
                question: 'How likely are you to purchase from us again? (1-10)',
                answer: 5
              }
            ]
          }
        ]
      }
    },

    // Survey 2: Customer Support Feedback
    {
      id: `mock-survey-${Date.now()}-2`,
      metadata: {
        name: 'Customer Support Feedback',
        description: 'Feedback survey sent after customer support interactions',
        date: lastWeek
      },
      surveyData: {
        id: `mock-survey-${Date.now()}-2`,
        surveyName: 'Customer Support Feedback',
        collectedAt: lastWeek,
        responses: [
          {
            id: 'response-4',
            respondentId: 'customer-004',
            date: lastWeek,
            answers: [
              {
                questionId: 'q1',
                question: 'How satisfied were you with our customer support?',
                answer: 'Dissatisfied'
              },
              {
                questionId: 'q2',
                question: 'How long did it take to receive a response?',
                answer: 'More than 48 hours'
              },
              {
                questionId: 'q3',
                question: 'Was your issue resolved?',
                answer: 'Yes'
              },
              {
                questionId: 'q4',
                question: 'What could we improve about our support?',
                answer: 'Faster response times! I waited 3 days for a reply. Even just an automated message saying "we received your email" would have been helpful.'
              }
            ]
          },
          {
            id: 'response-5',
            respondentId: 'customer-005',
            date: lastWeek,
            answers: [
              {
                questionId: 'q1',
                question: 'How satisfied were you with our customer support?',
                answer: 'Very Satisfied'
              },
              {
                questionId: 'q2',
                question: 'How long did it take to receive a response?',
                answer: 'Within 24 hours'
              },
              {
                questionId: 'q3',
                question: 'Was your issue resolved?',
                answer: 'Yes'
              },
              {
                questionId: 'q4',
                question: 'What could we improve about our support?',
                answer: 'Everything was great! Quick response and helpful solution.'
              }
            ]
          },
          {
            id: 'response-6',
            respondentId: 'customer-006',
            date: lastWeek,
            answers: [
              {
                questionId: 'q1',
                question: 'How satisfied were you with our customer support?',
                answer: 'Neutral'
              },
              {
                questionId: 'q2',
                question: 'How long did it take to receive a response?',
                answer: '24-48 hours'
              },
              {
                questionId: 'q3',
                question: 'Was your issue resolved?',
                answer: 'Partially'
              },
              {
                questionId: 'q4',
                question: 'What could we improve about our support?',
                answer: 'Consider adding live chat for urgent issues. Email works but sometimes you need immediate help.'
              }
            ]
          }
        ]
      }
    },

    // Survey 3: Delivery Experience Survey
    {
      id: `mock-survey-${Date.now()}-3`,
      metadata: {
        name: 'Delivery Experience Survey',
        description: 'Survey about shipping and delivery experience',
        date: lastMonth
      },
      surveyData: {
        id: `mock-survey-${Date.now()}-3`,
        surveyName: 'Delivery Experience Survey',
        collectedAt: lastMonth,
        responses: [
          {
            id: 'response-7',
            respondentId: 'customer-007',
            date: lastMonth,
            answers: [
              {
                questionId: 'q1',
                question: 'Did your order arrive on time?',
                answer: 'No'
              },
              {
                questionId: 'q2',
                question: 'How many days late was it?',
                answer: '3-4 days'
              },
              {
                questionId: 'q3',
                question: 'Did you receive tracking updates?',
                answer: 'No'
              },
              {
                questionId: 'q4',
                question: 'What would improve your delivery experience?',
                answer: 'I need to know where my package is! No tracking number, no updates, nothing. It just showed up one day. Very frustrating.'
              }
            ]
          },
          {
            id: 'response-8',
            respondentId: 'customer-008',
            date: lastMonth,
            answers: [
              {
                questionId: 'q1',
                question: 'Did your order arrive on time?',
                answer: 'Yes'
              },
              {
                questionId: 'q2',
                question: 'How many days late was it?',
                answer: 'On time'
              },
              {
                questionId: 'q3',
                question: 'Did you receive tracking updates?',
                answer: 'Yes'
              },
              {
                questionId: 'q4',
                question: 'What would improve your delivery experience?',
                answer: 'Everything was perfect! Got notifications at every step.'
              }
            ]
          },
          {
            id: 'response-9',
            respondentId: 'customer-009',
            date: lastMonth,
            answers: [
              {
                questionId: 'q1',
                question: 'Did your order arrive on time?',
                answer: 'No'
              },
              {
                questionId: 'q2',
                question: 'How many days late was it?',
                answer: '5+ days'
              },
              {
                questionId: 'q3',
                question: 'Did you receive tracking updates?',
                answer: 'No'
              },
              {
                questionId: 'q4',
                question: 'What would improve your delivery experience?',
                answer: 'Send automatic updates like other companies do. Email when shipped, tracking link, estimated delivery date, etc.'
              }
            ]
          }
        ]
      }
    }
  ]
}

/**
 * Get summary of mock surveys
 */
export function getMockSurveysSummary() {
  return {
    count: 3,
    names: [
      'Post-Purchase Experience Survey',
      'Customer Support Feedback',
      'Delivery Experience Survey'
    ],
    totalResponses: 9,
    topics: [
      'Checkout process and purchase experience',
      'Customer support response times',
      'Delivery tracking and timeliness'
    ]
  }
}
