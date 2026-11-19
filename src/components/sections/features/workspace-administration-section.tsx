"use client";

import type { FeaturesWorkspaceAdministrationContent } from "@/types/features";
import { CapabilityShowcaseShell } from "./capability-showcase-shell";
import { WorkspaceAdministrationWindow } from "./workspace-administration-window";

interface WorkspaceAdministrationSectionProps {
  content: FeaturesWorkspaceAdministrationContent;
}

export function WorkspaceAdministrationSection({
  content,
}: WorkspaceAdministrationSectionProps) {
  return (
    <CapabilityShowcaseShell
      content={content}
      headingId="workspace-administration-heading"
      mediaPosition="left"
    >
      <WorkspaceAdministrationWindow data={content.previewWindow} />
    </CapabilityShowcaseShell>
  );
}