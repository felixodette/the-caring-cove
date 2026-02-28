"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import siteContent from "@/content/site-content.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, ChevronRight, Award } from "lucide-react";
import Link from "next/link";

const content = siteContent.servicesPage as {
  title: string;
  subheadline: string;
  services: Array<{
    icon: string;
    title: string;
    coreMission: string;
    approach: string;
    keyFeatures: string[];
  }>;
  comparisonTable: {
    title: string;
    rows: Array<{
      feature: string;
      largeFacilities: string;
      theCove: string;
    }>;
  };
  cta: {
    headline: string;
    buttons: Array<{
      label: string;
      href: string;
      primary?: boolean;
    }>;
  };
};

export default function ServiceContent() {
  return (
    <>
      {/* Services Accordion Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              UK CQC Standards
            </div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
              The Chelston Model
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Six Pillars of Care
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore each service to discover how we deliver world-class care in
              a boutique setting.
            </p>
            {/* Quick jump links */}
            <div className="flex flex-wrap justify-center gap-2">
              {content.services.map((s, i) => (
                <a
                  key={i}
                  href={`#service-${i}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:border-primary hover:bg-primary/5 hover:text-primary transition-all"
                >
                  {s.title.split(" (")[0]}
                </a>
              ))}
            </div>
          </motion.div>

          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            defaultValue="item-0"
          >
            {content.services.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
                <motion.div
                  key={i}
                  id={`service-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="scroll-mt-24"
                >
                  <AccordionItem
                    value={`item-${i}`}
                    className="border border-border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-shadow data-[state=open]:shadow-xl data-[state=open]:ring-2 data-[state=open]:ring-primary/20"
                  >
                    <AccordionTrigger className="px-6 py-5 hover:no-underline text-left hover:bg-muted/30 transition-colors [&[data-state=open]]:bg-muted/30">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-foreground">
                            {service.title}
                          </h3>
                          <p className="text-sm text-muted-foreground font-normal mt-0.5">
                            {service.coreMission}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-0">
                      <div className="pl-16 space-y-6">
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary/90 mb-2">
                            The Approach
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {service.approach}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary/90 mb-3">
                            Key Features
                          </h4>
                          <ul className="space-y-3">
                            {service.keyFeatures.map((feature, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-3 text-foreground"
                              >
                                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                  <Check className="w-3 h-3 text-primary" />
                                </span>
                                <span className="text-sm leading-relaxed">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </Accordion>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {content.comparisonTable.title}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              See how our boutique model compares to traditional care facilities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto overflow-hidden rounded-2xl border border-border bg-white shadow-lg"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy text-navy-foreground">
                    <th className="text-left px-6 py-4 font-semibold">
                      Feature
                    </th>
                    <th className="text-left px-6 py-4 font-semibold">
                      Large Care Facilities
                    </th>
                    <th className="text-left px-6 py-4 font-semibold bg-primary/90">
                      The Caring Cove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.comparisonTable.rows.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-t border-border transition-colors hover:bg-muted/30 ${
                        i % 2 === 0 ? "bg-white" : "bg-muted/20"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-foreground">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {row.largeFacilities}
                      </td>
                      <td className="px-6 py-4 font-semibold text-primary">
                        {row.theCove}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/5">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {content.cta.headline}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {content.cta.buttons.map((btn, i) => (
                <Link
                  key={i}
                  href={btn.href}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:gap-3 ${
                    btn.primary
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl"
                      : "border-2 border-primary text-primary hover:bg-primary/10"
                  }`}
                >
                  {btn.label}
                  <ChevronRight className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
