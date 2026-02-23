"use client";

import { motion } from "framer-motion";
import { Check, Settings, Headphones } from "lucide-react";

export default function AboutContent() {
  return (
    <>
      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img src="/images/about-detail.jpg" alt="About us" className="rounded-lg w-full" />
              <img
                src="/images/about-img.jpg"
                alt="Team collaboration"
                className="absolute -bottom-8 -right-4 w-48 h-48 rounded-lg border-4 border-background object-cover hidden lg:block"
              />
            </div>
            <div>
              <p className="section-subtitle">About US</p>
              <h2 className="section-title text-left">We execute our ideas from the start to finish.</h2>
              <p className="text-muted-foreground mb-4">
                Maecenas tempus, tellus eget condime honcus sem quam semper libero sit amet adipiscingem neque sed imquam nunullam quis ante. Etiam sit amet orci.
              </p>
              <p className="text-foreground font-semibold mb-6">
                Duis leo. Sed fringilla mauris siamet nibh. odales sagittis magna. Sed consequat
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "20", suffix: "Y", label: "Experiences" },
                  { value: "41", suffix: "M", label: "Happy client" },
                  { value: "20", suffix: "Y", label: "Experiences" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-primary">
                      {s.value}<span className="text-lg text-muted-foreground">{s.suffix}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle">Why Choose Us</p>
              <h2 className="section-title text-left">We execute our ideas from the start to finish.</h2>
              <p className="text-muted-foreground mb-8">
                Maecenas tempus, tellus eget condime honcus semgs semper libero sit amet adipiscingem neque.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Settings, title: "Flexible Solutions", desc: "Maecenas tempus, tellus eget condime honcus sem quam semper" },
                  { icon: Headphones, title: "24/7 Unlimited Support", desc: "Maecenas tempus, tellus eget condime honcus sem quam semper" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="/images/about-img.jpg" alt="Why choose us" className="rounded-lg w-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
