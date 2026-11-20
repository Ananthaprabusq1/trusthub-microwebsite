export interface NavigationBrand {
  name: string;
  product: string;
  href: string;
  logoSrc: string;
  logoAlt: string;
}

export interface NavSubItem {
  id: string;
  label: string;
  description?: string;
  href: `/features#${string}`;
  order: number;
  visible: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  order: number;
  visible: boolean;
  children?: NavSubItem[];
}

export interface HeaderActionItem {
  id: string;
  label: string;
  href: string;
  variant: "ghost" | "primary";
  showArrow?: boolean;
  order: number;
  visible: boolean;
}

export interface NavigationConfig {
  brand: NavigationBrand;
  items: NavItem[];
  actions: HeaderActionItem[];
}

export type BrandConfig = NavigationBrand;
export type NavigationChildItem = NavSubItem;
export type NavigationItem = NavItem;
export type NavigationActionItem = HeaderActionItem;
export type NavigationContent = NavigationConfig;