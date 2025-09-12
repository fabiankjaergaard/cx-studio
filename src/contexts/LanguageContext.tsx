'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'sv' | 'en'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string, variables?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
    sv: {
        // Navigation
        'nav.dashboard': 'Dashboard',
        'nav.journeyMaps': 'Journey Maps',
        'nav.templates': 'Mallar',
        'nav.analytics': 'Analytics',
        'nav.personas': 'Personas',
        'nav.insights': 'Insights',
        'nav.glossary': 'Glossary',
        'nav.settings': 'Inställningar',
        'nav.help': 'Hjälp & Rundtur',
        'nav.logout': 'Logga ut',
        'nav.login': 'Logga in',

        // Dashboard
        'dashboard.title': 'Dashboard',
        'dashboard.subtitle': 'Översikt av dina customer experience projekt',
        'dashboard.activeJourneyMaps': 'AKTIVA JOURNEY MAPS',
        'dashboard.customerTouchpoints': 'CUSTOMER TOUCHPOINTS',
        'dashboard.personas': 'PERSONAS',
        'dashboard.templates': 'TEMPLATES',
        'dashboard.total': 'totalt',
        'dashboard.available': 'tillgängliga',
        'dashboard.recentJourneyMaps': 'Senaste Journey Maps',
        'dashboard.quickStart': 'Snabbstart',
        'dashboard.recentActivity': 'Senaste Aktivitet',
        'dashboard.createJourneyMap': 'Skapa ny Journey Map',
        'dashboard.useEmail': 'Använd en mall',
        'dashboard.addPersonas': 'Lägg till personas',
        'dashboard.noJourneyMaps': 'Inga journey maps än',
        'dashboard.createFirstJourney': 'Skapa din första för att komma igång',
        'dashboard.noActivity': 'Ingen aktivitet än',
        'dashboard.journeyCreated': 'Journey "{{title}}" skapades',
        'dashboard.today': 'Idag',
        'dashboard.dayAgo': '1 dag sedan',
        'dashboard.daysAgo': '{{days}} dagar sedan',
        'dashboard.empty': 'Tom',
        'dashboard.active': 'Aktiv',
        'dashboard.touchpoints': 'touchpoints',
        'dashboard.noTouchpoints': 'Inga touchpoints än',
        'dashboard.distributedOver': 'Fördelat över {{count}} journeys',
        'dashboard.addPersonasDesc': 'Lägg till personas',
        'dashboard.uniquePersonas': '{{count}} unika personas',
        'dashboard.availableTemplates': 'Tillgängliga mallar',

        // Settings
        'settings.title': 'Inställningar',
        'settings.language': 'Språk',
        'settings.languageDescription': 'Välj ditt föredragna språk för applikationen',
        'settings.swedish': 'Svenska',
        'settings.english': 'Engelska',
        'settings.save': 'Spara',
        'settings.saved': 'Inställningar sparade!',

        // Onboarding
        'onboarding.welcome': 'Välkommen till Nava',
        'onboarding.subtitle': 'Din plattform för Customer Experience Excellence',
        'onboarding.introVideo': 'Introduktionsvideo',
        'onboarding.description': 'Lär dig hur du använder Nava för att skapa exceptionella kundupplevelser',
        'onboarding.startTour': 'Starta guidad rundtur',
        'onboarding.skipTour': 'Hoppa över rundturen',

        // Tour
        'tour.dashboard': 'Dashboard',
        'tour.dashboardDesc': 'Här får du en snabb översikt över din Customer Experience data och viktiga insights.',
        'tour.journeyMaps': 'Journey Maps',
        'tour.journeyMapsDesc': 'Skapa och hantera dina customer journey maps för att förstå hela kundupplevelsen.',
        'tour.templates': 'Mallar',
        'tour.templatesDesc': 'Använd färdiga mallar för att snabbt komma igång med dina CX-projekt.',
        'tour.analytics': 'Analytics',
        'tour.analyticsDesc': 'Analysera dina CX-data och få värdefulla insikter om kundupplevelsen.',
        'tour.personas': 'Personas',
        'tour.personasDesc': 'Definiera och hantera dina kundpersonas för bättre målgruppsförståelse.',
        'tour.insights': 'Insights',
        'tour.insightsDesc': 'Samla in kundinsikter genom enkäter, intervjuer och andra metoder.',
        'tour.glossary': 'Glossary',
        'tour.glossaryDesc': 'En ordlista med viktiga begrepp och definitioner inom Customer Experience.',
        'tour.settings': 'Inställningar',
        'tour.settingsDesc': 'Anpassa dina kontoinställningar och preferenser här.',
        'tour.next': 'Nästa',
        'tour.previous': 'Föregående',
        'tour.step': 'Steg {{current}} av {{total}}',

        // Common
        'common.loading': 'Laddar...',
        'common.loggedIn': 'Inloggad',
        'common.redirecting': 'Omdirigerar till inloggning...',
        'common.startNewJourneyMap': 'Starta ny Journey Map',
        'common.search': 'Sök...',
        'common.save': 'Spara',
        'common.cancel': 'Avbryt',
        'common.delete': 'Ta bort',
        'common.edit': 'Redigera',
        'common.add': 'Lägg till',
        'common.create': 'Skapa',
        'common.back': 'Tillbaka',
        'common.next': 'Nästa',
        'common.previous': 'Föregående',
        'common.close': 'Stäng',

        // Journey Store/Data
        'journey.stages.awareness': 'Medvetenhet',
        'journey.stages.awarenessDesc': 'Kunden blir medveten om behov',
        'journey.stages.consideration': 'Övervägande', 
        'journey.stages.considerationDesc': 'Kunden utvärderar alternativ',
        'journey.stages.purchase': 'Köp',
        'journey.stages.purchaseDesc': 'Kunden fattar köpbeslut',
        'journey.stages.usage': 'Användning',
        'journey.stages.usageDesc': 'Kunden använder produkten/tjänsten',
        'journey.stages.loyalty': 'Lojalitet',
        'journey.stages.loyaltyDesc': 'Kunden blir lojal och rekommenderar',
        
        'journey.touchpoints.googleSearch': 'Söker på Google',
        'journey.touchpoints.googleSearchDesc': 'Kunden söker efter lösningar online',
        'journey.touchpoints.visitWebsite': 'Besöker hemsida',
        'journey.touchpoints.visitWebsiteDesc': 'Kunden utforskar företagets hemsida',
        'journey.touchpoints.readReviews': 'Läser recensioner',
        'journey.touchpoints.readReviewsDesc': 'Kunden läser andra kunders erfarenheter',
        'journey.touchpoints.contactSupport': 'Kontaktar support',
        'journey.touchpoints.contactSupportDesc': 'Kunden ställer frågor till kundservice',
        'journey.touchpoints.makePurchase': 'Gör köp',
        'journey.touchpoints.makePurchaseDesc': 'Kunden genomför köpet',
        'journey.touchpoints.receiveProduct': 'Tar emot produkt',
        'journey.touchpoints.receiveProductDesc': 'Kunden får leveransen',
        'journey.touchpoints.firstUse': 'Första användning',
        'journey.touchpoints.firstUseDesc': 'Kunden använder produkten första gången',
        'journey.touchpoints.needsSupport': 'Behöver support',
        'journey.touchpoints.needsSupportDesc': 'Kunden får problem och behöver hjälp',
        'journey.touchpoints.leaveReview': 'Lämnar recension',
        'journey.touchpoints.leaveReviewDesc': 'Kunden delar sin upplevelse',
        'journey.touchpoints.recommendToFriends': 'Rekommenderar till vänner',
        'journey.touchpoints.recommendToFriendsDesc': 'Kunden sprider positiva ord',

        'journey.newJourneyTitle': 'Ny Customer Journey',
        'journey.newJourneyDesc': 'En tom journey redo att fyllas med dina egna touchpoints',
        'journey.blankJourneyTitle': 'Ny Customer Journey',
        'journey.blankJourneyDesc': 'En tom journey redo att fyllas med dina egna touchpoints',

        // Glossary
        'glossary.title': 'Glossary',
        'glossary.subtitle': 'Ordlista för Customer Experience begrepp',
        'glossary.searchPlaceholder': 'Sök efter begrepp...',
        'glossary.searchLabel': 'Sök efter begrepp',
        'glossary.categoryLabel': 'Kategori',
        'glossary.allCategories': 'Alla kategorier',
        'glossary.categoryGeneral': 'Allmänt',
        'glossary.categoryJourney': 'Journey',
        'glossary.categoryTouchpoint': 'Touchpoints',
        'glossary.categoryEmotion': 'Känslor',
        'glossary.categoryMetrics': 'Mätvärden',
        'glossary.relatedTerms': 'Relaterade begrepp',
        'glossary.relatedTermsLabel': 'Relaterade begrepp',
        'glossary.examples': 'Exempel',
        'glossary.examplesLabel': 'Exempel',
        'glossary.resultsShowing': 'Visar {{filtered}} av {{total}} begrepp',
        'glossary.noTermsFound': 'Inga begrepp hittades',
        'glossary.noTermsFoundDesc': 'Försök med andra sökord eller rensa filtren',
        'glossary.clearFilters': 'Rensa filter',

        // Templates
        'templates.title': 'Mallar',
        'templates.subtitle': 'Färdiga mallar för att snabbt komma igång med dina CX-projekt',
        'templates.useTemplate': 'Använd mall',
        'templates.preview': 'Förhandsgranska',

        // Personas
        'personas.title': 'Personas',
        'personas.subtitle': 'Definiera och hantera dina kundpersonas',
        'personas.createPersona': 'Skapa ny persona',
        'personas.guide': 'Guide för att skapa personas',

        // Analytics
        'analytics.title': 'Analytics',
        'analytics.subtitle': 'Analysera dina CX-data och få värdefulla insikter',

        // Insights
        'insights.title': 'Kundinsikter',
        'insights.subtitle': 'Samla in och analysera kunddata för bättre customer experience',
        'insights.gettingStarted': 'Kom igång',
        'insights.surveys': 'Enkäter',
        'insights.interviews': 'Intervjuer',
        'insights.focusGroups': 'Fokusgrupper',
        'insights.observation': 'Observation',
        'insights.newProject': 'Nytt projekt',
        'insights.whyCollectInsights': 'Varför samla in kundinsikter?',
        'insights.whyCollectDescription': 'Kundinsikter hjälper dig att förstå vad kunder verkligen tycker, känner och behöver. Genom att kombinera kvantitativa mätningar med kvalitativa fördjupningar får du en komplett bild som driver data-baserade förbättringar av kundupplevelsen.',
        'insights.identifyPainPoints': 'Identifiera pain points',
        'insights.measureProgress': 'Mät framsteg',
        'insights.validateChanges': 'Validera förändringar',
        'insights.understandNeeds': 'Förstå behov',
        'insights.quantitativeMethods': 'Kvantitativa metoder',
        'insights.quantitativeDescription': 'Mätbara data och siffror',
        'insights.qualitativeMethods': 'Kvalitativa metoder',
        'insights.qualitativeDescription': 'Fördjupade insikter och förståelse',
        'insights.toolsTemplates': 'Verktyg & Mallar',
        'insights.toolsDescription': 'Praktiska hjälpmedel för datainsamling',
        'insights.getStarted': 'Kom igång',
        'insights.learnMore': 'Lär dig mer',
        'insights.newToInsights': 'Ny inom kundinsikter?',
        'insights.newToInsightsDescription': 'Börja med våra guider för att lära dig när du ska använda vilka metoder och hur du får mest värde ur din datainsamling.',
        'insights.gettingStartedGuide': 'Kom igång-guide',
        'insights.bestPractices': 'Best practices',

        // NPS Methods
        'insights.nps.title': 'NPS-enkäter',
        'insights.nps.description': 'Mät kundlojalitet med Net Promoter Score',
        'insights.nps.feature1': '0-10 skala',
        'insights.nps.feature2': 'Automatisk segmentering',
        'insights.nps.feature3': 'Trendanalys',
        'insights.nps.feature4': 'Benchmarking',

        // CSAT Methods
        'insights.csat.title': 'CSAT-enkäter',
        'insights.csat.description': 'Mät kundnöjdhet för specifika touchpoints',
        'insights.csat.feature1': 'Touchpoint-koppling',
        'insights.csat.feature2': 'Realtidsdata',
        'insights.csat.feature3': 'Jämförelser',
        'insights.csat.feature4': 'Målsättningar',

        // CES Methods
        'insights.ces.title': 'CES-enkäter',
        'insights.ces.description': 'Mät kundansträngning och identifiera friktion',
        'insights.ces.feature1': 'Enkelhetsindex',
        'insights.ces.feature2': 'Pain point-identifiering',
        'insights.ces.feature3': 'Process-optimering',
        'insights.ces.feature4': 'ROI-beräkning',

        // Qualitative Methods
        'insights.interviews.title': 'Kundintervjuer',
        'insights.interviews.description': 'Djupgående förståelse genom personliga samtal',
        'insights.interviews.feature1': 'Intervjuguider',
        'insights.interviews.feature2': 'Frågemallar',
        'insights.interviews.feature3': 'Inspelningsverktyg',
        'insights.interviews.feature4': 'Analys-templates',

        'insights.focusGroups.title': 'Fokusgrupper',
        'insights.focusGroups.description': 'Samla gruppinsikter och dynamiska diskussioner',
        'insights.focusGroups.feature1': 'Deltagarrekrytering',
        'insights.focusGroups.feature2': 'Diskussionsguider',
        'insights.focusGroups.feature3': 'Modereringstips',
        'insights.focusGroups.feature4': 'Gruppanalys',

        'insights.observation.title': 'Användarobservation',
        'insights.observation.description': 'Se hur kunder verkligen beter sig',
        'insights.observation.feature1': 'Observation-protokoll',
        'insights.observation.feature2': 'Beteendeanalys',
        'insights.observation.feature3': 'Journey shadowing',
        'insights.observation.feature4': 'Etnografi',

        // Tools
        'insights.surveyBuilder.title': 'Survey Builder',
        'insights.surveyBuilder.description': 'Skapa professionella enkäter med mallar',
        'insights.surveyBuilder.action': 'Skapa enkät',

        'insights.researchPlanner.title': 'Research Planner',
        'insights.researchPlanner.description': 'Planera och organisera dina kundinsikts-projekt',
        'insights.researchPlanner.action': 'Planera projekt',

        'insights.dataDashboard.title': 'Data Dashboard',
        'insights.dataDashboard.description': 'Visualisera och analysera insamlad data',
        'insights.dataDashboard.action': 'Visa dashboard',

        'insights.insightsLibrary.title': 'Insights Library',
        'insights.insightsLibrary.description': 'Samla och organisera alla kundinsikter',
        'insights.insightsLibrary.action': 'Öppna bibliotek',

        // Journey Maps
        'journeyMaps.title': 'Journey Maps',
        'journeyMaps.subtitle': 'Skapa och hantera customer journey maps för att visualisera kundupplevelsen',
        'journeyMaps.createNew': 'Ny Journey Map',
        'journeyMaps.viewAll': 'Visa alla',
        'journeyMaps.sampleData.ecommerce.name': 'E-handelskund Journey',
        'journeyMaps.sampleData.ecommerce.description': 'Kundresan för online-shopping från upptäckt till återköp',
        'journeyMaps.sampleData.b2b.name': 'B2B Försäljningsprocess',
        'journeyMaps.sampleData.b2b.description': 'Kundresan för företagskunder genom försäljningscykeln',
        'journeyMaps.sampleData.support.name': 'Kundservice Journey',
        'journeyMaps.sampleData.support.description': 'Supportärende från rapportering till lösning',
        'journeyMaps.status.draft': 'Utkast',
        'journeyMaps.status.completed': 'Slutförd',
        'journeyMaps.status.inReview': 'Under granskning',
        'journeyMaps.actions.duplicate': 'Duplicera',
        'journeyMaps.actions.delete': 'Ta bort',
        'journeyMaps.actions.edit': 'Redigera',
        'journeyMaps.lastModified': 'Senast ändrad',
        'journeyMaps.stages': 'steg',
        'journeyMaps.createdBy': 'Av',
        'journeyMaps.currentUser': 'Nuvarande användare',
        'journeyMaps.copy': 'Kopia',
        'journeyMaps.createNewCard.title': 'Skapa ny Journey Map',
        'journeyMaps.createNewCard.description': 'Visualisera kundresan från första kontakt till mål',
        'journeyMaps.gettingStarted.title': 'Kom igång med Journey Maps',
        'journeyMaps.gettingStarted.description': 'Journey Maps hjälper dig att visualisera och förstå hela kundupplevelsen från första kontakt till slutmål. Identifiera pain points, möjligheter och förbättringsområden.',
        'journeyMaps.gettingStarted.createFirst': 'Skapa din första Journey Map',
        'journeyMaps.modal.createTitle': 'Skapa ny Journey Map',
        'journeyMaps.modal.nameLabel': 'Namn på Journey Map',
        'journeyMaps.modal.namePlaceholder': 'E-handelskund Journey',
        'journeyMaps.modal.descriptionLabel': 'Beskrivning (valfri)',
        'journeyMaps.modal.descriptionPlaceholder': 'Beskriv vad denna journey map kommer att fokusera på...',
        'journeyMaps.modal.create': 'Skapa Journey Map',

        // Glossary Terms - Customer Experience (CX)
        'glossary.term.customer-experience': 'Customer Experience (CX)',
        'glossary.definition.customer-experience': 'Den totala upplevelsen en kund har med ett företag genom hela kundresan, från första intryck till efter köp.',
        'glossary.example.customer-experience.1': 'Hur enkelt det är att hitta information på hemsidan',
        'glossary.example.customer-experience.2': 'Kvaliteten på kundservice',
        'glossary.example.customer-experience.3': 'Leveransupplevelsen',

        // Glossary Terms - Persona
        'glossary.term.persona': 'Persona',
        'glossary.definition.persona': 'En fiktiv representation av din idealiska kund baserad på verklig data och forskning om befintliga kunder.',
        'glossary.example.persona.1': 'Anna, 35, upptagen förälder som handlar online',
        'glossary.example.persona.2': 'Erik, 28, teknikintresserad early adopter',

        // Glossary Terms - User Experience (UX)
        'glossary.term.user-experience': 'User Experience (UX)',
        'glossary.definition.user-experience': 'Hur en person känner och upplever när de interagerar med en produkt, tjänst eller system.',

        // Glossary Terms - Customer Journey
        'glossary.term.customer-journey': 'Customer Journey',
        'glossary.definition.customer-journey': 'Den kompletta vägen en kund tar från första medvetenhet om ett behov till att bli en lojal kund och förespråkare.',
        'glossary.example.customer-journey.1': 'Medvetenhet → Övervägande → Köp → Användning → Lojalitet',

        // Glossary Terms - Customer Journey Map
        'glossary.term.customer-journey-map': 'Customer Journey Map',
        'glossary.definition.customer-journey-map': 'En visuell representation av kundens upplevelse som visar alla touchpoints och känslor genom hela kundresan.',

        // Glossary Terms - Stage
        'glossary.term.stage': 'Stage (Fas)',
        'glossary.definition.stage': 'En specifik fas i kundresan som representerar kundens mentala tillstånd och mål vid den tiden.',
        'glossary.example.stage.1': 'Medvetenhet',
        'glossary.example.stage.2': 'Övervägande',
        'glossary.example.stage.3': 'Köp',
        'glossary.example.stage.4': 'Användning',
        'glossary.example.stage.5': 'Lojalitet',

        // Glossary Terms - Touchpoint
        'glossary.term.touchpoint': 'Touchpoint',
        'glossary.definition.touchpoint': 'Varje punkt där en kund kommer i kontakt med ditt varumärke, produkt eller tjänst.',
        'glossary.example.touchpoint.1': 'Hemsida',
        'glossary.example.touchpoint.2': 'Sociala medier',
        'glossary.example.touchpoint.3': 'Kundservice',
        'glossary.example.touchpoint.4': 'Fysisk butik',
        'glossary.example.touchpoint.5': 'Email',
        'glossary.example.touchpoint.6': 'Mobilapp',

        // Glossary Terms - Channel
        'glossary.term.channel': 'Channel (Kanal)',
        'glossary.definition.channel': 'Det medium eller den plattform genom vilken en touchpoint äger rum.',
        'glossary.example.channel.1': 'Online',
        'glossary.example.channel.2': 'Offline',
        'glossary.example.channel.3': 'Telefon',
        'glossary.example.channel.4': 'Email',
        'glossary.example.channel.5': 'Social Media',

        // Glossary Terms - Omnichannel
        'glossary.term.omnichannel': 'Omnichannel',
        'glossary.definition.omnichannel': 'En integrerad approach där alla kanaler arbetar tillsammans för att skapa en smidig kundupplevelse.',

        // Glossary Terms - Emotion Mapping
        'glossary.term.emotion-mapping': 'Emotion Mapping',
        'glossary.definition.emotion-mapping': 'Processen att identifiera och kartlägga kundens känslor vid varje touchpoint i kundresan.',
        'glossary.example.emotion-mapping.1': 'Frustration vid komplicerad checkout',
        'glossary.example.emotion-mapping.2': 'Glädje vid snabb leverans',
        'glossary.example.emotion-mapping.3': 'Förvåning vid oväntat bra service',

        // Glossary Terms - Pain Point
        'glossary.term.pain-point': 'Pain Point',
        'glossary.definition.pain-point': 'Ett problem eller frustration som kunder upplever vid en specifik touchpoint som negativt påverkar deras upplevelse.',
        'glossary.example.pain-point.1': 'Lång väntetid i telefon',
        'glossary.example.pain-point.2': 'Komplicerad returprocess',
        'glossary.example.pain-point.3': 'Otydlig prisinformation',

        // Glossary Terms - Opportunity
        'glossary.term.opportunity': 'Opportunity (Möjlighet)',
        'glossary.definition.opportunity': 'En punkt i kundresan där det finns potential att förbättra kundupplevelsen eller skapa mervärde.',
        'glossary.example.opportunity.1': 'Personaliserade rekommendationer',
        'glossary.example.opportunity.2': 'Proaktiv kundservice',
        'glossary.example.opportunity.3': 'Överraska med extra service',

        // Glossary Terms - Moment of Truth
        'glossary.term.moment-of-truth': 'Moment of Truth',
        'glossary.definition.moment-of-truth': 'Kritiska ögonblick i kundresan som starkt påverkar kundens totala uppfattning om företaget.',
        'glossary.example.moment-of-truth.1': 'Första intryck av hemsidan',
        'glossary.example.moment-of-truth.2': 'Hantering av klagomål',
        'glossary.example.moment-of-truth.3': 'Produktens kvalitet vid första användning',

        // Glossary Terms - Net Promoter Score (NPS)
        'glossary.term.nps': 'Net Promoter Score (NPS)',
        'glossary.definition.nps': 'Ett mått som mäter kunders benägenhet att rekommendera företaget till andra på en skala från 0-10.',
        'glossary.example.nps.1': 'Promoters: 9-10',
        'glossary.example.nps.2': 'Passives: 7-8',
        'glossary.example.nps.3': 'Detractors: 0-6',

        // Glossary Terms - Customer Satisfaction (CSAT)
        'glossary.term.customer-satisfaction': 'Customer Satisfaction (CSAT)',
        'glossary.definition.customer-satisfaction': 'Ett mått på hur nöjda kunder är med en specifik produkt, tjänst eller interaktion.',
        'glossary.example.customer-satisfaction.1': 'Enkätfrågor efter support-samtal',
        'glossary.example.customer-satisfaction.2': 'Produktbetyg',
        'glossary.example.customer-satisfaction.3': 'Tjänsteutvärderingar',

        // Glossary Terms - Customer Effort Score (CES)
        'glossary.term.customer-effort-score': 'Customer Effort Score (CES)',
        'glossary.definition.customer-effort-score': 'Mäter hur lätt eller svårt det var för kunden att få sin uppgift löst eller sitt behov tillgodosett.',
        'glossary.example.customer-effort-score.1': 'Hur lätt var det att hitta informationen du sökte?',
        'glossary.example.customer-effort-score.2': 'Hur enkelt var det att genomföra köpet?',

        // Glossary Terms - Customer Retention
        'glossary.term.retention': 'Customer Retention',
        'glossary.definition.retention': 'Företagets förmåga att behålla befintliga kunder över tid.',
        'glossary.example.retention.1': 'Återkommande köp',
        'glossary.example.retention.2': 'Förnyade abonnemang',
        'glossary.example.retention.3': 'Långsiktiga kundrelationer',

        // Glossary Terms - Churn Rate
        'glossary.term.churn-rate': 'Churn Rate',
        'glossary.definition.churn-rate': 'Procentandelen kunder som slutar använda företagets produkter eller tjänster under en viss tidsperiod.',
        'glossary.example.churn-rate.1': 'Månadsvis churn',
        'glossary.example.churn-rate.2': 'Årlig churn',
        'glossary.example.churn-rate.3': 'Segmenterad churn-analys',

        // Glossary Terms - Awareness
        'glossary.term.awareness': 'Awareness (Medvetenhet)',
        'glossary.definition.awareness': 'Den första fasen i kundresan där potentiella kunder blir medvetna om ett behov eller problem de har.',
        'glossary.example.awareness.1': 'Upptäcker problem genom online-sökning',
        'glossary.example.awareness.2': 'Rekommendation från vän',
        'glossary.example.awareness.3': 'Ser reklam',

        // Glossary Terms - Consideration
        'glossary.term.consideration': 'Consideration (Övervägande)',
        'glossary.definition.consideration': 'Fasen där kunder aktivt utvärderar olika alternativ för att lösa sitt behov.',
        'glossary.example.consideration.1': 'Jämför produkter',
        'glossary.example.consideration.2': 'Läser recensioner',
        'glossary.example.consideration.3': 'Begär offerter',

        // Glossary Terms - Purchase
        'glossary.term.purchase': 'Purchase (Köp)',
        'glossary.definition.purchase': 'Beslutsmomentet och den faktiska transaktionen när kunden väljer en lösning.',
        'glossary.example.purchase.1': 'Online-checkout',
        'glossary.example.purchase.2': 'Butikstransaktion',
        'glossary.example.purchase.3': 'Avtalstecknande',

        // Glossary Terms - Onboarding
        'glossary.term.onboarding': 'Onboarding',
        'glossary.definition.onboarding': 'Processen att introducera och vägleda nya kunder så de snabbt kan få värde från produkten eller tjänsten.',
        'glossary.example.onboarding.1': 'Välkomstmail-sekvens',
        'glossary.example.onboarding.2': 'Produktdemonstration',
        'glossary.example.onboarding.3': 'Setup-guide',

        // Glossary Terms - Advocacy
        'glossary.term.advocacy': 'Advocacy (Förespråkande)',
        'glossary.definition.advocacy': 'När nöjda kunder aktivt rekommenderar och marknadsför företaget till andra.',
        'glossary.example.advocacy.1': 'Kundrecensioner',
        'glossary.example.advocacy.2': 'Referral-program',
        'glossary.example.advocacy.3': 'Word-of-mouth marknadsföring',

        // Glossary Terms - Additional terms continue...
        'glossary.term.empathy-map': 'Empathy Map',
        'glossary.definition.empathy-map': 'Ett verktyg som visualiserar vad kunden ser, hör, tänker, känner, säger och gör för att bygga förståelse.',
        'glossary.example.empathy-map.1': 'Kundinsikter från intervjuer',
        'glossary.example.empathy-map.2': 'Observationer från användartester',
        'glossary.example.empathy-map.3': 'Feedback-analys',

        'glossary.term.voice-of-customer': 'Voice of Customer (VOC)',
        'glossary.definition.voice-of-customer': 'Processen att samla in, analysera och agera på kundfeedback för att förbättra produkter och tjänster.',
        'glossary.example.voice-of-customer.1': 'Kundenkäter',
        'glossary.example.voice-of-customer.2': 'Intervjuer',
        'glossary.example.voice-of-customer.3': 'Support-samtal analys',
        'glossary.example.voice-of-customer.4': 'Social media monitoring',

        'glossary.term.service-design': 'Service Design',
        'glossary.definition.service-design': 'En holistisk approach för att designa tjänster som är användbara, användarvänliga och önskvärda för kunder.',
        'glossary.example.service-design.1': 'Tjänsteblueprints',
        'glossary.example.service-design.2': 'Prototyping av tjänster',
        'glossary.example.service-design.3': 'Stakeholder mapping',

        'glossary.term.service-blueprint': 'Service Blueprint',
        'glossary.definition.service-blueprint': 'En detaljerad karta som visar tjänsteprocessen, inklusive kundens resa och alla bakomliggande processer.',

        'glossary.term.digital-touchpoint': 'Digital Touchpoint',
        'glossary.definition.digital-touchpoint': 'Alla digitala kontaktpunkter där kunder interagerar med varumärket online.',
        'glossary.example.digital-touchpoint.1': 'Webbplats',
        'glossary.example.digital-touchpoint.2': 'Mobilapp',
        'glossary.example.digital-touchpoint.3': 'E-post',
        'glossary.example.digital-touchpoint.4': 'Sociala medier',
        'glossary.example.digital-touchpoint.5': 'Chatbot',

        'glossary.term.physical-touchpoint': 'Physical Touchpoint',
        'glossary.definition.physical-touchpoint': 'Fysiska kontaktpunkter där kunder har direktkontakt med företaget eller produkten.',
        'glossary.example.physical-touchpoint.1': 'Butik',
        'glossary.example.physical-touchpoint.2': 'Kontor',
        'glossary.example.physical-touchpoint.3': 'Produktförpackning',
        'glossary.example.physical-touchpoint.4': 'Visitkort',
        'glossary.example.physical-touchpoint.5': 'Skyltar',

        'glossary.term.micro-interaction': 'Micro-interaction',
        'glossary.definition.micro-interaction': 'Små, funktionella interaktioner som förbättrar användarupplevelsen genom feedback och guidning.',
        'glossary.example.micro-interaction.1': 'Hover-effekter',
        'glossary.example.micro-interaction.2': 'Laddningsindikatorer',
        'glossary.example.micro-interaction.3': 'Formulärvalidering',
        'glossary.example.micro-interaction.4': 'Animationer',

        'glossary.term.delight': 'Delight (Förtjusning)',
        'glossary.definition.delight': 'När kundupplevelsen överträffar förväntningarna och skapar positiva överraskningar.',
        'glossary.example.delight.1': 'Oväntat snabb leverans',
        'glossary.example.delight.2': 'Personligt handskrivet tack-kort',
        'glossary.example.delight.3': 'Gratis uppgradering',

        'glossary.term.friction': 'Friction (Friktion)',
        'glossary.definition.friction': 'Hinder eller svårigheter i kundupplevelsen som gör det svårt för kunder att uppnå sina mål.',
        'glossary.example.friction.1': 'Komplicerade formulär',
        'glossary.example.friction.2': 'Långsam laddningstid',
        'glossary.example.friction.3': 'Otydlig navigation',

        'glossary.term.wow-factor': 'Wow Factor',
        'glossary.definition.wow-factor': 'Ett element i kundupplevelsen som skapar stark positiv reaktion och minnesvärd upplevelse.',
        'glossary.example.wow-factor.1': 'Exceptionell service',
        'glossary.example.wow-factor.2': 'Innovativ produktfunktion',
        'glossary.example.wow-factor.3': 'Personlig överraskning',

        'glossary.term.trust': 'Trust (Förtroende)',
        'glossary.definition.trust': 'Kundens tro på företagets pålitlighet, integritet och förmåga att leverera på löften.',
        'glossary.example.trust.1': 'Säkra betalningar',
        'glossary.example.trust.2': 'Transparent kommunikation',
        'glossary.example.trust.3': 'Konsekvent leverans',

        'glossary.term.customer-lifetime-value': 'Customer Lifetime Value (CLV)',
        'glossary.definition.customer-lifetime-value': 'Det totala värdet en kund genererar för företaget under hela sin kundrelation.',
        'glossary.example.customer-lifetime-value.1': 'Genomsnittlig månadsinkomst × kundlivslängd',
        'glossary.example.customer-lifetime-value.2': 'Total inkomst - total kostnad per kund',

        'glossary.term.conversion-rate': 'Conversion Rate',
        'glossary.definition.conversion-rate': 'Procentandelen besökare eller leads som genomför en önskad handling.',
        'glossary.example.conversion-rate.1': 'Webbsidebesökare som köper',
        'glossary.example.conversion-rate.2': 'E-postmottagare som klickar',
        'glossary.example.conversion-rate.3': 'Testanvändare som betalar',

        'glossary.term.time-to-value': 'Time to Value (TTV)',
        'glossary.definition.time-to-value': 'Tiden det tar för en kund att få sitt första meningsfulla värde från produkten eller tjänsten.',
        'glossary.example.time-to-value.1': 'Tid till första lyckade användning',
        'glossary.example.time-to-value.2': 'Setup till första resultat',
        'glossary.example.time-to-value.3': 'Registrering till aktivering',

        'glossary.term.activation-rate': 'Activation Rate',
        'glossary.definition.activation-rate': 'Procentandelen nya användare som når en fördefinierad milstolpe som indikerar framgångsrik adoption.',
        'glossary.example.activation-rate.1': 'Användare som slutför onboarding',
        'glossary.example.activation-rate.2': 'Första transaktion',
        'glossary.example.activation-rate.3': 'Profilens komplettering',

        'glossary.term.customer-health-score': 'Customer Health Score',
        'glossary.definition.customer-health-score': 'En sammansatt poäng som indikerar sannolikheten att en kund kommer att förbli lojal eller churna.',
        'glossary.example.customer-health-score.1': 'Produktanvändning + support-tickets + betalningshistorik',
        'glossary.example.customer-health-score.2': 'Engagemang + tillfredsställelse',

        // Glossary Page UI Text
        'glossary.searchPlaceholder': 'Sök efter begrepp eller definitioner...',
        'glossary.searchLabel': 'Sök i lexikonet',
        'glossary.categoryLabel': 'Kategori',
        'glossary.categoryGeneral': 'Allmänt',
        'glossary.categoryJourney': 'Kundresa',
        'glossary.categoryTouchpoint': 'Touchpoints',
        'glossary.categoryEmotion': 'Känslor',
        'glossary.categoryMetrics': 'Mätningar',
        'glossary.resultsShowing': 'Visar {{filtered}} av {{total}} begrepp',
        'glossary.examplesLabel': 'Exempel:',
        'glossary.relatedTermsLabel': 'Relaterade begrepp:',
        'glossary.noTermsFound': 'Inga begrepp hittades',
        'glossary.noTermsFoundDesc': 'Prova att söka efter något annat eller välj en annan kategori.',
        'glossary.clearFilters': 'Rensa filter',
    },
    en: {
        // Navigation
        'nav.dashboard': 'Dashboard',
        'nav.journeyMaps': 'Journey Maps',
        'nav.templates': 'Templates',
        'nav.analytics': 'Analytics',
        'nav.personas': 'Personas',
        'nav.insights': 'Insights',
        'nav.glossary': 'Glossary',
        'nav.settings': 'Settings',
        'nav.help': 'Help & Tour',
        'nav.logout': 'Log out',
        'nav.login': 'Log in',

        // Dashboard
        'dashboard.title': 'Dashboard',
        'dashboard.subtitle': 'Overview of your customer experience projects',
        'dashboard.activeJourneyMaps': 'ACTIVE JOURNEY MAPS',
        'dashboard.customerTouchpoints': 'CUSTOMER TOUCHPOINTS',
        'dashboard.personas': 'PERSONAS',
        'dashboard.templates': 'TEMPLATES',
        'dashboard.total': 'total',
        'dashboard.available': 'available',
        'dashboard.recentJourneyMaps': 'Recent Journey Maps',
        'dashboard.quickStart': 'Quick Start',
        'dashboard.recentActivity': 'Recent Activity',
        'dashboard.createJourneyMap': 'Create new Journey Map',
        'dashboard.useEmail': 'Use a template',
        'dashboard.addPersonas': 'Add personas',
        'dashboard.noJourneyMaps': 'No journey maps yet',
        'dashboard.createFirstJourney': 'Create your first one to get started',
        'dashboard.noActivity': 'No activity yet',
        'dashboard.journeyCreated': 'Journey "{{title}}" was created',
        'dashboard.today': 'Today',
        'dashboard.dayAgo': '1 day ago',
        'dashboard.daysAgo': '{{days}} days ago',
        'dashboard.empty': 'Empty',
        'dashboard.active': 'Active',
        'dashboard.touchpoints': 'touchpoints',
        'dashboard.noTouchpoints': 'No touchpoints yet',
        'dashboard.distributedOver': 'Distributed over {{count}} journeys',
        'dashboard.addPersonasDesc': 'Add personas',
        'dashboard.uniquePersonas': '{{count}} unique personas',
        'dashboard.availableTemplates': 'Available templates',

        // Settings
        'settings.title': 'Settings',
        'settings.language': 'Language',
        'settings.languageDescription': 'Choose your preferred language for the application',
        'settings.swedish': 'Swedish',
        'settings.english': 'English',
        'settings.save': 'Save',
        'settings.saved': 'Settings saved!',

        // Onboarding
        'onboarding.welcome': 'Welcome to Nava',
        'onboarding.subtitle': 'Your platform for Customer Experience Excellence',
        'onboarding.introVideo': 'Introduction video',
        'onboarding.description': 'Learn how to use Nava to create exceptional customer experiences',
        'onboarding.startTour': 'Start guided tour',
        'onboarding.skipTour': 'Skip the tour',

        // Tour
        'tour.dashboard': 'Dashboard',
        'tour.dashboardDesc': 'Here you get a quick overview of your Customer Experience data and important insights.',
        'tour.journeyMaps': 'Journey Maps',
        'tour.journeyMapsDesc': 'Create and manage your customer journey maps to understand the entire customer experience.',
        'tour.templates': 'Templates',
        'tour.templatesDesc': 'Use ready-made templates to quickly get started with your CX projects.',
        'tour.analytics': 'Analytics',
        'tour.analyticsDesc': 'Analyze your CX data and get valuable insights about the customer experience.',
        'tour.personas': 'Personas',
        'tour.personasDesc': 'Define and manage your customer personas for better target audience understanding.',
        'tour.insights': 'Insights',
        'tour.insightsDesc': 'Collect customer insights through surveys, interviews and other methods.',
        'tour.glossary': 'Glossary',
        'tour.glossaryDesc': 'A glossary with important terms and definitions within Customer Experience.',
        'tour.settings': 'Settings',
        'tour.settingsDesc': 'Customize your account settings and preferences here.',
        'tour.next': 'Next',
        'tour.previous': 'Previous',
        'tour.step': 'Step {{current}} of {{total}}',

        // Common
        'common.loading': 'Loading...',
        'common.loggedIn': 'Logged in',
        'common.redirecting': 'Redirecting to login...',
        'common.startNewJourneyMap': 'Start New Journey Map',
        'common.search': 'Search...',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.delete': 'Delete',
        'common.edit': 'Edit',
        'common.add': 'Add',
        'common.create': 'Create',
        'common.back': 'Back',
        'common.next': 'Next',
        'common.previous': 'Previous',
        'common.close': 'Close',

        // Journey Store/Data
        'journey.stages.awareness': 'Awareness',
        'journey.stages.awarenessDesc': 'Customer becomes aware of need',
        'journey.stages.consideration': 'Consideration', 
        'journey.stages.considerationDesc': 'Customer evaluates alternatives',
        'journey.stages.purchase': 'Purchase',
        'journey.stages.purchaseDesc': 'Customer makes purchase decision',
        'journey.stages.usage': 'Usage',
        'journey.stages.usageDesc': 'Customer uses the product/service',
        'journey.stages.loyalty': 'Loyalty',
        'journey.stages.loyaltyDesc': 'Customer becomes loyal and recommends',
        
        'journey.touchpoints.googleSearch': 'Searches on Google',
        'journey.touchpoints.googleSearchDesc': 'Customer searches for solutions online',
        'journey.touchpoints.visitWebsite': 'Visits website',
        'journey.touchpoints.visitWebsiteDesc': 'Customer explores company website',
        'journey.touchpoints.readReviews': 'Reads reviews',
        'journey.touchpoints.readReviewsDesc': 'Customer reads other customers\' experiences',
        'journey.touchpoints.contactSupport': 'Contacts support',
        'journey.touchpoints.contactSupportDesc': 'Customer asks questions to customer service',
        'journey.touchpoints.makePurchase': 'Makes purchase',
        'journey.touchpoints.makePurchaseDesc': 'Customer completes the purchase',
        'journey.touchpoints.receiveProduct': 'Receives product',
        'journey.touchpoints.receiveProductDesc': 'Customer receives the delivery',
        'journey.touchpoints.firstUse': 'First use',
        'journey.touchpoints.firstUseDesc': 'Customer uses product for the first time',
        'journey.touchpoints.needsSupport': 'Needs support',
        'journey.touchpoints.needsSupportDesc': 'Customer encounters problems and needs help',
        'journey.touchpoints.leaveReview': 'Leaves review',
        'journey.touchpoints.leaveReviewDesc': 'Customer shares their experience',
        'journey.touchpoints.recommendToFriends': 'Recommends to friends',
        'journey.touchpoints.recommendToFriendsDesc': 'Customer spreads positive word',

        'journey.newJourneyTitle': 'New Customer Journey',
        'journey.newJourneyDesc': 'An empty journey ready to be filled with your own touchpoints',
        'journey.blankJourneyTitle': 'New Customer Journey',
        'journey.blankJourneyDesc': 'An empty journey ready to be filled with your own touchpoints',

        // Glossary
        'glossary.title': 'Glossary',
        'glossary.subtitle': 'Dictionary for Customer Experience terms',
        'glossary.searchPlaceholder': 'Search for terms...',
        'glossary.searchLabel': 'Search for terms',
        'glossary.categoryLabel': 'Category',
        'glossary.allCategories': 'All categories',
        'glossary.categoryGeneral': 'General',
        'glossary.categoryJourney': 'Journey',
        'glossary.categoryTouchpoint': 'Touchpoints',
        'glossary.categoryEmotion': 'Emotions',
        'glossary.categoryMetrics': 'Metrics',
        'glossary.relatedTerms': 'Related terms',
        'glossary.relatedTermsLabel': 'Related terms',
        'glossary.examples': 'Examples',
        'glossary.examplesLabel': 'Examples',
        'glossary.resultsShowing': 'Showing {{filtered}} of {{total}} terms',
        'glossary.noTermsFound': 'No terms found',
        'glossary.noTermsFoundDesc': 'Try different search terms or clear the filters',
        'glossary.clearFilters': 'Clear filters',

        // Templates
        'templates.title': 'Templates',
        'templates.subtitle': 'Ready-made templates to quickly get started with your CX projects',
        'templates.useTemplate': 'Use template',
        'templates.preview': 'Preview',

        // Personas
        'personas.title': 'Personas',
        'personas.subtitle': 'Define and manage your customer personas',
        'personas.createPersona': 'Create new persona',
        'personas.guide': 'Guide to creating personas',

        // Analytics
        'analytics.title': 'Analytics',
        'analytics.subtitle': 'Analyze your CX data and get valuable insights',

        // Insights
        'insights.title': 'Customer Insights',
        'insights.subtitle': 'Collect and analyze customer data for better customer experience',
        'insights.gettingStarted': 'Getting Started',
        'insights.surveys': 'Surveys',
        'insights.interviews': 'Interviews',
        'insights.focusGroups': 'Focus Groups',
        'insights.observation': 'Observation',
        'insights.newProject': 'New project',
        'insights.whyCollectInsights': 'Why collect customer insights?',
        'insights.whyCollectDescription': 'Customer insights help you understand what customers really think, feel and need. By combining quantitative measurements with qualitative insights you get a complete picture that drives data-based improvements to customer experience.',
        'insights.identifyPainPoints': 'Identify pain points',
        'insights.measureProgress': 'Measure progress',
        'insights.validateChanges': 'Validate changes',
        'insights.understandNeeds': 'Understand needs',
        'insights.quantitativeMethods': 'Quantitative methods',
        'insights.quantitativeDescription': 'Measurable data and numbers',
        'insights.qualitativeMethods': 'Qualitative methods',
        'insights.qualitativeDescription': 'In-depth insights and understanding',
        'insights.toolsTemplates': 'Tools & Templates',
        'insights.toolsDescription': 'Practical tools for data collection',
        'insights.getStarted': 'Get started',
        'insights.learnMore': 'Learn more',
        'insights.newToInsights': 'New to customer insights?',
        'insights.newToInsightsDescription': 'Start with our guides to learn when to use which methods and how to get the most value from your data collection.',
        'insights.gettingStartedGuide': 'Getting started guide',
        'insights.bestPractices': 'Best practices',

        // NPS Methods
        'insights.nps.title': 'NPS Surveys',
        'insights.nps.description': 'Measure customer loyalty with Net Promoter Score',
        'insights.nps.feature1': '0-10 scale',
        'insights.nps.feature2': 'Automatic segmentation',
        'insights.nps.feature3': 'Trend analysis',
        'insights.nps.feature4': 'Benchmarking',

        // CSAT Methods
        'insights.csat.title': 'CSAT Surveys',
        'insights.csat.description': 'Measure customer satisfaction for specific touchpoints',
        'insights.csat.feature1': 'Touchpoint connection',
        'insights.csat.feature2': 'Real-time data',
        'insights.csat.feature3': 'Comparisons',
        'insights.csat.feature4': 'Goal setting',

        // CES Methods
        'insights.ces.title': 'CES Surveys',
        'insights.ces.description': 'Measure customer effort and identify friction',
        'insights.ces.feature1': 'Ease index',
        'insights.ces.feature2': 'Pain point identification',
        'insights.ces.feature3': 'Process optimization',
        'insights.ces.feature4': 'ROI calculation',

        // Qualitative Methods
        'insights.interviews.title': 'Customer Interviews',
        'insights.interviews.description': 'Deep understanding through personal conversations',
        'insights.interviews.feature1': 'Interview guides',
        'insights.interviews.feature2': 'Question templates',
        'insights.interviews.feature3': 'Recording tools',
        'insights.interviews.feature4': 'Analysis templates',

        'insights.focusGroups.title': 'Focus Groups',
        'insights.focusGroups.description': 'Gather group insights and dynamic discussions',
        'insights.focusGroups.feature1': 'Participant recruitment',
        'insights.focusGroups.feature2': 'Discussion guides',
        'insights.focusGroups.feature3': 'Moderation tips',
        'insights.focusGroups.feature4': 'Group analysis',

        'insights.observation.title': 'User Observation',
        'insights.observation.description': 'See how customers really behave',
        'insights.observation.feature1': 'Observation protocols',
        'insights.observation.feature2': 'Behavior analysis',
        'insights.observation.feature3': 'Journey shadowing',
        'insights.observation.feature4': 'Ethnography',

        // Tools
        'insights.surveyBuilder.title': 'Survey Builder',
        'insights.surveyBuilder.description': 'Create professional surveys with templates',
        'insights.surveyBuilder.action': 'Create survey',

        'insights.researchPlanner.title': 'Research Planner',
        'insights.researchPlanner.description': 'Plan and organize your customer insight projects',
        'insights.researchPlanner.action': 'Plan project',

        'insights.dataDashboard.title': 'Data Dashboard',
        'insights.dataDashboard.description': 'Visualize and analyze collected data',
        'insights.dataDashboard.action': 'Show dashboard',

        'insights.insightsLibrary.title': 'Insights Library',
        'insights.insightsLibrary.description': 'Collect and organize all customer insights',
        'insights.insightsLibrary.action': 'Open library',

        // Journey Maps
        'journeyMaps.title': 'Journey Maps',
        'journeyMaps.subtitle': 'Create and manage customer journey maps to visualize the customer experience',
        'journeyMaps.createNew': 'New Journey Map',
        'journeyMaps.viewAll': 'View all',
        'journeyMaps.sampleData.ecommerce.name': 'E-commerce Customer Journey',
        'journeyMaps.sampleData.ecommerce.description': 'Customer journey for online shopping from discovery to repurchase',
        'journeyMaps.sampleData.b2b.name': 'B2B Sales Process',
        'journeyMaps.sampleData.b2b.description': 'Customer journey for business customers through the sales cycle',
        'journeyMaps.sampleData.support.name': 'Customer Service Journey',
        'journeyMaps.sampleData.support.description': 'Support case from reporting to resolution',
        'journeyMaps.status.draft': 'Draft',
        'journeyMaps.status.completed': 'Completed',
        'journeyMaps.status.inReview': 'Under Review',
        'journeyMaps.actions.duplicate': 'Duplicate',
        'journeyMaps.actions.delete': 'Delete',
        'journeyMaps.actions.edit': 'Edit',
        'journeyMaps.lastModified': 'Last modified',
        'journeyMaps.stages': 'stages',
        'journeyMaps.createdBy': 'By',
        'journeyMaps.currentUser': 'Current user',
        'journeyMaps.copy': 'Copy',
        'journeyMaps.createNewCard.title': 'Create new Journey Map',
        'journeyMaps.createNewCard.description': 'Visualize the customer journey from first contact to goal',
        'journeyMaps.gettingStarted.title': 'Get started with Journey Maps',
        'journeyMaps.gettingStarted.description': 'Journey Maps help you visualize and understand the entire customer experience from first contact to final goal. Identify pain points, opportunities and improvement areas.',
        'journeyMaps.gettingStarted.createFirst': 'Create your first Journey Map',
        'journeyMaps.modal.createTitle': 'Create new Journey Map',
        'journeyMaps.modal.nameLabel': 'Journey Map name',
        'journeyMaps.modal.namePlaceholder': 'E-commerce Customer Journey',
        'journeyMaps.modal.descriptionLabel': 'Description (optional)',
        'journeyMaps.modal.descriptionPlaceholder': 'Describe what this journey map will focus on...',
        'journeyMaps.modal.create': 'Create Journey Map',

        // Glossary Terms - Customer Experience (CX)
        'glossary.term.customer-experience': 'Customer Experience (CX)',
        'glossary.definition.customer-experience': 'The total experience a customer has with a company throughout the entire customer journey, from first impression to after purchase.',
        'glossary.example.customer-experience.1': 'How easy it is to find information on the website',
        'glossary.example.customer-experience.2': 'Quality of customer service',
        'glossary.example.customer-experience.3': 'Delivery experience',

        // Glossary Terms - Persona
        'glossary.term.persona': 'Persona',
        'glossary.definition.persona': 'A fictional representation of your ideal customer based on real data and research about existing customers.',
        'glossary.example.persona.1': 'Anna, 35, busy parent who shops online',
        'glossary.example.persona.2': 'Erik, 28, tech-interested early adopter',

        // Glossary Terms - User Experience (UX)
        'glossary.term.user-experience': 'User Experience (UX)',
        'glossary.definition.user-experience': 'How a person feels and experiences when interacting with a product, service or system.',

        // Glossary Terms - Customer Journey
        'glossary.term.customer-journey': 'Customer Journey',
        'glossary.definition.customer-journey': 'The complete path a customer takes from first awareness of a need to becoming a loyal customer and advocate.',
        'glossary.example.customer-journey.1': 'Awareness → Consideration → Purchase → Usage → Loyalty',

        // Glossary Terms - Customer Journey Map
        'glossary.term.customer-journey-map': 'Customer Journey Map',
        'glossary.definition.customer-journey-map': 'A visual representation of the customer experience showing all touchpoints and emotions throughout the entire customer journey.',

        // Glossary Terms - Stage
        'glossary.term.stage': 'Stage',
        'glossary.definition.stage': 'A specific phase in the customer journey that represents the customer\'s mental state and goals at that time.',
        'glossary.example.stage.1': 'Awareness',
        'glossary.example.stage.2': 'Consideration',
        'glossary.example.stage.3': 'Purchase',
        'glossary.example.stage.4': 'Usage',
        'glossary.example.stage.5': 'Loyalty',

        // Glossary Terms - Touchpoint
        'glossary.term.touchpoint': 'Touchpoint',
        'glossary.definition.touchpoint': 'Every point where a customer comes into contact with your brand, product or service.',
        'glossary.example.touchpoint.1': 'Website',
        'glossary.example.touchpoint.2': 'Social media',
        'glossary.example.touchpoint.3': 'Customer service',
        'glossary.example.touchpoint.4': 'Physical store',
        'glossary.example.touchpoint.5': 'Email',
        'glossary.example.touchpoint.6': 'Mobile app',

        // Glossary Terms - Channel
        'glossary.term.channel': 'Channel',
        'glossary.definition.channel': 'The medium or platform through which a touchpoint takes place.',
        'glossary.example.channel.1': 'Online',
        'glossary.example.channel.2': 'Offline',
        'glossary.example.channel.3': 'Phone',
        'glossary.example.channel.4': 'Email',
        'glossary.example.channel.5': 'Social Media',

        // Glossary Terms - Omnichannel
        'glossary.term.omnichannel': 'Omnichannel',
        'glossary.definition.omnichannel': 'An integrated approach where all channels work together to create a seamless customer experience.',

        // Glossary Terms - Emotion Mapping
        'glossary.term.emotion-mapping': 'Emotion Mapping',
        'glossary.definition.emotion-mapping': 'The process of identifying and mapping customer emotions at each touchpoint in the customer journey.',
        'glossary.example.emotion-mapping.1': 'Frustration at complicated checkout',
        'glossary.example.emotion-mapping.2': 'Joy at fast delivery',
        'glossary.example.emotion-mapping.3': 'Surprise at unexpectedly good service',

        // Glossary Terms - Pain Point
        'glossary.term.pain-point': 'Pain Point',
        'glossary.definition.pain-point': 'A problem or frustration that customers experience at a specific touchpoint that negatively affects their experience.',
        'glossary.example.pain-point.1': 'Long wait time on phone',
        'glossary.example.pain-point.2': 'Complicated return process',
        'glossary.example.pain-point.3': 'Unclear pricing information',

        // Glossary Terms - Opportunity
        'glossary.term.opportunity': 'Opportunity',
        'glossary.definition.opportunity': 'A point in the customer journey where there is potential to improve the customer experience or create added value.',
        'glossary.example.opportunity.1': 'Personalized recommendations',
        'glossary.example.opportunity.2': 'Proactive customer service',
        'glossary.example.opportunity.3': 'Surprise with extra service',

        // Glossary Terms - Moment of Truth
        'glossary.term.moment-of-truth': 'Moment of Truth',
        'glossary.definition.moment-of-truth': 'Critical moments in the customer journey that strongly influence the customer\'s overall perception of the company.',
        'glossary.example.moment-of-truth.1': 'First impression of website',
        'glossary.example.moment-of-truth.2': 'Handling of complaints',
        'glossary.example.moment-of-truth.3': 'Product quality on first use',

        // Glossary Terms - Net Promoter Score (NPS)
        'glossary.term.nps': 'Net Promoter Score (NPS)',
        'glossary.definition.nps': 'A measure that measures customers\' tendency to recommend the company to others on a scale from 0-10.',
        'glossary.example.nps.1': 'Promoters: 9-10',
        'glossary.example.nps.2': 'Passives: 7-8',
        'glossary.example.nps.3': 'Detractors: 0-6',

        // Glossary Terms - Customer Satisfaction (CSAT)
        'glossary.term.customer-satisfaction': 'Customer Satisfaction (CSAT)',
        'glossary.definition.customer-satisfaction': 'A measure of how satisfied customers are with a specific product, service or interaction.',
        'glossary.example.customer-satisfaction.1': 'Survey questions after support calls',
        'glossary.example.customer-satisfaction.2': 'Product ratings',
        'glossary.example.customer-satisfaction.3': 'Service evaluations',

        // Glossary Terms - Customer Effort Score (CES)
        'glossary.term.customer-effort-score': 'Customer Effort Score (CES)',
        'glossary.definition.customer-effort-score': 'Measures how easy or difficult it was for the customer to get their task solved or need met.',
        'glossary.example.customer-effort-score.1': 'How easy was it to find the information you were looking for?',
        'glossary.example.customer-effort-score.2': 'How easy was it to complete the purchase?',

        // Glossary Terms - Customer Retention
        'glossary.term.retention': 'Customer Retention',
        'glossary.definition.retention': 'The company\'s ability to retain existing customers over time.',
        'glossary.example.retention.1': 'Repeat purchases',
        'glossary.example.retention.2': 'Renewed subscriptions',
        'glossary.example.retention.3': 'Long-term customer relationships',

        // Glossary Terms - Churn Rate
        'glossary.term.churn-rate': 'Churn Rate',
        'glossary.definition.churn-rate': 'The percentage of customers who stop using the company\'s products or services during a certain time period.',
        'glossary.example.churn-rate.1': 'Monthly churn',
        'glossary.example.churn-rate.2': 'Annual churn',
        'glossary.example.churn-rate.3': 'Segmented churn analysis',

        // Glossary Terms - Awareness
        'glossary.term.awareness': 'Awareness',
        'glossary.definition.awareness': 'The first phase in the customer journey where potential customers become aware of a need or problem they have.',
        'glossary.example.awareness.1': 'Discover problem through online search',
        'glossary.example.awareness.2': 'Recommendation from friend',
        'glossary.example.awareness.3': 'See advertisement',

        // Glossary Terms - Consideration
        'glossary.term.consideration': 'Consideration',
        'glossary.definition.consideration': 'The phase where customers actively evaluate different alternatives to solve their need.',
        'glossary.example.consideration.1': 'Compare products',
        'glossary.example.consideration.2': 'Read reviews',
        'glossary.example.consideration.3': 'Request quotes',

        // Glossary Terms - Purchase
        'glossary.term.purchase': 'Purchase',
        'glossary.definition.purchase': 'The decision moment and actual transaction when the customer chooses a solution.',
        'glossary.example.purchase.1': 'Online checkout',
        'glossary.example.purchase.2': 'Store transaction',
        'glossary.example.purchase.3': 'Contract signing',

        // Glossary Terms - Onboarding
        'glossary.term.onboarding': 'Onboarding',
        'glossary.definition.onboarding': 'The process of introducing and guiding new customers so they can quickly get value from the product or service.',
        'glossary.example.onboarding.1': 'Welcome email sequence',
        'glossary.example.onboarding.2': 'Product demonstration',
        'glossary.example.onboarding.3': 'Setup guide',

        // Glossary Terms - Advocacy
        'glossary.term.advocacy': 'Advocacy',
        'glossary.definition.advocacy': 'When satisfied customers actively recommend and promote the company to others.',
        'glossary.example.advocacy.1': 'Customer reviews',
        'glossary.example.advocacy.2': 'Referral program',
        'glossary.example.advocacy.3': 'Word-of-mouth marketing',

        // Glossary Terms - Additional terms continue...
        'glossary.term.empathy-map': 'Empathy Map',
        'glossary.definition.empathy-map': 'A tool that visualizes what the customer sees, hears, thinks, feels, says and does to build understanding.',
        'glossary.example.empathy-map.1': 'Customer insights from interviews',
        'glossary.example.empathy-map.2': 'Observations from user tests',
        'glossary.example.empathy-map.3': 'Feedback analysis',

        'glossary.term.voice-of-customer': 'Voice of Customer (VOC)',
        'glossary.definition.voice-of-customer': 'The process of collecting, analyzing and acting on customer feedback to improve products and services.',
        'glossary.example.voice-of-customer.1': 'Customer surveys',
        'glossary.example.voice-of-customer.2': 'Interviews',
        'glossary.example.voice-of-customer.3': 'Support call analysis',
        'glossary.example.voice-of-customer.4': 'Social media monitoring',

        'glossary.term.service-design': 'Service Design',
        'glossary.definition.service-design': 'A holistic approach to designing services that are useful, usable and desirable for customers.',
        'glossary.example.service-design.1': 'Service blueprints',
        'glossary.example.service-design.2': 'Service prototyping',
        'glossary.example.service-design.3': 'Stakeholder mapping',

        'glossary.term.service-blueprint': 'Service Blueprint',
        'glossary.definition.service-blueprint': 'A detailed map showing the service process, including the customer journey and all underlying processes.',

        'glossary.term.digital-touchpoint': 'Digital Touchpoint',
        'glossary.definition.digital-touchpoint': 'All digital contact points where customers interact with the brand online.',
        'glossary.example.digital-touchpoint.1': 'Website',
        'glossary.example.digital-touchpoint.2': 'Mobile app',
        'glossary.example.digital-touchpoint.3': 'Email',
        'glossary.example.digital-touchpoint.4': 'Social media',
        'glossary.example.digital-touchpoint.5': 'Chatbot',

        'glossary.term.physical-touchpoint': 'Physical Touchpoint',
        'glossary.definition.physical-touchpoint': 'Physical contact points where customers have direct contact with the company or product.',
        'glossary.example.physical-touchpoint.1': 'Store',
        'glossary.example.physical-touchpoint.2': 'Office',
        'glossary.example.physical-touchpoint.3': 'Product packaging',
        'glossary.example.physical-touchpoint.4': 'Business card',
        'glossary.example.physical-touchpoint.5': 'Signs',

        'glossary.term.micro-interaction': 'Micro-interaction',
        'glossary.definition.micro-interaction': 'Small, functional interactions that improve user experience through feedback and guidance.',
        'glossary.example.micro-interaction.1': 'Hover effects',
        'glossary.example.micro-interaction.2': 'Loading indicators',
        'glossary.example.micro-interaction.3': 'Form validation',
        'glossary.example.micro-interaction.4': 'Animations',

        'glossary.term.delight': 'Delight',
        'glossary.definition.delight': 'When the customer experience exceeds expectations and creates positive surprises.',
        'glossary.example.delight.1': 'Unexpectedly fast delivery',
        'glossary.example.delight.2': 'Personal handwritten thank-you note',
        'glossary.example.delight.3': 'Free upgrade',

        'glossary.term.friction': 'Friction',
        'glossary.definition.friction': 'Obstacles or difficulties in the customer experience that make it hard for customers to achieve their goals.',
        'glossary.example.friction.1': 'Complicated forms',
        'glossary.example.friction.2': 'Slow loading time',
        'glossary.example.friction.3': 'Unclear navigation',

        'glossary.term.wow-factor': 'Wow Factor',
        'glossary.definition.wow-factor': 'An element in the customer experience that creates strong positive reaction and memorable experience.',
        'glossary.example.wow-factor.1': 'Exceptional service',
        'glossary.example.wow-factor.2': 'Innovative product feature',
        'glossary.example.wow-factor.3': 'Personal surprise',

        'glossary.term.trust': 'Trust',
        'glossary.definition.trust': 'The customer\'s belief in the company\'s reliability, integrity and ability to deliver on promises.',
        'glossary.example.trust.1': 'Secure payments',
        'glossary.example.trust.2': 'Transparent communication',
        'glossary.example.trust.3': 'Consistent delivery',

        'glossary.term.customer-lifetime-value': 'Customer Lifetime Value (CLV)',
        'glossary.definition.customer-lifetime-value': 'The total value a customer generates for the company throughout their entire customer relationship.',
        'glossary.example.customer-lifetime-value.1': 'Average monthly revenue × customer lifetime',
        'glossary.example.customer-lifetime-value.2': 'Total revenue - total cost per customer',

        'glossary.term.conversion-rate': 'Conversion Rate',
        'glossary.definition.conversion-rate': 'The percentage of visitors or leads who perform a desired action.',
        'glossary.example.conversion-rate.1': 'Website visitors who buy',
        'glossary.example.conversion-rate.2': 'Email recipients who click',
        'glossary.example.conversion-rate.3': 'Trial users who pay',

        'glossary.term.time-to-value': 'Time to Value (TTV)',
        'glossary.definition.time-to-value': 'The time it takes for a customer to get their first meaningful value from the product or service.',
        'glossary.example.time-to-value.1': 'Time to first successful use',
        'glossary.example.time-to-value.2': 'Setup to first result',
        'glossary.example.time-to-value.3': 'Registration to activation',

        'glossary.term.activation-rate': 'Activation Rate',
        'glossary.definition.activation-rate': 'The percentage of new users who reach a predefined milestone that indicates successful adoption.',
        'glossary.example.activation-rate.1': 'Users who complete onboarding',
        'glossary.example.activation-rate.2': 'First transaction',
        'glossary.example.activation-rate.3': 'Profile completion',

        'glossary.term.customer-health-score': 'Customer Health Score',
        'glossary.definition.customer-health-score': 'A composite score that indicates the likelihood that a customer will remain loyal or churn.',
        'glossary.example.customer-health-score.1': 'Product usage + support tickets + payment history',
        'glossary.example.customer-health-score.2': 'Engagement + satisfaction',

        // Glossary Page UI Text
        'glossary.searchPlaceholder': 'Search for terms or definitions...',
        'glossary.searchLabel': 'Search the glossary',
        'glossary.categoryLabel': 'Category',
        'glossary.categoryGeneral': 'General',
        'glossary.categoryJourney': 'Journey',
        'glossary.categoryTouchpoint': 'Touchpoints',
        'glossary.categoryEmotion': 'Emotions',
        'glossary.categoryMetrics': 'Metrics',
        'glossary.resultsShowing': 'Showing {{filtered}} of {{total}} terms',
        'glossary.examplesLabel': 'Examples:',
        'glossary.relatedTermsLabel': 'Related terms:',
        'glossary.noTermsFound': 'No terms found',
        'glossary.noTermsFoundDesc': 'Try searching for something else or select a different category.',
        'glossary.clearFilters': 'Clear filters',
    }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>('sv')

    useEffect(() => {
        // Load saved language from localStorage
        const savedLanguage = localStorage.getItem('nava-language') as Language
        if (savedLanguage && (savedLanguage === 'sv' || savedLanguage === 'en')) {
            setLanguageState(savedLanguage)
        }
        console.log('LanguageProvider initialized with language:', language)
    }, [])

    useEffect(() => {
        console.log('Language changed to:', language)
    }, [language])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem('nava-language', lang)
    }

    const t = (key: string, variables?: Record<string, string | number>): string => {
        let translation = translations[language]?.[key]

        if (!translation) {
            console.warn(`Translation missing for key: ${key} in language: ${language}`)
            return key
        }

        // Replace variables in translation
        if (variables) {
            Object.entries(variables).forEach(([varKey, value]) => {
                translation = translation.replace(`{{${varKey}}}`, String(value))
            })
        }

        return translation
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}