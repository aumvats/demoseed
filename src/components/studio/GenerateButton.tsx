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
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        "relative h-10 px-6 rounded-xl text-sm font-semibold overflow-hidden",
        "transition-all duration-200 disabled:cursor-not-allowed",
        "bg-ds-accent hover:bg-ds-accent-hover text-[#0C0F14] glow-accent-hover",
        isLoading &&
          "animate-shimmer bg-gradient-to-r from-[#E8AF44] via-[#F5D78E] to-[#E8AF44] bg-[length:200%_100%] animate-glow-pulse"
      )}
    >
      {/* Progress bar at bottom */}
      {isLoading && (
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-[#0C0F14]/30 transition-all duration-200"
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
