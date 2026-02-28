import type { Metadata } from "next";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import GalleryContent from "./GalleryContent";
import siteContent from "@/content/site-content.json";

const content = siteContent.galleryPage as { title: string; subheadline: string };

export const metadata: Metadata = {
  title: "The Sanctuary | The Caring Cove - Luxury Senior Care Karen Nairobi",
  description:
    "A tour of our boutique care facility. Private suites, sensory gardens, farm-to-table dining. Designed for intimacy, engineered for safety in Karen.",
  keywords: [
    "Luxury private senior suite Karen Nairobi",
    "Secure dementia garden Lavington elderly care",
    "Boutique senior dining room Kenya 1-on-1 care",
  ],
  alternates: { canonical: "https://thecaringcove.co.ke/gallery" },
};

export default function GalleryPage() {
  return (
    <PageLayout>
      <PageBanner
        title={content.title}
        breadcrumb="Gallery"
        subheadline={content.subheadline}
      />
      <GalleryContent />
    </PageLayout>
  );
}
