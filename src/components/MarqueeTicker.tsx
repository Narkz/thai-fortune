"use client";

import { motion } from "framer-motion";

interface MarqueeTickerProps {
  accentColor?: string;
}

const AFFIRMATIONS = [
  "Trust the journey",
  "Abundance flows to you",
  "Today brings new blessings",
  "Your energy attracts miracles",
  "The universe supports you",
  "Gratitude opens doors",
  "You are aligned with your purpose",
  "Positive energy surrounds you",
  "Every moment is a fresh start",
  "Your intuition guides you",
];

export default function MarqueeTicker({ accentColor = "#5eead4" }: MarqueeTickerProps) {
  // Double the items for seamless loop
  const items = [...AFFIRMATIONS, ...AFFIRMATIONS];

  return (
    <div className="relative overflow-hidden py-3">
      {/* Gradient fade edges - inherit from background */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: [0, -50 * AFFIRMATIONS.length * 3], // Move by total width of original items
        }}
        transition={{
          x: {
            duration: 60,
            repeat: Infinity,
            ease: "linear", // Linear for constant motion - per animations.dev
          },
        }}
      >
        {items.map((affirmation, index) => (
          <div
            key={index}
            className="flex items-center gap-3 shrink-0"
          >
            {/* Decorative dot */}
            <span
              className="w-1.5 h-1.5 rounded-full opacity-60"
              style={{ backgroundColor: accentColor }}
            />
            {/* Text */}
            <span className="text-white/40 text-sm font-light tracking-wide">
              {affirmation}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
