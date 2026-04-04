import Image from "next/image";
import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { CategoryRail } from "@/components/category-rail";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { featuredPosts, posts, siteConfig } from "@/data/content";

function HomepageHero() {
  const lead = featuredPosts[0];
  const sidePosts = featuredPosts.slice(1);

  return (
    <section className="grid gap-6 lg:grid-cols-[1.32fr_0.88fr]">
      <Link
        href={`/blog/${lead.slug}`}
        className="group self-start overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
      >
        <div className="relative h-[360px] overflow-hidden sm:h-[430px]">
          <Image
            src={lead.imageSrc}
            alt={lead.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 860px"
            className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${lead.heroAccent} opacity-10`} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.74))]" />
          <div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-3 text-white/92">
              <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur">
                Featured
              </span>
              <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-semibold backdrop-blur">
                {lead.category}
              </span>
            </div>
            <div className="max-w-2xl space-y-3">
              <h1 className="headline-font text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                {lead.title}
              </h1>
              <p className="max-w-xl text-sm leading-7 text-white/82 sm:text-base">
                {lead.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span>{lead.author}</span>
                <span>{new Date(lead.publishedAt).toLocaleDateString("en-IN")}</span>
                <span>{lead.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="grid gap-6">
        {sidePosts.map((post) => (
          <PostCard key={post.slug} post={post} compact />
        ))}
      </div>
    </section>
  );
}

function TopicHighlights() {
  return (
    <section className="grid gap-4 rounded-[32px] border border-[color:var(--border)] bg-white p-5 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:grid-cols-3 sm:p-8">
      {[
        ["AI Tools", "Useful AI apps, productivity tools aur creator-friendly picks."],
        ["Tech Updates", "App features, mobile changes aur internet trends in simple language."],
        ["How-To Guides", "Step-by-step explainers jo fast read bhi hon aur practical bhi."],
      ].map(([title, copy]) => (
        <div key={title} className="rounded-[24px] bg-[color:var(--surface-muted)] p-5">
          <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{copy}</p>
        </div>
      ))}
    </section>
  );
}

function TrendingNow() {
  return (
    <section
      id="trending"
      className="rounded-[32px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.88))] px-5 py-6 text-white shadow-[0_24px_58px_rgba(15,23,42,0.18)] sm:px-8"
    >
      <SectionHeading
        eyebrow="Trending Now"
        title="Aaj ke sabse zyada dekhe ja rahe blog topics"
        description="Viral stories, latest updates aur creator-focused explainers ko yahan quick scan format mein rakha gaya hai."
      />
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {posts.slice(0, 3).map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-[28px] border border-white/10 bg-white/6 p-5 transition hover:bg-white/10"
          >
            <p className="text-sm font-semibold text-sky-300">0{index + 1}</p>
            <h3 className="mt-3 text-lg font-semibold leading-8 tracking-tight">
              {post.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-white/72">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const aiAndEarn = posts.filter(
    (post) => post.category === "AI Tools" || post.category === "Online Earning",
  );
  const techAndTrending = posts.filter(
    (post) => post.category === "Tech Update" || post.category === "Trending",
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
      <section className="space-y-6 pt-4">
        <HomepageHero />
        <CategoryRail />
      </section>

      <TopicHighlights />

      <section id="latest" className="space-y-6">
        <SectionHeading
          eyebrow="Latest Posts"
          title="Fresh blog updates, viral topics aur useful explainers"
          description="Clean cards, strong thumbnails aur short summaries ke saath sab latest posts ek jagah."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <div key={post.slug} className="space-y-6">
              <PostCard post={post} />
              {index === 2 ? (
                <AdSlot label="In-feed ad slot for sponsor or ad placement" compact />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <TrendingNow />

      <section className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Top Stories"
            title="Readers ke beech fast pick ho rahi featured stories"
            description="Big-interest topics ko homepage par aur zyada prominent space diya gaya hai."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {posts.slice(0, 2).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
            <div className="space-y-6">
              <AdSlot label="Featured sponsor or affiliate placement" />
              <div className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
                <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">
                  Popular Categories
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {siteConfig.categories.map((category) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="rounded-full bg-[color:var(--surface-muted)] px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)]"
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)]">
            <h2 className="text-lg font-semibold text-[color:var(--text-primary)]">
              Trending Guides
            </h2>
            <div className="mt-5 space-y-5">
              {posts.slice(1, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block rounded-[22px] bg-[color:var(--surface-muted)] p-4 transition hover:-translate-y-0.5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
                    {post.category}
                  </p>
                  <h3 className="mt-2 text-base font-semibold leading-7 text-[color:var(--text-primary)]">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          <AdSlot label="Sidebar ad or sponsor block" />
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div id="ai-tools" className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
          <SectionHeading
            eyebrow="AI Tools & Earn"
            title="AI aur earning category ke selected blog posts"
            description="Creators, freelancers aur beginners ke liye easy-to-read stories aur guides."
          />
          <div className="mt-6 grid gap-4">
            {aiAndEarn.map((post) => (
              <PostCard key={post.slug} post={post} compact />
            ))}
          </div>
        </div>

        <div id="how-to" className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
          <SectionHeading
            eyebrow="Tech & Trending"
            title="Latest updates aur viral explainers in one section"
            description="App updates, creator trends aur fast-moving topics ko yahan grouped format mein dekhiye."
          />
          <div className="mt-6 grid gap-4">
            {techAndTrending.map((post) => (
              <PostCard key={post.slug} post={post} compact />
            ))}
          </div>
        </div>
      </section>

      <div className="sticky bottom-4 z-40 lg:hidden">
        <div className="mx-auto max-w-md rounded-full border border-[color:var(--border)] bg-white/95 px-4 py-3 shadow-[0_18px_48px_rgba(15,23,42,0.16)] backdrop-blur">
          <p className="text-center text-sm font-medium text-[color:var(--text-secondary)]">
            Sponsored spot reserved for mobile ad placement
          </p>
        </div>
      </div>
    </div>
  );
}
