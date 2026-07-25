import { careerPosts } from "./career-posts";
import type { Category, NavItem, Post } from "./types";

export type { Category, Faq, Post } from "./types";
export { careerPosts } from "./career-posts";

export const siteConfig = {
  name: "PixMorphy",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.pixmorphy.in",
  description:
    "भारतीय B.Tech और ग्रेजुएशन छात्रों के लिए करियर, नौकरी, AI और वास्तविक अनुभव पर हिंदी ब्लॉग — कोई शॉर्टकट नहीं, लंबी यात्रा, सही मार्गदर्शन।",
  homepageTitle:
    "भारतीय छात्रों के लिए करियर और AI मार्गदर्शन — वास्तविक अनुभव, हिंदी में",
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
  contactEmail: "vivgup64@gmail.com",
  partnershipsEmail: "vivgup64@gmail.com",
  telegramBotUsername: process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? "pixmorphy1_bot",
  socialLinks: [
    "https://github.com/Rajat0323/PixMorphy-Trends",
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
      name: "AI Salary Journey",
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
  PixMorphy: {
    role: "GenAI Engineer · करियर लेखक",
    bio: "Electronics & Communication (ECE) से core job, automation engineer, aur ab GenAI engineer — 2022 se 2026 tak ki real salary aur career journey yahan share hoti hai. Sarkari exam prep, 4 saal gap, aur IT entry — sab khud jhela hai.",
    jobTitle: "GenAI Engineer",
    credentials: "B.Tech ECE · Core Electronics → Automation → GenAI",
    knowsAbout: [
      "AI Engineering",
      "Career Transition India",
      "B.Tech Fresher Jobs",
      "Government Exam to IT",
      "Salary Negotiation",
    ],
    experienceNote:
      "Ye blog personal experience par based hai — official survey ya HR report nahi.",
  },
};

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slugs: string[]) {
  return posts.filter((post) => slugs.includes(post.slug));
}
