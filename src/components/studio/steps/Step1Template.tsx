"use client";

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
      <h2 className="text-base font-semibold text-ds-text-primary mb-1">
        Choose a template
      </h2>
      <p className="text-sm text-ds-text-secondary mb-8">
        Each template generates realistic, related entities with proper
        referential integrity.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TEMPLATES.map((template) => {
          const isSelected = state.config.template === template.id;
          return (
            <button
              key={template.id}
              onClick={() => select(template.id)}
              className={cn(
                "relative text-left p-5 rounded-md border-2 transition-all duration-150",
                "bg-ds-bg-secondary hover:bg-ds-bg-tertiary",
                isSelected
                  ? "border-ds-accent glow-accent"
                  : "border-ds-border hover:border-zinc-600"
              )}
            >
              <div className="text-2xl mb-3">{template.icon}</div>
              <h3 className="text-sm font-semibold text-ds-text-primary mb-1">
                {template.label}
              </h3>
              <p className="text-xs text-ds-text-secondary leading-relaxed">
                {template.description}
              </p>

              <div className="flex flex-wrap gap-1 mt-3">
                {template.entities.map((e) => (
                  <span
                    key={e.key}
                    className="text-[10px] px-1.5 py-0.5 bg-ds-bg-tertiary text-ds-text-secondary rounded border border-ds-border"
                  >
                    {e.label}
                  </span>
                ))}
              </div>

              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-ds-accent flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
