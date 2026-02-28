"use client";

import { motion } from "framer-motion";
import siteContent from "@/content/site-content.json";

const hero = siteContent.homepage.hero;

const Hero = () => (
  <section
    className="relative min-h-[600px] flex items-center bg-cover bg-center"
    style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
  >
    <div className="absolute inset-0 bg-navy/60" />
    <div className="container mx-auto relative z-10 py-24">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-primary font-semibold text-lg mb-4"
      >
        {hero.tagline}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6 max-w-2xl"
      >
        {hero.headline}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-primary-foreground/70 text-lg max-w-xl mb-8"
      >
        {hero.subheadline}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap gap-4"
      >
        <a href={hero.cta.primary.href} className="bg-primary text-primary-foreground px-8 py-3 rounded font-semibold hover:bg-primary/90 transition-colors">
          {hero.cta.primary.label}
        </a>
        <a href={hero.cta.secondary.href} className="border-2 border-primary-foreground/40 text-primary-foreground px-8 py-3 rounded font-semibold hover:bg-primary-foreground/10 transition-colors">
          {hero.cta.secondary.label}
        </a>
      </motion.div>
    </div>
  </section>
);

export default Hero;
