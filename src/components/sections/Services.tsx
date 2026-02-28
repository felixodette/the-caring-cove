"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import siteContent from "@/content/site-content.json";

const servicesContent = siteContent.homepage.services;

const Services = () => (
  <section id="services" className="py-20 bg-white">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="section-subtitle">{servicesContent.subtitle}</p>
        <h2 className="section-title">{servicesContent.title}</h2>
        <p className="section-desc max-w-2xl mx-auto">
          {servicesContent.goal}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesContent.items.map((item, i) => {
          const Icon = getIcon(item.icon);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-all group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <h4 className="text-base font-semibold text-primary mb-3">{item.headline}</h4>
              <p className="text-muted-foreground text-sm mb-4">
                {item.description}
              </p>
              <div className="pt-3 border-t border-border">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary/90 mb-1">
                  The 1:1 Edge
                </span>
                <p className="text-foreground text-sm font-medium">
                  {item.oneToOneEdge}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Services;
