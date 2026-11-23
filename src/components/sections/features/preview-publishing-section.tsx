"use client";

import type { FeaturesPreviewPublishingContent } from "@/types/features";
import { CapabilityShowcaseShell } from "./capability-showcase-shell";
import { PreviewPublishingWindow } from "./preview-publishing-window";

interface PreviewPublishingSectionProps {
  content: FeaturesPreviewPublishingContent;
}

export function PreviewPublishingSection({
  content,
}: PreviewPublishingSectionProps) {
  return (
    <CapabilityShowcaseShell
      content={content}
      headingId="preview-publishing-heading"
      mediaPosition="right"
    >
      
      <PreviewPublishingWindow data={content.previewWindow} />
    </CapabilityShowcaseShell>
  );
}