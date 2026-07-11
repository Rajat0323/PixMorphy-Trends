import nodemailer from "nodemailer";
import { siteConfig } from "@/data/content";
import type { QueryPayload } from "./query-mailto";

export type { QueryPayload } from "./query-mailto";
export { buildMailtoLink } from "./query-mailto";

export function isEmailConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export async function sendQueryEmail({ name, email, message }: QueryPayload) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return { ok: false as const, reason: "not_configured" as const };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"${siteConfig.name}" <${user}>`,
    to: siteConfig.contactEmail,
    replyTo: email,
    subject: `PixMorphy — Query from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n"),
    html: `
      <h2>New query from ${siteConfig.name}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr />
      <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;")}</p>
    `,
  });

  return { ok: true as const };
}
