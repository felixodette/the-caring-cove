"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "41M", label: "Happy Clients" },
  { value: "40M", label: "Projects Done" },
  { value: "250+", label: "Service Areas" },
];

const Stats = () => (
  <section className="py-16 bg-primary">
    <div className="container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{s.value}</p>
            <p className="text-primary-foreground/80 font-medium text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
