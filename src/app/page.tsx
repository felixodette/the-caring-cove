import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import TopBar from "@/components/sections/TopBar";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import FounderStory from "@/components/sections/FounderStory";
import Services from "@/components/sections/Services";
import ProfessionalSkills from "@/components/sections/ProfessionalSkills";
import Amenities from "@/components/sections/Amenities";
import TrustSignals from "@/components/sections/TrustSignals";
import CTABanner from "@/components/sections/CTABanner";
import Footer from "@/components/sections/Footer";
import PillarsOfCare from "@/components/sections/PillarsOfCare";

export const metadata: Metadata = {
  title: "Luxury Memory Care Karen Nairobi",
  description:
    "Kenya's most exclusive 1:1 memory care boutique. UK clinical standards, boutique living in Karen. Alzheimer's, dementia, palliative care. Book a private tour.",
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <Hero />
      <Features />
      <FounderStory />
      <PillarsOfCare />
      {/* <ProfessionalSkills /> */}
      {/* <Amenities />
      <TrustSignals /> */}
      <CTABanner />
      <Footer />
    </div>
  );
}
