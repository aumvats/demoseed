"use client";

import { useCallback, useRef, useState } from "react";
import { useStudio } from "@/contexts/StudioContext";
import { generateDataset } from "@/lib/engine";
import type { GenerationConfig } from "@/types/engine";

export function useGeneration() {
  const { state, dispatch } = useStudio();
  const [error, setError] = useState<string | null>(null);
  const progressRef = useRef(0);

  const generate = useCallback(
    async (config?: Partial<GenerationConfig>) => {
      setError(null);
      dispatch({ type: "GENERATION_START" });
      progressRef.current = 0;

      const fullConfig: GenerationConfig = {
        template: config?.template ?? state.config.template ?? "crm",
        locale: config?.locale ?? state.config.locale ?? "us",
        recordCount: config?.recordCount ?? state.config.recordCount ?? 100,
        scenarios: config?.scenarios ?? state.config.scenarios ?? [],
        enabledFields: config?.enabledFields ?? state.config.enabledFields ?? [],
        seed: config?.seed ?? state.config.seed,
      };

      // Simulate progress
      const progressInterval = setInterval(() => {
        progressRef.current = Math.min(progressRef.current + 8, 85);
        dispatch({
          type: "GENERATION_PROGRESS",
          progress: progressRef.current,
        });
      }, 100);

      try {
        const dataset = await generateDataset(fullConfig);
        clearInterval(progressInterval);
        dispatch({ type: "GENERATION_PROGRESS", progress: 95 });

        // Brief pause for animation feel
        await new Promise((r) => setTimeout(r, 200));
        dispatch({ type: "GENERATION_COMPLETE", dataset });
      } catch (err) {
        clearInterval(progressInterval);
        setError(
          err instanceof Error ? err.message : "Generation failed"
        );
        dispatch({ type: "GENERATION_PROGRESS", progress: 0 });
      }
    },
    [state.config, dispatch]
  );

  return {
    generate,
    isGenerating: state.isGenerating,
    progress: state.generationProgress,
    error,
  };
}
