import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const products = [
  ["Rough Hessonite Garnet", "/gemstones/hessonite-garnet"],
  ["Commercial-Quality Turquoise", "/gemstones/turquoise"],
  ["Afghanistan Cut-Stone Rubellite", "/gemstones/afghanistan-rubellite"]
];

export const metadata = { title: "Gemstones" };

export default function GemstonesPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="font-serif text-5xl text-[var(--forest-deep)]">Our gemstones</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {products.map(([name, href]) => (
            <a key={href} href={href} className="rounded-2xl border border-[var(--border)] bg-white p-7">
              <h2 className="font-serif text-2xl text-[var(--forest)]">{name}</h2>
              <p className="mt-5 text-sm text-[var(--forest)]">Explore details →</p>
            </a>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
