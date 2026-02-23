"use client";

import { motion } from "framer-motion";
import { Settings, Clock, Cpu } from "lucide-react";

const features = [
  { icon: Settings, title: "Flexible Solutions", desc: "Curabitur ullamcorper ultricies nisiamng tiamns rhoncus. Maecenas tempus tellus endimentum rhoncem" },
  { icon: Clock, title: "24/7 Support", desc: "Curabitur ullamcorper ultricies nisiamng tiamns rhoncus. Maecenas tempus tellus endimentum rhoncem" },
  { icon: Cpu, title: "Smart Technology", desc: "Curabitur ullamcorper ultricies nisiamng tiamns rhoncus. Maecenas tempus tellus endimentum rhoncem" },
];

const Features = () => (
  <section className="relative z-10 -mt-16">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-lg shadow-lg p-8 border border-border hover:shadow-xl transition-shadow group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <f.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h4 className="text-lg font-bold text-foreground">{f.title}</h4>
            </div>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
