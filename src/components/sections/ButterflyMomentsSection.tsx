"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteContent from "@/content/site-content.json";
import { AnimatedButterfly } from "@/components/ui/AnimatedButterfly";

const content = (siteContent.aboutPage as { butterflyMoments: { title: string; tagline: string; features: Array<{ title: string; description: string }>; attribution: string } }).butterflyMoments;

const ButterflyMomentsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isButterflyFlapping, setIsButterflyFlapping] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Contrast-first overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.35)_0%,rgba(2,6,23,0.92)_70%)]" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.35) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(59,130,246,0.35) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Controlled glow orbs (kept subtle for readability) */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary font-semibold text-sm mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Engagement
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {content.title}
          </h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto text-lg drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
            {content.tagline}
          </p>
        </motion.div>

        {/* Center butterfly + orbiting feature cards */}
        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            {/* Left pair */}
            <div className="flex flex-col sm:flex-row gap-6 order-2 lg:order-1 lg:flex-1 justify-center">
              {content.features.slice(0, 2).map((feature, i) => (
                <FeatureCard
                  key={i}
                  feature={feature}
                  index={i}
                  isActive={activeIndex === i}
                  onActivate={() => { setActiveIndex(i); setIsButterflyFlapping(true); }}
                  onDeactivate={() => { setActiveIndex(null); setIsButterflyFlapping(false); }}
                  onHover={() => setIsButterflyFlapping(true)}
                  onLeave={() => activeIndex === null && setIsButterflyFlapping(false)}
                />
              ))}
            </div>

            {/* Center butterfly */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="order-1 lg:order-2 flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-150" />
                <div className="relative p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                  <AnimatedButterfly size={140} isFlapping={isButterflyFlapping} />
                </div>
                <p className="text-center text-primary-foreground/70 text-xs mt-2 font-medium">
                  Hover to see it fly
                </p>
              </div>
            </motion.div>

            {/* Right pair */}
            <div className="flex flex-col sm:flex-row gap-6 order-3 lg:flex-1 justify-center">
              {content.features.slice(2, 4).map((feature, i) => (
                <FeatureCard
                  key={i}
                  feature={feature}
                  index={i + 2}
                  isActive={activeIndex === i + 2}
                  onActivate={() => { setActiveIndex(i + 2); setIsButterflyFlapping(true); }}
                  onDeactivate={() => { setActiveIndex(null); setIsButterflyFlapping(false); }}
                  onHover={() => setIsButterflyFlapping(true)}
                  onLeave={() => activeIndex === null && setIsButterflyFlapping(false)}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-primary-foreground/50 text-sm mt-12 italic">
          {content.attribution}
        </p>
      </div>
    </section>
  );
};

function FeatureCard({
  feature,
  index,
  isActive,
  onActivate,
  onDeactivate,
  onHover,
  onLeave,
}: {
  feature: { title: string; description: string };
  index: number;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => (isActive ? onDeactivate() : onActivate())}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative w-full min-w-[200px] max-w-[260px] rounded-2xl p-6 text-left transition-all duration-300 border backdrop-blur-sm ${
        isActive
          ? "bg-white/95 border-primary shadow-2xl shadow-primary/20 scale-[1.03]"
          : "bg-slate-950/35 border-white/18 hover:bg-slate-950/55 hover:border-primary/40 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
      }`}
    >
      {isActive && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
      )}
      <h3 className={`font-bold text-lg mb-2 relative z-10 ${isActive ? "text-primary" : "text-white"}`}>
        {feature.title}
      </h3>
      <AnimatePresence>
        {isActive && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="text-muted-foreground text-sm leading-relaxed overflow-hidden relative z-10"
          >
            {feature.description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default ButterflyMomentsSection;
