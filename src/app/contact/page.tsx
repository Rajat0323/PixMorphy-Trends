import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "संपर्क",
  description: "PixMorphy से संपर्क करें — vivgup64@gmail.com पर ईमेल करें।",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          as="h1"
          eyebrow="संपर्क"
          title="प्रश्न, सुझाव या सहयोग के लिए संपर्क करें"
          description="करियर, AI, पढ़ाई या किसी भी विषय पर सीधे ईमेल कर सकते हैं।"
        />
        <div className="mt-8 space-y-6 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <div className="rounded-[24px] bg-[color:var(--surface-muted)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
              ईमेल
            </p>
            <Link
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-2 block text-xl font-semibold text-[color:var(--text-primary)] hover:text-[color:var(--accent)]"
            >
              {siteConfig.contactEmail}
            </Link>
            <p className="mt-2 text-sm text-[color:var(--text-muted)]">
              क्लिक करके सीधे ईमेल भेजें — कोई भी पाठक संपर्क कर सकता है।
            </p>
          </div>
          <p>अनुमानित उत्तर समय: २४ से ४८ घंटे</p>
          <p>
            त्वरित प्रश्न के लिए{" "}
            <Link href="/#query" className="font-medium text-[color:var(--accent)] hover:underline">
              मुख्य पृष्ठ पर फॉर्म
            </Link>{" "}
            भी उपलब्ध है।
          </p>
        </div>
      </div>
    </div>
  );
}
