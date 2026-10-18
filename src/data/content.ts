import { careerPosts } from "./career-posts";
import type { Category, NavItem, Post } from "./types";

export type { Category, Faq, Post } from "./types";
export { careerPosts } from "./career-posts";

export const siteConfig = {
  name: "PixMorphy",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.pixmorphy.in",
  description:
    "भारतीय छात्रों और शुरुआती पेशेवरों के लिए करियर, तकनीक और AI पर व्यावहारिक हिंदी मार्गदर्शन।",
  homepageTitle:
    "भारतीय छात्रों के लिए करियर और AI मार्गदर्शन — हिंदी में",
  homepageKeywords: [
    "career guidance hindi",
    "indian students career",
    "btech career india",
    "ai career hindi",
    "naukri tips hindi",
    "graduation career guide",
    "करियर मार्गदर्शन हिंदी",
    "B.Tech करियर",
    "भारतीय छात्र करियर",
    "AI engineer salary india",
  ],
  contactEmail: "",
  partnershipsEmail: "",
  telegramBotUsername: process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "pixmorphy1_bot",
  socialLinks: [
    "https://x.com/pixmorphy",
    "https://www.instagram.com/pixmorphy",
  ],
  nav: [
    { id: "home", href: "/" },
    { id: "blog", href: "/blog" },
    { id: "query", href: "/#query" },
    { id: "contact", href: "/contact" },
  ] satisfies NavItem[],
  categories: [
    { name: "सभी ब्लॉग", href: "/blog" },
    { name: "करियर गाइड", href: "/category/career" },
    {
      name: "सरकारी से IT",
      href: "/blog/sarkari-naukri-chhod-it-job-kaise-paye-2026-hindi",
    },
    {
      name: "AI Salary Research Guide",
      href: "/blog/ai-engineer-salary-india-2026-real-journey",
    },
  ] satisfies Category[],
};

export const posts: Post[] = [...careerPosts];

export const featuredPosts = [...posts]
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
  .slice(0, 3);

export const authors = {
  "PixMorphy Editorial Team": {
    role: "PixMorphy Editorial Team",
    bio: "PixMorphy publishes practical guides on careers, software, automation, and AI. Articles are reviewed for accuracy, privacy, and clear sourcing.",
    jobTitle: "Editorial team",
    knowsAbout: [
      "AI Engineering",
      "Career Transition India",
      "B.Tech Fresher Jobs",
      "Government Exam to IT",
      "Career Planning",
    ],
  },
};

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slugs: string[]) {
  return posts.filter((post) => slugs.includes(post.slug));
}
