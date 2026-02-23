import { ReactNode } from "react";
import TopBar from "@/components/sections/TopBar";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const PageLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen">
    <TopBar />
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default PageLayout;
