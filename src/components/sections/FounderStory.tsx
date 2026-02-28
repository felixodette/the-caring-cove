"use client";

import { motion } from "framer-motion";
import siteContent from "@/content/site-content.json";

const founderStory = siteContent.homepage.founderStory;

const FounderStory = () => (
  <section id="about" className="py-20 bg-slate-50">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src="/images/about-img.jpg" alt="Founder" className="rounded-lg shadow-xl w-full object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">{founderStory.subtitle}</p>
          <h2 className="section-title">{founderStory.title}</h2>
          <p className="text-muted-foreground mb-2 italic">{founderStory.goal}</p>
          <blockquote className="text-foreground text-lg leading-relaxed mb-6 pl-6 border-l-4 border-primary">
            &ldquo;{founderStory.quote}&rdquo;
          </blockquote>
          <p className="text-primary font-semibold">— {founderStory.founderName}</p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default FounderStory;
