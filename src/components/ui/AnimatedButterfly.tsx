"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface AnimatedButterflyProps {
  className?: string;
  size?: number;
  isFlapping?: boolean;
}

export const AnimatedButterfly = ({ className = "", size = 120, isFlapping = false }: AnimatedButterflyProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const shouldFlap = isFlapping || isHovered;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cleanupTimeoutRef = useRef<number | null>(null);

  type MiniButterfly = {
    id: string;
    fromLeft: number;
    fromTop: number;
    toX: number;
    toY: number;
    size: number;
    delay: number;
    duration: number;
    rotate: number;
  };

  const [burst, setBurst] = useState<MiniButterfly[]>([]);
  const [burstKey, setBurstKey] = useState(0);

  const miniCount = 208;
  const miniButterflySvg = useMemo(
    () => (
      <svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="miniWing" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#f0c0ff" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#c471ed" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6a1e8a" stopOpacity="0.85" />
          </radialGradient>
        </defs>
        <ellipse cx="10" cy="8" rx="9" ry="7.5" fill="url(#miniWing)" opacity="0.95" />
        <ellipse cx="18" cy="8" rx="9" ry="7.5" fill="url(#miniWing)" opacity="0.95" />
        <ellipse cx="9" cy="14" rx="7" ry="5" fill="#a040c0" opacity="0.85" />
        <ellipse cx="19" cy="14" rx="7" ry="5" fill="#a040c0" opacity="0.85" />
        <rect x="13" y="3" width="2" height="14" rx="1" fill="#1a0028" />
        <line x1="14" y1="3" x2="10" y2="-1" stroke="#9b3bc0" strokeWidth="0.8" />
        <line x1="14" y1="3" x2="18" y2="-1" stroke="#9b3bc0" strokeWidth="0.8" />
        <circle cx="10" cy="-1" r="1.5" fill="#c471ed" />
        <circle cx="18" cy="-1" r="1.5" fill="#c471ed" />
      </svg>
    ),
    [],
  );

  useEffect(() => {
    return () => {
      if (cleanupTimeoutRef.current) {
        window.clearTimeout(cleanupTimeoutRef.current);
      }
    };
  }, []);

  const spawnMiniButterflies = () => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;

    const rect = rootRef.current?.getBoundingClientRect();
    const fromX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const fromY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    // Overshoot the viewport so the burst truly fills the screen.
    const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 1.25;

    const items: MiniButterfly[] = Array.from({ length: miniCount }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = maxRadius * (0.6 + Math.random() * 0.6);

      // Add a mild upward bias so they "fly away"
      const toX = Math.cos(angle) * radius;
      const toY =
        Math.sin(angle) * radius - (0.22 + Math.random() * 0.32) * window.innerHeight;

      const delay = Math.min(1.1, i * 0.012 + Math.random() * 0.22);
      const duration = 3.2 + Math.random() * 2.2;
      const size = 12 + Math.random() * 26;

      return {
        id: `${Date.now()}-${i}-${Math.random().toString(16).slice(2)}`,
        // Position minis so they originate from the butterfly center.
        fromLeft: fromX - size / 2,
        fromTop: fromY - size / 2,
        toX,
        toY,
        size,
        delay,
        duration,
        rotate: (Math.random() - 0.5) * 30,
      };
    });

    if (cleanupTimeoutRef.current) {
      window.clearTimeout(cleanupTimeoutRef.current);
    }

    setBurstKey((k) => k + 1);
    setBurst(items);

    const maxLifetimeMs = Math.ceil((1.1 + 5.6) * 1000);
    cleanupTimeoutRef.current = window.setTimeout(() => {
      setBurst([]);
    }, maxLifetimeMs);
  };

  return (
    <motion.div
      ref={rootRef}
      onMouseEnter={() => {
        setIsHovered(true);
        spawnMiniButterflies();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`cursor-pointer select-none ${className}`}
      style={{ width: size, height: size }}
      animate={
        reduceMotion
          ? { scale: 1 }
          : {
              scale: shouldFlap ? 1.06 : 1,
              y: shouldFlap ? -1 : 0,
            }
      }
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {/* Hover burst: mini butterflies fly out, fill screen, fade */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        aria-hidden
      >
        <AnimatePresence>
          {burst.length > 0 && (
            <motion.div
              key={burstKey}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {burst.map((b) => (
                <motion.div
                  key={b.id}
                  className="absolute"
                  style={{
                    left: b.fromLeft,
                    top: b.fromTop,
                    width: b.size,
                    height: b.size,
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0.6,
                    rotate: b.rotate,
                  }}
                  animate={{
                    x: b.toX,
                    y: b.toY,
                    opacity: [0, 1, 0.85, 0],
                    scale: [0.65, 1, 0.95, 0.8],
                    rotate: b.rotate + (Math.random() - 0.5) * 40,
                  }}
                  transition={{
                    delay: b.delay,
                    duration: b.duration,
                    ease: "easeOut",
                    times: [0, 0.18, 0.6, 1],
                  }}
                >
                  <motion.div
                    className="w-full h-full"
                    animate={{ scaleX: [1, 0.7, 1] }}
                    transition={{
                      duration: 0.55,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      filter:
                        "drop-shadow(0 0 12px rgba(196,113,237,0.65)) drop-shadow(0 0 22px rgba(155,59,192,0.35))",
                    }}
                  >
                    {miniButterflySvg}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <radialGradient id="wingGradient" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#c471ed" />
            <stop offset="65%" stopColor="#9b3bc0" />
            <stop offset="100%" stopColor="#6a1e8a" />
          </radialGradient>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a0028" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="butterflyGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.55 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient glow halo */}
        <motion.circle
          cx="60"
          cy="60"
          r="34"
          fill="rgba(196,113,237,0.10)"
          filter="url(#softGlow)"
          animate={
            reduceMotion
              ? { opacity: 0.35 }
              : { opacity: shouldFlap ? [0.25, 0.55, 0.25] : [0.2, 0.35, 0.2] }
          }
          transition={{
            duration: shouldFlap ? 1.8 : 2.8,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Left wing - hinge at 60,60, wing extends left */}
        <g transform="translate(60, 60)">
          <motion.g
            animate={
              reduceMotion
                ? { rotate: 0 }
                : {
                    rotate: shouldFlap ? [-30, 22, -30] : [-10, 10, -10],
                    scaleX: shouldFlap ? [1, 0.88, 1] : 1,
                  }
            }
            transition={{
              duration: shouldFlap ? 0.55 : 1.6,
              repeat: reduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <path
              d="M 0 0 Q -35 -15 -35 25 Q -35 65 0 85 L 0 0"
              fill="url(#wingGradient)"
              filter="url(#butterflyGlow)"
              opacity="0.95"
            />
            {/* Wing details */}
            <circle cx="-18" cy="18" r="8" fill="none" stroke="rgba(232,160,248,0.85)" strokeWidth="1.5" />
            <circle cx="-18" cy="18" r="5" fill="rgba(122,42,160,0.55)" />
            <circle cx="-18" cy="18" r="2.3" fill="rgba(240,192,255,0.85)" />
            <circle cx="-22" cy="50" r="9" fill="none" stroke="rgba(232,160,248,0.7)" strokeWidth="1.2" />
            <circle cx="-22" cy="50" r="6" fill="rgba(122,42,160,0.45)" />
            <path
              d="M 0 5 Q -30 -5 -30 30 Q -30 60 0 80"
              fill="none"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1"
            />
            <path d="M -2 10 L -30 0" stroke="rgba(208,128,240,0.28)" strokeWidth="1.2" />
            <path d="M -2 25 L -34 25" stroke="rgba(208,128,240,0.22)" strokeWidth="1.2" />
            <path d="M -2 40 L -30 55" stroke="rgba(208,128,240,0.22)" strokeWidth="1.1" />
            <circle cx="-35" cy="18" r="1.8" fill="rgba(208,128,240,0.8)" />
            <circle cx="-35" cy="35" r="1.4" fill="rgba(192,96,224,0.7)" />
            <circle cx="-30" cy="60" r="1.8" fill="rgba(208,128,240,0.75)" />
          </motion.g>
        </g>

        {/* Right wing - hinge at 60,60, wing extends right */}
        <g transform="translate(60, 60)">
          <motion.g
            animate={
              reduceMotion
                ? { rotate: 0 }
                : {
                    rotate: shouldFlap ? [30, -22, 30] : [10, -10, 10],
                    scaleX: shouldFlap ? [1, 0.88, 1] : 1,
                  }
            }
            transition={{
              duration: shouldFlap ? 0.55 : 1.6,
              repeat: reduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <path
              d="M 0 0 Q 35 -15 35 25 Q 35 65 0 85 L 0 0"
              fill="url(#wingGradient)"
              filter="url(#butterflyGlow)"
              opacity="0.95"
            />
            {/* Wing details */}
            <circle cx="18" cy="18" r="8" fill="none" stroke="rgba(232,160,248,0.85)" strokeWidth="1.5" />
            <circle cx="18" cy="18" r="5" fill="rgba(122,42,160,0.55)" />
            <circle cx="18" cy="18" r="2.3" fill="rgba(240,192,255,0.85)" />
            <circle cx="22" cy="50" r="9" fill="none" stroke="rgba(232,160,248,0.7)" strokeWidth="1.2" />
            <circle cx="22" cy="50" r="6" fill="rgba(122,42,160,0.45)" />
            <path
              d="M 0 5 Q 30 -5 30 30 Q 30 60 0 80"
              fill="none"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1"
            />
            <path d="M 2 10 L 30 0" stroke="rgba(208,128,240,0.28)" strokeWidth="1.2" />
            <path d="M 2 25 L 34 25" stroke="rgba(208,128,240,0.22)" strokeWidth="1.2" />
            <path d="M 2 40 L 30 55" stroke="rgba(208,128,240,0.22)" strokeWidth="1.1" />
            <circle cx="35" cy="18" r="1.8" fill="rgba(208,128,240,0.8)" />
            <circle cx="35" cy="35" r="1.4" fill="rgba(192,96,224,0.7)" />
            <circle cx="30" cy="60" r="1.8" fill="rgba(208,128,240,0.75)" />
          </motion.g>
        </g>

        {/* Body */}
        <motion.g
          animate={reduceMotion ? {} : { y: shouldFlap ? [-1, 1, -1] : [0, 1, 0] }}
          transition={{
            duration: shouldFlap ? 1.4 : 2.6,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        >
          <ellipse
            cx="60"
            cy="60"
            rx="4.2"
            ry="35"
            fill="url(#bodyGradient)"
            stroke="rgba(155,59,192,0.65)"
            strokeWidth="1"
            transform="rotate(-5 60 60)"
          />
          <circle cx="60" cy="25" r="6.2" fill="#1a0028" stroke="rgba(155,59,192,0.75)" strokeWidth="1" />
          {/* Antennae sway */}
          <motion.g
            animate={reduceMotion ? {} : { rotate: shouldFlap ? [0, 3, 0] : [0, 2, 0] }}
            transition={{
              duration: 2.2,
              repeat: reduceMotion ? 0 : Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "60px 25px" }}
          >
            <path d="M 56 22 Q 50 15 48 10" stroke="#9b3bc0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <circle cx="48" cy="10" r="1.8" fill="#c471ed" />
            <path d="M 64 22 Q 70 15 72 10" stroke="#9b3bc0" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <circle cx="72" cy="10" r="1.8" fill="#c471ed" />
          </motion.g>
        </motion.g>
      </svg>
    </motion.div>
  );
};
