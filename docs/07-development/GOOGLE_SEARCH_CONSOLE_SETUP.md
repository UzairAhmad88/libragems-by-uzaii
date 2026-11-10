# Google Search Console Onboarding & Verification Playbook
## Libra Gems & Trading Co., Ltd. — Operational Runbook

- **Project:** LibraGems B2B Digital Platform
- **Phase:** 06 — Technical SEO, Structured Data, Dynamic XML Sitemap & Search Readiness
- **Document ID:** `OPS-GSC-07-04`
- **Location:** Bangkok, Thailand
- **Canonical Domain:** `libragems.net`
- **Primary Property:** Domain Property (`libragems.net`)

---

## 1. Objectives & Ground Rules

This runbook guides the business stakeholders and engineering leads through setting up, verifying, and configuring **Google Search Console (GSC)** for Libra Gems & Trading Co., Ltd.

### Important Search Engine Realities
- **No Guaranteed Rankings:** Google Search Central determines indexing, crawling frequencies, and ranking positions through algorithmic assessment. Implementing technical SEO guarantees crawlability and compliance, not immediate top-tier rankings.
- **Controlled Scope:** Never attempt DNS modifications without corporate administrative credentials.

---

## 2. Property Type Selection: Domain vs. URL-Prefix

Google Search Console offers two distinct property architectures:

| Feature | Domain Property (`libragems.net`) | URL-Prefix Property (`https://libragems.net`) |
| :--- | :--- | :--- |
| **Coverage** | All subdomains (`www`, `preview`, apex), all protocols (`http`, `https`) | Exact specified protocol and prefix only |
| **Verification Method** | DNS TXT Record (Mandatory) | HTML Tag, HTML File, DNS, GTM, Google Analytics |
| **Recommended Use** | **Primary Corporate Governance** | Staging / Specific Directory Isolation |

### Recommendation
Create a **Domain Property** (`libragems.net`) as the primary administrative container. In addition, create a **URL-Prefix Property** (`https://libragems.net`) to enable individual URL inspection and feature testing where Domain properties have delayed reporting.

---

## 3. Step-by-Step Ownership Verification

### Method A: DNS TXT Record (Recommended for Domain Property)

1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Sign in with the corporate Google Account (`info@libragems.net` or approved administrator email).
3. Select **Add Property** and choose the **Domain** card.
4. Enter `libragems.net` (omit `https://` and trailing slashes).
5. Google will provide a unique DNS TXT verification token:
   ```
   google-site-verification=abc123xyz-unique-token-here
   ```
6. Access your authoritative DNS management console (e.g., Cloudflare, Route53, Namecheap):
   - **Record Type:** `TXT`
   - **Name / Host:** `@` or `libragems.net`
   - **TTL:** `Auto` or `300 seconds`
   - **Content / Value:** `google-site-verification=abc123xyz-unique-token-here`
7. Save the DNS record and wait 2 to 5 minutes for worldwide DNS propagation.
8. Return to Google Search Console and click **Verify**.

### Method B: Meta Tag Verification (Fallback for URL-Prefix Property)

If DNS access is temporarily restricted during initial staging:
1. Select the **URL-Prefix** property type and enter `https://libragems.net`.
2. Under "Other verification methods", select **HTML tag**.
3. Copy the provided `<meta name="google-site-verification" content="..." />` tag.
4. Set the verification code in your deployment environment variable:
   ```env
   NEXT_PUBLIC_GSC_VERIFICATION=your-unique-verification-code
   ```
5. In Next.js, add the tag to `apps/web/src/app/layout.tsx`:
   ```typescript
   export const metadata: Metadata = {
     // ...
     verification: {
       google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
     },
   };
   ```
6. Deploy the changes to production and click **Verify** in Search Console.

---

## 4. XML Sitemap Submission

Once ownership is successfully verified:

1. In the left navigation sidebar of GSC, navigate to **Indexing** → **Sitemaps**.
2. Under "Add a new sitemap", enter:
   ```
   sitemap.xml
   ```
3. Click **Submit**.
4. **Status Evaluation:**
   - **Success (Green):** Googlebot has fetched the sitemap and extracted the URL inventory.
   - **Couldn't fetch:** Verify that the server returns HTTP 200 for `https://libragems.net/sitemap.xml` and that Cloudflare/firewall is not blocking user-agent `Googlebot`.
   - **Has errors:** Inspect individual line items for malformed URLs or syntax issues.
5. Google will typically report 11 discovered pages (8 static pages + 3 gemstone lots).

---

## 5. First-Week Operational Monitoring Routine

### Day 1: URL Inspection & Test Live URL
For the three flagship gemstone lots:
1. `/gemstones/hessonite-garnet`
2. `/gemstones/turquoise`
3. `/gemstones/afghanistan-rubellite`

Perform the following:
- Paste the full URL into the top search bar ("Inspect any URL in...").
- Click **Test Live URL**.
- Verify:
  - **HTTP Response:** 200 OK
  - **User-Agent:** Googlebot Desktop / Googlebot Smartphone
  - **Page Fetch:** Successful
  - **Indexing Allowed:** Yes
  - **Structured Data:** Valid `Breadcrumbs` detected. Valid `Product` detected with physical properties.

### Day 3 to 7: Indexing & Coverage Audit
1. Navigate to **Indexing** → **Pages**.
2. Verify that pages transition from "Discovered - currently not indexed" to "Crawled - currently not indexed" to "Indexed".
3. Check the "Why pages aren't indexed" table:
   - All `/admin/*` and `/api/*` routes should be flagged as "Blocked by robots.txt" or "Excluded by 'noindex' tag" — this is the expected and desired state.
   - Zero public canonical routes should appear under "Not found (404)" or "Server error (5xx)".

### Week 2: Core Web Vitals & Search Performance
1. Check **Experience** → **Core Web Vitals**:
   - Largest Contentful Paint (LCP) target: < 2.5 seconds
   - Interaction to Next Paint (INP) target: < 200 milliseconds
   - Cumulative Layout Shift (CLS) target: < 0.1
2. Review **Performance** → **Search Results**:
   - Track initial impressions on high-intent B2B gemological queries: "rough hessonite garnet bangkok", "commercial turquoise wholesale thailand", "rubellite tourmaline cut stones".

