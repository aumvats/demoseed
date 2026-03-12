"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { useStudio } from "@/contexts/StudioContext";
import { generateDataset } from "@/lib/engine";
import { addToHistory } from "@/lib/history";
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

        await new Promise((r) => setTimeout(r, 200));
        dispatch({ type: "GENERATION_COMPLETE", dataset });

        // Save to local history
        addToHistory({
          template: fullConfig.template,
          locale: fullConfig.locale,
          recordCount: dataset.rows.length,
          scenarios: fullConfig.scenarios,
          durationMs: dataset.durationMs,
        });
      } catch (err) {
        clearInterval(progressInterval);
        const msg = err instanceof Error ? err.message : "Generation failed";
        setError(msg);
        toast.error("Generation failed", { description: msg });
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
