import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const products = [
  { name: "Rough Hessonite Garnet", href: "/gemstones/hessonite-garnet", category: "Rough gemstone" },
  { name: "Commercial-Quality Turquoise", href: "/gemstones/turquoise", category: "Gemstone / mineral" },
  { name: "Afghanistan Cut-Stone Rubellite", href: "/gemstones/afghanistan-rubellite", category: "Cut gemstone" }
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-[var(--beige)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--forest)]">
                Gemstone trading
              </p>
              <h1 className="mt-5 max-w-2xl font-serif text-5xl leading-tight text-[var(--forest-deep)] md:text-7xl">
                A considered approach to natural gemstones.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
                Explore selected gemstone offerings and contact LibraGems for product details
                and enquiries.
              </p>
              <a href="/gemstones" className="mt-8 inline-flex rounded-full bg-[var(--forest)] px-7 py-3 text-sm font-medium text-white hover:bg-[var(--forest-deep)]">
                Explore gemstones
              </a>
            </div>
            <div className="flex min-h-72 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--ivory)] p-8 text-center">
              <p className="max-w-sm text-sm leading-6 text-[var(--muted)]">
                Approved company gemstone photography will be placed here.
                <br />Do not use this placeholder as a product image.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--forest)]">Selected offerings</p>
          <h2 className="mt-3 font-serif text-4xl text-[var(--forest-deep)]">Explore our gemstones</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <a key={product.href} href={product.href} className="rounded-2xl border border-[var(--border)] bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
                <p className="text-xs uppercase tracking-wider text-[var(--muted)]">{product.category}</p>
                <h3 className="mt-4 font-serif text-2xl text-[var(--forest)]">{product.name}</h3>
                <p className="mt-6 text-sm text-[var(--forest)]">View product details →</p>
              </a>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
