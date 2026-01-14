"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import TarotCard, { TarotDesign } from "./TarotCard";
import { hapticSuccess, hapticError, hapticLight } from "@/lib/haptics";

interface WelcomeScreenProps {
  onSubmit: (date: Date) => void;
}

// Cards positioned elegantly around the screen - interfacecraft style
// Visible, floating at corners and edges, not stacked
const FLOATING_CARDS: {
  design: TarotDesign;
  color: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  rotation: number;
  scale: number;
  delay: number;
  floatDuration: number;
}[] = [
  // Top left
  { design: "moon", color: "#6366f1", position: { top: "8%", left: "5%" }, rotation: -12, scale: 0.75, delay: 0, floatDuration: 4 },
  // Top right
  { design: "sun", color: "#f59e0b", position: { top: "10%", right: "8%" }, rotation: 15, scale: 0.8, delay: 0.1, floatDuration: 4.5 },
  // Middle left
  { design: "star", color: "#ec4899", position: { top: "40%", left: "3%" }, rotation: -8, scale: 0.7, delay: 0.2, floatDuration: 5 },
  // Middle right
  { design: "crystal", color: "#06b6d4", position: { top: "35%", right: "4%" }, rotation: 10, scale: 0.72, delay: 0.15, floatDuration: 4.2 },
  // Bottom left
  { design: "lotus", color: "#8b5cf6", position: { bottom: "15%", left: "8%" }, rotation: 8, scale: 0.68, delay: 0.25, floatDuration: 4.8 },
  // Bottom right
  { design: "eye", color: "#10b981", position: { bottom: "12%", right: "6%" }, rotation: -10, scale: 0.74, delay: 0.3, floatDuration: 5.2 },
];

// Star field
const STARS = Array.from({ length: 100 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  opacity: Math.random() * 0.6 + 0.2,
  delay: Math.random() * 3,
  duration: 2 + Math.random() * 3,
}));

export default function WelcomeScreen({ onSubmit }: WelcomeScreenProps) {
  const currentYear = new Date().getFullYear();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  // Refs for keyboard navigation
  const monthRef = useRef<HTMLSelectElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

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

  // Handle Enter key to move to next field or submit
  const handleKeyDown = (e: React.KeyboardEvent, nextRef?: React.RefObject<HTMLElement | null>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef?.current) {
        nextRef.current.focus();
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #0c0618 0%, #1a0f2e 25%, #16132d 50%, #0d1020 75%, #080810 100%)",
      }}
    >
      {/* Star field */}
      <div className="absolute inset-0">
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
              opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
              scale: [1, 1.3, 1],
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

      {/* Nebula effects */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          top: "-10%",
          left: "20%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          bottom: "-5%",
          right: "15%",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          top: "30%",
          right: "5%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      {/* Floating Tarot Cards - elegantly positioned */}
      {FLOATING_CARDS.map((card, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            ...card.position,
            zIndex: 1,
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: card.rotation - 30 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: card.rotation,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: card.delay },
            scale: { duration: 0.8, delay: card.delay, ease: [0.16, 1, 0.3, 1] },
            rotate: { duration: 0.8, delay: card.delay, ease: [0.16, 1, 0.3, 1] },
            y: { duration: card.floatDuration, repeat: Infinity, ease: "easeInOut", delay: card.delay + 0.5 },
          }}
        >
          <TarotCard
            design={card.design}
            color={card.color}
            rotation={0}
            scale={card.scale}
            delay={0}
          />
        </motion.div>
      ))}

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full max-w-md mx-auto px-6"
      >
        {/* Welcome text */}
        <motion.div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-violet-400"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white/60 text-xs tracking-wide">Discover Your Destiny</span>
          </motion.div>

          <motion.h1
            className="text-white text-4xl sm:text-5xl font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Welcome to
          </motion.h1>
          <motion.h2
            className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 text-4xl sm:text-5xl font-bold mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Thai Astrology
          </motion.h2>
          <motion.p
            className="text-white/40 text-sm mt-5 max-w-xs mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Enter your birthday to reveal your fortune, lucky colors, and cosmic guidance
          </motion.p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="backdrop-blur-2xl bg-white/[0.06] border border-white/[0.1] rounded-3xl p-6 shadow-2xl"
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
                  onKeyDown={(e) => handleKeyDown(e, monthRef)}
                  placeholder="15"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-transparent focus:bg-white/10 transition-all"
                  autoFocus
                />
              </div>
              <div className="flex-[2]">
                <label className="block text-white/40 text-xs uppercase tracking-wider mb-2">
                  Month
                </label>
                <select
                  ref={monthRef}
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, yearRef)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-transparent focus:bg-white/10 transition-all appearance-none cursor-pointer"
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
                ref={yearRef}
                type="number"
                min="1900"
                max={currentYear}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, submitRef)}
                placeholder="1990"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-transparent focus:bg-white/10 transition-all"
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
            ref={submitRef}
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-6 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-violet-500/30 transition-all relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-transparent"
          >
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
          transition={{ delay: 1.1 }}
          className="text-white/20 text-xs text-center mt-6"
        >
          Based on traditional Thai astrology & numerology
        </motion.p>
      </motion.div>
    </div>
  );
}
