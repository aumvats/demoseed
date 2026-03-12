"use client";

import { useCallback, useState } from "react";
import { saveAs } from "file-saver";
import { toCSV } from "@/lib/engine/exporters/csv";
import { toJSON } from "@/lib/engine/exporters/json";
import { useStudio } from "@/contexts/StudioContext";
import { getTemplateFields } from "@/lib/engine";

export function useExport() {
  const { state } = useStudio();
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const exportData = useCallback(
    async (format: "csv" | "json") => {
      if (!state.dataset) return;
      setIsExporting(true);

      const fields = getTemplateFields(state.config.template ?? "crm");
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `demoseed-${state.config.template}-${timestamp}.${format}`;

      // Brief delay for progress animation feel
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
      setTimeout(() => setExported(false), 3000);
    },
    [state.dataset, state.config.template]
  );

  return { exportData, isExporting, exported };
}
