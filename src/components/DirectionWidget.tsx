"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { getLuckyDirection } from "@/lib/fortune";

interface DirectionWidgetProps {
  birthday: Date;
}

export default function DirectionWidget({ birthday }: DirectionWidgetProps) {
  const { sign, direction } = getLuckyDirection(birthday);
  const [isSettled, setIsSettled] = useState(false);

  // Realistic compass spring - starts wild, settles down
  const rotation = useSpring(0, {
    stiffness: 30,
    damping: 8,
    mass: 1,
  });

  // Subtle wobble after settling
  const wobble = useSpring(0, {
    stiffness: 100,
    damping: 10,
  });

  const finalRotation = useTransform(
    [rotation, wobble],
    ([r, w]: number[]) => r + w
  );

  useEffect(() => {
    // Simulate compass searching then finding direction
    const searchTimeout = setTimeout(() => {
      // First, spin a bit past
      rotation.set(direction.degrees + 15);
    }, 500);

    const settleTimeout = setTimeout(() => {
      // Then settle to final position
      rotation.set(direction.degrees);
    }, 1200);

    const settledTimeout = setTimeout(() => {
      setIsSettled(true);
    }, 2500);

    return () => {
      clearTimeout(searchTimeout);
      clearTimeout(settleTimeout);
      clearTimeout(settledTimeout);
    };
  }, [direction.degrees, rotation]);

  // Gentle wobble when settled (simulating magnetic field)
  useEffect(() => {
    if (!isSettled) return;

    const interval = setInterval(() => {
      wobble.set((Math.random() - 0.5) * 3);
    }, 2000);

    return () => clearInterval(interval);
  }, [isSettled, wobble]);

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="glass-card rounded-3xl p-6 overflow-hidden relative cursor-pointer"
    >
      {/* Label */}
      <span className="text-white/50 text-xs uppercase tracking-wider font-medium">
        Lucky Direction
      </span>

      {/* Direction display */}
      <div className="mt-4 flex items-center gap-5">
        {/* Compass */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer ring with subtle glow */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/20"
            animate={isSettled ? {
              boxShadow: [
                "0 0 0 0 rgba(45, 212, 191, 0)",
                "0 0 15px 2px rgba(45, 212, 191, 0.15)",
                "0 0 0 0 rgba(45, 212, 191, 0)",
              ],
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Tick marks */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <div
              key={deg}
              className="absolute w-0.5 h-1 bg-white/20"
              style={{
                top: "4px",
                left: "50%",
                transformOrigin: "center 36px",
                transform: `translateX(-50%) rotate(${deg}deg)`,
              }}
            />
          ))}

          {/* Cardinal directions */}
          <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] text-white/50 font-medium">N</span>
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-white/30 font-medium">S</span>
          <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[10px] text-white/30 font-medium">W</span>
          <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-white/30 font-medium">E</span>

          {/* Inner circle */}
          <div className="absolute inset-3 rounded-full bg-white/5 border border-white/10" />

          {/* Compass needle with spring physics */}
          <motion.div
            style={{ rotate: finalRotation }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Needle shadow */}
            <div className="absolute h-full w-1 opacity-30 blur-[1px]">
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[14px] border-l-transparent border-r-transparent border-b-teal-400" />
            </div>
            {/* Main needle */}
            <div className="relative h-full w-1">
              {/* North pointer (colored) */}
              <motion.div
                animate={isSettled ? {
                  filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[16px] border-l-transparent border-r-transparent border-b-teal-400"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(45, 212, 191, 0.5))",
                }}
              />
              {/* South pointer (muted) */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[16px] border-l-transparent border-r-transparent border-t-white/25" />
            </div>
          </motion.div>

          {/* Center dot with glow */}
          <motion.div
            className="absolute w-2.5 h-2.5 rounded-full bg-teal-400"
            animate={{
              boxShadow: [
                "0 0 8px 2px rgba(45, 212, 191, 0.4)",
                "0 0 12px 4px rgba(45, 212, 191, 0.6)",
                "0 0 8px 2px rgba(45, 212, 191, 0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Direction info */}
        <div className="flex-1">
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white text-xl font-semibold"
          >
            {direction.direction}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-sm mt-0.5"
          >
            {direction.thai}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 flex items-center gap-2"
          >
            <motion.span
              className="text-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {sign.symbol}
            </motion.span>
            <span className="text-white/60 text-sm">{sign.element} energy</span>
          </motion.div>
        </div>
      </div>

      {/* Tip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-5 pt-4 border-t border-white/10"
      >
        <p className="text-white/50 text-xs leading-relaxed">
          Face {direction.direction.toLowerCase()} when making important decisions or starting new ventures today.
        </p>
      </motion.div>
    </motion.div>
  );
}
