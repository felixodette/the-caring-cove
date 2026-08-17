import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import PageLayout from "@/layouts/PageLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery | The Caring Cove",
  description: "View photos of The Caring Cove in Karen, Nairobi.",
  alternates: { canonical: `${SITE_URL}/gallery` },
};

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        id="breadcrumb-schema-gallery"
        items={[
          { name: "Home", item: SITE_URL },
          { name: "Gallery", item: `${SITE_URL}/gallery` },
        ]}
      />
      <PageLayout>
        <GalleryContent />
      </PageLayout>
    </>
  );
}
