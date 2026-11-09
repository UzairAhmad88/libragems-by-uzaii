# Business Requirements Document (BRD)
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** BRD-001  
**Version:** 1.0  
**Phase:** Phase 00 – Business Discovery & Requirements Validation  
**Role:** Senior Business Systems Analyst & Product Manager  
**Date:** November 10, 2026  
**Status:** Baseline Draft – Subject to Client Confirmation

---

## 1. Business Context & Strategic Purpose

### 1.1 The Business
**Libra Gems & Trading Co., Ltd.** is an international gemstone trading enterprise situated in the historic gemstone trading hub of Bang Rak along Charoen Krung Road in Bangkok, Thailand. 

Bangkok represents the global nexus for colored gemstone treatment, cutting, sorting, and international distribution. Libra Gems specializes in sourcing, evaluating, and supplying:
1. **Rough Gemstones** (uncut mineral crystals and alluvial pebbles for lapidary processing)
2. **Minerals & Rare Geological Specimens** (natural aesthetic crystals for institutions and collectors)
3. **Stone Beads & Semi-Finished Materials** (calibrated bead strands and drill blanks for volume manufacturers)
4. **Faceted / Cut Gemstones** (precision-cut colored stones for fine jewellery houses and bespoke jewelers)

### 1.2 Core Business Objective
The primary business objective is to deploy an **authoritative, high-trust digital portfolio and B2B enquiry acquisition engine** at `https://libragems.net` that:
- Establishes a commanding, premium online presence reflecting decades of physical market expertise.
- Attracts qualified international B2B gemstone buyers through organic search engine discovery.
- Bridges initial digital curiosity into direct, human-to-human commercial negotiations via **WhatsApp, encrypted email, and secure enquiry forms**.
- Communicates transparent gemological attributes without misleading claims, building institutional trust.

---

## 2. Business Model: Enquiry-Driven Trade vs. E-Commerce

A foundational finding of this business discovery is that **LibraGems must NOT operate as a standard consumer e-commerce storefront**.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       WHY B2B ENQUIRY-LED MODEL?                            │
├──────────────────────────────────────┬──────────────────────────────────────┤
│ Conventional B2C E-Commerce (Fails)  │ LibraGems B2B Enquiry Model (Target) │
├──────────────────────────────────────┼──────────────────────────────────────┤
│ • Fixed price per item               │ • Negotiated wholesale pricing (POA) │
│ • Instant shopping cart & checkout   │ • Custom lot inspection & provenance  │
│ • Low-value consumer transactions    │ • High-value commercial consignments │
│ • Generic credit card processing     │ • Wire transfer / Escrow / B2B terms │
│ • Mass retail customer base          │ • Vetted long-term wholesale buyers  │
│ • Return-heavy consumer policies     │ • Inspection period with lab memos   │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

### Strategic Justifications for Enquiry-Only Model:
1. **Dynamic Lot Pricing:** Wholesale gemstone rough and high-grade cut stones fluctuate based on daily market demand, currency swings, parcel yield expectations, and buyer volume. Fixed retail prices undermine wholesale bargaining power.
2. **High Transaction Values:** Gemstone parcels frequently trade in sums ranging from \$5,000 to over \$100,000 USD. Such transactions cannot be processed through consumer merchant accounts (Stripe/PayPal) due to fraud risk, chargeback liability, and regulatory anti-money laundering (AML) controls.
3. **Inspection & Certification Protocols:** Commercial buyers require video under calibrated daylight (D65 / 5500K), microscopic inclusion footage, independent laboratory memos (GIT, AIGS, GIA, Lotus), or in-person viewing at the Bangkok showroom before finalizing purchase contracts.
4. **Inventory Dynamics:** Bulk rough materials (such as Hessonite Garnet and Turquoise) are often sold in variable-weight lots or split according to buyer cutting specifications.

---

## 3. Target Audiences & Stakeholder Personas

The platform's user experience and architectural requirements are dictated by four primary B2B buyer archetypes:

