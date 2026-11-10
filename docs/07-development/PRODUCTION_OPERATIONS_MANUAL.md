# Libra Gems & Trading Co., Ltd.
## Production Operations Manual

**Document Reference:** `docs/07-development/PRODUCTION_OPERATIONS_MANUAL.md`  
**Classification:** Internal Operating Procedure (IOP) / Client Administration Manual  
**Target Audience:** Libra Gems Trading Directors, Product Managers & Operations Desk  
**Version:** 1.0.0 (Production Release)  
**Security Notice:** Contains zero passwords, keys, or raw credentials. Strictly operational workflows.

---

## 1. Administration Dashboard Access

### 1.1 Portal URL and Authentication
- **Access URL:** `https://libragems.net/admin/login`
- **Authentication Engine:** Supabase GoTrue Auth with secure, HTTP-only, encrypted cookie sessions.
- **Session Duration:** 7 days active rolling session with automatic silent refresh. Idle expiration after 24 hours of inactivity.
- **Access Control:** Every route under `/admin/*` is protected by Next.js middleware and server-side RBAC validation. Non-authenticated users or users lacking an entry in `public.admin_users` are immediately redirected to `/admin/login`.

### 1.2 Administrative Roles and Permissions Matrix
The platform implements three distinct operational roles:

| Capability / Section | `super_admin` | `trading_manager` | `product_manager` |
|---|:---:|:---:|:---:|
| **Catalogue: View Gemstones** | Yes | Yes | Yes |
| **Catalogue: Create / Edit Gemstones** | Yes | Yes | Yes |
| **Enquiries: View Inbound Inquiries** | Yes | Yes | No |
| **Enquiries: Update Status / Internal Notes** | Yes | Yes | No |
| **Enquiries: Send Email Replies** | Yes | Yes | No |
| **Communications: View Outbox & Events** | Yes | Yes | No |
| **Communications: Trigger Manual Outbox Retry** | Yes | Yes | No |
| **Team Management: Provision / Revoke Admins** | Yes | No | No |
| **System Settings & Audit Log Inspection** | Yes | No | No |

---

## 2. Gemstone Inventory & Catalogue Management

### 2.1 Adding a New Gemstone Lot (`/admin/gemstones/new`)
To publish a new gemstone lot to the international catalogue:
1. Navigate to **Catalogue > Add Gemstone**.
2. **Identification & Basic Metadata:**
   - **Gemstone Name:** Official descriptive title (e.g., *Untreated Sri Lankan Blue Sapphire Rough*).
   - **Slug:** URL-safe string auto-generated from name (e.g., `untreated-sri-lankan-blue-sapphire`).
   - **Reference Code:** Unique internal stock identifier formatted as `LG-[CODE]-[LOT#]` (e.g., `LG-SAP-001`).
   - **Category:** Select Rough Gemstones, Mineral Specimens, Cut Gemstones, or Beads.
3. **Gemological & Trade Specifications:**
   - **Species & Variety:** Formal mineralogical names (e.g., Corundum / Blue Sapphire).
   - **Weight & Measure:** Exact metric weight (grams or carats) and sieve size / mm dimensions.
   - **Hardness & Specific Gravity:** Reference figures from standard mineralogical constants.
   - **Origin Disclosure (CIBJO Aligned):** Specify Country, Region, and Verification Status (`verified`, `trade_consensus`, or `unverified`).
   - **Treatment Status:** Conforming strictly to CIBJO codes (`N` for Untreated, `H` for Heated, `T` for Treated/Stabilized, etc.).
   - **Certification Status:** Select if accompanied by GIT, AIGS, Lotus, or GIA memo, or marked as *Available upon request*.
4. **Publishing Controls:**
   - Toggle **Published** to make the lot immediately visible on the public website.
   - Toggle **Featured** to highlight the lot on the corporate homepage hero carousel.

