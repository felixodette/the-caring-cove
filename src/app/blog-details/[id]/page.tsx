import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import BlogSidebar from "@/components/sections/BlogSidebar";
import BlogDetailsContent from "./BlogDetailsContent";
import { SITE_URL } from "@/lib/constants";
import { blogPosts, getBlogPostById } from "@/content/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPostById(id);

  const canonical = `${SITE_URL}/blog-details/${id}`;

  if (!post) {
    return {
      title: "Blog Details | Elder Care Insights",
      description:
        "Read insights on dementia care, senior living, and family support from The Caring Cove.",
      alternates: { canonical },
    };
  }

  return {
    title: `${post.title} | Elder Care Insights`,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.ogImage }],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: [{ url: post.ogImage }],
      card: "summary_large_image",
    },
  };
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <PageLayout>
      <PageBanner title={post.title} breadcrumb="Blog Details" subheadline={post.listExcerpt} />
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BlogDetailsContent post={post} />
            </div>
            <BlogSidebar />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
