export function generateEmailHtml({
  viewerName,
  bookedSeatNumbers,
  eventName,
  eventStartTime,
  eventEndTime,
  text, // optional short message/body
  ticketDownloadUrl, // optional: URL to download ticket PDF
  qrDataUrl, // optional: data:image/png;base64,... or cid:qr@ticket
}: {
  viewerName: string;
  bookedSeatNumbers: string[];
  eventName: string;
  eventStartTime: string;
  eventEndTime: string;
  text?: string;
  ticketDownloadUrl?: string;
  qrDataUrl?: string;
}) {
  const seatsHtml = bookedSeatNumbers.length
    ? `<tr>
         <td style="padding:8px 0;font-weight:600;">Seats</td>
         <td style="padding:8px 0;">${bookedSeatNumbers
           .map(
             (s) =>
               `<span style="display:inline-block;margin-right:6px;padding:4px 8px;border-radius:4px;border:1px solid #e0e0e0;">${s}</span>`
           )
           .join("")}</td>
       </tr>`
    : "";

  const downloadButton = ticketDownloadUrl
    ? `<tr>
         <td colspan="2" align="center" style="padding-top:18px;">
           <a href="${ticketDownloadUrl}" style="display:inline-block;text-decoration:none;background:#1a73e8;color:#fff;padding:12px 20px;border-radius:6px;font-weight:600;">Download E-Ticket</a>
         </td>
       </tr>`
    : "";

  const qrHtml = qrDataUrl
    ? `<tr>
         <td colspan="2" align="center" style="padding-top:12px;">
           <img src="${qrDataUrl}" alt="QR Code" style="width:120px;height:120px;border-radius:8px;border:1px solid #ddd;">
         </td>
       </tr>`
    : "";

  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>E-Ticket: ${eventName}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="padding:20px 12px;">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 6px 18px rgba(15, 23, 42, 0.06);">
            <tr>
              <td style="padding:20px 24px;border-bottom:1px solid #f0f0f0;">
                <!-- Header: logo/title -->
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="vertical-align:middle;">
                      <!-- put your logo here (use cid:logo or hosted image) -->
                      <img src="cid:company_logo" alt="Logo" style="height:36px;vertical-align:middle;">
                    </td>
                    <td style="text-align:right;color:#9aa0a6;font-size:13px;vertical-align:middle;">
                      <strong>E-Ticket</strong>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 24px;">
                <h2 style="margin:0 0 6px 0;font-size:20px;color:#111;">Hi 
                  ${viewerName},</h2>
                <p style="margin:0 0 12px 0;color:#555;line-height:1.5;">${
                  text ??
                  `Thanks for booking! Below are your ticket details for ${eventName}.`
                }</p>

                <!-- Event Card -->
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:14px;border-radius:6px;border:1px solid #eef2f7;padding:12px;background:#fbfdff;">
                  <tr>
                    <td style="padding:6px 8px;font-size:13px;color:#666;width:30%;">Event</td>
                    <td style="padding:6px 8px;font-weight:600;">${eventName}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 8px;font-size:13px;color:#666;">Starts</td>
                    <td style="padding:6px 8px;">
                    ${eventStartTime}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 8px;font-size:13px;color:#666;">Ends</td>
                    <td style="padding:6px 8px;">${eventEndTime}</td>
                  </tr>

                  ${seatsHtml}

                </table>

                ${downloadButton}

                ${qrHtml}

                <p style="margin:16px 0 0 0;color:#777;font-size:13px;line-height:1.4;">
                  If you have any questions, reply to this email or contact our support team.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:14px 24px;border-top:1px solid #f0f0f0;background:#fafbff;color:#8a8f98;font-size:13px;">
                <table width="100%" role="presentation">
                  <tr>
                    <td>Event Organizer</td>
                    <td style="text-align:right;">Need help? support@example.com</td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
