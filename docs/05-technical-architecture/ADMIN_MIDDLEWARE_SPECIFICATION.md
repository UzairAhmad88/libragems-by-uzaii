# Admin Route Middleware & Session Protection Specification

**Project:** Libra Gems & Trading Co., Ltd.  
**File:** `apps/web/src/middleware.ts` & `apps/web/src/lib/supabase/middleware.ts`  
**Framework:** Next.js 15.1.7 (Edge Runtime / Node Server Middleware)  

---

## 1. Middleware Responsibilities

1. **Token Refreshing:** Keeps user sessions active by intercepting inbound requests, renewing expired JWT access tokens using refresh tokens via `@supabase/ssr`, and writing the refreshed cookies onto both the request and response headers.
2. **Route Protection:** Intercepts all requests matching `/admin/*` (except the public entry `/admin/login`).
3. **Graceful Zero-Credential Fallback:** If `NEXT_PUBLIC_SUPABASE_URL` is unconfigured, avoids crashing the edge runtime and transparently redirects to `/admin/login?mode=unconfigured` or allows local inspection.
4. **Active Admin Gating:** Checks whether the authenticated user has an active record in `public.admin_profiles`.

---

## 2. Matcher Configuration

The Next.js middleware is configured to run on all routes except static assets and standard public metadata endpoints:

```typescript
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

---

## 3. Redirect Matrix

| Scenario | Requested Route | Middleware Behavior |
|---|---|---|
| Unauthenticated visitor | `/admin/dashboard` | Redirects to `/admin/login?next=%2Fadmin%2Fdashboard` |
| Unauthenticated visitor | `/admin/gemstones/new` | Redirects to `/admin/login?next=%2Fadmin%2Fgemstones%2Fnew` |
| Authenticated normal user (no admin profile) | `/admin/dashboard` | Redirects to `/admin/login?error=unauthorized` |
| Suspended admin (`is_active = false`) | `/admin/dashboard` | Redirects to `/admin/login?error=unauthorized` |
| Authenticated active admin | `/admin/login` | Redirects to `/admin/dashboard` |
| Any user | `/admin/login` | Allowed (renders sign-in interface) |
| Any user | `/`, `/catalogue/*`, `/contact` | Allowed (public website routes) |
