"use client";

import { motion } from "framer-motion";
import { useStudio } from "@/contexts/StudioContext";
import { SCENARIOS, type ScenarioId } from "@/types/engine";
import { cn } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";

const SCENARIO_LIST = Object.values(SCENARIOS);

export function QScenarios() {
  const { state, dispatch } = useStudio();
  const activeScenarios = state.config.scenarios ?? [];

  const toggleScenario = (id: ScenarioId) => {
    const next = activeScenarios.includes(id)
      ? activeScenarios.filter((s) => s !== id)
      : [...activeScenarios, id];
    dispatch({ type: "UPDATE_CONFIG", patch: { scenarios: next } });
  };

  const advance = () => {
    dispatch({ type: "SET_STEP", step: 5 });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-3xl sm:text-4xl font-bold text-ds-text-primary font-display tracking-tight text-center mb-3"
      >
        Any special scenarios?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-base text-ds-text-secondary text-center mb-12 max-w-md"
      >
        Scenarios inject narrative arcs into your data. Optional.
      </motion.p>

      <div className="space-y-3 w-full max-w-lg mb-10">
        {SCENARIO_LIST.map((scenario, i) => {
          const isActive = activeScenarios.includes(scenario.id);
          return (
            <motion.button
              type="button"
              key={scenario.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + i * 0.06,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
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
                    <p className="text-sm text-ds-text-secondary mt-1 leading-relaxed">
                      {scenario.description}
                    </p>
                    <p className="text-xs text-ds-text-tertiary mt-1 font-data">
                      ~{scenario.defaultPercentage}% of records affected
                    </p>
                  </div>
                </div>
                {isActive && (
                  <div className="w-5 h-5 rounded-full bg-ds-accent flex items-center justify-center shrink-0 ml-3">
                    <Check className="w-3 h-3 text-[#0C0F14]" />
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex gap-3"
      >
        <button
          type="button"
          onClick={advance}
          className="group h-11 px-8 rounded-xl bg-ds-accent hover:bg-ds-accent-hover text-[#0C0F14] text-sm font-semibold transition-all inline-flex items-center gap-2"
        >
          {activeScenarios.length > 0 ? "Continue" : "Skip scenarios"}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
