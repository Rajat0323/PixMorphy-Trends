"use client";

import { useLocale } from "@/lib/i18n/locale-provider";
import type { Locale } from "@/lib/i18n/types";

const options: { id: Locale; label: string }[] = [
  { id: "hi", label: "HI" },
  { id: "en", label: "EN" },
];

export function LanguageToggle() {
  const { locale, setLocale, tr } = useLocale();

  return (
    <div
      className="inline-flex h-10 items-center rounded-full border border-[color:var(--border)] bg-white p-1 shadow-sm sm:h-11"
      role="group"
      aria-label={tr("langToggleAria")}
    >
      {options.map((option) => {
        const active = locale === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setLocale(option.id)}
            aria-pressed={active}
            className={`min-w-[42px] rounded-full px-3 py-1.5 text-xs font-bold tracking-wide transition sm:min-w-[46px] sm:text-sm ${
              active
                ? "bg-[color:var(--accent)] text-white shadow-[0_8px_18px_rgba(37,99,235,0.28)]"
                : "text-[color:var(--text-secondary)] hover:text-[color:var(--accent)]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
