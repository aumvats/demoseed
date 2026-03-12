"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-base font-semibold text-ds-text-primary mb-1">
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs text-ds-text-secondary hover:text-ds-destructive hover:bg-ds-destructive/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear all
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 rounded-full bg-ds-bg-tertiary flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-ds-text-secondary" />
          </div>
          <p className="text-sm text-ds-text-secondary mb-4">
            No generations yet.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-ds-accent hover:bg-ds-accent-hover text-white text-sm font-medium transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Create your first dataset
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {history.map((entry) => {
            const meta = TEMPLATE_META[entry.template] ?? {
              label: entry.template,
              icon: Users,
            };
            const Icon = meta.icon;
            return (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 rounded-lg border border-ds-border bg-ds-bg-secondary hover:border-zinc-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-md bg-ds-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-ds-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-ds-text-primary">
                        {meta.label}
                      </span>
                      <span className="text-xs">
                        {LOCALE_FLAGS[entry.locale] ?? entry.locale}
                      </span>
                      {entry.scenarios.length > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-ds-accent/10 text-ds-accent">
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
                <span className="text-xs text-ds-text-secondary shrink-0">
                  {timeAgo(entry.createdAt)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
