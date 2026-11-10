import { renderEmailLayout } from "./layout";
import { escapeHtml } from "../email-validation";

export interface EnquiryStatusUpdateData {
  customerName: string;
  referenceNumber: string;
  gemstoneInterest: string;
  newStatus: string;
  updateDetails?: string;
}

export function renderEnquiryStatusUpdateEmail(data: EnquiryStatusUpdateData) {
  const safeName = escapeHtml(data.customerName);
  const safeRef = escapeHtml(data.referenceNumber);
  const safeGemstone = escapeHtml(data.gemstoneInterest);
  const safeStatus = escapeHtml(data.newStatus.replace("_", " ").toUpperCase());
  const safeDetails = data.updateDetails ? escapeHtml(data.updateDetails) : null;

  const subject = `Status Update on your Enquiry – ${data.referenceNumber}`;

  const contentHtml = `
    <p style="margin: 0 0 16px 0; font-size: 15px;">
      Dear <strong>${safeName}</strong>,
    </p>
    <p style="margin: 0 0 16px 0;">
      This is a formal status update regarding your trade dossier for <strong>${safeGemstone}</strong> (Reference: <strong style="font-family: 'Courier New', Courier, monospace;">${safeRef}</strong>).
    </p>

    <!-- Status Badge Card -->
    <div style="background-color: #FAF8F2; border: 1px solid #DDD8CC; border-radius: 8px; padding: 18px 24px; margin: 20px 0; text-align: center;">
      <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #6E756F; display: block; margin-bottom: 6px;">
        Current Evaluation Status
      </span>
      <span style="display: inline-block; background-color: #103729; color: #B99B68; font-size: 14px; font-weight: 700; padding: 6px 18px; border-radius: 50px; letter-spacing: 1px;">
        ${safeStatus}
      </span>
    </div>

    ${
      safeDetails
        ? `<div style="background-color: #FFFFFF; border: 1px solid #DDD8CC; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px; line-height: 1.6; color: #242A26;">
            ${safeDetails}
          </div>`
        : ""
    }

    <p style="margin: 0 0 16px 0; font-size: 13px; color: #6E756F;">
      If you have additional questions or wish to arrange a private Bangkok showroom viewing, please reply directly to this communication.
    </p>

    <p style="margin: 24px 0 0 0;">
      Sincerely,<br>
      <strong>Bangkok Trading Desk</strong><br>
      Libra Gems &amp; Trading Co., Ltd.
    </p>
  `;

  const html = renderEmailLayout({
    preheader: `Dossier Status Update: ${data.referenceNumber}`,
    heading: "Trade Enquiry Status Update",
    subheading: `Reference: ${safeRef}`,
    contentHtml,
  });

  const text = `
LIBRA GEMS & TRADING CO., LTD.
Trade Enquiry Status Update

Dear ${data.customerName},

Reference: ${data.referenceNumber}
Material: ${data.gemstoneInterest}
New Status: ${data.newStatus.replace("_", " ").toUpperCase()}

${data.updateDetails ? `${data.updateDetails}\n\n` : ""}
If you have questions, please reply directly to this email or contact our Bangkok trading office.

Sincerely,
Bangkok Trading Desk
Libra Gems & Trading Co., Ltd.
https://libragems.net
  `.trim();

  return { subject, html, text };
}
