"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Clock, ArrowRight } from "lucide-react";

const QUICK_ACTIONS = [
  {
    href: "/generate",
    icon: Sparkles,
    title: "New Generation",
    description: "Create a fresh dataset from a template",
    gradient: "from-[#E8AF44]/10 to-transparent",
  },
  {
    href: "/history",
    icon: Clock,
    title: "Recent Exports",
    description: "View and re-download past generations",
    gradient: "from-[#34D399]/10 to-transparent",
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function UsageRing({ used, total }: { used: number; total: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? used / total : 0;
  const offset = circumference - progress * circumference;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0">
      {/* Background ring */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="8"
      />
      {/* Progress ring */}
      <motion.circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="#E8AF44"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        transform="rotate(-90 50 50)"
      />
      {/* Center text */}
      <text
        x="50"
        y="48"
        textAnchor="middle"
        className="fill-ds-text-primary text-lg font-bold font-display"
        fontSize="18"
        fontWeight="700"
      >
        {used}
      </text>
      <text
        x="50"
        y="62"
        textAnchor="middle"
        className="fill-ds-text-tertiary text-[10px]"
        fontSize="10"
      >
        / {total}
      </text>
    </svg>
  );
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function DashboardPage() {
  const greeting = getGreeting();

  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <h1 className="text-2xl font-bold text-ds-text-primary font-display tracking-tight mb-1">
          {greeting}
        </h1>
        <p className="text-sm text-ds-text-secondary mb-10">
          Generate realistic demo data in seconds.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12"
      >
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.href} href={action.href}>
              <motion.div
                whileHover={{ y: -2, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative p-6 rounded-2xl glass-panel hover:border-ds-border-hover transition-all overflow-hidden cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-ds-accent-muted flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-ds-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-ds-text-primary mb-1 flex items-center gap-2 font-display">
                    {action.title}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-sm text-ds-text-secondary">
                    {action.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>

      {/* Usage Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease }}
        className="mb-12"
      >
        <h2 className="text-xs font-semibold text-ds-text-tertiary uppercase tracking-[0.15em] mb-4 font-display">
          Usage this month
        </h2>
        <div className="glass-panel rounded-2xl p-6 flex items-center gap-8">
          <UsageRing used={0} total={500} />
          <div>
            <p className="text-2xl font-bold text-ds-text-primary font-data tabular-nums">
              0 / 500
            </p>
            <p className="text-sm text-ds-text-secondary mt-1">
              records generated
            </p>
            <p className="text-xs text-ds-text-tertiary mt-2">
              Free tier resets monthly
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recent Generations */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease }}
      >
        <h2 className="text-xs font-semibold text-ds-text-tertiary uppercase tracking-[0.15em] mb-4 font-display">
          Recent Generations
        </h2>
        <div className="glass-panel rounded-2xl p-10 text-center">
          <div className="w-12 h-12 rounded-xl bg-ds-accent-muted flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-ds-accent" />
          </div>
          <p className="text-sm text-ds-text-secondary mb-1">
            No generations yet
          </p>
          <p className="text-xs text-ds-text-tertiary">
            Your generation history will appear here after your first export.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
