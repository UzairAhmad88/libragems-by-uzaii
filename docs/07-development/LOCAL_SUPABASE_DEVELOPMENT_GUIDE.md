# Local Supabase Development & Migration Guide

**Project:** Libra Gems & Trading Co., Ltd.  
**CLI Tooling:** Supabase CLI via `npx supabase`  

---

## 1. Prerequisites

- Node.js 18+ (tested on Node.js v24.18.0)
- Docker Desktop (required for running local Supabase container stack)
- Git

---

## 2. Directory Structure

```
supabase/
├── config.toml           # Supabase CLI project configuration
├── migrations/           # Versioned PostgreSQL migration scripts
│   ├── 20261110000001_initial_schema.sql
│   ├── 20261110000002_indexes_constraints.sql
│   ├── 20261110000003_rls_policies.sql
│   ├── 20261110000004_storage_policies.sql
│   └── 20261110000005_seed_reference_data.sql
└── seed/
    └── development_seed.sql
```

---

## 3. Running Supabase Locally

### 3.1 Start Local Stack
```bash
npx supabase start
```
This boots PostgreSQL, Supabase Auth (GoTrue), Storage API, and Supabase Studio at `http://localhost:54323`.

### 3.2 Apply Migrations
```bash
npx supabase db reset
```
This recreates the local database and executes all migration scripts in order.

### 3.3 Create Local Admin User
1. Open Supabase Studio at `http://localhost:54323`.
2. Under **Authentication > Users**, invite or add an administrative user (e.g. `admin@libragems.internal`).
3. Under **SQL Editor**, link the user into `public.admin_profiles`:
```sql
INSERT INTO public.admin_profiles (id, full_name, email, role, is_active)
VALUES (
  '<USER_UUID_FROM_AUTH>',
  'Principal Administrator',
  'admin@libragems.internal',
  'super_admin',
  true
);
```

---

## 4. Environment Variables (`apps/web/.env.local`)

When connecting the Next.js app to local Supabase:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<ANON_KEY_FROM_SUPABASE_STATUS>
SUPABASE_SERVICE_ROLE_KEY=<SERVICE_ROLE_KEY_FROM_SUPABASE_STATUS>
```

When connecting to Supabase Cloud, replace these keys with values from the Supabase Project Dashboard (Settings > API).
