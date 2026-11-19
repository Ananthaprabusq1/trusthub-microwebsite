import type { CapabilityDetailBase } from "./hero-overview";

export type TrustEditorMode = "edit" | "preview";

export type DisclosureRowIcon = "subprocessors" | "leadership";

export type WorkspaceMemberRole = "Admin" | "Editor" | "Viewer";

export type WorkspaceSettingIcon = "settings" | "support";

export interface BrandColorSwatchItem {
  id: string;
  label: string;
  hex: string;
  hasBorder?: boolean;
}

export interface FeaturesBrandingCustomizationContent
  extends CapabilityDetailBase {
  previewWindow: {
    windowTitle: string;
    panelHeading: string;
    logoCard: {
      title: string;
      subtitle: string;
      uploadedSubtitle: string;
    };
    coloursLabel: string;
    swatches: BrandColorSwatchItem[];
    typographyLabel: string;
    fonts: string[];
    customDomainLabel: string;
    domainValue: string;
    dnsStatusLabel: string;
  };
}

export interface FeaturesPreviewPublishingContent extends CapabilityDetailBase {
  previewWindow: {
    windowTitle: string;
    editLabel: string;
    previewLabel: string;
    draftStatusLabel: string;
    publishedStatusLabel: string;
    unpublishLabel: string;
    publishLabel: string;
    canvasBadgeLabel: string;
    editBannerLabel: string;
  };
}

export interface FaqPreviewItem {
  id: string;
  question: string;
  answerWidths: [string, string];
}

export interface DisclosurePreviewRow {
  id: string;
  title: string;
  subtitle: string;
  statusLabel: string;
  icon: DisclosureRowIcon;
}

export interface FeaturesFaqsDisclosuresContent extends CapabilityDetailBase {
  previewWindow: {
    windowTitle: string;
    panelHeading: string;
    addFaqLabel: string;
    faqs: FaqPreviewItem[];
    disclosures: DisclosurePreviewRow[];
  };
}

export interface AnalyticsChartBarItem {
  id: string;
  heightPercent: number;
  highlighted?: boolean;
}

export interface AnalyticsMetricCardItem {
  id: string;
  title: string;
  bars: AnalyticsChartBarItem[];
}

export interface AnalyticsStatusSegment {
  id: "approved" | "pending" | "rejected";
  label: string;
  percent: number;
  showDot?: boolean;
}

export interface FeaturesAnalyticsInsightsContent extends CapabilityDetailBase {
  previewWindow: {
    windowTitle: string;
    panelHeading: string;
    headerPillLabel: string;
    metrics: AnalyticsMetricCardItem[];
    statusHeading: string;
    segments: AnalyticsStatusSegment[];
  };
}

export interface WorkspaceMemberRowItem {
  id: string;
  title: string;
  subtitle: string;
  defaultRole: WorkspaceMemberRole;
}

export interface WorkspaceSettingRowItem {
  id: string;
  title: string;
  subtitle: string;
  icon: WorkspaceSettingIcon;
}

export interface FeaturesWorkspaceAdministrationContent
  extends CapabilityDetailBase {
  previewWindow: {
    windowTitle: string;
    panelHeading: string;
    addMemberLabel: string;
    roles: WorkspaceMemberRole[];
    members: WorkspaceMemberRowItem[];
    settingsRows: WorkspaceSettingRowItem[];
  };
}