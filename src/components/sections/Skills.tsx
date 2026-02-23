"use client";

import { motion } from "framer-motion";

const skills = [
  { label: "Web Development", value: 85 },
  { label: "IT Solution", value: 90 },
  { label: "App Development", value: 78 },
  { label: "Data Research", value: 82 },
];

const Skills = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">Professional Skill</p>
          <h2 className="section-title">Bringing New IT Business Solutions and Ideas</h2>
          <p className="text-muted-foreground mb-8">
            Maecenas tempus, tellus eget condime honcus sem quam semper libero sit amet adipiscingem neque
          </p>
          <div className="space-y-6">
            {skills.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">{s.label}</span>
                  <span className="text-sm font-bold text-primary">{s.value}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src="/images/skills-img.jpg" alt="Skills" className="rounded-lg shadow-xl w-full" />
        </motion.div>
      </div>
    </div>
  </section>
);

export default Skills;
