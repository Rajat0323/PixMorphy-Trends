import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { CATEGORY_SLUG_LABELS } from "@/data/bhakti";
import { siteConfig } from "@/data/content";
import { getActiveCategorySlugs, getPostsByCategorySlug, slugToCategory } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getActiveCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slugToCategory[slug];
  const label = CATEGORY_SLUG_LABELS[slug] ?? category;

  if (!category) {
    return {};
  }

  return {
    title: `${label} — लेख`,
    description: `PixMorphy par ${label} category ke experience-based Hindi career articles.`,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: `${label} | PixMorphy`,
      description: `PixMorphy par ${label} category ke experience-based Hindi career articles.`,
      url: `${siteConfig.url}/category/${slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = slugToCategory[slug];
  const label = CATEGORY_SLUG_LABELS[slug] ?? category;
  const categoryPosts = getPostsByCategorySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <Breadcrumbs
          items={[
            { label: "मुख्य पृष्ठ", href: "/" },
            { label: "सभी ब्लॉग", href: "/blog" },
            { label: label ?? category },
          ]}
        />
        <SectionHeading
          as="h1"
          eyebrow="श्रेणी"
          title={`${label} — लेख`}
          description={`${label} category ke experience-based career guides — personal journey, honest guidance.`}
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categoryPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
