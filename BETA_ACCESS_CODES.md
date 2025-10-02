# Beta Access-koder för CX Studio

## Master-kod (obegränsad användning)

**2713** - Denna kod kan användas obegränsat antal gånger av olika personer. Den markeras aldrig som använd.

## Engångskoder (20 st)

Dessa personliga access-koder kan endast användas en gång vardera:

1. **7394**
2. **2851**
3. **9462**
4. **3178**
5. **5623**
6. **8147**
7. **4926**
8. **1735**
9. **6289**
10. **3514**
11. **9827**
12. **4163**
13. **7538**
14. **2694**
15. **8351**
16. **1927**
17. **5482**
18. **6739**
19. **3261**
20. **9475**

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