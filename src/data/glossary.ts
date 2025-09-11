export interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: 'general' | 'journey' | 'touchpoint' | 'emotion' | 'metrics'
  examples?: string[]
  relatedTerms?: string[]
}

export const glossaryTerms: GlossaryTerm[] = [
  // General CX Terms
  {
    id: 'customer-experience',
    term: 'Customer Experience (CX)',
    definition: 'Den totala upplevelsen en kund har med ett företag genom hela kundresan, från första intryck till efter köp.',
    category: 'general',
    examples: ['Hur enkelt det är att hitta information på hemsidan', 'Kvaliteten på kundservice', 'Leveransupplevelsen'],
    relatedTerms: ['customer-journey', 'touchpoint']
  },
  {
    id: 'persona',
    term: 'Persona',
    definition: 'En fiktiv representation av din idealiska kund baserad på verklig data och forskning om befintliga kunder.',
    category: 'general',
    examples: ['Anna, 35, upptagen förälder som handlar online', 'Erik, 28, teknikintresserad early adopter'],
    relatedTerms: ['customer-journey', 'target-audience']
  },
  {
    id: 'user-experience',
    term: 'User Experience (UX)',
    definition: 'Hur en person känner och upplever när de interagerar med en produkt, tjänst eller system.',
    category: 'general',
    relatedTerms: ['customer-experience', 'usability']
  },

  // Journey Terms
  {
    id: 'customer-journey',
    term: 'Customer Journey',
    definition: 'Den kompletta vägen en kund tar från första medvetenhet om ett behov till att bli en lojal kund och förespråkare.',
    category: 'journey',
    examples: ['Medvetenhet → Övervägande → Köp → Användning → Lojalitet'],
    relatedTerms: ['touchpoint', 'customer-experience', 'persona']
  },
  {
    id: 'customer-journey-map',
    term: 'Customer Journey Map',
    definition: 'En visuell representation av kundens upplevelse som visar alla touchpoints och känslor genom hela kundresan.',
    category: 'journey',
    relatedTerms: ['customer-journey', 'touchpoint', 'emotion-mapping']
  },
  {
    id: 'stage',
    term: 'Stage (Fas)',
    definition: 'En specifik fas i kundresan som representerar kundens mentala tillstånd och mål vid den tiden.',
    category: 'journey',
    examples: ['Medvetenhet', 'Övervägande', 'Köp', 'Användning', 'Lojalitet'],
    relatedTerms: ['customer-journey', 'touchpoint']
  },

  // Touchpoint Terms  
  {
    id: 'touchpoint',
    term: 'Touchpoint',
    definition: 'Varje punkt där en kund kommer i kontakt med ditt varumärke, produkt eller tjänst.',
    category: 'touchpoint',
    examples: ['Hemsida', 'Sociala medier', 'Kundservice', 'Fysisk butik', 'Email', 'Mobilapp'],
    relatedTerms: ['customer-journey', 'channel', 'interaction']
  },
  {
    id: 'channel',
    term: 'Channel (Kanal)',
    definition: 'Det medium eller den plattform genom vilken en touchpoint äger rum.',
    category: 'touchpoint',
    examples: ['Online', 'Offline', 'Telefon', 'Email', 'Social Media'],
    relatedTerms: ['touchpoint', 'omnichannel']
  },
  {
    id: 'omnichannel',
    term: 'Omnichannel',
    definition: 'En integrerad approach där alla kanaler arbetar tillsammans för att skapa en smidig kundupplevelse.',
    category: 'touchpoint',
    relatedTerms: ['channel', 'touchpoint', 'customer-experience']
  },

  // Emotion Terms
  {
    id: 'emotion-mapping',
    term: 'Emotion Mapping',
    definition: 'Processen att identifiera och kartlägga kundens känslor vid varje touchpoint i kundresan.',
    category: 'emotion',
    examples: ['Frustration vid komplicerad checkout', 'Glädje vid snabb leverans', 'Förvåning vid oväntat bra service'],
    relatedTerms: ['touchpoint', 'customer-journey', 'pain-point']
  },
  {
    id: 'pain-point',
    term: 'Pain Point',
    definition: 'Ett problem eller frustration som kunder upplever vid en specifik touchpoint som negativt påverkar deras upplevelse.',
    category: 'emotion',
    examples: ['Lång väntetid i telefon', 'Komplicerad returprocess', 'Otydlig prisinformation'],
    relatedTerms: ['touchpoint', 'emotion-mapping', 'opportunity']
  },
  {
    id: 'opportunity',
    term: 'Opportunity (Möjlighet)',
    definition: 'En punkt i kundresan där det finns potential att förbättra kundupplevelsen eller skapa mervärde.',
    category: 'emotion',
    examples: ['Personaliserade rekommendationer', 'Proaktiv kundservice', 'Överraska med extra service'],
    relatedTerms: ['pain-point', 'touchpoint', 'delight']
  },
  {
    id: 'moment-of-truth',
    term: 'Moment of Truth',
    definition: 'Kritiska ögonblick i kundresan som starkt påverkar kundens totala uppfattning om företaget.',
    category: 'emotion',
    examples: ['Första intryck av hemsidan', 'Hantering av klagomål', 'Produktens kvalitet vid första användning'],
    relatedTerms: ['touchpoint', 'customer-experience', 'pain-point']
  },

  // Metrics Terms
  {
    id: 'nps',
    term: 'Net Promoter Score (NPS)',
    definition: 'Ett mått som mäter kunders benägenhet att rekommendera företaget till andra på en skala från 0-10.',
    category: 'metrics',
    examples: ['Promoters: 9-10', 'Passives: 7-8', 'Detractors: 0-6'],
    relatedTerms: ['customer-satisfaction', 'loyalty']
  },
  {
    id: 'customer-satisfaction',
    term: 'Customer Satisfaction (CSAT)',
    definition: 'Ett mått på hur nöjda kunder är med en specifik produkt, tjänst eller interaktion.',
    category: 'metrics',
    examples: ['Enkätfrågor efter support-samtal', 'Produktbetyg', 'Tjänsteutvärderingar'],
    relatedTerms: ['nps', 'customer-experience']
  },
  {
    id: 'customer-effort-score',
    term: 'Customer Effort Score (CES)',
    definition: 'Mäter hur lätt eller svårt det var för kunden att få sin uppgift löst eller sitt behov tillgodosett.',
    category: 'metrics',
    examples: ['Hur lätt var det att hitta informationen du sökte?', 'Hur enkelt var det att genomföra köpet?'],
    relatedTerms: ['customer-satisfaction', 'usability']
  },
  {
    id: 'retention',
    term: 'Customer Retention',
    definition: 'Företagets förmåga att behålla befintliga kunder över tid.',
    category: 'metrics',
    examples: ['Återkommande köp', 'Förnyade abonnemang', 'Långsiktiga kundrelationer'],
    relatedTerms: ['loyalty', 'churn-rate', 'lifetime-value']
  },
  {
    id: 'churn-rate',
    term: 'Churn Rate',
    definition: 'Procentandelen kunder som slutar använda företagets produkter eller tjänster under en viss tidsperiod.',
    category: 'metrics',
    examples: ['Månadsvis churn', 'Årlig churn', 'Segmenterad churn-analys'],
    relatedTerms: ['retention', 'customer-lifetime-value']
  },

  // Additional Journey Terms
  {
    id: 'awareness',
    term: 'Awareness (Medvetenhet)',
    definition: 'Den första fasen i kundresan där potentiella kunder blir medvetna om ett behov eller problem de har.',
    category: 'journey',
    examples: ['Upptäcker problem genom online-sökning', 'Rekommendation från vän', 'Ser reklam'],
    relatedTerms: ['customer-journey', 'stage', 'consideration']
  },
  {
    id: 'consideration',
    term: 'Consideration (Övervägande)',
    definition: 'Fasen där kunder aktivt utvärderar olika alternativ för att lösa sitt behov.',
    category: 'journey',
    examples: ['Jämför produkter', 'Läser recensioner', 'Begär offerter'],
    relatedTerms: ['awareness', 'purchase', 'evaluation']
  },
  {
    id: 'purchase',
    term: 'Purchase (Köp)',
    definition: 'Beslutsmomentet och den faktiska transaktionen när kunden väljer en lösning.',
    category: 'journey',
    examples: ['Online-checkout', 'Butikstransaktion', 'Avtalstecknande'],
    relatedTerms: ['consideration', 'onboarding', 'conversion']
  },
  {
    id: 'onboarding',
    term: 'Onboarding',
    definition: 'Processen att introducera och vägleda nya kunder så de snabbt kan få värde från produkten eller tjänsten.',
    category: 'journey',
    examples: ['Välkomstmail-sekvens', 'Produktdemonstration', 'Setup-guide'],
    relatedTerms: ['purchase', 'first-impression', 'time-to-value']
  },
  {
    id: 'advocacy',
    term: 'Advocacy (Förespråkande)',
    definition: 'När nöjda kunder aktivt rekommenderar och marknadsför företaget till andra.',
    category: 'journey',
    examples: ['Kundrecensioner', 'Referral-program', 'Word-of-mouth marknadsföring'],
    relatedTerms: ['loyalty', 'nps', 'retention']
  },

  // Additional General Terms
  {
    id: 'empathy-map',
    term: 'Empathy Map',
    definition: 'Ett verktyg som visualiserar vad kunden ser, hör, tänker, känner, säger och gör för att bygga förståelse.',
    category: 'general',
    examples: ['Kundinsikter från intervjuer', 'Observationer från användartester', 'Feedback-analys'],
    relatedTerms: ['persona', 'customer-research', 'user-experience']
  },
  {
    id: 'voice-of-customer',
    term: 'Voice of Customer (VOC)',
    definition: 'Processen att samla in, analysera och agera på kundfeedback för att förbättra produkter och tjänster.',
    category: 'general',
    examples: ['Kundenkäter', 'Intervjuer', 'Support-samtal analys', 'Social media monitoring'],
    relatedTerms: ['customer-feedback', 'customer-research', 'customer-satisfaction']
  },
  {
    id: 'service-design',
    term: 'Service Design',
    definition: 'En holistisk approach för att designa tjänster som är användbara, användarvänliga och önskvärda för kunder.',
    category: 'general',
    examples: ['Tjänsteblueprints', 'Prototyping av tjänster', 'Stakeholder mapping'],
    relatedTerms: ['customer-experience', 'touchpoint', 'service-blueprint']
  },
  {
    id: 'service-blueprint',
    term: 'Service Blueprint',
    definition: 'En detaljerad karta som visar tjänsteprocessen, inklusive kundens resa och alla bakomliggande processer.',
    category: 'general',
    relatedTerms: ['service-design', 'customer-journey-map', 'process-mapping']
  },

  // Additional Touchpoint Terms
  {
    id: 'digital-touchpoint',
    term: 'Digital Touchpoint',
    definition: 'Alla digitala kontaktpunkter där kunder interagerar med varumärket online.',
    category: 'touchpoint',
    examples: ['Webbplats', 'Mobilapp', 'E-post', 'Sociala medier', 'Chatbot'],
    relatedTerms: ['touchpoint', 'omnichannel', 'digital-experience']
  },
  {
    id: 'physical-touchpoint',
    term: 'Physical Touchpoint',
    definition: 'Fysiska kontaktpunkter där kunder har direktkontakt med företaget eller produkten.',
    category: 'touchpoint',
    examples: ['Butik', 'Kontor', 'Produktförpackning', 'Visitkort', 'Skyltar'],
    relatedTerms: ['touchpoint', 'in-store-experience', 'brand-experience']
  },
  {
    id: 'micro-interaction',
    term: 'Micro-interaction',
    definition: 'Små, funktionella interaktioner som förbättrar användarupplevelsen genom feedback och guidning.',
    category: 'touchpoint',
    examples: ['Hover-effekter', 'Laddningsindikatorer', 'Formulärvalidering', 'Animationer'],
    relatedTerms: ['user-experience', 'touchpoint', 'interaction-design']
  },

  // Additional Emotion Terms
  {
    id: 'delight',
    term: 'Delight (Förtjusning)',
    definition: 'När kundupplevelsen överträffar förväntningarna och skapar positiva överraskningar.',
    category: 'emotion',
    examples: ['Oväntat snabb leverans', 'Personligt handskrivet tack-kort', 'Gratis uppgradering'],
    relatedTerms: ['customer-satisfaction', 'wow-factor', 'surprise']
  },
  {
    id: 'friction',
    term: 'Friction (Friktion)',
    definition: 'Hinder eller svårigheter i kundupplevelsen som gör det svårt för kunder att uppnå sina mål.',
    category: 'emotion',
    examples: ['Komplicerade formulär', 'Långsam laddningstid', 'Otydlig navigation'],
    relatedTerms: ['pain-point', 'usability', 'customer-effort-score']
  },
  {
    id: 'wow-factor',
    term: 'Wow Factor',
    definition: 'Ett element i kundupplevelsen som skapar stark positiv reaktion och minnesvärd upplevelse.',
    category: 'emotion',
    examples: ['Exceptionell service', 'Innovativ produktfunktion', 'Personlig överraskning'],
    relatedTerms: ['delight', 'memorable-experience', 'differentiation']
  },
  {
    id: 'trust',
    term: 'Trust (Förtroende)',
    definition: 'Kundens tro på företagets pålitlighet, integritet och förmåga att leverera på löften.',
    category: 'emotion',
    examples: ['Säkra betalningar', 'Transparent kommunikation', 'Konsekvent leverans'],
    relatedTerms: ['credibility', 'loyalty', 'brand-trust']
  },

  // Additional Metrics Terms
  {
    id: 'customer-lifetime-value',
    term: 'Customer Lifetime Value (CLV)',
    definition: 'Det totala värdet en kund genererar för företaget under hela sin kundrelation.',
    category: 'metrics',
    examples: ['Genomsnittlig månadsinkomst × kundlivslängd', 'Total inkomst - total kostnad per kund'],
    relatedTerms: ['retention', 'loyalty', 'profitability']
  },
  {
    id: 'conversion-rate',
    term: 'Conversion Rate',
    definition: 'Procentandelen besökare eller leads som genomför en önskad handling.',
    category: 'metrics',
    examples: ['Webbsidebesökare som köper', 'E-postmottagare som klickar', 'Testanvändare som betalar'],
    relatedTerms: ['funnel', 'optimization', 'performance']
  },
  {
    id: 'time-to-value',
    term: 'Time to Value (TTV)',
    definition: 'Tiden det tar för en kund att få sitt första meningsfulla värde från produkten eller tjänsten.',
    category: 'metrics',
    examples: ['Tid till första lyckade användning', 'Setup till första resultat', 'Registrering till aktivering'],
    relatedTerms: ['onboarding', 'activation', 'customer-success']
  },
  {
    id: 'activation-rate',
    term: 'Activation Rate',
    definition: 'Procentandelen nya användare som når en fördefinierad milstolpe som indikerar framgångsrik adoption.',
    category: 'metrics',
    examples: ['Användare som slutför onboarding', 'Första transaktion', 'Profilens komplettering'],
    relatedTerms: ['onboarding', 'time-to-value', 'user-engagement']
  },
  {
    id: 'customer-health-score',
    term: 'Customer Health Score',
    definition: 'En sammansatt poäng som indikerar sannolikheten att en kund kommer att förbli lojal eller churna.',
    category: 'metrics',
    examples: ['Produktanvändning + support-tickets + betalningshistorik', 'Engagemang + tillfredsställelse'],
    relatedTerms: ['churn-rate', 'retention', 'customer-success']
  }
]