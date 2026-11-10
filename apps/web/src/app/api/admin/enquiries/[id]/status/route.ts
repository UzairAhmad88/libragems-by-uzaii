import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { defaultEmailService } from "@/lib/email/email-service";
import { Database } from "@/types/database.types";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const admin = await getCurrentAdmin();

    if (isSupabaseConfigured() && !admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const json = await request.json();
    const { status, priority, internalNotes, notifyCustomer, updateDetails } = json;

    if (isSupabaseConfigured()) {
      const adminClient = createAdminClient();
      if (adminClient) {
        const { data: dbEnq, error: fetchErr } = await adminClient
          .from("enquiries")
          .select("*")
          .or(`id.eq.${id},reference_number.eq.${id}`)
          .single();

        if (fetchErr || !dbEnq) {
          return NextResponse.json(
            { success: false, error: "Enquiry not found" },
            { status: 404 }
          );
        }

        const updateData: Database["public"]["Tables"]["enquiries"]["Update"] = {
          updated_at: new Date().toISOString(),
        };

        if (status) updateData.status = status;
        if (priority) updateData.priority = priority;
        if (internalNotes !== undefined) updateData.internal_notes = internalNotes;

        await adminClient.from("enquiries").update(updateData).eq("id", dbEnq.id);

        // Optionally send status update email if requested
        if (notifyCustomer && status && status !== dbEnq.status) {
          await defaultEmailService.sendStatusUpdate({
            enquiryId: dbEnq.id,
            referenceNumber: dbEnq.reference_number,
            customerName: dbEnq.customer_name,
            customerEmail: dbEnq.email,
            gemstoneInterest: dbEnq.gemstone_interest,
            newStatus: status,
            updateDetails: updateDetails || undefined,
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("[Enquiry Status Update API] Error:", err);
    return NextResponse.json(
      { success: false, error: (err as Error)?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
