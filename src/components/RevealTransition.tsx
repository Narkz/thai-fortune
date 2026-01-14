"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RevealTransitionProps {
  onComplete: () => void;
}

// Mystical symbols to cycle through
const SYMBOLS = ["✧", "☽", "★", "✦", "◇", "☆"];

export default function RevealTransition({ onComplete }: RevealTransitionProps) {
  const [currentSymbol, setCurrentSymbol] = useState(0);
  const [phase, setPhase] = useState<"reading" | "revealing" | "done">("reading");

  useEffect(() => {
    // Cycle through symbols
    const symbolInterval = setInterval(() => {
      setCurrentSymbol((prev) => (prev + 1) % SYMBOLS.length);
    }, 200);

    // Progress through phases
    const phaseTimer = setTimeout(() => {
      setPhase("revealing");

      setTimeout(() => {
        setPhase("done");
        setTimeout(onComplete, 500);
      }, 1500);
    }, 2000);

    return () => {
      clearInterval(symbolInterval);
      clearTimeout(phaseTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #0c0618 0%, #1a0f2e 50%, #080810 100%)",
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "done" ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Rotating constellation ring */}
      <motion.div
        className="absolute w-64 h-64"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-violet-400/40"
            style={{
              left: "50%",
              top: "50%",
              transform: `rotate(${i * 30}deg) translateY(-120px)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Inner pulsing ring */}
      <motion.div
        className="absolute w-32 h-32 rounded-full border border-violet-500/30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Center content */}
      <div className="relative z-10 text-center">
        {/* Cycling symbol */}
        <motion.div
          className="text-6xl mb-6"
          key={currentSymbol}
          initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <span className="text-violet-400">{SYMBOLS[currentSymbol]}</span>
        </motion.div>

        {/* Text */}
        <motion.p
          className="text-white/60 text-sm tracking-widest uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {phase === "reading" ? "Reading your stars..." : "Revealing your fortune..."}
        </motion.p>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-violet-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>

      {/* Particle burst on reveal phase */}
      {phase === "revealing" && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-violet-400"
              style={{
                left: "50%",
                top: "50%",
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * 18 * Math.PI) / 180) * (100 + Math.random() * 100),
                y: Math.sin((i * 18 * Math.PI) / 180) * (100 + Math.random() * 100),
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.03,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}
