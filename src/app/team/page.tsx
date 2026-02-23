import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import CTABanner from "@/components/sections/CTABanner";
import TeamContent from "./TeamContent";

export default function TeamPage() {
  return (
    <PageLayout>
      <PageBanner title="Team" breadcrumb="Team" />
      <TeamContent />
      <CTABanner />
    </PageLayout>
  );
}
