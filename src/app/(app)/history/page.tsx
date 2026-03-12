"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Sparkles, Trash2, Users, ShoppingCart, BarChart3 } from "lucide-react";
import { getHistory, clearHistory, type HistoryEntry } from "@/lib/history";

const TEMPLATE_META: Record<string, { label: string; icon: typeof Users }> = {
  crm: { label: "CRM", icon: Users },
  ecommerce: { label: "E-commerce", icon: ShoppingCart },
  saas_analytics: { label: "SaaS Analytics", icon: BarChart3 },
};

const LOCALE_FLAGS: Record<string, string> = {
  us: "🇺🇸",
  uk: "🇬🇧",
  de: "🇩🇪",
  fr: "🇫🇷",
  ja: "🇯🇵",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center justify-between mb-10"
      >
        <div>
          <h1 className="text-2xl font-bold text-ds-text-primary font-display tracking-tight mb-1">
            Generation History
          </h1>
          <p className="text-sm text-ds-text-secondary">
            Your recent data generations.
          </p>
        </div>
        {history.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-ds-text-secondary hover:text-ds-destructive hover:bg-ds-destructive/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear all
          </button>
        )}
      </motion.div>

      {history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease }}
          className="glass-panel rounded-2xl py-16 flex flex-col items-center justify-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-ds-accent-muted flex items-center justify-center mb-5">
            <Clock className="w-7 h-7 text-ds-accent" />
          </div>
          <p className="text-sm text-ds-text-secondary mb-1">
            No generations yet
          </p>
          <p className="text-xs text-ds-text-tertiary mb-6">
            Your export history will appear here.
          </p>
          <Link
            href="/generate"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ds-accent hover:bg-ds-accent-hover text-[#0C0F14] text-sm font-semibold transition-all glow-accent-hover"
          >
            <Sparkles className="w-4 h-4" />
            Create your first dataset
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease }}
          className="space-y-3"
        >
          {history.map((entry, i) => {
            const meta = TEMPLATE_META[entry.template] ?? {
              label: entry.template,
              icon: Users,
            };
            const Icon = meta.icon;
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease }}
                className="flex items-center justify-between p-5 rounded-2xl border border-ds-border bg-ds-bg-secondary/60 hover:border-ds-border-hover transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-ds-accent-muted flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-ds-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-ds-text-primary font-display">
                        {meta.label}
                      </span>
                      <span className="text-xs">
                        {LOCALE_FLAGS[entry.locale] ?? entry.locale}
                      </span>
                      {entry.scenarios.length > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-ds-accent-muted text-ds-accent font-medium">
                          +{entry.scenarios.length} scenario
                          {entry.scenarios.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ds-text-secondary mt-0.5">
                      <span className="font-data">
                        {entry.recordCount.toLocaleString()}
                      </span>{" "}
                      records · {entry.durationMs}ms
                      {entry.exportedFormat && (
                        <> · exported as {entry.exportedFormat.toUpperCase()}</>
                      )}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-ds-text-tertiary shrink-0">
                  {timeAgo(entry.createdAt)}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
