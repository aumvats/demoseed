"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Download, RefreshCw, Home, Plus } from "lucide-react";
import Link from "next/link";
import { useStudio } from "@/contexts/StudioContext";
import { useGeneration } from "@/hooks/useGeneration";
import { useExport } from "@/hooks/useExport";
import { getTemplateFields, getTemplateById } from "@/lib/engine";
import { DataGrid } from "@/components/grid/DataGrid";

export function QResults() {
  const { state, dispatch } = useStudio();
  const { generate, isGenerating } = useGeneration();
  const { exportData, isExporting } = useExport();

  const template = state.config.template ?? "crm";
  const templateDef = getTemplateById(template);
  const fields = useMemo(() => getTemplateFields(template), [template]);

  const rows = state.dataset?.rows ?? [];

  const handleCellEdit = (rowId: string, field: string, value: unknown) => {
    dispatch({ type: "EDIT_CELL", rowId, field, value });
  };

  const handleRegenerate = () => {
    dispatch({ type: "SET_STEP", step: 5 });
    setTimeout(() => generate(), 100);
  };

  const handleNew = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-ds-border bg-ds-bg-secondary/60 backdrop-blur-sm shrink-0"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-ds-text-primary font-display">
            {templateDef.label}
          </span>
          <span className="text-xs text-ds-text-tertiary font-data">
            {rows.length.toLocaleString()} rows
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-ds-text-secondary hover:text-ds-text-primary hover:bg-ds-bg-tertiary transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
            Regenerate
          </button>

          <button
            type="button"
            onClick={() => exportData("csv")}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-ds-text-secondary hover:text-ds-text-primary hover:bg-ds-bg-tertiary transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            CSV
          </button>

          <button
            type="button"
            onClick={() => exportData("json")}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-ds-text-secondary hover:text-ds-text-primary hover:bg-ds-bg-tertiary transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            JSON
          </button>

          <div className="w-px h-4 bg-ds-border mx-1" />

          <button
            type="button"
            onClick={handleNew}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-ds-text-secondary hover:text-ds-text-primary hover:bg-ds-bg-tertiary transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            New
          </button>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-ds-text-secondary hover:text-ds-text-primary hover:bg-ds-bg-tertiary transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
        </div>
      </motion.div>

      {/* Data Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex-1 p-4 sm:p-6 min-h-0 overflow-hidden"
      >
        <div className="h-full">
          <DataGrid
            rows={rows}
            fields={fields}
            isAnimating={false}
            onCellEdit={handleCellEdit}
          />
        </div>
      </motion.div>
    </div>
  );
}
