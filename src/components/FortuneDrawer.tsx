"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { getDailyHoroscope, getDailyLuckyNumber, calculateLuckyNumber } from "@/lib/fortune";

interface FortuneDrawerProps {
  birthday: Date;
  accentColor?: string;
}

export default function FortuneDrawer({ birthday, accentColor = "#5eead4" }: FortuneDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const horoscope = getDailyHoroscope(birthday);
  const dailyNumber = getDailyLuckyNumber(birthday);
  const lifePathNumber = calculateLuckyNumber(birthday);

  return (
    <>
      {/* Backdrop - subtle */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating pill / expanded card */}
      <motion.div
        className="fixed left-4 right-4 z-50"
        style={{ bottom: 70 }}
        layout
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full overflow-hidden"
          layout
          transition={{
            layout: { type: "spring", stiffness: 400, damping: 30 }
          }}
        >
          <motion.div
            className="bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden"
            layout
            style={{
              borderRadius: isOpen ? 24 : 50,
            }}
          >
            {/* Collapsed state - tiny pill */}
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-5 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: accentColor }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-white/60 text-sm">More insights</span>
                  </div>
                  <motion.svg
                    className="w-4 h-4 text-white/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </motion.svg>
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-5"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/50 text-xs uppercase tracking-wider">
                      Fortune Details
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"
                    >
                      <svg
                        className="w-3 h-3 text-white/50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Quick stats row */}
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-white/40 text-xs">Life Path</p>
                      <p className="text-lg font-semibold" style={{ color: accentColor }}>
                        {lifePathNumber}
                      </p>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-white/40 text-xs">Today</p>
                      <p className="text-lg font-semibold" style={{ color: accentColor }}>
                        {dailyNumber}
                      </p>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-white/40 text-xs">Lucky Hour</p>
                      <p className="text-lg font-semibold" style={{ color: accentColor }}>
                        {horoscope.luckyHour}:00
                      </p>
                    </div>
                  </div>

                  {/* Guidance */}
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-white/70 text-sm leading-relaxed">
                      {horoscope.guidance}
                    </p>
                  </div>

                  {/* Element badge */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      {horoscope.sign.element}
                    </span>
                    <span className="text-white/30 text-xs">
                      {horoscope.sign.symbol} {horoscope.sign.name}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.button>
      </motion.div>
    </>
  );
}
