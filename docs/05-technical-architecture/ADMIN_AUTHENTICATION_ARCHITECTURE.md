# Admin Authentication Architecture & RBAC Specification

**Project:** Libra Gems & Trading Co., Ltd.  
**Phase:** 04 (Supabase Database Architecture, Authentication & Admin Dashboard)  
**Security Level:** Commercial Internal / Restricted  
**Runtime:** `@supabase/ssr` with Next.js 15 App Router  

---

## 1. Executive Summary & Security Objectives

Libra Gems & Trading Co., Ltd. operates a high-value B2B international gemstone trading platform based in Bangkok, Thailand. The internal management console (`/admin/*`) governs confidential customer inquiries, wholesale lot pricing discussions, rough gemstone parcel allocations, and CIBJO-compliant gemological disclosures.

### Core Security Directives
1. **Disabled Public Registration:** Unlike conventional SaaS applications, public self-registration is permanently disabled in the Supabase Auth configuration. Administrative access is granted solely via server-side administrative invitation or service-role user creation.
2. **Decoupled RBAC from JWT Metadata:** Authorization roles are **never** trusted from user-editable client metadata (`raw_user_meta_data`). All permissions are grounded in a dedicated, RLS-protected database table (`public.admin_profiles`) checked on every authenticated operation.
3. **Multi-Layer Defense in Depth:**
   - Layer 1: Edge Next.js Middleware with cryptographic token validation (`supabase.auth.getUser()`).
   - Layer 2: Server Component session gating with role verification (`requireAdmin()`).
   - Layer 3: Server Action authorization checks before executing mutations.
   - Layer 4: PostgreSQL Row Level Security (RLS) policies enforcing database-level boundaries.

---

## 2. Authentication Flow

```
[ Unauthenticated User ]
       |
       v Visits /admin/dashboard
[ Next.js Middleware (src/middleware.ts) ]
       |
       |-- Token absent? --> Redirects to /admin/login?next=/admin/dashboard
       |
       v Calls supabase.auth.getUser()
[ Supabase Auth Server (JWT Validation) ]
       |
       |-- Invalid JWT? --> Clears cookies, redirects to /admin/login
       |
       v Queries public.admin_profiles (is_active = true)
[ RBAC Authorization Check ]
       |
       |-- No admin profile or is_active = false? --> Redirects to /admin/login?error=unauthorized
       |
       v Valid active administrator
[ Admin Dashboard Layout & Server Components ]
```

---

## 3. Role-Based Access Control (RBAC) Matrix

LibraGems establishes four distinct administrative tiers:

| Role Identifier | Title | Primary Scope | Permitted Capabilities | Prohibited Capabilities |
|---|---|---|---|---|
| `super_admin` | Principal Administrator | Full Platform Governance | Schema alterations, team invitations, role changes, gemstone creation/editing/publishing/deletion, enquiry status changes, spam deletion, full activity audit viewing. | Cannot delete own admin account while logged in. |
| `administrator` | Senior Gemologist & Trading Lead | Daily Trading Operations | Full gemstone catalogue management, category management, enquiry status advancement, internal notes authoring, full activity audit viewing. | Cannot provision new team members or modify super_admin accounts. |
| `product_manager` | Inventory & Lapidary Manager | Gemstone Inventory & Media | Create, edit, publish, and unpublish gemstones and categories; upload/delete photography in `gemstone-images` bucket. Read-only enquiry access. | Cannot mutate enquiries, change client statuses, or access team administration. |
| `enquiry_manager` | Client Relations Desk | B2B Commercial Intake | Read, advance, and reply to client enquiries; manage client priority and internal gemological notes. Read-only gemstone catalogue access. | Cannot modify gemstone lot specifications, CIBJO disclosures, categories, or team settings. |

---

## 4. Session & Token Lifecycle

- **Transport:** HTTP-only, secure, `SameSite=Lax` cookies managed via `@supabase/ssr`.
- **Auto-Refresh:** Handled transparently by `src/lib/supabase/middleware.ts` on inbound HTTP requests.
- **Verification Rule:** `supabase.auth.getUser()` is called exclusively instead of `getSession()`, guaranteeing that revoked sessions, suspended accounts, or altered database credentials are immediately detected.
- **Audit Logging:** Successful login and logout actions automatically insert tamper-evident audit records into `public.activity_logs`.
