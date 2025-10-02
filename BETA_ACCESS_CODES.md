# Beta Access-koder för CX Studio

## Master-kod (obegränsad användning)

**2713** - Denna kod kan användas obegränsat antal gånger av olika personer. Den markeras aldrig som använd.

## Engångskoder (50 st)

Dessa personliga access-koder kan endast användas en gång vardera:

**Original batch (20 koder):**
7394, 2851, 9462, 3178, 5623, 8147, 4926, 1735, 6289, 3514, 9827, 4163, 7538, 2694, 8351, 1927, 5482, 6739, 3261, 9475

**Additional batch (30 koder):**
6813, 5299, 3294, 3729, 5501, 5137, 8271, 9130, 6074, 8211, 8616, 9359, 9224, 8634, 7553, 1696, 6189, 1545, 3692, 1791, 4047, 1266, 6989, 3952, 3597, 3060, 2282, 2051, 3812, 7560

## Hur det fungerar

1. När en beta-testare klickar på "I'm a beta tester" på login-sidan
2. De anger sitt namn och en av koderna
3. Koden valideras:
   - **2713** (master-kod): Alltid giltig, markeras aldrig som använd
   - **Andra koder**: Kontrolleras mot `access_codes` tabellen i Supabase
4. Om koden är giltig:
   - Engångskoder markeras som använda med användarens namn
   - Master-koden förblir alltid tillgänglig
   - Användaren loggas in som beta-testare

## Admin-vy

Du kan se status för alla koder på:
`/beta/admin/feedback`

Där visas:
- Vilka koder som är tillgängliga (gröna)
- Vilka koder som är använda (gråa) och av vem
- Lista över alla registrerade beta-testare

## Databas-setup

För att aktivera systemet, kör följande SQL i Supabase:
1. `supabase-access-codes-schema.sql` - Skapar tabellen och lägger in koderna

## Generera nya koder

Om du behöver fler koder kan du använda funktionen i:
`/src/utils/generateAccessCodes.ts`