"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import siteContent from "@/content/site-content.json";
import { Award } from "lucide-react";

const content = siteContent.homepage.professionalSkills;

const ProfessionalSkills = () => (
  <section id="professional-skills" className="py-20 bg-slate-100">
    <div className="container mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="section-subtitle">UK Clinical Standards</p>
        <h2 className="section-title">{content.headline}</h2>
        <p className="section-desc max-w-2xl mx-auto">
          {content.subheadline}
        </p>
      </div>

      {/* 4 Skills Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {content.skills.map((skill, i) => {
          const Icon = getIcon(skill.icon);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-3">
                {skill.title}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary/90 mb-2">
                The Expertise
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                {skill.expertise}
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary/90 mb-2">
                Why it matters
              </p>
              <p className="text-foreground text-sm font-medium">
                {skill.whyItMatters}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Skills Stats (Visual Counters) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-primary rounded-xl py-12 px-6 mb-14"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-primary-foreground/85 text-sm font-medium leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Chelston Park Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 p-6 rounded-lg bg-card border border-border"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Award className="w-6 h-6 text-primary" />
        </div>
        <p className="text-muted-foreground text-center sm:text-left text-sm md:text-base max-w-3xl">
          {content.badgeText}
        </p>
      </motion.div>
    </div>
  </section>
);

export default ProfessionalSkills;
