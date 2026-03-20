"use client";

import { motion } from "framer-motion";
import siteContent from "@/content/site-content.json";

const content = (siteContent.aboutPage as { culture: { title: string; subtitle: string; copy: string; attribution: string } }).culture;

const CultureSection = () => (
  <section className="py-24 relative overflow-hidden bg-gradient-to-r from-amber-950/30 via-slate-900 to-amber-950/30">
    {/* Golden thread SVG - animated flowing line */}
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full opacity-20" viewBox="0 0 1600 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id="goldenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
            <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
          <filter id="threadGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M 0 200 Q 200 150 400 200 T 800 200 T 1200 200 T 1600 200"
          fill="none"
          stroke="url(#goldenGradient)"
          strokeWidth="2"
          strokeDasharray="20 10"
          filter="url(#threadGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M 0 250 Q 200 200 400 250 T 800 250 T 1200 250 T 1600 250"
          fill="none"
          stroke="url(#goldenGradient)"
          strokeWidth="1"
          strokeDasharray="8 12"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>
    </div>

    {/* Animated particles */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-amber-400/40"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>

    <div className="container mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center"
          >
            <span className="text-2xl">✦</span>
          </motion.div>
        </div>
        <p className="text-amber-400 font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-center">
          {content.subtitle}
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center tracking-tight">
          {content.title}
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-primary-foreground/90 leading-relaxed text-center mb-10 text-lg"
        >
          {content.copy}
        </motion.p>
        <p className="text-amber-400/80 text-sm italic text-right font-medium">
          — {content.attribution}
        </p>
      </motion.div>
    </div>
  </section>
);

export default CultureSection;
