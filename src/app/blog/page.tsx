import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import BlogSidebar from "@/components/sections/BlogSidebar";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog | Elder Care Insights & Memory Care Tips",
  description:
    "Articles on dementia care, senior living, and family support. Insights from The Caring Cove's UK-trained team in Karen, Nairobi.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        id="breadcrumb-schema-blog"
        items={[
          { name: "Home", item: SITE_URL },
          { name: "Blog", item: `${SITE_URL}/blog` },
        ]}
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
