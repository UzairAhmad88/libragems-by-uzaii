import { NextRequest, NextResponse } from "next/server";
import { defaultEmailProvider } from "@/lib/email/resend-provider";
import { getWebhookSecret } from "@/lib/email/email-config";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { EmailEventStatus, Database } from "@/types/database.types";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    const secret = getWebhookSecret();

    let event: {
      type?: string;
      data?: {
        email_id?: string;
        created_at?: string;
        bounce?: { message?: string };
      };
    } | null = null;

    if (secret) {
      const verification = await defaultEmailProvider.verifyWebhook(
        rawBody,
        headers,
        secret
      );

      if (!verification.isValid) {
        return NextResponse.json(
          { success: false, error: verification.error || "Invalid webhook signature" },
          { status: 401 }
        );
      }
      event = verification.event as typeof event;
    } else {
      // In development / demo mode when secret is not configured
      try {
        event = JSON.parse(rawBody);
      } catch {
        return NextResponse.json(
          { success: false, error: "Invalid JSON payload" },
          { status: 400 }
        );
      }
    }

    const eventType = event?.type;
    const emailId = event?.data?.email_id;

    if (!event || !eventType || !emailId) {
      return NextResponse.json(
        { success: false, error: "Missing event type or email_id in payload" },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      const adminClient = createAdminClient();
      if (adminClient) {
        let newStatus: EmailEventStatus | null = null;
        const updateData: Database["public"]["Tables"]["email_events"]["Update"] = {
          updated_at: new Date().toISOString(),
        };

        const eventTime = event.data?.created_at || new Date().toISOString();

        switch (eventType) {
          case "email.sent":
            newStatus = "sent";
            updateData.sent_at = eventTime;
            break;

          case "email.delivered":
            newStatus = "delivered";
            updateData.delivered_at = eventTime;
            break;

          case "email.bounced":
            newStatus = "bounced";
            updateData.failed_at = eventTime;
            updateData.last_error =
              event.data?.bounce?.message || "Delivery bounced by recipient mail server.";
            break;

          case "email.complained":
            newStatus = "suppressed";
            updateData.failed_at = eventTime;
            updateData.last_error = "Spam complaint reported by recipient.";
            break;

          default:
            // Unhandled event (e.g. email.opened, email.clicked)
            break;
        }

        if (newStatus) {
          updateData.status = newStatus;

          const { error: updateError } = await adminClient
            .from("email_events")
            .update(updateData)
            .eq("provider_message_id", emailId);

          if (updateError) {
            console.error("[Webhook] Failed to update email_event status:", updateError);
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      eventType,
      emailId,
      processedAt: new Date().toISOString(),
    });
  } catch (err: unknown) {
    console.error("[Webhook] Exception during Resend webhook processing:", err);
    return NextResponse.json(
      { success: false, error: (err as Error)?.message || "Webhook processing exception" },
      { status: 500 }
    );
  }
}
