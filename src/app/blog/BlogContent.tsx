"use client";

import { User, Calendar, MessageCircle, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

import { blogPosts } from "@/content/blog-posts";

export default function BlogContent() {
  return (
    <>
      {blogPosts.map((p) => (
        <article key={p.id} className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
          <img src={p.heroImage} alt={p.heroAlt} className="w-full h-72 object-cover" />
          <div className="p-6">
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-xs mb-4">
              <span className="flex items-center gap-1"><User className="w-3 h-3" /> {p.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {p.publishedDate}</span>
              <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {p.commentsCount} Comment</span>
              <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {p.tag}</span>
            </div>
            <Link href={`/blog-details/${p.id}`}>
              <h2 className="text-2xl font-bold text-foreground mb-3 hover:text-primary transition-colors">{p.title}</h2>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              {p.listExcerpt}
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