### Persona 1: The International Gemstone Dealer / Lapidary Wholesaler
- **Profile:** Operates cutting factories in Jaipur (India), Idar-Oberstein (Germany), or Chanthaburi (Thailand).
- **Primary Need:** Continuous supply of commercial-grade rough materials (Hessonite Garnet, Turquoise) with reliable yield, honest grading, and predictable parcel weights.
- **Key Decision Triggers:** Honest disclosure of treatments (stabilization vs natural), origin transparency, bulk per-gram or per-kilogram pricing, and clear parcel photos showing color distribution.
- **Conversion Channel:** WhatsApp for rapid negotiation and photo/video exchange.

### Persona 2: The Fine Jewellery Manufacturer / Production House
- **Profile:** Manufactures seasonal collections for designer labels across North America, Europe, and East Asia.
- **Primary Need:** Matched pairs, calibrated suites, or specific cut stones (such as Afghanistan Rubellite) meeting exact dimensional tolerances ($L \times W \times D$) and color uniformity.
- **Key Decision Triggers:** Precise millimeter measurements, origin substantiation, laboratory certification, and verifiable company credentials.
- **Conversion Channel:** Formal Web Enquiry Form detailing required specifications and delivery timelines.

### Persona 3: High-End Private Gemstone Collector
- **Profile:** Connoisseur acquiring rare single stones and museum-grade crystal specimens.
- **Primary Need:** Unique, untreated, or provenance-verified stones (e.g., exceptional Afghan Rubellite with intense purplish-red saturation).
- **Key Decision Triggers:** Flawless visual presentation, gemological origin reports, rarity storytelling, and discrete executive handling.
- **Conversion Channel:** Private executive telephone call or direct email with Naeem Khan / Sana Khan.

### Persona 4: Institutional / Corporate Procurement Officer
- **Profile:** Procurement specialist for luxury houses or international mineral galleries.
- **Primary Need:** Legitimate business registration, compliance with international export regulations, formal invoices, and secure payment escrow.
- **Key Decision Triggers:** Thai DBD registration, business address verification, clear export documentation, and professional communication.
- **Conversion Channel:** Corporate email (`info@libragems.net`) and formal quotation workflow.

---

## 4. Business Conversion Channels & Lead Capture Workflow

The website serves as an intake funnel designed to guide visitors toward qualified commercial interactions.

```
                              VISITOR TRAFFIC
                 (Organic Search, Referrals, Trade Directories)
                                     │
                                     ▼
                        LIBRA GEMS DIGITAL PLATFORM
                   (Homepage, Catalogue, Landing Pages)
                                     │
          ┌──────────────────────────┼──────────────────────────┐
          │                          │                          │
          ▼                          ▼                          ▼
  WHATSAPP ENQUIRY            WEB ENQUIRY FORM           PHONE / EMAIL
  • Product-specific deep link• Structured data capture  • Direct Bangkok landline
  • Instant mobile routing    • Stored in Supabase DB    • Monitored info@ inbox
  • Direct trader chat        • Alert to sales team      • Executive escalation
          │                          │                          │
          └──────────────────────────┼──────────────────────────┘
                                     │
                                     ▼
                        COMMERCIAL NEGOTIATION
                • Video inspection & lab documentation
                • Quotation & MOQ negotiation
                • Pro-forma invoice & insured freight
```

### 4.1 Channel 1: Context-Aware WhatsApp Deep-Linking (P0)
- Every product detail page must feature a prominent, sticky WhatsApp action button.
- The link must prefill a dynamic, contextual enquiry string:  
  *Example:* `Hello LibraGems, I am interested in inquiring about the Commercial-Quality Rough Hessonite Garnet (Ref: LG-HG-001) listed on your website. Please share lot details, availability, and pricing.`
- Must support automated routing to designated primary or secondary executive numbers based on confirmed client assignment.

### 4.2 Channel 2: Structured Web Enquiry Form (P0)
- Designed to capture rigorous commercial criteria without introducing friction.
- Form fields:
  1. **Full Name** (Required)
  2. **Business Email** (Required, RFC-compliant format)
  3. **Company / Organization Name** (Optional, recommended)
  4. **Country / Region** (Optional dropdown or text)
  5. **Product of Interest** (Pre-populated from viewing context or selectable)
  6. **Quantity / Specific Requirements** (e.g., "5 kg rough", "single stone > 5ct")
  7. **Message** (Required, sanitized multiline text)
  8. **Privacy & Communication Consent** (Checkbox)
