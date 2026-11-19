"use client";

import type { FeaturesBrandingCustomizationContent } from "@/types/features";
import { BrandingCustomizationWindow } from "./branding-customization-window";
import { CapabilityShowcaseShell } from "./capability-showcase-shell";

interface BrandingCustomizationSectionProps {
  content: FeaturesBrandingCustomizationContent;
}

export function BrandingCustomizationSection({
  content,
}: BrandingCustomizationSectionProps) {
  return (
    <CapabilityShowcaseShell
      content={content}
      headingId="branding-customization-heading"
      mediaPosition="left"
    >
      <BrandingCustomizationWindow data={content.previewWindow} />
    </CapabilityShowcaseShell>
  );
}