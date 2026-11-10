# Row Level Security (RLS) & Authorization Policies

**Project:** Libra Gems & Trading Co., Ltd.  
**Database Engine:** PostgreSQL 15+ (via Supabase)  
**File:** `supabase/migrations/20261110000003_rls_policies.sql`  

---

## 1. Security Architecture Principles

1. **Deny-by-Default:** Every table has Row Level Security explicitly enabled (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`).
2. **Strict Public Isolation:** Public anonymous visitors have **zero** access to customer enquiries, admin profiles, or audit logs.
3. **Explicit Dual-Clause UPDATE Policies:** In accordance with production PostgreSQL guidelines, all `UPDATE` policies declare both `USING` and `WITH CHECK` conditions to prevent unauthorized data transitions.
4. **RLS Recursion Prevention:** Security helper functions (`is_admin()`, `get_admin_role()`, `has_role()`) are defined with `SECURITY DEFINER SET search_path = public, pg_temp` to prevent cyclic recursion when evaluating `public.admin_profiles`.

---

## 2. Table-by-Table Policy Audit

### 2.1 `gemstone_categories`
- `SELECT (public)`: `USING (is_active = true)`
- `SELECT (admin)`: `USING (public.is_admin())`
- `INSERT (admin)`: `WITH CHECK (public.has_role('super_admin', 'administrator', 'product_manager'))`
- `UPDATE (admin)`: `USING (...) WITH CHECK (public.has_role('super_admin', 'administrator', 'product_manager'))`
- `DELETE (admin)`: `USING (public.has_role('super_admin', 'administrator'))`

### 2.2 `gemstones`
- `SELECT (public)`: `USING (is_published = true AND availability_status != 'archived')`
- `SELECT (admin)`: `USING (public.is_admin())`
- `INSERT (admin)`: `WITH CHECK (public.has_role('super_admin', 'administrator', 'product_manager'))`
- `UPDATE (admin)`: `USING (...) WITH CHECK (public.has_role('super_admin', 'administrator', 'product_manager'))`
- `DELETE (admin)`: `USING (public.has_role('super_admin', 'administrator'))`

### 2.3 `gemstone_images`
- `SELECT (public)`: Only for published gemstones (`EXISTS (SELECT 1 FROM gemstones WHERE id = gemstone_id AND is_published = true)`)
- `SELECT (admin)`: `USING (public.is_admin())`
- `INSERT/UPDATE/DELETE`: Permitted for `super_admin`, `administrator`, and `product_manager`.

### 2.4 `enquiries`
- `INSERT (public)`: Allowed with input sanity validation (`customer_name IS NOT NULL`, `email IS NOT NULL`, etc.)
- `SELECT (public)`: **DENIED (0 rows returned to public / anon)**
- `SELECT (admin)`: `USING (public.is_admin())`
- `UPDATE (admin)`: Allowed for `super_admin`, `administrator`, `enquiry_manager`.
- `DELETE (admin)`: Strictly restricted to `super_admin` only (spam cleanup).

### 2.5 `admin_profiles`
- `SELECT (public)`: **DENIED**
- `SELECT (self)`: `USING (id = auth.uid())`
- `SELECT (super_admin / administrator)`: Allowed to view all profiles.
- `INSERT/DELETE`: Restricted to `super_admin` only. Cannot delete own account (`id != auth.uid()`).

### 2.6 `activity_logs`
- `SELECT (public)`: **DENIED**
- `SELECT (admin)`: Allowed for all active admins.
- `INSERT (admin)`: `WITH CHECK (public.is_admin() AND admin_id = auth.uid())`
- `UPDATE/DELETE`: **DENIED** (Audit trail is immutable).
