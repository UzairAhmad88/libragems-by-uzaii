# PostgreSQL Database Schema Specification

**Project:** Libra Gems & Trading Co., Ltd.  
**Database Engine:** PostgreSQL 15+ (via Supabase)  
**Schema:** `public`  
**Migration Files:** `supabase/migrations/20261110000001_initial_schema.sql` through `20261110000005_seed_reference_data.sql`  

---

## 1. Schema Overview

The database architecture is normalized to 3NF, prioritizing data integrity, CIBJO disclosure compliance, and strict segregation between public and administrative entities.

```
+---------------------+           +------------------------+
| gemstone_categories | 1 ----- * |       gemstones        |
+---------------------+           +------------------------+
                                              | 1
                                              |
                                              | *
+---------------------+           +------------------------+
|      enquiries      | * ----- 1 |    gemstone_images     |
+---------------------+           +------------------------+
          | *
          | (assigned_to)
          | 1
+---------------------+           +------------------------+
|    admin_profiles   | 1 ----- * |     activity_logs      |
+---------------------+           +------------------------+
```

---

## 2. Table Specifications

### 2.1 `public.gemstone_categories`
Primary taxonomy classification for raw minerals, rough parcels, cut gems, and calibrated beads.
- `id` (UUID, Primary Key, default `gen_random_uuid()`)
- `name` (TEXT, NOT NULL)
- `slug` (TEXT, NOT NULL, UNIQUE)
- `description` (TEXT)
- `display_order` (INTEGER, NOT NULL, DEFAULT 0)
- `is_active` (BOOLEAN, NOT NULL, DEFAULT true)
- `created_at`, `updated_at` (TIMESTAMPTZ, auto-updated via trigger)

### 2.2 `public.gemstones`
Comprehensive gemological and commercial inventory table.
- `id` (UUID, Primary Key)
- `category_id` (UUID, Foreign Key -> `gemstone_categories(id)`, ON DELETE RESTRICT)
- `name` (TEXT, NOT NULL)
- `slug` (TEXT, NOT NULL, UNIQUE)
- `reference_code` (TEXT, NOT NULL, UNIQUE) — e.g. `LG-HG-001`
- `species` (TEXT, NOT NULL) — e.g. Grossular Garnet, Elbaite Tourmaline
- `variety` (TEXT, NOT NULL) — e.g. Hessonite Garnet, Rubellite
- `form` (TEXT, CHECK `IN ('rough_parcel', 'mineral_rough', 'cut_stone', 'calibrated_beads')`)
- `weight_unit` (TEXT, CHECK `IN ('g', 'kg', 'ct', 'pcs')`)
- `weight_display` (TEXT, NOT NULL)
- `origin_country` (TEXT, NOT NULL)
- `origin_verification_status` (TEXT, CHECK `IN ('verified', 'trade_consensus', 'unverified')`)
- `origin_disclosure_note` (TEXT, NOT NULL)
- `cibjo_code` (TEXT, CHECK `IN ('N', 'T', 'E')`)
- `treatment_status` (TEXT, CHECK `IN ('natural_untreated', 'stabilized', 'enhanced', 'unverified')`)
- `treatment_disclosure` (TEXT, NOT NULL)
- `certification_status` (TEXT, CHECK `IN ('certified', 'pending_verification', 'available_on_request')`)
- `availability_status` (TEXT, CHECK `IN ('in_stock', 'reserved', 'sold', 'archived')`)
- `price_type` (TEXT, DEFAULT `'price_on_application'`)
- `is_published` (BOOLEAN, DEFAULT true)
- `is_featured` (BOOLEAN, DEFAULT false)

### 2.3 `public.gemstone_images`
Digital asset registry linking cloud storage objects to gemstone records.
- `id` (UUID, Primary Key)
- `gemstone_id` (UUID, Foreign Key -> `gemstones(id)`, ON DELETE CASCADE)
- `storage_path` (TEXT, NOT NULL)
- `alt_text` (TEXT, NOT NULL)
- `caption` (TEXT)
- `view_type` (TEXT, CHECK `IN ('overview', 'macro', 'scale', 'table', 'pavilion', 'facet', 'matrix')`)
- `display_order` (INTEGER, DEFAULT 0)
- `is_primary` (BOOLEAN, DEFAULT false)
- `is_placeholder` (BOOLEAN, DEFAULT false)

### 2.4 `public.enquiries`
B2B trade inquiries transmitted via web form, WhatsApp or email intake.
- `id` (UUID, Primary Key)
- `reference_number` (TEXT, UNIQUE) — Auto-generated format: `ENQ-YYYY-XXXXX`
- `gemstone_id` (UUID, Nullable Foreign Key -> `gemstones(id)`)
- `customer_name` (TEXT, NOT NULL)
- `company_name` (TEXT)
- `email` (TEXT, NOT NULL)
- `phone`, `country` (TEXT)
- `gemstone_interest` (TEXT, NOT NULL)
- `quantity_specs` (TEXT)
- `subject` (TEXT, NOT NULL)
- `message` (TEXT, NOT NULL)
- `status` (TEXT, CHECK `IN ('new', 'in_review', 'replied', 'qualified', 'converted', 'closed', 'spam')`, DEFAULT `'new'`)
- `priority` (TEXT, CHECK `IN ('low', 'normal', 'high', 'urgent')`, DEFAULT `'normal'`)
- `internal_notes` (TEXT)
- `assigned_to` (UUID, Foreign Key -> `auth.users(id)`)
- `ip_hash` (TEXT) — Salted SHA-256 hash for audit and anti-spam

### 2.5 `public.admin_profiles`
Administrative identity and RBAC tier table linked to Supabase Auth.
- `id` (UUID, Primary Key, Foreign Key -> `auth.users(id)`, ON DELETE CASCADE)
- `full_name` (TEXT, NOT NULL)
- `email` (TEXT, NOT NULL, UNIQUE)
- `role` (TEXT, CHECK `IN ('super_admin', 'administrator', 'product_manager', 'enquiry_manager')`)
- `is_active` (BOOLEAN, NOT NULL, DEFAULT true)

### 2.6 `public.activity_logs`
Append-only tamper-evident administrative audit log.
- `id` (UUID, Primary Key)
- `admin_id` (UUID, Foreign Key -> `auth.users(id)`, ON DELETE CASCADE)
- `action` (TEXT, CHECK `IN ('create', 'update', 'delete', 'publish', 'unpublish', 'archive', 'status_change', 'assign', 'role_change', 'login', 'logout')`)
- `entity_type` (TEXT, CHECK `IN ('gemstone', 'category', 'enquiry', 'admin', 'auth', 'system')`)
- `entity_id` (TEXT)
- `description` (TEXT, NOT NULL)
- `metadata` (JSONB, DEFAULT `'{}'::jsonb`)
- `created_at` (TIMESTAMPTZ, DEFAULT now())

---

## 3. Database Triggers & Sequence Functions

1. **`handle_updated_at()`**: Automatically updates `updated_at = now()` before any UPDATE on mutable tables.
2. **`generate_enquiry_reference()`**: Reads sequence `public.enquiry_ref_seq` to assign reference codes formatted as `ENQ-YYYY-XXXXX` on new enquiry INSERTs.
