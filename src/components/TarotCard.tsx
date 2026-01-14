"use client";

import { motion } from "framer-motion";

export type TarotDesign = "star" | "moon" | "sun" | "zodiac" | "lotus" | "eye" | "crystal";

interface TarotCardProps {
  design: TarotDesign;
  color: string;
  rotation?: number;
  scale?: number;
  delay?: number;
  className?: string;
}

// SVG patterns for each card design
const DESIGNS: Record<TarotDesign, React.ReactNode> = {
  star: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
      </defs>
      {/* Main star */}
      <polygon
        points="50,5 61,35 95,35 68,55 79,90 50,70 21,90 32,55 5,35 39,35"
        fill="url(#starGrad)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="0.5"
      />
      {/* Inner star */}
      <polygon
        points="50,25 55,40 72,40 58,50 63,65 50,55 37,65 42,50 28,40 45,40"
        fill="rgba(255,255,255,0.15)"
      />
      {/* Tiny stars */}
      <circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="80" cy="15" r="1" fill="rgba(255,255,255,0.4)" />
      <circle cx="85" cy="75" r="1.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="15" cy="80" r="1" fill="rgba(255,255,255,0.4)" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Crescent moon */}
      <path
        d="M60,15 C35,15 20,35 20,55 C20,75 35,95 60,95 C45,85 38,70 38,55 C38,40 45,25 60,15"
        fill="rgba(255,255,255,0.25)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="0.5"
      />
      {/* Stars around */}
      <circle cx="70" cy="25" r="2" fill="rgba(255,255,255,0.6)" />
      <circle cx="80" cy="45" r="1.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="75" cy="70" r="1" fill="rgba(255,255,255,0.4)" />
      <circle cx="65" cy="85" r="1.5" fill="rgba(255,255,255,0.5)" />
      {/* Decorative dots */}
      <circle cx="30" cy="50" r="0.8" fill="rgba(255,255,255,0.3)" />
      <circle cx="35" cy="65" r="0.6" fill="rgba(255,255,255,0.3)" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Sun rays */}
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2={50 + 40 * Math.cos((i * 30 * Math.PI) / 180)}
          y2={50 + 40 * Math.sin((i * 30 * Math.PI) / 180)}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
      ))}
      {/* Outer circle */}
      <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      {/* Inner circle */}
      <circle cx="50" cy="50" r="18" fill="rgba(255,255,255,0.2)" />
      {/* Center */}
      <circle cx="50" cy="50" r="8" fill="rgba(255,255,255,0.35)" />
      {/* Face hint */}
      <circle cx="45" cy="47" r="2" fill="rgba(255,255,255,0.15)" />
      <circle cx="55" cy="47" r="2" fill="rgba(255,255,255,0.15)" />
    </svg>
  ),
  zodiac: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Zodiac wheel */}
      <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      {/* Division lines */}
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1={50 + 28 * Math.cos((i * 30 * Math.PI) / 180)}
          y1={50 + 28 * Math.sin((i * 30 * Math.PI) / 180)}
          x2={50 + 38 * Math.cos((i * 30 * Math.PI) / 180)}
          y2={50 + 38 * Math.sin((i * 30 * Math.PI) / 180)}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
        />
      ))}
      {/* Center symbol */}
      <text x="50" y="55" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="20">
        ☿
      </text>
    </svg>
  ),
  lotus: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Lotus petals */}
      <ellipse cx="50" cy="60" rx="8" ry="25" fill="rgba(255,255,255,0.2)" transform="rotate(-30 50 60)" />
      <ellipse cx="50" cy="60" rx="8" ry="25" fill="rgba(255,255,255,0.25)" transform="rotate(0 50 60)" />
      <ellipse cx="50" cy="60" rx="8" ry="25" fill="rgba(255,255,255,0.2)" transform="rotate(30 50 60)" />
      <ellipse cx="50" cy="60" rx="6" ry="20" fill="rgba(255,255,255,0.15)" transform="rotate(-50 50 60)" />
      <ellipse cx="50" cy="60" rx="6" ry="20" fill="rgba(255,255,255,0.15)" transform="rotate(50 50 60)" />
      {/* Center */}
      <circle cx="50" cy="65" r="6" fill="rgba(255,255,255,0.3)" />
      {/* Base */}
      <ellipse cx="50" cy="85" rx="15" ry="4" fill="rgba(255,255,255,0.15)" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Eye shape */}
      <ellipse cx="50" cy="50" rx="35" ry="20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      {/* Iris */}
      <circle cx="50" cy="50" r="15" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      {/* Pupil */}
      <circle cx="50" cy="50" r="7" fill="rgba(255,255,255,0.35)" />
      {/* Highlight */}
      <circle cx="46" cy="46" r="3" fill="rgba(255,255,255,0.5)" />
      {/* Rays above */}
      {[...Array(7)].map((_, i) => (
        <line
          key={i}
          x1={25 + i * 8}
          y1="25"
          x2={25 + i * 8}
          y2="18"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  ),
  crystal: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Crystal shape */}
      <polygon
        points="50,10 70,35 65,75 50,90 35,75 30,35"
        fill="rgba(255,255,255,0.15)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="0.5"
      />
      {/* Inner facets */}
      <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <line x1="30" y1="35" x2="70" y2="35" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <line x1="35" y1="75" x2="65" y2="75" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      {/* Shine */}
      <polygon points="50,10 55,25 50,35 45,25" fill="rgba(255,255,255,0.25)" />
    </svg>
  ),
};

export default function TarotCard({
  design,
  color,
  rotation = 0,
  scale = 1,
  delay = 0,
  className = "",
}: TarotCardProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
      animate={{
        opacity: 1,
        scale: scale,
        rotate: rotation,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
        rotate: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
        y: {
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + Math.random(),
        },
      }}
    >
      <motion.div
        className="relative w-20 h-32 rounded-xl overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${color} 0%, ${color}99 100%)`,
          boxShadow: `0 10px 40px ${color}40, 0 2px 10px rgba(0,0,0,0.3)`,
        }}
        whileHover={{ scale: 1.05, rotate: rotation + 3 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Card border/frame */}
        <div className="absolute inset-1.5 rounded-lg border border-white/20" />

        {/* Pattern background */}
        <div className="absolute inset-3 flex items-center justify-center">
          {DESIGNS[design]}
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 55%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5 + Math.random() * 3,
            ease: "easeInOut",
          }}
        />

        {/* Top/bottom decorative dots */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
      </motion.div>
    </motion.div>
  );
}
