"use client";

import type { FeaturesAccessGovernanceSectionContent } from "@/types/features";
import { AccessGovernanceSectionWindow } from "./access-governance-section-window";
import { CapabilityShowcaseShell } from "./capability-showcase-shell";

interface AccessGovernanceSectionProps {
  content: FeaturesAccessGovernanceSectionContent;
}

export function AccessGovernanceSection({
  content,
}: AccessGovernanceSectionProps) {
  return (
    <CapabilityShowcaseShell
      content={content}
      headingId="access-governance-heading"
      mediaPosition="left"
    >
      <AccessGovernanceSectionWindow data={content.previewWindow} />
    </CapabilityShowcaseShell>
  );
}