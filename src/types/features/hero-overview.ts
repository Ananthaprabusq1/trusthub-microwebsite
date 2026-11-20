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

export interface FeatureCapabilityNavItem {
  id: string;
  number: string;
  label: string;
  targetId: string;
}

export interface FeaturesCapabilitiesHeaderContent {
  headline: string;
  description: string;
  items: FeatureCapabilityNavItem[];
}

export interface CapabilityDetailBase {
  sectionId: string;
  number: string;
  eyebrow: string;
  headline: {
    lineOne: string;
    lineTwo: string;
    lineThree?: string;
  };
  description: string;
  checklistHeading: string;
  checklistItems: string[];
  businessValue: {
    label: string;
    description: string;
  };
}

export interface FeaturesCtaBannerContent {
  headline: {
    lineOne: string;
    lineTwo: string;
  };
  description: string;
  primaryCta: FeaturesHeroCta;
  secondaryCta: FeaturesHeroCta;
  image: {
    src: string;
    alt: string;
  };
}
export type ConnectedCapabilityStepIcon =
  | "organize"
  | "publish"
  | "share"
  | "track";

export interface ConnectedCapabilityPillLink {
  id: string;
  label: string;
  targetId: string;
}

export interface ConnectedCapabilityStepItem {
  id: string;
  stepNumber: string;
  icon: ConnectedCapabilityStepIcon;
  title: string;
  description: string;
  pills: ConnectedCapabilityPillLink[];
}

export interface FeaturesConnectedCapabilitiesContent {
  badge: string;
  headline: string;
  description: string;
  steps: ConnectedCapabilityStepItem[];
  foundationBar: {
    title: string;
    description: string;
    targetId: string;
  };
}