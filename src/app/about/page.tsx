import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "PixMorphy Bhakti ke baare mein — Hindi aarti, chalisa, vrat aur tyohar content ka mission aur editorial focus.",
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
          eyebrow="About PixMorphy Bhakti"
          title="Hindi bhakton ke liye saaf aarti, chalisa aur tyohar guides"
          description="PixMorphy Bhakti Bharat ke parivar aur yuva bhakton ke liye mobile-friendly devotional content banata hai."
        />
        <div className="mt-8 grid gap-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>
            Hum poora aarti aur chalisa path Devanagari mein dete hain, saath mein simple arth, puja niyam
            aur FAQ — taaki ghar ki puja aur phone dono par padhna aasan ho.
          </p>
          <p>
            Har post mein visible publish date, author attribution aur structured FAQ hota hai taaki
            readers ko trustworthy aur readable content mile.
          </p>
          <p>
            Hamara goal hai ki har Indian bhakt ko ek jagah par saari zaroori bhakti jaankari mile — bina
            confusion aur bina clickbait ke.
          </p>
        </div>
      </div>
    </div>
  );
}
