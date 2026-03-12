"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserMenu } from "./UserMenu";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/generate", label: "Generate", icon: Sparkles },
  { href: "/history", label: "History", icon: Clock },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-4 h-14 border-b border-ds-border bg-ds-bg-secondary shrink-0">
      {/* Left: Logo + Nav Links */}
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-ds-accent to-ds-accent-hover flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-ds-text-primary font-semibold text-sm">
            DemoSeed
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "text-ds-text-primary bg-ds-bg-tertiary"
                    : "text-ds-text-secondary hover:text-ds-text-primary hover:bg-ds-bg-tertiary"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right: User Menu */}
      <UserMenu />
    </nav>
  );
}
