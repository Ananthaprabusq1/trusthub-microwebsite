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
      <div className="bg-white p-7 rounded-[30px]">
<DocumentsWindow data={content.previewWindow} />
</div>
    </CapabilityShowcaseShell>
  );
}