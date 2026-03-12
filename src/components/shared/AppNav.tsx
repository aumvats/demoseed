"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Sparkles, Clock, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/generate", label: "Generate", icon: Sparkles },
  { href: "/history", label: "History", icon: Clock },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-5 h-12 glass-panel-strong sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E8AF44] to-[#D49A2E] flex items-center justify-center shadow-sm">
            <span className="text-[#0C0F14] font-bold text-sm font-display">D</span>
          </div>
          <span className="text-ds-text-primary font-semibold text-[15px] tracking-tight font-display">
            DemoSeed
          </span>
        </Link>

        <div className="flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link key={href} href={href}>
                <motion.div
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "text-ds-text-primary"
                      : "text-ds-text-secondary hover:text-ds-text-primary"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-ds-bg-tertiary rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-ds-text-tertiary hover:text-ds-text-secondary bg-ds-bg-tertiary/50 border border-ds-border transition-colors cursor-pointer"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="ml-1 text-[10px] font-data px-1.5 py-0.5 rounded bg-ds-bg-primary/50 border border-ds-border">
          ⌘K
        </kbd>
      </button>
    </nav>
  );
}
