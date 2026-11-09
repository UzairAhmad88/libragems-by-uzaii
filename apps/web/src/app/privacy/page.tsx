import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Privacy Policy | LibraGems",
  description: "Privacy policy and data protection principles for Libra Gems & Trading Co., Ltd.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1 mx-auto max-w-4xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-forest">
          Legal & Compliance
        </p>
        <h1 className="mt-4 font-serif text-4xl text-forest-deep md:text-5xl">
          Privacy Policy
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone">
          <p>
            Libra Gems & Trading Co., Ltd. respects the privacy of our wholesale clients and visitors.
            Information collected through enquiry forms and communications is used solely for the purpose
            of commercial dialogue, quotation, and trade compliance.
          </p>
          <div className="rounded-2xl border border-dashed border-border bg-beige p-6 text-xs text-stone">
            Formal legal terms will be finalized upon client legal counsel sign-off.
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
