"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
const posts = [
  { title: "Stock Exchange Market Forecast 2024-2025", date: "25 May 2024", img: "/images/blog-1.jpg" },
  { title: "Cloud Computing Security Best Practices", date: "18 Jun 2024", img: "/images/blog-2.jpg" },
  { title: "Data Analytics Trends For Modern Business", date: "10 Jul 2024", img: "/images/blog-3.jpg" },
];

const Blog = () => (
  <section id="blog" className="py-20 bg-background">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <p className="section-subtitle">Blog Post</p>
        <h2 className="section-title">Read Our Latest Tips & Tricks</h2>
        <p className="section-desc">
          Dcidunt eget semper nec quam. Sed hendrerit. acfelis Nunc egestas augue atpellentesque laoreet
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-lg overflow-hidden border border-border group hover:shadow-lg transition-shadow"
          >
            <div className="overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-muted-foreground text-xs mb-3">
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> By Admin</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {p.date}</span>
              </div>
              <h4 className="font-bold text-foreground text-lg mb-3 group-hover:text-primary transition-colors">{p.title}</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Duis leo. Sed fringilla mauris iamet nibh. odales sagittis magonsequat letendum sodales augue velit
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
                Read More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
