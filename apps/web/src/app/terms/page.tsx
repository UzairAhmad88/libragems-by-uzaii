import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Terms of Use | LibraGems",
  description: "Terms of use and commercial trading standards for Libra Gems & Trading Co., Ltd.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1 mx-auto max-w-4xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-forest">
          Legal & Compliance
        </p>
        <h1 className="mt-4 font-serif text-4xl text-forest-deep md:text-5xl">
          Terms of Use
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone">
          <p>
            This website provides commercial inventory information for international gemstone traders,
            lapidaries, and collectors. All inventory listings are subject to prior sale and physical
            inspection terms.
          </p>
          <div className="rounded-2xl border border-dashed border-border bg-beige p-6 text-xs text-stone">
            Formal commercial terms of trade will be finalized upon client legal counsel sign-off.
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
