export type Category = {
  name: string;
  href: string;
};

export type NavItem = {
  id: "home" | "blog" | "query" | "contact";
  href: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type LayoutVariant = "timeline" | "journey" | "playbook" | "roadmap" | "course";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  author: string;
  layoutVariant: LayoutVariant;
  experienceNote?: string;
  imageSrc: string;
  imageObjectPosition?: string;
  heroAccent: string;
  featuredLabel: string;
  imageAlt: string;
  galleryImages?: {
    src: string;
    alt: string;
  }[];
  keywords: string[];
  faq: Faq[];
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    table?: {
      caption?: string;
      headers: string[];
      rows: string[][];
    };
    image?: {
      src: string;
      alt: string;
    };
    actionItems?: string[];
  }[];
  relatedSlugs: string[];
  internalLinks?: {
    label: string;
    href: string;
  }[];
};
