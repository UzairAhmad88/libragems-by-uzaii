import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";
import { isSupabaseConfigured } from "./config";

/**
 * Creates a server-side Supabase client for Server Components, Server Actions, and Route Handlers.
 * In Next.js 15, cookies() is asynchronous and awaited.
 * Returns null if Supabase is not configured.
 */
export async function createClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignore when called from Server Component where cookies cannot be mutated directly
          }
        },
      },
    }
  );
}
