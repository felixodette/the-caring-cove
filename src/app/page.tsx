import TopBar from "@/components/sections/TopBar";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import WorkProcess from "@/components/sections/WorkProcess";
import FAQ from "@/components/sections/FAQ";
import Stats from "@/components/sections/Stats";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Team from "@/components/sections/Team";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/sections/Footer";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Services />
      <Skills />
      <WorkProcess />
      <FAQ />
      <Stats />
      <Pricing />
      <Testimonials />
      <Team />
      <Blog />
      <CTABanner />
      <Footer />
    </div>
  );
}
