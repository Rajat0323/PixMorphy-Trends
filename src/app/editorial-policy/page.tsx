import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "संपादकीय नीति",
  description:
    "PixMorphy editorial standards — experience-based career content, fact-checking, corrections, and E-E-A-T transparency.",
  alternates: {
    canonical: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          as="h1"
          eyebrow="संपादकीय नीति"
          title="Experience, Expertise, Authoritativeness, Trust (E-E-A-T)"
      description="How PixMorphy researches, reviews, updates, and publishes practical guidance."
        />
        <div className="mt-8 space-y-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>
            <strong>Evidence:</strong> Articles distinguish sourced facts, examples, and first-hand
            claims. Personal experience is included only when the author can support it and approves
            it for public use; otherwise examples are labeled as illustrative.
          </p>
          <p>
            <strong>Review:</strong> Technical guidance is checked against reliable documentation
            where practical. Tool instructions and market information can change, so articles include
            dates or limitations when those details matter.
          </p>
          <p>
            <strong>Sources:</strong> Compensation and career information should use dated,
            attributable sources and explain uncertainty. An individual result is not presented as a
            market average or as a promised outcome.
          </p>
          <p>
            <strong>Trust:</strong> Misleading headlines, fake urgency, ya guaranteed income/job
            promises avoid kiye jate hain. Sponsored ya affiliate content alag se mark kiya jayega.
          </p>
          <p>
            Articles are manually reviewed before publication. A privacy review checks the article,
            metadata, links, author, code samples, and images for identifying or confidential details.
            If you spot an error,{" "}
            <Link href="/contact" className="text-[color:var(--accent)]">
              contact page
            </Link>{" "}
            par bhejein for editorial review.
          </p>
        </div>
      </div>
    </main>
  );
}
