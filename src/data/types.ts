export type Category = {
  name: string;
  href: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  author: string;
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
  }[];
  relatedSlugs: string[];
};
