export type CmsPrivacyIssue = "email address" | "phone number" | "credential-like string";

/** Scan every publishable text field for common identifiers and exposed credentials. */
export function checkCmsPublicationPrivacy(fields: Record<string, unknown>): CmsPrivacyIssue[] {
  const text = Object.values(fields).map((value) => String(value ?? "")).join("\n");
  const issues: CmsPrivacyIssue[] = [];
  if (/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/.test(text)) issues.push("email address");
  if (/(?:\+?91[\s().-]?)?[6-9]\d{4}[\s.-]?\d{5}\b/.test(text)) issues.push("phone number");
  if (/\b(?:AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{20,}|Bearer\s+[A-Za-z0-9._~+/-]{20,})\b/i.test(text)) {
    issues.push("credential-like string");
  }
  return issues;
}
