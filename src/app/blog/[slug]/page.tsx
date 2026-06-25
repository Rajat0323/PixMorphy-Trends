import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ad-slot";
import { AuthorCard } from "@/components/author-card";
import { Breadcrumbs, getBlogBreadcrumbs } from "@/components/breadcrumbs";
import { FaqAccordion } from "@/components/faq-accordion";
import { InternalLinks } from "@/components/internal-links";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { ShareButtons } from "@/components/share-buttons";
import { getPostBySlug, getRelatedPosts, posts, siteConfig } from "@/data/content";
import { BHAKTI_CATEGORIES, getCategoryLabel } from "@/data/bhakti";
import { getAbsoluteImageUrl, getAbsoluteUrl, getCategorySlug } from "@/lib/seo";

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

  const imageUrl = getAbsoluteImageUrl(post.imageSrc);
  const pageUrl = getAbsoluteUrl(`/blog/${post.slug}`);

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
      url: pageUrl,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [
        {
          url: imageUrl,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
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
    image: [getAbsoluteImageUrl(post.imageSrc)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/icon?size=512`,
      },
    },
    mainEntityOfPage: getAbsoluteUrl(`/blog/${post.slug}`),
    url: getAbsoluteUrl(`/blog/${post.slug}`),
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

      <div className="mb-6">
        <Breadcrumbs items={getBlogBreadcrumbs(post)} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,760px)_320px] lg:items-start">
        <article className="space-y-8">
          <header className="overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--text-muted)]">
                <span className="rounded-full bg-[color:var(--surface-muted)] px-3 py-1 font-semibold text-[color:var(--accent)]">
                  {getCategoryLabel(post.category)}
                </span>
                <span>{new Date(post.publishedAt).toLocaleDateString("hi-IN")}</span>
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
                <span>अद्यतन {new Date(post.updatedAt ?? post.publishedAt).toLocaleDateString("hi-IN")}</span>
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
                  <AdSlot label="प्रायोजित सामग्री" compact />
                </div>
              ) : null}
            </section>
          ))}

          {post.internalLinks?.length ? (
            <InternalLinks links={post.internalLinks} />
          ) : null}

          <section className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <SectionHeading
              eyebrow="अक्सर पूछे जाने वाले प्रश्न"
              title="पाठकों के सामान्य प्रश्नों के उत्तर"
              description="इस विषय से जुड़े त्वरित प्रश्न और सरल उत्तर।"
            />
            <div className="mt-6">
              <FaqAccordion items={post.faq} />
            </div>
          </section>

          <ShareButtons title={post.title} slug={post.slug} />

          <AuthorCard author={post.author} />

          <section className="space-y-6">
            <SectionHeading
              eyebrow="संबंधित लेख"
              title="इस विषय से जुड़े और लेख"
              description="यदि यह लेख उपयोगी लगा, तो ये संबंधित लेख भी देखें।"
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
              नवीनतम लेख
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
                      {getCategoryLabel(item.category)}
                    </p>
                    <h3 className="mt-2 text-base font-semibold leading-7 text-[color:var(--text-primary)]">
                      {item.title}
                    </h3>
                  </Link>
                ))}
            </div>
          </div>
          <AdSlot label="डेस्कटॉप साइडबार विज्ञापन" />
          <div className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">
              श्रेणियाँ
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {BHAKTI_CATEGORIES.map((item) => (
                <Link
                  key={item}
                  href={`/category/${getCategorySlug(item)}`}
                  className="rounded-full bg-[color:var(--surface-muted)] px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)]"
                >
                  {getCategoryLabel(item)}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
