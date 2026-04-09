import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import ContactContent from "./ContactContent";
import siteContent from "@/content/site-content.json";

const content = siteContent.contactPage as { title: string; subheadline: string };

export const metadata: Metadata = {
  title: "Contact Us | Book a Private Tour Karen Nairobi",
  description:
    "Request a private tour of our boutique memory care facility in Karen. We're here for care consultations and family support. Contact The Caring Cove.",
  keywords: ["contact memory care Nairobi", "book tour Karen", "care consultation Kenya"],
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        id="breadcrumb-schema-contact"
        items={[
          { name: "Home", item: SITE_URL },
          { name: "Contact", item: `${SITE_URL}/contact` },
        ]}
      />
      <PageLayout>
        <PageBanner
          title={content.title}
          breadcrumb="Contact Us"
          subheadline={content.subheadline}
        />
        <ContactContent />
      </PageLayout>
    </>
  );
}
