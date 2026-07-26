import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "हमारे बारे में",
  description:
    "PixMorphy — भारतीय B.Tech और graduation छात्रों के लिए करियर, AI और वास्तविक अनुभव पर हिंदी ब्लॉग। ECE से GenAI engineer tak ki real journey.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          as="h1"
          eyebrow="PixMorphy"
          title="भारतीय छात्रों के लिए करियर और AI मार्गदर्शन — वास्तविक अनुभव से"
          description="Ye site generic AI articles ya shortcut promises ke liye nahi hai — sirf tested career journey aur honest guidance ke liye."
        />
        <div className="mt-8 grid gap-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>
            PixMorphy ek Hindi career blog hai jo Electronics & Communication (ECE) background se
            core job, automation engineer, aur ab GenAI engineer tak pahunchne wale real experience
            par based hai. Sarkari exam preparation, 4 saal ka gap, aur IT industry mein late entry —
            ye sab khud jhela gaya hai, isliye yahan jo likha hai wo textbook advice nahi, practical
            path hai.
          </p>
          <p>
            Har article mein author ka naam, publish date, update date, FAQ aur personal experience
            disclaimer clearly diya jata hai. Salary numbers, job timelines aur career steps individual
            experience par based hain — official survey ya guaranteed outcome nahi.
          </p>
          <p>
            Agar aap B.Tech fresher ho, sarkari prep chhod kar IT mein jaana chahte ho, ya AI career
            ki real salary journey samajhna chahte ho — yahan sirf wahi content hai jo is journey se
            directly juda hai.
          </p>
          <p>
            Suggestions ya corrections ke liye{" "}
            <Link href="/contact" className="text-[color:var(--accent)]">
              contact page
            </Link>{" "}
            ya homepage par query form use karein. Email: {siteConfig.contactEmail}
          </p>
        </div>
      </div>
    </div>
  );
}
