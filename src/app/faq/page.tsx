import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FAQContent from "./FAQContent";
import siteContent from "@/content/site-content.json";
import Script from "next/script";

const content = siteContent.faqPage as {
  title: string;
  subheadline: string;
  sections: Array<{
    id: string;
    tag: string;
    subtag: string;
    questions: Array<{ q: string; a: string }>;
  }>;
};

// Build FAQ Schema for all questions
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: content.sections.flatMap((s) =>
    s.questions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.a,
      },
    }))
  ),
};

export const metadata: Metadata = {
  title: "FAQ | The Caring Cove - Dementia Care Karen Nairobi",
  description:
    "FAQ for families. UK-standard clinical care, Diaspora updates, boutique lifestyle, admissions. Dementia care Karen, Lavington.",
  keywords: [
    "Dementia care Karen",
    "Elderly care Nairobi FAQ",
    "UK standard care Kenya",
  ],
  alternates: { canonical: `${SITE_URL}/faq` },
};

export default function FAQPage() {
  return (
    <>
      <BreadcrumbJsonLd
        id="breadcrumb-schema-faq"
        items={[
          { name: "Home", item: SITE_URL },
          { name: "FAQ", item: `${SITE_URL}/faq` },
        ]}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />
      <PageLayout>
        <PageBanner
          title={content.title}
          breadcrumb="FAQ"
          subheadline={content.subheadline}
        />
        <FAQContent />
      </PageLayout>
    </>
  );
}
