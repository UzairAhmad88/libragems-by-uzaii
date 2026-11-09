import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const items = [
  {
    name: "Rough Hessonite Garnet",
    href: "/gemstones/hessonite-garnet",
    category: "Rough gemstone",
    summary: "Grossular garnet rough pebbles selected for commercial lapidary and bead cutting.",
  },
  {
    name: "Commercial-Quality Turquoise",
    href: "/gemstones/turquoise",
    category: "Mineral / Rough",
    summary: "High-density rough turquoise material with distinct spiderweb matrix patterns.",
  },
  {
    name: "Afghanistan Cut-Stone Rubellite",
    href: "/gemstones/afghanistan-rubellite",
    category: "Cut gemstone",
    summary: "Precision-faceted purplish-red tourmaline cut stone with verified metrics.",
  },
];

export const metadata = {
  title: "Gemstones Catalogue | LibraGems",
  description: "Browse commercial-quality rough gemstones, minerals, and cut stones available from LibraGems in Bangkok.",
};

export default function GemstonesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1 mx-auto max-w-7xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          Inventory Catalogue
        </p>
        <h1 className="mt-3 font-serif text-4xl text-forest-deep md:text-5xl">
          Available Gemstones
        </h1>
        <p className="mt-4 max-w-2xl text-base text-stone">
          Explore our current physical inventory held in Bangkok. All gemstone materials are available
          for parcel viewing or direct wholesale enquiry.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-border bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-champagne hover:shadow-card-hover"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-stone">
                {item.category}
              </p>
              <h2 className="mt-3 font-serif text-2xl text-forest group-hover:text-forest-light transition-colors">
                {item.name}
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-stone">
                {item.summary}
              </p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-forest group-hover:text-champagne transition-colors">
                View Specifications →
              </p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
