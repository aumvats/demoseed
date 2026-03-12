import { cn } from "@/lib/utils";

export function PercentageCell({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-ds-bg-tertiary rounded-full overflow-hidden max-w-[60px]">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            value >= 70
              ? "bg-red-500"
              : value >= 40
                ? "bg-amber-500"
                : "bg-emerald-500"
          )}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span className="text-[13px] text-ds-text-secondary font-data tabular-nums">
        {value}%
      </span>
    </div>
  );
}
