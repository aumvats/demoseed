"use client";

import { StudioProvider } from "@/contexts/StudioContext";
import { QuestionnaireShell } from "@/components/studio/QuestionnaireShell";

export default function GeneratePage() {
  return (
    <StudioProvider>
      <QuestionnaireShell />
    </StudioProvider>
  );
}
