"use client";

import { useStudio } from "@/contexts/StudioContext";
import { LOCALES, type LocaleCode, type RecordCount } from "@/types/engine";
import { cn } from "@/lib/utils";

const VOLUME_OPTIONS: RecordCount[] = [50, 100, 500, 1000];

const LOCALE_OPTIONS = Object.values(LOCALES);

export function Step2Configure() {
  const { state, dispatch } = useStudio();

  const goNext = () => {
    dispatch({ type: "SET_STEP", step: 3 });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-base font-semibold text-ds-text-primary mb-1">
        Configure generation
      </h2>
      <p className="text-sm text-ds-text-secondary mb-8">
        Set locale, volume, and other options for your dataset.
      </p>

      {/* Locale */}
      <div className="mb-8">
        <label className="text-xs font-semibold text-ds-text-secondary uppercase tracking-wider block mb-3">
          Locale
        </label>
        <div className="flex flex-wrap gap-2">
          {LOCALE_OPTIONS.map((locale) => {
            const isSelected = state.config.locale === locale.code;
            return (
              <button
                key={locale.code}
                onClick={() =>
                  dispatch({
                    type: "UPDATE_CONFIG",
                    patch: { locale: locale.code as LocaleCode },
                  })
                }
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md border text-sm transition-all",
                  isSelected
                    ? "border-ds-accent bg-ds-accent/10 text-ds-text-primary"
                    : "border-ds-border bg-ds-bg-secondary text-ds-text-secondary hover:border-zinc-600 hover:text-ds-text-primary"
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
        <label className="text-xs font-semibold text-ds-text-secondary uppercase tracking-wider block mb-3">
          Number of records
        </label>
        <div className="flex gap-2">
          {VOLUME_OPTIONS.map((vol) => {
            const isSelected = state.config.recordCount === vol;
            return (
              <button
                key={vol}
                onClick={() =>
                  dispatch({
                    type: "UPDATE_CONFIG",
                    patch: { recordCount: vol },
                  })
                }
                className={cn(
                  "px-5 py-2.5 rounded-md border text-sm font-data font-medium transition-all",
                  isSelected
                    ? "border-ds-accent bg-ds-accent/10 text-ds-text-primary"
                    : "border-ds-border bg-ds-bg-secondary text-ds-text-secondary hover:border-zinc-600 hover:text-ds-text-primary"
                )}
              >
                {vol.toLocaleString()}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-ds-text-secondary mt-2">
          Estimated file size:{" "}
          <span className="font-data">
            ~{Math.round(((state.config.recordCount ?? 100) * 0.5) / 1024 * 100) / 100} MB
          </span>
        </p>
      </div>

      {/* Continue */}
      <button
        onClick={goNext}
        className="h-9 px-6 rounded-md bg-ds-accent hover:bg-ds-accent-hover text-white text-sm font-medium transition-colors"
      >
        Continue to Scenarios
      </button>
    </div>
  );
}
