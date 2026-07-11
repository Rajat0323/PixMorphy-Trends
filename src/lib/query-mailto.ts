import { siteConfig } from "@/data/content";

export type QueryPayload = {
  name: string;
  email: string;
  message: string;
};

export function buildMailtoLink({ name, email, message }: QueryPayload) {
  const subject = encodeURIComponent(`PixMorphy Query — ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  );
  return `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
}
