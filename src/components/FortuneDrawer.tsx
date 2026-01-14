"use client";

import { motion, useDragControls, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { getDailyHoroscope, getDailyLuckyNumber, calculateLuckyNumber } from "@/lib/fortune";

interface FortuneDrawerProps {
  birthday: Date;
  accentColor?: string;
}

export default function FortuneDrawer({ birthday, accentColor = "#5eead4" }: FortuneDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const y = useMotionValue(0);

  const horoscope = getDailyHoroscope(birthday);
  const dailyNumber = getDailyLuckyNumber(birthday);
  const lifePathNumber = calculateLuckyNumber(birthday);

  // Calculate drawer height
  const drawerHeight = 320;
  const peekHeight = 48;

  // Background opacity based on drag
  const backdropOpacity = useTransform(y, [-drawerHeight, 0], [0.5, 0]);

  // Handle drag end with snap
  const handleDragEnd = () => {
    const currentY = y.get();
    const threshold = -drawerHeight / 3;

    if (currentY < threshold) {
      // Snap open
      animate(y, -drawerHeight + peekHeight, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
      setIsOpen(true);
    } else {
      // Snap closed
      animate(y, 0, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
      setIsOpen(false);
    }
  };

  // Toggle on tap
  const handleTap = () => {
    if (isOpen) {
      animate(y, 0, { type: "spring", stiffness: 300, damping: 30 });
      setIsOpen(false);
    } else {
      animate(y, -drawerHeight + peekHeight, { type: "spring", stiffness: 300, damping: 30 });
      setIsOpen(true);
    }
  };

  // Additional fortune insights
  const insights = [
    { label: "Life Path", value: lifePathNumber, description: "Your core energy" },
    { label: "Today's Number", value: dailyNumber, description: "Daily guidance" },
    { label: "Lucky Hour", value: `${horoscope.luckyHour}:00`, description: "Peak energy time" },
  ];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black pointer-events-none z-30"
        style={{ opacity: backdropOpacity }}
      />

      {/* Drawer */}
      <motion.div
        ref={constraintsRef}
        className="fixed bottom-0 left-0 right-0 z-40"
        style={{ height: drawerHeight + peekHeight }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl rounded-t-3xl border-t border-white/20 overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ y, height: drawerHeight }}
          drag="y"
          dragControls={dragControls}
          dragConstraints={{ top: -drawerHeight + peekHeight, bottom: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          {/* Handle bar */}
          <div
            className="flex justify-center py-3"
            onClick={handleTap}
          >
            <motion.div
              className="w-10 h-1 rounded-full bg-white/30"
              animate={{ width: isOpen ? 40 : 32 }}
            />
          </div>

          {/* Peek content - always visible */}
          <div className="px-6 pb-3" onClick={handleTap}>
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-sm">
                {isOpen ? "Fortune Details" : "Pull up for more insights"}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <svg
                  className="w-5 h-5 text-white/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Main content */}
          <div className="px-6 pb-8">
            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  className="bg-white/5 rounded-2xl p-3 text-center"
                >
                  <p className="text-white/40 text-xs mb-1">{insight.label}</p>
                  <p
                    className="text-2xl font-semibold"
                    style={{ color: accentColor }}
                  >
                    {insight.value}
                  </p>
                  <p className="text-white/30 text-xs mt-1">{insight.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Daily guidance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="bg-white/5 rounded-2xl p-4"
            >
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">
                Today&apos;s Guidance
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                {horoscope.guidance}
              </p>
            </motion.div>

            {/* Element badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="mt-4 flex items-center justify-center gap-2"
            >
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
              >
                {horoscope.sign.element} Element
              </span>
              <span className="text-white/30 text-xs">
                {horoscope.sign.symbol} {horoscope.sign.name}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
