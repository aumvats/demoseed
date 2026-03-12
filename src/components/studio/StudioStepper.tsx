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
      <div className="text-[11px] font-semibold text-ds-text-secondary uppercase tracking-widest mb-6 px-2">
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
                    <div className="absolute top-0 left-0 w-full h-full bg-ds-accent rounded-full" />
                  )}
                </div>
              )}

              <button
                onClick={() =>
                  isCompleted && dispatch({ type: "SET_STEP", step })
                }
                disabled={!isCompleted && !isCurrent}
                className={cn(
                  "flex items-center gap-3 w-full px-2 py-2.5 rounded-md mb-1 text-left transition-colors",
                  "disabled:cursor-not-allowed",
                  isCurrent && "bg-ds-accent/10",
                  isCompleted && "hover:bg-ds-bg-tertiary cursor-pointer"
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-200",
                    isCompleted && "bg-ds-accent border-ds-accent text-white",
                    isCurrent &&
                      "bg-ds-bg-tertiary border-ds-accent text-ds-accent",
                    !isCompleted &&
                      !isCurrent &&
                      "bg-ds-bg-tertiary border-ds-border text-ds-text-secondary"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step}
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
