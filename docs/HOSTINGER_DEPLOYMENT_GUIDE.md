# Hostinger Node.js Web App Deployment Manual
**Target Platform:** Hostinger Cloud / VPS Node.js Web App  
**Domain:** `https://libragems1.com/`  
**Node.js Runtime:** 20.x or 22.x LTS  
**Application Entrypoint:** `server.js`  

---

## 1. Prerequisites & Hostinger HPanel Configuration

### 1.1 Node.js Application Setup
1. Log in to **Hostinger HPanel** (`https://hpanel.hostinger.com/`).
2. Navigate to **Websites** -> Select `libragems1.com` -> **Node.js**.
3. Configure the Node.js environment:
   - **Node.js Version:** `20.x` or `22.x`
   - **Application Root:** `/` (or root where repository is cloned)
   - **Application Startup File:** `server.js`
   - **Application Mode:** `production`

---

## 2. Environment Variables Checklist
Add the following key-value pairs into the **Environment Variables** section in HPanel:

| Variable Name | Required Value / Description | Example |
|---|---|---|
| `NODE_ENV` | `production` | `production` |
| `PORT` | `3000` (or system port assigned by Hostinger) | `3000` |
| `NEXT_PUBLIC_SITE_URL` | Live canonical website domain | `https://libragems1.com` |
| `EMAIL_PROVIDER` | `smtp` | `smtp` |
| `SMTP_HOST` | Hostinger SMTP Server | `smtp.hostinger.com` |
| `SMTP_PORT` | Hostinger SSL Port | `465` |
| `SMTP_SECURE` | SSL/TLS enabled | `true` |
| `SMTP_USER` | Business mailbox address | `info@libragems1.com` |
| `SMTP_PASSWORD` | **Mailbox password created in Hostinger Email** | `[Your_Hostinger_Mailbox_Password]` |
| `SMTP_FROM_NAME` | Outbound sender display name | `Libra Gems & Trading Co.` |
| `SMTP_FROM_EMAIL` | Outbound sender address | `info@libragems1.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | `https://[project-id].supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for admin/outbox operations | `eyJhbGciOi...` |
| `CRON_SECRET` | Secret token to secure `/api/cron/process-outbox` | `[generate-random-32-char-string]` |

> [!IMPORTANT]
> Never commit `SMTP_PASSWORD` or `SUPABASE_SERVICE_ROLE_KEY` to git. Only set them directly in Hostinger HPanel.

---

## 3. Git Deployment & Build Workflow

### Step 1: Connect Repository or Pull Latest Code
```bash
git fetch origin main
git checkout main
git pull origin main
```

### Step 2: Install Monorepo Dependencies
```bash
npm ci
```

### Step 3: Run Production Build
```bash
npm run build
```
*Note:* The build script compiles Next.js in standalone mode and packages native runtime dependencies (including `nodemailer`) into `.next/standalone/node_modules/`.

### Step 4: Restart Node.js Application
In Hostinger HPanel, click **Restart** under the Node.js Web App dashboard.

---

## 4. Cron Job Configuration (Email Outbox Queue Worker)
To ensure reliable email retries, schedule an automated HTTP request to the cron route every 5 minutes:

1. In HPanel, navigate to **Advanced** -> **Cron Jobs**.
2. Select **Custom** schedule: `*/5 * * * *` (Every 5 minutes).
3. Set the command:
```bash
curl -X GET -H "Authorization: Bearer YOUR_CRON_SECRET" https://libragems1.com/api/cron/process-outbox
```

---

## 5. Verification & Health Monitoring

### 5.1 HTTP Health Verification
```bash
curl -I https://libragems1.com/
```
Expected response: `HTTP/2 200` with security headers (`X-Frame-Options: DENY`, `Strict-Transport-Security`, `Content-Security-Policy`).

### 5.2 Favicon Verification
Open `https://libragems1.com/` in Chrome or Edge and verify:
- Tab icon displays the transparent, brilliant golden diamond cut gemstone (no green box, no globe icon).
- Header navigation contains brand logotype and "Enquire on Lots" button. No WhatsApp pill in header.

### 5.3 Live Enquiry Test
1. Visit `https://libragems1.com/contact`.
2. Fill out and submit the enquiry form.
3. Verify notification received at `info@libragems1.com` and customer receipt in test mailbox.

---

## 6. Rollback Procedures
If an unforeseen issue occurs during deployment:
1. Identify the previous stable commit SHA (e.g. `git log -n 5 --oneline`).
2. Roll back working tree:
```bash
git checkout <previous-commit-sha>
npm run build
```
3. Click **Restart** in Hostinger HPanel.
