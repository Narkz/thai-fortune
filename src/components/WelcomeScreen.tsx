"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import TarotCard, { TarotDesign } from "./TarotCard";
import { hapticSuccess, hapticError, hapticLight } from "@/lib/haptics";

interface WelcomeScreenProps {
  onSubmit: (date: Date) => void;
}

// Card configurations - positioned around the edges like interfacecraft
const FLOATING_CARDS: {
  design: TarotDesign;
  color: string;
  position: string;
  rotation: number;
  scale: number;
  delay: number;
}[] = [
  // Top left area
  { design: "moon", color: "#6366f1", position: "top-8 -left-6", rotation: -15, scale: 0.9, delay: 0 },
  { design: "star", color: "#f472b6", position: "top-24 left-12", rotation: 8, scale: 0.85, delay: 0.1 },

  // Top right area
  { design: "sun", color: "#f59e0b", position: "top-4 -right-4", rotation: 12, scale: 0.95, delay: 0.15 },
  { design: "crystal", color: "#06b6d4", position: "top-32 right-8", rotation: -8, scale: 0.8, delay: 0.2 },

  // Bottom left area
  { design: "lotus", color: "#ec4899", position: "bottom-32 -left-4", rotation: -20, scale: 0.85, delay: 0.25 },
  { design: "zodiac", color: "#8b5cf6", position: "bottom-12 left-16", rotation: 15, scale: 0.9, delay: 0.3 },

  // Bottom right area
  { design: "eye", color: "#10b981", position: "bottom-28 -right-2", rotation: 18, scale: 0.88, delay: 0.35 },
  { design: "star", color: "#f97316", position: "bottom-8 right-20", rotation: -12, scale: 0.82, delay: 0.4 },
];

export default function WelcomeScreen({ onSubmit }: WelcomeScreenProps) {
  const currentYear = new Date().getFullYear();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const handleSubmit = () => {
    setError("");
    hapticLight();

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (!day || !month || !year) {
      setError("Please fill in all fields");
      hapticError();
      return;
    }

    if (yearNum < 1900 || yearNum > currentYear) {
      setError("Please enter a valid year");
      hapticError();
      return;
    }

    if (dayNum < 1 || dayNum > 31) {
      setError("Please enter a valid day");
      hapticError();
      return;
    }

    const date = new Date(yearNum, monthNum - 1, dayNum);

    if (date.getMonth() !== monthNum - 1) {
      setError("Invalid date for this month");
      hapticError();
      return;
    }

    if (date > new Date()) {
      setError("Birthday cannot be in the future");
      hapticError();
      return;
    }

    hapticSuccess();
    onSubmit(date);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Floating Tarot Cards */}
      {FLOATING_CARDS.map((card, index) => (
        <TarotCard
          key={index}
          design={card.design}
          color={card.color}
          rotation={card.rotation}
          scale={card.scale}
          delay={card.delay}
          className={card.position}
        />
      ))}

      {/* Sparkle particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-white/40"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm mx-auto px-6"
      >
        {/* Welcome text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-8"
        >
          <motion.p
            className="text-white/40 text-xs uppercase tracking-[0.3em] mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Discover Your Destiny
          </motion.p>
          <motion.h1
            className="text-white text-3xl font-light tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Welcome to
          </motion.h1>
          <motion.h2
            className="text-white text-4xl font-semibold mt-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Thai Astrology
          </motion.h2>
          <motion.p
            className="text-white/50 text-sm mt-4 max-w-xs mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Enter your birthday to reveal your fortune, lucky colors, and cosmic guidance
          </motion.p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-3xl p-6"
        >
          {/* Date inputs */}
          <div className="space-y-4">
            {/* Day & Month row */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                  Day
                </label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="15"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                />
              </div>
              <div className="flex-[2]">
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                  Month
                </label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-opacity='0.4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.25rem",
                  }}
                >
                  <option value="" className="bg-gray-900 text-white">Select</option>
                  {months.map((m) => (
                    <option key={m.value} value={m.value} className="bg-gray-900 text-white">
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Year */}
            <div>
              <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                Year
              </label>
              <input
                type="number"
                min="1900"
                max={currentYear}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="1990"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm text-center mt-4"
            >
              {error}
            </motion.p>
          )}

          {/* Submit */}
          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow"
          >
            Reveal My Fortune
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-white/25 text-xs text-center mt-6"
        >
          Based on traditional Thai astrology & numerology
        </motion.p>
      </motion.div>
    </div>
  );
}
