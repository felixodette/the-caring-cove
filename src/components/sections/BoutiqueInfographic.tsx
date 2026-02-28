"use client";

import { useState } from "react";
import { ShieldCheck, Users, Utensils, HeartPulse, Home } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Care Ratio",
    icon: Users,
    standard: "1:12 Resident to Staff",
    cove: "1:1 Dedicated Companion",
    description:
      "In large homes, residents wait for help. At The Cove, your loved one has a dedicated shadow for safety and engagement.",
  },
  {
    title: "Clinical Monitoring",
    icon: HeartPulse,
    standard: "Paper-based / Weekly reviews",
    cove: "Real-time Digital (UK Standard)",
    description:
      "We use international digital care systems to track vitals, mood, and meds every hour—not every week.",
  },
  {
    title: "Dining Experience",
    icon: Utensils,
    standard: "Set 'Canteen' Menus",
    cove: "Chef-Prepared & Bespoke",
    description:
      "Our organic Karen-sourced meals are tailored to specific geriatric nutritional needs and personal preferences.",
  },
  {
    title: "Environment",
    icon: Home,
    standard: "Institutional / Ward-style",
    cove: "Private Luxury Residence",
    description:
      "We eliminate the 'hospital' feel. This is a sun-drenched home with only 4 exclusive suites.",
  },
];

const BoutiqueInfographic = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeFeature = features[activeTab];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Why Boutique Care Wins
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare the standard institutional model against our high-touch, 1:1
          clinical approach.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch bg-white rounded-3xl p-8 shadow-xl border border-border">
        {/* Left Side: Navigation */}
        <div className="space-y-3">
          {features.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === index;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 text-left ${
                  isActive
                    ? "bg-primary/10 border-l-4 border-primary shadow-sm"
                    : "hover:bg-muted/50 border-l-4 border-transparent"
                }`}
              >
                <div
                  className={`mr-4 shrink-0 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`font-semibold ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Comparison Display */}
        <div className="bg-muted/30 rounded-2xl p-6 min-h-[280px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {activeFeature.title}
                </h3>
                <p className="text-muted-foreground italic text-sm">
                  {activeFeature.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-border">
                  <span className="text-xs font-bold uppercase text-muted-foreground block mb-1">
                    Standard Facilities
                  </span>
                  <span className="text-foreground">{activeFeature.standard}</span>
                </div>

                <div className="bg-primary p-4 rounded-lg shadow-md">
                  <span className="text-xs font-bold uppercase text-primary-foreground/80 block mb-1">
                    The Caring Cove
                  </span>
                  <span className="text-primary-foreground font-bold text-lg flex items-center">
                    <ShieldCheck className="w-5 h-5 mr-2 shrink-0" />
                    {activeFeature.cove}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-4 italic">
          *Clinical protocols modeled after &quot;Outstanding&quot; UK care
          standards.
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg"
        >
          Book a Private Tour
        </Link>
      </div>
    </div>
  );
};

export default BoutiqueInfographic;
