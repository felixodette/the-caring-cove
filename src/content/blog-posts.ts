export type BlogPost = {
  /**
   * Route param id (matches `src/app/blog-details/[id]`).
   * Kept as string because Next.js route params are strings.
   */
  id: string;
  title: string;
  description: string; // Used for meta description + OG description
  listExcerpt: string; // Used for blog cards
  heroImage: string;
  heroAlt: string;
  detailImage: string;
  detailAlt: string;
  author: string;
  publishedDate: string;
  commentsCount: number;
  tag: string;
  ogImage: string;
  lastModified: string; // ISO date string used by sitemap
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Maecenas Tempus Dellus Eget Condim",
    description:
      "Read elder care and dementia support insights from The Caring Cove's UK-trained team.",
    listExcerpt:
      "Actually choosing a strategy entails making decisions that explicitly cut off possibilities and options.",
    heroImage: "/images/blog-1.jpg",
    heroAlt: "Blog post 1",
    detailImage: "/images/blog-detail.jpg",
    detailAlt: "Blog details",
    author: "Admin",
    publishedDate: "25 May 2021",
    commentsCount: 22,
    tag: "It Solution",
    ogImage: "/images/blog-1.jpg",
    lastModified: "2026-03-20",
  },
  {
    id: "2",
    title: "Maecenas Tempus Dellus Eget Condim",
    description:
      "Practical guidance for families: dementia care, senior living, and day-to-day support in Nairobi.",
    listExcerpt:
      "Actually choosing a strategy entails making decisions that explicitly cut off possibilities and options.",
    heroImage: "/images/blog-2.jpg",
    heroAlt: "Blog post 2",
    detailImage: "/images/blog-detail.jpg",
    detailAlt: "Blog details",
    author: "Admin",
    publishedDate: "25 May 2021",
    commentsCount: 22,
    tag: "It Solution",
    ogImage: "/images/blog-2.jpg",
    lastModified: "2026-03-20",
  },
  {
    id: "3",
    title: "Maecenas Tempus Dellus Eget Condim",
    description:
      "Learn how UK-standard clinical excellence can translate into compassionate, 1:1 memory care.",
    listExcerpt:
      "Actually choosing a strategy entails making decisions that explicitly cut off possibilities and options.",
    heroImage: "/images/blog-3.jpg",
    heroAlt: "Blog post 3",
    detailImage: "/images/blog-detail.jpg",
    detailAlt: "Blog details",
    author: "Admin",
    publishedDate: "25 May 2021",
    commentsCount: 22,
    tag: "It Solution",
    ogImage: "/images/blog-3.jpg",
    lastModified: "2026-03-20",
  },
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((p) => p.id === id);
}

