import type { Metadata } from "next";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import AboutContent from "./AboutContent";
import siteContent from "@/content/site-content.json";

const content = siteContent.aboutPage as { title: string; subheadline: string };

export const metadata: Metadata = {
  title: "Our Story | The Caring Cove - UK-Trained Elder Care Nairobi",
  description:
    "Luxury senior living in Karen. Private dementia care Lavington. Boutique nursing home Kenya. Decades of Outstanding UK clinical experience in the heart of Nairobi.",
  keywords: [
    "UK trained elder care Nairobi",
    "Luxury senior living Karen",
    "Private dementia care Lavington",
    "Boutique nursing home Kenya",
  ],
  alternates: { canonical: "https://thecaringcove.co.ke/about" },
};

export default function AboutPage() {
  return (
    <PageLayout>
      <PageBanner
        title={content.title}
        breadcrumb="About Us"
        subheadline={content.subheadline}
      />
      <AboutContent />
    </PageLayout>
  );
}
