"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/content";
import { buildMailtoLink } from "@/lib/query-mailto";
import { getTelegramBotUrl } from "@/lib/telegram-config";
import { useLocale } from "@/lib/i18n/locale-provider";

type QueryFormProps = {
  redirectUrl?: string;
};

type ApiResponse = {
  ok?: boolean;
  useMailto?: boolean;
  mailto?: string;
  error?: string;
  channel?: string;
};

export function QueryForm({ redirectUrl }: QueryFormProps) {
  const { tr } = useLocale();
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error" | "mailto">("idle");
  const telegramUrl = getTelegramBotUrl("connect");

  const redirect = redirectUrl ?? `${siteConfig.url}/?sent=1#query`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ApiResponse;

      if (data.ok) {
        form.reset();
        setStatus("done");
        window.history.replaceState(null, "", redirect);
        return;
      }

      if (data.useMailto) {
        window.location.href = data.mailto ?? buildMailtoLink(payload);
        setStatus("mailto");
        return;
      }

      setStatus("error");
    } catch {
      window.location.href = buildMailtoLink(payload);
      setStatus("mailto");
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(37,150,190,0.08),rgba(255,255,255,1))] p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
          {tr("formTelegramTitle")}
        </p>
        <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">
          {tr("formTelegramDesc")}
        </p>
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center rounded-full bg-[#229ED9] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1b8bc2]"
        >
          {tr("formTelegramButton")}
        </a>
        <p className="mt-3 text-xs leading-6 text-[color:var(--text-muted)]">
          {tr("formTelegramHint")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[color:var(--text-primary)]">
              {tr("formName")}
            </span>
            <input
              type="text"
              name="name"
              required
              placeholder={tr("formNamePlaceholder")}
              className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--accent)]"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[color:var(--text-primary)]">
              {tr("formEmail")}
            </span>
            <input
              type="email"
              name="email"
              required
              placeholder={tr("formEmailPlaceholder")}
              className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--accent)]"
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--text-primary)]">
            {tr("formMessage")}
          </span>
          <textarea
            name="message"
            required
            rows={5}
            placeholder={tr("formMessagePlaceholder")}
            className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm leading-7 text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--accent)]"
          />
        </label>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.3)] transition hover:bg-[color:var(--accent-strong)] disabled:opacity-70 sm:w-auto"
        >
          {status === "submitting" ? tr("formSubmitting") : tr("formSubmit")}
        </button>

        {status === "done" ? (
          <p className="text-sm text-emerald-700">{tr("formSuccess")}</p>
        ) : null}
        {status === "mailto" ? (
          <p className="text-sm text-emerald-700">{tr("formMailtoHint")}</p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-600">{tr("formError")}</p>
        ) : null}

        <p className="text-sm text-[color:var(--text-muted)]">
          {tr("formDirectEmail")}{" "}
          <Link
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-medium text-[color:var(--accent)] hover:underline"
          >
            {siteConfig.contactEmail}
          </Link>
        </p>
      </form>
    </div>
  );
}
