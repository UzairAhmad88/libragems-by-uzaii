import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database.types";
import { isSupabaseConfigured } from "./config";

let clientInstance: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Creates or retrieves the singleton Supabase client for client-side components.
 * Returns null if Supabase credentials are not configured.
 */
export function createClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!clientInstance) {
    clientInstance = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  return clientInstance;
}
