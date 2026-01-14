"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { calculateLuckyNumber, getDailyLuckyNumber } from "@/lib/fortune";

interface NumberWidgetProps {
  birthday: Date;
}

// Animated counter component
function AnimatedNumber({ value, delay = 0, className }: { value: number; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [display]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeout = setTimeout(() => {
        spring.set(value);
        setHasAnimated(true);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, spring, delay, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

export default function NumberWidget({ birthday }: NumberWidgetProps) {
  const lifePathNumber = calculateLuckyNumber(birthday);
  const dailyNumber = getDailyLuckyNumber(birthday);

  // Number meanings
  const numberMeanings: Record<number, string> = {
    1: "Leadership & Independence",
    2: "Harmony & Partnership",
    3: "Creativity & Expression",
    4: "Stability & Foundation",
    5: "Freedom & Adventure",
    6: "Love & Responsibility",
    7: "Wisdom & Spirituality",
    8: "Abundance & Power",
    9: "Compassion & Completion",
    11: "Intuition & Enlightenment",
    22: "Master Builder",
    33: "Master Teacher",
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="glass-card rounded-3xl p-6 overflow-hidden relative cursor-pointer"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-400/20 to-transparent rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Label */}
      <span className="text-white/50 text-xs uppercase tracking-wider font-medium">
        Lucky Numbers
      </span>

      {/* Main numbers display */}
      <div className="mt-4 flex items-end gap-6">
        {/* Life Path Number */}
        <div className="flex-1">
          <p className="text-white/40 text-xs mb-1">Life Path</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-white tabular-nums"
          >
            <AnimatedNumber value={lifePathNumber} delay={0.3} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-teal-300/80 text-xs mt-1"
          >
            {numberMeanings[lifePathNumber] || "Unique Path"}
          </motion.p>
        </div>

        {/* Daily Number */}
        <div className="text-right">
          <p className="text-white/40 text-xs mb-1">Today</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-semibold text-teal-300 tabular-nums"
          >
            <AnimatedNumber value={dailyNumber} delay={0.5} />
          </motion.div>
        </div>
      </div>

      {/* Number insight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-5 pt-4 border-t border-white/10"
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-teal-400"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-white/60 text-sm">
            Use <span className="text-white font-medium">{dailyNumber}</span> in decisions today
          </p>
        </div>
      </motion.div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer pointer-events-none" />
    </motion.div>
  );
}
