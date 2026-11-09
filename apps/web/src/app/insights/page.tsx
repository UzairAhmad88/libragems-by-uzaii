import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Gemstone Insights & Knowledge | LibraGems",
  description:
    "Educational articles, mineralogical guides, and market observations from Libra Gems & Trading Co., Ltd.",
};

export default function InsightsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1 mx-auto max-w-4xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-forest">
          Gemstone Knowledge
        </p>
        <h1 className="mt-4 font-serif text-4xl text-forest-deep md:text-5xl">
          Market Insights & Gemology
        </h1>
        <p className="mt-6 text-base leading-relaxed text-stone">
          Explore educational resources regarding rough gemstone evaluation, matrix structures in
          turquoise, and optical characteristics of colored tourmalines.
        </p>
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-beige p-8 text-center text-xs text-stone">
          Editorial articles and guides will be published in Phase 03.
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
