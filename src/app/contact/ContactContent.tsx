"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import siteContent from "@/content/site-content.json";
import ContactForm from "@/components/ContactForm";
import { MessageCircle, Clock } from "lucide-react";

const GOOGLE_MAPS_LOCATION_URL =
  "https://www.google.com/maps/place/The+Caring+Cove/@-1.3132311,36.6938284,17z/data=!3m1!4b1!4m6!3m5!1s0x182f1dfd4e60c0f9:0x963d4e77eebdf65b!8m2!3d-1.3132311!4d36.6964033!16s%2Fg%2F11z2lltw6d?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D";

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
            <p className="text-muted-foreground max-w-2xl mx-auto">{content.subheadline}</p>
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
                        : c.icon === "map-pin"
                          ? GOOGLE_MAPS_LOCATION_URL
                          : undefined
                  }
                  target={c.icon === "map-pin" ? "_blank" : undefined}
                  rel={c.icon === "map-pin" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg hover:border-primary/30 transition-all ${
                    c.icon === "mail" || c.icon === "phone" || c.icon === "map-pin"
                      ? "cursor-pointer"
                      : ""
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{c.title}</h3>
                  {c.lines.map((l, j) => (
                    <p
                      key={j}
                      className={`text-muted-foreground text-sm ${
                        c.icon === "mail" || c.icon === "phone" || c.icon === "map-pin"
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

          <div className="max-w-3xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">
              From first message to a decision
            </h3>
            <ol className="grid sm:grid-cols-5 gap-4">
              {[
                {
                  step: "1",
                  title: "Inquiry",
                  copy: "Call, WhatsApp, or the form. We need a way to reach you.",
                },
                {
                  step: "2",
                  title: "Conversation",
                  copy: "We reply within 2 hours in business hours and learn what you need.",
                },
                {
                  step: "3",
                  title: "Private tour",
                  copy: "You see the Karen home. No group walk-throughs.",
                },
                {
                  step: "4",
                  title: "Assessment",
                  copy: "If it may be a fit, we plan a clinical assessment with the facts you choose to share.",
                },
                {
                  step: "5",
                  title: "Offer or honest no",
                  copy: "A clear next step, or a straight answer if we are not the right home.",
                },
              ].map((item) => (
                <li key={item.step} className="bg-card border border-border rounded-xl p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-primary mb-2">
                    Step {item.step}
                  </p>
                  <p className="font-semibold text-foreground mb-1">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.copy}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Contact Form */}
          <div id="request-tour" className="scroll-mt-24">
            <ContactForm />
          </div>

          <aside
            id="inquiry-privacy"
            className="max-w-xl mx-auto mt-10 scroll-mt-24 text-sm text-muted-foreground space-y-3"
          >
            <h3 className="text-base font-bold text-foreground">
              Inquiry notice (version 2026-08-17.1)
            </h3>
            <p>
              The Caring Cove, Karen, Nairobi, uses tour inquiries only to follow up about a private
              tour and possible admission. We do not sell this information.
            </p>
            <p>
              Fields: your name, email, phone, preferred channel, relationship to the person needing
              care, timing, high-level care need, location, tour window, optional resident first
              name, and your consent. We do not ask for diagnoses in this form.
            </p>
            <p>
              Email is delivered through the website host mailbox to info@thecaringcove.co.ke. We
              keep inquiry mail for 12 months, then delete it, unless a later admission file must
              keep a subset. You can ask for a copy, a correction, or deletion by emailing{" "}
              <a className="text-primary underline" href="mailto:info@thecaringcove.co.ke">
                info@thecaringcove.co.ke
              </a>{" "}
              with your reference number.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
