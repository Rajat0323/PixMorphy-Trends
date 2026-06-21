import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "PixMorphy disclaimer for editorial content, affiliate links and informational accuracy.",
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
          eyebrow="Disclaimer"
          title="Content accuracy, affiliate mentions aur liability notice"
          description="Readers ke liye important transparency points."
        />
        <div className="mt-8 space-y-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>
            PixMorphy articles informational aur educational purpose ke liye hain. Tech updates,
            pricing, app features aur trending news time ke saath change ho sakte hain.
          </p>
          <p>
            Online earning, investment ya product recommendation guides personal research ke baad hi
            follow karein. PixMorphy financial advice provide nahi karta.
          </p>
          <p>
            Kuch posts mein affiliate ya sponsored placements ho sakte hain. Aisi content clearly
            marked rahegi.
          </p>
          <p>
            Corrections ke liye <Link href="/contact" className="text-[color:var(--accent)]">contact us</Link> ya
            <Link href="/editorial-policy" className="text-[color:var(--accent)]"> editorial policy</Link> dekhein.
          </p>
        </div>
      </div>
    </div>
  );
}
