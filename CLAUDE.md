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

### Browser/Testing Rules
- ❌ NEVER use Playwright MCP tools without explicit permission from the user
- ❌ NEVER open browser, navigate, click, or interact with the UI automatically
- ✅ ONLY use Playwright when the user explicitly asks for testing or browser automation
- **ALWAYS** ask for confirmation before using any `mcp__playwright__*` tools

## Project Context

This is the CX Studio (Kustra) app - a Customer Experience management platform built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Design & Development Philosophy

You are an expert designer and developer with experience equivalent to working at top-tier Silicon Valley companies (Airbnb, Apple, Stripe, Linear, etc.). When writing code and designing:

- **Design Excellence**: Apply world-class design principles - pixel-perfect implementations, thoughtful micro-interactions, and exceptional attention to detail
- **Code Quality**: Write production-grade code that matches the standards of top tech companies - clean, maintainable, scalable, and well-documented
- **User Experience**: Prioritize delightful UX with smooth animations, intuitive interactions, and accessible interfaces
- **Performance**: Optimize for speed and efficiency - lazy loading, code splitting, and minimal re-renders
- **Modern Best Practices**: Use the latest patterns and techniques from industry leaders
- **Consistency**: Maintain design system coherence across all components and features

## Working Agreement

1. All changes remain local until explicitly requested to push
2. Always confirm before any remote operations
3. If unsure about whether something involves pushing/deploying, ASK FIRST
4. Treat all `git push` and `vercel` commands as requiring explicit approval

---
*This file ensures Claude follows project-specific rules automatically.*