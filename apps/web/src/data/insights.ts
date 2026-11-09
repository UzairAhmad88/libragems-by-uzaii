import { InsightArticle } from "@/types/insight";

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: "understanding-gemstone-treatments",
    slug: "understanding-gemstone-treatments",
    title: "Understanding Gemstone Treatments: The CIBJO Disclosure Framework",
    subtitle: "A commercial guide to differentiating natural untreated stones, routine enhancements, and significant treatments.",
    category: "treatments",
    categoryLabel: "Treatment Disclosure",
    readingTimeMinutes: 5,
    publishedDate: "October 2026",
    excerpt:
      "Modern gemstone commerce demands uncompromising transparency. How international trade organizations define Code N (Natural), Code E (Enhancement), and Code T (Treated) materials.",
    keyTakeaways: [
      "Treatment does not inherently negate commercial value, but undisclosed treatment destroys commercial trust.",
      "CIBJO Code N represents wholly natural stones with no artificial color, clarity, or stability interventions.",
      "Code T includes irreversible or material interventions such as polymer stabilization in porous turquoise and fracture filling.",
      "Wholesale buyers must demand written disclosure on every proforma invoice and laboratory memorandum.",
    ],
    contentSections: [
      {
        heading: "The Commercial Imperative of Treatment Transparency",
        paragraphs: [
          "In high-value gemstone trading, confusion over treatment status represents the single largest vector of transactional disputes. Modern gemological science recognizes that many colored gemstones undergo thermal or physical processes to improve aesthetics. However, the international wholesale market draws an unambiguous boundary between accepted traditional practices and invasive treatments requiring explicit disclosure.",
          "The World Jewellery Confederation (CIBJO) established a unified classification system designed to give dealers, lapidaries, and retail manufacturers an exact vocabulary. Adhering strictly to these standards is not merely an ethical posture; it is the cornerstone of sustainable international trade.",
        ],
        callout:
          "CIBJO Standard: Any treatment that significantly alters the natural durability, color, or integrity of a gem must be disclosed in all commercial trade correspondence.",
      },
      {
        heading: "Deconstructing CIBJO Codes: N, E, and T",
        paragraphs: [
          "Code N (Natural / Not Treated): Reserved strictly for gemstones that have received no modification beyond standard lapidary shaping and polishing. For example, our commercial rough hessonite garnet (Grossular) requires no heat treatment or chemical additive to exhibit its warm cinnamon-orange fire.",
          "Code E (Traditional Enhancement): Encompasses traditional thermal or colorless oiling practices that are widely recognized within the trade. In ruby and sapphire trading, standard high-temperature heating to dissolve rutile silk and develop blue or red hue falls within this classification.",
          "Code T (Significant Treatment): Identifies stones where foreign substances, resins, dyes, or structural impregnations have been introduced. Commercial-grade turquoise represents a prime example: natural porous nodular turquoise is stabilized with acrylic or epoxy polymers to prevent discoloration from perspiration and mechanical breakage during diamond saw cutting.",
        ],
      },
      {
        heading: "Verification Protocols for Trade Buyers",
        paragraphs: [
          "When acquiring inventory from Southeast Asian trading hubs, wholesale buyers should never rely on verbal assertions. In Bangkok, accredited gemological institutions such as GIT, AIGS, and Lotus Gemology utilize Fourier-Transform Infrared (FTIR) spectroscopy and Raman microspectroscopy to detect foreign polymers and resins in turquoise and emeralds.",
          "At LibraGems, every parcel offered is categorized strictly according to confirmed gemological reality. When a parcel is stabilized, it is marked as Code T. When untreated, it is verified as Code N.",
        ],
      },
    ],
    relatedGemstones: [
      { name: "Commercial-Quality Turquoise", slug: "turquoise" },
      { name: "Rough Hessonite Garnet", slug: "hessonite-garnet" },
    ],
  },
  {
    id: "evaluating-rough-alluvial-gemstones",
    slug: "evaluating-rough-alluvial-gemstones",
    title: "Evaluating Alluvial Rough Gemstones: A Lapidary's Guide to Yield",
    subtitle: "How to assess internal cleavage, crystal orientation, and optical axis in water-worn crystalline parcels.",
    category: "lapidary",
    categoryLabel: "Lapidary Science",
    readingTimeMinutes: 6,
    publishedDate: "November 2026",
    excerpt:
      "Assessing raw gem gravels requires understanding alluvial sorting, water-worn skins, and internal stress fracturation before committing capital to commercial parcel acquisitions.",
    keyTakeaways: [
      "Alluvial gravels naturally filter out the most severely fractured stones during river transport.",
      "Water-worn 'frosting' can conceal internal clarity; immersion in high-refractive-index liquid or mineral oil is standard practice.",
      "Commercial cabochon yield generally ranges from 20% to 35%, whereas precision faceted gems often retain only 15% to 22%.",
      "Checking optical axes with a polariscope or crossed-polarizers prevents cutting faceted gems with misaligned dichroism.",
    ],
    contentSections: [
      {
        heading: "The Mechanics of Alluvial Sorting",
        paragraphs: [
          "Gem gravels mined from river beds, such as the famous gem-bearing 'illam' gravels of the Ratnapura basin in Sri Lanka, represent secondary deposits. As host metamorphic skarns and pegmatites weather, crystalline minerals are washed downstream. This journey serves as nature's tumbling mill: stones with deep structural cleavage planes or fragile twin planes fracture and disintegrate.",
          "The surviving alluvial pebbles—such as our commercial rough hessonite garnet—possess inherently higher structural toughness than primary matrix-bound crystals. However, their outer surfaces are often abraded by quartz sand, creating a frosted, matte rind that obscures interior inclusions.",
        ],
        callout:
          "Lapidary Axiom: Never judge an alluvial pebble's internal purity under overhead dry light alone. Use a gemological immersion cell with benzyl benzoate or clove oil to neutralize surface refraction.",
      },
      {
        heading: "Estimating Finished Yield Across Product Types",
        paragraphs: [
          "Wholesale lapidaries evaluate parcels based on anticipated recovery weight. When cutting smooth cabochons or spherical beads, rough material with even internal graining—such as hessonite's diagnostic 'treacle' swirls—can yield up to 35% finished weight. The rounded alluvial contours minimize initial saw wastage.",
          "Conversely, when planning precision-cut faceted stones, cutters must slice away substantial volume to establish optically ideal critical angles. A 10-gram rough tourmaline crystal may only yield a 1.8 to 2.2-gram (9 to 11 carat) precision faceted gem if optical windowing and facet extinction are to be eliminated.",
        ],
      },
    ],
    relatedGemstones: [
      { name: "Rough Hessonite Garnet", slug: "hessonite-garnet" },
      { name: "Afghanistan Cut Rubellite", slug: "afghanistan-rubellite" },
    ],
  },
  {
    id: "gemstone-origin-and-provenance",
    slug: "gemstone-origin-and-provenance",
    title: "Gemstone Origin and Provenance: Between Science and Commercial Value",
    subtitle: "Why geographic origins carry market premiums and how laboratories prove or disprove regional source claims.",
    category: "origin",
    categoryLabel: "Origin Analysis",
    readingTimeMinutes: 5,
    publishedDate: "November 2026",
    excerpt:
      "From Afghan pegmatites to Sri Lankan gem gravels, origin designations influence prestige and price. What constitutes substantiated provenance in modern gem trading?",
    keyTakeaways: [
      "Geographic origin is a gemological opinion based on chemical fingerprinting, not an intrinsic physical guarantee.",
      "Laser Ablation ICP-MS (LA-ICP-MS) allows labs to map trace elements to reference databases gathered from verified mines.",
      "Unverified trade lore must never be substituted for laboratory-backed origin certification.",
      "LibraGems categorizes origins into Verified, Trade Consensus, and Unverified to protect buyer integrity.",
    ],
    contentSections: [
      {
        heading: "The Scientific Basis of Geographic Origin",
        paragraphs: [
          "For centuries, trade terms like 'Burmese Ruby', 'Ceylon Sapphire', and 'Afghan Tourmaline' denoted distinctive color and quality archetypes. Today, these geographic names confer significant financial premiums. However, gemological laboratories cannot determine origin merely by inspecting color; origin determination is fundamentally an exercise in comparative geochemical and inclusion analysis.",
          "Laboratories maintain extensive reference libraries of rough samples collected personally by field gemologists directly from active mine pits. When a stone like our cut-stone rubellite is submitted, its inclusion suite (such as three-phase inclusions or growth tube morphology) and trace-element signatures (concentrations of Gallium, Iron, Manganese, and Lithium) are cross-referenced against statistical databases.",
        ],
        callout:
          "Integrity Note: If a stone lacks verified laboratory provenance, it should be sold strictly on its beauty, cut, and color—never with unverified geographic claims.",
      },
      {
        heading: "Trade Consensus vs Independent Certification",
        paragraphs: [
          "In primary Asian trading markets, parcel lots frequently change hands with verbal trade provenance passed from border couriers to local brokers. While experienced dealers can recognize regional parcel characteristics, LibraGems maintains a strict policy: trade consensus is acknowledged where consistent with physical parcel traits, but formal geographic origin is only stated as 'Verified' when corroborated by a recognized gemological report.",
        ],
      },
    ],
    relatedGemstones: [
      { name: "Afghanistan Cut Rubellite", slug: "afghanistan-rubellite" },
      { name: "Rough Hessonite Garnet", slug: "hessonite-garnet" },
    ],
  },
  {
    id: "gemological-certification-guide",
    slug: "gemological-certification-guide",
    title: "Navigating Gemological Reports: Laboratory Memos vs Full Certificates",
    subtitle: "Understanding the difference between commercial identification memos, origin opinions, and full gemological dossiers.",
    category: "certification",
    categoryLabel: "Laboratory Protocols",
    readingTimeMinutes: 4,
    publishedDate: "November 2026",
    excerpt:
      "An insider guide to Bangkok's world-class gemological testing ecosystem and how international buyers can commission independent laboratory reports prior to parcel settlement.",
    keyTakeaways: [
      "A gemological 'memo' provides rapid, reliable confirmation of species and major treatment status.",
      "Full reports include macro photography, spectral analysis documentation, and origin opinions where supported.",
      "Bangkok is home to some of the world's premier colored stone laboratories: GIT, AIGS, Lotus Gemology, and GIA.",
      "Pre-shipment laboratory escrow testing protects both the international buyer and the Bangkok trading desk.",
    ],
    contentSections: [
      {
        heading: "Bangkok as the Global Hub for Colored Stone Testing",
        paragraphs: [
          "Bangkok's Bang Rak and Silom districts form the epicenter of colored gemstone evaluation worldwide. Because the majority of the world's sapphires, rubies, garnets, and tourmalines pass through Thailand for cutting and trade, local laboratories have developed unparalleled diagnostic capabilities.",
          "Institutions such as GIT (The Gem and Jewelry Institute of Thailand, under the Ministry of Commerce), AIGS (Asian Institute of Gemological Sciences), and Lotus Gemology set international standards for colored gemstone spectroscopy, inclusion photography, and treatment identification.",
        ],
        callout:
          "Buyer Protection: Always request that your Bangkok supplier submit stones to an independent, accredited laboratory before finalizing high-value export shipments.",
      },
      {
        heading: "Selecting the Right Tier of Documentation",
        paragraphs: [
          "For commercial rough parcels, individual stone certification is economically impractical. In these instances, dealers request a 'Parcel Verification Memo' or random sample analysis to certify that the parcel contains 100% natural grossular garnet or natural turquoise.",
          "For high-value faceted single stones, such as precision-cut rubellite tourmaline or fine sapphires, a comprehensive gemological report documenting exact carat weight, millimeter dimensions, refractive index, and treatment status is mandatory for international trade, insurance, and resale.",
        ],
      },
    ],
    relatedGemstones: [
      { name: "Afghanistan Cut Rubellite", slug: "afghanistan-rubellite" },
      { name: "Commercial-Quality Turquoise", slug: "turquoise" },
    ],
  },
  {
    id: "evaluating-natural-vs-imitation-turquoise",
    slug: "evaluating-natural-vs-imitation-turquoise",
    title: "Evaluating Commercial Turquoise: Distinguishing Real Material from Reconstituted Simulants",
    subtitle: "How gemologists identify authentic copper aluminum phosphate from dyed howlite, magnesite, and synthetic blocks.",
    category: "market-standards",
    categoryLabel: "Market Standards",
    readingTimeMinutes: 5,
    publishedDate: "November 2026",
    excerpt:
      "The global marketplace is inundated with dyed magnesite, howlite, and plastic block imitations. How to verify real mineral turquoise matrix, specific gravity, and hot-point reactions.",
    keyTakeaways: [
      "Dyed howlite and magnesite are common cheap substitutes for authentic turquoise rough.",
      "Authentic turquoise has a specific gravity of 2.60 to 2.85; plastic simulants are significantly lighter (~1.10 to 1.40).",
      "Matrix patterns in genuine turquoise show natural limonite depth and irregular graining, whereas fake matrix is stamped or painted.",
      "Stabilized genuine turquoise remains natural mineral rough that has been reinforced, completely distinct from reconstituted plastic blocks.",
    ],
    contentSections: [
      {
        heading: "The Epidemic of Turquoise Simulants",
        paragraphs: [
          "Due to high demand and depleting global mines, commercial turquoise is one of the most frequently imitated gem materials on the market. Inexperienced dealers are routinely offered 'reconstituted turquoise', 'block turquoise', or dyed minerals such as howlite (calcium borosilicate) and magnesite (magnesium carbonate) masquerading as genuine rough.",
          "It is critical to distinguish between ethical stabilization of genuine turquoise and counterfeit imitations. Stabilized turquoise—such as our commercial rough parcel—is composed of authentic geological turquoise mineral (hydrated copper aluminum phosphate) whose natural porous capillaries have been filled with colorless polymer resin. It is genuine gemstone material, whereas dyed howlite is an entirely different mineral species.",
        ],
        callout:
          "Gemological Test: Natural turquoise reacts to specific gravity testing (2.60–2.85) and refractometry (spot reading 1.61). Dyed howlite and magnesite display higher specific gravities and distinct absorption spectra.",
      },
      {
        heading: "Physical and Optical Identification Guidelines",
        paragraphs: [
          "Examining matrix veining under a 10x gemological loupe reveals definitive clues. In genuine turquoise rough, the dark limonite and sandstone matrix displays micro-cavities, jagged boundaries, and natural pyritic inclusions. In imitation block material, the 'matrix' appears uniform, rounded, and unnatural, often pooling in artificially stamped surface depressions.",
        ],
      },
    ],
    relatedGemstones: [
      { name: "Commercial-Quality Turquoise", slug: "turquoise" },
    ],
  },
];

export function getAllInsights(): InsightArticle[] {
  return INSIGHT_ARTICLES;
}

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return INSIGHT_ARTICLES.find((a) => a.slug === slug);
}

export function getInsightsByCategory(category: string): InsightArticle[] {
  if (!category || category === "all") return INSIGHT_ARTICLES;
  return INSIGHT_ARTICLES.filter((a) => a.category === category);
}
