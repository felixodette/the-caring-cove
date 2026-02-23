import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import CTABanner from "@/components/sections/CTABanner";
import TeamDetailsContent from "./TeamDetailsContent";

export default function TeamDetailsPage() {
  return (
    <PageLayout>
      <PageBanner title="Team Details" breadcrumb="Team Details" />
      <TeamDetailsContent />
      <CTABanner />
    </PageLayout>
  );
}
