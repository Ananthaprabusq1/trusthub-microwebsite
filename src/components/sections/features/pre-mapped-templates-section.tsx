"use client";

import type { FeaturesPreMappedTemplatesContent } from "@/types/features";
import { CapabilityShowcaseShell } from "./capability-showcase-shell";
import { PreMappedTemplatesWindow } from "./pre-mapped-templates-window";

interface PreMappedTemplatesSectionProps {
  content: FeaturesPreMappedTemplatesContent;
}

export function PreMappedTemplatesSection({
  content,
}: PreMappedTemplatesSectionProps) {
  return (
    <CapabilityShowcaseShell
      content={content}
      headingId="pre-mapped-templates-heading"
      mediaPosition="right"
    >
      <PreMappedTemplatesWindow data={content.previewWindow} />
    </CapabilityShowcaseShell>
  );
}