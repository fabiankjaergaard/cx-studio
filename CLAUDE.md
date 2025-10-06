# Project Rules for Claude

## CRITICAL RULES - MUST FOLLOW

### 🚫 NEVER PUSH OR DEPLOY
- **NEVER** run `git push` without explicit permission from the user
- **NEVER** deploy to Vercel without explicit permission from the user
- **NEVER** run any deployment commands automatically
- **ALWAYS** ask for confirmation before any push or deployment
- All changes stay LOCAL until explicitly instructed otherwise

### Git Rules
- ✅ OK to commit locally when asked
- ✅ OK to create branches locally
- ❌ NEVER push to remote without explicit permission
- ❌ NEVER force push under any circumstances

### Deployment Rules
- ❌ NEVER run `vercel deploy` without permission
- ❌ NEVER run `vercel --prod` without permission
- ❌ NEVER trigger any CI/CD pipelines automatically

## Project Context

This is the CX Studio (Kustra) app - a Customer Experience management platform built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Working Agreement

1. All changes remain local until explicitly requested to push
2. Always confirm before any remote operations
3. If unsure about whether something involves pushing/deploying, ASK FIRST
4. Treat all `git push` and `vercel` commands as requiring explicit approval

---
*This file ensures Claude follows project-specific rules automatically.*