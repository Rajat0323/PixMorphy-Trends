import sanitizeHtml from "sanitize-html";
import { isPinterestPinPage } from "@/lib/cms-image";

const allowedTags = [
  "p", "br", "h1", "h2", "h3", "strong", "b", "em", "i", "u",
  "ul", "ol", "li", "blockquote", "table", "thead", "tbody", "tr",
  "th", "td", "a", "img", "figure", "figcaption", "hr",
];

/** Keep CMS markup safe and preserve a single page-level H1 for the article title. */
export function sanitizeCmsContent(value: unknown) {
  const safe = sanitizeHtml(String(value ?? "").slice(0, 500_000), {
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
    exclusiveFilter: (frame) => frame.tag === "img" && isPinterestPinPage(frame.attribs.src ?? ""),
  });

  return safe
    .replace(/<figure>\s*(?:<figcaption>\s*<\/figcaption>)?\s*<\/figure>/gi, "")
    .replace(/<(h[23])>\s*<p>\s*([\s\S]*?)\s*<\/p>\s*<\/\1>/gi, "<$1>$2</$1>")
    .replace(/<h([23])>\s*(<figure\b[\s\S]*?<\/figure>)\s*([\s\S]*?)\s*<\/h\1>/gi, (_match, level: string, figure: string, text: string) => `${figure}${text.trim() ? `<h${level}>${text}</h${level}>` : ""}`)
    .replace(/<h([23])>([\s\S]*?)<\/h\1>/gi, (_match, level: string, text: string) => `<h${level}>${text.replace(/(?:<br\s*\/?\s*>)+/gi, " ").trim()}</h${level}>`);
}

