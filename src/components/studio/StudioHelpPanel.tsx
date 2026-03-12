"use client";

import { useStudio } from "@/contexts/StudioContext";
import { LOCALES, SCENARIOS } from "@/types/engine";

export function StudioHelpPanel() {
  const { state } = useStudio();

  const scenarioCount = state.dataset?.rows.filter((r) => r._scenario).length ?? 0;
  const totalRows = state.dataset?.rows.length ?? 0;

  return (
    <div className="p-5 space-y-8">
      <div>
        <h3 className="text-[11px] font-semibold text-ds-text-tertiary uppercase tracking-[0.15em] mb-4 font-display">
          Configuration
        </h3>
        <div className="space-y-3">
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
            <span className="text-ds-text-primary font-semibold font-data text-base">
              {state.config.recordCount?.toLocaleString() ?? "—"}
            </span>
          </div>
        </div>
      </div>

      {state.config.scenarios && state.config.scenarios.length > 0 && (
        <>
          <div className="h-px bg-ds-border" />
          <div>
            <h3 className="text-[11px] font-semibold text-ds-text-tertiary uppercase tracking-[0.15em] mb-4 font-display">
              Active Scenarios
            </h3>
            <div className="space-y-2.5">
              {state.config.scenarios.map((id) => {
                const scenario = SCENARIOS[id];
                return (
                  <div
                    key={id}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
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
        </>
      )}

      {state.dataset && (
        <>
          <div className="h-px bg-ds-border" />
          <div>
            <h3 className="text-[11px] font-semibold text-ds-text-tertiary uppercase tracking-[0.15em] mb-4 font-display">
              Data Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-ds-text-secondary">Total rows</span>
                <span className="text-ds-text-primary font-semibold font-data text-base">
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
        </>
      )}

      <div className="h-px bg-ds-border" />
      <div>
        <h3 className="text-[11px] font-semibold text-ds-text-tertiary uppercase tracking-[0.15em] mb-4 font-display">
          Tips
        </h3>
        <ul className="space-y-2.5 text-xs text-ds-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-ds-accent mt-0.5">&#8226;</span>
            Click any cell to edit it inline
          </li>
          <li className="flex items-start gap-2">
            <span className="text-ds-accent mt-0.5">&#8226;</span>
            Scenario rows have a colored left border
          </li>
          <li className="flex items-start gap-2">
            <span className="text-ds-accent mt-0.5">&#8226;</span>
            Click column headers to sort
          </li>
        </ul>
      </div>
    </div>
  );
}
