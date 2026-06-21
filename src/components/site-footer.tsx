import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[color:var(--border)] bg-white/80">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
            PixMorphy
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--text-secondary)]">
            Hindi aur Hinglish readers ke liye fast, trustworthy aur mobile-first tech blog.
            Focus hai practical guides, AI tools aur fresh updates par.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            Trust
          </h3>
          <div className="space-y-2 text-sm text-[color:var(--text-secondary)]">
            <Link href="/about" className="block hover:text-[color:var(--accent)]">
              About
            </Link>
            <Link href="/contact" className="block hover:text-[color:var(--accent)]">
              Contact
            </Link>
            <Link href="/editorial-policy" className="block hover:text-[color:var(--accent)]">
              Editorial Policy
            </Link>
            <Link href="/privacy" className="block hover:text-[color:var(--accent)]">
              Privacy Policy
            </Link>
            <Link href="/disclaimer" className="block hover:text-[color:var(--accent)]">
              Disclaimer
            </Link>
            <Link href="/feed.xml" className="block hover:text-[color:var(--accent)]">
              RSS Feed
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            Categories
          </h3>
          <div className="space-y-2 text-sm text-[color:var(--text-secondary)]">
            <Link href="/category/ai-tools" className="block hover:text-[color:var(--accent)]">
              AI Tools
            </Link>
            <Link href="/category/online-earning" className="block hover:text-[color:var(--accent)]">
              Online Earning
            </Link>
            <Link href="/category/trending" className="block hover:text-[color:var(--accent)]">
              Trending
            </Link>
            <Link href="/category/tech-update" className="block hover:text-[color:var(--accent)]">
              Tech Update
            </Link>
            <Link href="/blog" className="block hover:text-[color:var(--accent)]">
              All Posts
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
