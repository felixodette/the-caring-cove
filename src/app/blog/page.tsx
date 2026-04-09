import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import BlogSidebar from "@/components/sections/BlogSidebar";
import BlogContent from "./BlogContent";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Blog | Elder Care Insights & Memory Care Tips",
  description:
    "Articles on dementia care, senior living, and family support. Insights from The Caring Cove's UK-trained team in Karen, Nairobi.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${SITE_URL}/blog`,
    },
  ],
};

export default function BlogPage() {
  return (
    <>
      <Script
        id="breadcrumb-schema-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />
      <PageLayout>
        <PageBanner title="Blog" breadcrumb="Blog" />
        <section className="py-20 bg-background">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <BlogContent />
              </div>
              <BlogSidebar />
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
