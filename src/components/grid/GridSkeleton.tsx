"use client";

import { cn } from "@/lib/utils";

const SKELETON_COLS = 6;
const SKELETON_ROWS = 12;

function SkeletonCell({ wide }: { wide?: boolean }) {
  return (
    <div
      className={cn(
        "h-3 rounded-sm bg-ds-bg-tertiary animate-pulse-subtle",
        wide ? "w-32" : "w-16"
      )}
    />
  );
}

export function GridSkeleton() {
  return (
    <div className="w-full h-full overflow-hidden rounded-xl border border-ds-border">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 h-10 bg-ds-bg-secondary border-b border-ds-border">
        {Array.from({ length: SKELETON_COLS }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2.5 rounded-sm bg-ds-bg-tertiary animate-pulse-subtle",
              i === 0 ? "w-24" : "w-16"
            )}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: SKELETON_ROWS }).map((_, row) => (
        <div
          key={row}
          className="flex items-center gap-4 px-4 h-11 border-b border-ds-border/50"
          style={{ animationDelay: `${row * 50}ms` }}
        >
          {/* Avatar placeholder */}
          <div className="flex items-center gap-2 w-32 shrink-0">
            <div className="w-7 h-7 rounded-full bg-ds-bg-tertiary animate-pulse-subtle" />
            <SkeletonCell wide />
          </div>
          {Array.from({ length: SKELETON_COLS - 1 }).map((_, col) => (
            <SkeletonCell key={col} wide={col === 0} />
          ))}
        </div>
      ))}
    </div>
  );
}
