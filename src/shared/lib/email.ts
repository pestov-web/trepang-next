import "server-only";
import nodemailer from "nodemailer";

export type EmailMessage = { subject: string; text: string };
export async function sendEmail(message: EmailMessage) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS || !MAIL_TO) return { sent: false, reason: "smtp-not-configured" } as const;
  const port = Number(SMTP_PORT || 465);
  const transport = nodemailer.createTransport({ host: SMTP_HOST || "smtp.gmail.com", port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
  await transport.sendMail({ from: MAIL_FROM || SMTP_USER, to: MAIL_TO, subject: message.subject, text: message.text });
  return { sent: true } as const;
}
