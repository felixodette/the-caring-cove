import type { Metadata } from "next";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import BlogSidebar from "@/components/sections/BlogSidebar";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog | Elder Care Insights & Memory Care Tips",
  description:
    "Articles on dementia care, senior living, and family support. Insights from The Caring Cove's UK-trained team in Karen, Nairobi.",
  alternates: { canonical: "https://thecaringcove.co.ke/blog" },
};

export default function BlogPage() {
  return (
    <PageLayout>
      <PageBanner title="Our blog post" breadcrumb="Blog Post" />
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
  );
}
