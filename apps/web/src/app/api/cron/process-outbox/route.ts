import { NextRequest, NextResponse } from "next/server";
import { processOutbox } from "@/lib/email/outbox-processor";

export async function GET(request: NextRequest) {
  return handleOutboxCron(request);
}

export async function POST(request: NextRequest) {
  return handleOutboxCron(request);
}

async function handleOutboxCron(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET?.trim();

  // 1. Mandatory server secret validation (fails closed)
  if (!cronSecret) {
    console.error("[Cron] CRON_SECRET is not configured on server.");
    return NextResponse.json(
      { success: false, error: "Cron authorization secret is not configured on server." },
      { status: 500 }
    );
  }

  // 2. Prohibit secrets passed in query string (prevents credential leakage in server logs)
  if (request.nextUrl.searchParams.has("secret")) {
    return NextResponse.json(
      {
        success: false,
        error: "Query string secrets are prohibited for security. Use Authorization: Bearer header.",
      },
      { status: 400 }
    );
  }

  // 3. Enforce Bearer token authorization header
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { success: false, error: "Unauthorized cron execution." },
      { status: 401 }
    );
  }

  try {
    const limitParam = request.nextUrl.searchParams.get("limit");
    const parsedLimit = limitParam ? parseInt(limitParam, 10) : 25;
    const limit = isNaN(parsedLimit) ? 25 : Math.max(1, Math.min(parsedLimit, 100));

    const result = await processOutbox({ limit });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (err: unknown) {
    console.error("[Cron] Outbox execution failed:", err);
    return NextResponse.json(
      { success: false, error: (err as Error)?.message || "Outbox processing error" },
      { status: 500 }
    );
  }
}
