import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Quality & Sourcing Standards | LibraGems",
  description:
    "Our transparent approach to gemstone quality grading, treatment disclosure, and origin verification.",
};

export default function QualitySourcingPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1 mx-auto max-w-4xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-forest">
          Our Standard
        </p>
        <h1 className="mt-4 font-serif text-4xl text-forest-deep md:text-5xl">
          Quality & Sourcing Integrity
        </h1>
        <p className="mt-6 text-base leading-relaxed text-stone">
          At LibraGems, we operate under strict CIBJO disclosure standards. We distinguish untreated
          natural gems from stabilized or enhanced materials, and never claim unverified origins.
        </p>
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-beige p-8 text-center text-xs text-stone">
          Verified gemological testing methodologies and laboratory affiliations (GIT, AIGS, Lotus) will be detailed in Phase 03.
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
