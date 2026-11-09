export type GemstoneCategory = "rough" | "mineral" | "cut" | "beads";

export type GemstoneForm = "Rough Parcel" | "Mineral / Rough" | "Precision Cut Stone" | "Calibrated Beads";

export type OriginStatus = "verified" | "trade_consensus" | "unverified";

export type TreatmentStatus = "natural_untreated" | "stabilized" | "enhanced" | "unverified";

export type CibjoCode = "N" | "T" | "E";

export type CertificationStatus = "certified" | "pending_verification" | "available_on_request";

export interface GemstoneImage {
  src: string;
  alt: string;
  caption: string;
  view: "overview" | "macro" | "scale" | "table" | "pavilion" | "facet" | "matrix";
  isPlaceholder?: boolean;
}

export interface GemstoneFAQ {
  question: string;
  answer: string;
}

export interface GemstoneProduct {
  id: string;
  slug: string;
  lotReference: string;
  name: string;
  tradeTitle: string;
  subtitle: string;
  category: GemstoneCategory;
  form: GemstoneForm;
  
  // Gemological identity
  species: string;
  variety: string;
  chemicalFormula: string;
  crystalSystem: string;
  hardness: string;
  specificGravity: string;
  refractiveIndex: string;
  opticalCharacter?: string;

  // Commercial attributes
  lotWeight: string;
  dimensionsOrSieve: string;
  cutStyle?: string;
  colorTone: string;
  clarityDescription: string;
  moq: string;

  // Provenance & Disclosures
  origin: {
    country: string;
    region?: string;
    status: OriginStatus;
    disclosureNote: string;
  };
  treatment: {
    status: TreatmentStatus;
    cibjoCode: CibjoCode;
    name: string;
    disclosure: string;
  };
  certification: {
    status: CertificationStatus;
    availableLabs: string[];
    memoReference?: string;
    note: string;
  };

  // Editorial content
  shortDescription: string;
  fullOverview: string;
  geologicalContext: string;
  lapidaryCharacteristics: string;
  commercialApplications: string[];
  
  images: GemstoneImage[];
  faqs: GemstoneFAQ[];
}
