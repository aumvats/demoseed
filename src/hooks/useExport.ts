"use client";

import { useCallback, useRef, useState } from "react";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { toCSV } from "@/lib/engine/exporters/csv";
import { toJSON } from "@/lib/engine/exporters/json";
import { useStudio } from "@/contexts/StudioContext";
import { getTemplateFields } from "@/lib/engine";
import { getHistory } from "@/lib/history";

const FIRST_EXPORT_KEY = "demoseed:first-export-done";

export function useExport() {
  const { state } = useStudio();
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const isFirstExport = useRef(
    typeof window !== "undefined"
      ? !localStorage.getItem(FIRST_EXPORT_KEY)
      : true
  );

  const exportData = useCallback(
    async (format: "csv" | "json") => {
      if (!state.dataset) return;
      setIsExporting(true);

      const fields = getTemplateFields(state.config.template ?? "crm");
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `demoseed-${state.config.template}-${timestamp}.${format}`;

      await new Promise((r) => setTimeout(r, 500));

      if (format === "csv") {
        const csv = toCSV(state.dataset.rows, fields);
        saveAs(
          new Blob([csv], { type: "text/csv;charset=utf-8" }),
          filename
        );
      } else {
        const json = toJSON(state.dataset.rows, state.dataset.config);
        saveAs(
          new Blob([json], { type: "application/json" }),
          filename
        );
      }

      setIsExporting(false);
      setExported(true);

      // Update most recent history entry with export format
      const history = getHistory();
      if (history.length > 0) {
        history[0].exportedFormat = format;
        localStorage.setItem("demoseed:generation-history", JSON.stringify(history));
      }

      if (isFirstExport.current) {
        isFirstExport.current = false;
        localStorage.setItem(FIRST_EXPORT_KEY, "true");

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.7 },
          colors: ["#8B5CF6", "#7C3AED", "#22C55E", "#F59E0B", "#FAFAFA"],
        });

        toast.success("Your first dataset!", {
          description: `${state.dataset.rows.length.toLocaleString()} ${format.toUpperCase()} records exported.`,
        });
      } else {
        toast.success(`Exported ${state.dataset.rows.length.toLocaleString()} records`, {
          description: `Saved as ${filename}`,
        });
      }

      setTimeout(() => setExported(false), 3000);
    },
    [state.dataset, state.config.template]
  );

  return { exportData, isExporting, exported };
}
