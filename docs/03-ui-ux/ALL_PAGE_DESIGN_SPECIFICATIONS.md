# Complete Website Page Design Specifications
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** PDS-001  
**Version:** 1.0  
**Phase:** Phase 01 – Premium Brand Identity, UI/UX Architecture & Website Design System  
**Role:** Senior UX Architect & Creative Director  
**Date:** November 10, 2026  
**Status:** Approved Master Specification

---

## 1. Overview & Sitemap Architecture

This document establishes the exhaustive design, layout, content structure, and responsive behaviors for all ten pages in the approved LibraGems sitemap:

```
                                LIBRA GEMS SITEMAP
                                        │
     ┌──────────────┬───────────────────┼───────────────────┬──────────────┐
     │              │                   │                   │              │
     ▼              ▼                   ▼                   ▼              ▼
  HOMEPAGE       ABOUT US           GEMSTONES       QUALITY/SOURCING    INSIGHTS
    (`/`)       (`/about`)        (`/gemstones`)  (`/quality-sourcing`)(`/insights`)
                                        │
                 ┌──────────────────────┼──────────────────────┐
                 │                      │                      │
                 ▼                      ▼                      ▼
          HESSONITE GARNET          TURQUOISE          AFGHAN RUBELLITE
     (`/gemstones/hessonite`)  (`/gemstones/turquoise`) (`/gemstones/rubellite`)
                                                               │
                                         ┌─────────────────────┴──────────┐
                                         ▼                                ▼
                                    CONTACT US                       LEGAL PAGES
                                   (`/contact`)                  (`/privacy`, `/terms`)
```

---

## 2. Page 01: Homepage (`/`)

- **Primary Goal:** Establish institutional brand prestige, introduce core trading activities, and route buyers to the three initial gemstones.
- **Sections:**
  1. **Global Site Header:** Sticky, ivory canvas, typographic logotype, navigation links.
  2. **Editorial Hero Section:** Asymmetric 2-column layout (`1.1fr / 0.9fr`), H1 `"A Considered Approach to Natural Gemstones"`, primary CTA `"Explore Gemstones"`, secondary CTA `"Contact LibraGems"`, authentic multi-gemstone studio inventory photo (`4:3`).
  3. **Credibility & Business Introduction:** H2 `"Rooted in Bangkok. Connected Worldwide."` highlighting physical presence in Bang Rak, Bangkok. Three pillar cards (Rough Lots, Cut Stones, Absolute Disclosure).
  4. **Featured Gemstone Collection:** 3-column grid featuring the 3 launch products (Rough Hessonite, Turquoise, Cut Rubellite) with status badges, category tags, spec summaries, and `"View Gemstone Details →"` links.
  5. **Quality & Sourcing Spotlight:** Two-column split featuring high-res studio macro photo of gem inspection under 5500K daylight lamp paired with editorial text on CIBJO treatment disclosure.
  6. **International Enquiry Call-to-Action:** Deep Forest Green panel (`#174C38`) with white typography, driving direct WhatsApp consultation and web form submissions.
  7. **Global Site Footer:** 4-column corporate footer.

---

## 3. Page 02: About Us (`/about`)

- **Route:** `/about`
- **Primary Goal:** Document company background, verified Bangkok trading credentials, and business philosophy without fabricating history.
- **Sections:**
  1. **Page Hero:** Editorial heading H1 `"Gemstone Trading with Integrity and Geological Precision."` Warm beige background (`#F3EFE5`).
  2. **Corporate Identity & Trading Hub:** Verified profile of Libra Gems & Trading Co., Ltd. located at 1394 Charoen Krung Road, Bang Rak, Bangkok. Explains Bangkok’s role as the global nexus for colored gemstone trading and treatment testing.
  3. **Core Business Activities:**
     - *Rough Gemstones:* Supplying alluvial crystalline rough to cutting factories in Jaipur, Idar-Oberstein, and Chanthaburi.
     - *Minerals & Geological Specimens:* Aesthetic natural crystals for collectors.
     - *Stone Beads & Calibrated Material:* Bulk material for jewelry manufacturers.
     - *Faceted / Cut Gemstones:* High-grade single stones and suites.
  4. **The Principle of Non-Fabrication:** Prominent editorial callout stating LibraGems’ commitment: Never claiming unverified mine-direct relationships, never disguising treatments, and never guaranteeing market appreciation.
  5. **Executive Contacts:** Profiles of Naeem Khan and Sana Khan with verified direct contact points.
  6. **Enquiry CTA Banner:** Inviting international dealers to schedule in-person viewing at the Bangkok office or request parcel video inspection.

