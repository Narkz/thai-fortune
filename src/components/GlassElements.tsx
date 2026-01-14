"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface GlassElementsProps {
  accentColor?: string;
}

export default function GlassElements({ accentColor = "rgba(94, 234, 212, 0.4)" }: GlassElementsProps) {
  const { scrollY } = useScroll();

  // Parallax transforms at different speeds for depth
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -250]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Large soft orb - top right */}
      <motion.div
        style={{ y: y1 }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${accentColor} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Medium orb - bottom left */}
      <motion.div
        style={{ y: y2 }}
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at 60% 40%, ${accentColor} 0%, transparent 70%)`,
            filter: "blur(50px)",
            opacity: 0.5,
          }}
        />
      </motion.div>

      {/* Small floating orb - mid right */}
      <motion.div
        style={{ y: y3 }}
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 -right-10 w-40 h-40 rounded-full"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at 40% 40%, ${accentColor} 0%, transparent 60%)`,
            filter: "blur(30px)",
            opacity: 0.6,
          }}
        />
      </motion.div>

      {/* Tiny accent orb - floating left */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-2/3 left-8 w-24 h-24 rounded-full"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 60%)`,
            filter: "blur(20px)",
            opacity: 0.7,
          }}
        />
      </motion.div>

      {/* Extra subtle orb - center top */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-1/4 w-32 h-32 rounded-full"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)`,
            filter: "blur(25px)",
          }}
        />
      </motion.div>
    </div>
  );
}
