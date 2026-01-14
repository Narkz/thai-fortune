"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfettiProps {
  trigger: boolean;
  color?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  delay: number;
}

const PARTICLE_COLORS = [
  "#fbbf24", // amber
  "#f472b6", // pink
  "#60a5fa", // blue
  "#4ade80", // green
  "#c084fc", // purple
  "#fb923c", // orange
];

export default function Confetti({ trigger, color }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger && !show) {
      // Generate particles
      const newParticles: Particle[] = [];
      const colors = color ? [color, ...PARTICLE_COLORS.slice(0, 3)] : PARTICLE_COLORS;

      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 200 - 100, // -100 to 100
          y: -(Math.random() * 150 + 50), // -50 to -200 (upward)
          rotation: Math.random() * 720 - 360,
          scale: Math.random() * 0.5 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.3,
        });
      }

      setParticles(newParticles);
      setShow(true);

      // Clean up after animation
      setTimeout(() => {
        setShow(false);
        setParticles([]);
      }, 2000);
    }
  }, [trigger, color, show]);

  if (!show) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute left-1/2 top-1/2"
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            x: particle.x,
            y: particle.y,
            scale: particle.scale,
            rotate: particle.rotation,
            opacity: 0,
          }}
          transition={{
            duration: 1.2,
            delay: particle.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Particle shape - mix of circles and stars */}
          {particle.id % 3 === 0 ? (
            // Star shape
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill={particle.color}
            >
              <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z" />
            </svg>
          ) : particle.id % 3 === 1 ? (
            // Circle
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: particle.color }}
            />
          ) : (
            // Diamond
            <div
              className="w-3 h-3 rotate-45"
              style={{ backgroundColor: particle.color }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
