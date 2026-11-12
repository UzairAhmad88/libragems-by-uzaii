import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd, createBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | Libra Gems & Trading Co.",
  description:
    "Privacy Policy and B2B commercial data protection practices for Libra Gems & Trading Co., Ltd. (Bangkok, Thailand).",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Privacy Policy" },
  ];

  return (
    <>
      <JsonLd data={createBreadcrumbSchema(breadcrumbs)} />
      <SiteHeader />

      <main id="main-content" className="flex-1">
        <div className="border-b border-border bg-beige/40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        <article className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          {/* Draft Notice Banner */}
          <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-950 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-700 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">
                Draft Document Notice — Subject to Formal Legal Counsel Review
              </p>
              <p className="mt-1 leading-relaxed text-amber-900/80">
                This document represents an engineering and operational draft outlining LibraGems&apos;
                commercial data handling practices. It is pending formal legal review by qualified Thai
                counsel prior to production launch.
              </p>
            </div>
          </div>

          <header className="border-b border-border pb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-forest">
              Legal &amp; Regulatory Compliance
            </span>
            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-forest-deep sm:text-4xl md:text-5xl">
              Privacy Policy (Commercial B2B)
            </h1>
            <p className="mt-2 text-xs text-stone">
              Entity: Libra Gems &amp; Trading Co., Ltd. • Last revised: November 2026
            </p>
          </header>

          <div className="prose prose-stone mt-8 max-w-none text-xs leading-relaxed text-ink/90 space-y-6">
            <section className="space-y-3">
              <h2 className="font-serif text-xl font-medium text-forest-deep">
                1. Corporate Identity and Data Controller
              </h2>
              <p className="text-stone">
                This policy outlines how <strong>Libra Gems &amp; Trading Co., Ltd.</strong> (operating
                from 1394 Charoen Krung Road, Bang Rak, Bangkok 10500, Thailand) collects, processes, and
                protects commercial data transmitted through this website platform (libragems.net).
              </p>
              <p className="text-stone">
                LibraGems operates strictly as an international Business-to-Business (B2B) gemstone
                trading firm. We do not operate consumer retail e-commerce stores, open public buyer
                registrations, or engage in third-party behavioral advertising.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-medium text-forest-deep">
                2. Information We Collect
              </h2>
              <p className="text-stone">
                When you initiate a commercial enquiry or request gemstone lot dossiers, we collect
                information strictly necessary to evaluate and fulfill your trade inquiry:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-stone">
                <li>Professional identity details (Full name, title, business affiliation).</li>
                <li>Commercial contact details (Corporate email address, business telephone number).</li>
                <li>Geographic location (Country and city of operation).</li>
                <li>Gemstone specifications (Material of interest, lot weight, target sieve size).</li>
                <li>Technical session metadata (IP address, browser type for security monitoring).</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-medium text-forest-deep">
                3. Purpose of Processing
              </h2>
              <p className="text-stone">
                All business data provided to LibraGems is processed strictly for legitimate commercial
                trading purposes:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-stone">
                <li>Preparing and transmitting commercial quotations and proforma invoices.</li>
                <li>Coordinating laboratory certification memos through Bangkok testing institutes.</li>
                <li>Scheduling private showroom viewing appointments in Bangkok.</li>
                <li>Fulfilling export customs clearance and international courier insurance mandates.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-medium text-forest-deep">
                4. Absolute Non-Sale of Client Lists
              </h2>
              <p className="text-stone">
                In accordance with our strict trade confidentiality pledge, LibraGems{" "}
                <strong>never sells, rents, monetizes, or shares</strong> client names, purchase
                histories, or inquiry details with external marketing brokers or third-party advertisers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-medium text-forest-deep">
                5. Compliance with Thai Personal Data Protection Act (PDPA)
              </h2>
              <p className="text-stone">
                As a corporate entity registered in the Kingdom of Thailand, LibraGems adheres to the
                principles established under the Thai Personal Data Protection Act B.E. 2562 (2019)
                (PDPA). Trade contacts retain the right to request access to their stored communication
                history, request data rectification, or request complete erasure from active quotation
                records by contacting our data desk at{" "}
                <a href="mailto:info@libragems.net" className="text-forest underline">
                  info@libragems.net
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl font-medium text-forest-deep">
                6. Contact for Privacy Inquiries
              </h2>
              <p className="text-stone">
                For formal inquiries regarding our commercial data handling or to exercise data rights,
                direct correspondence to:
                <br />
                <strong>Data Desk • Libra Gems &amp; Trading Co., Ltd.</strong>
                <br />
                1394 Charoen Krung Road, Bang Rak, Bangkok 10500, Thailand
                <br />
                Email: info@libragems.net
              </p>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
