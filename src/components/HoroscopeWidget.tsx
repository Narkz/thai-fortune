"use client";

import { motion } from "framer-motion";
import { getDailyHoroscope } from "@/lib/fortune";

interface HoroscopeWidgetProps {
  birthday: Date;
}

export default function HoroscopeWidget({ birthday }: HoroscopeWidgetProps) {
  const horoscope = getDailyHoroscope(birthday);

  // Format lucky hour
  const formatHour = (hour: number) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${suffix}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card-light rounded-3xl p-6 overflow-hidden relative"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400" />

      {/* Header with zodiac */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-gray-500 text-xs uppercase tracking-wider font-medium">
            Daily Horoscope
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl">{horoscope.sign.symbol}</span>
            <span className="text-gray-900 font-semibold">{horoscope.sign.name}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs">Lucky Hour</p>
          <p className="text-gray-700 font-medium">{formatHour(horoscope.luckyHour)}</p>
        </div>
      </div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-5"
      >
        <p className="text-gray-700 text-base leading-relaxed">
          {horoscope.message}
        </p>
      </motion.div>

      {/* Guidance */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl px-4 py-3"
      >
        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Guidance</p>
        <p className="text-gray-700 text-sm">{horoscope.guidance}</p>
      </motion.div>

      {/* Element badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 flex items-center gap-3"
      >
        <div className={`
          px-3 py-1 rounded-full text-xs font-medium
          ${horoscope.sign.element === "Fire" ? "bg-orange-100 text-orange-700" : ""}
          ${horoscope.sign.element === "Water" ? "bg-blue-100 text-blue-700" : ""}
          ${horoscope.sign.element === "Earth" ? "bg-emerald-100 text-emerald-700" : ""}
          ${horoscope.sign.element === "Air" ? "bg-sky-100 text-sky-700" : ""}
        `}>
          {horoscope.sign.element} Sign
        </div>
        <span className="text-gray-400 text-xs">{horoscope.sign.thai}</span>
      </motion.div>
    </motion.div>
  );
}
