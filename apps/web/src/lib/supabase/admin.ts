import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import { isSupabaseAdminConfigured } from "./config";

/**
 * Creates an administrative Supabase client using the service role key.
 * This client bypasses Row Level Security and should ONLY be used in secure server environments.
 * Returns null if service role credentials are not provided.
 */
export function createAdminClient() {
  if (!isSupabaseAdminConfigured()) {
    return null;
  }

  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
