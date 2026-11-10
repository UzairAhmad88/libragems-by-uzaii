import { renderEmailLayout } from "./layout";
import { escapeHtml } from "../email-validation";

export interface AdminNewEnquiryData {
  enquiryId: string;
  referenceNumber: string;
  customerName: string;
  companyName?: string | null;
  email: string;
  phone?: string | null;
  country?: string | null;
  gemstoneInterest: string;
  quantitySpecs?: string | null;
  message: string;
  priority?: string;
  sourcePage?: string | null;
  createdAt: string;
}

export function renderAdminNewEnquiryEmail(data: AdminNewEnquiryData) {
  const safeRef = escapeHtml(data.referenceNumber);
  const safeName = escapeHtml(data.customerName);
  const safeCompany = data.companyName ? escapeHtml(data.companyName) : "Private Lapidary / Collector";
  const safeEmail = escapeHtml(data.email);
  const safePhone = data.phone ? escapeHtml(data.phone) : "Not specified";
  const safeCountry = data.country ? escapeHtml(data.country) : "Not specified";
  const safeGemstone = escapeHtml(data.gemstoneInterest);
  const safeSpecs = data.quantitySpecs ? escapeHtml(data.quantitySpecs) : "Not specified";
  const safeMessage = escapeHtml(data.message);
  const priority = data.priority || "normal";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const dashboardLink = `${siteUrl}/admin/enquiries/${data.enquiryId}`;

  const subject = `[New Trade Enquiry] ${data.referenceNumber} – ${data.gemstoneInterest}`;

  const contentHtml = `
    <!-- Top Alert Banner -->
    <div style="background-color: #103729; color: #FFFFFF; border-radius: 8px; padding: 14px 20px; margin-bottom: 24px; text-align: center;">
      <span style="font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #B99B68; display: block;">
        Action Required: Incoming B2B Inquiry
      </span>
      <span style="font-family: 'Courier New', Courier, monospace; font-size: 18px; font-weight: 700; color: #FFFFFF;">
        ${safeRef}
      </span>
    </div>

    <!-- Key Parameters -->
    <h3 style="font-size: 14px; font-weight: 700; color: #174C38; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px;">
      Client &amp; Material Specifications
    </h3>

    <table role="presentation" width="100%" border="0" cellpadding="6" cellspacing="0" style="margin-bottom: 20px; border-collapse: collapse; font-size: 13px;">
      <tr style="border-bottom: 1px solid #DDD8CC;">
        <td style="color: #6E756F; width: 35%;">Buyer Name:</td>
        <td style="font-weight: 600; color: #103729;">${safeName}</td>
      </tr>
      <tr style="border-bottom: 1px solid #DDD8CC;">
        <td style="color: #6E756F;">Organization:</td>
        <td style="color: #242A26;">${safeCompany}</td>
      </tr>
      <tr style="border-bottom: 1px solid #DDD8CC;">
        <td style="color: #6E756F;">Commercial Email:</td>
        <td><a href="mailto:${safeEmail}" style="color: #174C38; font-weight: 600;">${safeEmail}</a></td>
      </tr>
      <tr style="border-bottom: 1px solid #DDD8CC;">
        <td style="color: #6E756F;">Phone / WhatsApp:</td>
        <td style="color: #242A26;">${safePhone}</td>
      </tr>
      <tr style="border-bottom: 1px solid #DDD8CC;">
        <td style="color: #6E756F;">Country:</td>
        <td style="color: #242A26;">${safeCountry}</td>
      </tr>
      <tr style="border-bottom: 1px solid #DDD8CC;">
        <td style="color: #6E756F;">Material Target:</td>
        <td style="font-weight: 600; color: #174C38;">${safeGemstone}</td>
      </tr>
      <tr style="border-bottom: 1px solid #DDD8CC;">
        <td style="color: #6E756F;">Quantity / Sieve:</td>
        <td style="font-family: 'Courier New', Courier, monospace; color: #242A26;">${safeSpecs}</td>
      </tr>
      <tr style="border-bottom: 1px solid #DDD8CC;">
        <td style="color: #6E756F;">Priority:</td>
        <td><strong style="text-transform: uppercase; color: #B99B68;">${priority}</strong></td>
      </tr>
    </table>

    <!-- Transmitted Message -->
    <h3 style="font-size: 14px; font-weight: 700; color: #174C38; margin: 20px 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">
      Transmitted Requirements
    </h3>
    <div style="background-color: #FAF8F2; border: 1px solid #DDD8CC; border-radius: 8px; padding: 16px; font-size: 13px; line-height: 1.6; color: #242A26; white-space: pre-wrap;">
      ${safeMessage}
    </div>

    <!-- Direct Action Button -->
    <div style="margin: 28px 0 12px 0; text-align: center;">
      <a href="${dashboardLink}" style="display: inline-block; background-color: #174C38; color: #FFFFFF; font-size: 13px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 50px; text-transform: uppercase; letter-spacing: 1px;">
        Open Dossier in Admin Console &rarr;
      </a>
    </div>
  `;

  const html = renderEmailLayout({
    preheader: `[New Inquiry] ${data.referenceNumber} from ${data.customerName}`,
    heading: "New Trade Enquiry Received",
    subheading: "Commercial Intake Alert • Bangkok Desk",
    contentHtml,
  });

  const text = `
NEW B2B TRADE ENQUIRY: ${data.referenceNumber}
--------------------------------------------------
Buyer: ${data.customerName}
Company: ${data.companyName || "Private"}
Email: ${data.email}
Phone: ${data.phone || "Not specified"}
Country: ${data.country || "Not specified"}
Material Interest: ${data.gemstoneInterest}
Target Sizing: ${data.quantitySpecs || "Not specified"}
Priority: ${priority.toUpperCase()}

Requirements:
${data.message}

Review in Admin Console:
${dashboardLink}
  `.trim();

  return { subject, html, text };
}
