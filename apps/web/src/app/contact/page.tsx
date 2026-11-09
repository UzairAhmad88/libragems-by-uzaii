import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-serif text-5xl text-[var(--forest-deep)]">Contact LibraGems</h1>
        <p className="mt-5 leading-7 text-[var(--muted)]">
          Contact details and the secure enquiry form will be enabled after business
          contact information and email delivery settings are verified.
        </p>
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--beige)] p-6">
          <p className="font-medium text-[var(--forest)]">Enquiries</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Please configure a verified business email and WhatsApp number before launch.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
