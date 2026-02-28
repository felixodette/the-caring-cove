import type { Metadata } from "next";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import CTABanner from "@/components/sections/CTABanner";
import ServiceDetailsContent from "./ServiceDetailsContent";

export const metadata: Metadata = {
  title: "Service Details | The Caring Cove",
  description:
    "Detailed information about our memory care, palliative, and rehabilitation services. UK-standard boutique care in Karen.",
  alternates: { canonical: "https://thecaringcove.co.ke/service-details" },
};

export default function ServiceDetailsPage() {
  return (
    <PageLayout>
      <PageBanner title="Service Details" breadcrumb="Service Details" />
      <ServiceDetailsContent />
      <CTABanner />
    </PageLayout>
  );
}
