import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = { title: "Quality & Sourcing" };

export default function QualitySourcingPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="font-serif text-5xl text-[var(--forest-deep)]">Quality & sourcing</h1>
        <p className="mt-6 leading-8 text-[var(--muted)]">
          This page will explain the company’s actual quality review and sourcing practices.
          Publish only processes and claims confirmed by the business.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
