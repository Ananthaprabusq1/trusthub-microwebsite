import type {
  CapabilityDetailBase,
  DocumentAccessMode,
  FeatureDocIcon,
  FeaturesHeroContent,
  TrustedDomainTag,
} from "./hero-overview";

export type SecurityControlIcon = "lock" | "shield" | "activity" | "sliders";

export type SecurityControlCategory = "Access" | "Data" | "Operations";

export interface SecurityControlRowItem {
  id: string;
  title: string;
  activeSubtitle: string;
  inactiveSubtitle: string;
  category: SecurityControlCategory;
  icon: SecurityControlIcon;
  badgeLabel?: string;
  defaultEnabled: boolean;
}

export interface FeaturesSecurityControlsContent extends CapabilityDetailBase {
  previewWindow: {
    windowTitle: string;
    searchPlaceholder: string;
    categories: Array<"All" | SecurityControlCategory>;
    controls: SecurityControlRowItem[];
  };
}

export interface FeaturesDocumentManagementContent extends CapabilityDetailBase {
  previewWindow: FeaturesHeroContent["documentsPanel"];
}

export interface PreMappedTemplateCardItem {
  id: string;
  label: string;
  barWidths: [string, string];
  structureWidths: string[];
}

export interface FeaturesPreMappedTemplatesContent extends CapabilityDetailBase {
  previewWindow: {
    windowTitle: string;
    chooseHeading: string;
    structureHeading: string;
    templates: PreMappedTemplateCardItem[];
  };
}

export interface AccessGovernanceSectionRow {
  id: string;
  title: string;
  publicSubtitle: string;
  restrictedSubtitle: string;
  icon: FeatureDocIcon;
  defaultMode: DocumentAccessMode;
}

export interface FeaturesAccessGovernanceSectionContent
  extends CapabilityDetailBase {
  previewWindow: {
    windowTitle: string;
    accessHeading: string;
    accessRows: AccessGovernanceSectionRow[];
    requestsHeading: string;
    requestCard: {
      title: string;
      subtitle: string;
      rejectLabel: string;
      approveLabel: string;
    };
    trustedDomainsLabel: string;
    trustedDomains: TrustedDomainTag[];
  };
}

export interface ComplianceCredentialCardItem {
  id: string;
  title: string;
  subtitle: string;
  statusLabel: string;
  issuedLabel: string;
  expiresLabel: string;
}

export interface FeaturesComplianceCredentialsContent
  extends CapabilityDetailBase {
  previewWindow: {
    windowTitle: string;
    panelHeading: string;
    headerPillLabel: string;
    cards: ComplianceCredentialCardItem[];
  };
}