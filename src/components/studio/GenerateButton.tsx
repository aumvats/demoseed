"use client";

import { Sparkles, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  progress: number;
  hasData: boolean;
}

export function GenerateButton({
  onClick,
  isLoading,
  progress,
  hasData,
}: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        "relative h-9 px-5 rounded-md text-sm font-medium text-white overflow-hidden",
        "transition-all duration-150 disabled:cursor-not-allowed",
        "bg-ds-accent hover:bg-ds-accent-hover glow-accent-hover",
        isLoading &&
          "animate-shimmer bg-gradient-to-r from-ds-accent via-violet-400 to-ds-accent bg-[length:200%_100%]"
      )}
    >
      {/* Progress bar at bottom */}
      {isLoading && (
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-violet-200/60 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      )}

      <span className="relative flex items-center gap-2">
        {isLoading ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            {hasData ? "Regenerate" : "Generate Data"}
          </>
        )}
      </span>
    </button>
  );
}
