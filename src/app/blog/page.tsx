import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import BlogSidebar from "@/components/sections/BlogSidebar";
import BlogContent from "./BlogContent";

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
