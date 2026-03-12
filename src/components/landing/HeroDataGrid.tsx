"use client";

import { motion } from "framer-motion";

const SAMPLE_ROWS = [
  { name: "Sarah Chen", email: "sarah.chen@acme.co", status: "Active", statusColor: "#34D399", revenue: "$12,400" },
  { name: "Marcus Weber", email: "m.weber@techgmbh.de", status: "Trial", statusColor: "#5B9FE4", revenue: "$3,200" },
  { name: "Yuki Tanaka", email: "yuki.t@sakura.jp", status: "Champion", statusColor: "#E8AF44", revenue: "$28,900" },
  { name: "Emily Johnson", email: "ejohnson@startup.io", status: "At Risk", statusColor: "#F87171", revenue: "$8,100" },
  { name: "Jean-Pierre Dubois", email: "jp.dubois@lyon.fr", status: "Active", statusColor: "#34D399", revenue: "$45,600" },
];

const HEADERS = ["Contact", "Email", "Status", "Revenue"];

export function HeroDataGrid() {
  return (
    <div className="glass-panel rounded-2xl p-1 shadow-2xl overflow-hidden">
      {/* Mini toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-ds-border">
        <span className="text-xs text-ds-text-secondary font-data">
          CRM &middot; 1,000 rows &middot; 🇺🇸 US
        </span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-ds-success animate-pulse-subtle" />
          <span className="text-[11px] text-ds-success font-medium">Generated</span>
        </div>
      </div>

      {/* Header row */}
      <div className="grid grid-cols-[140px_170px_80px_90px] px-4 py-2 border-b border-ds-border">
        {HEADERS.map((h) => (
          <span
            key={h}
            className="text-[11px] font-medium text-ds-text-tertiary uppercase tracking-wider"
          >
            {h}
          </span>
        ))}
      </div>

      {/* Animated rows */}
      {SAMPLE_ROWS.map((row, i) => (
        <motion.div
          key={row.email}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6 + i * 0.12,
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="grid grid-cols-[140px_170px_80px_90px] px-4 py-2.5 border-b border-ds-border/50 items-center last:border-b-0"
        >
          <span className="text-[13px] text-ds-text-primary font-medium truncate">
            {row.name}
          </span>
          <span className="text-[13px] text-ds-text-secondary font-data truncate">
            {row.email}
          </span>
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-full w-fit"
            style={{
              color: row.statusColor,
              backgroundColor: `${row.statusColor}15`,
            }}
          >
            {row.status}
          </span>
          <span className="text-[13px] text-ds-text-primary font-data tabular-nums text-right">
            {row.revenue}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
