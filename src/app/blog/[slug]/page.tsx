import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import { AuthorCard } from "@/components/author-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { getPostBySlug, getRelatedPosts, posts, siteConfig } from "@/data/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
    keywords: post.keywords,
  };
}

function ShareButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="rounded-full border border-[color:var(--border)] bg-white px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)] transition hover:text-[color:var(--accent)]"
    >
      {label}
    </button>
  );
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.relatedSlugs);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_320px] lg:items-start">
        <article className="space-y-8">
          <header className="overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--text-muted)]">
                <span className="rounded-full bg-[color:var(--surface-muted)] px-3 py-1 font-semibold text-[color:var(--accent)]">
                  {post.category}
                </span>
                <span>{new Date(post.publishedAt).toLocaleDateString("en-IN")}</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="headline-font mt-5 text-3xl font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--text-secondary)]">
                {post.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[color:var(--text-muted)]">
                <span className="font-medium text-[color:var(--text-primary)]">{post.author}</span>
                <span>Updated {new Date(post.updatedAt ?? post.publishedAt).toLocaleDateString("en-IN")}</span>
              </div>
            </div>
            <div className={`relative min-h-[280px] bg-gradient-to-br ${post.heroAccent}`}>
              <Image
                src={post.imageSrc}
                alt={post.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 760px"
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${post.heroAccent} opacity-20`} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.54))]" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="max-w-md rounded-[24px] border border-white/20 bg-white/14 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/82">
                    Why it matters
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white">
                    Fresh tech explainers ko mobile users ke liye easy aur trustworthy format mein present karna Discover performance ka core part hai.
                  </p>
                </div>
              </div>
            </div>
          </header>

          <section className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
              Quick Summary
            </p>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">
              Yeh article PixMorphy ke ideal blog page wireframe ko represent karta hai: bold hero, short readable paragraphs, inline ad slots, FAQs, author trust block aur related stories.
            </p>
          </section>

          <section className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <p className="text-sm leading-7 text-[color:var(--text-secondary)]">
              Indian mobile readers fast answers chahte hain. Isliye article layout ka first job hai unhe quickly orient karna, phir clean sections ke through detail dena.
            </p>
          </section>

          <AdSlot label="Ad after first paragraph for monetization without blocking readability" />

          {post.sections.map((section, index) => (
            <section
              key={section.heading}
              className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]"
            >
              <h2 className="headline-font text-2xl font-semibold tracking-tight text-[color:var(--text-primary)]">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-2xl bg-[color:var(--surface-muted)] px-4 py-3">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
              {index === 1 ? (
                <div className="mt-6 rounded-[24px] bg-[color:var(--surface-muted)] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                    Affiliate Opportunity
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">
                    Storage cleanup ya device-switch topics ke saath cloud backup, transfer tools aur phone accessories contextual affiliate modules ke liye relevant hain.
                  </p>
                </div>
              ) : null}
              {index === 2 ? (
                <div className="mt-6">
                  <AdSlot label="Mid-content ad slot with fixed height to avoid layout shift" compact />
                </div>
              ) : null}
            </section>
          ))}

          <section className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <SectionHeading
              eyebrow="FAQs"
              title="Visible FAQs jo schema ke saath trust bhi build karein."
              description="FAQ content hidden schema-only nahi hona chahiye. Reader ko bhi answer milna chahiye aur search engines ko bhi clarity."
            />
            <div className="mt-6">
              <FaqAccordion items={post.faq} />
            </div>
          </section>

          <section className="flex flex-wrap gap-3">
            {["WhatsApp", "Share", "Save", "Telegram"].map((item) => (
              <ShareButton key={item} label={item} />
            ))}
          </section>

          <AuthorCard author={post.author} />

          <section className="space-y-6">
            <SectionHeading
              eyebrow="Related Posts"
              title="Internal linking ko natural aur high-CTR banana zaroori hai."
              description="Bottom recommendations same audience intent ke hisaab se choose ki gayi hain, taaki session depth improve ho."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} compact />
              ))}
            </div>
          </section>
        </article>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">
              Blog Page Wireframe
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--text-secondary)]">
              <p>Hero image, emotional headline, author meta, short paragraphs aur inline monetization is template ka core flow hai.</p>
              <p>Desktop par optional sidebar mein popular posts, categories aur recent updates fit hote hain.</p>
            </div>
          </div>
          <AdSlot label="Desktop sidebar ad or sponsor mention" />
          <div className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">
              SEO Notes
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--text-secondary)]">
              <li>Clean URL structure and metadata per slug.</li>
              <li>Article schema and FAQ schema both rendered.</li>
              <li>Author section acts as EEAT support.</li>
              <li>Related posts improve internal link depth.</li>
            </ul>
          </div>
          <Link
            href="/contact"
            className="block rounded-[28px] bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] p-6 text-white shadow-[0_20px_48px_rgba(37,99,235,0.28)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
              CTA Block
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Brand collaboration ya sponsored campaign discuss karna hai?
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/86">
              Contact page is template mein trust aur monetization dono goals ko support karta hai.
            </p>
          </Link>
        </aside>
      </div>
    </div>
  );
}
