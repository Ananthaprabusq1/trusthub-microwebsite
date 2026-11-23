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
      <div className="bg-[#F3FCF5] p-7 rounded-[30px]">
        <PreMappedTemplatesWindow data={content.previewWindow} />
      </div>
      
    </CapabilityShowcaseShell>
  );
}