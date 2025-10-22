import type { CompletedInterview } from '@/services/interviewStorage'

/**
 * Generates mock interviews with realistic insights for testing
 * These can be imported into the Insights AI system to test the full workflow
 */

export function generateMockInterviews(): CompletedInterview[] {
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const lastWeek = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0]

  return [
    // Interview 1: Checkout Issues
    {
      id: `mock-interview-${Date.now()}-1`,
      participant: 'Emma Johnson',
      date: today,
      duration: 1800, // 30 minutes
      questions: [
        'Tell me about your recent purchase experience on our website',
        'What was most frustrating?',
        'What would make you recommend us?'
      ],
      notes: `Emma shared her experience with the checkout process. She described how she tried to purchase a product but encountered several problems.

"It took five different pages before I could complete the purchase. Every time I clicked 'next', a new page loaded very slowly. It felt like I would never reach the end."

She also mentioned that she couldn't find shipping information:

"I looked everywhere for shipping information but found nothing until the last page. Then it turned out that shipping cost as much as the product itself! If I had known that from the beginning, I would never have added the product to my cart."

When I asked what would make her come back, she said:

"Make it simpler! I want to see the shipping cost right away. And reduce checkout to max 2-3 steps instead of 5-6."

Summary: Complicated checkout with too many steps and hidden shipping information creates frustration and cart abandonment.`,
      insights: [
        {
          timestamp: new Date(Date.now() - 1200000).toISOString(),
          type: 'problem',
          content: 'Checkout process has too many steps (5-6 steps) which creates frustration and slow loading time between steps'
        },
        {
          timestamp: new Date(Date.now() - 900000).toISOString(),
          type: 'problem',
          content: 'Shipping information is hidden until the final step which causes negative surprises and cart abandonment'
        },
        {
          timestamp: new Date(Date.now() - 600000).toISOString(),
          type: 'suggestion',
          content: 'Show shipping cost directly on product page and in cart'
        },
        {
          timestamp: new Date(Date.now() - 300000).toISOString(),
          type: 'suggestion',
          content: 'Simplify checkout to max 2-3 steps with clear progression'
        }
      ],
      status: 'completed',
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      updatedAt: new Date().toISOString(),
      folderId: undefined
    },

    // Interview 2: Mobile Experience
    {
      id: `mock-interview-${Date.now()}-2`,
      participant: 'Marcus Anderson',
      date: yesterday,
      duration: 1350, // 22.5 minutes
      questions: [
        'How do you experience our mobile app?',
        'Can you describe a time when something didn\'t work?',
        'What do you miss the most?'
      ],
      notes: `Marcus is a frequent mobile shopper who uses our app several times a week.

"The app is good overall, but there's a really annoying bug. When I try to add my credit card, the app crashes every time. I've tried three times now."

He demonstrated the problem and the app actually crashed when he reached the payment method page.

"It's so frustrating because I really like your products. But now I have to use my computer to shop instead, and I don't do that as often since I'm mostly on my phone."

When I asked about other issues, he mentioned:

"Sometimes the images take forever to load. I just see gray boxes for like 5 seconds before the product images appear. It makes me lose interest in scrolling."

Positive feedback:

"I love that you save my favorite products. It makes it easy to come back and buy the same things again."`,
      insights: [
        {
          timestamp: new Date(Date.now() - 1350000).toISOString(),
          type: 'problem',
          content: 'Mobile app crashes consistently when users try to add payment method'
        },
        {
          timestamp: new Date(Date.now() - 1000000).toISOString(),
          type: 'problem',
          content: 'Product images load slowly (5+ seconds) which creates poor user experience'
        },
        {
          timestamp: new Date(Date.now() - 600000).toISOString(),
          type: 'quote',
          content: 'I have to use my computer to shop instead, and I don\'t do that as often since I\'m mostly on my phone'
        },
        {
          timestamp: new Date(Date.now() - 200000).toISOString(),
          type: 'insight',
          content: 'Mobile bug forces users to switch devices which reduces conversion and purchase frequency'
        }
      ],
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000 - 1350000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      folderId: undefined
    },

    // Interview 3: Customer Support
    {
      id: `mock-interview-${Date.now()}-3`,
      participant: 'Sarah Mitchell',
      date: lastWeek,
      duration: 2100, // 35 minutes
      questions: [
        'Tell me about your contact with our customer service',
        'How quickly did you get a response?',
        'Was your problem resolved?'
      ],
      notes: `Sarah had a problem with a product and needed to contact support.

"I sent an email on Monday morning but didn't get a response until Thursday. That's three days! During that time, I didn't know if I would be able to return the product or not."

She described how the uncertainty affected her:

"I felt completely ignored. I checked my inbox like 10 times a day hoping for a response. Eventually, I wrote another email pointing out that I hadn't received an answer."

When support finally responded, the solution was good:

"They solved my problem immediately and I got a refund. But it would have been so much better if they had responded within 24 hours instead of 72 hours."

Suggestion from Sarah:

"At least send an automatic reply saying 'We've received your case and will get back to you within 24 hours'. Then you at least know that someone is reading it."

She compared with other companies:

"Amazon responds within a few hours. Zalando has live chat. Those are the kinds of things that make you feel secure about shopping."`,
      insights: [
        {
          timestamp: new Date(Date.now() - 604800000 - 2100000).toISOString(),
          type: 'problem',
          content: 'Customer service responds too slowly (72 hours instead of 24 hours) which creates uncertainty and frustration'
        },
        {
          timestamp: new Date(Date.now() - 604800000 - 1800000).toISOString(),
          type: 'quote',
          content: 'I felt completely ignored. I checked my inbox like 10 times a day'
        },
        {
          timestamp: new Date(Date.now() - 604800000 - 1200000).toISOString(),
          type: 'suggestion',
          content: 'Implement automatic confirmation email with expected response time (within 24h)'
        },
        {
          timestamp: new Date(Date.now() - 604800000 - 600000).toISOString(),
          type: 'suggestion',
          content: 'Consider live chat for faster support (comparison: Zalando, Amazon)'
        },
        {
          timestamp: new Date(Date.now() - 604800000 - 100000).toISOString(),
          type: 'insight',
          content: 'Slow support negatively affects trust even though the actual solution is good'
        }
      ],
      status: 'completed',
      createdAt: new Date(Date.now() - 604800000 - 2100000).toISOString(),
      updatedAt: new Date(Date.now() - 604800000).toISOString(),
      folderId: undefined
    },

    // Interview 4: Delivery Experience
    {
      id: `mock-interview-${Date.now()}-4`,
      participant: 'James Wilson',
      date: lastWeek,
      duration: 1200, // 20 minutes
      questions: [
        'How was the delivery of your recent order?',
        'Did you receive information about where the package was?',
        'Did the delivery meet your expectations?'
      ],
      notes: `James ordered a product that was supposed to be delivered within 3-5 business days.

"It took 8 days before the package arrived. I understand there can be delays, but what was most frustrating was that I received no information at all."

He explained the situation:

"I got an order confirmation right away, but then nothing happened. No update that it had shipped, no tracking number, nothing. After 6 days, I emailed support to check where the package was."

The problem continued:

"Support responded after two days and said the package was on its way, but they didn't provide a tracking number. Suddenly, the package was outside my door on day 8."

His expectations:

"I want to know where my package is. Like when you order from basically any other company today. An email when it ships, a tracking number, and maybe a push notification when it's close to delivery."

Impact on future purchases:

"I'm unsure if I want to order from here again. Not because the product was bad, but because I don't trust that the delivery will go smoothly."`,
      insights: [
        {
          timestamp: new Date(Date.now() - 604800000 - 1200000).toISOString(),
          type: 'problem',
          content: 'Delivery takes longer than promised (8 days instead of 3-5 days) without any explanation or update'
        },
        {
          timestamp: new Date(Date.now() - 604800000 - 900000).toISOString(),
          type: 'problem',
          content: 'No tracking information is sent which creates uncertainty and extra contact with support'
        },
        {
          timestamp: new Date(Date.now() - 604800000 - 600000).toISOString(),
          type: 'quote',
          content: 'I\'m unsure if I want to order from here again. Not because the product was bad, but because I don\'t trust that the delivery will go smoothly'
        },
        {
          timestamp: new Date(Date.now() - 604800000 - 300000).toISOString(),
          type: 'suggestion',
          content: 'Send automatic updates: order confirmation → shipped with tracking → almost there → delivered'
        },
        {
          timestamp: new Date(Date.now() - 604800000 - 50000).toISOString(),
          type: 'insight',
          content: 'Lack of transparency in the delivery process creates mistrust and reduces the likelihood of repeat purchases'
        }
      ],
      status: 'completed',
      createdAt: new Date(Date.now() - 604800000 - 1200000).toISOString(),
      updatedAt: new Date(Date.now() - 604800000).toISOString(),
      folderId: undefined
    }
  ]
}

/**
 * Get a summary of what the mock interviews contain
 */
export function getMockInterviewsSummary() {
  return {
    count: 4,
    participants: ['Emma Johnson', 'Marcus Anderson', 'Sarah Mitchell', 'James Wilson'],
    topics: [
      'Checkout process complexity and hidden costs',
      'Mobile app crashes and performance issues',
      'Customer support response time',
      'Delivery tracking and transparency'
    ],
    totalInsights: 17,
    insightTypes: {
      problems: 7,
      suggestions: 5,
      quotes: 3,
      insights: 2
    }
  }
}
