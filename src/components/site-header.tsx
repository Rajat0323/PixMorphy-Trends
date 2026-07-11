"use client";

import Link from "next/link";
import { siteConfig } from "@/data/content";
import { getNavLabel } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/locale-provider";
import { LanguageToggle } from "@/components/language-toggle";
import { MobileNav } from "@/components/mobile-nav";

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function SiteHeader() {
  const { locale, tr } = useLocale();

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-[color:var(--surface-overlay)] backdrop-blur-xl">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent),var(--accent-strong))] text-sm font-bold text-white shadow-[0_12px_24px_rgba(37,99,235,0.28)]">
            PM
          </span>
          <div>
            <p className="text-base font-semibold tracking-tight text-[color:var(--text-primary)]">
              {siteConfig.name}
            </p>
            <p className="text-xs text-[color:var(--text-muted)]">{tr("siteTagline")}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/75 px-2 py-1 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)] transition hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--text-primary)]"
            >
              {getNavLabel(locale, item.id)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageToggle />
          <Link
            href="/blog"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--text-primary)] shadow-sm transition hover:-translate-y-0.5 sm:inline-flex"
            aria-label={tr("navSearch")}
          >
            <SearchIcon />
          </Link>
          <Link
            href="/blog"
            className="hidden h-11 items-center justify-center rounded-full bg-[color:var(--accent)] px-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.3)] transition hover:bg-[color:var(--accent-strong)] md:inline-flex"
          >
            {tr("navBlogsBtn")}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
