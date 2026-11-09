import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Contact Trading Desk | LibraGems Bangkok",
  description:
    "Direct contact details and enquiry form for Libra Gems & Trading Co., Ltd. in Bangkok, Thailand.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1 mx-auto max-w-4xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-forest">
          Direct Trade Enquiries
        </p>
        <h1 className="mt-4 font-serif text-4xl text-forest-deep md:text-5xl">
          Contact Our Trading Desk
        </h1>
        <p className="mt-6 text-base leading-relaxed text-stone">
          For parcel enquiries, video viewings, and commercial gemstone orders, please contact our
          Bangkok office directly.
        </p>
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-beige p-8 text-center text-xs text-stone">
          Interactive enquiry form and verified direct WhatsApp and telephone channels will be activated in Phase 03 and Phase 05 following client confirmation.
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
