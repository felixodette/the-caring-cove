"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import siteContent from "@/content/site-content.json";

const coveDifference = siteContent.homepage.coveDifference;

const Features = () => (
  <section className="relative z-10 -mt-[6.75rem] pt-4 pb-20">
    <div className="container mx-auto">
      {coveDifference.title && (
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
          {coveDifference.title}
        </h2>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coveDifference.items.map((item, i) => {
          const Icon = getIcon(item.icon);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-xl p-8 border border-border hover:shadow-2xl transition-shadow group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h4 className="text-lg font-bold text-foreground">{item.title}</h4>
              </div>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Features;
