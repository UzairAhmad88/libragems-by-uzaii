export interface CatalogCategoryDefinition {
  id: string;
  slug: string;
  name: string;
  badge: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  displayOrder: number;
  tradeScope: string;
}

export const CATALOG_CATEGORIES: CatalogCategoryDefinition[] = [
  {
    id: "cat-faceted-single-stones",
    slug: "faceted-single-stones",
    name: "Faceted Single Stones",
    badge: "Individual Viewing & Memo",
    shortDescription:
      "Explore individually selected faceted gemstones, presented with attention to their colour, cut, clarity and distinctive natural character.",
    fullDescription:
      "Our Faceted Single Stones collection represents individually selected natural colored gemstones curated for high-jewelry commissions, bespoke atelier creations, and connoisseur acquisition. Each gemstone is catalogued with precision cut parameters, pleochroism, color saturation, and accredited Bangkok laboratory memo verification.",
    heroImage: "/images/gemstones/category-faceted-single-stones.jpg",
    displayOrder: 1,
    tradeScope: "Individual stones • Private viewing • Memo on request",
  },
  {
    id: "cat-gemstone-lots",
    slug: "gemstone-lots",
    name: "Gemstone Lots",
    badge: "Wholesale Parcels & Suites",
    shortDescription:
      "Discover curated gemstone lots for wholesale buyers, traders and jewellery businesses, with product details available for each listed collection.",
    fullDescription:
      "Our Gemstone Lots category provides international dealers, jewelry manufacturers, and lapidary ateliers with commercial parcels, curated matched suites, and mineral rough lots directly from Bangkok's historic trading district. Every offering includes verified parcel weights, sieve calibrations, and strict CIBJO treatment disclosures.",
    heroImage: "/images/gemstones/category-gemstone-lots.jpg",
    displayOrder: 2,
    tradeScope: "Wholesale parcels • Commercial lots • Minimum order quantities",
  },
];

export function getCategoryBySlug(slug: string): CatalogCategoryDefinition | undefined {
  return CATALOG_CATEGORIES.find((c) => c.slug === slug);
}

export function getAllCategories(): CatalogCategoryDefinition[] {
  return CATALOG_CATEGORIES;
}

