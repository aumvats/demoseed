import type { GenerationConfig, GeneratedDataset } from "./engine";

export type WizardStep = 1 | 2 | 3 | 4 | 5;

export const STEP_LABELS: Record<WizardStep, string> = {
  1: "Template",
  2: "Configure",
  3: "Scenarios",
  4: "Preview",
  5: "Export",
};

export interface StudioState {
  currentStep: WizardStep;
  config: Partial<GenerationConfig>;
  dataset: GeneratedDataset | null;
  isGenerating: boolean;
  generationProgress: number;
  editedCells: Map<string, Record<string, unknown>>;
}

export type StudioAction =
  | { type: "SET_STEP"; step: WizardStep }
  | { type: "UPDATE_CONFIG"; patch: Partial<GenerationConfig> }
  | { type: "GENERATION_START" }
  | { type: "GENERATION_PROGRESS"; progress: number }
  | { type: "GENERATION_COMPLETE"; dataset: GeneratedDataset }
  | { type: "EDIT_CELL"; rowId: string; field: string; value: unknown }
  | { type: "RESET" };
