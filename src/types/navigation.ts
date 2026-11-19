export interface NavSubItem {
  id: string;
  label: string;
  /** Must point to a hash section on /features, e.g. "/features#trust-center" */
  href: `/features#${string}`;
  description?: string;
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

// export interface NavigationConfig {
//   brand: {
//     name: string;
//     product: string;
//     href: string;
//   };
//   items: NavItem[];
//   actions: HeaderActionItem[];
// }
export interface NavigationConfig {
  brand: {
    name: string;
    product: string;
    href: string;
    logoSrc: string;
    logoAlt: string;
  };
  items: NavItem[];
  actions: HeaderActionItem[];
}