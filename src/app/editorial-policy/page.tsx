import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "PixMorphy editorial standards, fact-checking approach and corrections policy.",
  alternates: {
    canonical: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          as="h1"
          eyebrow="Editorial Policy"
          title="Fact-checking, attribution aur correction workflow"
          description="PixMorphy trust principles jo har published story par apply hote hain."
        />
        <div className="mt-8 space-y-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>
            Har article mein visible author attribution, publish date aur update date diya jata hai.
            Sources jahan relevant hon, unhe clearly mention kiya jata hai.
          </p>
          <p>
            Hum clickbait headlines avoid karte hain aur practical reader value ko priority dete hain.
            Sponsored ya affiliate content alag se identify hoti hai.
          </p>
          <p>
            Agar kisi fact mein error mile, hum 24-48 hours ke andar review karke correction update
            karte hain. Report karein via <Link href="/contact" className="text-[color:var(--accent)]">contact page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
