"use client";

import { motion } from "framer-motion";
import { useStudio } from "@/contexts/StudioContext";
import { TEMPLATES } from "@/lib/engine";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function Step1Template() {
  const { state, dispatch } = useStudio();

  const select = (templateId: string) => {
    dispatch({
      type: "UPDATE_CONFIG",
      patch: { template: templateId as "crm" | "ecommerce" | "saas_analytics" },
    });
    setTimeout(() => dispatch({ type: "SET_STEP", step: 2 }), 250);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold text-ds-text-primary mb-1 font-display">
        Choose a template
      </h2>
      <p className="text-sm text-ds-text-secondary mb-8">
        Each template generates realistic, related entities with proper
        referential integrity.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TEMPLATES.map((template, i) => {
          const isSelected = state.config.template === template.id;
          return (
            <motion.button
              key={template.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
              <div className="text-2xl mb-3">{template.icon}</div>
              <h3 className="text-sm font-semibold text-ds-text-primary mb-1 font-display">
                {template.label}
              </h3>
              <p className="text-xs text-ds-text-secondary leading-relaxed">
                {template.description}
              </p>

              <div className="flex flex-wrap gap-1 mt-3">
                {template.entities.map((e) => (
                  <span
                    key={e.key}
                    className="text-[10px] px-1.5 py-0.5 bg-ds-bg-tertiary text-ds-text-secondary rounded-md border border-ds-border"
                  >
                    {e.label}
                  </span>
                ))}
              </div>

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
