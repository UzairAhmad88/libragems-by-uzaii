
# LibraGems – Website Project Starter Kit

**Version:** 1.0  
**Project type:** Premium gemstone trading and business portfolio website  
**Status:** Planning + implementation-ready project scaffold

## Purpose

This package establishes the project documentation, implementation structure, starter configuration, and AI-development instructions for the LibraGems website.

The website is an enquiry-led business website, not a conventional online store. Its initial product focus is:

1. Commercial-quality rough Hessonite Garnet
2. Commercial-quality Turquoise
3. Afghanistan cut-stone Rubellite

## Important project rules

- Use the official company name only after the client confirms the preferred public-facing brand wording.
- Treat all business-card contact details as **unverified until reconfirmed**.
- Do not invent gemstone origin, treatment, dimensions, carat weight, stock, certification, pricing, or availability.
- Use authentic LibraGems product photographs for live product pages. Placeholder/reference images must never be represented as company inventory.
- Do not claim guaranteed Google rankings, certifications, ethical sourcing, or quality grades without evidence.
- Do not commit secrets, API keys, database credentials, or real customer data.
- No checkout/payment system is in the initial scope. The main conversion is a WhatsApp or email enquiry.

## Brand direction

- 60% Forest Green: `#174C38`
- 30% Warm Off-white / Beige: `#F3EFE5`
- 10% Champagne / muted accent: `#B99B68`
- Style: premium, soft, formal, natural, minimal, trustworthy.
- Typography: elegant serif display headings + highly readable sans-serif body text.

## Recommended stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL through Supabase
- Supabase Auth and Storage for admin, products, and images
- Resend (or another verified transactional email provider) for enquiry notifications
- Vercel hosting
- Google Search Console and Google Analytics 4

The `apps/web` directory is a starter scaffold, not a finished production application. Install dependencies and implement the remaining modules according to the phase prompts and specifications.

## Package map

- `docs/`: project, requirements, design, catalogue, architecture, SEO, delivery and testing documentation.
- `apps/web/`: Next.js starter scaffold and implementation placeholders.
- `supabase/`: proposed database schema and local setup notes.
- `prompts/`: master prompt and phase-by-phase AI agent instructions.
- `assets/`: folders for approved brand assets and genuine product photography.
- `project-management/`: decision log, progress tracker and release checklist.

## Start here

1. Read `docs/01-project-overview/PROJECT_VISION.md`.
2. Complete `docs/02-requirements/CLIENT_CONFIRMATION_CHECKLIST.md`.
3. Verify the company name, current contact details, WhatsApp numbers, email and domain access.
4. Supply original gemstone photographs and verified product specifications.
5. Read `docs/03-ui-ux/BRAND_GUIDELINES.md`.
6. Follow `docs/07-development/PHASED_DEVELOPMENT_PLAN.md`.
7. Give `prompts/MASTER_PROMPT.md` and the relevant phase prompt to your coding agent.
8. Never skip the testing and launch gates.

## Local development (starter scaffold)

Requirements: Node.js LTS and npm.

```bash
cd apps/web
npm install
cp .env.example .env.local
npm run dev
```

The starter UI may need further implementation before all pages and integrations work. Configure Supabase and email only after creating the relevant accounts and environment variables.

## Definition of done

The project is ready for launch only when:
- All agreed pages are implemented and responsive.
- Real product content and photographs are approved.
- Contact form submission is validated and securely stored.
- Email delivery is tested end-to-end.
- WhatsApp links use confirmed international-format numbers.
- Admin access is protected and product/enquiry operations work.
- SEO metadata, canonical URLs, sitemap, robots and structured data are verified.
- Accessibility, security, performance and cross-device checks pass.
- Domain, HTTPS, analytics and Search Console are configured.
