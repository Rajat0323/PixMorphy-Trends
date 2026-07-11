"use client";

import { useState } from "react";
import { siteConfig } from "@/data/content";
import { useLocale } from "@/lib/i18n/locale-provider";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";
const FORMSUBMIT_ID =
  process.env.NEXT_PUBLIC_FORMSUBMIT_ID ?? "c11b349aff2b9c98ec77c0e4f38859f7";

type QueryFormProps = {
  redirectUrl?: string;
};

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

export function QueryForm({ redirectUrl }: QueryFormProps) {
  const { tr } = useLocale();
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const redirect =
    redirectUrl ?? `${siteConfig.url}/?sent=1#query`;

  async function handleWeb3Submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          subject: "PixMorphy — नया प्रश्न / Query",
          from_name: siteConfig.name,
          botcheck: "",
        }),
      });

      const data = (await response.json()) as Web3FormsResponse;

      if (!response.ok || !data.success) {
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("done");
      window.history.replaceState(null, "", redirect);
    } catch {
      setStatus("error");
    }
  }

  const fields = (
    <>
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

      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" style={{ display: "none" }} />

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
      {status === "error" ? (
        <p className="text-sm text-red-600">{tr("formError")}</p>
      ) : null}
    </>
  );

  if (WEB3FORMS_KEY) {
    return (
      <form onSubmit={handleWeb3Submit} className="space-y-4">
        {fields}
      </form>
    );
  }

  return (
    <form
      action={`https://formsubmit.co/${FORMSUBMIT_ID}`}
      method="POST"
      className="space-y-4"
    >
      <input type="hidden" name="_next" value={redirect} />
      <input type="hidden" name="_subject" value="PixMorphy — नया प्रश्न / Query" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      {fields}
    </form>
  );
}
