# Image & Macro Gemstone Photography Guidelines
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** IPG-001  
**Version:** 1.0  
**Phase:** Phase 01 – Premium Brand Identity, UI/UX Architecture & Website Design System  
**Role:** Premium Website Art Director & Studio Photography Lead  
**Date:** November 10, 2026  
**Status:** Approved Master Specification

---

## 1. Gemstone Photography Principles & Authenticity Mandate

In international B2B gemstone commerce, photography is not mere decorative marketing; it constitutes **visual contractual evidence**. Professional gemstone dealers scrutinize photographs for color saturation, extinction, pleochroism, matrix distribution, and diagnostic inclusions:

### Core Photography Mandates:
1. **Zero Stock Photography:** Under no circumstances will generic stock photography, AI-generated mineral art, or 3D renders be displayed on product detail pages. Every live product image must represent the **actual physical stone or lot** in LibraGems’ Bangkok inventory.
2. **True Color Fidelity:** Studio lighting must render true-to-life colors without artificial digital oversaturation. The stone received by the buyer must match the digital image precisely.
3. **Inclusion Transparency:** Microscopic inclusions (such as the "treacle" swirl in Hessonite Garnet or healed liquid feathers in Rubellite) must be honestly documented, not digitally retouched or airbrushed away.

---

## 2. Studio Lighting & Shooting Standards

To capture accurate optical properties across rough, mineral, and cut materials:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       STUDIO PHOTOGRAPHY PROTOCOLS                          │
├───────────────────┬─────────────────────────────────────────────────────────┤
│ Lighting Temp     │ Calibrated D65 Daylight (5500K – 6000K), CRI ≥ 95.      │
│ Light Diffusion   │ Double-diffused softbox to eliminate harsh specular     │
│                   │ glare while preserving facet scintillation.             │
│ Polarization      │ Cross-polarized lighting filters for rough stones to    │
│                   │ reveal internal color saturation and crystalline habit. │
│ Backgrounds       │ Neutral matte surfaces: Warm ivory card, slate grey,    │
│                   │ or deep forest green matte paper. No distracting velour.│
│ Color Profile     │ sRGB (Standard color space) embedded in all exports to  │
│                   │ guarantee consistent rendering on iPhones, OLED & PCs.  │
└───────────────────┴─────────────────────────────────────────────────────────┘
```

---

## 3. Product-Specific Shot List Requirements

For each of the three initial catalogue materials, the client team must supply the following mandatory camera angles:

### 3.1 Commercial-Quality Rough Hessonite Garnet
1. **View 1 (Parcel Overview):** Top-down shot of the full 5 kg rough lot spread across a neutral ivory surface, showing color uniformity.
2. **View 2 (Macro Detail):** Extreme close-up of 3–5 representative pebbles backlit under diffused daylight to reveal internal transparency and honey-cinnamon treacle swirls.
3. **View 3 (Metric Scale):** Representative stones arranged adjacent to a precision metric millimeter ruler or jeweler's carat scale.
4. **View 4 (Video Rotation):** 1080p 15-second video clip panning over the parcel under directional light showing surface luster.

### 3.2 Commercial-Quality Turquoise
1. **View 1 (Dry Surface Texture):** Macro shot of dry rough nodules showing natural cryptocrystalline luster, surface porosity, and matrix veins.
2. **View 2 (Polished / Wetted Cross-Section):** Cut or wetted window showing internal sky-blue/teal color depth and spiderweb matrix patterns.
3. **View 3 (Parcel Distribution):** Wide-angle shot showing lot sizing distribution.
4. **View 4 (Metric Scale):** Single nugget held between jeweler's calipers with digital readout ($mm$).

### 3.3 Afghanistan Cut-Stone Rubellite
1. **View 1 (Face-Up Table Macro):** Direct perpendicular shot through the table facet under 5500K daylight, displaying primary red-pink saturation and facet symmetry.
2. **View 2 (Profile / Girdle View):** Side profile displaying crown height, girdle thickness, and pavilion depth ratio.
3. **View 3 (Pavilion / Back View):** Rear view displaying pavilion facet meetpoints, culet condition, and optical extinction zones.
4. **View 4 (360-Degree Video):** 4K 30fps rotation on a slow motorized gemstone turntable demonstrating pleochroic color shifts (red to violet-red) and optical brilliance.

---

## 4. Aspect Ratio & Responsive Image Sizing

To eliminate Cumulative Layout Shift (CLS = 0) and maintain harmonious responsive layouts:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ASPECT RATIOS & RESOLUTION TOKENS                     │
├────────────────────┬──────────────┬──────────────────┬──────────────────────┤
│ Usage Context      │ Aspect Ratio │ Master Source Res│ Rendered Target Res  │
├────────────────────┼──────────────┼──────────────────┼──────────────────────┤
│ Editorial Hero     │ 16:9 / 21:9  │ 2560 x 1440 px   │ 1280 x 720 px (Ret.) │
│ Rough Product Card │ 4:3          │ 1600 x 1200 px   │ 600 x 450 px         │
│ Cut Gemstone Card  │ 1:1 (Square) │ 1600 x 1600 px   │ 600 x 600 px         │
│ Gallery Main View  │ 4:3 or 1:1   │ 2048 x 1536 px   │ 800 x 600 px (Ret.)  │
│ Gallery Thumbnails │ 1:1          │ 400 x 400 px     │ 96 x 96 px           │
│ Fullscreen Lightbox│ Original RAW │ 4000 x 3000 px   │ Max screen viewport  │
└────────────────────┴──────────────┴──────────────────┴──────────────────────┘
```

