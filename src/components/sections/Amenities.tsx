"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import siteContent from "@/content/site-content.json";

const amenities = siteContent.homepage.amenities;

const Amenities = () => (
  <section className="py-20 bg-gradient-to-b from-amber-50/80 via-white to-white">
    <div className="container mx-auto">
      <div className="text-center mb-14">
        <p className="section-subtitle">{amenities.subtitle}</p>
        <h2 className="section-title">{amenities.title}</h2>
        <p className="section-desc max-w-2xl mx-auto">
          {amenities.goal}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {amenities.items.map((item, i) => {
          const Icon = getIcon(item.icon);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-8 border border-amber-100/80 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle decorative gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="w-14 h-14 rounded-2xl bg-amber-100/80 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors duration-300"
                >
                  <Icon className="w-7 h-7 text-amber-700 group-hover:text-primary transition-colors duration-300" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary/90 transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Amenities;
