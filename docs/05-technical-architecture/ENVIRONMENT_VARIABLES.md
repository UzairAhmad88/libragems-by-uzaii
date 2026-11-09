# Environment Variables

Create `apps/web/.env.local` from `.env.example`.

Never commit `.env.local`.

| Variable | Purpose | Exposure |
|---|---|---|
| NEXT_PUBLIC_SITE_URL | Canonical production/base URL | Public |
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL | Public |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anon key (RLS required) | Public |
| SUPABASE_SERVICE_ROLE_KEY | Privileged server-side operations only | Secret |
| RESEND_API_KEY | Transactional email API | Secret |
| ENQUIRY_TO_EMAIL | Verified business inbox | Server only |
| ENQUIRY_FROM_EMAIL | Verified sender/domain | Server only |
| WHATSAPP_PRIMARY_NUMBER | Confirmed international-format digits | Server only or controlled public config |
| WHATSAPP_SECONDARY_NUMBER | Optional confirmed second contact | Server only or controlled public config |
| NEXT_PUBLIC_GA_ID | GA4 measurement ID | Public |

Do not put real credentials in documentation, source control, screenshots or AI prompts.
