import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "संपर्क",
  description: "पिक्समॉर्फी से संपादकीय, साझेदारी और प्रतिक्रिया के लिए संपर्क विकल्प।",
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
          title="संपादकीय प्रतिक्रिया, प्रायोजित अभियान या साझेदारी के लिए यहाँ संपर्क करें"
          description="साफ़ विश्वास पृष्ठ अधिक पेशेवर अनुभव देते हैं, विशेषकर भक्ति और सामग्री-केंद्रित साइटों के लिए।"
        />
        <div className="mt-8 grid gap-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>ईमेल: {siteConfig.contactEmail}</p>
          <p>साझेदारी के लिए: {siteConfig.partnershipsEmail}</p>
          <p>अनुमानित उत्तर समय: २४ से ४८ घंटे</p>
          <p>संकेत: संपादकीय नीति, गोपनीयता नीति और अस्वीकरण पृष्ठ फ़ुटर में उपलब्ध हैं।</p>
        </div>
      </div>
    </div>
  );
}
