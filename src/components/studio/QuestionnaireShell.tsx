"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useStudio } from "@/contexts/StudioContext";
import { QTemplate } from "./questions/QTemplate";
import { QLocale } from "./questions/QLocale";
import { QRecords } from "./questions/QRecords";
import { QScenarios } from "./questions/QScenarios";
import { QGenerating } from "./questions/QGenerating";
import { QResults } from "./questions/QResults";

const TOTAL_STEPS = 6;

const stepVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 40 : -20,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -20 : 40,
    opacity: 0,
  }),
};

function StepContent({ step }: { step: number }) {
  switch (step) {
    case 1:
      return <QTemplate />;
    case 2:
      return <QLocale />;
    case 3:
      return <QRecords />;
    case 4:
      return <QScenarios />;
    case 5:
      return <QGenerating />;
    case 6:
      return <QResults />;
    default:
      return null;
  }
}

export function QuestionnaireShell() {
  const { state, dispatch } = useStudio();
  const { currentStep, direction } = state;

  const showBack = currentStep >= 2 && currentStep <= 4;
  const progressWidth = `${(currentStep / TOTAL_STEPS) * 100}%`;

  return (
    <div className="min-h-dvh flex flex-col relative">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-ds-border/30 z-50">
        <motion.div
          className="h-full bg-ds-accent"
          initial={false}
          animate={{ width: progressWidth }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* Back button */}
      {showBack && (
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() =>
            dispatch({
              type: "SET_STEP",
              step: (currentStep - 1) as 1 | 2 | 3 | 4 | 5 | 6,
            })
          }
          className="fixed top-6 left-6 z-40 flex items-center gap-2 text-sm text-ds-text-secondary hover:text-ds-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </motion.button>
      )}

      {/* Step content */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-1 flex flex-col"
          >
            <StepContent step={currentStep} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
