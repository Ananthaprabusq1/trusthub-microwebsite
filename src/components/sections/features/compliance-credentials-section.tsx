"use client";

import type { FeaturesComplianceCredentialsContent } from "@/types/features";
import { CapabilityShowcaseShell } from "./capability-showcase-shell";
import { ComplianceCredentialsWindow } from "./compliance-credentials-window";

interface ComplianceCredentialsSectionProps {
  content: FeaturesComplianceCredentialsContent;
}

export function ComplianceCredentialsSection({
  content,
}: ComplianceCredentialsSectionProps) {
  return (
    <CapabilityShowcaseShell
      content={content}
      headingId="compliance-credentials-heading"
      mediaPosition="right"
    >
      <div className="bg-[var(--color-palette-f3fcf5)] md:p-7 rounded-[30px]">
      <ComplianceCredentialsWindow data={content.previewWindow} /></div>
    </CapabilityShowcaseShell>
  );
}