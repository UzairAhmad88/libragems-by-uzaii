# Supabase Setup

1. Create a Supabase project owned by the business.
2. Configure the project URL and anon key in the web app environment.
3. Review `schema.sql` with the developer before applying it.
4. Enable Row Level Security on every application table.
5. Create the first admin user through a controlled process.
6. Never expose the service-role key in browser code.
7. Configure storage buckets and upload policies for approved product images.
8. Test anonymous and admin access separately.

The SQL file is a starting schema and must be reviewed and completed with production RLS policies before deployment.
