"use client";

import { motion } from "framer-motion";
import { getBirthColor, getTodayColor, THAI_DAYS } from "@/lib/fortune";

interface ColorWidgetProps {
  birthday: Date;
}

export default function ColorWidget({ birthday }: ColorWidgetProps) {
  const birthData = getBirthColor(birthday);
  const todayColor = getTodayColor();
  const today = new Date();

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="glass-card-light rounded-3xl p-6 overflow-hidden relative cursor-pointer active:cursor-grabbing"
    >
      {/* Decorative color orb - with breathing animation */}
      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl"
        style={{ backgroundColor: birthData.color.hex }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Label */}
      <div className="relative">
        <span className="text-gray-500 text-xs uppercase tracking-wider font-medium">
          Your Birth Color
        </span>

        {/* Main color display */}
        <div className="mt-4 flex items-center gap-4">
          {/* Color swatch with breathing glow */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Glow layer */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ backgroundColor: birthData.color.hex }}
              animate={{
                boxShadow: [
                  `0 8px 24px ${birthData.color.hex}40`,
                  `0 12px 32px ${birthData.color.hex}60`,
                  `0 8px 24px ${birthData.color.hex}40`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Solid color with shine */}
            <div
              className="relative w-16 h-16 rounded-2xl overflow-hidden"
              style={{ backgroundColor: birthData.color.hex }}
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 55%, transparent 60%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["200% 0", "-200% 0"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
          <div>
            <h3 className="text-gray-900 text-2xl font-semibold">
              {birthData.color.name}
            </h3>
            <p className="text-gray-500 text-sm">
              {birthData.color.thai}
            </p>
          </div>
        </div>

        {/* Birth day info */}
        <div className="mt-4 pt-4 border-t border-gray-200/50">
          <p className="text-gray-600 text-sm">
            Born on <span className="font-medium text-gray-800">{birthData.day.english}</span>
          </p>
          <p className="text-gray-400 text-xs mt-0.5">
            {birthData.day.thai}
          </p>
        </div>

        {/* Today's color (smaller) */}
        <div className="mt-4 pt-4 border-t border-gray-200/50 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider">Today&apos;s Color</p>
            <p className="text-gray-700 text-sm font-medium mt-1">{todayColor.name}</p>
          </div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                `0 0 0 0 ${todayColor.hex}00`,
                `0 0 0 8px ${todayColor.hex}25`,
                `0 0 0 0 ${todayColor.hex}00`,
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-lg"
            style={{ backgroundColor: todayColor.hex }}
          />
        </div>

        {/* Match indicator */}
        {birthData.color.name === todayColor.name && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="mt-3 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl px-3 py-2 flex items-center gap-2"
          >
            <motion.span
              className="text-lg"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              ✨
            </motion.span>
            <span className="text-amber-700 text-xs font-medium">
              Lucky! Your color aligns with today
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
