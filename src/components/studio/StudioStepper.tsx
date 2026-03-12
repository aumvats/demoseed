"use client";

import { useStudio } from "@/contexts/StudioContext";
import { STEP_LABELS, type WizardStep } from "@/types/studio";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS: WizardStep[] = [1, 2, 3, 4, 5];

export function StudioStepper() {
  const { state, dispatch } = useStudio();

  return (
    <nav className="p-4">
      <div className="text-[11px] font-semibold text-ds-text-tertiary uppercase tracking-[0.15em] mb-8 px-3 font-display">
        Generation Studio
      </div>
      <ol className="relative">
        {STEPS.map((step, i) => {
          const isCompleted = step < state.currentStep;
          const isCurrent = step === state.currentStep;
          const isLast = i === STEPS.length - 1;

          return (
            <li key={step} className="relative">
              {/* Connector line */}
              {!isLast && (
                <div className="absolute left-[18px] top-[36px] w-[2px] h-[calc(100%-4px)]">
                  <div className="w-full h-full bg-ds-border rounded-full" />
                  {isCompleted && (
                    <div className="absolute top-0 left-0 w-full h-full bg-ds-accent rounded-full transition-all duration-500" />
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  isCompleted && dispatch({ type: "SET_STEP", step })
                }
                disabled={!isCompleted && !isCurrent}
                className={cn(
                  "flex items-center gap-3 w-full px-2 py-2.5 rounded-lg mb-1 text-left transition-all duration-200",
                  "disabled:cursor-not-allowed",
                  isCurrent && "bg-ds-accent-muted",
                  isCompleted && "hover:bg-ds-bg-tertiary cursor-pointer"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    isCompleted && "bg-ds-accent text-[#0C0F14]",
                    isCurrent &&
                      "bg-ds-accent-muted border border-ds-border-accent text-ds-accent",
                    !isCompleted &&
                      !isCurrent &&
                      "bg-ds-bg-tertiary text-ds-text-tertiary"
                  )}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : step}
                </div>

                <div>
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCurrent || isCompleted
                        ? "text-ds-text-primary"
                        : "text-ds-text-secondary"
                    )}
                  >
                    {STEP_LABELS[step]}
                  </p>
                  {isCurrent && (
                    <p className="text-[11px] text-ds-accent mt-0.5">
                      In progress
                    </p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
