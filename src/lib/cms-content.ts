import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p", "br", "h1", "h2", "h3", "strong", "b", "em", "i", "u",
  "ul", "ol", "li", "blockquote", "table", "thead", "tbody", "tr",
  "th", "td", "a", "img", "figure", "figcaption", "hr",
];

/** Keep CMS markup safe and preserve a single page-level H1 for the article title. */
export function sanitizeCmsContent(value: unknown) {
  return sanitizeHtml(String(value ?? "").slice(0, 500_000), {
    allowedTags,
    allowedAttributes: {
      a: ["href", "title", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      "*": ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      h1: sanitizeHtml.simpleTransform("h2", {}, true),
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
    },
  });
}

