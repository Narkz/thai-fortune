"use client";

import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import { useRef, useState } from "react";

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
  // Triple the items for seamless infinite scroll
  const items = [...AFFIRMATIONS, ...AFFIRMATIONS, ...AFFIRMATIONS];

  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const baseVelocity = -0.5; // Base auto-scroll speed

  // Track width for wrapping
  const itemWidth = 200; // Approximate width per item
  const totalWidth = AFFIRMATIONS.length * itemWidth;

  // Animation frame for continuous movement with momentum
  useAnimationFrame((_, delta) => {
    if (isDragging) return;

    // Apply velocity (from drag) or base velocity
    const currentVelocity = Math.abs(velocity) > 0.1 ? velocity : baseVelocity;

    // Decay velocity over time (friction)
    if (Math.abs(velocity) > 0.1) {
      setVelocity(velocity * 0.98);
    } else if (velocity !== 0) {
      setVelocity(0);
    }

    let newX = x.get() + currentVelocity * (delta / 16);

    // Wrap around seamlessly
    if (newX <= -totalWidth) {
      newX += totalWidth;
    } else if (newX >= 0) {
      newX -= totalWidth;
    }

    x.set(newX);
  });

  const handleDragStart = () => {
    setIsDragging(true);
    setVelocity(0);
  };

  const handleDragEnd = (_: unknown, info: { velocity: { x: number } }) => {
    setIsDragging(false);
    // Apply drag velocity as momentum (scaled for nice feel)
    setVelocity(info.velocity.x * 0.05);
  };

  // Scale based on drag for tactile feel
  const scale = useTransform(
    x,
    (v) => isDragging ? 0.98 : 1
  );

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-4 cursor-grab active:cursor-grabbing"
    >
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none" />

      {/* Draggable marquee track */}
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        style={{ x, scale }}
        drag="x"
        dragConstraints={{ left: -Infinity, right: Infinity }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {items.map((affirmation, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 shrink-0 select-none"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Decorative dot with pulse */}
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            />
            {/* Text */}
            <span className="text-white/50 text-sm font-light tracking-wide">
              {affirmation}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Drag hint indicator */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDragging ? 0 : 0.3 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/30 text-xs"
        >
          ← swipe →
        </motion.div>
      </motion.div>
    </div>
  );
}
