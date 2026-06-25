import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CategoryRail } from "@/components/category-rail";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { publicPosts, siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "हनुमान चालीसा हिंदी में — संपूर्ण पाठ",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

const HANUMAN_CHALISA_SLUG = "hanuman-chalisa-in-hindi-sampoorna-path";

function HomepageHero() {
  const chalisa = publicPosts.find((post) => post.slug === HANUMAN_CHALISA_SLUG);

  if (!chalisa) {
    return null;
  }

  return (
    <section>
      <Link
        href={`/blog/${chalisa.slug}`}
        className="group block overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
      >
        <div className="relative h-[360px] overflow-hidden sm:h-[430px]">
          <Image
            src={chalisa.imageSrc}
            alt={chalisa.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 860px"
            className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${chalisa.heroAccent} opacity-15`} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.74))]" />
          <div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-3 text-white/92">
              <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur">
                भक्ति पाठ
              </span>
              <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                {chalisa.featuredLabel}
              </span>
            </div>
            <div className="max-w-2xl space-y-3">
              <h2 className="headline-font text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                {chalisa.title}
              </h2>
              <p className="max-w-xl text-sm leading-7 text-white/82 sm:text-base">
                {chalisa.excerpt}
              </p>
              <span className="inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-[color:var(--accent)]">
                संपूर्ण पाठ पढ़ें →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

export default function Home() {
  const chalisaPosts = publicPosts.filter((post) => post.category === "Chalisa");

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="sr-only">
        पिक्समॉर्फी भक्ति — हनुमान चालीसा हिंदी में संपूर्ण पाठ
      </h1>
      <section className="space-y-6 pt-4">
        <HomepageHero />
        <CategoryRail />
      </section>

      <section
        id="chalisa"
        className="rounded-[32px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(234,88,12,0.08),rgba(255,255,255,1))] px-5 py-6 sm:px-8"
      >
        <SectionHeading
          eyebrow="चालीसा पाठ"
          title="हनुमान चालीसा — संपूर्ण हिंदी पाठ"
          description="मंगलवार और शनिवार के लिए भक्तों की सबसे अधिक खोजी जाने वाली सामग्री।"
        />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {chalisaPosts.map((post) => (
            <PostCard key={post.slug} post={post} compact />
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          eyebrow="व्हाट्सऐप साझा"
          title="परिवार और मंदिर समूह में पाठ साझा करें"
          description="हनुमान चालीसा पेज पर व्हाट्सऐप साझा बटन है — जल्दी पहुँचाएँ।"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          {siteConfig.categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="rounded-full bg-[color:var(--surface-muted)] px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)] hover:text-[color:var(--accent)]"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
