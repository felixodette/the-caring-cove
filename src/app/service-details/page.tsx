import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import CTABanner from "@/components/sections/CTABanner";
import ServiceDetailsContent from "./ServiceDetailsContent";

export default function ServiceDetailsPage() {
  return (
    <PageLayout>
      <PageBanner title="Service Details" breadcrumb="Service Details" />
      <ServiceDetailsContent />
      <CTABanner />
    </PageLayout>
  );
}
