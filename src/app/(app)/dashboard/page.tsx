"use client";

import Link from "next/link";
import { Sparkles, Clock, BarChart3, ArrowRight } from "lucide-react";

const QUICK_ACTIONS = [
  {
    href: "/generate",
    icon: Sparkles,
    title: "New Generation",
    description: "Create a fresh dataset from a template",
    gradient: "from-violet-500/20 to-violet-600/5",
  },
  {
    href: "/history",
    icon: Clock,
    title: "Recent Exports",
    description: "View and re-download past generations",
    gradient: "from-emerald-500/20 to-emerald-600/5",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-base font-semibold text-ds-text-primary mb-1">
        Dashboard
      </h1>
      <p className="text-sm text-ds-text-secondary mb-8">
        Welcome to DemoSeed. Generate realistic demo data in seconds.
      </p>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group relative p-5 rounded-lg border border-ds-border bg-ds-bg-secondary hover:border-zinc-600 transition-all overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <div className="relative">
                <Icon className="w-5 h-5 text-ds-accent mb-3" />
                <h3 className="text-sm font-semibold text-ds-text-primary mb-0.5 flex items-center gap-1">
                  {action.title}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-xs text-ds-text-secondary">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Usage Stats */}
      <div className="mb-10">
        <h2 className="text-xs font-semibold text-ds-text-secondary uppercase tracking-wider mb-4">
          Usage this month
        </h2>
        <div className="bg-ds-bg-secondary border border-ds-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-ds-accent" />
              <span className="text-sm text-ds-text-primary font-medium">
                Records generated
              </span>
            </div>
            <span className="text-sm text-ds-text-secondary font-data">
              0 / 500
            </span>
          </div>
          <div className="w-full h-2 bg-ds-bg-tertiary rounded-full overflow-hidden">
            <div
              className="h-full bg-ds-accent rounded-full transition-all"
              style={{ width: "0%" }}
            />
          </div>
          <p className="text-xs text-ds-text-secondary mt-2">
            Free tier: 500 records/month
          </p>
        </div>
      </div>

      {/* Recent Generations - placeholder */}
      <div>
        <h2 className="text-xs font-semibold text-ds-text-secondary uppercase tracking-wider mb-4">
          Recent Generations
        </h2>
        <div className="bg-ds-bg-secondary border border-ds-border rounded-lg p-8 text-center">
          <p className="text-sm text-ds-text-secondary">
            Your generation history will appear here after your first export.
          </p>
        </div>
      </div>
    </div>
  );
}
