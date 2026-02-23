"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
const testimonials = [
  { name: "Sarah Johnson", role: "Customer, USA", img: "/images/team-1.jpg", text: "Sollicitudin nisi nulla eget augue. Maecenas quis turpaliquet, porta lorem et, dictum purus. Curabitur vel congue diamamet condimentum metus. Donec feugiat." },
  { name: "Michael Davis", role: "Customer, UK", img: "/images/team-2.jpg", text: "Sollicitudin nisi nulla eget augue. Maecenas quis turpaliquet, porta lorem et, dictum purus. Curabitur vel congue diamamet condimentum metus. Donec feugiat." },
  { name: "Emma Wilson", role: "Customer, CA", img: "/images/team-3.jpg", text: "Sollicitudin nisi nulla eget augue. Maecenas quis turpaliquet, porta lorem et, dictum purus. Curabitur vel congue diamamet condimentum metus. Donec feugiat." },
];

const Testimonials = () => {
  const [idx, setIdx] = useState(0);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">We Care About Your Life's Important Things</h2>
        </div>
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-card border border-border rounded-lg p-8 text-center"
            >
              <img
                src={testimonials[idx].img}
                alt={testimonials[idx].name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-6">"{testimonials[idx].text}"</p>
              <h4 className="font-bold text-foreground text-lg">{testimonials[idx].name}</h4>
              <p className="text-muted-foreground text-sm">{testimonials[idx].role}</p>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={() => setIdx((idx - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIdx((idx + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
