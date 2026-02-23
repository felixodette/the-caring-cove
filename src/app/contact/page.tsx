import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import CTABanner from "@/components/sections/CTABanner";
import ContactContent from "./ContactContent";

export default function ContactPage() {
  return (
    <PageLayout>
      <PageBanner title="Contact" breadcrumb="Contact" />
      <ContactContent />
      <CTABanner />
    </PageLayout>
  );
}
