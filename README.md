# CX Studio - Customer Experience Tools

En modern webbapplikation för att skapa och hantera customer journey maps och andra CX-verktyg.

## 🚀 Funktioner

- **Interactive Journey Mapping**: Skapa visuella customer journey maps med drag-and-drop funktionalitet
- **Template Library**: Förbyggda mallar för olika branscher (E-commerce, SaaS, Service, etc.)
- **Touchpoint Management**: Hantera och kategorisera olika kundkontaktpunkter
- **Emotion Mapping**: Spåra kundens känslotillstånd genom hela resan
- **Collaborative Tools**: Dela och samarbeta kring journey maps
- **Export Functionality**: Exportera maps till olika format

## 🛠 Teknisk Stack

- **Framework**: Next.js 15 med App Router
- **Språk**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Icons**: Lucide React
- **Development**: VS Code

## 📦 Installation

1. Klona projektet:
```bash
git clone [repository-url]
cd cx-app
```

2. Installera dependencies:
```bash
npm install
```

3. Starta utvecklingsservern:
```bash
npm run dev
```

4. Öppna [http://localhost:3001](http://localhost:3001) i din webbläsare.

## 📁 Projektstruktur

```
cx-app/
├── src/
│   ├── app/                    # Next.js App Router sidor
│   │   ├── journeys/          # Journey mapping sidor
│   │   └── templates/         # Template gallery
│   ├── components/            # React komponenter
│   │   ├── ui/               # Grundläggande UI komponenter
│   │   ├── journey/          # Journey mapping komponenter
│   │   └── dashboard/        # Dashboard komponenter
│   ├── lib/                  # Utilities och konfigurationer
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Zustand state management
│   └── types/                # TypeScript definitioner
├── public/                   # Statiska filer
└── docs/                     # Dokumentation
```

## 🎨 Komponenter

### UI Komponenter
- `Button`: Återanvändbar knapp med olika varianter
- `Card`: Card layout för innehåll
- `Input`: Textinmatning med styling

### Journey Komponenter
- `TouchpointCard`: Visar individuella touchpoints
- `JourneyCanvas`: Huvudcanvas för journey mapping
- `StageHeader`: Visar journey stages

### Dashboard Komponenter
- `Sidebar`: Navigation sidebar
- `Header`: Sidhuvud med actions

## 💾 State Management

Applikationen använder Zustand för state management med följande stores:

- `useJourneyStore`: Hanterar journey maps, touchpoints och urval

## 🎯 Användning

### Skapa en Journey Map
1. Gå till "Journey Maps" i navigationen
2. Klicka "Ny Journey Map"
3. Lägg till touchpoints genom att dra och släppa
4. Kategorisera touchpoints efter känslotillstånd och kanal

### Använda Templates
1. Gå till "Templates"
2. Välj en mall från galleriet
3. Anpassa mallen efter dina behov
4. Spara som ny journey map

## 🔧 Utveckling

### Linting och Formatering
```bash
npm run lint
npm run lint:fix
```

### Type Checking
```bash
npm run type-check
```

### Building
```bash
npm run build
```

## 📝 Todo

- [ ] Implementera drag-and-drop funktionalitet
- [ ] Lägg till exportfunktioner (PDF, PNG)
- [ ] Skapa fler branschspecifika templates
- [ ] Implementera samarbetsfunktioner
- [ ] Lägg till analytics dashboard
- [ ] Integrera med externa data källor

## 🤝 Bidrag

Contributions välkomnas! Skapa en pull request eller öppna ett issue för att diskutera ändringar.

## 📄 Licens

Detta projekt är licensierat under MIT License.
