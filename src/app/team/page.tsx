import type { Metadata } from "next";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import CTABanner from "@/components/sections/CTABanner";
import TeamContent from "./TeamContent";

export const metadata: Metadata = {
  title: "Our Team | UK-Trained Care Specialists Karen Nairobi",
  description:
    "Meet the dedicated care team at The Caring Cove. UK CQC-trained specialists in memory care, palliative, and geriatric nursing.",
  alternates: { canonical: "https://thecaringcove.co.ke/team" },
};

export default function TeamPage() {
  return (
    <PageLayout>
      <PageBanner title="Team" breadcrumb="Team" />
      <TeamContent />
      <CTABanner />
    </PageLayout>
  );
}
