# Editorial SEO Content Standards & Quality Framework
## Libra Gems & Trading Co., Ltd. — Content Architecture & Guidelines

- **Project:** LibraGems B2B Digital Platform
- **Phase:** 06 — Technical SEO, Structured Data, Dynamic XML Sitemap & Search Readiness
- **Document ID:** `GUIDE-SEO-07-05`
- **Location:** Bangkok, Thailand
- **Audience:** Content Strategists, Gemologists, Copywriters, Frontend Engineers

---

## 1. Editorial Voice: The Quiet Luxury Standard

Libra Gems & Trading Co., Ltd. represents institutional gemstone commerce in Bangkok, Thailand. The editorial tone must reflect the gravitas of seasoned gemstone dealers, gemological laboratories, and international auction houses.

### Core Principles
- **Authoritative & Measured:** Write with understated confidence. Avoid sensationalism ("World's Cheapest Gemstones!", "Guaranteed 1000% Profit!").
- **Gemologically Rigorous:** Employ exact mineralogical classifications (Species, Variety, Crystal System, Refractive Index, Pleochroism, Specific Gravity, Mohs Hardness).
- **Uncompromising Transparency:** Adhere strictly to the CIBJO Disclosure Framework. Every treatment status (Code N, Code E, Code T) must be presented with scientific clarity.
- **Search Intent Focus:** Target trade decision-makers: master jewelers, lapidaries, bead cutters, estate jewelers, and wholesale distributors seeking reproducible lots and verifiable origins.

---

## 2. Page Title & Meta Description Specifications

| Element | Length Limit | Formatting Convention | Example |
| :--- | :--- | :--- | :--- |
| **Page Title** | 50 – 60 characters | `Primary Keyword Focus | LibraGems` | `Rough Hessonite Garnet Commercial Lots | LibraGems` |
| **Meta Description** | 140 – 160 characters | `Intent + Gemological Value + Bangkok Origin + CTA` | `Commercial rough grossular hessonite garnet parcels available from Bangkok. Natural unheated material for cabochon cutting. Request wholesale lot specifications.` |

### Title Construction Rules
1. Never exceed 60 characters to prevent ellipsis truncation (`...`) in Google SERPs.
2. The root layout provides the suffix template `%s | LibraGems`. Page definitions specify their unique primary focus as the prefix.
3. Every page title must be completely unique across the entire domain.

### Meta Description Rules
1. Must feature an actionable, professional B2B call to action (e.g., "Request wholesale lot specifications", "Inquire with our Bangkok trading desk").
2. Must never make consumer retail claims ("Free shipping", "Buy now with credit card", "Special discount code").

---

## 3. Heading Hierarchy & Document Semantics

Search engines construct semantic outlines from heading tags (`<h1>` through `<h6>`). Skipping heading levels or duplicating `<h1>` tags creates document outline ambiguity.

### Standard Hierarchy

```
[h1] Page Core Subject (Exactly ONE per page)
 ├── [h2] Primary Content Section
 │    ├── [h3] Specific Gemological Spec or Subsection
 │    └── [h3] Yield or Sourcing Detail
 ├── [h2] Secondary Content Section
 │    ├── [h3] Commercial Terms / Logistics
 │    └── [h3] Frequently Asked Questions
 └── [h2] Direct Inquiry / Trading Desk Contact
```

### Prohibited Heading Practices
- **Never use multiple `<h1>` tags:** Each page must have exactly one `<h1>`.
- **Never skip levels:** Transitioning directly from `<h1>` to `<h3>` without an intervening `<h2>` breaks semantic document outline parsers.
- **Never style headings for visual scale alone:** Use Tailwind typography classes (`text-display-sm`, `text-heading-lg`) rather than altering heading level hierarchy for font size.

---

## 4. Image Alt Text & Visual Media Standards

Gemstones are visual assets. Search engine bots cannot interpret visual colors, crystal habits, or inclusions without high-quality descriptive alt attributes.

### Alt Text Formula
`[Mineral Variety] + [Form / Cut] + [Optical Characteristics / Color] + [Context / Background]`

### Approved Examples
- **Hessonite Garnet:**
  `alt="Natural rough grossular hessonite garnet lot showing warm cinnamon-orange vitreous crystals for cabochon cutting held in Bangkok trading desk"`
- **Turquoise:**
  `alt="Commercial-quality stabilized turquoise rough parcel displaying characteristic robin's egg blue and brown siderite matrix web"`
- **Afghanistan Rubellite:**
  `alt="Precision-faceted oval Afghanistan rubellite tourmaline exhibiting saturated raspberry-pink hue under neutral daylight illumination"`

### Prohibited Alt Practices
- `alt="image"` or `alt="gemstone"` (too generic).
- `alt="cheap gemstones best price rough garnet wholesale buy online"` (keyword stuffing penalty).
- Leaving `alt` empty on informative product photographs. (Decorative decorative background icons may use `alt=""` or `aria-hidden="true"`).

---

## 5. Keyword Intent Mapping & B2B Terminology Matrix

| Content Pillar | Primary B2B Intent Keywords | Supporting LSI Keywords |
| :--- | :--- | :--- |
| **Rough Hessonite Garnet** | rough hessonite garnet, wholesale hessonite bangkok, grossular garnet parcel | cinnamon stone, unheated hessonite, cabochon rough, lapidary yield, Sri Lanka origin |
| **Commercial Turquoise** | wholesale turquoise rough, stabilized turquoise parcel, bulk turquoise bangkok | matrix turquoise, nodular turquoise, jewelry manufacturer stones, CIBJO Code T |
| **Afghanistan Rubellite** | cut rubellite tourmaline, afghanistan rubellite parcel, wholesale tourmaline oval | elbaite species, eye-clean tourmaline, raspberry red gemstone, precision cut gems |
| **Quality & Sourcing** | ethical gemstone sourcing, CIBJO disclosure standards, bangkok gemstone lab testing | GIT certified, AIGS testing, conflict-free rough, mineral supply chain traceability |
| **Insights & Education** | gemstone treatment codes, lapidary yield calculation, rough evaluation framework | FTIR spectroscopy, thermal enhancement, code N natural, rough sorting protocols |

