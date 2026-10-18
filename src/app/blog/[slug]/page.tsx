import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/author-card";
import { BlogImage } from "@/components/blog-image";
import {
  BlogPostFaqSection,
  BlogPostReferences,
  BlogPostInternalLinks,
  BlogPostQuerySection,
  BlogPostRelatedSection,
  BlogPostSidebarUi,
  PostUpdatedLabel,
} from "@/components/blog-post-ui";
import {
  BlogPostSections,
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
import { getCmsPublishedPost } from "@/lib/cms-db";
import { sanitizeCmsContent } from "@/lib/cms-content";
import { CmsFeaturedImage } from "@/components/cms-featured-image";
import { getCmsImageUrl } from "@/lib/cms-image";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = true;

function getCmsInternalLinks(value: unknown) {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .flatMap((line) => {
      const separator = line.indexOf("|");
      const label = separator >= 0 ? line.slice(0, separator).trim() : "";
      const target = separator >= 0 ? line.slice(separator + 1).trim() : line;
      try {
        const url = new URL(target, siteConfig.url);
        if (url.origin !== new URL(siteConfig.url).origin) return [];
        const href = `${url.pathname}${url.search}${url.hash}`;
        const knownPost = posts.find((post) => href === `/blog/${post.slug}`);
        const fallbackLabel = decodeURIComponent(url.pathname.split("/").filter(Boolean).at(-1) ?? "Related guide").replace(/-/g, " ");
        return [{ href, label: label || knownPost?.title || fallbackLabel }];
      } catch {
        return [];
      }
    });
}

function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cmsPost = await getCmsPublishedPost(slug);
  if (cmsPost) {
    const title = String(cmsPost.seo_title || cmsPost.title);
    const description = String(cmsPost.meta_description || cmsPost.excerpt || "");
    const image = getCmsImageUrl(cmsPost.featured_image);
    const articleUrl = getAbsoluteUrl(`/blog/${slug}`);
    return {
      title,
      description,
      alternates: { canonical: String(cmsPost.canonical_url || articleUrl) },
      openGraph: {
        title: String(cmsPost.og_title || title),
        description: String(cmsPost.og_description || description),
        type: "article",
        url: articleUrl,
        publishedTime: String(cmsPost.published_at ?? cmsPost.created_at ?? ""),
        modifiedTime: String(cmsPost.updated_at ?? cmsPost.published_at ?? cmsPost.created_at ?? ""),
        images: image ? [{ url: image, alt: String(cmsPost.featured_image_alt ?? "") }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: String(cmsPost.og_title || title),
        description: String(cmsPost.og_description || description),
        images: image ? [image] : undefined,
      },
    };
  }
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
  const cmsPost = await getCmsPublishedPost(slug);
  if (cmsPost) {
    const articleUrl = getAbsoluteUrl(`/blog/${slug}`);
    const publishedAt = String(cmsPost.published_at ?? cmsPost.created_at ?? "");
    const updatedAt = String(cmsPost.updated_at ?? publishedAt);
    const authorName = "PixMorphy Editorial Team";
    const categories = Array.isArray(cmsPost.categories) ? cmsPost.categories.map(String) : [];
    const tags = Array.isArray(cmsPost.tags) ? cmsPost.tags.map(String) : [];
    const internalLinks = getCmsInternalLinks(cmsPost.internal_links);
    const cmsImageUrl = getCmsImageUrl(cmsPost.featured_image);
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: String(cmsPost.title),
      description: String(cmsPost.meta_description || cmsPost.excerpt || ""),
      datePublished: publishedAt || undefined,
      dateModified: updatedAt || undefined,
      articleSection: categories,
      keywords: tags,
      inLanguage: "en-IN",
      author: { "@type": "Organization", name: authorName, url: siteConfig.url },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
        logo: { "@type": "ImageObject", url: `${siteConfig.url}/icon?size=512` },
      },
      image: cmsImageUrl ? [cmsImageUrl] : undefined,
      mainEntityOfPage: articleUrl,
    };

    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-5 text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-700">PixMorphy</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/blog" className="hover:text-blue-700">Blog</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page" className="text-slate-900">{String(cmsPost.title)}</span>
        </nav>
        <article lang="en-IN" className="mx-auto rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-9">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--text-muted)]">
            {categories.map((category) => <span key={category} className="rounded-full bg-[color:var(--surface-muted)] px-3 py-1 font-semibold text-[color:var(--accent)]">{category}</span>)}
            <span>{authorName}</span>
            {publishedAt ? <time dateTime={publishedAt}>{new Date(publishedAt).toLocaleDateString("en-IN")}</time> : null}
            {updatedAt && updatedAt !== publishedAt ? <span>Updated {new Date(updatedAt).toLocaleDateString("en-IN")}</span> : null}
          </div>
          <h1 className="headline-font mt-5 text-3xl font-bold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-5xl">{String(cmsPost.title)}</h1>
          {cmsPost.excerpt ? <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-secondary)]">{String(cmsPost.excerpt)}</p> : null}
          {cmsPost.featured_image ? (
            <figure className="mt-8 overflow-hidden rounded-xl border border-[color:var(--border)]">
              <CmsFeaturedImage src={String(cmsPost.featured_image)} alt={String(cmsPost.featured_image_alt ?? "")} title={String(cmsPost.title)} />
            </figure>
          ) : null}
          <div className="cms-article-body mt-8" dangerouslySetInnerHTML={{ __html: sanitizeCmsContent(cmsPost.content) }} />
          {internalLinks.length ? (
            <nav aria-label="Related guides" className="mt-10 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] p-5">
              <h2 className="text-lg font-bold text-[color:var(--text-primary)]">Related guides</h2>
              <ul className="mt-3 list-inside list-disc space-y-2">
                {internalLinks.map((link) => <li key={`${link.href}-${link.label}`}><a href={link.href} className="font-medium text-[color:var(--accent)] underline underline-offset-2">{link.label}</a></li>)}
              </ul>
            </nav>
          ) : null}
          {String(cmsPost.sources ?? "").trim() ? (
            <section className="mt-10 border-t border-[color:var(--border)] pt-6">
              <h2 className="text-xl font-bold text-[color:var(--text-primary)]">References and sources</h2>
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm">
                {String(cmsPost.sources).split(/\r?\n/).filter(Boolean).map((source: string, index: number) => {
                  const url = source.match(/https:\/\/\S+/)?.[0];
                  return <li key={`${source}-${index}`}>{url ? <><span>{source.slice(0, source.indexOf(url)).trim()}</span> <a href={url} target="_blank" rel="noopener noreferrer" className="break-all text-[color:var(--accent)] underline">{url}</a></> : source}</li>;
                })}
              </ul>
            </section>
          ) : null}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }} />
        </article>
      </main>
    );
  }
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.relatedSlugs);
  const coverUrl = getBlogCoverUrl(post);
  const authorProfile = authors[post.author as keyof typeof authors];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [getAbsoluteImageUrl(coverUrl)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "en-IN",
    articleSection: getCategoryLabel(post.category),
    keywords: post.keywords.join(", "),
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: post.author,
      description: authorProfile?.bio,
      url: siteConfig.url,
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

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }}
      />

      <div className="mb-6">
        <LocalizedBreadcrumbs items={getBlogBreadcrumbItems(post)} />
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,760px)_300px] xl:items-start">
        <article lang="en-IN" className="blog-content-lock space-y-8">
          <header className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
            <div className="p-5 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--text-muted)]">
                <span className="rounded-full bg-[color:var(--surface-muted)] px-3 py-1 font-semibold text-[color:var(--accent)]">{getCategoryLabel(post.category)}</span>
                <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString("en-IN")}</time>
                <span>{post.readTime}</span>
              </div>
              <h1 className="headline-font mt-5 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-secondary)]">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[color:var(--border)] pt-4 text-sm text-[color:var(--text-muted)]">
                <span className="font-semibold text-[color:var(--text-primary)]">{post.author}</span>
                {post.updatedAt && post.updatedAt !== post.publishedAt ? (
                  <PostUpdatedLabel date={new Date(post.updatedAt).toLocaleDateString("en-IN")} />
                ) : null}
              </div>
            </div>
            <figure className={`relative article-hero-cover bg-gradient-to-br ${post.heroAccent}`}>
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
              <figcaption className="sr-only">{post.imageAlt}</figcaption>
            </figure>
          </header>

          <BlogPostSections post={post} />

          <div className="mx-auto w-full max-w-3xl space-y-8">
          {post.references?.length ? <BlogPostReferences references={post.references} /> : null}
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
    </main>
  );
}
