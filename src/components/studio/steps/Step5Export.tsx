"use client";

import { useExport } from "@/hooks/useExport";
import { useStudio } from "@/contexts/StudioContext";
import { cn } from "@/lib/utils";
import { Download, FileJson, FileSpreadsheet, Check } from "lucide-react";
import { useState } from "react";

type ExportFormat = "csv" | "json";

const FORMATS = [
  {
    id: "csv" as ExportFormat,
    label: "CSV",
    description: "One file per entity, UTF-8 with BOM for Excel compatibility.",
    icon: FileSpreadsheet,
    best: "Quick import to spreadsheets",
  },
  {
    id: "json" as ExportFormat,
    label: "JSON",
    description: "Nested structure preserving relationships. Pretty-printed.",
    icon: FileJson,
    best: "Frontend mock APIs, Postman",
  },
];

export function Step5Export() {
  const { state } = useStudio();
  const { exportData, isExporting, exported } = useExport();
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("csv");

  if (!state.dataset) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center">
        <p className="text-sm text-ds-text-secondary">
          No data to export. Go back to Preview and generate data first.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-ds-text-primary mb-1 font-display">
        Export your data
      </h2>
      <p className="text-sm text-ds-text-secondary mb-8">
        Choose a format and download your{" "}
        <span className="font-data text-ds-text-primary">
          {state.dataset.rows.length.toLocaleString()}
        </span>{" "}
        records.
      </p>

      {/* Format selection */}
      <div className="space-y-3 mb-8">
        {FORMATS.map((format) => {
          const isSelected = selectedFormat === format.id;
          const Icon = format.icon;
          return (
            <button
              type="button"
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              className={cn(
                "w-full text-left p-5 rounded-2xl border transition-all duration-200",
                "bg-ds-bg-secondary/60 hover:bg-ds-bg-tertiary",
                isSelected
                  ? "border-ds-border-accent"
                  : "border-ds-border hover:border-ds-border-hover"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  isSelected ? "bg-ds-accent-muted" : "bg-ds-bg-tertiary"
                )}>
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isSelected ? "text-ds-accent" : "text-ds-text-secondary"
                    )}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-ds-text-primary font-display">
                    {format.label}
                  </h3>
                  <p className="text-xs text-ds-text-secondary mt-0.5">
                    {format.description}
                  </p>
                  <p className="text-[11px] text-ds-text-tertiary mt-1">
                    Best for: {format.best}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Download button */}
      <button
        type="button"
        onClick={() => exportData(selectedFormat)}
        disabled={isExporting}
        className={cn(
          "h-11 px-7 rounded-xl text-sm font-semibold inline-flex items-center gap-2 transition-all",
          exported
            ? "bg-ds-success text-[#0C0F14]"
            : "bg-ds-accent hover:bg-ds-accent-hover text-[#0C0F14] glow-accent-hover",
          isExporting && "opacity-70 cursor-not-allowed"
        )}
      >
        {exported ? (
          <>
            <Check className="w-4 h-4 animate-export-success" />
            Downloaded!
          </>
        ) : isExporting ? (
          <>
            <Download className="w-4 h-4 animate-bounce" />
            Preparing...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download {selectedFormat.toUpperCase()}
          </>
        )}
      </button>
    </div>
  );
}
