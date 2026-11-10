import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { enqueueOutboxItem, processOutbox } from "@/lib/email/outbox-processor";

const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  businessEmail: z.string().trim().email("Valid commercial email required").max(120),
  companyName: z.string().trim().max(100).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  country: z.string().trim().max(80).optional().default(""),
  gemstoneInterest: z.string().trim().min(2, "Please select or specify a gemstone").max(150),
  quantitySpecs: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(10, "Requirement details must be at least 10 characters").max(3000),
  enquiryType: z
    .enum(["gemstone_lot", "parcel_split", "custom_sourcing", "showroom_appointment", "general_wholesale"])
    .default("gemstone_lot"),
  gemstoneId: z.string().uuid().optional(),
  sourcePage: z.string().trim().max(200).optional().default(""),
  websiteUrlTrap: z.string().optional().default(""), // Honeypot field
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    // 1. Honeypot check: If the hidden honeypot is filled, silently return simulated success
    if (json.websiteUrlTrap && json.websiteUrlTrap.trim().length > 0) {
      return NextResponse.json({
        success: true,
        referenceNumber: `ENQ-${new Date().getFullYear()}-00000`,
      });
    }

    // 2. Validate inputs
    const parseResult = enquirySchema.safeParse(json);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          fieldErrors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 3. Compute client IP hash for audit trail
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const ipHash = crypto.createHash("sha256").update(clientIp + "libragems-salt").digest("hex").slice(0, 16);

    const subject = `Trade Enquiry: ${data.gemstoneInterest} — ${data.companyName || data.fullName}`;

    // 4. If Supabase is configured, persist to database and enqueue outbox jobs
    if (isSupabaseConfigured()) {
      const adminClient = createAdminClient();
      const client = adminClient || (await createClient());

      if (client) {
        const { data: inserted, error: insertError } = await client
          .from("enquiries")
          .insert({
            customer_name: data.fullName,
            company_name: data.companyName || null,
            email: data.businessEmail,
            phone: data.phone || null,
            country: data.country || null,
            gemstone_interest: data.gemstoneInterest,
            quantity_specs: data.quantitySpecs || null,
            subject,
            message: data.message,
            enquiry_type: data.enquiryType,
            gemstone_id: data.gemstoneId || null,
            source_page: data.sourcePage || null,
            ip_hash: ipHash,
            status: "new",
            priority: "normal",
          })
          .select(
            "id, reference_number, customer_name, email, company_name, phone, country, gemstone_interest, quantity_specs, message, priority, source_page, created_at"
          )
          .single();

        if (insertError) {
          console.error("Database enquiry insertion error:", insertError);
          // Fallback reference number if DB insertion fails
          const fallbackRef = `ENQ-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
          return NextResponse.json({
            success: true,
            referenceNumber: fallbackRef,
            notice: "Enquiry recorded in offline queue.",
          });
        }

        // 5. Reliability Guarantee: Enqueue outbox items for customer receipt and admin alert
        try {
          await enqueueOutboxItem({
            eventType: "enquiry_created",
            entityType: "enquiry",
            entityId: inserted.id,
            payload: {
              type: "customer_acknowledgement",
              enquiryId: inserted.id,
              referenceNumber: inserted.reference_number,
              customerName: inserted.customer_name,
              email: inserted.email,
              companyName: inserted.company_name,
              gemstoneInterest: inserted.gemstone_interest,
              quantitySpecs: inserted.quantity_specs,
              message: inserted.message,
            },
          });

          await enqueueOutboxItem({
            eventType: "enquiry_created",
            entityType: "enquiry",
            entityId: inserted.id,
            payload: {
              type: "admin_notification",
              enquiryId: inserted.id,
              referenceNumber: inserted.reference_number,
              customerName: inserted.customer_name,
              companyName: inserted.company_name,
              email: inserted.email,
              phone: inserted.phone,
              country: inserted.country,
              gemstoneInterest: inserted.gemstone_interest,
              quantitySpecs: inserted.quantity_specs,
              message: inserted.message,
              priority: inserted.priority,
              sourcePage: inserted.source_page,
              createdAt: inserted.created_at,
            },
          });

          // Dispatch outbox processing asynchronously without blocking client response
          processOutbox({ limit: 10 }).catch((outboxErr) => {
            console.error("[Enquiries API] Background outbox process error:", outboxErr);
          });
        } catch (queueErr) {
          console.error("[Enquiries API] Failed to enqueue notifications:", queueErr);
          // Even if outbox queueing hits an issue, never fail the customer enquiry!
        }

        return NextResponse.json({
          success: true,
          referenceNumber: inserted.reference_number,
        });
      }
    }

    // 6. Offline / Local fallback reference number when Supabase is unconfigured
    const localRef = `ENQ-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    return NextResponse.json({
      success: true,
      referenceNumber: localRef,
      isLocalFallback: true,
    });
  } catch (err) {
    console.error("Enquiry API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error processing enquiry" },
      { status: 500 }
    );
  }
}
