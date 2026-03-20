"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteContent from "@/content/site-content.json";

const content = (siteContent.aboutPage as { goldenThread: { title: string; steps: Array<{ header: string; points: string[] }> } }).goldenThread;

const GoldenThreadSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-950">
      {/* Flowing connection lines background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1600 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0 50 Q 200 50 400 80 T 800 50 T 1200 80 T 1600 50"
            fill="none"
            stroke="url(#flowGradient)"
            strokeWidth="1"
            strokeDasharray="12 8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Our Approach
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto tracking-tight">
            {content.title}
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-2 items-stretch">
            {content.steps.map((step, i) => {
              const isExpanded = expandedIndex === i;
              const isLast = i === content.steps.length - 1;
              return (
                <div key={i} className="flex flex-col lg:flex-row items-center flex-1">
                  <motion.button
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    className={`w-full lg:flex-1 rounded-2xl overflow-hidden text-left transition-all duration-300 border-2 group ${
                      isExpanded
                        ? "border-primary bg-gradient-to-br from-primary/20 to-primary/5 shadow-2xl shadow-primary/20"
                        : "border-white/10 bg-white/5 hover:border-primary/40 hover:bg-white/10"
                    }`}
                  >
                    {/* Glowing orb indicator */}
                    <div className="p-6 relative">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <motion.div
                            animate={{
                              scale: isExpanded ? 1.2 : 1,
                              boxShadow: isExpanded ? "0 0 30px rgba(59,130,246,0.5)" : "0 0 0px transparent",
                            }}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                              isExpanded ? "bg-primary" : "bg-white/10 group-hover:bg-primary/30"
                            }`}
                          >
                            <span className="text-white font-bold">{i + 1}</span>
                          </motion.div>
                          <h3 className="text-lg font-bold text-white">
                            {step.header}
                          </h3>
                        </div>
                        <motion.span
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          className="text-primary-foreground/60 shrink-0"
                        >
                          →
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3 overflow-hidden"
                          >
                            {step.points.map((point, j) => (
                              <motion.li
                                key={j}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.05 }}
                                className="flex items-start gap-3 text-primary-foreground/90 text-sm"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                {point}
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>
                  {!isLast && (
                    <div className="hidden lg:flex items-center justify-center px-2 py-4 flex-shrink-0">
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex flex-col gap-1"
                      >
                        <div className="w-8 h-0.5 bg-primary/60 rounded" />
                        <div className="w-8 h-0.5 bg-primary/40 rounded ml-2" />
                        <div className="w-8 h-0.5 bg-primary/60 rounded" />
                      </motion.div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldenThreadSection;
