export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: 'general' | 'journey' | 'touchpoint' | 'emotion' | 'metrics'
  examples?: string[]
  relatedTerms?: string[]
}

// Function to generate glossary terms with translations
export const getGlossaryTerms = (t: (key: string) => string): GlossaryTerm[] => [
  // General CX Terms
  {
    id: 'customer-experience',
    term: t('glossary.term.customer-experience'),
    definition: t('glossary.definition.customer-experience'),
    category: 'general' as const,
    examples: [
      t('glossary.example.customer-experience.1'),
      t('glossary.example.customer-experience.2'),
      t('glossary.example.customer-experience.3')
    ],
    relatedTerms: ['customer-journey', 'touchpoint']
  },
  {
    id: 'persona',
    term: t('glossary.term.persona'),
    definition: t('glossary.definition.persona'),
    category: 'general' as const,
    examples: [
      t('glossary.example.persona.1'),
      t('glossary.example.persona.2')
    ],
    relatedTerms: ['customer-journey', 'target-audience']
  },
  {
    id: 'user-experience',
    term: t('glossary.term.user-experience'),
    definition: t('glossary.definition.user-experience'),
    category: 'general' as const,
    relatedTerms: ['customer-experience', 'usability']
  },

  // Journey Terms
  {
    id: 'customer-journey',
    term: t('glossary.term.customer-journey'),
    definition: t('glossary.definition.customer-journey'),
    category: 'journey' as const,
    examples: [t('glossary.example.customer-journey.1')],
    relatedTerms: ['touchpoint', 'customer-experience', 'persona']
  },
  {
    id: 'customer-journey-map',
    term: t('glossary.term.customer-journey-map'),
    definition: t('glossary.definition.customer-journey-map'),
    category: 'journey' as const,
    relatedTerms: ['customer-journey', 'touchpoint', 'emotion-mapping']
  },
  {
    id: 'stage',
    term: t('glossary.term.stage'),
    definition: t('glossary.definition.stage'),
    category: 'journey' as const,
    examples: [
      t('glossary.example.stage.1'),
      t('glossary.example.stage.2'),
      t('glossary.example.stage.3'),
      t('glossary.example.stage.4'),
      t('glossary.example.stage.5')
    ],
    relatedTerms: ['customer-journey', 'touchpoint']
  },

  // Touchpoint Terms  
  {
    id: 'touchpoint',
    term: t('glossary.term.touchpoint'),
    definition: t('glossary.definition.touchpoint'),
    category: 'touchpoint' as const,
    examples: [
      t('glossary.example.touchpoint.1'),
      t('glossary.example.touchpoint.2'),
      t('glossary.example.touchpoint.3'),
      t('glossary.example.touchpoint.4'),
      t('glossary.example.touchpoint.5'),
      t('glossary.example.touchpoint.6')
    ],
    relatedTerms: ['customer-journey', 'channel', 'interaction']
  },
  {
    id: 'channel',
    term: t('glossary.term.channel'),
    definition: t('glossary.definition.channel'),
    category: 'touchpoint' as const,
    examples: [
      t('glossary.example.channel.1'),
      t('glossary.example.channel.2'),
      t('glossary.example.channel.3'),
      t('glossary.example.channel.4'),
      t('glossary.example.channel.5')
    ],
    relatedTerms: ['touchpoint', 'omnichannel']
  },
  {
    id: 'omnichannel',
    term: t('glossary.term.omnichannel'),
    definition: t('glossary.definition.omnichannel'),
    category: 'touchpoint' as const,
    relatedTerms: ['channel', 'touchpoint', 'customer-experience']
  },

  // Emotion Terms
  {
    id: 'emotion-mapping',
    term: t('glossary.term.emotion-mapping'),
    definition: t('glossary.definition.emotion-mapping'),
    category: 'emotion' as const,
    examples: [
      t('glossary.example.emotion-mapping.1'),
      t('glossary.example.emotion-mapping.2'),
      t('glossary.example.emotion-mapping.3')
    ],
    relatedTerms: ['touchpoint', 'customer-journey', 'pain-point']
  },
  {
    id: 'pain-point',
    term: t('glossary.term.pain-point'),
    definition: t('glossary.definition.pain-point'),
    category: 'emotion' as const,
    examples: [
      t('glossary.example.pain-point.1'),
      t('glossary.example.pain-point.2'),
      t('glossary.example.pain-point.3')
    ],
    relatedTerms: ['touchpoint', 'emotion-mapping', 'opportunity']
  },
  {
    id: 'opportunity',
    term: t('glossary.term.opportunity'),
    definition: t('glossary.definition.opportunity'),
    category: 'emotion' as const,
    examples: [
      t('glossary.example.opportunity.1'),
      t('glossary.example.opportunity.2'),
      t('glossary.example.opportunity.3')
    ],
    relatedTerms: ['pain-point', 'touchpoint', 'delight']
  },
  {
    id: 'moment-of-truth',
    term: t('glossary.term.moment-of-truth'),
    definition: t('glossary.definition.moment-of-truth'),
    category: 'emotion' as const,
    examples: [
      t('glossary.example.moment-of-truth.1'),
      t('glossary.example.moment-of-truth.2'),
      t('glossary.example.moment-of-truth.3')
    ],
    relatedTerms: ['touchpoint', 'customer-experience', 'pain-point']
  },

  // Metrics Terms
  {
    id: 'nps',
    term: t('glossary.term.nps'),
    definition: t('glossary.definition.nps'),
    category: 'metrics' as const,
    examples: [
      t('glossary.example.nps.1'),
      t('glossary.example.nps.2'),
      t('glossary.example.nps.3')
    ],
    relatedTerms: ['customer-satisfaction', 'loyalty']
  },
  {
    id: 'customer-satisfaction',
    term: t('glossary.term.customer-satisfaction'),
    definition: t('glossary.definition.customer-satisfaction'),
    category: 'metrics' as const,
    examples: [
      t('glossary.example.customer-satisfaction.1'),
      t('glossary.example.customer-satisfaction.2'),
      t('glossary.example.customer-satisfaction.3')
    ],
    relatedTerms: ['nps', 'customer-experience']
  },
  {
    id: 'customer-effort-score',
    term: t('glossary.term.customer-effort-score'),
    definition: t('glossary.definition.customer-effort-score'),
    category: 'metrics' as const,
    examples: [
      t('glossary.example.customer-effort-score.1'),
      t('glossary.example.customer-effort-score.2')
    ],
    relatedTerms: ['customer-satisfaction', 'usability']
  },
  {
    id: 'retention',
    term: t('glossary.term.retention'),
    definition: t('glossary.definition.retention'),
    category: 'metrics' as const,
    examples: [
      t('glossary.example.retention.1'),
      t('glossary.example.retention.2'),
      t('glossary.example.retention.3')
    ],
    relatedTerms: ['loyalty', 'churn-rate', 'lifetime-value']
  },
  {
    id: 'churn-rate',
    term: t('glossary.term.churn-rate'),
    definition: t('glossary.definition.churn-rate'),
    category: 'metrics' as const,
    examples: [
      t('glossary.example.churn-rate.1'),
      t('glossary.example.churn-rate.2'),
      t('glossary.example.churn-rate.3')
    ],
    relatedTerms: ['retention', 'customer-lifetime-value']
  },

  // Additional Journey Terms
  {
    id: 'awareness',
    term: t('glossary.term.awareness'),
    definition: t('glossary.definition.awareness'),
    category: 'journey' as const,
    examples: [
      t('glossary.example.awareness.1'),
      t('glossary.example.awareness.2'),
      t('glossary.example.awareness.3')
    ],
    relatedTerms: ['customer-journey', 'stage', 'consideration']
  },
  {
    id: 'consideration',
    term: t('glossary.term.consideration'),
    definition: t('glossary.definition.consideration'),
    category: 'journey' as const,
    examples: [
      t('glossary.example.consideration.1'),
      t('glossary.example.consideration.2'),
      t('glossary.example.consideration.3')
    ],
    relatedTerms: ['awareness', 'purchase', 'evaluation']
  },
  {
    id: 'purchase',
    term: t('glossary.term.purchase'),
    definition: t('glossary.definition.purchase'),
    category: 'journey' as const,
    examples: [
      t('glossary.example.purchase.1'),
      t('glossary.example.purchase.2'),
      t('glossary.example.purchase.3')
    ],
    relatedTerms: ['consideration', 'onboarding', 'conversion']
  },
  {
    id: 'onboarding',
    term: t('glossary.term.onboarding'),
    definition: t('glossary.definition.onboarding'),
    category: 'journey' as const,
    examples: [
      t('glossary.example.onboarding.1'),
      t('glossary.example.onboarding.2'),
      t('glossary.example.onboarding.3')
    ],
    relatedTerms: ['purchase', 'first-impression', 'time-to-value']
  },
  {
    id: 'advocacy',
    term: t('glossary.term.advocacy'),
    definition: t('glossary.definition.advocacy'),
    category: 'journey' as const,
    examples: [
      t('glossary.example.advocacy.1'),
      t('glossary.example.advocacy.2'),
      t('glossary.example.advocacy.3')
    ],
    relatedTerms: ['loyalty', 'nps', 'retention']
  },

  // Additional General Terms
  {
    id: 'empathy-map',
    term: t('glossary.term.empathy-map'),
    definition: t('glossary.definition.empathy-map'),
    category: 'general' as const,
    examples: [
      t('glossary.example.empathy-map.1'),
      t('glossary.example.empathy-map.2'),
      t('glossary.example.empathy-map.3')
    ],
    relatedTerms: ['persona', 'customer-research', 'user-experience']
  },
  {
    id: 'voice-of-customer',
    term: t('glossary.term.voice-of-customer'),
    definition: t('glossary.definition.voice-of-customer'),
    category: 'general' as const,
    examples: [
      t('glossary.example.voice-of-customer.1'),
      t('glossary.example.voice-of-customer.2'),
      t('glossary.example.voice-of-customer.3'),
      t('glossary.example.voice-of-customer.4')
    ],
    relatedTerms: ['customer-feedback', 'customer-research', 'customer-satisfaction']
  },
  {
    id: 'service-design',
    term: t('glossary.term.service-design'),
    definition: t('glossary.definition.service-design'),
    category: 'general' as const,
    examples: [
      t('glossary.example.service-design.1'),
      t('glossary.example.service-design.2'),
      t('glossary.example.service-design.3')
    ],
    relatedTerms: ['customer-experience', 'touchpoint', 'service-blueprint']
  },
  {
    id: 'service-blueprint',
    term: t('glossary.term.service-blueprint'),
    definition: t('glossary.definition.service-blueprint'),
    category: 'general' as const,
    relatedTerms: ['service-design', 'customer-journey-map', 'process-mapping']
  },

  // Additional Touchpoint Terms
  {
    id: 'digital-touchpoint',
    term: t('glossary.term.digital-touchpoint'),
    definition: t('glossary.definition.digital-touchpoint'),
    category: 'touchpoint' as const,
    examples: [
      t('glossary.example.digital-touchpoint.1'),
      t('glossary.example.digital-touchpoint.2'),
      t('glossary.example.digital-touchpoint.3'),
      t('glossary.example.digital-touchpoint.4'),
      t('glossary.example.digital-touchpoint.5')
    ],
    relatedTerms: ['touchpoint', 'omnichannel', 'digital-experience']
  },
  {
    id: 'physical-touchpoint',
    term: t('glossary.term.physical-touchpoint'),
    definition: t('glossary.definition.physical-touchpoint'),
    category: 'touchpoint' as const,
    examples: [
      t('glossary.example.physical-touchpoint.1'),
      t('glossary.example.physical-touchpoint.2'),
      t('glossary.example.physical-touchpoint.3'),
      t('glossary.example.physical-touchpoint.4'),
      t('glossary.example.physical-touchpoint.5')
    ],
    relatedTerms: ['touchpoint', 'in-store-experience', 'brand-experience']
  },
  {
    id: 'micro-interaction',
    term: t('glossary.term.micro-interaction'),
    definition: t('glossary.definition.micro-interaction'),
    category: 'touchpoint' as const,
    examples: [
      t('glossary.example.micro-interaction.1'),
      t('glossary.example.micro-interaction.2'),
      t('glossary.example.micro-interaction.3'),
      t('glossary.example.micro-interaction.4')
    ],
    relatedTerms: ['user-experience', 'touchpoint', 'interaction-design']
  },

  // Additional Emotion Terms
  {
    id: 'delight',
    term: t('glossary.term.delight'),
    definition: t('glossary.definition.delight'),
    category: 'emotion' as const,
    examples: [
      t('glossary.example.delight.1'),
      t('glossary.example.delight.2'),
      t('glossary.example.delight.3')
    ],
    relatedTerms: ['customer-satisfaction', 'wow-factor', 'surprise']
  },
  {
    id: 'friction',
    term: t('glossary.term.friction'),
    definition: t('glossary.definition.friction'),
    category: 'emotion' as const,
    examples: [
      t('glossary.example.friction.1'),
      t('glossary.example.friction.2'),
      t('glossary.example.friction.3')
    ],
    relatedTerms: ['pain-point', 'usability', 'customer-effort-score']
  },
  {
    id: 'wow-factor',
    term: t('glossary.term.wow-factor'),
    definition: t('glossary.definition.wow-factor'),
    category: 'emotion' as const,
    examples: [
      t('glossary.example.wow-factor.1'),
      t('glossary.example.wow-factor.2'),
      t('glossary.example.wow-factor.3')
    ],
    relatedTerms: ['delight', 'memorable-experience', 'differentiation']
  },
  {
    id: 'trust',
    term: t('glossary.term.trust'),
    definition: t('glossary.definition.trust'),
    category: 'emotion' as const,
    examples: [
      t('glossary.example.trust.1'),
      t('glossary.example.trust.2'),
      t('glossary.example.trust.3')
    ],
    relatedTerms: ['credibility', 'loyalty', 'brand-trust']
  },

  // Additional Metrics Terms
  {
    id: 'customer-lifetime-value',
    term: t('glossary.term.customer-lifetime-value'),
    definition: t('glossary.definition.customer-lifetime-value'),
    category: 'metrics' as const,
    examples: [
      t('glossary.example.customer-lifetime-value.1'),
      t('glossary.example.customer-lifetime-value.2')
    ],
    relatedTerms: ['retention', 'loyalty', 'profitability']
  },
  {
    id: 'conversion-rate',
    term: t('glossary.term.conversion-rate'),
    definition: t('glossary.definition.conversion-rate'),
    category: 'metrics' as const,
    examples: [
      t('glossary.example.conversion-rate.1'),
      t('glossary.example.conversion-rate.2'),
      t('glossary.example.conversion-rate.3')
    ],
    relatedTerms: ['funnel', 'optimization', 'performance']
  },
  {
    id: 'time-to-value',
    term: t('glossary.term.time-to-value'),
    definition: t('glossary.definition.time-to-value'),
    category: 'metrics' as const,
    examples: [
      t('glossary.example.time-to-value.1'),
      t('glossary.example.time-to-value.2'),
      t('glossary.example.time-to-value.3')
    ],
    relatedTerms: ['onboarding', 'activation', 'customer-success']
  },
  {
    id: 'activation-rate',
    term: t('glossary.term.activation-rate'),
    definition: t('glossary.definition.activation-rate'),
    category: 'metrics' as const,
    examples: [
      t('glossary.example.activation-rate.1'),
      t('glossary.example.activation-rate.2'),
      t('glossary.example.activation-rate.3')
    ],
    relatedTerms: ['onboarding', 'time-to-value', 'user-engagement']
  },
  {
    id: 'customer-health-score',
    term: t('glossary.term.customer-health-score'),
    definition: t('glossary.definition.customer-health-score'),
    category: 'metrics' as const,
    examples: [
      t('glossary.example.customer-health-score.1'),
      t('glossary.example.customer-health-score.2')
    ],
    relatedTerms: ['churn-rate', 'retention', 'customer-success']
  }
]

// Legacy export for backward compatibility - uses fallback keys if no translation function provided
export const glossaryTerms: GlossaryTerm[] = getGlossaryTerms((key: string) => key)