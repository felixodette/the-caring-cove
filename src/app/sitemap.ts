import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { blogPosts } from "@/content/blog-posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const basePages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/service`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/service-details`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/team-details`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const blogPostUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog-details/${post.id}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...basePages, ...blogPostUrls];
}
