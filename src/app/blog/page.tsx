import type { Metadata } from "next";
import { BlogIndexUi } from "@/components/blog-index-ui";
import { posts, siteConfig } from "@/data/content";
import { cmsDb } from "@/lib/cms-db";

export const metadata: Metadata = {
  title: "ब्लॉग — करियर, AI, टेक और हिंदी लेख",
  description:
    "PixMorphy के सभी हिंदी ब्लॉग — करियर मार्गदर्शन, AI, टेक, क्रिकेट, भक्ति और अन्य विषय एक खोज योग्य संग्रह में।",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "PixMorphy ब्लॉग",
    description: siteConfig.description,
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  let cmsPosts: {slug:string;title:string;excerpt:string;featured_image:string;featured_image_alt:string;categories:string[];published_at:string}[]=[];
  if(process.env.DATABASE_URL){try{cmsPosts=await cmsDb()`SELECT slug,title,excerpt,featured_image,featured_image_alt,categories,published_at FROM cms_posts WHERE status='published' ORDER BY published_at DESC` as typeof cmsPosts;}catch{/* keep the existing static blog available if CMS storage is unavailable */}}

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <BlogIndexUi posts={posts} initialQuery={q ?? ""} />
      {cmsPosts.length>0&&<section className="mt-12 space-y-6"><h2 className="text-xl font-semibold">More articles</h2><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{cmsPosts.map(post=><a key={post.slug} href={`/blog/${post.slug}`} className="overflow-hidden rounded-2xl border bg-white shadow-sm hover:border-blue-400">{post.featured_image&&<img src={post.featured_image} alt={post.featured_image_alt||""} className="h-48 w-full object-cover"/>}<div className="p-5"><p className="text-xs text-slate-500">{post.categories?.join(" · ")}</p><h3 className="mt-2 text-lg font-bold">{post.title}</h3><p className="mt-2 text-sm text-slate-600">{post.excerpt}</p></div></a>)}</div></section>}
    </div>
  );
}
