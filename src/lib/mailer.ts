import nodemailer from "nodemailer";

/**
 * Gmail account the readiness check sends from. Set SMTP_USER and SMTP_PASS (a Gmail app
 * password) in the Vercel project's environment variables; without them no email is sent.
 */
export const SMTP_USER = process.env["SMTP_USER"] ?? "";
const SMTP_PASS = process.env["SMTP_PASS"] ?? "";

export const transporter =
  SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null;

/** Where website lead notifications are delivered. */
export const LEAD_NOTIFY_TO = "moazzamwaheed@gmail.com";

/** Escape user-supplied text for HTML emails. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
