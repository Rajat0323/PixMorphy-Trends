export type CmsPrivacyIssue = "email address" | "phone number" | "credential-like string";
export type CmsPrivacyDetail = { issue: CmsPrivacyIssue; field: string; location: string; preview: string };

const patterns: { issue: CmsPrivacyIssue; regex: RegExp }[] = [
  { issue: "email address", regex: /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g },
  { issue: "phone number", regex: /(?:\+?91[\s().-]?)?[6-9]\d{4}[\s.-]?\d{5}\b/g },
  { issue: "credential-like string", regex: /\b(?:AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{20,}|Bearer\s+[A-Za-z0-9._~+/-]{20,})\b/gi },
];

const fieldLabels: Record<string, string> = {
  title: "Article title", excerpt: "Excerpt", content: "Main content", seoTitle: "SEO title",
  metaDescription: "Meta description", ogTitle: "Open Graph title", ogDescription: "Open Graph description",
  sources: "References and sources", keyword: "Primary topic", canonical: "Canonical URL",
  featuredImage: "Featured image URL", featuredImageAlt: "Featured image alt text", internalLinks: "Internal links",
  author: "Author", categories: "Categories", tags: "Tags", quality: "First-hand experience and evidence",
};
const qualityLabels: Record<string, string> = {
  problem: "Personal problem experienced", method: "Tool or method tested", steps: "Exact steps followed",
  inputsOutputs: "Actual inputs and outputs", comparison: "Before and after comparison", results: "Measured results and limitations",
  evidence: "Screenshots or supporting evidence", worked: "What worked and what did not", reproduce: "Reproduction steps", verifiedAt: "Experiment date",
};

function readableText(value: unknown) {
  return String(value ?? "").replace(/<\/(?:p|div|li|h[1-6]|tr|blockquote)>|<br\s*\/?\s*>/gi, "\n").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n").trim();
}

function maskMatch(match: string, issue: CmsPrivacyIssue) {
  if (issue === "phone number") {
    let digitsToMask = Math.max(0, (match.match(/\d/g)?.length ?? 0) - 2);
    return match.replace(/\d/g, (digit) => {
      if (digitsToMask > 0) { digitsToMask--; return "•"; }
      return digit;
    });
  }
  if (issue === "email address") return match.replace(/^(.).+(@.*)$/, "$1•••$2");
  return "[credential hidden]";
}

/** Return actionable locations while keeping detected contact details masked in the response. */
export function findCmsPublicationPrivacyDetails(fields: Record<string, unknown>): CmsPrivacyDetail[] {
  const details: CmsPrivacyDetail[] = [];
  for (const [key, value] of Object.entries(fields)) {
    if (key === "privacyReviewConfirmed" || key === "formatVerificationToken") continue;
    const label = fieldLabels[key] ?? key;
    let text = readableText(value);
    if (key === "quality" && typeof value === "string") {
      try {
        const parsed = JSON.parse(value) as Record<string, unknown>;
        text = Object.entries(parsed).map(([name, item]) => `${name}: ${readableText(item)}`).join("\n");
      } catch { /* Keep the raw text when quality is not JSON. */ }
    }
    const chunks = text.split(/\n+/).map((part) => part.trim()).filter(Boolean);
    for (const pattern of patterns) {
      pattern.regex.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = pattern.regex.exec(text))) {
        const before = text.slice(0, match.index);
        const lineNumber = before.split("\n").length;
        const chunk = chunks[Math.min(lineNumber - 1, chunks.length - 1)] ?? text;
        const qualityKey = key === "quality" ? chunks[Math.min(lineNumber - 1, chunks.length - 1)]?.split(":", 1)[0] : undefined;
        const field = key === "quality" && qualityKey ? `quality.${qualityKey}` : key;
        const location = key === "content" ? `Main content · paragraph ${lineNumber}` : key === "quality" ? `First-hand experience · ${qualityLabels[qualityKey ?? ""] ?? `line ${lineNumber}`}` : fieldLabels[key] ?? key;
        details.push({ issue: pattern.issue, field, location, preview: chunk.replace(match[0], maskMatch(match[0], pattern.issue)).slice(0, 180) });
        if (details.length >= 12) return details;
        if (match[0].length === 0) pattern.regex.lastIndex++;
      }
    }
  }
  return details;
}

/** Scan every publishable text field for common identifiers and exposed credentials. */
export function checkCmsPublicationPrivacy(fields: Record<string, unknown>): CmsPrivacyIssue[] {
  return [...new Set(findCmsPublicationPrivacyDetails(fields).map((detail) => detail.issue))];
}