---

## 4. Page 03: Gemstone Catalogue Hub (`/gemstones`)

- **Route:** `/gemstones`
- **Primary Goal:** Provide a structured, searchable overview of the company’s current physical inventory.
- **Sections:**
  1. **Catalogue Header & Category Filter:** H1 `"Selected Gemstone Offerings"`, brief description of parcel lots and cut stones. Category filter pills: *All Materials*, *Rough Gemstones*, *Minerals / Rough*, *Cut Gemstones*.
  2. **Product Grid:** Responsive 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`).
     - Card 1: Commercial-Quality Rough Hessonite Garnet.
     - Card 2: Commercial-Quality Turquoise.
     - Card 3: Afghanistan Cut-Stone Rubellite.
  3. **Trade Inquiries Notice:** Highlighting that inventory is held in physical lots in Bangkok; parcels can be split or evaluated via live video call.
  4. **Custom Sourcing Callout:** *"Seeking specific rough materials or calibrated sizes? Contact our trading desk with your requirements."*

---

## 5. Page 04: Commercial-Quality Rough Hessonite Garnet (`/gemstones/hessonite-garnet`)

- **Route:** `/gemstones/hessonite-garnet`
- **Primary Goal:** Present commercial rough grossular garnet lots for wholesale lapidaries and cutters.
- **Sections:**
  1. **Breadcrumbs:** `Home / Gemstones / Rough Hessonite Garnet`
  2. **Hero & Media Gallery:** Multi-image gallery showing entire parcel overview, macro close-up of cinnamon-orange color under daylight, scale photo with metric ruler, and video clip.
  3. **Product Dossier:** H1 `"Commercial-Quality Rough Hessonite Garnet"`, Lot Reference `LG-HG-001`, verified origin badge (*Sri Lanka*), treatment badge (*Natural Untreated - N*), WhatsApp CTA with pre-filled message.
  4. **Verified Gemological Specifications Table:** Species (Grossular Garnet), Formula ($Ca_3Al_2(SiO_4)_3$), Hardness (7.0–7.5), Specific Gravity (3.59–3.63), Lot Weight (5,000g parcel), Sieve Sizing (8–22mm), MOQ (500g).
  5. **Lapidary Characteristics:** Honest evaluation of cutting yield, internal "treacle" swirl inclusions, and suitability for cabochons and beads.
  6. **Inline Enquiry Form:** Pre-filled with Hessonite context.
  7. **FAQs:** Parcel inspection, shipping, and lab memos.
  8. **Related Gemstones:** Links to Turquoise and Rubellite.

---

## 6. Page 05: Commercial-Quality Turquoise (`/gemstones/turquoise`)

- **Route:** `/gemstones/turquoise`
- **Primary Goal:** Present commercial turquoise rough with strict, transparent disclosure of treatment/stabilization.
- **Sections:**
  1. **Breadcrumbs:** `Home / Gemstones / Commercial-Quality Turquoise`
  2. **Hero & Media Gallery:** Macro photos showing natural matrix, density, surface texture (dry vs wetted/polished), and lot sizing.
  3. **Product Dossier:** H1 `"Commercial-Quality Turquoise"`, Lot Reference `LG-TQ-001`, Treatment Badge (**Stabilized / Polymer Enhanced** per CIBJO code T), Form Badge (*Rough Nodules / Slabs*), WhatsApp CTA.
  4. **Gemological Specifications Table:** Species (Basic Copper-Aluminium Phosphate), Formula ($CuAl_6(PO_4)_4(OH)_8 \cdot 4H_2O$), Hardness (5.0–6.0), Density (2.60–2.85), Matrix Pattern (Spiderweb / Limonite), Available Weight (kg lot).
  5. **Treatment Disclosure Statement:** Full explanation of why commercial turquoise is stabilized (preventing discoloration from skin oils, hardening for lapidary grinding).
  6. **Inline Enquiry Form & FAQs.**

---

## 7. Page 06: Afghanistan Cut-Stone Rubellite (`/gemstones/afghanistan-rubellite`)

- **Route:** `/gemstones/afghanistan-rubellite`
- **Primary Goal:** Showcase high-grade faceted cut rubellite tourmaline with origin substantiation.
- **Sections:**
  1. **Breadcrumbs:** `Home / Gemstones / Afghanistan Cut-Stone Rubellite`
  2. **Hero & Media Gallery:** 4 macro studio photos under D65 daylight (Table view, Profile view, Pavilion view, Facet reflection) + 360-degree rotation video.
  3. **Product Dossier:** H1 `"Afghanistan Cut-Stone Rubellite"`, Reference `LG-RUB-AFGHAN`, Origin Badge (*Afghanistan - Provenance Verified / Trade Consensus*), Carat Weight ($ct$), WhatsApp CTA.
  4. **Gemological Specifications Table:** Species (Elbaite Tourmaline), Hardness (7.0–7.5), Specific Gravity (3.01–3.06), Refractive Index (1.624–1.644), Carat Weight, Millimeter Dimensions ($L \times W \times D$), Cut Style (Oval Mixed Cut), Clarity (Type III Slightly Included), Lab Report Number.
  5. **Origin & Provenance Documentation:** Transparent explanation of Afghan pegmatite source (Kunar/Nuristan valley) supported by lab certification or clear trade provenance statement.
  6. **Inline Enquiry Form & Direct WhatsApp Action.**

---

## 8. Page 07: Quality & Sourcing (`/quality-sourcing`)

- **Route:** `/quality-sourcing`
- **Primary Goal:** Establish institutional trust by articulating the company’s strict ethical and gemological standards.
- **Sections:**
  1. **Page Hero:** H1 `"Gemological Discipline & Transparent Sourcing"`.
  2. **The Bangkok Trading Standard:** How LibraGems evaluates incoming parcels using hydrostatic weighing, refractometry, polariscopes, and gemological microscopy.
  3. **CIBJO Treatment Disclosure Protocol:** Full explanation of disclosure codes (N: Natural Untreated, E: Traditional Enhancement, T: Significant Treatment).
  4. **Independent Laboratory Affiliations:** Protocol for submitting stones to GIT (Gem and Jewelry Institute of Thailand), GIA, Lotus Gemology, and AIGS for independent memos.
  5. **Inspection & Return Policy:** Clear commercial terms: 48-hour inspection period upon delivery for approved trade clients.

---

## 9. Page 08: Gemstone Insights (`/insights`)

- **Route:** `/insights`
- **Primary Goal:** Provide authoritative educational content supporting organic search visibility and establishing domain expertise.
- **Sections:**
  1. **Insights Hero:** H1 `"Gemstone Knowledge & Market Observations"`.
  2. **Featured Article Card:** High-impact editorial card (e.g., *"Understanding the 'Treacle' Inclusions in Ceylon Hessonite Garnet"*).
  3. **Article Grid:** 2-column grid of educational articles covering rough evaluation, matrix patterns in turquoise, and optical characteristics of rubellite tourmaline.
  4. **Article Reading Layout:** Editorial template with wide line-height, elegant drop caps, callout quotes, high-res macro diagrams, and contextual links to available inventory lots.

---

## 10. Page 09: Contact Us (`/contact`)

- **Route:** `/contact`
- **Primary Goal:** Maximum conversion efficiency for international buyers seeking commercial contact.
- **Sections:**
  1. **Contact Hero:** H1 `"Contact Our Trading Desk in Bangkok"`.
  2. **Two-Column Split Layout:**
     - **Left Column (Direct Channels):**
       - Bangkok Address: `1394 Charoen Krung Road, Bang Rak, Bangkok 10500, Thailand`
       - Landline: `+66 2 238 1934`
       - Direct WhatsApp buttons for Naeem Khan and Sana Khan
       - Corporate Email: `info@libragems.net`
       - Office Hours: Monday – Friday 09:00 – 18:00 (UTC+7)
       - Appointment scheduling advisory for in-person showroom visits.
     - **Right Column (Interactive Enquiry Form):**
       - Full Name, Business Email, Company, Country, Material of Interest, Specs/Weight, Message, Consent Checkbox, Honeypot Anti-Spam Field.
       - Immediate feedback states (Submitting spinner, Success banner, Error callouts).

---

## 11. Page 10: Legal Pages (`/privacy`, `/terms`)

- **Routes:** `/privacy`, `/terms`
- **Primary Goal:** Ensure complete international regulatory compliance (Thai PDPA, GDPR) and formal B2B terms of trade.
- **Sections:**
  - Clean editorial reading width (`max-w-3xl`).
  - Clear section numbering, readable typography, and verified company legal entity details.
  - Data protection disclosures: No selling of trade buyer data; data used solely for commercial correspondence and quotation.
  - Terms of Trade: Commercial quotation validity, inspection periods, export clearance, and payment escrow terms.

---
*Document produced as part of LibraGems Phase 01 Deliverables.*
