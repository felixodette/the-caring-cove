import type { Metadata } from "next";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import ContactContent from "./ContactContent";
import siteContent from "@/content/site-content.json";

const content = siteContent.contactPage as { title: string; subheadline: string };

export const metadata: Metadata = {
  title: "Contact Us | Book a Private Tour Karen Nairobi",
  description:
    "Request a private tour of our boutique memory care facility in Karen. We're here for care consultations and family support. Contact The Caring Cove.",
  keywords: ["contact memory care Nairobi", "book tour Karen", "care consultation Kenya"],
  alternates: { canonical: "https://thecaringcove.co.ke/contact" },
};

export default function ContactPage() {
  return (
    <PageLayout>
      <PageBanner
        title={content.title}
        breadcrumb="Contact Us"
        subheadline={content.subheadline}
      />
      <ContactContent />
    </PageLayout>
  );
}
