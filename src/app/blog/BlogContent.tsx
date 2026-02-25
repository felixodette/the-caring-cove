"use client";

import { User, Calendar, MessageCircle, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

const posts = [
  { id: 1, title: "Maecenas Tempus Dellus Eget Condim", img: "/images/blog-1.jpg" },
  { id: 2, title: "Maecenas Tempus Dellus Eget Condim", img: "/images/blog-2.jpg" },
  { id: 3, title: "Maecenas Tempus Dellus Eget Condim", img: "/images/blog-3.jpg" },
];

export default function BlogContent() {
  return (
    <>
      {posts.map((p) => (
        <article key={p.id} className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
          <img src={p.img} alt={p.title} className="w-full h-72 object-cover" />
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-xs mb-4">
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> By Admin</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> 25 May 2021</span>
              <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> 22 Comment</span>
              <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> It Solution</span>
            </div>
            <Link href={`/blog-details/${p.id}`}>
              <h2 className="text-2xl font-bold text-foreground mb-3 hover:text-primary transition-colors">{p.title}</h2>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Actually choosing a strategy entails making decisions that explicitly cut off possibilities and options. An executive may well fear that getting those decisions wrong
            </p>
            <Link href={`/blog-details/${p.id}`} className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
              Read More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      ))}
    </>
  );
}
