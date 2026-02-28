"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import siteContent from "@/content/site-content.json";
import ContactForm from "@/components/ContactForm";
import { MessageCircle, Clock } from "lucide-react";

const content = siteContent.contactPage as {
  title: string;
  subheadline: string;
  contactInfo: Array<{ icon: string; title: string; lines: string[] }>;
};

export default function ContactContent() {
  return (
    <>
      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              We&apos;re Here to Help
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {content.subheadline}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {content.contactInfo.map((c, i) => {
              const Icon = getIcon(c.icon);
              return (
                <motion.a
                  key={i}
                  href={
                    c.icon === "mail"
                      ? `mailto:${c.lines[0]}`
                      : c.icon === "phone"
                        ? `tel:${c.lines[0].replace(/\s/g, "")}`
                        : undefined
                  }
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg hover:border-primary/30 transition-all ${
                    c.icon === "mail" || c.icon === "phone"
                      ? "cursor-pointer"
                      : ""
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {c.title}
                  </h3>
                  {c.lines.map((l, j) => (
                    <p
                      key={j}
                      className={`text-muted-foreground text-sm ${
                        c.icon === "mail" || c.icon === "phone"
                          ? "hover:text-primary transition-colors"
                          : ""
                      }`}
                    >
                      {l}
                    </p>
                  ))}
                </motion.a>
              );
            })}
          </div>

          {/* Response time & WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">
                We respond within 2 hours during business hours
              </span>
            </div>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-foreground">
                Diaspora? We prefer WhatsApp for time zone convenience
              </span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