- Backend action: Database insert with status `'new'`, instant email alert to `info@libragems.net` via Resend, and immediate client-side confirmation feedback.

### 4.3 Channel 3: Executive Phone & Direct Email (P0)
- Clear display of verified Bangkok telephone: `+66 2 238 1934`.
- Verified corporate email: `info@libragems.net` with encrypted mailto parameters.

---

## 5. Commercial Governance, Compliance & Trade Policies

### 5.1 Pricing Policy (Price on Application - POA)
- No public prices will be displayed on the website.
- In gemstone trading, listing static prices alienates wholesale clients (who resell into secondary markets) and invites inventory arbitrage.
- Product listings will display: *"Price on Application – Wholesale & Trade Enquiries Welcome"*.

### 5.2 Minimum Order Quantity (MOQ) Logic
- Rough stones (Hessonite Garnet, Turquoise): Sold by parcel weight (e.g., minimum 500g or 1kg lot).
- Cut stones (Afghanistan Rubellite): Sold as individual single stones or matched sets.

### 5.3 Provenance & Origin Substantiation Policy
- **Rule of Non-Fabrication:** The website will never advertise a geographic origin (e.g., Sri Lanka, Afghanistan, Arizona, Iran) unless verified by traceable chain of custody or an independent accredited gemological laboratory.
- Where origin cannot be verified scientifically, the material will be honestly labeled: *"Origin: Undetermined / Global Trade Market"*.

### 5.4 Treatment Disclosure Standard
- Adherence to **CIBJO (The World Jewellery Confederation)** disclosure standards:
  - **N (Natural / Untreated):** No enhancements applied.
  - **E (Commonly Enhanced):** Traditional heating or oiling.
  - **T (Treated / Stabilized):** Polymer impregnation, diffusion, irradiation, or dyeing.
- Mandatory disclosure on Turquoise (stabilized vs natural) and Rubellite (heated/irradiated vs untreated).

### 5.5 Regulatory & Trade Compliance (Thailand)
- Compliance with the **Thai Gem and Jewelry Traders Association (TGJTA)** ethical trading guidelines.
- Compliance with the **Department of Business Development (DBD)** of the Ministry of Commerce of Thailand.
- Export clearance handling: Customs declaration, CITES validation (where applicable), and VAT exemption on wholesale export shipments outside Thailand.

---

## 6. Functional Requirements Summary

| Functional Area | Business Requirement | Priority | Business Value |
|---|---|---|---|
| **Branding & Presentation** | Showcase the 4 core categories and 3 initial gemstone lines in an ultra-premium visual aesthetic. | **P0** | Builds instant international credibility and authority. |
| **Direct Lead Acquisition** | Product-specific WhatsApp links and multi-channel enquiry capture. | **P0** | Drives immediate commercial conversations and trade deals. |
| **Catalogue Management** | Secure admin portal for creating, updating, and archiving gemstone listings with rich specs. | **P1** | Empowers company staff to manage inventory without developer intervention. |
| **Enquiry CRM** | Secure administrative dashboard to inspect, triage, and update incoming customer leads. | **P1** | Eliminates dropped leads and establishes customer tracking. |
| **Search Engine Discovery** | Dedicated, SEO-optimized landing pages targeting high-intent commercial B2B keywords. | **P0** | Generates sustainable, zero-acquisition-cost organic inbound inquiries. |
| **Data Protection & Legal** | Transparent Privacy Policy and Terms of Trade adhering to international data standards. | **P1** | Protects corporate liability and builds enterprise buyer trust. |

---

## 7. Business Readiness Sign-Off Requirements

Before any production deployment or commercial marketing:
1. Client executive (Naeem Khan or Sana Khan) must sign off on the public-facing brand representation.
2. Verified bank account and invoicing details must be established for payment fulfillment.
3. Communication protocol for responding to WhatsApp and web inquiries within 4 business hours must be assigned to designated staff.

---
*Document produced as part of LibraGems Phase 00 Deliverables.*
