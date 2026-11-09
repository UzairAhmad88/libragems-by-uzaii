import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const products = [
  {
    name: "Rough Hessonite Garnet",
    href: "/gemstones/hessonite-garnet",
    category: "Rough gemstone",
    spec: "Grossular garnet • Cinnamon-orange rough lot",
  },
  {
    name: "Commercial-Quality Turquoise",
    href: "/gemstones/turquoise",
    category: "Mineral / Rough",
    spec: "Cryptocrystalline • Spiderweb matrix material",
  },
  {
    name: "Afghanistan Cut-Stone Rubellite",
    href: "/gemstones/afghanistan-rubellite",
    category: "Cut gemstone",
    spec: "Elbaite tourmaline • Precision faceted cut stone",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {/* Editorial Hero Section */}
        <section className="border-b border-border bg-beige py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                International Gemstone Trading & Supply
              </p>
              <h1 className="mt-5 font-serif text-4xl leading-tight text-forest-deep md:text-6xl lg:text-7xl">
                A considered approach to natural gemstones.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-stone md:text-lg">
                Sourcing, evaluating, and supplying commercial-quality rough stones, mineral specimens,
                and precision-cut gemstones directly from Bangkok&apos;s historic trading district.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/gemstones"
                  className="inline-flex items-center justify-center rounded-full bg-forest px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-forest-light focus-visible:outline-champagne"
                >
                  Explore Gemstone Catalogue
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-forest px-8 py-3.5 text-sm font-medium text-forest transition-all duration-200 hover:bg-forest hover:text-white focus-visible:outline-champagne"
                >
                  Contact Trading Desk
                </Link>
              </div>
            </div>

            {/* Architectural Studio Photo Placeholder */}
            <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-ivory p-8 text-center shadow-subtle">
              <span className="text-xs font-semibold uppercase tracking-wider text-champagne">
                Authentic Inventory Photo Placeholder
              </span>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-stone">
                Approved studio photography of Bangkok gemstone lots will be placed here in Phase 03.
                Stock photography is strictly prohibited.
              </p>
            </div>
          </div>
        </section>

        {/* Selected Offerings Section */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                Initial Catalogue Offerings
              </p>
              <h2 className="mt-2 font-serif text-3xl text-forest-deep md:text-4xl">
                Featured Gemstone Materials
              </h2>
            </div>
            <Link
              href="/gemstones"
              className="text-sm font-medium text-forest hover:text-forest-light transition-colors"
            >
              View All Gemstones →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.href}
                href={product.href}
                className="group rounded-2xl border border-border bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-champagne hover:shadow-card-hover"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-stone">
                  {product.category}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-forest group-hover:text-forest-light transition-colors">
                  {product.name}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-stone">
                  {product.spec}
                </p>
                <p className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-forest group-hover:text-champagne transition-colors">
                  Inspect Specifications →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
