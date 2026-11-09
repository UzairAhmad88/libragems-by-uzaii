# Homepage Wireframe & Structural Layout Specification
**Project:** LibraGems Website Platform  
**Route:** `/` (Homepage)  
**Document ID:** HWF-001  
**Version:** 1.0  
**Phase:** Phase 01 – Premium Brand Identity, UI/UX Architecture & Website Design System  
**Role:** Senior UI/UX Architect & HCI Specialist  
**Date:** November 10, 2026  
**Status:** Approved Master Specification

---

## 1. Homepage Strategic Intent & User Journey

The homepage is the primary digital gateway for Libra Gems & Trading Co., Ltd. It must instantly establish:
1. **Prestige & Authority:** Communicating decades of colored gemstone expertise in Bangkok's Bang Rak gem trading district.
2. **Clear B2B Positioning:** Informing international buyers that this is an enquiry-led wholesale and trading platform, not a consumer jewelry store.
3. **Immediate Product Access:** Guiding wholesale traders directly to the three featured materials: Rough Hessonite Garnet, Commercial Turquoise, and Cut Afghanistan Rubellite.
4. **Frictionless Conversion:** Offering clear, direct pathways to commercial negotiation via WhatsApp, email, and the enquiry desk.

---

## 2. Desktop Wireframe Layout (1440px Viewport)

```
====================================================================================================
[HEADER]
----------------------------------------------------------------------------------------------------
  LibraGems                   About   Gemstones   Quality & Sourcing   Insights   Contact
====================================================================================================
[SECTION 01: EDITORIAL HERO]  (Background: #F3EFE5 Warm Beige | Grid: 1.1fr / 0.9fr)
----------------------------------------------------------------------------------------------------
  [LEFT COLUMN]                                           [RIGHT COLUMN]
  TAG: GEMSTONE TRADING & EXPORT                          +----------------------------------------+
                                                          |                                        |
  HEADLINE (H1, Cormorant 64px):                          |       HERO GEMSTONE PHOTOGRAPH         |
  A Considered Approach to                                |       (Aspect Ratio: 4:3, Rounded-2xl) |
  Natural Gemstones.                                      |                                        |
                                                          |  [Authentic Bangkok Inventory Shot:    |
  BODY LEAD (Inter 18px):                                 |   Rough Hessonite, Turquoise & Cut     |
  Sourcing, evaluating, and supplying commercial-quality   |   Rubellite Composition]               |
  rough stones, mineral specimens, and precision-cut       |                                        |
  gemstones directly from Bangkok's historic trading      +----------------------------------------+
  district.                                               CAPTION: Bangkok Trading Inventory (Ref: LG-001)

  CTA GROUP:
  [ Explore Gemstones (Forest Green Pill) ]  [ Contact Trading Desk (Outlined Pill) ]
----------------------------------------------------------------------------------------------------
[SECTION 02: BUSINESS INTRODUCTION & CREDIBILITY PILLARS] (Background: #FAF8F2 Ivory)
----------------------------------------------------------------------------------------------------
  TAG: THE TRADING HOUSE
  H2: Rooted in Bangkok. Connected Worldwide.
  P: Situated in Bang Rak, Bangkok—the global capital for colored gemstone sorting, cutting, and
     treatment disclosure—Libra Gems serves international lapidaries, jewelers, and collectors.

  +-------------------------+ +-------------------------+ +-------------------------+
  | PILLAR 1: ROUGH LOTS    | | PILLAR 2: CUT STONES    | | PILLAR 3: DISCLOSURE    |
  | Bulk parcel weights and | | Precision-faceted single| | Strict CIBJO standards. |
  | predictable yields for  | | stones with verified    | | Honest treatment and    |
  | commercial cutting.     | | physical metrics.       | | origin reporting.       |
  +-------------------------+ +-------------------------+ +-------------------------+
----------------------------------------------------------------------------------------------------
[SECTION 03: FEATURED GEMSTONE COLLECTION] (Background: #FFFFFF White Canvas)
----------------------------------------------------------------------------------------------------
  TAG: SELECTED INVENTORY
  H2: Featured Gemstone Materials
  P: Inspect our active commercial lots and single cut stones currently held in Bangkok.

  +-----------------------+ +-----------------------+ +-----------------------+
  | [PRODUCT CARD 1]      | | [PRODUCT CARD 2]      | | [PRODUCT CARD 3]      |
  | [IMAGE: 4:3 ROUGH]    | | [IMAGE: 4:3 MINERAL]  | | [IMAGE: 1:1 CUT]      |
  | Status: Untreated Lot | | Status: Stabilized    | | Status: Afghanistan   |
  | ROUGH GEMSTONE        | | MINERAL / ROUGH       | | CUT GEMSTONE          |
  | Rough Hessonite Garnet| | Commercial Turquoise  | | Afghanistan Rubellite |
  | Cinnamon orange lot   | | High-density material | | Purplish-red cut stone|
  | with treacle swirls.  | | with spiderweb matrix.| | with exceptional fire.|
  | View Details ->       | | View Details ->       | | View Details ->       |
  +-----------------------+ +-----------------------+ +-----------------------+

  CENTERED ACTION: [ View Complete Gemstone Catalogue -> ]
----------------------------------------------------------------------------------------------------
[SECTION 04: QUALITY & SOURCING PHILOSOPHY] (Background: #F3EFE5 Beige Split Layout)
----------------------------------------------------------------------------------------------------
  [LEFT: HIGH-RES STUDIO PHOTO OF GEMSTONE INSPECTION UNDER 5500K DAYLIGHT]
  [RIGHT: EDITORIAL CONTENT]
  TAG: OUR STANDARD
  H2: Transparency in Every Carat.
  P: In an opaque global market, LibraGems operates with absolute disclosure. We distinguish
     untreated stones from stabilized materials and never fabricate geographic origins.
  LIST:
  * Full treatment disclosure (CIBJO standards)
  * Independent laboratory verification (GIT, GIA, Lotus, AIGS)
  * Direct parcel video inspection for international trade accounts
  LINK: [ Learn About Our Sourcing Standards -> ]
----------------------------------------------------------------------------------------------------
[SECTION 05: INTERNATIONAL ENQUIRY CALL-TO-ACTION] (Background: #174C38 Forest Green | White Text)
----------------------------------------------------------------------------------------------------
  H2: Inquire Regarding Parcels & Specific Materials
  P: Direct negotiation via WhatsApp or formal quotation through our trade desk.
     Consignments, parcel viewings, and custom requests welcome.

  CTA BUTTONS:
  [ Message Us on WhatsApp (Direct Link) ]   [ Submit Web Enquiry Form ]
----------------------------------------------------------------------------------------------------
[FOOTER: 4-COLUMN BRAND ANCHOR] (Background: #103729 Midnight Green | White Text)
----------------------------------------------------------------------------------------------------
  LIBRA GEMS & TRADING CO., LTD.   GEMSTONES          COMPANY            DIRECT CONTACT
  1394 Charoen Krung Road          Hessonite Garnet   About Us           WhatsApp: +66 8 4667 4833
  Bang Rak, Bangkok 10500          Turquoise          Quality & Sourcing Email: info@libragems.net
  Thailand                         Afghan Rubellite   Insights / Guides  Phone: +66 2 238 1934
                                   All Materials      Privacy & Terms    Office Hours: 09:00 - 18:00
----------------------------------------------------------------------------------------------------
  (C) 2026 Libra Gems & Trading Co., Ltd. All rights reserved. B2B Gemstone Trading Platform.
====================================================================================================
```

