/**
 * Base Quiet Luxury Email Layout Wrapper
 * Inline CSS styling guaranteed across desktop, web, and mobile email clients.
 */

export interface EmailLayoutOptions {
  preheader?: string;
  heading: string;
  subheading?: string;
  contentHtml: string;
}

export function renderEmailLayout({
  preheader,
  heading,
  subheading,
  contentHtml,
}: EmailLayoutOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${heading}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #242A26; -webkit-font-smoothing: antialiased;">
  ${
    preheader
      ? `<div style="display: none; max-height: 0px; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px;">${preheader}</div>`
      : ""
  }
  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #FAF8F2; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 12px; border: 1px solid #DDD8CC; overflow: hidden; box-shadow: 0 4px 12px rgba(23, 76, 56, 0.04);">
          <!-- Header Bar -->
          <tr>
            <td style="background-color: #103729; padding: 28px 32px; text-align: center;">
              <p style="margin: 0; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #B99B68;">
                Libra Gems &amp; Trading Co., Ltd.
              </p>
              <h1 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 500; font-family: Georgia, Cambria, serif; color: #FFFFFF; letter-spacing: 0.5px;">
                ${heading}
              </h1>
              ${
                subheading
                  ? `<p style="margin: 4px 0 0 0; font-size: 12px; color: #F3EFE5; opacity: 0.85;">${subheading}</p>`
                  : ""
              }
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 32px 28px 32px; line-height: 1.6; font-size: 14px; color: #242A26;">
              ${contentHtml}
            </td>
          </tr>

          <!-- Footer Bar -->
          <tr>
            <td style="background-color: #F3EFE5; padding: 24px 32px; border-top: 1px solid #DDD8CC; text-align: center; font-size: 11px; color: #6E756F; line-height: 1.5;">
              <p style="margin: 0 0 6px 0; font-weight: 600; color: #174C38;">
                LIBRA GEMS &amp; TRADING CO., LTD. • BANGKOK TRADING DESK
              </p>
              <p style="margin: 0 0 8px 0;">
                International Colored Gemstone Merchants • Natural Rough Parcels • Fine Precision Cut Stones
              </p>
              <p style="margin: 0; font-size: 10px; color: #6E756F;">
                Bangkok, Thailand • Registered Commercial Entity • <a href="https://libragems.net" style="color: #174C38; text-decoration: underline;">libragems.net</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
