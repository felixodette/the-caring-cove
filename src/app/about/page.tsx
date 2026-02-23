import PageLayout from "@/layouts/PageLayout";
import PageBanner from "@/components/sections/PageBanner";
import CTABanner from "@/components/sections/CTABanner";
import FAQ from "@/components/sections/FAQ";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import Skills from "@/components/sections/Skills";
import Blog from "@/components/sections/Blog";
import Stats from "@/components/sections/Stats";
import AboutContent from "./AboutContent";

export default function AboutPage() {
  return (
    <PageLayout>
      <PageBanner title="About Us" breadcrumb="About Us" />
      <AboutContent />
      <Stats />
      <FAQ />
      <Team />
      <Testimonials />
      <Skills />
      <Blog />
      <CTABanner />
    </PageLayout>
  );
}
