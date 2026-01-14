"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import TarotCard, { TarotDesign } from "./TarotCard";

interface ParallaxCardProps {
  design: TarotDesign;
  color: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
  parallaxStrength: number;
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
}

export default function ParallaxCard({
  design,
  color,
  x,
  y,
  rotation,
  scale,
  delay,
  parallaxStrength,
  smoothMouseX,
  smoothMouseY,
}: ParallaxCardProps) {
  const parallaxX = useTransform(smoothMouseX, [-1, 1], [-parallaxStrength, parallaxStrength]);
  const parallaxY = useTransform(smoothMouseY, [-1, 1], [-parallaxStrength, parallaxStrength]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${x}%)`,
        top: `calc(50% + ${y}%)`,
        x: parallaxX,
        y: parallaxY,
        zIndex: 1,
      }}
    >
      <TarotCard
        design={design}
        color={color}
        rotation={rotation}
        scale={scale}
        delay={delay}
      />
    </motion.div>
  );
}
