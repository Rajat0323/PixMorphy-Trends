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
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          as="h1"
          eyebrow="संपादकीय नीति"
          title="Experience, Expertise, Authoritativeness, Trust (E-E-A-T)"
          description="PixMorphy par sirf personal career experience par based Hindi articles publish hote hain."
        />
        <div className="mt-8 space-y-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>
            <strong>Experience:</strong> Har career article author ki khud ki journey — job switch,
            salary growth, gap, ya fresher strategy — par based hota hai. Third-party AI-generated
            filler content ya unrelated trending topics publish nahi kiye jate.
          </p>
          <p>
            <strong>Expertise:</strong> Author GenAI engineer ke roop mein kaam karta hai aur ECE se
            IT/AI transition personally experience kar chuka hai. Technical aur career guidance dono
            isi background se aate hain.
          </p>
          <p>
            <strong>Authoritativeness:</strong> Salary figures, timelines aur job strategies clearly
            labeled hote hain — &quot;personal experience&quot;, &quot;approximate&quot;, ya
            &quot;individual case&quot; — taaki reader ko official guarantee na lage.
          </p>
          <p>
            <strong>Trust:</strong> Misleading headlines, fake urgency, ya guaranteed income/job
            promises avoid kiye jate hain. Sponsored ya affiliate content alag se mark kiya jayega.
          </p>
          <p>
            Har article mein author name, publish date, update date aur FAQ section hota hai. Agar
            kisi fact mein correction chahiye,{" "}
            <Link href="/contact" className="text-[color:var(--accent)]">
              contact page
            </Link>{" "}
            par 24–48 ghante ke andar review kiya jata hai.
          </p>
        </div>
      </div>
    </div>
  );
}
