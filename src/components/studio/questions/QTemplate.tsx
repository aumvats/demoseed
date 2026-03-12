"use client";

import { motion } from "framer-motion";
import { useStudio } from "@/contexts/StudioContext";
import { TEMPLATES } from "@/lib/engine";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function QTemplate() {
  const { state, dispatch } = useStudio();

  const select = (templateId: string) => {
    dispatch({
      type: "UPDATE_CONFIG",
      patch: { template: templateId as "crm" | "ecommerce" | "saas_analytics" },
    });
    setTimeout(() => dispatch({ type: "SET_STEP", step: 2 }), 300);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-3xl sm:text-4xl font-bold text-ds-text-primary font-display tracking-tight text-center mb-3"
      >
        What are you building?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-base text-ds-text-secondary text-center mb-12 max-w-md"
      >
        Choose a template for your demo dataset.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
        {TEMPLATES.map((template, i) => {
          const isSelected = state.config.template === template.id;
          return (
            <motion.button
              key={template.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + i * 0.08,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -2 }}
              onClick={() => select(template.id)}
              className={cn(
                "relative text-left p-6 rounded-2xl border transition-all duration-200",
                "bg-ds-bg-secondary/60 hover:bg-ds-bg-tertiary",
                isSelected
                  ? "border-ds-border-accent glow-accent"
                  : "border-ds-border hover:border-ds-border-hover"
              )}
            >
              <div className="text-3xl mb-4">{template.icon}</div>
              <h3 className="text-base font-semibold text-ds-text-primary mb-1.5 font-display">
                {template.label}
              </h3>
              <p className="text-sm text-ds-text-secondary leading-relaxed">
                {template.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {template.entities.map((e) => (
                  <span
                    key={e.key}
                    className="text-[11px] px-2 py-0.5 bg-ds-bg-tertiary text-ds-text-secondary rounded-md border border-ds-border"
                  >
                    {e.label}
                  </span>
                ))}
              </div>

              {isSelected && (
                <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-ds-accent flex items-center justify-center">
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
