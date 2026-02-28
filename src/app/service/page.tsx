import type { Metadata } from "next";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import ServiceContent from "./ServiceContent";
import siteContent from "@/content/site-content.json";

const content = siteContent.servicesPage as { title: string; subheadline: string };

export const metadata: Metadata = {
  title: "Our Services | Memory Care, Palliative & Rehabilitation Karen",
  description:
    "Six pillars of care: Memory care, palliative, rehabilitation, skilled nursing, respite stays, wellness. UK CQC standards in a boutique Karen setting.",
  keywords: [
    "memory care Nairobi",
    "palliative care Karen",
    "geriatric rehabilitation Kenya",
    "respite care Nairobi",
    "skilled nursing Karen",
  ],
  alternates: { canonical: "https://thecaringcove.co.ke/service" },
};

export default function ServicePage() {
  return (
    <PageLayout>
      <PageBanner
        title={content.title}
        breadcrumb="Services"
        subheadline={content.subheadline}
      />
      <ServiceContent />
    </PageLayout>
  );
}
