# Database Design (Proposed)

## products
- id: UUID primary key
- name: text not null
- slug: text unique not null
- category: text
- short_description: text
- description: text
- origin: text nullable (verified only)
- quality_notes: text nullable
- specifications: JSONB (only confirmed attributes)
- status: draft / published / unavailable / archived
- seo_title: text
- seo_description: text
- created_at, updated_at: timestamptz

## product_images
- id: UUID primary key
- product_id: UUID foreign key
- storage_path: text
- alt_text: text
- sort_order: integer
- created_at: timestamptz

## enquiries
- id: UUID primary key
- name: text not null
- email: text not null
- company: text nullable
- country: text nullable
- product_id: UUID nullable
- product_name_snapshot: text nullable
- quantity_or_specs: text nullable
- message: text not null
- status: new / in_progress / responded / closed / spam
- created_at: timestamptz

## admin_profiles
- id: UUID references auth.users
- display_name: text
- role: admin / editor
- created_at: timestamptz

## Security policies
- Anonymous users can select published products only.
- Anonymous users cannot select enquiries or admin profiles.
- Enquiry creation must be mediated by a server endpoint with validation and abuse protection.
- Only authorized admin/editor roles can mutate catalogue records.
- Storage policies restrict uploads and deletion to authorized administrators.
- Add indexes for product slug/status and enquiry creation/status.
