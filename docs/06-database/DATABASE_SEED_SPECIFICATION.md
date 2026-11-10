# Database Seed Specification & Initial Inventory Baseline

**Project:** Libra Gems & Trading Co., Ltd.  
**Seed Files:** `supabase/migrations/20261110000005_seed_reference_data.sql` & `supabase/seed/development_seed.sql`  

---

## 1. Initial Category Baseline

| Category ID | Name | Slug | Scope | Display Order |
|---|---|---|---|---|
| `a1000000-...0001` | Rough Gemstones | `rough` | Natural unworked crystals and rough parcels for lapidaries | 1 |
| `a1000000-...0002` | Mineral Specimens | `mineral` | Natural mineral crystalline formations and display matrix | 2 |
| `a1000000-...0003` | Cut Gemstones | `cut` | Precision-cut, faceted colored stones for high-jewelry | 3 |
| `a1000000-...0004` | Stone Beads & Calibrated Material | `beads` | Calibrated beads, rondelles, and tumbled stone lots | 4 |

---

## 2. Initial Gemstone Inventory (3 Active Lots)

### Lot 1: Commercial-Quality Rough Hessonite Garnet
- **Reference Code:** `LG-HG-001`
- **Species / Variety:** Grossular Garnet / Hessonite Garnet
- **Form / Weight:** Rough Parcel / 5,000 g
- **Origin:** Sri Lanka (Ratnapura Alluvial Gravels) — Trade Consensus
- **Treatment:** Natural Untreated (CIBJO Code N)
- **Certification:** Available on request (GIT, AIGS, Lotus Gemology)
- **Pricing:** Price on Application (POA)

### Lot 2: Commercial-Quality Turquoise
- **Reference Code:** `LG-TQ-001`
- **Species / Variety:** Hydrated Basic Copper Aluminium Phosphate / Natural Matrix Turquoise
- **Form / Weight:** Mineral Rough / 12.5 kg lot
- **Origin:** Trade Sourced (Central Asian Mineralized Belt) — Unverified
- **Treatment:** Polymer Stabilized (CIBJO Code T)
- **Certification:** Identification confirms species and polymer stabilization
- **Pricing:** Price on Application (POA)

### Lot 3: Afghanistan Cut-Stone Rubellite
- **Reference Code:** `LG-RUB-AFGHAN`
- **Species / Variety:** Elbaite Tourmaline / Rubellite Tourmaline
- **Form / Weight:** Precision Cut Stone / Single stone memo
- **Cut:** Precision Custom Oval Mixed Cut with step pavilion
- **Origin:** Afghanistan (Nuristan / Kunar) — Trade Consensus
- **Treatment:** Standard Trade Heating (Probable) / Lab Verification Required (CIBJO Code N)
- **Certification:** Full identification memo arranged in Bangkok
- **Pricing:** Price on Application (POA)

---

## 3. Development Seed Enquiries

For testing the `/admin/enquiries` management workflow, four diverse sample inquiries are pre-seeded:
- `ENQ-2026-10001`: Vance Lapidary Atelier (UK) — 1,000g Hessonite parcel split (`status: new`, `priority: high`)
- `ENQ-2026-10002`: Rostova Gioielli S.r.l. (Italy) — Turquoise slabs for inlay (`status: in_review`, `priority: normal`)
- `ENQ-2026-10003`: Thorne Haute Horlogerie (Switzerland) — Afghan Rubellite memo viewing (`status: qualified`, `priority: urgent`)
- `ENQ-2026-10004`: Devam Gems (India) — Custom tourmaline rough sourcing (`status: replied`, `priority: normal`)
