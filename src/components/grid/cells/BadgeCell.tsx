import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  New: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Trial: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  Inactive: "bg-zinc-600/15 text-zinc-500 border-zinc-600/30",
  "At Risk": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Champion: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Won: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Lost: "bg-red-500/15 text-red-400 border-red-500/30",
  Prospecting: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Qualification: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Proposal: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  Negotiation: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Delivered: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Shipped: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Processing: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Returned: "bg-red-500/15 text-red-400 border-red-500/30",
  Cancelled: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  Free: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  Starter: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Pro: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Enterprise: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  // Company sizes
  "1-10": "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  "11-50": "bg-sky-500/15 text-sky-400 border-sky-500/30",
  "51-200": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "201-500": "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  "501-1000": "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "1000+": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  // Lead sources
  Website: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Referral: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  LinkedIn: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Conference: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "Cold Outreach": "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  Organic: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

export function BadgeCell({ value }: { value: string }) {
  const colorClass =
    STATUS_COLORS[value] ?? "bg-zinc-500/15 text-zinc-400 border-zinc-500/30";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border leading-none",
        colorClass
      )}
    >
      {value}
    </span>
  );
}
