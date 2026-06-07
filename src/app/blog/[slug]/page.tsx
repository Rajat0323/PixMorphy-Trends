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
  const sectionImageChunks = post.galleryImages?.length
    ? (() => {
        const sectionCount = Math.max(post.sections.length, 1);
        const chunkSize = Math.ceil(post.galleryImages.length / sectionCount);
        return post.sections.map((_, index) =>
          post.galleryImages?.slice(index * chunkSize, (index + 1) * chunkSize) ?? [],
        );
      })()
    : [];
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
            <div className={`relative min-h-[320px] bg-gradient-to-br ${post.heroAccent}`}>
              <Image
                src={post.imageSrc}
                alt={post.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 760px"
                className="object-cover"
                style={{
                  objectPosition: post.imageObjectPosition ?? "center",
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${post.heroAccent} opacity-15`} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06),rgba(15,23,42,0.38))]" />
            </div>
          </header>

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
                  <p key={paragraph} className="whitespace-pre-line">
                    {paragraph}
                  </p>
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
              {sectionImageChunks[index]?.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {sectionImageChunks[index].map((image) => (
                    <div
                      key={image.src}
                      className="overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-muted)]"
                    >
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 360px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              {index === 1 ? (
                <div className="mt-6">
                  <AdSlot label="Sponsored content slot" compact />
                </div>
              ) : null}
            </section>
          ))}

          <section className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <SectionHeading
              eyebrow="FAQs"
              title="Readers ke common sawalon ke jawab"
              description="Is topic se related quick questions aur simple answers."
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
              title="Is topic se related aur bhi stories"
              description="Agar aapko yeh article useful laga, to yeh related posts bhi dekh sakte hain."
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
              Latest Stories
            </h2>
            <div className="mt-5 space-y-4">
              {posts
                .filter((item) => item.slug !== post.slug)
                .slice(0, 3)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="block rounded-[22px] bg-[color:var(--surface-muted)] p-4 transition hover:-translate-y-0.5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-base font-semibold leading-7 text-[color:var(--text-primary)]">
                      {item.title}
                    </h3>
                  </Link>
                ))}
            </div>
          </div>
          <AdSlot label="Desktop sidebar ad or sponsor mention" />
          <div className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">
              Categories
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {["Trending", "Tech Update", "AI Tools", "Online Earning"].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-[color:var(--surface-muted)] px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
