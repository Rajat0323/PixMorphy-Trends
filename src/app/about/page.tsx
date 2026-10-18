import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "हमारे बारे में",
  description:
    "PixMorphy — भारतीय छात्रों के लिए करियर, तकनीक और AI पर व्यावहारिक हिंदी मार्गदर्शन।",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          as="h1"
          eyebrow="PixMorphy"
          title="भारतीय छात्रों के लिए करियर और AI मार्गदर्शन"
          description="PixMorphy shares practical, clearly sourced guides on careers, software, automation, and AI."
        />
        <div className="mt-8 grid gap-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>PixMorphy is a Hindi-first publication for students and early-career readers exploring careers, software, automation, and AI.</p>
          <p>We aim to explain technical choices, practical steps, limitations, and sources in plain language. Personal claims are used only when an author has supplied and approved evidence for publication.</p>
          <p>Salary articles focus on dated, attributable public information and explain uncertainty. One person&apos;s compensation is not presented as a market average.</p>
          <p>
            Suggestions or corrections ke liye{" "}
            <Link href="/contact" className="text-[color:var(--accent)]">
              contact page
            </Link>{" "}
            or use the query form on the home page.
          </p>
        </div>
      </div>
    </main>
  );
}
