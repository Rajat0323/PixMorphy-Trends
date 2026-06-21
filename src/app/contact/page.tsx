import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "PixMorphy se contact karne ke liye editorial, partnership aur feedback options.",
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
          eyebrow="Contact"
          title="Editorial feedback, sponsored campaign ya partnership ke liye yahan se reach out karein."
          description="Heavy popup ya clutter ki jagah clean trust pages zyada professional feel dete hain, especially Discover-first sites ke liye."
        />
        <div className="mt-8 grid gap-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>Email: {siteConfig.contactEmail}</p>
          <p>For partnerships: {siteConfig.partnershipsEmail}</p>
          <p>Expected response window: 24 to 48 hours</p>
          <p>Tip: Editorial policy, privacy policy aur disclaimer pages footer mein available hain.</p>
        </div>
      </div>
    </div>
  );
}
