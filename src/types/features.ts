export type DocumentAccessMode = "public" | "restricted";

export type FeatureDocIcon = "policy" | "folder" | "certification";

export interface FeaturesHeroCta {
  label: string;
  href: string;
  showArrow?: boolean;
}

export interface DocumentAccessRow {
  id: string;
  title: string;
  subtitle: string;
  icon: FeatureDocIcon;
  defaultMode: DocumentAccessMode;
}

export interface AccessRequestCardData {
  title: string;
  subtitle: string;
  rejectLabel: string;
  approveLabel: string;
}

export interface TrustedDomainTag {
  id: string;
  label: string;
  highlighted?: boolean;
}

export interface DocumentRegistryRow {
  id: string;
  title: string;
  subtitle: string;
  icon: FeatureDocIcon;
  statusLabel: string;
  statusTone: "valid" | "expiring";
  version: string;
}

export interface FeaturesHeroContent {
  badge: string;
  headline: {
    lineOne: string;
    lineTwoPrefix: string;
    lineTwoHighlight: string;
  };
  description: string;
  primaryCta: FeaturesHeroCta;
  secondaryCta: FeaturesHeroCta;
  backgroundImage: {
    src: string;
    alt: string;
  };
  accentBackgroundImage?: {
    src: string;
    alt: string;
  };
  accessGovernance: {
    windowTitle: string;
    accessSectionTitle: string;
    accessRows: DocumentAccessRow[];
    requestsSectionTitle: string;
    requestCard: AccessRequestCardData;
    trustedDomainsLabel: string;
    trustedDomainTags: TrustedDomainTag[];
  };
  documentsPanel: {
    windowTitle: string;
    panelHeading: string;
    uploadLabel: string;
    rows: DocumentRegistryRow[];
  };
}

export interface FeaturesPageContent {
  hero: FeaturesHeroContent;
}