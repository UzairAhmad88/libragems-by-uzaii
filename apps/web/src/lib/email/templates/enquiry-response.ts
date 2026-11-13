import { renderEmailLayout } from "./layout";
import { escapeHtml } from "../email-validation";

export interface EnquiryResponseData {
  customerName: string;
  referenceNumber: string;
  gemstoneInterest: string;
  responseMessage: string;
  adminName?: string;
  adminTitle?: string;
}

export function renderEnquiryResponseEmail(data: EnquiryResponseData) {
  const safeName = escapeHtml(data.customerName);
  const safeRef = escapeHtml(data.referenceNumber);
  const safeGemstone = escapeHtml(data.gemstoneInterest);
  const safeAdmin = data.adminName ? escapeHtml(data.adminName) : "Trading Lead";
  const safeTitle = data.adminTitle ? escapeHtml(data.adminTitle) : "Bangkok Gemological Trading Desk";

  // Format message lines into paragraphs
  const formattedMessage = data.responseMessage
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p style="margin: 0 0 14px 0; line-height: 1.6;">${escapeHtml(p)}</p>`)
    .join("");

  const subject = `Re: Your Libra Gems Enquiry – ${data.referenceNumber}`;

  const contentHtml = `
    <p style="margin: 0 0 16px 0; font-size: 15px;">
      Dear <strong>${safeName}</strong>,
    </p>

    <!-- Context Reference Header -->
    <div style="background-color: #FAF8F2; border-left: 3px solid #174C38; padding: 12px 16px; margin: 16px 0 24px 0; font-size: 12px; color: #6E756F;">
      <strong>Regarding:</strong> ${safeGemstone} &bull; <strong>Dossier Reference:</strong> <span style="font-family: 'Courier New', Courier, monospace; color: #103729; font-weight: 700;">${safeRef}</span>
    </div>

    <!-- Admin Response Body -->
    <div style="font-size: 14px; color: #242A26; margin-bottom: 28px;">
      ${formattedMessage}
    </div>

    <!-- Official Signature -->
    <div style="border-top: 1px solid #DDD8CC; padding-top: 20px; font-size: 13px; color: #242A26;">
      <p style="margin: 0 0 4px 0; font-weight: 700; color: #103729;">
        ${safeAdmin}
      </p>
      <p style="margin: 0 0 12px 0; color: #6E756F; font-size: 12px;">
        ${safeTitle}<br>
        Libra Gems &amp; Trading Co., Ltd. • Bangkok, Thailand
      </p>
      <p style="margin: 0; font-size: 11px; color: #6E756F;">
        Direct Inquiries: <a href="mailto:info@libragems1.com" style="color: #173D30;">info@libragems1.com</a> &bull; <a href="https://libragems1.com" style="color: #173D30;">libragems1.com</a>
      </p>
    </div>
  `;

  const html = renderEmailLayout({
    preheader: `Response regarding your inquiry ${data.referenceNumber}`,
    heading: "Commercial Consultation Response",
    subheading: `Official Communication &bull; Ref: ${safeRef}`,
    contentHtml,
  });

  const text = `
LIBRA GEMS & TRADING CO., LTD.
Commercial Consultation Response

Dear ${data.customerName},

Regarding: ${data.gemstoneInterest} (Ref: ${data.referenceNumber})

${data.responseMessage}

Sincerely,
${data.adminName || "Trading Lead"}
${data.adminTitle || "Bangkok Gemological Trading Desk"}
Libra Gems & Trading Co., Ltd.
Bangkok, Thailand
https://libragems1.com
  `.trim();

  return { subject, html, text };
}
