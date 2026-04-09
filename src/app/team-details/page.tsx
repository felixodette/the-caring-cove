import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import CTABanner from "@/components/sections/CTABanner";
import TeamDetailsContent from "./TeamDetailsContent";

export const metadata: Metadata = {
  title: "Team Member | The Caring Cove",
  description:
    "Meet our care specialists. UK-trained professionals dedicated to 1:1 memory care and palliative excellence in Karen.",
  alternates: { canonical: `${SITE_URL}/team-details` },
};

export default function TeamDetailsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        id="breadcrumb-schema-team-details"
        items={[
          { name: "Home", item: SITE_URL },
          { name: "Team", item: `${SITE_URL}/team` },
          { name: "Team Member", item: `${SITE_URL}/team-details` },
        ]}
      />
      <PageLayout>
        <PageBanner title="Team Details" breadcrumb="Team Details" />
        <TeamDetailsContent />
        <CTABanner />
      </PageLayout>
    </>
  );
}
