// Shared template definitions used across both /templates and /journey-maps/templates

export interface Template {
  id: string
  name: string
  description: string
  industry: string
  touchpoints: number
  stages: number
  preview: string
  icon: string
}

export const getSharedTemplates = (t: (key: string) => string): Template[] => [
  {
    id: '1',
    name: t('templates.ecommerce.name') || 'E-commerce Customer Journey',
    description: t('templates.ecommerce.description') || 'Complete customer journey from awareness to purchase and post-purchase for online retail',
    industry: t('templates.ecommerce.industry') || 'E-commerce',
    touchpoints: 8,
    stages: 5,
    preview: '/api/templates/1/preview',
    icon: 'ShoppingCartIcon'
  },
  {
    id: '2',
    name: t('templates.saas.name') || 'SaaS Onboarding',
    description: t('templates.saas.description') || 'User onboarding for SaaS products from registration to activation',
    industry: t('templates.saas.industry') || 'Technology',
    touchpoints: 6,
    stages: 4,
    preview: '/api/templates/2/preview',
    icon: 'RocketIcon'
  },
  {
    id: '3',
    name: t('templates.customerService.name') || 'Customer Service Journey',
    description: t('templates.customerService.description') || 'Customer service process from problem identification to resolution',
    industry: t('templates.customerService.industry') || 'Service',
    touchpoints: 7,
    stages: 5,
    preview: '/api/templates/3/preview',
    icon: 'HeadphonesIcon'
  },
  {
    id: '4',
    name: t('templates.restaurant.name') || 'Restaurant Experience',
    description: t('templates.restaurant.description') || 'Guest experience from booking to post-visit engagement',
    industry: t('templates.restaurant.industry') || 'Restaurant',
    touchpoints: 9,
    stages: 6,
    preview: '/api/templates/4/preview',
    icon: 'UtensilsIcon'
  },
  {
    id: '5',
    name: t('templates.banking.name') || 'Banking Loan Process',
    description: t('templates.banking.description') || 'Loan application process from initial inquiry to disbursement',
    industry: t('templates.banking.industry') || 'Finance',
    touchpoints: 10,
    stages: 5,
    preview: '/api/templates/5/preview',
    icon: 'CreditCardIcon'
  },
  {
    id: '6',
    name: t('templates.healthcare.name') || 'Healthcare Journey',
    description: t('templates.healthcare.description') || 'Patient healthcare journey from symptoms to recovery',
    industry: t('templates.healthcare.industry') || 'Healthcare',
    touchpoints: 8,
    stages: 6,
    preview: '/api/templates/6/preview',
    icon: 'HeartIcon'
  },
  {
    id: '7',
    name: 'B2B Sales Process',
    description: 'Complex B2B sales process from prospecting to customer relationships',
    industry: 'B2B',
    touchpoints: 12,
    stages: 7,
    preview: '/api/templates/7/preview',
    icon: 'TrendingUpIcon'
  },
  {
    id: '8',
    name: 'E-learning Platform',
    description: 'User journey for online education from registration to certification',
    industry: 'Education',
    touchpoints: 8,
    stages: 5,
    preview: '/api/templates/8/preview',
    icon: 'GraduationCapIcon'
  },
  {
    id: '9',
    name: 'Mobile App Onboarding',
    description: 'First impressions and onboarding for mobile apps with user engagement',
    industry: 'Technology',
    touchpoints: 6,
    stages: 4,
    preview: '/api/templates/9/preview',
    icon: 'SmartphoneIcon'
  },
  {
    id: '10',
    name: 'Event Management',
    description: 'Event experience from planning to follow-up',
    industry: 'Events',
    touchpoints: 10,
    stages: 6,
    preview: '/api/templates/10/preview',
    icon: 'CalendarIcon'
  },
  {
    id: '11',
    name: 'Recruitment Process',
    description: 'Candidate experience through the entire recruitment process',
    industry: 'HR',
    touchpoints: 9,
    stages: 5,
    preview: '/api/templates/11/preview',
    icon: 'UsersIcon'
  },
  {
    id: '12',
    name: 'Insurance Claims',
    description: 'Customer journey for insurance claims and case management',
    industry: 'Insurance',
    touchpoints: 7,
    stages: 5,
    preview: '/api/templates/12/preview',
    icon: 'ShieldIcon'
  }
]

export const TEMPLATE_INDUSTRIES = [
  'E-commerce',
  'Technology',
  'Service',
  'Restaurant',
  'Finance',
  'Healthcare',
  'B2B',
  'Education',
  'Events',
  'HR',
  'Insurance'
]

export const TEMPLATE_CATEGORIES = {
  'Business & Sales': ['E-commerce', 'B2B', 'Finance', 'Insurance'],
  'Technology & Digital': ['Technology', 'Education'],
  'Service & Experience': ['Service', 'Restaurant', 'Healthcare', 'Events', 'HR']
}

export const getCategorizedTemplates = (templates: Template[]) => {
  const categorized: { [key: string]: Template[] } = {}

  Object.entries(TEMPLATE_CATEGORIES).forEach(([category, industries]) => {
    categorized[category] = templates.filter(template =>
      industries.includes(template.industry)
    )
  })

  return categorized
}