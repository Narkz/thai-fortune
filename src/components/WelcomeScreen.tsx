"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import TarotCard, { TarotDesign } from "./TarotCard";
import { hapticSuccess, hapticError, hapticLight } from "@/lib/haptics";

interface WelcomeScreenProps {
  onSubmit: (date: Date) => void;
}

// Cards stacked in a fan spread - left and right of center
const LEFT_CARDS: {
  design: TarotDesign;
  color: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
  delay: number;
}[] = [
  { design: "moon", color: "#6366f1", rotation: -25, offsetX: -30, offsetY: 20, delay: 0 },
  { design: "star", color: "#ec4899", rotation: -15, offsetX: -15, offsetY: 10, delay: 0.1 },
  { design: "lotus", color: "#8b5cf6", rotation: -5, offsetX: 0, offsetY: 0, delay: 0.2 },
];

const RIGHT_CARDS: {
  design: TarotDesign;
  color: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
  delay: number;
}[] = [
  { design: "sun", color: "#f59e0b", rotation: 25, offsetX: 30, offsetY: 20, delay: 0.05 },
  { design: "crystal", color: "#06b6d4", rotation: 15, offsetX: 15, offsetY: 10, delay: 0.15 },
  { design: "eye", color: "#10b981", rotation: 5, offsetX: 0, offsetY: 0, delay: 0.25 },
];

// Star field configuration
const STARS = Array.from({ length: 80 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.5 + 0.2,
  delay: Math.random() * 3,
  duration: 2 + Math.random() * 3,
}));

// Shooting stars
const SHOOTING_STARS = [
  { startX: 20, startY: 10, angle: 35, delay: 2, duration: 1 },
  { startX: 70, startY: 5, angle: 40, delay: 5, duration: 0.8 },
  { startX: 85, startY: 20, angle: 30, delay: 8, duration: 1.2 },
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
      {/* Cosmic background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #0f0a1e 0%, #1a1035 30%, #0d1b2a 70%, #0a0a12 100%)",
        }}
      />

      {/* Nebula glow effects */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full -z-5"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full -z-5"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Star field */}
      <div className="absolute inset-0 -z-5">
        {STARS.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 1.5, star.opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      {SHOOTING_STARS.map((star, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.6)",
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, Math.cos(star.angle * Math.PI / 180) * 200],
            y: [0, Math.sin(star.angle * Math.PI / 180) * 200],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 7 + i * 2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Left card stack */}
      <div className="absolute left-4 sm:left-12 top-1/2 -translate-y-1/2">
        {LEFT_CARDS.map((card, index) => (
          <motion.div
            key={`left-${index}`}
            className="absolute"
            style={{
              transform: `translateX(${card.offsetX}px) translateY(${card.offsetY}px)`,
              zIndex: LEFT_CARDS.length - index,
            }}
            initial={{ opacity: 0, x: -50, rotate: card.rotation - 20 }}
            animate={{
              opacity: 1,
              x: 0,
              rotate: card.rotation,
              y: [0, -5, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: card.delay },
              x: { duration: 0.6, delay: card.delay, ease: [0.16, 1, 0.3, 1] },
              rotate: { duration: 0.6, delay: card.delay, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: card.delay + 1 },
            }}
          >
            <TarotCard
              design={card.design}
              color={card.color}
              rotation={0}
              scale={0.85}
              delay={0}
            />
          </motion.div>
        ))}
      </div>

      {/* Right card stack */}
      <div className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2">
        {RIGHT_CARDS.map((card, index) => (
          <motion.div
            key={`right-${index}`}
            className="absolute right-0"
            style={{
              transform: `translateX(${card.offsetX}px) translateY(${card.offsetY}px)`,
              zIndex: RIGHT_CARDS.length - index,
            }}
            initial={{ opacity: 0, x: 50, rotate: card.rotation + 20 }}
            animate={{
              opacity: 1,
              x: 0,
              rotate: card.rotation,
              y: [0, -5, 0],
            }}
            transition={{
              opacity: { duration: 0.6, delay: card.delay },
              x: { duration: 0.6, delay: card.delay, ease: [0.16, 1, 0.3, 1] },
              rotate: { duration: 0.6, delay: card.delay, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 3.5 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: card.delay + 1.2 },
            }}
          >
            <TarotCard
              design={card.design}
              color={card.color}
              rotation={0}
              scale={0.85}
              delay={0}
            />
          </motion.div>
        ))}
      </div>

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 w-full max-w-md mx-auto px-6"
      >
        {/* Welcome text */}
        <motion.div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-violet-400"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white/60 text-xs tracking-wide">Discover Your Destiny</span>
          </motion.div>

          <motion.h1
            className="text-white text-4xl sm:text-5xl font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Welcome to
          </motion.h1>
          <motion.h2
            className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 text-4xl sm:text-5xl font-bold mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Thai Astrology
          </motion.h2>
          <motion.p
            className="text-white/40 text-sm mt-5 max-w-xs mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Enter your birthday to reveal your fortune, lucky colors, and cosmic guidance
          </motion.p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] rounded-3xl p-6 shadow-2xl"
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                />
              </div>
              <div className="flex-[2]">
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                  Month
                </label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
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
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-6 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-violet-500/30 transition-all relative overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span className="relative">Reveal My Fortune</span>
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-white/20 text-xs text-center mt-6"
        >
          Based on traditional Thai astrology & numerology
        </motion.p>
      </motion.div>
    </div>
  );
}
