import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "About LibraGems | Bangkok Gemstone Trading",
  description:
    "Learn about Libra Gems & Trading Co., Ltd., based in Bangkok's historic Bang Rak gemstone district.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1 mx-auto max-w-4xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-forest">
          About LibraGems
        </p>
        <h1 className="mt-4 font-serif text-4xl text-forest-deep md:text-5xl">
          The Trading House
        </h1>
        <p className="mt-6 text-base leading-relaxed text-stone">
          Libra Gems & Trading Co., Ltd. is located in the Bang Rak gemstone trading district of
          Bangkok, Thailand. We specialize in the evaluation, acquisition, and supply of rough
          gemstones, mineral specimens, stone beads, and cut colored gems.
        </p>
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-beige p-8 text-center text-xs text-stone">
          Detailed company history, founding date, and executive bios will be published after formal client verification.
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
