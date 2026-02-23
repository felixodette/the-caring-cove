"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const members = [
  { name: "Karshin Kumar", role: "Founder", img: "/images/team-1.jpg" },
  { name: "Macal Jonsons", role: "Director", img: "/images/team-2.jpg" },
  { name: "Estoner William", role: "HR", img: "/images/team-3.jpg" },
  { name: "Casses Tomas", role: "IT Manager", img: "/images/team-4.jpg" },
  { name: "Karshin Kumar", role: "Founder", img: "/images/team-1.jpg" },
  { name: "Macal Jonsons", role: "Director", img: "/images/team-2.jpg" },
  { name: "Estoner William", role: "HR", img: "/images/team-3.jpg" },
  { name: "Casses Tomas", role: "IT Manager", img: "/images/team-4.jpg" },
];

export default function TeamContent() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card rounded-lg overflow-hidden border border-border group hover:shadow-lg transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <Link href="/team-details">
                  <h4 className="font-bold text-lg text-foreground hover:text-primary transition-colors">{m.name}</h4>
                </Link>
                <p className="text-primary text-sm mb-4">{m.role}</p>
                <div className="flex justify-center gap-3">
                  {[Facebook, Twitter, Linkedin].map((Icon, j) => (
                    <a key={j} href="#" className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
