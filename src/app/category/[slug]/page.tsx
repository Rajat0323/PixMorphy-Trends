import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/data/content";
import { getPostsByCategorySlug, slugToCategory } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(slugToCategory).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slugToCategory[slug];

  if (!category) {
    return {};
  }

  return {
    title: `${category} Posts`,
    description: `PixMorphy par ${category} category ke latest Hindi aur Hinglish blog posts.`,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      title: `${category} | PixMorphy`,
      description: `PixMorphy par ${category} category ke latest Hindi aur Hinglish blog posts.`,
      url: `${siteConfig.url}/category/${slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = slugToCategory[slug];
  const categoryPosts = getPostsByCategorySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: category },
          ]}
        />
        <SectionHeading
          as="h1"
          eyebrow="Category"
          title={`${category} posts`}
          description={`${category} category ke selected stories, explainers aur updates.`}
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
