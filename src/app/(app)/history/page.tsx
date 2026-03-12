"use client";

import { Clock } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-base font-semibold text-ds-text-primary mb-1">
        Generation History
      </h1>
      <p className="text-sm text-ds-text-secondary mb-8">
        Your recent data generations will appear here.
      </p>

      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-12 rounded-full bg-ds-bg-tertiary flex items-center justify-center mb-4">
          <Clock className="w-6 h-6 text-ds-text-secondary" />
        </div>
        <p className="text-sm text-ds-text-secondary">
          No generations yet. Create your first dataset to get started.
        </p>
      </div>
    </div>
  );
}
