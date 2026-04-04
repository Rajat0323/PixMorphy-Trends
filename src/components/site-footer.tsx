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
            <a className="block hover:text-[color:var(--accent)]" href="#latest">
              Editorial Standards
            </a>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            Categories
          </h3>
          <div className="space-y-2 text-sm text-[color:var(--text-secondary)]">
            <a className="block hover:text-[color:var(--accent)]" href="#ai-tools">
              AI Tools
            </a>
            <a className="block hover:text-[color:var(--accent)]" href="#earn">
              Online Earning
            </a>
            <a className="block hover:text-[color:var(--accent)]" href="#trending">
              Trending
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
