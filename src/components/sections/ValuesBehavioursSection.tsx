"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteContent from "@/content/site-content.json";

const content = (siteContent.aboutPage as { valuesBehaviours: { title: string; values: Array<{ title: string; description: string }>; attribution: string } }).valuesBehaviours;

const SEGMENT_ANGLES = [0, 120, 240]; // degrees for 3 segments

const ValuesBehavioursSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)`,
      }} />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Our Foundation
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            {content.title}
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Interactive circular diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80 }}
            className="relative flex-shrink-0 w-72 h-72 md:w-80 md:h-80"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <linearGradient id="seg1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="seg2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
                <linearGradient id="seg3" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6d28d9" />
                </linearGradient>
                <filter id="segmentGlow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Outer ring */}
              <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
              <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="0.5" />
              {/* Segments */}
              {[0, 1, 2].map((i) => {
                const isActive = activeIndex === i;
                const startAngle = SEGMENT_ANGLES[i];
                const endAngle = SEGMENT_ANGLES[i] + 120;
                const largeArc = 1;
                const x1 = 100 + 85 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 100 + 85 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 100 + 85 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 100 + 85 * Math.sin((endAngle * Math.PI) / 180);
                const pathD = `M 100 100 L ${x1} ${y1} A 85 85 0 ${largeArc} 1 ${x2} ${y2} Z`;
                const gradients = ["url(#seg1)", "url(#seg2)", "url(#seg3)"];
                return (
                  <motion.path
                    key={i}
                    d={pathD}
                    fill={gradients[i]}
                    filter="url(#segmentGlow)"
                    initial={{ opacity: 0.8 }}
                    animate={{
                      opacity: isActive ? 1 : 0.85,
                      scale: isActive ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: "100px 100px" }}
                    className="cursor-pointer"
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  />
                );
              })}
              {/* Center circle */}
              <circle cx="100" cy="100" r="25" fill="rgba(15,23,42,0.9)" stroke="rgba(59,130,246,0.5)" strokeWidth="2" />
              <text x="100" y="106" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">CORE</text>
            </svg>
          </motion.div>

          {/* Content cards */}
          <div className="flex-1 space-y-4">
            {content.values.map((value, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveIndex(isActive ? null : i)}
                  className={`w-full text-left rounded-xl p-6 transition-all duration-300 border backdrop-blur-sm ${
                    isActive
                      ? "bg-primary/20 border-primary shadow-lg shadow-primary/20"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                      isActive ? "bg-primary text-white" : "bg-white/10 text-primary-foreground"
                    }`}>
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-white">{value.title}</h3>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 text-primary-foreground/80 text-sm leading-relaxed overflow-hidden pl-14"
                      >
                        {value.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>

        <p className="text-center text-primary-foreground/50 text-sm mt-12 italic">
          {content.attribution}
        </p>
      </div>
    </section>
  );
};

export default ValuesBehavioursSection;
