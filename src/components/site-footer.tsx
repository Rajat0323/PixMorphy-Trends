"use client";

import Link from "next/link";
import { siteConfig } from "@/data/content";
import { useLocale } from "@/lib/i18n/locale-provider";

export function SiteFooter() {
  const { tr } = useLocale();

  return (
    <footer className="site-footer">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_.8fr_.8fr] lg:px-8">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--accent)] text-sm font-bold text-white">PM</span>
            <span className="text-lg font-bold tracking-tight text-[color:var(--text-primary)]">{siteConfig.name}</span>
          </Link>
          <p className="max-w-lg text-sm leading-7 text-[color:var(--text-secondary)]">{tr("footerDesc")}</p>
          <p className="text-xs text-[color:var(--text-muted)]">© {new Date().getFullYear()} {siteConfig.name}. {tr("footerRights")}</p>
        </div>
        <nav aria-label={tr("footerTrust")} className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[.15em] text-[color:var(--text-muted)]">{tr("footerTrust")}</h2>
          <ul className="space-y-3 text-sm text-[color:var(--text-secondary)]">
            <li><Link href="/about" className="hover:text-[color:var(--accent)]">{tr("footerAbout")}</Link></li>
            <li><Link href="/contact" className="hover:text-[color:var(--accent)]">{tr("footerContact")}</Link></li>
            <li><Link href="/editorial-policy" className="hover:text-[color:var(--accent)]">{tr("footerEditorial")}</Link></li>
            <li><Link href="/privacy" className="hover:text-[color:var(--accent)]">{tr("footerPrivacy")}</Link></li>
            <li><Link href="/feed.xml" className="hover:text-[color:var(--accent)]">{tr("footerRss")}</Link></li>
          </ul>
        </nav>
        <nav aria-label={tr("footerCategories")} className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-[.15em] text-[color:var(--text-muted)]">{tr("footerCategories")}</h2>
          <ul className="space-y-3 text-sm text-[color:var(--text-secondary)]">
            <li><Link href="/blog" className="hover:text-[color:var(--accent)]">{tr("footerAllBlogs")}</Link></li>
            <li><Link href="/category/career" className="hover:text-[color:var(--accent)]">{tr("footerCareer")}</Link></li>
            <li><Link href={siteConfig.categories[2].href} className="hover:text-[color:var(--accent)]">{tr("footerGovtToIt")}</Link></li>
            <li><Link href={siteConfig.categories[3].href} className="hover:text-[color:var(--accent)]">{tr("footerSalaryJourney")}</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
