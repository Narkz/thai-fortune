"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface GlassElementsProps {
  accentColor?: string;
}

export default function GlassElements({ accentColor = "rgba(94, 234, 212, 0.15)" }: GlassElementsProps) {
  const { scrollY } = useScroll();

  // Parallax transforms at different speeds for depth
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -350]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -150]);
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 45]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -30]);
  const rotate3 = useTransform(scrollY, [0, 1000], [15, -25]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Large glass torus/ring - top right */}
      <motion.div
        style={{ y: y1, rotateX: rotate1, rotateY: rotate2 }}
        className="absolute -top-20 -right-32 w-80 h-80"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `
              radial-gradient(ellipse 50% 50% at 30% 30%,
                rgba(255, 255, 255, 0.25) 0%,
                transparent 70%
              ),
              radial-gradient(ellipse 80% 80% at 70% 70%,
                ${accentColor} 0%,
                transparent 50%
              )
            `,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: `
              inset 0 0 60px rgba(255, 255, 255, 0.1),
              0 20px 60px rgba(0, 0, 0, 0.3)
            `,
            transform: "perspective(800px) rotateX(60deg)",
            backdropFilter: "blur(2px)",
          }}
        />
        {/* Inner ring cutout effect */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
          style={{
            background: "transparent",
            boxShadow: `
              inset 0 0 30px rgba(0, 0, 0, 0.5),
              0 0 20px rgba(0, 0, 0, 0.3)
            `,
          }}
        />
      </motion.div>

      {/* Medium glass sphere - bottom left */}
      <motion.div
        style={{ y: y2, rotate: rotate3 }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-10 -left-20 w-64 h-64"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `
              radial-gradient(ellipse 40% 40% at 30% 25%,
                rgba(255, 255, 255, 0.4) 0%,
                transparent 50%
              ),
              radial-gradient(ellipse 100% 100% at 50% 50%,
                rgba(255, 255, 255, 0.05) 0%,
                rgba(0, 0, 0, 0.1) 100%
              )
            `,
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: `
              inset -20px -20px 40px rgba(255, 255, 255, 0.05),
              inset 20px 20px 40px rgba(0, 0, 0, 0.1),
              0 30px 60px rgba(0, 0, 0, 0.4)
            `,
            backdropFilter: "blur(4px)",
          }}
        />
      </motion.div>

      {/* Small floating glass pill - mid right */}
      <motion.div
        style={{ y: y3 }}
        animate={{
          y: [0, 15, 0],
          rotateZ: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 -right-8 w-24 h-48"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `
              linear-gradient(145deg,
                rgba(255, 255, 255, 0.15) 0%,
                rgba(255, 255, 255, 0.05) 50%,
                rgba(0, 0, 0, 0.1) 100%
              )
            `,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: `
              inset 0 0 30px rgba(255, 255, 255, 0.1),
              0 15px 40px rgba(0, 0, 0, 0.3)
            `,
            backdropFilter: "blur(3px)",
          }}
        />
      </motion.div>

      {/* Tiny accent sphere - floating */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-2/3 left-1/4 w-16 h-16"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `
              radial-gradient(ellipse 40% 40% at 35% 30%,
                rgba(255, 255, 255, 0.5) 0%,
                transparent 50%
              ),
              radial-gradient(circle at 50% 50%,
                ${accentColor} 0%,
                transparent 70%
              )
            `,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: `
              0 10px 30px rgba(0, 0, 0, 0.3),
              inset 0 0 20px rgba(255, 255, 255, 0.1)
            `,
          }}
        />
      </motion.div>

      {/* Glass disc - bottom right */}
      <motion.div
        style={{ y: y1 }}
        animate={{
          rotateX: [60, 65, 60],
          rotateY: [0, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 -right-24 w-48 h-48"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `
              linear-gradient(135deg,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 60%
              )
            `,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: `
              0 20px 50px rgba(0, 0, 0, 0.3)
            `,
            transform: "perspective(500px) rotateX(60deg)",
            backdropFilter: "blur(2px)",
          }}
        />
      </motion.div>
    </div>
  );
}
