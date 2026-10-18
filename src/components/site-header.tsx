"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/content";
import { getNavLabel } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/locale-provider";
import { LanguageToggle } from "@/components/language-toggle";
import { MobileNav } from "@/components/mobile-nav";

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
}

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, tr } = useLocale();

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`${siteConfig.name} — Home`} className="flex shrink-0 items-center gap-3">
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--accent)] text-sm font-bold tracking-tight text-white">PM</span>
          <span className="min-w-0">
            <span className="block text-base font-bold tracking-tight text-[color:var(--text-primary)]">{siteConfig.name}</span>
            <span className="hidden text-[11px] text-[color:var(--text-muted)] sm:block">{tr("siteTagline")}</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="site-header__nav hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : item.href === "/#query" ? false : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[color:var(--text-secondary)] transition hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--accent)]"
              >
                {getNavLabel(locale, item.id)}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <Link href="/blog" aria-label={tr("navSearch")} className="hidden h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text-secondary)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] sm:inline-flex">
            <SearchIcon />
          </Link>
          <Link href="/blog" className="hidden min-h-10 items-center rounded-full bg-[color:var(--accent)] px-4 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-strong)] md:inline-flex">
            {tr("navBlogsBtn")} <span aria-hidden="true" className="ml-2">→</span>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
