"use client";

import { motion } from "framer-motion";
import { Smartphone, Globe, Server, Megaphone, Cloud, Brain, ArrowRight } from "lucide-react";

const services = [
  { icon: Smartphone, title: "App Development" },
  { icon: Globe, title: "Web Design" },
  { icon: Server, title: "IT Management" },
  { icon: Megaphone, title: "Digital Marketing" },
  { icon: Cloud, title: "Cloud Service" },
  { icon: Brain, title: "Machine Learning" },
];

const Services = () => (
  <section id="services" className="py-20 bg-white">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="section-subtitle">Our Service</p>
        <h2 className="section-title">We Provide World Class Service</h2>
        <p className="section-desc">
          Duis leo. Sed fringilla mauris siamet nibh. odales sagittis magna. Sed consequat iamet nibh.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-all group hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
              <s.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Curabitur ullamcorper ultricies nisiam tiamns rhoncus. Maecenas tempus tellus endimentum
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
              View Details <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
