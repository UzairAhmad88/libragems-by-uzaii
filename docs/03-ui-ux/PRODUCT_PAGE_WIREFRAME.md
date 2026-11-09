# Gemstone Product Landing Page Wireframe Specification
**Project:** LibraGems Website Platform  
**Target Routes:** `/gemstones/hessonite-garnet`, `/gemstones/turquoise`, `/gemstones/afghanistan-rubellite`  
**Document ID:** PWF-001  
**Version:** 1.0  
**Phase:** Phase 01 – Premium Brand Identity, UI/UX Architecture & Website Design System  
**Role:** Senior UI/UX Architect & Gemstone Art Director  
**Date:** November 10, 2026  
**Status:** Approved Master Specification

---

## 1. Product Landing Page Architecture

The gemstone product page serves as the ultimate conversion engine for LibraGems. It is designed to satisfy the rigorous technical diligence of wholesale gemstone buyers while conveying the beauty and uniqueness of each material.

### Key Functional Requirements:
- **Zero Ambiguity:** Clear separation of verified gemological facts from general educational context.
- **Immediate Conversion:** Sticky WhatsApp deep link and inline enquiry form capture interested traders instantly.
- **Visual Scrutiny:** High-resolution multi-view gallery allowing buyers to evaluate color saturation, inclusions, and matrix patterns under calibrated D65 daylight.

---

## 2. Desktop Wireframe Layout (1440px Viewport)

```
====================================================================================================
[HEADER]
  LibraGems                   About   Gemstones   Quality & Sourcing   Insights   Contact
====================================================================================================
[BREADCRUMBS]  Home  /  Gemstones  /  Commercial-Quality Rough Hessonite Garnet
----------------------------------------------------------------------------------------------------
[SECTION 01: TWO-COLUMN PRODUCT DOSSIER] (Background: #FAF8F2 Ivory | Grid: 1fr / 1.1fr)
----------------------------------------------------------------------------------------------------
  [LEFT COLUMN: STICKY MEDIA GALLERY]                    [RIGHT COLUMN: PRODUCT DOSSIER]
  +-------------------------------------------------+     TAG: ROUGH GEMSTONE | LOT REF: LG-HG-001
  |                                                 |     
  |            MAIN HIGH-RESOLUTION IMAGE           |     H1 (Cormorant 48px):
  |          (Aspect Ratio: 4:3, Rounded-2xl)       |     Commercial-Quality Rough
  |                                                 |     Hessonite Garnet
  |   [Studio Photography Under 5500K Daylight:     |     
  |    Rich Cinnamon Orange Rough Lot with          |     SHORT SUMMARY (Inter 16px):
  |    Characteristic Swirled Treacle Inclusions]   |     Translucent to semi-transparent grossular
  |                                                 |     garnet rough pebbles selected for commercial
  +-------------------------------------------------+     cabochon, bead cutting, and tumbling.
  [+] Click to Inspect Fullscreen (Zoom)
                                                          BADGE ROW:
  THUMBNAIL STRIP (Horizontal Rail):                      [ Origin: Sri Lanka (Verified) ]
  +--------+ +--------+ +--------+ +--------+             [ Treatment: Natural Untreated (N) ]
  | Lot Ov.| | Macro  | | Scale  | | Video  |             [ Stock: Available Parcel (5 kg) ]
  | [4:3]  | | [4:3]  | | [4:3]  | | [Play] |
  +--------+ +--------+ +--------+ +--------+             PRICE: Price on Application (Wholesale Enquiry)
  * Active thumbnail highlighted in Champagne Gold        
                                                          PRIMARY ACTION GROUP:
                                                          [ Inquire via WhatsApp (Pre-filled Context) ]
                                                          [ Request Formal Lot Quote (Jump to Form) ]
----------------------------------------------------------------------------------------------------
[SECTION 02: VERIFIED GEMOLOGICAL SPECIFICATIONS] (Background: #FFFFFF White)
----------------------------------------------------------------------------------------------------
  TAG: TECHNICAL ATTRIBUTES
  H2: Verified Gemological Specifications

  +-----------------------------------------+------------------------------------------------------+
  | Mineral Species                         | Grossular Garnet (Nesosilicate Group)                |
  +-----------------------------------------+------------------------------------------------------+
  | Variety Name                            | Hessonite (Cinnamon Stone / Gomed)                   |
  +-----------------------------------------+------------------------------------------------------+
  | Geographic Provenance                   | Sri Lanka (Ratnapura alluvial gravels)               |
  +-----------------------------------------+------------------------------------------------------+
  | Available Lot Weight                    | 5,000 grams (5.0 kg parcel)                          |
  +-----------------------------------------+------------------------------------------------------+
  | Piece Sizing Range                      | 8.0 mm - 22.0 mm (approx. 2g - 8g per piece)         |
  +-----------------------------------------+------------------------------------------------------+
  | Color Tone & Saturation                 | Warm Cinnamon Orange to Reddish-Honey Brown          |
  +-----------------------------------------+------------------------------------------------------+
  | Clarity & Optical Character             | Translucent; internal "treacle" swirl structure      |
  +-----------------------------------------+------------------------------------------------------+
  | Enhancement / Treatment                 | None. 100% Natural Untreated Guaranteed (CIBJO: N)   |
  +-----------------------------------------+------------------------------------------------------+
  | Minimum Order Quantity (MOQ)            | 500 grams                                            |
  +-----------------------------------------+------------------------------------------------------+
  | Laboratory Documentation                | GIT Gem Identification Report on representative sample|
  +-----------------------------------------+------------------------------------------------------+
----------------------------------------------------------------------------------------------------
[SECTION 03: COMMERCIAL QUALITY & MATERIAL EVALUATION] (Background: #F3EFE5 Beige)
----------------------------------------------------------------------------------------------------
  H2: Material Character & Cutting Suitability
  P: Detailed narrative describing the cutting yield, inclusion density, and facetability.
     Explains why this lot is classified as "commercial quality" rather than museum facet-grade.
  
  [CALLOUT BOX: TREATMENT & ORIGIN DISCLOSURE]
  * Fully compliant with CIBJO and TGJTA standards.
  * No thermal, diffusion, or fracture-filling treatments applied.
  * Video inspection of specific parcel selections available for registered trade accounts.
----------------------------------------------------------------------------------------------------
[SECTION 04: BUYER INQUIRY & QUOTATION MODULE] (Background: #FAF8F2 Ivory)
----------------------------------------------------------------------------------------------------
  H2: Submit a Wholesale Parcel Enquiry
  P: Direct enquiry to our Bangkok trading desk. We respond within 4 business hours.

  +------------------------------------------------------------------------------------------------+
  | [WEB ENQUIRY FORM]                                                                             |
  | Full Name*: [______________________]      Business Email*: [________________________________]  |
  | Company:   [______________________]      Country:        [________________________________]  |
  | Material:  [ Commercial-Quality Rough Hessonite Garnet (Ref: LG-HG-001) ] (Preselected)        |
  | Parcel Requirement / Weight Needed: [ e.g. 1 kg sample parcel or full 5 kg lot ]              |
  | Commercial Message*:                                                                           |
  | [____________________________________________________________________________________________] |
  | [x] I consent to LibraGems contacting me regarding this commercial trade inquiry.              |
  |                                                                                                |
  | [ Submit Trade Enquiry (Forest Green Button) ]                                                 |
  +------------------------------------------------------------------------------------------------+
----------------------------------------------------------------------------------------------------
[SECTION 05: FREQUENTLY ASKED BUYER QUESTIONS] (Accordion Pattern)
----------------------------------------------------------------------------------------------------
  [+] Can I request video footage of the actual parcel before shipment?
  [+] What are the accepted wholesale payment methods and escrow terms?
  [+] Which insured courier services do you use for international gemstone export?
  [+] Can LibraGems submit specific stones to GIT or AIGS for individual certification?
----------------------------------------------------------------------------------------------------
[SECTION 06: RELATED GEMSTONE OFFERINGS]
----------------------------------------------------------------------------------------------------
  H2: Explore Other Gemstone Materials
  [ Product Card: Commercial Turquoise ]      [ Product Card: Afghanistan Cut Rubellite ]
====================================================================================================
[FOOTER]
====================================================================================================
```

