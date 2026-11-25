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
      <div className="bg-white md:p-7 rounded-[30px]">
      <WorkspaceAdministrationWindow data={content.previewWindow} />
      </div>
    </CapabilityShowcaseShell>
  );
}