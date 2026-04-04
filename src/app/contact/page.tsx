import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description: "PixMorphy se contact karne ke liye editorial, partnership aur feedback options.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          eyebrow="Contact"
          title="Editorial feedback, sponsored campaign ya partnership ke liye yahan se reach out karein."
          description="Heavy popup ya clutter ki jagah clean trust pages zyada professional feel dete hain, especially Discover-first sites ke liye."
        />
        <div className="mt-8 grid gap-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>Email: hello@pixmorphy.example</p>
          <p>For partnerships: brand@pixmorphy.example</p>
          <p>Expected response window: 24 to 48 hours</p>
          <p>Tip: Contact page par editorial policy, partnerships aur corrections policy later add karne se trust aur improve hota hai.</p>
        </div>
      </div>
    </div>
  );
}