---

## 5. Web Optimization, Formats & Delivery Pipeline

Next.js App Router handles dynamic image optimization via `next/image`:
- **Format Delivery:** Modern browsers automatically receive **AVIF** (superior compression) or **WebP**; fallback to JPEG for legacy clients.
- **Compression Target:** Quality set to `quality={85}`, balancing razor-sharp facet clarity with minimal payload ($< 120\text{ KB}$ per rendered card image).
- **Responsive `sizes` Attribute:**
  ```html
  <Image
    src="/images/products/hessonite-garnet/lot-main.jpg"
    alt="Commercial-quality rough Hessonite Garnet parcel showing cinnamon-orange pebbles - Libra Gems Bangkok"
    width={1600}
    height={1200}
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    priority={true}
    className="rounded-2xl object-cover"
  />
  ```

---

## 6. Development Placeholder Specifications

During initial wireframing and until client photographs are approved:
- Placeholders must consist of flat ivory/beige geometric boxes with `1px dashed var(--color-border)`.
- Center label must clearly state:
  ```
  +--------------------------------------------------------+
  |                                                        |
  |             [AUTHENTIC INVENTORY PHOTOGRAPHY]          |
  |                Lot LG-HG-001 (Ratnapura, Sri Lanka)    |
  |                                                        |
  |      Approved client studio photo will be placed here. |
  |            Stock imagery strictly prohibited.          |
  +--------------------------------------------------------+
  ```

---

## 7. Image SEO & Descriptive Alt-Text Formula

Every image must include semantic, crawlable alternative text following this exact structural formula:

$$\text{Alt Text} = \text{[Gemstone Name]} + \text{[Form/Cut]} + \text{[Key Visual Descriptor]} + \text{", Libra Gems & Trading Co. Ltd. Bangkok"}$$

### Verified Production Examples:
- **Hessonite Main:** `"Commercial-quality rough Hessonite Garnet lot showing natural cinnamon-orange crystals under daylight, Libra Gems & Trading Co. Ltd. Bangkok"`
- **Turquoise Matrix:** `"Commercial-quality stabilized Turquoise rough nodule with characteristic brown spiderweb matrix, Libra Gems & Trading Co. Ltd. Bangkok"`
- **Rubellite Table:** `"Faceted oval-cut Afghanistan Rubellite tourmaline displaying vivid purplish-red brilliance, Libra Gems & Trading Co. Ltd. Bangkok"`

---
*Document produced as part of LibraGems Phase 01 Deliverables.*

