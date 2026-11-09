import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Commercial-Quality Turquoise",
  description: "Explore commercial-quality Turquoise and contact LibraGems for verified material details and availability."
};

export default function ProductPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-sm uppercase tracking-widest text-[var(--forest)]">Gemstone / mineral</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl text-[var(--forest-deep)]">Commercial-Quality Turquoise</h1>
        <p className="mt-6 max-w-3xl leading-8 text-[var(--muted)]">Explore commercial-quality Turquoise and contact LibraGems for verified material details and availability.</p>
        <div className="mt-10 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--beige)] p-10 text-center text-sm text-[var(--muted)]">
          Approved product photography and verified specifications required before publication.
        </div>
        <div className="mt-8">
          <a href="/contact" className="inline-flex rounded-full bg-[var(--forest)] px-7 py-3 text-sm text-white">
            Enquire about this gemstone
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
