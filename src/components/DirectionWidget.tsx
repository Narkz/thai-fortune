"use client";

import { motion } from "framer-motion";
import { getLuckyDirection } from "@/lib/fortune";

interface DirectionWidgetProps {
  birthday: Date;
}

export default function DirectionWidget({ birthday }: DirectionWidgetProps) {
  const { sign, direction } = getLuckyDirection(birthday);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-3xl p-6 overflow-hidden relative"
    >
      {/* Label */}
      <span className="text-white/50 text-xs uppercase tracking-wider font-medium">
        Lucky Direction
      </span>

      {/* Direction display */}
      <div className="mt-4 flex items-center gap-5">
        {/* Compass */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/20" />

          {/* Cardinal directions */}
          <span className="absolute top-0.5 left-1/2 -translate-x-1/2 text-[10px] text-white/40 font-medium">N</span>
          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[10px] text-white/40 font-medium">S</span>
          <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] text-white/40 font-medium">W</span>
          <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-white/40 font-medium">E</span>

          {/* Inner circle */}
          <div className="absolute inset-3 rounded-full bg-white/5 border border-white/10" />

          {/* Compass needle */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: direction.degrees }}
            transition={{ delay: 0.5, duration: 1.5, type: "spring", stiffness: 60 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Needle */}
            <div className="relative h-full w-1">
              <motion.div
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[16px] border-l-transparent border-r-transparent border-b-teal-400"
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[16px] border-l-transparent border-r-transparent border-t-white/30" />
            </div>
          </motion.div>

          {/* Center dot */}
          <div className="absolute w-2 h-2 rounded-full bg-teal-400 shadow-lg shadow-teal-400/50" />
        </div>

        {/* Direction info */}
        <div className="flex-1">
          <h3 className="text-white text-xl font-semibold">
            {direction.direction}
          </h3>
          <p className="text-white/50 text-sm mt-0.5">
            {direction.thai}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg">{sign.symbol}</span>
            <span className="text-white/60 text-sm">{sign.element} energy</span>
          </div>
        </div>
      </div>

      {/* Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 pt-4 border-t border-white/10"
      >
        <p className="text-white/50 text-xs leading-relaxed">
          Face {direction.direction.toLowerCase()} when making important decisions or starting new ventures today.
        </p>
      </motion.div>
    </motion.div>
  );
}
