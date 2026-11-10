"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid business email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  next: z.string().optional(),
});

export type AuthState = {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

export async function loginAdminAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") || undefined,
  };

  const parseResult = loginSchema.safeParse(rawData);

  if (!parseResult.success) {
    return {
      error: "Please correct the errors in the form.",
      fieldErrors: parseResult.error.flatten().fieldErrors,
    };
  }

  const { email, password, next } = parseResult.data;

  if (!isSupabaseConfigured()) {
    return {
      error:
        "Database authentication is not configured in this environment. Please provide NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  const supabase = await createClient();
  if (!supabase) {
    return {
      error: "Unable to initialize authentication client.",
    };
  }

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError || !authData.user) {
    return {
      error: "Invalid email credentials or password.",
    };
  }

  // Verify that the user has an active admin profile
  const { data: profile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("id, role, is_active")
    .eq("id", authData.user.id)
    .single();

  if (profileError || !profile || !profile.is_active) {
    // Revoke session immediately
    await supabase.auth.signOut();
    return {
      error: "Access restricted. You do not have active administrative credentials.",
    };
  }

  // Log successful login activity
  await supabase.from("activity_logs").insert({
    admin_id: authData.user.id,
    action: "login",
    entity_type: "auth",
    entity_id: authData.user.id,
    description: `Admin ${email} signed into the administration dashboard`,
    metadata: {
      email,
      role: profile.role,
    },
  });

  const destination = next && next.startsWith("/admin") ? next : "/admin/dashboard";
  redirect(destination);
}

export async function logoutAdminAction(): Promise<void> {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (supabase) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase.from("activity_logs").insert({
          admin_id: user.id,
          action: "logout",
          entity_type: "auth",
          entity_id: user.id,
          description: `Admin signed out of the administration dashboard`,
          metadata: {},
        });
      }

      await supabase.auth.signOut();
    }
  }

  redirect("/admin/login");
}
