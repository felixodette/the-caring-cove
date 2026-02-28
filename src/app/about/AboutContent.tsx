"use client";

import { motion } from "framer-motion";
import siteContent from "@/content/site-content.json";
import BoutiqueInfographic from "@/components/sections/BoutiqueInfographic";
import Link from "next/link";
import { Quote, Award, Users, Globe, MonitorSmartphone } from "lucide-react";

const content = siteContent.aboutPage as {
  title: string;
  subheadline: string;
  visionary: { headline: string; copy: string };
  philosophy: { headline: string; copy: string; points: string[] };
  coreValues: Array<{ title: string; description: string }>;
  founderNote: string;
  experienceGrid: Array<{ value: string; label: string }>;
};

const experienceIcons = [Award, Users, Globe, MonitorSmartphone];

export default function AboutContent() {
  return (
    <>
      {/* The Visionary Behind the Cove */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src="/images/about-img.jpg"
                alt="The Caring Cove"
                className="rounded-2xl shadow-xl w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
                The Visionary Behind the Cove
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {content.visionary.headline}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {content.visionary.copy}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
              Our Philosophy
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {content.philosophy.headline}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {content.philosophy.copy}
            </p>
            <ul className="space-y-4">
              {content.philosophy.points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-foreground"
                >
                  <span className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
              What We Stand For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Core Values That Define Us
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.coreValues.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Grid */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              The Experience Behind the Care
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              Decades of UK clinical excellence, now in the heart of Nairobi.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {content.experienceGrid.map((item, i) => {
              const Icon = experienceIcons[i] ?? Award;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center text-primary-foreground"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold mb-2">
                    {item.value}
                  </p>
                  <p className="text-primary-foreground/90 text-sm">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Note */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <Quote className="w-12 h-12 text-primary/40" />
            </div>
            <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed text-center italic">
              &ldquo;{content.founderNote}&rdquo;
            </blockquote>
            <p className="text-center text-primary font-semibold mt-6">
              — The Founder
            </p>
          </motion.div>
        </div>
      </section>

      {/* Boutique Advantage Interactive Infographic */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <BoutiqueInfographic />
        </div>
      </section>

      {/* Internal Link to Services */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground mb-4"
          >
            See how our founder&apos;s experience manifests in our care
          </motion.p>
          <Link
            href="/service"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Explore Our Six Pillars of Care
            <span className="text-sm">→</span>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6"
          >
            Ready to learn more?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/#contact"
              className="inline-block bg-navy px-8 py-3 rounded font-semibold text-navy-foreground hover:bg-navy/80 transition-colors"
            >
              Book a Private Tour
            </Link>
            <Link
              href="/#care-guide"
              className="inline-block border-2 border-primary-foreground/60 text-primary-foreground px-8 py-3 rounded font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              Request Our Care Guide
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
