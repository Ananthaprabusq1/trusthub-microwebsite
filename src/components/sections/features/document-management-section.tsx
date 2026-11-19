"use client";

import type { FeaturesDocumentManagementContent } from "@/types/features";
import { CapabilityShowcaseShell } from "./capability-showcase-shell";
import { DocumentsWindow } from "./documents-window";

interface DocumentManagementSectionProps {
  content: FeaturesDocumentManagementContent;
}

export function DocumentManagementSection({
  content,
}: DocumentManagementSectionProps) {
  return (
    <CapabilityShowcaseShell
      content={content}
      headingId="document-management-heading"
      mediaPosition="left"
    >
      <DocumentsWindow data={content.previewWindow} />
    </CapabilityShowcaseShell>
  );
}