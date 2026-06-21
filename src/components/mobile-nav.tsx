"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/data/content";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white px-4 text-sm font-semibold text-[color:var(--text-primary)]"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
      >
        Menu
      </button>
      {open ? (
        <nav
          id="mobile-nav-panel"
          className="absolute left-0 right-0 top-full z-50 border-b border-[color:var(--border)] bg-white px-4 py-4 shadow-lg"
        >
          <div className="flex flex-col gap-2">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-muted)]"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-muted)]"
            >
              All Posts
            </Link>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
