export function isPinterestPinPage(value: string) {
  try {
    const url = new URL(value);
    return /(^|\.)pinterest\.(com|ca|co\.uk|de|fr|in|jp|es|com\.au)$/i.test(url.hostname)
      && /\/pin\/\d+/i.test(url.pathname);
  } catch {
    return false;
  }
}

export function getCmsImageUrl(value: unknown) {
  const candidate = String(value ?? "").trim();
  try {
    const url = new URL(candidate);
    return /^https?:$/.test(url.protocol) && !isPinterestPinPage(candidate) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}
