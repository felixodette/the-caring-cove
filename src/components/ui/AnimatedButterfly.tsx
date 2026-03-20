"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface AnimatedButterflyProps {
  className?: string;
  size?: number;
  isFlapping?: boolean;
}

export const AnimatedButterfly = ({ className = "", size = 120, isFlapping = false }: AnimatedButterflyProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldFlap = isFlapping || isHovered;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`cursor-pointer select-none ${className}`}
      style={{ width: size, height: size }}
      animate={{ scale: shouldFlap ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="butterflyGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left wing - hinge at 60,60, wing extends left */}
        <g transform="translate(60, 60)">
          <motion.g
            animate={{ rotate: shouldFlap ? [-28, 28, -28] : 0 }}
            transition={{
              duration: 0.5,
              repeat: shouldFlap ? Infinity : 0,
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
            <path d="M 0 5 Q -30 -5 -30 30 Q -30 60 0 80" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          </motion.g>
        </g>

        {/* Right wing - hinge at 60,60, wing extends right */}
        <g transform="translate(60, 60)">
          <motion.g
            animate={{ rotate: shouldFlap ? [28, -28, 28] : 0 }}
            transition={{
              duration: 0.5,
              repeat: shouldFlap ? Infinity : 0,
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
            <path d="M 0 5 Q 30 -5 30 30 Q 30 60 0 80" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          </motion.g>
        </g>

        {/* Body */}
        <ellipse cx="60" cy="60" rx="4" ry="35" fill="url(#bodyGradient)" transform="rotate(-5 60 60)" />
        <circle cx="60" cy="25" r="6" fill="#1e3a5f" />
        <path d="M 56 22 Q 50 15 48 10" stroke="#1e3a5f" strokeWidth="1" fill="none" />
        <path d="M 64 22 Q 70 15 72 10" stroke="#1e3a5f" strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
  );
};
