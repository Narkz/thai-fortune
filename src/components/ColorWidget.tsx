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
  const todayDay = THAI_DAYS[today.getDay() as keyof typeof THAI_DAYS];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card-light rounded-3xl p-6 overflow-hidden relative"
    >
      {/* Decorative color orb */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-60"
        style={{ backgroundColor: birthData.color.hex }}
      />

      {/* Label */}
      <div className="relative">
        <span className="text-gray-500 text-xs uppercase tracking-wider font-medium">
          Your Birth Color
        </span>

        {/* Main color display */}
        <div className="mt-4 flex items-center gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-2xl shadow-lg"
            style={{
              backgroundColor: birthData.color.hex,
              boxShadow: `0 8px 24px ${birthData.color.hex}40`,
            }}
          />
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
              boxShadow: [
                `0 0 0 0 ${todayColor.hex}00`,
                `0 0 0 8px ${todayColor.hex}30`,
                `0 0 0 0 ${todayColor.hex}00`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 rounded-lg"
            style={{ backgroundColor: todayColor.hex }}
          />
        </div>

        {/* Match indicator */}
        {birthData.color.name === todayColor.name && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl px-3 py-2 flex items-center gap-2"
          >
            <span className="text-lg">✨</span>
            <span className="text-amber-700 text-xs font-medium">
              Lucky! Your color aligns with today
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
