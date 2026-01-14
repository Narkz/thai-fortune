"use client";

import { motion } from "framer-motion";
import { getDailyHoroscope } from "@/lib/fortune";

interface HoroscopeWidgetProps {
  birthday: Date;
}

// Text reveal animation - word by word with blur
function BlurRevealText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      filter: "blur(8px)",
      y: 10,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
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
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="glass-card-light rounded-3xl p-6 overflow-hidden relative cursor-pointer"
    >
      {/* Decorative gradient - animated shimmer */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 100%" }}
      />

      {/* Header with zodiac */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-gray-500 text-xs uppercase tracking-wider font-medium">
            Daily Horoscope
          </span>
          <div className="flex items-center gap-2 mt-1">
            <motion.span
              className="text-2xl"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              {horoscope.sign.symbol}
            </motion.span>
            <span className="text-gray-900 font-semibold">{horoscope.sign.name}</span>
          </div>
        </div>
        <motion.div
          className="text-right"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-400 text-xs">Lucky Hour</p>
          <motion.p
            className="text-gray-700 font-medium"
            initial={{ filter: "blur(4px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {formatHour(horoscope.luckyHour)}
          </motion.p>
        </motion.div>
      </div>

      {/* Message - with blur reveal */}
      <div className="mt-5">
        <BlurRevealText
          text={horoscope.message}
          delay={0.4}
          className="text-gray-700 text-base leading-relaxed"
        />
      </div>

      {/* Guidance */}
      <motion.div
        initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl px-4 py-3"
      >
        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Guidance</p>
        <BlurRevealText
          text={horoscope.guidance}
          delay={1}
          className="text-gray-700 text-sm"
        />
      </motion.div>

      {/* Element badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        className="mt-4 flex items-center gap-3"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            px-3 py-1 rounded-full text-xs font-medium transition-shadow
            ${horoscope.sign.element === "Fire" ? "bg-orange-100 text-orange-700 hover:shadow-orange-200" : ""}
            ${horoscope.sign.element === "Water" ? "bg-blue-100 text-blue-700 hover:shadow-blue-200" : ""}
            ${horoscope.sign.element === "Earth" ? "bg-emerald-100 text-emerald-700 hover:shadow-emerald-200" : ""}
            ${horoscope.sign.element === "Air" ? "bg-sky-100 text-sky-700 hover:shadow-sky-200" : ""}
            hover:shadow-lg
          `}
        >
          {horoscope.sign.element} Sign
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-gray-400 text-xs"
        >
          {horoscope.sign.thai}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