> [!CAUTION]
> **Non-Fabrication Policy:** Never mark a gemstone's origin as `verified` or treatment as `natural_untreated` without an accredited gemological laboratory memo in physical custody. Misrepresentation compromises international trade reputation and violates export regulations.

---

## 3. Digital Asset & Image Management

### 3.1 Image Upload Specifications
The platform enforces hardened image upload policies via Supabase Storage:
- **Target Bucket:** `gemstone-images`
- **Permitted File Formats:** JPEG (`.jpg`, `.jpeg`), PNG (`.png`), and WebP (`.webp`).
- **Prohibited Formats:** Scalable Vector Graphics (`.svg`), HTML, executable scripts, and ZIP archives are blocked at the database storage policy level to prevent Stored Cross-Site Scripting (XSS).
- **Maximum File Size:** 10 MB per file.
- **Recommended Asset Dimensions:**
  * Parcel / Table Overview: $2400 \times 1600\text{ px}$ (3:2 luxury ratio).
  * Macro / Inclusions: $2000 \times 2000\text{ px}$ (1:1 square).
  * Scale / Metric: $2400 \times 1600\text{ px}$ showing stones against millimeter gauge.

### 3.2 Associating Images with Lots
1. Navigate to **Catalogue > Edit Gemstone > Photography**.
2. Upload high-resolution photographs under standardized 5500K daylight lighting.
3. Assign **View Type** (`overview`, `macro`, `scale`, `table`, `pavilion`, or `facet`).
4. Set the primary hero image by toggling **Primary Image**.
5. Provide descriptive alt text for accessibility and image SEO.

---

## 4. Enquiry Lifecycle & Communication Automation

### 4.1 Inbound Enquiry Flow
When a wholesale buyer submits an enquiry via the public website:
1. The submission is validated against strict schema limits and checked by the rate limiter (maximum 5 submissions per 10 minutes per IP).
2. The enquiry is stored in `public.enquiries` with status `new` and a unique reference code (`ENQ-2026-XXXXX`).
3. Two asynchronous notification tasks are atomically committed to `public.email_outbox`:
   - **Customer Acknowledgement Email:** Confirms enquiry receipt with parcel reference code.
   - **Internal Trading Desk Alert:** Alerts the Bangkok sales desk to review the lot inquiry.
4. The background cron processor (`/api/cron/process-outbox`) picks up the outbox jobs within 5 minutes, contacts Resend via TLS, and dispatches the emails.

### 4.2 Managing Enquiry Statuses (`/admin/enquiries/[id]`)
Trading personnel must update enquiry statuses to maintain workflow visibility:
- `new`: Inbound inquiry awaiting initial review.
- `reviewing`: Trading desk is assessing lot inventory, sieve weights, or export logistics.
- `quoted`: Price on application (POA) quote and preliminary pro-forma memo delivered to client.
- `in_progress`: Contract negotiation, lab memo commissioning, or escrow settlement underway.
- `closed`: Transaction completed, lot dispatched, or inquiry concluded.
- `archived`: Non-responsive or historic inquiry retained for audit compliance.

### 4.3 Sending Formal Desk Replies (Admin Response Composer)
To send an official communication to an enquirer:
1. Open the enquiry detail page at `/admin/enquiries/[id]`.
2. Scroll to the **Trading Desk Response Composer**.
3. Compose the message using standard trade phrasing (pricing per gram/carat, Bangkok laboratory memo options, FOB Bangkok / CIF delivery terms).
4. Click **Send Formal Reply**.
5. The message is queued in the outbox, dispatched via Resend from `enquiries@libragems.net`, and permanently logged in the enquiry's communication timeline.

---

## 5. Communications Monitoring & Audit Trail

### 5.1 Outbox Queue Health (`/admin/communications/outbox`)
- **Normal State:** The outbox queue should show 0 pending items outside of the 5-minute cron dispatch window.
- **Failed Deliveries:** If an email fails (e.g. invalid client email address or Resend rate limit), its status switches to `failed` with the error reason recorded.
- **Manual Retry:** Trading managers can click **Retry Delivery** on any failed item to immediately requeue it.

