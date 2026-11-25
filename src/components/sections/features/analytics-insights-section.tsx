"use client";

import type { FeaturesAnalyticsInsightsContent } from "@/types/features";
import { AnalyticsInsightsWindow } from "./analytics-insights-window";
import { CapabilityShowcaseShell } from "./capability-showcase-shell";

interface AnalyticsInsightsSectionProps {
  content: FeaturesAnalyticsInsightsContent;
}

export function AnalyticsInsightsSection({
  content,
}: AnalyticsInsightsSectionProps) {
  return (
    <CapabilityShowcaseShell
      content={content}
      headingId="analytics-insights-heading"
      mediaPosition="right"
    >
      <div className="bg-[var(--color-palette-f3fcf5)] md:p-7 rounded-[30px]">
      <AnalyticsInsightsWindow data={content.previewWindow} />
      </div>
    </CapabilityShowcaseShell>
  );
}