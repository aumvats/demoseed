"use client";

import { useStudio } from "@/contexts/StudioContext";
import { LOCALES, SCENARIOS } from "@/types/engine";

export function StudioHelpPanel() {
  const { state } = useStudio();

  const scenarioCount = state.dataset?.rows.filter((r) => r._scenario).length ?? 0;
  const totalRows = state.dataset?.rows.length ?? 0;

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-xs font-semibold text-ds-text-secondary uppercase tracking-wider mb-3">
          Configuration
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-ds-text-secondary">Template</span>
            <span className="text-ds-text-primary font-medium capitalize">
              {state.config.template?.replace("_", " ") ?? "—"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ds-text-secondary">Locale</span>
            <span className="text-ds-text-primary font-medium">
              {state.config.locale
                ? `${LOCALES[state.config.locale].flag} ${LOCALES[state.config.locale].label}`
                : "—"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-ds-text-secondary">Records</span>
            <span className="text-ds-text-primary font-medium font-data">
              {state.config.recordCount?.toLocaleString() ?? "—"}
            </span>
          </div>
        </div>
      </div>

      {state.config.scenarios && state.config.scenarios.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-ds-text-secondary uppercase tracking-wider mb-3">
            Active Scenarios
          </h3>
          <div className="space-y-2">
            {state.config.scenarios.map((id) => {
              const scenario = SCENARIOS[id];
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 text-sm"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: scenario.color }}
                  />
                  <span className="text-ds-text-primary">
                    {scenario.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {state.dataset && (
        <div>
          <h3 className="text-xs font-semibold text-ds-text-secondary uppercase tracking-wider mb-3">
            Data Stats
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-ds-text-secondary">Total rows</span>
              <span className="text-ds-text-primary font-data">
                {totalRows.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ds-text-secondary">Scenario rows</span>
              <span className="text-ds-text-primary font-data">
                {scenarioCount} ({totalRows > 0 ? Math.round((scenarioCount / totalRows) * 100) : 0}%)
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ds-text-secondary">Generated in</span>
              <span className="text-ds-text-primary font-data">
                {state.dataset.durationMs}ms
              </span>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs font-semibold text-ds-text-secondary uppercase tracking-wider mb-3">
          Tips
        </h3>
        <ul className="space-y-2 text-xs text-ds-text-secondary">
          <li>Click any cell to edit it inline</li>
          <li>Scenario rows have a colored left border</li>
          <li>Click column headers to sort</li>
        </ul>
      </div>
    </div>
  );
}
