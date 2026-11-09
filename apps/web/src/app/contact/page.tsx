import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Phone, Clock, Video } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export const metadata: Metadata = {
  title: "Contact Trading Desk | Bangkok Showroom & Inquiries",
  description:
    "Contact Libra Gems & Trading Co., Ltd. on Charoen Krung Road, Bang Rak, Bangkok. Submit commercial lot inquiries, request parcel splits, or schedule a showroom viewing.",
  alternates: {
    canonical: "https://libragems.net/contact",
  },
  openGraph: {
    title: "Contact Trading Desk | LibraGems Bangkok",
    description:
      "Direct B2B commercial inquiries for rough gemstones, mineral specimens, and cut colored gems. Bang Rak trading showroom.",
    url: "https://libragems.net/contact",
    siteName: "LibraGems",
    type: "website",
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact Trading Desk" },
  ];

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* Header Hero */}
        <section className="border-b border-border bg-beige py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <Breadcrumbs items={breadcrumbs} />

            <div className="mt-4 max-w-3xl space-y-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
                Direct Commercial Communications
              </span>
              <h1 className="font-serif text-4xl font-medium leading-tight text-forest-deep sm:text-5xl md:text-6xl">
                Contact our trading desk in Bangkok.
              </h1>
              <p className="text-base leading-relaxed text-stone md:text-lg">
                Submit specific parcel inquiries, request calibrated lot splits, or arrange an
                in-person private viewing at our showroom on Charoen Krung Road in Bang Rak.
              </p>
            </div>
          </div>
        </section>

        {/* Two-Column Split Layout */}
        <section className="border-b border-border bg-ivory py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              {/* Left Column: Direct Corporate Channels (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                {/* Physical Location */}
                <div className="rounded-2xl border border-border bg-white p-7 shadow-subtle space-y-3">
                  <div className="flex items-center gap-2.5 text-forest font-semibold text-xs uppercase tracking-wider">
                    <MapPin className="h-4 w-4 text-champagne" />
                    <span>Registered Trading Office</span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-forest-deep">
                    Bangkok Showroom
                  </h3>
                  <p className="text-xs leading-relaxed text-stone">
                    Libra Gems &amp; Trading Co., Ltd.
                    <br />
                    1394 Charoen Krung Road, Bang Rak
                    <br />
                    Bangkok 10500, Thailand
                  </p>
                  <p className="text-[11px] text-stone/80 pt-1">
                    Located in the historic Bangkok gem district near the Chao Phraya River.
                  </p>
                </div>

                {/* Direct Communications */}
                <div className="rounded-2xl border border-border bg-white p-7 shadow-subtle space-y-4">
                  <h3 className="font-serif text-xl font-medium text-forest-deep">
                    Verified Direct Channels
                  </h3>

                  <div className="space-y-3 text-xs text-stone">
                    <div className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-forest-deep">Corporate Email</p>
                        <a
                          href="mailto:info@libragems.net"
                          className="text-forest hover:underline"
                        >
                          info@libragems.net
                        </a>
                        <p className="text-[11px] text-stone/75">Monitored during trading hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 border-t border-border pt-3">
                      <Phone className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-forest-deep">Office Landline (Bangkok)</p>
                        <p className="font-mono text-ink">+66 2 238 1934</p>
                        <p className="text-[11px] text-stone/75">
                          Status: Pending re-verification before production link activation.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 border-t border-border pt-3">
                      <Clock className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-forest-deep">Trading Desk Hours</p>
                        <p className="text-ink">Monday – Friday: 09:00 – 18:00 (UTC+7)</p>
                        <p className="text-[11px] text-stone/75">
                          Saturday by appointment • Closed Sunday &amp; Thai National Holidays
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Showroom Viewing Guidelines */}
                <div className="rounded-2xl border border-border bg-beige/60 p-7 space-y-3">
                  <div className="flex items-center gap-2 text-forest-deep font-serif text-lg font-medium">
                    <Video className="h-5 w-5 text-forest" />
                    <span>Private Viewing Appointments</span>
                  </div>
                  <p className="text-xs leading-relaxed text-stone">
                    To maintain security and dedicated gemological attention, physical showroom
                    examinations are conducted on an appointment-only basis. Please submit your
                    scheduled dates and material requirements at least 48 hours in advance.
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive B2B Web Enquiry Form (7 cols) */}
              <div className="lg:col-span-7">
                <Suspense
                  fallback={
                    <div className="h-96 rounded-2xl border border-border bg-white p-8 animate-pulse" />
                  }
                >
                  <EnquiryForm />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
