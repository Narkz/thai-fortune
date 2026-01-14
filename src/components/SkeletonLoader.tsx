"use client";

import { motion } from "framer-motion";

export function SkeletonCard() {
  return (
    <div className="glass-card rounded-3xl p-6 overflow-hidden">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="h-3 w-24 bg-white/10 rounded-full mb-4" />

        {/* Main content skeleton */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/10 rounded-2xl" />
          <div className="flex-1">
            <div className="h-6 w-20 bg-white/10 rounded-full mb-2" />
            <div className="h-4 w-16 bg-white/5 rounded-full" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-4" />

        {/* Footer skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-3 w-16 bg-white/5 rounded-full mb-2" />
            <div className="h-4 w-20 bg-white/10 rounded-full" />
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-lg" />
        </div>
      </div>

      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        animate={{ translateX: ["100%", "-100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
        }}
      />
    </div>
  );
}

export function SkeletonHeader() {
  return (
    <div className="text-center mb-8 animate-pulse">
      <div className="h-3 w-32 bg-white/10 rounded-full mx-auto mb-3" />
      <div className="h-8 w-48 bg-white/15 rounded-full mx-auto" />
    </div>
  );
}

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-lg mx-auto px-4 py-8"
    >
      <SkeletonHeader />

      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Floating orbs animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(94,234,212,0.2) 0%, transparent 70%)",
              filter: "blur(40px)",
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
