"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import BirthdayPicker from "@/components/BirthdayPicker";
import ColorWidget from "@/components/ColorWidget";
import NumberWidget from "@/components/NumberWidget";
import HoroscopeWidget from "@/components/HoroscopeWidget";
import DirectionWidget from "@/components/DirectionWidget";
import GlassElements from "@/components/GlassElements";
import HoldToReset from "@/components/HoldToReset";
import MarqueeTicker from "@/components/MarqueeTicker";
import FortuneDrawer from "@/components/FortuneDrawer";
import { formatThaiDate, getTodayColor } from "@/lib/fortune";
import { LoadingScreen } from "@/components/SkeletonLoader";

// Default background - rich teal like reference design
const DEFAULT_BG = "linear-gradient(165deg, #134e4a 0%, #0f3d3a 50%, #0a2725 100%)";
const DEFAULT_GLOW = "rgba(94, 234, 212, 0.3)";

// Custom easing curves from animations.dev blueprint
const EASE_OUT_EXPO = [0.19, 1, 0.22, 1];

// Stagger animation config with animations.dev principles
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.5,
      ease: EASE_OUT_EXPO,
    },
  },
};

export default function Home() {
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll-linked parallax
  const { scrollY } = useScroll();
  const glow1Y = useTransform(scrollY, [0, 500], [0, 150]);
  const glow2Y = useTransform(scrollY, [0, 500], [0, -100]);
  const glow3Y = useTransform(scrollY, [0, 500], [0, 75]);

  // Check for saved birthday on mount
  useEffect(() => {
    const saved = localStorage.getItem("thai-fortune-birthday");
    if (saved) {
      setBirthday(new Date(saved));
    }
    setIsLoading(false);
  }, []);

  // Get background colors based on TODAY's color (daily fortune theme)
  const { bgGradient, glowColor, bottomFade, accentHex } = useMemo(() => {
    const todayColor = getTodayColor();
    const fadeMatch = todayColor.bgGradient.match(/#[a-f0-9]{6}(?=\s*100%)/i);
    return {
      bgGradient: todayColor.bgGradient,
      glowColor: todayColor.glowColor,
      bottomFade: fadeMatch ? fadeMatch[0] : "#0a2725",
      accentHex: todayColor.hex
    };
  }, []);


  const handleBirthdaySubmit = (date: Date) => {
    localStorage.setItem("thai-fortune-birthday", date.toISOString());
    setBirthday(date);
  };

  const handleReset = () => {
    localStorage.removeItem("thai-fortune-birthday");
    setBirthday(null);
  };

  // Loading state with skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: bgGradient }}>
        <LoadingScreen />
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

      {/* 3D Glass floating elements */}
      <GlassElements accentColor={glowColor} />

      <main className="min-h-screen relative overflow-hidden noise-overlay">
        {/* Ambient background glows - with scroll parallax */}
        <motion.div
          className="ambient-glow top-[-200px] left-[-100px]"
          style={{ y: glow1Y }}
          initial={false}
          animate={{ backgroundColor: glowColor }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className="ambient-glow bottom-[-150px] right-[-100px]"
          style={{ y: glow2Y, opacity: 0.7 }}
          initial={false}
          animate={{ backgroundColor: glowColor }}
          transition={{ duration: 1.2, delay: 0.1 }}
        />
        <motion.div
          className="ambient-glow top-1/3 left-1/2 transform -translate-x-1/2"
          style={{ y: glow3Y, opacity: 0.5 }}
          initial={false}
          animate={{ backgroundColor: glowColor }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />

        {/* Content */}
        <div className="relative z-10 px-4 py-8 pb-32 min-h-screen">
          <AnimatePresence mode="wait">
            {!birthday ? (
              <motion.div
                key="picker"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="min-h-screen flex items-center justify-center"
              >
                <BirthdayPicker onSubmit={handleBirthdaySubmit} />
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={containerVariants}
                className="max-w-lg mx-auto"
              >
                {/* Header */}
                <motion.header
                  variants={itemVariants}
                  className="text-center mb-8"
                >
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
                    Your Daily Fortune
                  </p>
                  <h1 className="text-white text-3xl font-semibold">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </h1>
                </motion.header>

                {/* Widgets Grid - Staggered */}
                <motion.div variants={itemVariants}>
                  <ColorWidget birthday={birthday} />
                </motion.div>

                <motion.div variants={itemVariants} className="mt-4">
                  <NumberWidget birthday={birthday} />
                </motion.div>

                <motion.div variants={itemVariants} className="mt-4">
                  <DirectionWidget birthday={birthday} />
                </motion.div>

                <motion.div variants={itemVariants} className="mt-4">
                  <HoroscopeWidget birthday={birthday} />
                </motion.div>

                {/* Footer with Hold to Reset */}
                <motion.footer
                  variants={itemVariants}
                  className="mt-8 flex flex-col items-center gap-4"
                >
                  <p className="text-white/30 text-xs">
                    Born {formatThaiDate(birthday)}
                  </p>
                  <HoldToReset onReset={handleReset} />
                </motion.footer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fortune Drawer - pull up for details */}
        {birthday && (
          <FortuneDrawer birthday={birthday} accentColor={accentHex} />
        )}

        {/* Marquee ticker at bottom */}
        {birthday && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-12 left-0 right-0 z-10"
            style={{ background: `linear-gradient(to top, ${bottomFade} 60%, transparent)` }}
          >
            <MarqueeTicker accentColor={accentHex} />
          </motion.div>
        )}

        {/* Bottom safe area gradient */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-4 pointer-events-none z-20"
          initial={false}
          animate={{
            background: bottomFade
          }}
          transition={{ duration: 1.2 }}
        />
      </main>
    </>
  );
}
