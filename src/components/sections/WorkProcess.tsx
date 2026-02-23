"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Select a Project", desc: "Vestibulum ante ipsumusn eratultrices posu world" },
  { num: "02", title: "Project Analysis", desc: "Vestibulum ante ipsumusn eratultrices posu world" },
  { num: "03", title: "Execute", desc: "Vestibulum ante ipsumusn eratultrices posu world" },
  { num: "04", title: "Deliver Result", desc: "Vestibulum ante ipsumusn eratultrices posu world" },
];

const WorkProcess = () => (
  <section className="py-20 bg-section-bg">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="section-subtitle">Work Process</p>
        <h2 className="section-title">How We Work</h2>
        <p className="section-desc">
          Dcidunt eget semper nec quam. Sed hendrerit. acfelis Nunc egestas augue atpellentesque laoreet
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.img
          src="/images/work-process.jpg"
          alt="Work process"
          className="rounded-lg shadow-xl w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
        <div className="space-y-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-5 items-start group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                <span className="font-bold text-primary group-hover:text-primary-foreground transition-colors">{s.num}</span>
              </div>
              <div>
                <h4 className="font-bold text-lg text-foreground mb-1">{s.title}</h4>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WorkProcess;
