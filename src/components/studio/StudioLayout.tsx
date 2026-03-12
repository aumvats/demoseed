"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useStudio } from "@/contexts/StudioContext";
import { StudioStepper } from "./StudioStepper";
import { StudioHelpPanel } from "./StudioHelpPanel";
import { Step1Template } from "./steps/Step1Template";
import { Step2Configure } from "./steps/Step2Configure";
import { Step3Scenarios } from "./steps/Step3Scenarios";
import { Step4Preview } from "./steps/Step4Preview";
import { Step5Export } from "./steps/Step5Export";

const STEP_COMPONENTS = {
  1: Step1Template,
  2: Step2Configure,
  3: Step3Scenarios,
  4: Step4Preview,
  5: Step5Export,
};

export function StudioLayout() {
  const { state } = useStudio();
  const StepContent = STEP_COMPONENTS[state.currentStep];

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left panel — stepper */}
      <aside className="w-[260px] shrink-0 border-r border-ds-border bg-ds-bg-secondary overflow-y-auto hidden md:block">
        <StudioStepper />
      </aside>

      {/* Center panel — step content with animated transitions */}
      <main className="flex-1 overflow-y-auto bg-ds-bg-primary">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentStep}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <StepContent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Right panel — contextual help */}
      <aside className="w-[320px] shrink-0 border-l border-ds-border bg-ds-bg-secondary overflow-y-auto hidden lg:block">
        <StudioHelpPanel />
      </aside>
    </div>
  );
}
