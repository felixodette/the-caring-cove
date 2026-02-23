import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import CTABanner from "@/components/sections/CTABanner";
import WorkProcess from "@/components/sections/WorkProcess";
import ServiceContent from "./ServiceContent";

export default function ServicePage() {
  return (
    <PageLayout>
      <PageBanner title="Our Services" breadcrumb="Services" />
      <ServiceContent />
      <WorkProcess />
      <CTABanner />
    </PageLayout>
  );
}
