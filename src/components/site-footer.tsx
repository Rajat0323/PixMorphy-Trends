"use client";

import Link from "next/link";
import { siteConfig } from "@/data/content";
import { useLocale } from "@/lib/i18n/locale-provider";

export function SiteFooter() {
  const { tr } = useLocale();

  return (
    <footer className="mt-20 border-t border-[color:var(--border)] bg-white/80">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
            {siteConfig.name}
          </h2>
          <p className="max-w-xl text-sm leading-7 text-[color:var(--text-secondary)]">
            {tr("footerDesc")}
          </p>
          <p className="text-xs text-[color:var(--text-muted)]">
            © {new Date().getFullYear()} {siteConfig.name}. {tr("footerRights")}
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            {tr("footerTrust")}
          </h3>
          <div className="space-y-2 text-sm text-[color:var(--text-secondary)]">
            <Link href="/about" className="block hover:text-[color:var(--accent)]">
              {tr("footerAbout")}
            </Link>
            <Link href="/contact" className="block hover:text-[color:var(--accent)]">
              {tr("footerContact")}
            </Link>
            <Link href="/editorial-policy" className="block hover:text-[color:var(--accent)]">
              {tr("footerEditorial")}
            </Link>
            <Link href="/privacy" className="block hover:text-[color:var(--accent)]">
              {tr("footerPrivacy")}
            </Link>
            <Link href="/feed.xml" className="block hover:text-[color:var(--accent)]">
              {tr("footerRss")}
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            {tr("footerCategories")}
          </h3>
          <div className="space-y-2 text-sm text-[color:var(--text-secondary)]">
            <Link href="/blog" className="block hover:text-[color:var(--accent)]">
              {tr("footerAllBlogs")}
            </Link>
            <Link href="/category/chalisa" className="block hover:text-[color:var(--accent)]">
              {tr("footerChalisa")}
            </Link>
            <Link href="/category/festivals" className="block hover:text-[color:var(--accent)]">
              {tr("footerFestivals")}
            </Link>
            <Link href="/category/vrat-katha" className="block hover:text-[color:var(--accent)]">
              {tr("footerVrat")}
            </Link>
            <Link href="/blog" className="block hover:text-[color:var(--accent)]">
              {tr("footerAllPosts")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
