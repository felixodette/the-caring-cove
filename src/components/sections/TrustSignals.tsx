"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import siteContent from "@/content/site-content.json";

const trustSignals = siteContent.homepage.trustSignals;

const TrustSignals = () => (
  <section className="py-20 bg-[hsl(222,47%,11%)]">
    <div className="container mx-auto">
      <div className="text-center mb-14">
        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
          {trustSignals.subtitle}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {trustSignals.title}
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          {trustSignals.goal}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {trustSignals.items.map((item, i) => {
          const Icon = getIcon(item.icon);
          const badgeText = "badgeText" in item ? (item as { badgeText?: string }).badgeText : undefined;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white/95 backdrop-blur rounded-xl p-8 border border-white/10 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.3)] transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {item.description}
              </p>
              {badgeText && (
                <div className="mt-6 pt-6 border-t border-border">
                  <span className="inline-block px-4 py-2 rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                    {badgeText}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TrustSignals;
