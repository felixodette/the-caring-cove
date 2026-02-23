"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const tabs = [
  {
    label: "Our Mission",
    content: "Maecenas tempus, tellus eget condime honcus sem quam semper libero sit amet adipiscingem neque sed imquam nunullam quis ante. Etiam sit amet orci.",
    points: ["Client happiness", "World-class service"],
  },
  {
    label: "Our Vision",
    content: "Etiam sit amet orci. Maecenas tempus, tellus eget condime honcus sem quam semper libero sit amet adipiscingem neque sed imquam nunullam quis ante.",
    points: ["Innovation driven", "Global excellence"],
  },
];

const About = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/images/about-img.jpg" alt="About us" className="rounded-lg shadow-xl w-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-subtitle">About Us</p>
            <h2 className="section-title">We are Working Worldwide With 15+ Years</h2>
            <p className="text-muted-foreground mb-6">
              Duis leo. Sed fringilla mauris siamet nibh. odales sagittis magna. Sed consequat
            </p>
            <div className="flex gap-4 mb-6">
              {tabs.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`px-6 py-2 rounded font-semibold text-sm transition-colors ${
                    active === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <p className="text-muted-foreground mb-4">{tabs[active].content}</p>
            <div className="grid grid-cols-2 gap-3">
              {tabs[active].points.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-foreground font-medium text-sm">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  {p}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
