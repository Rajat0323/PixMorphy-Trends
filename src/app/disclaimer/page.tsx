import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "अस्वीकरण",
  description:
    "PixMorphy disclaimer — career guidance, salary information, and content accuracy for Indian students.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          as="h1"
          eyebrow="अस्वीकरण"
          title="Career guidance, salary data aur content accuracy"
          description="Important transparency points for readers."
        />
        <div className="mt-8 space-y-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>
            PixMorphy ke articles informational aur educational purpose ke liye hain. Career paths,
            salary numbers, aur job market conditions company, city, skills aur time ke saath change
            ho sakte hain.
          </p>
          <p>
            Salary tables aur growth timelines author ki personal experience par based hain — ye
            official HR reports, government data, ya guaranteed packages nahi hain. Apne decisions
            lene se pehle apna research karein.
          </p>
          <p>
            PixMorphy financial advice, legal advice, ya job placement guarantee provide nahi karta.
            Koi bhi career step lene se pehle apni situation, family support aur financial needs
            evaluate karein.
          </p>
          <p>
            Kuch pages par sponsored ad slots ho sakte hain — ye clearly labeled hote hain aur
            editorial content se alag treat kiye jate hain.
          </p>
          <p>
            Corrections ke liye{" "}
            <Link href="/contact" className="text-[color:var(--accent)]">
              contact karein
            </Link>{" "}
            ya{" "}
            <Link href="/editorial-policy" className="text-[color:var(--accent)]">
              editorial policy
            </Link>{" "}
            dekhein.
          </p>
        </div>
      </div>
    </div>
  );
}
