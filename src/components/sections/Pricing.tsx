"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  { name: "Basic", price: "$29", popular: false },
  { name: "Standard", price: "$49", popular: true },
  { name: "Premium", price: "$89", popular: false },
];

const features = [
  "30 Days Trial Features",
  "Synced To Cloud Database",
  "10 Hours Of Support",
  "Social Media Integration",
  "Unlimited Features",
];

const Pricing = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="section-subtitle">Pricing Plan</p>
        <h2 className="section-title">Let's Check Our Latest Price</h2>
        <p className="section-desc">
          Dcidunt eget semper nec quam. Sed hendrerit. acfelis Nunc egestas augue atpellentesque laoreet
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`rounded-lg p-8 text-center border transition-shadow hover:shadow-xl ${
              plan.popular
                ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                : "bg-card text-foreground border-border"
            }`}
          >
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className={`text-sm mb-4 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              Per month billed annually
            </p>
            <p className="text-4xl font-bold mb-6">{plan.price}</p>
            <ul className="space-y-3 mb-8 text-left">
              {features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-sm">
                  <Check className={`w-4 h-4 shrink-0 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={`inline-block w-full py-3 rounded font-semibold text-sm transition-colors ${
                plan.popular
                  ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              Get Started
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
