"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useRef, useCallback } from "react";

interface HoldToResetProps {
  onReset: () => void;
  holdDuration?: number;
}

export default function HoldToReset({ onReset, holdDuration = 1500 }: HoldToResetProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);

  const updateProgress = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const newProgress = Math.min(elapsed / holdDuration, 1);
    setProgress(newProgress);

    if (newProgress < 1) {
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    } else {
      // Completed!
      onReset();
      setIsHolding(false);
      setProgress(0);
    }
  }, [holdDuration, onReset]);

  const startHold = useCallback(() => {
    setIsHolding(true);
    startTimeRef.current = Date.now();
    animationFrameRef.current = requestAnimationFrame(updateProgress);

    controls.start({
      scale: 0.95,
      transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
    });
  }, [controls, updateProgress]);

  const endHold = useCallback(() => {
    setIsHolding(false);
    setProgress(0);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    controls.start({
      scale: 1,
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    });
  }, [controls]);

  // Circle properties
  const size = 44;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <motion.button
      animate={controls}
      onMouseDown={startHold}
      onMouseUp={endHold}
      onMouseLeave={endHold}
      onTouchStart={startHold}
      onTouchEnd={endHold}
      className="relative flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
    >
      {/* Circular progress indicator */}
      <div className="relative w-6 h-6">
        {/* Background circle */}
        <svg
          className="w-full h-full -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle - linear timing for time visualization */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={progress > 0.8 ? "#f87171" : "rgba(255, 255, 255, 0.6)"}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke 0.2s ease",
            }}
          />
        </svg>

        {/* Icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.svg
            animate={isHolding ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: holdDuration / 1000, ease: "linear" }}
            className="w-3 h-3 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </motion.svg>
        </div>
      </div>

      {/* Text */}
      <span className="text-white/40 text-xs group-hover:text-white/60 transition-colors">
        {isHolding ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={progress > 0.8 ? "text-red-400" : ""}
          >
            {progress > 0.8 ? "Release to cancel" : "Hold to reset..."}
          </motion.span>
        ) : (
          "Hold to change birthday"
        )}
      </span>

      {/* Glow effect when near completion */}
      {progress > 0.8 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-full bg-red-500/10 border border-red-500/20"
        />
      )}
    </motion.button>
  );
}
