import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm uppercase tracking-widest text-[var(--forest)]">About LibraGems</p>
        <h1 className="mt-4 font-serif text-5xl text-[var(--forest-deep)]">Our company</h1>
        <p className="mt-6 leading-8 text-[var(--muted)]">
          Add the company profile, history and business information after it has been
          reviewed and approved by the business.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
