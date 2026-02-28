"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import siteContent from "@/content/site-content.json";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Shield,
  Globe,
  Heart,
  FileText,
  ChevronRight,
  Search,
} from "lucide-react";

const content = siteContent.faqPage as {
  sections: Array<{
    id: string;
    tag: string;
    subtag: string;
    questions: Array<{ q: string; a: string }>;
  }>;
};

const sectionIcons = [Shield, Globe, Heart, FileText];

export default function FAQContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredSections = searchQuery
    ? content.sections.filter((s) => {
        const matchSection =
          s.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.subtag.toLowerCase().includes(searchQuery.toLowerCase());
        const matchQuestion = s.questions.some(
          (q) =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return matchSection || matchQuestion;
      })
    : content.sections;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Search & Quick Nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {content.sections.map((s, i) => {
              const Icon = sectionIcons[i];
              const isActive = activeCategory === s.id;
              const isVisible = filteredSections.some((fs) => fs.id === s.id);
              if (!isVisible && searchQuery) return null;

              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveCategory(isActive ? null : s.id);
                    document.getElementById(s.id)?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-white border border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {s.tag.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Sticky CTA - Desktop */}
        <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-20">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-primary rounded-xl p-6 shadow-xl max-w-[200px]"
          >
            <p className="text-primary-foreground font-semibold text-sm mb-3">
              Ready to see The Cove?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary-foreground font-bold text-sm hover:underline"
            >
              Book a Private Tour
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-3xl mx-auto lg:mr-64">
          <AnimatePresence mode="wait">
            {filteredSections.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <p className="text-muted-foreground">
                  No questions match your search. Try a different term.
                </p>
              </motion.div>
            ) : (
              filteredSections.map((section, sIdx) => {
                const Icon = sectionIcons[sIdx];
                return (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sIdx * 0.15 }}
                    className="scroll-mt-24 mb-16"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground">
                          {section.tag}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {section.subtag}
                        </p>
                      </div>
                    </div>

                    <Accordion
                      type="single"
                      collapsible
                      className="space-y-2"
                    >
                      {section.questions.map((q, qIdx) => (
                        <AccordionItem
                          key={qIdx}
                          value={`${section.id}-${qIdx}`}
                          className="bg-white border border-border rounded-xl px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all"
                        >
                          <AccordionTrigger className="py-5 hover:no-underline text-left hover:text-primary [&[data-state=open]]:text-primary">
                            <span className="font-semibold pr-4">{q.q}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-5 pt-0">
                            <p className="text-muted-foreground leading-relaxed pl-0">
                              {q.a}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    {/* Inline CTA after each section */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/10"
                    >
                      <p className="text-foreground font-semibold mb-2">
                        Still have questions?
                      </p>
                      <p className="text-muted-foreground text-sm mb-4">
                        Schedule a private tour to see The Cove and speak with
                        our team.
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                      >
                        Book a Private Tour
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </motion.section>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Mobile CTA */}
        <div className="lg:hidden sticky bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur border-t border-border z-20">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold"
          >
            Book a Private Tour
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
