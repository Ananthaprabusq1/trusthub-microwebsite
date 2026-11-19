"use client";

import type { FeaturesFaqsDisclosuresContent } from "@/types/features";
import { CapabilityShowcaseShell } from "./capability-showcase-shell";
import { FaqsDisclosuresWindow } from "./faqs-disclosures-window";

interface FaqsDisclosuresSectionProps {
  content: FeaturesFaqsDisclosuresContent;
}

export function FaqsDisclosuresSection({
  content,
}: FaqsDisclosuresSectionProps) {
  return (
    <CapabilityShowcaseShell
      content={content}
      headingId="faqs-disclosures-heading"
      mediaPosition="left"
    >
      <FaqsDisclosuresWindow data={content.previewWindow} />
    </CapabilityShowcaseShell>
  );
}