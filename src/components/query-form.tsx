"use client";

import { useState } from "react";

type QueryFormProps = {
  actionEmail: string;
  siteUrl: string;
};

export function QueryForm({ actionEmail, siteUrl }: QueryFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  return (
    <form
      action={`https://formsubmit.co/${actionEmail}`}
      method="POST"
      className="space-y-4"
      onSubmit={() => setStatus("submitting")}
    >
      <input type="hidden" name="_subject" value="PixMorphy — नया प्रश्न / Query" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value={`${siteUrl}/?sent=1#query`} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--text-primary)]">आपका नाम</span>
          <input
            type="text"
            name="name"
            required
            placeholder="अपना नाम लिखें"
            className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--accent)]"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-[color:var(--text-primary)]">ईमेल</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@email.com"
            className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--accent)]"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-[color:var(--text-primary)]">
          आपका प्रश्न / संदेश
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="करियर, नौकरी, AI, पढ़ाई या किसी भी विषय पर अपना सवाल यहाँ लिखें..."
          className="w-full rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm leading-7 text-[color:var(--text-primary)] outline-none transition focus:border-[color:var(--accent)]"
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.3)] transition hover:bg-[color:var(--accent-strong)] disabled:opacity-70"
      >
        {status === "submitting" ? "भेजा जा रहा है..." : "प्रश्न भेजें"}
      </button>

      {status === "done" ? (
        <p className="text-sm text-emerald-700">धन्यवाद! आपका संदेश भेज दिया गया है।</p>
      ) : null}
    </form>
  );
}
