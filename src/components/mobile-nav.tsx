"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/data/content";
import { getNavLabel } from "@/lib/i18n/translations";
import { useLocale } from "@/lib/i18n/locale-provider";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { locale, tr } = useLocale();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white px-4 text-sm font-semibold text-[color:var(--text-primary)]"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
      >
        {tr("navMenu")}
      </button>
      {open ? (
        <nav
          id="mobile-nav-panel"
          className="absolute left-0 right-0 top-full z-50 border-b border-[color:var(--border)] bg-white px-4 py-4 shadow-lg"
        >
          <div className="flex flex-col gap-2">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-muted)]"
              >
                {getNavLabel(locale, item.id)}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </div>
  );
}
