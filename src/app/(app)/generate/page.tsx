"use client";

import { StudioProvider } from "@/contexts/StudioContext";
import { StudioLayout } from "@/components/studio/StudioLayout";

export default function GeneratePage() {
  return (
    <StudioProvider>
      <StudioLayout />
    </StudioProvider>
  );
}
