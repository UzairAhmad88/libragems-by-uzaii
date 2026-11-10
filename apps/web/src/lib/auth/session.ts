import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminRole } from "@/types/database.types";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export interface CurrentAdmin {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  isActive: boolean;
}

/**
 * Retrieves the currently authenticated admin user and their database profile.
 * Returns null if unauthenticated or if Supabase is not configured.
 */
export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id, full_name, email, role, is_active")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.is_active) {
    return null;
  }

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    role: profile.role,
    isActive: profile.is_active,
  };
}

/**
 * Enforces admin authentication for Server Components and Server Actions.
 * Redirects to /admin/login if not authenticated or lacks required role.
 */
export async function requireAdmin(allowedRoles?: AdminRole[]): Promise<CurrentAdmin> {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login?mode=unconfigured");
  }

  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(admin.role)) {
    redirect("/admin/dashboard?error=insufficient_permissions");
  }

  return admin;
}
