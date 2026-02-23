import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import BlogSidebar from "@/components/sections/BlogSidebar";
import BlogDetailsContent from "./BlogDetailsContent";

export default function BlogDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <PageLayout>
      <PageBanner title="Our blog Details" breadcrumb="Blog Details" />
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BlogDetailsContent />
            </div>
            <BlogSidebar />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
