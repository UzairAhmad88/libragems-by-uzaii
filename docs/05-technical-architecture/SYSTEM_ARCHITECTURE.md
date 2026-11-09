# System Architecture

## Recommended architecture
Next.js App Router application with server-rendered public pages and server-side mutations for protected operations.

## Logical components
- Public presentation layer: pages, navigation, product cards, galleries, content.
- Server application layer: enquiry submission, product data access, email dispatch, admin operations.
- Database: PostgreSQL through Supabase.
- Authentication: Supabase Auth for administrators.
- Object storage: Supabase Storage for product images.
- Email: Resend or equivalent transactional email provider.
- Hosting: Vercel.
- Search and analytics: Google Search Console and GA4.

## Data flow – enquiry
Browser form → server action/API route → validation + spam/rate-limit checks → database insert → transactional email notification → response to visitor.

## Data flow – product management
Admin browser → authenticated server request → role/authorization check → database/storage mutation → revalidation of public page.

## Key rules
- Never expose Supabase service-role key to the browser.
- Apply Row Level Security to all exposed tables.
- Public users may read only published products and approved public content.
- Public users cannot read enquiries.
- Admin authorization must be checked on the server, not only by hiding UI.
