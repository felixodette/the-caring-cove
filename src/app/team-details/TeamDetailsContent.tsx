"use client";

import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const skills = [
  { name: "Web development", percent: 85 },
  { name: "IT solution", percent: 90 },
  { name: "Web development", percent: 75 },
  { name: "Data Research", percent: 80 },
];

export default function TeamDetailsContent() {
  return (
    <>
      {/* Team member info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <img src="/images/team-detail.jpg" alt="Karshin Kumar" className="rounded-lg w-full max-w-md" />
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-1">Karshin Kumar</h2>
              <p className="text-primary font-semibold mb-4">Founder</p>
              <p className="text-muted-foreground mb-6">
                Mauris turpis nunc, blandit et volutpat molestie porta ut, ligula. Fusce pharetra convallis urna. Quisque ut nisi. Donec mi odio fauciberisque quis, convallis in nisi. Suspendisse non nisl sit amet velit hendrerit tm. Ut leo. a nisl id ante tempus hendrerit.
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-foreground"><strong>Phone :</strong> <span className="text-muted-foreground">123 - 456 - 789</span></p>
                <p className="text-foreground"><strong>Email :</strong> <span className="text-muted-foreground">solverwp@gmail.com</span></p>
                <p className="text-foreground"><strong>Website :</strong> <span className="text-muted-foreground">solverwp.com</span></p>
                <p className="text-foreground"><strong>Experiences :</strong> <span className="text-muted-foreground">08 Years</span></p>
              </div>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 bg-section-bg">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8">My Experiences</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <p className="text-primary font-semibold text-sm mb-1">Softten (2015 - 2018)</p>
                <h4 className="font-bold text-foreground text-lg mb-2">IT Expert</h4>
                <p className="text-muted-foreground text-sm">
                  Tincidunt eget semper nec quam. Sed hendrerit. Morbi ac felis. Nuncn egestas augue at pellentesque laoreet felis eros vehicula lealesuaelitk leo quis pede. Donec interdum.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 bg-background">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8">My Professional</h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
            {skills.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">{s.name}</span>
                  <span className="text-sm text-primary font-semibold">{s.percent}%</span>
                </div>
                <div className="h-2 bg-section-bg rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