### 5.2 Email Delivery Events (`/admin/communications/email-events`)
Real-time delivery telemetry delivered via Resend Webhooks:
- `email.sent`: Dispatched from Resend mail servers.
- `email.delivered`: Successfully accepted by the recipient's mail exchanger.
- `email.opened`: Client opened the message (pixel tracking).
- `email.bounced`: Mailbox does not exist or rejected by recipient server.
- `email.complained`: Recipient flagged message as spam (requires immediate review).

---

## 6. Administrator Account Management

### 6.1 Provisioning a New Trading Desk Administrator
Administrative users cannot self-register through the public website. Only existing `super_admin` users may provision new team accounts:
1. Log in to the Supabase Dashboard (`https://supabase.com/dashboard/project/<project-ref>`).
2. Navigate to **Authentication > Users > Add User**.
3. Enter the employee's official corporate email (e.g. `somchai@libragems.net`) and a temporary high-entropy password.
4. Open the **SQL Editor** and run the role assignment query:
   ```sql
   INSERT INTO public.admin_users (id, email, full_name, role, is_active)
   SELECT id, email, 'Somchai Prasert', 'trading_manager', true
   FROM auth.users
   WHERE email = 'somchai@libragems.net'
   ON CONFLICT (id) DO UPDATE SET
     role = EXCLUDED.role,
     is_active = true;
   ```
5. Instruct the user to log in at `https://libragems.net/admin/login` and immediately update their password.

### 6.2 Revoking Administrator Access
To immediately terminate administrative access for departing staff:
1. Update `public.admin_users`:
   ```sql
   UPDATE public.admin_users
   SET is_active = false
   WHERE email = 'departed_staff@libragems.net';
   ```
2. In Supabase Dashboard under **Authentication > Users**, select the user and click **Ban User** or **Delete User**. This immediately invalidates active refresh tokens.

---

## 7. Incident Handling & Operational Troubleshooting

### Problem 1: Automated Outbox Emails Not Dispatching
- **Symptom:** Outbox queue items remain in `pending` status for $>10$ minutes.
- **Root Cause:** Vercel cron job not firing or `CRON_SECRET` mismatch.
- **Resolution:**
  1. Inspect Vercel Dashboard under **Project Settings > Cron Jobs**. Verify that `/api/cron/process-outbox` is listed and shows successful runs.
  2. Verify that the `CRON_SECRET` environment variable in Vercel matches the authorization bearer header.
  3. Manually trigger the cron endpoint via PowerShell or curl:
     ```powershell
     Invoke-RestMethod -Uri "https://libragems.net/api/cron/process-outbox" -Headers @{ Authorization = "Bearer <YOUR_CRON_SECRET>" }
     ```

### Problem 2: Resend Webhook Failing with HTTP 500
- **Symptom:** Email events are not appearing in `/admin/communications/email-events`.
- **Root Cause:** `RESEND_WEBHOOK_SECRET` is missing in Vercel production environment variables (the endpoint intentionally fails closed in production mode).
- **Resolution:**
  1. Go to the Resend Dashboard under **Webhooks**.
  2. Copy the **Signing Secret** (`whsec_...`).
  3. Add `RESEND_WEBHOOK_SECRET` to Vercel Environment Variables.
  4. Redeploy the latest commit to apply the new secret.

### Problem 3: Image Upload Rejected in Admin Panel
- **Symptom:** Admin user receives an error when uploading gemstone photographs.
- **Root Cause:** File format is SVG or exceeds 10 MB limit.
- **Resolution:**
  1. Confirm the image is saved as `.jpg`, `.png`, or `.webp`.
  2. Compress images exceeding 10 MB using standard photo editing tools prior to upload.

