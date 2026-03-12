"use client";

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
} from "react";
import type { StudioState, StudioAction } from "@/types/studio";
import type { GenerationConfig } from "@/types/engine";

const DEFAULT_CONFIG: Partial<GenerationConfig> = {
  template: "crm",
  locale: "us",
  recordCount: 100,
  scenarios: [],
  enabledFields: [],
};

const DEFAULT_STATE: StudioState = {
  currentStep: 1,
  direction: 1,
  config: DEFAULT_CONFIG,
  dataset: null,
  isGenerating: false,
  generationProgress: 0,
  editedCells: new Map(),
};

function studioReducer(state: StudioState, action: StudioAction): StudioState {
  switch (action.type) {
    case "SET_STEP":
      return {
        ...state,
        currentStep: action.step,
        direction: action.step > state.currentStep ? 1 : -1,
      };
    case "UPDATE_CONFIG":
      return {
        ...state,
        config: { ...state.config, ...action.patch },
      };
    case "GENERATION_START":
      return { ...state, isGenerating: true, generationProgress: 0 };
    case "GENERATION_PROGRESS":
      return { ...state, generationProgress: action.progress };
    case "GENERATION_COMPLETE":
      return {
        ...state,
        isGenerating: false,
        generationProgress: 100,
        dataset: action.dataset,
        editedCells: new Map(),
      };
    case "EDIT_CELL": {
      const newEdited = new Map(state.editedCells);
      const existing = newEdited.get(action.rowId) ?? {};
      newEdited.set(action.rowId, { ...existing, [action.field]: action.value });

      if (state.dataset) {
        const rows = state.dataset.rows.map((row) => {
          if (row._id === action.rowId) {
            return { ...row, [action.field]: action.value };
          }
          return row;
        });
        return {
          ...state,
          dataset: { ...state.dataset, rows },
          editedCells: newEdited,
        };
      }
      return { ...state, editedCells: newEdited };
    }
    case "RESET":
      return DEFAULT_STATE;
    default:
      return state;
  }
}

interface StudioContextValue {
  state: StudioState;
  dispatch: React.Dispatch<StudioAction>;
}

const StudioContext = createContext<StudioContextValue | null>(null);

export function StudioProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(studioReducer, DEFAULT_STATE);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return (
    <StudioContext.Provider value={value}>{children}</StudioContext.Provider>
  );
}

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be inside StudioProvider");
  return ctx;
}
