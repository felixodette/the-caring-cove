"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import siteContent from "@/content/site-content.json";
import Link from "next/link";
import {
  BedDouble,
  TreePine,
  UtensilsCrossed,
  Sparkles,
  Shield,
  ChevronRight,
} from "lucide-react";

const content = siteContent.galleryPage as {
  sections: Array<{
    id: string;
    tag: string;
    headline: string;
    copy: string;
    image: string;
    imageAlt: string;
    amenities: Array<{ title: string; description: string }>;
  }>;
  trustSignals: {
    headline: string;
    subheadline: string;
    items: Array<{ title: string; description: string }>;
  };
};

const sectionIcons = [BedDouble, TreePine, UtensilsCrossed, Sparkles];

export default function GalleryContent() {
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = content.sections.map((s) =>
        document.getElementById(s.id)
      );
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile: Sticky pill navigation */}
      <div className="lg:hidden sticky top-14 z-30 px-4 py-2 bg-white/95 backdrop-blur border-b border-border">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {content.sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeSection === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {s.tag.replace("The ", "").split(" ")[0]}
            </a>
          ))}
        </div>
      </div>

      {/* Sticky Sidebar Navigation - Desktop */}
      <aside className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-30">
        <nav className="flex flex-col gap-2">
          {content.sections.map((s, i) => {
            const Icon = sectionIcons[i];
            const isActive = activeSection === i;
            const isExpanded = isActive || hoveredNav === i;
            return (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                layout
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className={`group flex items-center overflow-hidden rounded-xl cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-white/90 shadow-md text-muted-foreground hover:text-primary hover:bg-white hover:shadow-lg"
                }`}
                animate={{
                  width: isExpanded ? 200 : 44,
                }}
                onHoverStart={() => setHoveredNav(i)}
                onHoverEnd={() => setHoveredNav(null)}
              >
                <span
                  className={`flex shrink-0 w-10 h-10 m-1.5 items-center justify-center rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "bg-primary-foreground/20"
                      : "bg-primary/10 group-hover:bg-primary/15"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                </span>
                <motion.span
                  initial={false}
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    x: isExpanded ? 0 : -8,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  className="whitespace-nowrap pl-0 pr-4 text-sm font-medium min-w-0"
                >
                  {s.tag}
                </motion.span>
              </motion.a>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-24">
        {content.sections.map((section, i) => {
          const Icon = sectionIcons[i];
          const isEven = i % 2 === 0;

          return (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`min-h-[80vh] flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image - Full bleed on mobile, half on desktop */}
                <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent z-10" />
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold uppercase tracking-wider">
                      {section.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 bg-white">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {section.headline}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {section.copy}
                  </p>
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary/90">
                      Key Amenities
                    </h4>
                    {section.amenities.map((a, j) => (
                      <div key={j}>
                        <h5 className="font-semibold text-foreground mb-1">
                          {a.title}
                        </h5>
                        <p className="text-muted-foreground text-sm">
                          {a.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>
          );
        })}

        {/* Trust Signals - Safety Behind the Scenes */}
        <section className="py-20 bg-navy">
          <div className="container mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {content.trustSignals.headline}
              </h2>
              <p className="text-navy-foreground/80 max-w-2xl mx-auto">
                {content.trustSignals.subheadline}
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {content.trustSignals.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur rounded-xl p-8 border border-white/10 hover:border-primary/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-navy-foreground/80 text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-white to-primary/5">
          <div className="container mx-auto text-center px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            >
              Experience the Sanctuary in Person
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-xl mx-auto mb-8"
            >
              Our boutique home has only 4 suites. Schedule a private tour to see
              the Cove for yourself.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-0.5"
              >
                Book a Private Tour
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
