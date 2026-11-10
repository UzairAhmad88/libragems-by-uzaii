import { renderEmailLayout } from "./layout";
import { escapeHtml } from "../email-validation";

export interface CustomerAcknowledgementData {
  customerName: string;
  referenceNumber: string;
  gemstoneInterest: string;
  companyName?: string | null;
  quantitySpecs?: string | null;
  message?: string;
}

export function renderCustomerAcknowledgementEmail(data: CustomerAcknowledgementData) {
  const safeName = escapeHtml(data.customerName);
  const safeRef = escapeHtml(data.referenceNumber);
  const safeGemstone = escapeHtml(data.gemstoneInterest);
  const safeCompany = data.companyName ? escapeHtml(data.companyName) : null;
  const safeSpecs = data.quantitySpecs ? escapeHtml(data.quantitySpecs) : null;

  const subject = "We Have Received Your Enquiry – Libra Gems";

  const contentHtml = `
    <p style="margin: 0 0 16px 0; font-size: 15px;">
      Dear <strong>${safeName}</strong>,
    </p>
    <p style="margin: 0 0 16px 0;">
      Thank you for contacting <strong>Libra Gems &amp; Trading Co., Ltd.</strong> regarding your commercial requirement for <strong>${safeGemstone}</strong>.
    </p>

    <!-- Reference Box -->
    <div style="background-color: #FAF8F2; border: 1px solid #B99B68; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
      <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #6E756F;">
        Official Tracking Reference
      </p>
      <p style="margin: 0; font-family: 'Courier New', Courier, monospace; font-size: 20px; font-weight: 700; color: #103729;">
        ${safeRef}
      </p>
    </div>

    <p style="margin: 0 0 16px 0;">
      Our Bangkok trading desk has logged your trade dossier into our commercial intake registry. A dedicated gemological trading representative is reviewing current lot availability and grading parameters.
    </p>

    <!-- Summary Details -->
    <table role="presentation" width="100%" border="0" cellpadding="6" cellspacing="0" style="margin: 16px 0; border-collapse: collapse; font-size: 13px;">
      <tr style="border-bottom: 1px solid #DDD8CC;">
        <td style="color: #6E756F; width: 35%;">Material Requested:</td>
        <td style="font-weight: 600; color: #103729;">${safeGemstone}</td>
      </tr>
      ${
        safeCompany
          ? `<tr style="border-bottom: 1px solid #DDD8CC;">
              <td style="color: #6E756F;">Organization:</td>
              <td style="color: #242A26;">${safeCompany}</td>
            </tr>`
          : ""
      }
      ${
        safeSpecs
          ? `<tr style="border-bottom: 1px solid #DDD8CC;">
              <td style="color: #6E756F;">Target Sieve / Quantity:</td>
              <td style="color: #242A26;">${safeSpecs}</td>
            </tr>`
          : ""
      }
    </table>

    <div style="background-color: #F3EFE5; border-left: 3px solid #174C38; padding: 12px 16px; margin: 20px 0; font-size: 12px; color: #242A26; line-height: 1.5;">
      <strong>Commercial Notice:</strong> This communication acknowledges formal receipt of your request. All wholesale offers remain subject to CIBJO ethical disclosures, independent laboratory verification in Bangkok, and final commercial memorandum agreements.
    </div>

    <p style="margin: 24px 0 0 0;">
      Sincerely,<br>
      <strong>Trading Desk &amp; Commercial Relations</strong><br>
      Libra Gems &amp; Trading Co., Ltd. • Bangkok, Thailand
    </p>
  `;

  const html = renderEmailLayout({
    preheader: `Trade Enquiry Confirmation: ${data.referenceNumber}`,
    heading: "Commercial Enquiry Received",
    subheading: "Bangkok Trading Desk Intake Confirmation",
    contentHtml,
  });

  const text = `
LIBRA GEMS & TRADING CO., LTD.
Commercial Enquiry Received

Dear ${data.customerName},

Thank you for contacting Libra Gems & Trading Co., Ltd. regarding your commercial requirement for ${data.gemstoneInterest}.

OFFICIAL REFERENCE: ${data.referenceNumber}

Our Bangkok gemological trading desk has registered your inquiry into our active intake queue. A representative will evaluate parcel availability and respond with formal commercial specifications.

Summary:
- Material: ${data.gemstoneInterest}
${data.companyName ? `- Company: ${data.companyName}\n` : ""}${data.quantitySpecs ? `- Target Quantity/Sieve: ${data.quantitySpecs}\n` : ""}
Commercial Notice: This communication acknowledges receipt of your inquiry parameters. Wholesale transactions remain subject to CIBJO ethical disclosures and bilateral commercial memorandum agreements.

Sincerely,
Trading Desk & Commercial Relations
Libra Gems & Trading Co., Ltd.
Bangkok, Thailand
https://libragems.net
  `.trim();

  return { subject, html, text };
}
