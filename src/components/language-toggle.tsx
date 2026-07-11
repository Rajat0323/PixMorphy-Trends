"use client";

import { useLocale } from "@/lib/i18n/locale-provider";

export function LanguageToggle() {
  const { locale, setLocale, tr } = useLocale();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "hi" ? "en" : "hi")}
      className="inline-flex h-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white px-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--text-primary)] shadow-sm transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] sm:px-4 sm:text-sm"
      aria-label={tr("langToggleAria")}
    >
      {tr("langToggle")}
    </button>
  );
}
