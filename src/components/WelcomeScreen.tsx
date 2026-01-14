"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { TarotDesign } from "./TarotCard";
import ParallaxCard from "./ParallaxCard";
import { hapticSuccess, hapticError, hapticLight } from "@/lib/haptics";

interface WelcomeScreenProps {
  onSubmit: (date: Date) => void;
}

// Card configurations - positioned to be visible but peeking
const FLOATING_CARDS: {
  design: TarotDesign;
  color: string;
  x: number; // percentage from center
  y: number; // percentage from center
  rotation: number;
  scale: number;
  delay: number;
  parallaxStrength: number;
}[] = [
  // Left side
  { design: "moon", color: "#6366f1", x: -42, y: -35, rotation: -15, scale: 0.85, delay: 0, parallaxStrength: 20 },
  { design: "lotus", color: "#ec4899", x: -45, y: 5, rotation: -22, scale: 0.8, delay: 0.15, parallaxStrength: 15 },
  { design: "zodiac", color: "#8b5cf6", x: -38, y: 40, rotation: 12, scale: 0.75, delay: 0.3, parallaxStrength: 25 },

  // Right side
  { design: "sun", color: "#f59e0b", x: 42, y: -38, rotation: 18, scale: 0.9, delay: 0.1, parallaxStrength: 18 },
  { design: "crystal", color: "#06b6d4", x: 48, y: 0, rotation: -10, scale: 0.78, delay: 0.2, parallaxStrength: 22 },
  { design: "eye", color: "#10b981", x: 40, y: 35, rotation: 15, scale: 0.82, delay: 0.25, parallaxStrength: 20 },

  // Top & bottom extras
  { design: "star", color: "#f472b6", x: -15, y: -48, rotation: 8, scale: 0.7, delay: 0.35, parallaxStrength: 30 },
  { design: "star", color: "#f97316", x: 18, y: 48, rotation: -12, scale: 0.72, delay: 0.4, parallaxStrength: 28 },
];

// Constellation points
const CONSTELLATION_POINTS = [
  { x: 15, y: 20 }, { x: 25, y: 15 }, { x: 35, y: 22 }, { x: 30, y: 35 },
  { x: 70, y: 18 }, { x: 80, y: 25 }, { x: 75, y: 35 }, { x: 85, y: 30 },
  { x: 20, y: 70 }, { x: 30, y: 75 }, { x: 25, y: 85 },
  { x: 75, y: 70 }, { x: 82, y: 78 }, { x: 70, y: 82 },
];

const CONSTELLATION_LINES = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7],
  [8, 9], [9, 10],
  [11, 12], [12, 13],
];

export default function WelcomeScreen({ onSubmit }: WelcomeScreenProps) {
  const currentYear = new Date().getFullYear();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  // Mouse position for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse movement
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Normalize to -1 to 1
      mouseX.set((clientX / innerWidth - 0.5) * 2);
      mouseY.set((clientY / innerHeight - 0.5) * 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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
      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {CONSTELLATION_LINES.map(([from, to], i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${CONSTELLATION_POINTS[from].x}%`}
            y1={`${CONSTELLATION_POINTS[from].y}%`}
            x2={`${CONSTELLATION_POINTS[to].x}%`}
            y2={`${CONSTELLATION_POINTS[to].y}%`}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
          />
        ))}
        {CONSTELLATION_POINTS.map((point, i) => (
          <motion.circle
            key={`point-${i}`}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r="2"
            fill="rgba(255,255,255,0.3)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
          />
        ))}
      </svg>

      {/* Floating Tarot Cards with parallax */}
      {FLOATING_CARDS.map((card, index) => (
        <ParallaxCard
          key={index}
          design={card.design}
          color={card.color}
          x={card.x}
          y={card.y}
          rotation={card.rotation}
          scale={card.scale}
          delay={card.delay}
          parallaxStrength={card.parallaxStrength}
          smoothMouseX={smoothMouseX}
          smoothMouseY={smoothMouseY}
        />
      ))}

      {/* Sparkle particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: `rgba(255, 255, 255, ${0.2 + Math.random() * 0.4})`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glowing orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          left: "10%",
          top: "20%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          right: "15%",
          bottom: "25%",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

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
              className="w-2 h-2 rounded-full bg-emerald-400"
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
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-6 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-violet-500/25 transition-shadow relative overflow-hidden group"
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
