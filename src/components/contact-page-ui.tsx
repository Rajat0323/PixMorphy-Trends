"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/data/content";
import { useLocale } from "@/lib/i18n/locale-provider";

export function ContactPageUi() {
  const { tr } = useLocale();

  return (
    <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
      <SectionHeading
        as="h1"
        eyebrow={tr("contactEyebrow")}
        title={tr("contactTitle")}
        description={tr("contactDesc")}
      />
      <div className="mt-8 space-y-6 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
        <div className="rounded-[24px] bg-[color:var(--surface-muted)] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
            {tr("contactEmailLabel")}
          </p>
          <Link
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-2 block text-xl font-semibold text-[color:var(--text-primary)] hover:text-[color:var(--accent)]"
          >
            {siteConfig.contactEmail}
          </Link>
          <p className="mt-2 text-sm text-[color:var(--text-muted)]">{tr("contactEmailHint")}</p>
        </div>
        <p>{tr("contactResponseTime")}</p>
        <p>
          {tr("contactFormLink")}{" "}
          <Link href="/#query" className="font-medium text-[color:var(--accent)] hover:underline">
            {tr("contactFormLinkText")}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
