import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/author-card";
import { BlogImage } from "@/components/blog-image";
import {
  BlogPostFaqSection,
  BlogPostInternalLinks,
  BlogPostQuerySection,
  BlogPostRelatedSection,
  BlogPostSidebarUi,
  PostUpdatedLabel,
} from "@/components/blog-post-ui";
import {
  BlogPostSections,
  ExperienceDisclaimer,
} from "@/components/blog-post-sections";
import { FaqAccordion } from "@/components/faq-accordion";
import {
  getBlogBreadcrumbItems,
} from "@/lib/breadcrumbs";
import {
  LocalizedBreadcrumbs,
} from "@/components/localized-breadcrumbs";
import { ShareButtons } from "@/components/share-buttons";
import { authors, getPostBySlug, getRelatedPosts, posts, siteConfig } from "@/data/content";
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
  const coverUrl = getBlogCoverUrl(post);
  const authorProfile = authors[post.author as keyof typeof authors];
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
      jobTitle: authorProfile?.jobTitle,
      knowsAbout: authorProfile?.knowsAbout,
      description: authorProfile?.bio,
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
                {authorProfile?.credentials ? (
                  <span>{authorProfile.credentials}</span>
                ) : null}
                <PostUpdatedLabel
                  date={new Date(post.updatedAt ?? post.publishedAt).toLocaleDateString("hi-IN")}
                />
              </div>
            </div>
          </header>

          {post.experienceNote ? (
            <div className="mx-auto w-full max-w-3xl">
              <ExperienceDisclaimer note={post.experienceNote} />
            </div>
          ) : null}

          <BlogPostSections post={post} />

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
