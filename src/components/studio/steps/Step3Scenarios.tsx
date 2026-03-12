"use client";

import { useStudio } from "@/contexts/StudioContext";
import { SCENARIOS, type ScenarioId } from "@/types/engine";
import { cn } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";

const SCENARIO_LIST = Object.values(SCENARIOS);

export function Step3Scenarios() {
  const { state, dispatch } = useStudio();
  const activeScenarios = state.config.scenarios ?? [];

  const toggleScenario = (id: ScenarioId) => {
    const next = activeScenarios.includes(id)
      ? activeScenarios.filter((s) => s !== id)
      : [...activeScenarios, id];
    dispatch({ type: "UPDATE_CONFIG", patch: { scenarios: next } });
  };

  const goNext = () => {
    dispatch({ type: "SET_STEP", step: 4 });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-ds-text-primary mb-1 font-display">
        Apply scenarios
      </h2>
      <p className="text-sm text-ds-text-secondary mb-2">
        Scenarios inject narrative arcs into your data. Toggle one or both.
      </p>
      <p className="text-xs text-ds-text-tertiary mb-8">
        You can also skip this step — scenarios are optional.
      </p>

      <div className="space-y-3 mb-8">
        {SCENARIO_LIST.map((scenario) => {
          const isActive = activeScenarios.includes(scenario.id);
          return (
            <button
              type="button"
              key={scenario.id}
              onClick={() => toggleScenario(scenario.id)}
              className={cn(
                "w-full text-left p-5 rounded-2xl border transition-all duration-200",
                "bg-ds-bg-secondary/60 hover:bg-ds-bg-tertiary",
                isActive
                  ? "border-ds-border-accent"
                  : "border-ds-border hover:border-ds-border-hover"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shrink-0 mt-0.5"
                    style={{ backgroundColor: scenario.color }}
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-ds-text-primary font-display">
                      {scenario.label}
                    </h3>
                    <p className="text-xs text-ds-text-secondary mt-1 leading-relaxed">
                      {scenario.description}
                    </p>
                    <p className="text-[11px] text-ds-text-tertiary mt-1 font-data">
                      ~{scenario.defaultPercentage}% of records affected
                    </p>
                  </div>
                </div>
                {isActive && (
                  <div className="w-5 h-5 rounded-full bg-ds-accent flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-[#0C0F14]" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={goNext}
          className="group h-10 px-6 rounded-xl bg-ds-accent hover:bg-ds-accent-hover text-[#0C0F14] text-sm font-semibold transition-all inline-flex items-center gap-2"
        >
          Continue to Preview
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="h-10 px-6 rounded-xl glass-panel text-ds-text-primary text-sm font-medium transition-all hover:bg-ds-bg-elevated/60"
        >
          Skip scenarios
        </button>
      </div>
    </div>
  );
}
