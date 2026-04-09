import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import CTABanner from "@/components/sections/CTABanner";
import ServiceDetailsContent from "./ServiceDetailsContent";

export const metadata: Metadata = {
  title: "Service Details | The Caring Cove",
  description:
    "Detailed information about our memory care, palliative, and rehabilitation services. UK-standard boutique care in Karen.",
  alternates: { canonical: `${SITE_URL}/service-details` },
};

export default function ServiceDetailsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        id="breadcrumb-schema-service-details"
        items={[
          { name: "Home", item: SITE_URL },
          { name: "Services", item: `${SITE_URL}/service` },
          { name: "Service Details", item: `${SITE_URL}/service-details` },
        ]}
      />
      <PageLayout>
        <PageBanner title="Service Details" breadcrumb="Service Details" />
        <ServiceDetailsContent />
        <CTABanner />
      </PageLayout>
    </>
  );
}
