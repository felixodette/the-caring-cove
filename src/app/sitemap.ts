import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

/** Holding release: only core approved routes. Blog/team return 404 until later phases. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/service/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/gallery/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/faq/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact/`, changeFrequency: "monthly", priority: 0.9 },
  ];
}
