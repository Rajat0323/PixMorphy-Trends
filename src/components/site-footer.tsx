import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[color:var(--border)] bg-white/80">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
            PixMorphy Bhakti
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--text-secondary)]">
            Hindi mein aarti, chalisa, vrat katha aur tyohar puja vidhi — saaf Devanagari
            path, simple arth aur mobile-friendly bhakti guides.
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
            <Link href="/feed.xml" className="block hover:text-[color:var(--accent)]">
              RSS Feed
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            Bhakti Categories
          </h3>
          <div className="space-y-2 text-sm text-[color:var(--text-secondary)]">
            <Link href="/category/aarti" className="block hover:text-[color:var(--accent)]">
              Aarti
            </Link>
            <Link href="/category/chalisa" className="block hover:text-[color:var(--accent)]">
              Chalisa
            </Link>
            <Link href="/category/festivals" className="block hover:text-[color:var(--accent)]">
              Tyohar
            </Link>
            <Link href="/category/vrat-katha" className="block hover:text-[color:var(--accent)]">
              Vrat & Katha
            </Link>
            <Link href="/blog" className="block hover:text-[color:var(--accent)]">
              Saare Path
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