---

## 3. Mobile Wireframe Layout (390px Viewport)

```
======================================
[MOBILE HEADER]
--------------------------------------
  LibraGems                  [MENU =]
======================================
[HERO: VERTICAL STACK]
--------------------------------------
  TAG: GEMSTONE TRADING
  
  H1 (40px):
  A Considered Approach
  to Natural Gemstones.

  P (16px):
  Sourcing and supplying commercial-
  quality rough stones and precision-
  cut gemstones from Bangkok.

  [IMAGE: FULL-WIDTH 16:9 RATIO]
  +----------------------------------+
  | Authentic Inventory Photo        |
  +----------------------------------+

  [ Explore Gemstones (Full Width) ]
  [ Contact Trading Desk (Full Width)]
--------------------------------------
[CREDIBILITY CARDS: STACKED]
--------------------------------------
  +----------------------------------+
  | Rough Gemstones & Minerals       |
  | Bulk parcel weights for cutters. |
  +----------------------------------+
  | Precision Cut Gemstones          |
  | Verified millimeter measurements.|
  +----------------------------------+
  | Absolute Disclosure              |
  | CIBJO-compliant treatment notes. |
  +----------------------------------+
--------------------------------------
[FEATURED GEMSTONES: 1-COL FEED]
--------------------------------------
  TAG: SELECTED OFFERINGS
  H2: Featured Gemstones

  +----------------------------------+
  | [PRODUCT CARD 1]                 |
  | [Image 4:3]                      |
  | Rough Hessonite Garnet           |
  | Rough Gemstone | Commercial Lot  |
  | View Details ->                  |
  +----------------------------------+
  
  +----------------------------------+
  | [PRODUCT CARD 2]                 |
  | [Image 4:3]                      |
  | Commercial-Quality Turquoise     |
  | Mineral / Rough | Stabilized Lot |
  | View Details ->                  |
  +----------------------------------+

  +----------------------------------+
  | [PRODUCT CARD 3]                 |
  | [Image 1:1]                      |
  | Afghanistan Cut Rubellite        |
  | Cut Gemstone | Verified Faceted  |
  | View Details ->                  |
  +----------------------------------+
--------------------------------------
[SOURCING SECTION: STACKED]
--------------------------------------
  [Image 16:9]
  H2: Transparency in Every Carat
  P: Full CIBJO treatment disclosure
  and independent lab verification.
  [ Read Sourcing Standards -> ]
--------------------------------------
[ENQUIRY CTA: FOREST GREEN BOX]
--------------------------------------
  H2: Inquire with our Trading Desk
  P: Direct WhatsApp consultation.
  [ WhatsApp Enquiry (Full Width) ]
--------------------------------------
[MOBILE FOOTER]
--------------------------------------
  LibraGems
  1394 Charoen Krung Rd, Bang Rak
  info@libragems.net
  (C) 2026 Libra Gems & Trading
======================================
[STICKY BOTTOM BAR (Mobile Only)]
[ WhatsApp Enquiry: Fast Trade Chat ]
======================================
```

---
*Document produced as part of LibraGems Phase 01 Deliverables.*
