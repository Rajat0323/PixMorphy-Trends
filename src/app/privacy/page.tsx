import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "PixMorphy privacy policy — data collection, cookies, analytics aur user rights.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          as="h1"
          eyebrow="Privacy Policy"
          title="Aapki privacy aur data handling ka simple overview"
          description="PixMorphy readers ke liye transparent privacy practices."
        />
        <div className="mt-8 space-y-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>
            PixMorphy basic analytics (Google Analytics) use karta hai taaki hum site performance
            aur content engagement samajh sakein. Analytics data anonymous aggregated form mein
            process hota hai.
          </p>
          <p>
            Jab aap contact page par email karte hain, woh information sirf editorial response ke
            liye use hoti hai. Hum personal data bechte nahi hain.
          </p>
          <p>
            Third-party ad providers integrate hone par unki cookies apply ho sakti hain. Aap browser
            settings se cookies control kar sakte hain.
          </p>
          <p>
            Questions ke liye <Link href="/contact" className="text-[color:var(--accent)]">contact page</Link> use
            karein ya <Link href="/disclaimer" className="text-[color:var(--accent)]">disclaimer</Link> padhein.
          </p>
        </div>
      </div>
    </div>
  );
}
