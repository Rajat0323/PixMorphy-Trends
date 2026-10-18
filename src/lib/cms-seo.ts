export type SeoInput = { title: string; slug: string; excerpt: string; content: string; seoTitle: string; metaDescription: string; keyword: string; canonical: string; featuredImageAlt: string; internalLinks: string; quality: Record<string, string> };
export type SeoFinding = { id: string; label: string; status: "pass" | "warning" | "fail" | "unknown"; why: string; location: string; fix: string; type: "documented recommendation" | "heuristic" | "technical check"; source?: string; field: string };

const HELPFUL = "https://developers.google.com/search/docs/fundamentals/creating-helpful-content";
const ESSENTIALS = "https://developers.google.com/search/docs/essentials";

export function evaluateSeo(v: SeoInput) {
  const plain = v.content.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").trim();
  const qualityChecks:SeoFinding[]=[
    ["problem","Personal problem or context","Describe the real problem you encountered."],
    ["method","Tool or method tested","Name the tool, method, or process you actually used."],
    ["steps","Reproducible steps","Record the steps you followed so another person can repeat them."],
    ["inputsOutputs","Actual inputs and outputs","Include real inputs and observed outputs where applicable."],
    ["comparison","Before and after comparison","Add a comparison when it helps explain the outcome; otherwise record why it is not relevant."],
    ["results","Measured results and limitations","Report only observed results and explain limitations."],
    ["evidence","Supporting evidence","Add a screenshot or other evidence where the article makes a test claim."],
    ["worked","What worked and what did not","Describe both useful outcomes and unsuccessful attempts."],
    ["reproduce","How readers can reproduce it","Explain what someone needs to reproduce your result."],
    ["verifiedAt","Experiment or verification date","Record when you ran the test or last verified the information."],
  ].map(([key,label,fix])=>({id:`quality-${key}`,label,status:"unknown",why:v.quality[key]?"You supplied this first-hand detail, but the editor cannot independently verify it.":"Add this only when the article makes a first-hand claim that needs this evidence; it is not required for every article.",location:`Experience checklist: ${label}`,fix,type:"heuristic",source:HELPFUL,field:"quality"} as SeoFinding));
  const checks: SeoFinding[] = [
    { id: "title", label: "Descriptive page title", status: (v.seoTitle || v.title).trim() ? "pass" : "fail", why: "A page title helps people and search engines understand the page.", location: "SEO title", fix: "Add an accurate, concise title describing this article.", type: "documented recommendation", source: ESSENTIALS, field: "seoTitle" },
    { id: "description", label: "Meta description", status: v.metaDescription.trim() ? "pass" : "warning", why: "Google may use the description to create a search result snippet; it is not a guaranteed ranking control.", location: "Meta description", fix: "Write a useful summary that accurately represents the page.", type: "documented recommendation", source: "https://developers.google.com/search/docs/appearance/snippet", field: "metaDescription" },
    { id: "slug", label: "Readable URL slug", status: /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v.slug) ? "pass" : "warning", why: "Readable URLs can help people understand a page address.", location: "URL slug", fix: "Use lowercase words separated by hyphens.", type: "documented recommendation", source: ESSENTIALS, field: "slug" },
    { id: "content", label: "Article content present", status: plain.length > 0 ? "pass" : "fail", why: "An article needs substantive content to review.", location: "Main content", fix: "Write the article in your own words before publishing.", type: "technical check", field: "content" },
    { id: "headings", label: "Heading structure", status: /<h[23][^>]*>/i.test(v.content) ? "pass" : "warning", why: "Descriptive section headings make long content easier to navigate.", location: "Main content headings", fix: "Add headings where they help readers understand sections.", type: "heuristic", source: HELPFUL, field: "content" },
    { id: "image-alt", label: "Featured image alt text", status: v.featuredImageAlt.trim() ? "pass" : "warning", why: "Alt text provides a text alternative for meaningful images.", location: "Featured image alt text", fix: "Describe the image accurately, or leave alt empty if decorative.", type: "documented recommendation", source: "https://developers.google.com/search/docs/appearance/google-images", field: "featuredImageAlt" },
    { id: "canonical", label: "Canonical URL", status: !v.canonical || /^https:\/\//.test(v.canonical) ? "pass" : "fail", why: "A malformed canonical URL can send conflicting canonicalization signals.", location: "Canonical URL", fix: "Use a complete HTTPS URL or leave this field blank for the default.", type: "technical check", source: "https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls", field: "canonical" },
    { id: "experience", label: "First-hand experience evidence", status: "unknown", why: "The editor cannot verify personal claims; supplied experience is shown for editorial review only.", location: "Experience checklist", fix: "Record only what you personally experienced or tested. Do not add claims you cannot support.", type: "heuristic", source: HELPFUL, field: "quality" },
    ...qualityChecks,
    { id: "internal-links", label: "Relevant internal links", status: v.internalLinks.trim() ? "pass" : "warning", why: "Useful links help readers discover related pages; there is no universal link quota.", location: "Internal links", fix: "Add relevant links where they help the reader, or leave empty if none fit.", type: "heuristic", source: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable", field: "internalLinks" },
    { id: "structured-data", label: "Article structured data", status: "unknown", why: "The editor cannot confirm that the published HTML contains valid structured data or is eligible for a rich result.", location: "Published page structured data", fix: "Validate the published URL with Google's Rich Results Test after publishing.", type: "technical check", source: "https://developers.google.com/search/docs/appearance/structured-data/article", field: "title" },
    { id: "mobile-performance", label: "Live mobile usability and performance", status: "unknown", why: "No live browser or PageSpeed data is available inside the editor.", location: "Published page", fix: "Check the published page on a phone and use PageSpeed Insights for field or lab diagnostics.", type: "technical check", source: "https://developers.google.com/search/docs/appearance/page-experience", field: "slug" },
    { id: "intent", label: "Search intent and usefulness", status: "unknown", why: "This editorial judgment cannot be validated from fields alone.", location: "Article", fix: "Check that the article directly solves the reader's stated problem and adds useful detail.", type: "heuristic", source: HELPFUL, field: "content" },
    { id: "crawl", label: "Live crawlability and indexing", status: "unknown", why: "The draft is not fetched by an external crawler from this editor.", location: "Published page", fix: "After publishing, verify the live URL and inspect it in Search Console.", type: "technical check", source: ESSENTIALS, field: "slug" },
  ];
  const scored = checks.filter((c) => c.status !== "unknown");
  const passed = scored.filter((c) => c.status === "pass").length;
  return { score: scored.length ? Math.round(passed / scored.length * 100) : 0, checks, formula: "Passes ÷ evaluated checks × 100. Unknown checks are excluded. This editorial diagnostic is not a ranking prediction or guarantee." };
}
