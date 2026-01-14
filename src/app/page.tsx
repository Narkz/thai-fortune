"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BirthdayPicker from "@/components/BirthdayPicker";
import ColorWidget from "@/components/ColorWidget";
import NumberWidget from "@/components/NumberWidget";
import HoroscopeWidget from "@/components/HoroscopeWidget";
import DirectionWidget from "@/components/DirectionWidget";
import { formatThaiDate, getBirthColor } from "@/lib/fortune";

// Default background for onboarding
const DEFAULT_BG = "linear-gradient(165deg, #0d4a4e 0%, #082a2d 50%, #061f22 100%)";
const DEFAULT_GLOW = "rgba(79, 209, 197, 0.2)";

export default function Home() {
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved birthday on mount
  useEffect(() => {
    const saved = localStorage.getItem("thai-fortune-birthday");
    if (saved) {
      setBirthday(new Date(saved));
    }
    setIsLoading(false);
  }, []);

  // Get background colors based on birth color
  const { bgGradient, glowColor, bottomFade } = useMemo(() => {
    if (!birthday) {
      return {
        bgGradient: DEFAULT_BG,
        glowColor: DEFAULT_GLOW,
        bottomFade: "#061f22"
      };
    }
    const { color } = getBirthColor(birthday);
    // Extract the darkest color from the gradient for the bottom fade
    const fadeMatch = color.bgGradient.match(/#[a-f0-9]{6}(?=\s*100%)/i);
    return {
      bgGradient: color.bgGradient,
      glowColor: color.glowColor,
      bottomFade: fadeMatch ? fadeMatch[0] : "#061f22"
    };
  }, [birthday]);

  const handleBirthdaySubmit = (date: Date) => {
    localStorage.setItem("thai-fortune-birthday", date.toISOString());
    setBirthday(date);
  };

  const handleReset = () => {
    localStorage.removeItem("thai-fortune-birthday");
    setBirthday(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: DEFAULT_BG }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      {/* Animated background */}
      <motion.div
        className="fixed inset-0 -z-10"
        initial={false}
        animate={{ background: bgGradient }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      />

      <main className="min-h-screen relative overflow-hidden">
        {/* Ambient background glows - animated with birth color */}
        <motion.div
          className="ambient-glow top-[-200px] left-[-100px]"
          initial={false}
          animate={{ backgroundColor: glowColor }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className="ambient-glow bottom-[-150px] right-[-100px]"
          initial={false}
          animate={{ backgroundColor: glowColor }}
          transition={{ duration: 1.2, delay: 0.1 }}
          style={{ opacity: 0.7 }}
        />
        <motion.div
          className="ambient-glow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={false}
          animate={{ backgroundColor: glowColor }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{ opacity: 0.5 }}
        />

        {/* Content */}
        <div className="relative z-10 px-4 py-8 pb-20 min-h-screen">
          <AnimatePresence mode="wait">
            {!birthday ? (
              <motion.div
                key="picker"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="min-h-screen flex items-center justify-center"
              >
                <BirthdayPicker onSubmit={handleBirthdaySubmit} />
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-lg mx-auto"
              >
                {/* Header */}
                <motion.header
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/40 text-xs uppercase tracking-widest mb-2"
                  >
                    Your Daily Fortune
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white text-3xl font-semibold"
                  >
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </motion.h1>
                </motion.header>

                {/* Widgets Grid */}
                <div className="space-y-4">
                  {/* Color Widget - Full width, featured */}
                  <ColorWidget birthday={birthday} />

                  {/* Two column layout for smaller widgets */}
                  <div className="grid grid-cols-1 gap-4">
                    <NumberWidget birthday={birthday} />
                    <DirectionWidget birthday={birthday} />
                  </div>

                  {/* Horoscope - Full width */}
                  <HoroscopeWidget birthday={birthday} />
                </div>

                {/* Footer */}
                <motion.footer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 text-center"
                >
                  <p className="text-white/30 text-xs mb-3">
                    Born {formatThaiDate(birthday)}
                  </p>
                  <button
                    onClick={handleReset}
                    className="text-white/40 text-xs hover:text-white/60 transition-colors underline underline-offset-2"
                  >
                    Change birthday
                  </button>
                </motion.footer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom safe area gradient - animated to match background */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-20 pointer-events-none z-20"
          initial={false}
          animate={{
            background: `linear-gradient(to top, ${bottomFade}, transparent)`
          }}
          transition={{ duration: 1.2 }}
        />
      </main>
    </>
  );
}
