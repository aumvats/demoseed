"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { AppNav } from "@/components/shared/AppNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-ds-bg-primary">
        <AppNav />
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </div>
    </AuthProvider>
  );
}
