"use client";

import { motion } from "framer-motion";
import { calculateLuckyNumber, getDailyLuckyNumber } from "@/lib/fortune";

interface NumberWidgetProps {
  birthday: Date;
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-3xl p-6 overflow-hidden relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-400/20 to-transparent rounded-full blur-2xl" />

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
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-5xl font-bold text-white tabular-nums"
          >
            {lifePathNumber}
          </motion.div>
          <p className="text-teal-300/80 text-xs mt-1">
            {numberMeanings[lifePathNumber] || "Unique Path"}
          </p>
        </div>

        {/* Daily Number */}
        <div className="text-right">
          <p className="text-white/40 text-xs mb-1">Today</p>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="text-3xl font-semibold text-teal-300 tabular-nums"
          >
            {dailyNumber}
          </motion.div>
        </div>
      </div>

      {/* Number insight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-5 pt-4 border-t border-white/10"
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
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
