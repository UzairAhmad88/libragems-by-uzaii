# Supabase Storage Bucket & Object Security Specification

**Project:** Libra Gems & Trading Co., Ltd.  
**Storage Engine:** Supabase Storage (`storage.buckets` & `storage.objects`)  
**File:** `supabase/migrations/20261110000004_storage_policies.sql`  

---

## 1. Storage Bucket Overview

The platform uses a dedicated storage bucket for high-resolution photography, macro gemological documentation, and certificate scans:

| Parameter | Configuration |
|---|---|
| Bucket Identifier | `gemstone-images` |
| Public Read Access | `true` (Objects served via global Supabase CDN) |
| Max File Size Limit | `10,485,760` bytes (10 Megabytes) |
| Allowed MIME Types | `image/jpeg`, `image/png`, `image/webp`, `image/svg+xml` |

---

## 2. Storage Row Level Security (RLS)

Storage policies are implemented directly on `storage.objects`:

```sql
-- Public Read Access
CREATE POLICY "Public can view gemstone images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'gemstone-images');

-- Admin Upload Authorization
CREATE POLICY "Admins can upload gemstone images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'gemstone-images' 
    AND public.has_role('super_admin', 'administrator', 'product_manager')
  );

-- Admin Mutation & Deletion
CREATE POLICY "Admins can update gemstone images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'gemstone-images' 
    AND public.has_role('super_admin', 'administrator', 'product_manager')
  );

CREATE POLICY "Admins can delete gemstone images"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'gemstone-images' 
    AND public.has_role('super_admin', 'administrator', 'product_manager')
  );
```

---

## 3. Image Optimization & Architectural Fallbacks

In development and offline environments, the website displays 10 architectural SVG vector illustrations stored locally in `apps/web/public/images/gemstones/`:
- `hessonite-parcel-overview.svg`, `hessonite-macro.svg`, `hessonite-scale.svg`
- `turquoise-overview.svg`, `turquoise-macro.svg`, `turquoise-matrix.svg`
- `rubellite-table-view.svg`, `rubellite-profile-view.svg`, `rubellite-facet-flash.svg`
- `hessonite-thumb.svg`
