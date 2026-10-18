"use client";

import Link from "next/link";
import type { Post } from "@/data/content";
import type { CmsPostPreview } from "@/data/types";
import { CmsPostCard } from "@/components/cms-post-card";
import { QueryForm } from "@/components/query-form";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { useLocale } from "@/lib/i18n/locale-provider";

type HomePageUiProps = {
  latestPosts: Post[];
  latestCmsPosts: CmsPostPreview[];
  totalPosts: number;
  showSentMessage: boolean;
};

export function HomePageUi({ latestPosts, latestCmsPosts, totalPosts, showSentMessage }: HomePageUiProps) {
  const { tr, locale } = useLocale();
  const careerPaths = locale === "en"
    ? [
        { title: "I'm choosing a first role", detail: "Compare entry-level paths and choose a practical starting point.", href: "/blog/btech-fresher-ai-career-strategy-2025-2026-hindi" },
        { title: "I want to learn applied AI", detail: "Build foundations, then make and evaluate a small project.", href: "/blog/ai-career-kaise-shuru-kare-beginners-roadmap-2026-hindi" },
        { title: "I'm returning after a study gap", detail: "Explain the gap honestly and show current, relevant skills.", href: "/blog/sarkari-naukri-chhod-it-job-kaise-paye-2026-hindi" },
        { title: "I'm comparing pay and roles", detail: "Read salary research carefully and compare complete offers.", href: "/blog/ai-engineer-salary-india-2026-real-journey" },
      ]
    : [
        { title: "पहली नौकरी चुननी है", detail: "शुरुआती भूमिकाओं को समझें और व्यावहारिक शुरुआत चुनें।", href: "/blog/btech-fresher-ai-career-strategy-2025-2026-hindi" },
        { title: "Applied AI सीखना है", detail: "बुनियाद से शुरू करें, फिर छोटा प्रोजेक्ट बनाएँ और जाँचें।", href: "/blog/ai-career-kaise-shuru-kare-beginners-roadmap-2026-hindi" },
        { title: "पढ़ाई के बाद काम पर लौटना है", detail: "Gap को ईमानदारी से समझाएँ और आज के कौशल दिखाएँ।", href: "/blog/sarkari-naukri-chhod-it-job-kaise-paye-2026-hindi" },
        { title: "वेतन और भूमिकाएँ समझनी हैं", detail: "Salary guide को संदर्भ की तरह पढ़ें और पूरे offer की तुलना करें।", href: "/blog/ai-engineer-salary-india-2026-real-journey" },
      ];

  const visibleStaticPosts = latestPosts.slice(0, Math.max(0, 6 - latestCmsPosts.length));
  const visiblePostsCount = latestCmsPosts.length + visibleStaticPosts.length;

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__content max-w-3xl">
          <p className="home-hero__eyebrow">{tr("homeEyebrow")}</p>
          <h1 id="home-title" className="headline-font mt-5 max-w-3xl text-4xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-6xl">
            {tr("homeTitle")}
          </h1>
          <div className="mt-6 max-w-2xl space-y-3 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            <p>{tr("homeP1")}</p>
            <p>{tr("homeP2")}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/blog" className="inline-flex min-h-12 items-center rounded-full bg-[color:var(--highlight)] px-6 py-3 text-sm font-bold text-[color:var(--text-primary)] transition hover:bg-white">
              {tr("navBlogsBtn")} <span aria-hidden="true" className="ml-2">→</span>
            </Link>
            <Link href="#query" className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              {tr("homeAskQuery")}
            </Link>
          </div>
        </div>

        <aside className="home-hero__aside max-w-md" aria-label={locale === "en" ? "What to expect" : "यहाँ क्या मिलेगा"}>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">{locale === "en" ? "A useful guide should" : "एक उपयोगी गाइड में"}</p>
          <h2 className="mt-3 text-xl font-semibold leading-7 text-white">{locale === "en" ? "Help you decide what to do next." : "अगला कदम चुनने में मदद होनी चाहिए।"}</h2>
          <ul className="mt-5 text-sm leading-6 text-white/80">
            {(locale === "en"
              ? ["Explain roles and their real work", "Show practice you can reproduce", "Be honest about limits and outcomes"]
              : ["भूमिकाओं और उनके काम को समझाए", "दोहराने योग्य अभ्यास बताए", "सीमाएँ और नतीजे साफ़ रखे"]
            ).map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="step mt-1">0{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs leading-5 text-white/55">{locale === "en" ? "No job, salary, or timeline guarantees." : "नौकरी, वेतन या समय की गारंटी नहीं।"}</p>
        </aside>
      </section>

      <section aria-labelledby="career-paths-heading" className="space-y-6">
        <SectionHeading
          eyebrow={locale === "en" ? "Start with your situation" : "अपनी स्थिति से शुरुआत करें"}
          title={locale === "en" ? "Find the guide for your next step" : "अपने अगले कदम के लिए गाइड चुनें"}
          description={locale === "en" ? "Career advice works best when it fits your starting point. Choose a path and move at a pace you can sustain." : "करियर की सलाह तभी काम आती है जब वह आपकी शुरुआत से मेल खाए। अपना रास्ता चुनें और अपनी गति से आगे बढ़ें।"}
        />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {careerPaths.map((path, index) => (
            <Link key={path.href} href={path.href} className="career-path-card">
              <span className="career-path-card__number">0{index + 1}</span>
              <h3 className="mt-5 text-base font-bold leading-6 text-[color:var(--text-primary)]">{path.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-[color:var(--text-secondary)]">{path.detail}</p>
              <span className="mt-5 text-sm font-bold text-[color:var(--accent)]">{locale === "en" ? "Read the guide" : "गाइड पढ़ें"} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section id="blogs" className="space-y-6">
        <SectionHeading
          eyebrow={tr("homeBlogEyebrow")}
          title={tr("homeBlogTitle")}
          description={tr("homeBlogDesc")}
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 blog-content-lock">
          {latestCmsPosts.map((post) => <CmsPostCard key={post.slug} post={post} />)}
          {visibleStaticPosts.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
        {totalPosts > visiblePostsCount ? (
          <div className="flex justify-center pt-2">
            <Link href="/blog" className="inline-flex min-h-12 items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-3 text-sm font-bold text-[color:var(--text-primary)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]">
              {tr("homeViewAll", { count: totalPosts })}
            </Link>
          </div>
        ) : null}
      </section>

      <section id="query" className="grid gap-8 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:grid-cols-[.85fr_1.15fr] sm:p-9">
        <div>
          <p className="eyebrow">{tr("queryEyebrow")}</p>
          <h2 className="headline-font mt-4 text-2xl font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-3xl">{tr("queryTitle")}</h2>
          <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{tr("queryDesc")}</p>
          <p className="mt-4 text-xs leading-5 text-[color:var(--text-muted)]">{locale === "en" ? "Do not include private or confidential information." : "निजी या गोपनीय जानकारी न भेजें।"}</p>
        </div>
        <div>
          {showSentMessage ? <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{tr("querySuccess")}</p> : null}
          <QueryForm />
        </div>
      </section>
    </div>
  );
}
