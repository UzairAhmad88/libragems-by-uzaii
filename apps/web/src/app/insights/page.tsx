import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = { title: "Gemstone Insights" };

export default function InsightsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="font-serif text-5xl text-[var(--forest-deep)]">Gemstone insights</h1>
        <p className="mt-6 leading-8 text-[var(--muted)]">
          Publish original, fact-checked gemstone education and buying guidance here.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
