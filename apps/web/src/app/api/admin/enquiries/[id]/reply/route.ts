import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { defaultEmailService } from "@/lib/email/email-service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const admin = await getCurrentAdmin();

    // Verify authentication if Supabase is active
    if (isSupabaseConfigured() && !admin) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const json = await request.json();
    const responseMessage = json.responseMessage?.trim();

    if (!responseMessage || responseMessage.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Response message must be at least 10 characters long.",
        },
        { status: 400 }
      );
    }

    const adminName = admin?.fullName || json.adminName || "Trading Desk";
    const adminTitle = "Bangkok Gemological Trading Desk";

    let enquiryData: {
      id: string;
      reference_number: string;
      customer_name: string;
      email: string;
      gemstone_interest: string;
    } | null = null;

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
            { success: false, error: "Enquiry dossier not found." },
            { status: 404 }
          );
        }

        enquiryData = dbEnq;
      }
    }

    if (!enquiryData) {
      // Demo / fallback mode
      enquiryData = {
        id,
        reference_number: id.startsWith("ENQ-") ? id : `ENQ-2026-${id}`,
        customer_name: json.customerName || "Julian Vance",
        email: json.customerEmail || "j.vance@vancegems.co.uk",
        gemstone_interest: json.gemstoneInterest || "Commercial-Quality Rough Hessonite Garnet",
      };
    }

    // 1. Dispatch official admin response
    const emailResult = await defaultEmailService.sendAdminResponse({
      enquiryId: enquiryData.id,
      referenceNumber: enquiryData.reference_number,
      customerName: enquiryData.customer_name,
      customerEmail: enquiryData.email,
      gemstoneInterest: enquiryData.gemstone_interest,
      responseMessage,
      adminName,
      adminTitle,
    });

    // 2. Transition enquiry status to 'replied'
    if (isSupabaseConfigured()) {
      const adminClient = createAdminClient();
      if (adminClient) {
        await adminClient
          .from("enquiries")
          .update({
            status: "replied",
            updated_at: new Date().toISOString(),
          })
          .eq("id", enquiryData.id);
      }
    }

    return NextResponse.json({
      success: true,
      messageId: emailResult.messageId,
      status: "replied",
      isSimulated: emailResult.isSimulated,
      error: emailResult.error,
    });
  } catch (err: unknown) {
    console.error("[Admin Reply API] Error:", err);
    return NextResponse.json(
      { success: false, error: (err as Error)?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
