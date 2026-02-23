"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Why we are?", a: "Maecenas tempus, tellus eget condime honcus sem quam semper libero sit amet adipiscingem neque sed ipsum. amquam nunc" },
  { q: "What we do for you?", a: "Maecenas tempus, tellus eget condime honcus sem quam semper libero sit amet adipiscingem neque sed ipsum. amquam nunc" },
  { q: "100% data security", a: "Maecenas tempus, tellus eget condime honcus sem quam semper libero sit amet adipiscingem neque sed ipsum. amquam nunc" },
];

const FAQ = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">FAQ</p>
          <h2 className="section-title">Know More About Our Solutions</h2>
          <p className="text-muted-foreground mb-8">
            Maecenas tempus, tellus eget condime honcus sem quam semper libero sit amet adipiscingem neque
          </p>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-lg px-4">
                <AccordionTrigger className="text-foreground font-semibold hover:text-primary">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-navy rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold text-navy-foreground mb-6">Free Consulting</h3>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded bg-navy-foreground/10 text-navy-foreground placeholder:text-navy-foreground/50 border-0 outline-none focus:ring-2 focus:ring-primary" />
            <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded bg-navy-foreground/10 text-navy-foreground placeholder:text-navy-foreground/50 border-0 outline-none focus:ring-2 focus:ring-primary" />
            <input type="text" placeholder="Phone Number" className="w-full px-4 py-3 rounded bg-navy-foreground/10 text-navy-foreground placeholder:text-navy-foreground/50 border-0 outline-none focus:ring-2 focus:ring-primary" />
            <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 rounded bg-navy-foreground/10 text-navy-foreground placeholder:text-navy-foreground/50 border-0 outline-none focus:ring-2 focus:ring-primary resize-none" />
            <button type="button" className="w-full bg-primary text-primary-foreground py-3 rounded font-semibold hover:bg-primary/90 transition-colors">
              Submit Now
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  </section>
);

export default FAQ;
