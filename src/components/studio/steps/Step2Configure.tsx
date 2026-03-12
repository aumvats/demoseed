"use client";

import { useStudio } from "@/contexts/StudioContext";
import { LOCALES, type LocaleCode, type RecordCount } from "@/types/engine";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const VOLUME_OPTIONS: RecordCount[] = [50, 100, 500, 1000];

const LOCALE_OPTIONS = Object.values(LOCALES);

export function Step2Configure() {
  const { state, dispatch } = useStudio();

  const goNext = () => {
    dispatch({ type: "SET_STEP", step: 3 });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-ds-text-primary mb-1 font-display">
        Configure generation
      </h2>
      <p className="text-sm text-ds-text-secondary mb-8">
        Set locale, volume, and other options for your dataset.
      </p>

      {/* Locale */}
      <div className="mb-8">
        <label className="text-[11px] font-semibold text-ds-text-tertiary uppercase tracking-[0.15em] block mb-3 font-display">
          Locale
        </label>
        <div className="flex flex-wrap gap-2">
          {LOCALE_OPTIONS.map((locale) => {
            const isSelected = state.config.locale === locale.code;
            return (
              <button
                type="button"
                key={locale.code}
                onClick={() =>
                  dispatch({
                    type: "UPDATE_CONFIG",
                    patch: { locale: locale.code as LocaleCode },
                  })
                }
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all duration-200",
                  isSelected
                    ? "border-ds-border-accent bg-ds-accent-muted text-ds-text-primary"
                    : "border-ds-border bg-ds-bg-secondary text-ds-text-secondary hover:border-ds-border-hover hover:text-ds-text-primary"
                )}
              >
                <span className="text-base">{locale.flag}</span>
                <span>{locale.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Volume */}
      <div className="mb-8">
        <label className="text-[11px] font-semibold text-ds-text-tertiary uppercase tracking-[0.15em] block mb-3 font-display">
          Number of records
        </label>
        <div className="flex gap-2">
          {VOLUME_OPTIONS.map((vol) => {
            const isSelected = state.config.recordCount === vol;
            return (
              <button
                type="button"
                key={vol}
                onClick={() =>
                  dispatch({
                    type: "UPDATE_CONFIG",
                    patch: { recordCount: vol },
                  })
                }
                className={cn(
                  "px-5 py-2.5 rounded-xl border text-sm font-data font-medium transition-all duration-200",
                  isSelected
                    ? "border-ds-border-accent bg-ds-accent-muted text-ds-text-primary"
                    : "border-ds-border bg-ds-bg-secondary text-ds-text-secondary hover:border-ds-border-hover hover:text-ds-text-primary"
                )}
              >
                {vol.toLocaleString()}
              </button>
            );
          })}
        </div>
        <div className="mt-3 px-3 py-2 rounded-lg bg-ds-bg-secondary/60 border border-ds-border inline-flex items-center gap-2">
          <span className="text-xs text-ds-text-tertiary">Est. file size:</span>
          <span className="text-xs font-data text-ds-text-secondary">
            ~{Math.round(((state.config.recordCount ?? 100) * 0.5) / 1024 * 100) / 100} MB
          </span>
        </div>
      </div>

      {/* Continue */}
      <button
        type="button"
        onClick={goNext}
        className="group h-10 px-6 rounded-xl bg-ds-accent hover:bg-ds-accent-hover text-[#0C0F14] text-sm font-semibold transition-all inline-flex items-center gap-2"
      >
        Continue to Scenarios
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
