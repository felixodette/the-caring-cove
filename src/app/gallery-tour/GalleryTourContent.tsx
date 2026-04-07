"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ChevronRight, X } from "lucide-react";
import siteContent from "@/content/site-content.json";

type GallerySection = {
  id: string;
  tag: string;
  headline: string;
  copy: string;
  image: string;
  imageAlt: string;
  amenities: Array<{ title: string; description: string }>;
};

const content = siteContent.galleryPage as {
  title: string;
  subheadline: string;
  sections: GallerySection[];
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function GalleryTourContent() {
  const sections = content.sections;
  const [activeIdx, setActiveIdx] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const ids = useMemo(() => sections.map((s) => s.id), [sections]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = ids
      .map((id) => root.querySelector<HTMLElement>(`#${CSS.escape(id)}`))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most visible entry
        let best: { idx: number; ratio: number } | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = els.indexOf(e.target as HTMLElement);
          if (idx === -1) continue;
          const ratio = e.intersectionRatio;
          if (!best || ratio > best.ratio) best = { idx, ratio };
        }
        if (!best) return;
        setActiveIdx(best.idx);
        const id = ids[best.idx];
        if (id && window.location.hash !== `#${id}`) {
          history.replaceState(null, "", `#${id}`);
        }
      },
      { root, threshold: [0.35, 0.5, 0.65, 0.8] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const idx = ids.indexOf(hash);
    if (idx === -1) return;

    const el = root.querySelector<HTMLElement>(`#${CSS.escape(hash)}`);
    el?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    setActiveIdx(idx);
  }, [ids]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowHelp(false);
      if (e.key === "?" || (e.shiftKey && e.key === "/")) setShowHelp(true);

      const isUp = e.key === "ArrowUp" || e.key === "PageUp";
      const isDown = e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ";
      if (!isUp && !isDown) return;

      // avoid hijacking typing
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || (t as any)?.isContentEditable)
        return;

      e.preventDefault();
      const nextIdx = clamp(activeIdx + (isDown ? 1 : -1), 0, sections.length - 1);
      const nextId = ids[nextIdx];
      const el = root.querySelector<HTMLElement>(`#${CSS.escape(nextId)}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown as any);
  }, [activeIdx, ids, sections.length]);

  return (
    <div className="relative">
      {/* Header overlay */}
      <div className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest">
              Gallery Tour
            </p>
            <p className="text-sm font-semibold text-foreground truncate">
              {sections[activeIdx]?.tag ?? content.title}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowHelp(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-white text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Tips
              <span className="text-xs text-muted-foreground">?</span>
            </button>
            <Link
              href="/contact#request-tour"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              Book a Private Tour
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right-side dot navigation (desktop) */}
      <aside className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-30">
        <div className="flex flex-col gap-2 items-end">
          {sections.map((s, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  const root = rootRef.current;
                  const el = root?.querySelector<HTMLElement>(`#${CSS.escape(s.id)}`);
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group flex items-center gap-3"
                aria-label={`Go to ${s.tag}`}
              >
                <span
                  className={`text-xs font-semibold transition-all ${
                    isActive ? "text-foreground" : "text-muted-foreground opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {s.tag}
                </span>
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    isActive ? "bg-primary scale-110" : "bg-muted-foreground/40 group-hover:bg-primary/60"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </aside>

      {/* Scroll-snap sections */}
      <div
        ref={rootRef}
        className="h-[calc(100vh-56px)] sm:h-[calc(100vh-60px)] overflow-y-auto scroll-smooth snap-y snap-mandatory"
      >
        {sections.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className="snap-start min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-60px)] relative"
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={section.image}
                alt={section.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/25 to-transparent" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 container mx-auto px-4 py-10 flex flex-col justify-end min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-60px)]">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.6, once: false }}
                transition={{ duration: 0.35 }}
                className="max-w-3xl"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary-foreground/95 font-semibold text-sm mb-5 backdrop-blur">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {section.tag}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                  {section.headline}
                </h1>
                <p className="text-white/85 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                  {section.copy}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {section.amenities.slice(0, 4).map((a, i) => (
                    <div
                      key={`${idx}-${i}`}
                      className="rounded-xl border border-white/15 bg-white/10 backdrop-blur p-4"
                    >
                      <p className="text-white font-semibold mb-1">{a.title}</p>
                      <p className="text-white/75 text-sm leading-relaxed">
                        {a.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/contact#request-tour"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    Book a Private Tour
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      const root = rootRef.current;
                      const next = sections[idx + 1];
                      if (!root || !next) return;
                      root
                        .querySelector<HTMLElement>(`#${CSS.escape(next.id)}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/25 text-white font-semibold hover:bg-white/10 transition-colors"
                  >
                    Next
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Up/Down quick buttons (desktop) */}
            <div className="hidden md:flex flex-col gap-2 fixed left-6 bottom-6 z-30">
              <button
                type="button"
                onClick={() => {
                  const root = rootRef.current;
                  const prev = sections[activeIdx - 1];
                  if (!root || !prev) return;
                  root
                    .querySelector<HTMLElement>(`#${CSS.escape(prev.id)}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="w-11 h-11 rounded-xl bg-white/85 backdrop-blur border border-border flex items-center justify-center hover:bg-white transition-colors"
                aria-label="Previous section"
              >
                <ChevronUp className="w-5 h-5 text-foreground" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const root = rootRef.current;
                  const next = sections[activeIdx + 1];
                  if (!root || !next) return;
                  root
                    .querySelector<HTMLElement>(`#${CSS.escape(next.id)}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="w-11 h-11 rounded-xl bg-white/85 backdrop-blur border border-border flex items-center justify-center hover:bg-white transition-colors"
                aria-label="Next section"
              >
                <ChevronDown className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </section>
        ))}
      </div>

      {/* Help modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-border shadow-xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                  Gallery Tour Tips
                </p>
                <p className="text-lg font-bold text-foreground">
                  Navigate like a guided tour
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="w-10 h-10 rounded-xl border border-border bg-white hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Close tips"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <li>
                <span className="font-semibold text-foreground">Scroll</span> to
                snap between sections.
              </li>
              <li>
                Use <span className="font-semibold text-foreground">↑/↓</span> or{" "}
                <span className="font-semibold text-foreground">PageUp/PageDown</span>{" "}
                to move section-by-section.
              </li>
              <li>
                On desktop, use the <span className="font-semibold text-foreground">dots</span>{" "}
                on the right to jump to a space.
              </li>
              <li>
                Each section updates the URL hash so you can share a specific room.
              </li>
            </ul>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="px-4 py-2 rounded-lg border border-border bg-white font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Got it
              </button>
              <Link
                href="/contact#request-tour"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
              >
                Book a Private Tour
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

