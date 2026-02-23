"use client";

import { motion } from "framer-motion";
import { Smartphone, Globe, Server, Megaphone, Cloud, Brain, Shield, Database, Code, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  { icon: Smartphone, title: "Web design" },
  { icon: Globe, title: "Web design" },
  { icon: Server, title: "Web design" },
  { icon: Cloud, title: "Web design" },
  { icon: Brain, title: "Web design" },
  { icon: Shield, title: "Web design" },
  { icon: Database, title: "Web design" },
  { icon: Code, title: "Web design" },
  { icon: Megaphone, title: "Web design" },
];

export default function ServiceContent() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-all group hover:-translate-y-1 text-center"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 mx-auto group-hover:bg-primary transition-colors">
                <s.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Curabitur ullamcorper ultricies nisiam tiamns rhoncus. Maecenas tempus tellus endimentum
              </p>
              <Link href="/service-details" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
                View Details <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
