"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Sparkles,
  LayoutDashboard,
  Clock,
  Download,
  Globe,
  BarChart3,
  ShoppingCart,
  Users,
} from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runAction = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg bg-ds-bg-secondary border border-ds-border rounded-lg shadow-2xl overflow-hidden">
        <Command.Input
          placeholder="Type a command or search..."
          className="w-full h-12 px-4 bg-transparent text-sm text-ds-text-primary placeholder:text-ds-text-secondary border-b border-ds-border outline-none"
        />

        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="px-4 py-8 text-center text-sm text-ds-text-secondary">
            No results found.
          </Command.Empty>

          <Command.Group
            heading="Navigation"
            className="text-[11px] uppercase tracking-wider text-ds-text-secondary px-2 py-1.5"
          >
            <CommandItem
              icon={LayoutDashboard}
              onSelect={() => runAction(() => router.push("/dashboard"))}
            >
              Go to Dashboard
            </CommandItem>
            <CommandItem
              icon={Sparkles}
              onSelect={() => runAction(() => router.push("/generate"))}
            >
              New Generation
            </CommandItem>
            <CommandItem
              icon={Clock}
              onSelect={() => runAction(() => router.push("/history"))}
            >
              View History
            </CommandItem>
          </Command.Group>

          <Command.Separator className="h-px bg-ds-border my-1" />

          <Command.Group
            heading="Templates"
            className="text-[11px] uppercase tracking-wider text-ds-text-secondary px-2 py-1.5"
          >
            <CommandItem
              icon={Users}
              onSelect={() => runAction(() => router.push("/generate?template=crm"))}
            >
              CRM Template
            </CommandItem>
            <CommandItem
              icon={ShoppingCart}
              onSelect={() => runAction(() => router.push("/generate?template=ecommerce"))}
            >
              E-commerce Template
            </CommandItem>
            <CommandItem
              icon={BarChart3}
              onSelect={() => runAction(() => router.push("/generate?template=saas_analytics"))}
            >
              SaaS Analytics Template
            </CommandItem>
          </Command.Group>

          <Command.Separator className="h-px bg-ds-border my-1" />

          <Command.Group
            heading="Quick Actions"
            className="text-[11px] uppercase tracking-wider text-ds-text-secondary px-2 py-1.5"
          >
            <CommandItem
              icon={Globe}
              onSelect={() => runAction(() => router.push("/generate?locale=de"))}
            >
              Generate German Data
            </CommandItem>
            <CommandItem
              icon={Globe}
              onSelect={() => runAction(() => router.push("/generate?locale=ja"))}
            >
              Generate Japanese Data
            </CommandItem>
            <CommandItem
              icon={Download}
              onSelect={() => runAction(() => router.push("/generate?step=5"))}
            >
              Export Data
            </CommandItem>
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-between px-4 py-2 border-t border-ds-border">
          <span className="text-[11px] text-ds-text-secondary">
            Navigate with arrow keys
          </span>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-[10px] font-data text-ds-text-secondary bg-ds-bg-tertiary border border-ds-border rounded">
              esc
            </kbd>
            <span className="text-[11px] text-ds-text-secondary">to close</span>
          </div>
        </div>
      </div>
    </Command.Dialog>
  );
}

function CommandItem({
  children,
  icon: Icon,
  onSelect,
}: {
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-ds-text-primary cursor-pointer data-[selected=true]:bg-ds-bg-tertiary transition-colors"
    >
      <Icon className="w-4 h-4 text-ds-text-secondary shrink-0" />
      {children}
    </Command.Item>
  );
}
