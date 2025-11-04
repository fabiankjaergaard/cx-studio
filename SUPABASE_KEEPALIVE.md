# Supabase Keep-Alive Setup 🔄

Detta dokument beskriver hur du håller ditt Supabase-projekt aktivt automatiskt varje vecka.

---

## ✅ Vad har skapats

### API Endpoint: `/api/ping`

En enkel Next.js API route som:
- Gör ett lightweight Supabase-anrop
- Returnerar status och tidsstämpel
- Håller databasen aktiv

**Endpoint URL (efter deployment):**
```
https://cx-app-seven.vercel.app/api/ping
```

**Lokal testning:**
```
http://localhost:3001/api/ping
```

**Response exempel:**
```json
{
  "ok": true,
  "message": "Supabase is active",
  "time": "2025-11-04T15:31:37.610Z",
  "queryResult": "success"
}
```

---

## 🚀 Setup: Automatisk Cron Job

### Steg 1: Deploy till Vercel

Först måste du deploya den nya ping-endpointen till Vercel:

```bash
# Committa ändringarna
git add .
git commit -m "Add Supabase keep-alive ping endpoint"
git push

# Eller deploy direkt via Vercel CLI
vercel --prod
```

**OBS:** Glöm inte att fråga först innan du pushar/deployer enligt CLAUDE.md! 😊

---

### Steg 2: Skapa Cron Job på cron-job.org

1. **Gå till:** [https://cron-job.org/](https://cron-job.org/)

2. **Skapa gratis konto** (tar 30 sekunder)

3. **Klicka "Create Cronjob"**

4. **Fyll i följande:**

   **Basic Settings:**
   - **Title:** `Supabase Keep-Alive - CX App`
   - **URL:** `https://cx-app-seven.vercel.app/api/ping`
   - **HTTP Method:** GET

   **Schedule:**
   - **Pattern:** Custom
   - **Every:** 5 days (eller varje vecka om du vill)
   - **At:** 10:00 AM (valfritt)

   **Notifications:**
   - ❌ Disable email notifications (om du inte vill ha spam)
   - ✅ Enable "Log results" för debugging

5. **Klicka "Create"** 🎉

---

## 🔍 Verifiera att det fungerar

### Test 1: Manuellt test

Öppna i webbläsaren:
```
https://cx-app-seven.vercel.app/api/ping
```

Du ska se något liknande:
```json
{
  "ok": true,
  "message": "Supabase is active",
  "time": "2025-11-04T15:31:37.610Z",
  "queryResult": "success"
}
```

### Test 2: Curl test

```bash
curl https://cx-app-seven.vercel.app/api/ping
```

### Test 3: Cron-job.org dashboard

- Logga in på cron-job.org
- Kolla under "Execution Log"
- Du ska se lyckade pings med HTTP 200 status

---

## 📊 Alternativa Cron-tjänster

Om cron-job.org inte fungerar kan du använda:

### 1. **UptimeRobot** (Rekommenderas!)
- [https://uptimerobot.com/](https://uptimerobot.com/)
- ✅ Gratis
- ✅ Monitor 50 endpoints
- ✅ Check varje 5 minuter
- ✅ Email/SMS alerts

**Setup:**
1. Skapa konto
2. Add New Monitor
3. Monitor Type: HTTP(s)
4. URL: `https://cx-app-seven.vercel.app/api/ping`
5. Monitoring Interval: 5 minutes

### 2. **Better Uptime**
- [https://betteruptime.com/](https://betteruptime.com/)
- ✅ Gratis för upp till 10 monitors
- ✅ Vacker dashboard
- ✅ Slack/Discord integrationer

### 3. **Vercel Cron Jobs** (Bästa lösningen!)
- Inbyggt i Vercel
- ✅ Helt gratis
- ✅ Ingen extern tjänst behövs
- ❌ Kräver kod-ändring

**Setup för Vercel Cron:**

Skapa `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/ping",
      "schedule": "0 10 */5 * *"
    }
  ]
}
```

Detta kör ping-endpointen **kl. 10:00 varje 5:e dag**.

---

## ⏱️ Rekommenderade Intervaller

För att hålla Supabase aktivt utan att pausa:

- **Varje 5 dagar:** `0 10 */5 * *` (Säkert)
- **Varje vecka:** `0 10 * * 1` (Måndag kl. 10:00)
- **Varannan dag:** `0 10 */2 * *` (Extra säkert)

**Mitt förslag:** **Varje 5 dagar** - ger marginal och är säkert.

---

## 🐛 Troubleshooting

### Problem: Endpoint returnerar 500

**Lösning:**
1. Kolla att .env.local är korrekt deployad till Vercel
2. Verifiera Supabase credentials i Vercel Dashboard → Settings → Environment Variables

### Problem: "beta_testers" table not found

**Lösning:**
Ändra till en annan tabell som du vet finns:

```typescript
// I /src/app/api/ping/route.ts
const { data, error } = await supabase
  .from('feedback') // eller annan tabell
  .select('id')
  .limit(1)
```

### Problem: Cron job misslyckas

**Lösning:**
1. Testa URL manuellt i webbläsare
2. Kolla att ingen IP-whitelist blockerar cron-job.org
3. Verifiera att Vercel-projektet är aktivt

---

## 💰 Kostnad

**Totalt:** **0 kr / månad** 💯

- ✅ Ping endpoint: Gratis (Next.js API route)
- ✅ Cron-job.org: Gratis
- ✅ Vercel hosting: Gratis (Hobby plan)
- ✅ Supabase: Gratis (Free tier)

---

## 📝 Nästa steg

1. ☐ **Deploy ping-endpoint till Vercel** (be om tillstånd först!)
2. ☐ **Testa endpointen i production**
3. ☐ **Skapa cron job på cron-job.org** (eller UptimeRobot/Vercel Cron)
4. ☐ **Verifiera första ping fungerar**
5. ☐ **Kolla efter en vecka att det fortfarande fungerar**

---

## 🎉 Klart!

Nu kommer ditt Supabase-projekt att hållas aktivt automatiskt varje vecka utan att du behöver göra något.

**Frågor?** Fråga Claude! 😊

---

**Skapad:** 2025-11-04
**Endpoint fil:** `/src/app/api/ping/route.ts`
**Status:** ✅ Testad och fungerande lokalt
