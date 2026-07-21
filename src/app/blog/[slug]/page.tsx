import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/author-card";
import { BlogArticleTable } from "@/components/blog-article-table";
import { BlogImage } from "@/components/blog-image";
import {
  BlogPostFaqSection,
  BlogPostInternalLinks,
  BlogPostQuerySection,
  BlogPostRelatedSection,
  BlogPostSidebarUi,
  PostUpdatedLabel,
  SponsoredAdSlot,
} from "@/components/blog-post-ui";
import { FaqAccordion } from "@/components/faq-accordion";
import {
  getBlogBreadcrumbItems,
} from "@/lib/breadcrumbs";
import {
  LocalizedBreadcrumbs,
} from "@/components/localized-breadcrumbs";
import { ShareButtons } from "@/components/share-buttons";
import { getPostBySlug, getRelatedPosts, posts, siteConfig } from "@/data/content";
import { getCategoryLabel } from "@/data/bhakti";
import { getBlogCoverUrl, getBlogSocialCoverUrl } from "@/lib/blog-cover";
import { getAbsoluteImageUrl, getAbsoluteUrl } from "@/lib/seo";

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

  const imageUrl = getAbsoluteImageUrl(getBlogSocialCoverUrl(post));
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
  const sectionImageSrcs = new Set(
    post.sections.map((section) => section.image?.src).filter(Boolean),
  );
  const galleryImagesForSections =
    post.galleryImages?.filter((image) => !sectionImageSrcs.has(image.src)) ?? [];
  const sectionImageChunks = galleryImagesForSections.length
    ? (() => {
        const sectionsWithoutImage = post.sections.filter((section) => !section.image);
        const sectionCount = Math.max(sectionsWithoutImage.length, 1);
        const chunkSize = Math.ceil(galleryImagesForSections.length / sectionCount);
        let galleryIndex = 0;
        return post.sections.map((section) => {
          if (section.image) {
            return [];
          }
          const chunk = galleryImagesForSections.slice(
            galleryIndex * chunkSize,
            (galleryIndex + 1) * chunkSize,
          );
          galleryIndex += 1;
          return chunk;
        });
      })()
    : [];
  const coverUrl = getBlogCoverUrl(post);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [getAbsoluteImageUrl(coverUrl)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "hi-IN",
    articleSection: getCategoryLabel(post.category),
    keywords: post.keywords.join(", "),
    isAccessibleForFree: true,
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

  const faqSchema =
    post.faq.length > 0
      ? {
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
        }
      : null;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <div className="mb-6">
        <LocalizedBreadcrumbs items={getBlogBreadcrumbItems(post)} />
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,760px)_300px] xl:items-start">
        <article className="blog-content-lock space-y-8" translate="no">
          <header className="overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <div className={`relative article-hero-cover bg-gradient-to-br ${post.heroAccent}`}>
              <BlogImage
                src={coverUrl}
                alt={post.imageAlt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 760px"
                className="object-cover"
                style={{
                  objectPosition: post.imageObjectPosition ?? "center",
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.72))]" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/85">
                  <span className="rounded-full bg-white/15 px-3 py-1 font-semibold text-white backdrop-blur">
                    {getCategoryLabel(post.category)}
                  </span>
                  <span>{new Date(post.publishedAt).toLocaleDateString("hi-IN")}</span>
                  <span>{post.readTime}</span>
                </div>
                <h1 className="headline-font mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                  {post.title}
                </h1>
              </div>
            </div>
            <div className="space-y-4 p-6 sm:p-8">
              <p className="article-prose mt-0 max-w-none text-lg leading-8 text-[color:var(--text-secondary)]">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 border-t border-[color:var(--border)] pt-4 text-sm text-[color:var(--text-muted)]">
                <span className="font-medium text-[color:var(--text-primary)]">{post.author}</span>
                <PostUpdatedLabel
                  date={new Date(post.updatedAt ?? post.publishedAt).toLocaleDateString("hi-IN")}
                />
              </div>
            </div>
          </header>

          <div className="article-prose mx-auto w-full max-w-3xl space-y-8">
          {post.sections.map((section, index) => (
            <section
              key={section.heading}
              className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8"
            >
              <h2 className="headline-font text-2xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-5 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-2xl bg-[color:var(--surface-muted)] px-4 py-3">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.table ? (
                <BlogArticleTable
                  caption={section.table.caption}
                  headers={section.table.headers}
                  rows={section.table.rows}
                />
              ) : null}
              {section.image ? (
                <figure className="mt-6 overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-muted)]">
                  <div className="relative aspect-[16/10]">
                    <BlogImage
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 720px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="px-4 py-3 text-sm text-[color:var(--text-muted)]">
                    {section.image.alt}
                  </figcaption>
                </figure>
              ) : sectionImageChunks[index]?.length ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {sectionImageChunks[index].map((image) => (
                    <div
                      key={image.src}
                      className="overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-muted)]"
                    >
                      <div className="relative aspect-[16/10]">
                        <BlogImage
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
                  <SponsoredAdSlot compact />
                </div>
              ) : null}
            </section>
          ))}
          </div>

          <div className="mx-auto w-full max-w-3xl space-y-8">
          {post.internalLinks?.length ? (
            <BlogPostInternalLinks links={post.internalLinks} />
          ) : null}

          <BlogPostFaqSection>
            <FaqAccordion items={post.faq} />
          </BlogPostFaqSection>

          <ShareButtons title={post.title} slug={post.slug} />

          <BlogPostQuerySection slug={post.slug} />

          <AuthorCard author={post.author} />

          <BlogPostRelatedSection relatedPosts={relatedPosts} />
          </div>
        </article>

        <aside className="space-y-6 xl:sticky xl:top-24">
          <BlogPostSidebarUi currentSlug={post.slug} posts={posts} />
        </aside>
      </div>
    </div>
  );
}
