"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGeneration } from "@/hooks/useGeneration";
import { useStudio } from "@/contexts/StudioContext";

export function QGenerating() {
  const { generate, progress, isGenerating } = useGeneration();
  const { state, dispatch } = useStudio();
  const hasStarted = useRef(false);

  // Start generation on mount
  useEffect(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      generate();
    }
  }, [generate]);

  // Auto-advance when complete
  useEffect(() => {
    if (!isGenerating && progress >= 100 && state.dataset) {
      const timer = setTimeout(() => {
        dispatch({ type: "SET_STEP", step: 6 });
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, progress, state.dataset, dispatch]);

  // SVG ring math
  const size = 120;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
      >
        <svg width={size} height={size} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-ds-border/30"
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-ds-accent transition-[stroke-dashoffset] duration-200 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-ds-text-primary font-display">
            {Math.round(progress)}%
          </span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-8 text-sm text-ds-text-secondary"
      >
        Generating your dataset...
      </motion.p>
    </div>
  );
}
