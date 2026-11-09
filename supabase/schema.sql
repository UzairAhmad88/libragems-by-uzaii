-- LibraGems proposed starting schema.
-- Review and add/test RLS policies before production use.

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text,
  short_description text,
  description text,
  origin text,
  quality_notes text,
  specifications jsonb not null default '{}'::jsonb,
  status text not null default 'draft'
    check (status in ('draft','published','unavailable','archived')),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  country text,
  product_id uuid references public.products(id) on delete set null,
  product_name_snapshot text,
  quantity_or_specs text,
  message text not null,
  status text not null default 'new'
    check (status in ('new','in_progress','responded','closed','spam')),
  created_at timestamptz not null default now()
);

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'editor'
    check (role in ('admin','editor')),
  created_at timestamptz not null default now()
);

create index if not exists products_status_slug_idx
  on public.products(status, slug);

create index if not exists enquiries_status_created_idx
  on public.enquiries(status, created_at desc);

-- Enable RLS. Add reviewed policies before connecting the public application.
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.enquiries enable row level security;
alter table public.admin_profiles enable row level security;
