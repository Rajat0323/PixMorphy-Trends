import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description: "PixMorphy ke editorial focus, trust principles aur audience ke baare mein janiye.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          eyebrow="About PixMorphy"
          title="Hindi aur Hinglish readers ke liye tech ko less confusing banana hamara core goal hai."
          description="PixMorphy AI tools, app updates, online earning ideas aur practical how-to guides ko simple language mein present karta hai."
        />
        <div className="mt-8 grid gap-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>Hum hype-driven publishing se bachne ki koshish karte hain. Har article ka focus useful explanation, clear context aur mobile readability par hota hai.</p>
          <p>Editorially, hum source-based updates, practical examples aur visible author attribution ko priority dete hain.</p>
          <p>Goal simple hai: Indian users ko aisa blog experience mile jo fast bhi ho, premium bhi lage, aur trust bhi build kare.</p>
        </div>
      </div>
    </div>
  );
}