---

## 3. Mobile Wireframe Layout (390px Viewport)

```
======================================
[HEADER]  LibraGems           [MENU =]
======================================
[BREADCRUMBS] Gemstones / Hessonite
--------------------------------------
[PRODUCT TITLE & TAG]
  ROUGH GEMSTONE | LOT LG-HG-001
  H1 (32px): Commercial-Quality
  Rough Hessonite Garnet
--------------------------------------
[MOBILE GALLERY CAROUSEL]
  +----------------------------------+
  |                                  |
  |   MAIN MACRO PHOTOGRAPH (4:3)    |
  |                                  |
  +----------------------------------+
  Swipe to view (1 of 4 photos)
  [o] [ ] [ ] [ ]
--------------------------------------
[KEY SPECS SNAPSHOT]
  * Origin: Sri Lanka (Ratnapura)
  * Treatment: Natural Untreated (N)
  * Available Lot: 5 kg
  * Form: Rough pebbles (8-22mm)
  
  POA - Wholesale Enquiry
--------------------------------------
[PRIMARY WHATSAPP CTA]
  [ Inquire via WhatsApp (Context) ]
--------------------------------------
[FULL SPECIFICATIONS: ACCORDION/TABLE]
  [V] Full Gemological Specifications
  - Species: Grossular Garnet
  - Variety: Hessonite
  - Color: Cinnamon Orange
  - Treatment: None (Natural)
  - Sizing: 8-22 mm
  - MOQ: 500 grams
--------------------------------------
[MATERIAL NOTES & DISCLOSURE]
  H2: Cutting Characteristics
  P: Translucent rough ideal for
  cabochon and bead processing.
--------------------------------------
[INLINE ENQUIRY FORM]
  H2: Inquire with Trade Desk
  [Name Input]
  [Email Input]
  [Message Textarea]
  [ Submit Enquiry ]
--------------------------------------
[BUYER FAQS ACCORDION]
  [+] Video inspection process
  [+] International export freight
--------------------------------------
[RELATED GEMSTONES]
  [ Card: Commercial Turquoise ]
--------------------------------------
[FOOTER]
======================================
[STICKY BOTTOM BAR (Mobile Only)]
[ WhatsApp Enquiry: Hessonite Lot ]
======================================
```

---
*Document produced as part of LibraGems Phase 01 Deliverables.*

