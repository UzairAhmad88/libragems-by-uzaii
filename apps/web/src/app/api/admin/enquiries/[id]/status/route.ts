import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { canManageEnquiries } from "@/lib/auth/permissions";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { defaultEmailService } from "@/lib/email/email-service";
import { Database, EnquiryStatus, EnquiryPriority } from "@/types/database.types";

export const dynamic = "force-dynamic";

const VALID_STATUSES: EnquiryStatus[] = [
  "new",
  "in_review",
  "replied",
  "qualified",
  "converted",
  "closed",
  "spam",
];

const VALID_PRIORITIES: EnquiryPriority[] = ["low", "normal", "high", "urgent"];

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const safeId = (id ?? "").trim();
    if (!safeId) {
      return NextResponse.json(
        { success: false, error: "Enquiry ID or reference number is required." },
        { status: 400 }
      );
    }

    const admin = await getCurrentAdmin();

    // 1. Mandatory authentication check
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Active administrative session required." },
        { status: 401 }
      );
    }

    // 2. Strict RBAC authorization check (enquiries:write required)
    if (!canManageEnquiries(admin.role)) {
      return NextResponse.json(
        {
          success: false,
          error: `Forbidden. Role '${admin.role}' does not possess permissions to update enquiry status or dossier notes.`,
        },
        { status: 403 }
      );
    }

    let json: Record<string, unknown>;
    try {
      json = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Malformed JSON in request body." },
        { status: 400 }
      );
    }

    if (!json || typeof json !== "object" || Array.isArray(json)) {
      return NextResponse.json(
        { success: false, error: "Request payload must be a valid JSON object." },
        { status: 400 }
      );
    }

    const rawStatus = typeof json.status === "string" ? json.status.trim() : undefined;
    const rawPriority = typeof json.priority === "string" ? json.priority.trim() : undefined;
    const internalNotes =
      typeof json.internalNotes === "string"
        ? json.internalNotes.trim()
        : json.internalNotes === null
        ? null
        : undefined;
    const notifyCustomer = Boolean(json.notifyCustomer);
    const updateDetails =
      typeof json.updateDetails === "string" ? json.updateDetails.trim() : undefined;

    if (rawStatus === undefined && rawPriority === undefined && internalNotes === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: "At least one field to update (status, priority, internalNotes) must be provided.",
        },
        { status: 400 }
      );
    }

    if (rawStatus !== undefined && !VALID_STATUSES.includes(rawStatus as EnquiryStatus)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status '${rawStatus}'. Valid values are: ${VALID_STATUSES.join(", ")}.`,
        },
        { status: 400 }
      );
    }

    if (rawPriority !== undefined && !VALID_PRIORITIES.includes(rawPriority as EnquiryPriority)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid priority '${rawPriority}'. Valid values are: ${VALID_PRIORITIES.join(", ")}.`,
        },
        { status: 400 }
      );
    }

    const status = rawStatus as EnquiryStatus | undefined;
    const priority = rawPriority as EnquiryPriority | undefined;

    if (isSupabaseConfigured()) {
      const adminClient = createAdminClient();
      if (adminClient) {
        const { data: dbEnq, error: fetchErr } = await adminClient
          .from("enquiries")
          .select("*")
          .or(`id.eq.${safeId},reference_number.eq.${safeId}`)
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
