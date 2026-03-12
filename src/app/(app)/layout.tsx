import { AppNav } from "@/components/shared/AppNav";
import { CommandPalette } from "@/components/shared/CommandPalette";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-ds-bg-primary">
      <AppNav />
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      <CommandPalette />
    </div>
  );
}
