"use client";

import { motion } from "framer-motion";
import { useStudio } from "@/contexts/StudioContext";
import type { RecordCount } from "@/types/engine";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const VOLUME_OPTIONS: { count: RecordCount; label: string }[] = [
  { count: 50, label: "Quick test" },
  { count: 100, label: "Demo ready" },
  { count: 500, label: "Stress test" },
  { count: 1000, label: "Full load" },
];

export function QRecords() {
  const { state, dispatch } = useStudio();

  const select = (count: RecordCount) => {
    dispatch({ type: "UPDATE_CONFIG", patch: { recordCount: count } });
    setTimeout(() => dispatch({ type: "SET_STEP", step: 4 }), 300);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-3xl sm:text-4xl font-bold text-ds-text-primary font-display tracking-tight text-center mb-3"
      >
        How much data?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-base text-ds-text-secondary text-center mb-12 max-w-md"
      >
        More records make for a more convincing demo.
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl w-full">
        {VOLUME_OPTIONS.map((option, i) => {
          const isSelected = state.config.recordCount === option.count;
          return (
            <motion.button
              key={option.count}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + i * 0.06,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -2 }}
              onClick={() => select(option.count)}
              className={cn(
                "relative flex flex-col items-center gap-2 px-6 py-8 rounded-2xl border transition-all duration-200",
                "bg-ds-bg-secondary/60 hover:bg-ds-bg-tertiary",
                isSelected
                  ? "border-ds-border-accent glow-accent"
                  : "border-ds-border hover:border-ds-border-hover"
              )}
            >
              <span className="text-4xl font-bold text-ds-text-primary font-display">
                {option.count.toLocaleString()}
              </span>
              <span className="text-sm text-ds-text-secondary">
                {option.label}
              </span>

              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-ds-accent flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#0C0F14]" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
