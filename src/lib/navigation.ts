import type {
  HeaderActionItem,
  NavigationConfig,
  NavItem,
} from "@/types/navigation";

export function getVisibleNavItems(config: NavigationConfig): NavItem[] {
  return config.items
    .filter((item) => item.visible)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      ...item,
      children: item.children
        ?.filter((child) => child.visible)
        .sort((a, b) => a.order - b.order),
    }));
}

export function getVisibleHeaderActions(
  config: NavigationConfig
): HeaderActionItem[] {
  return config.actions
    .filter((action) => action.visible)
    .sort((a, b) => a.order - b.order);
}

export function isNavItemActive(pathname: string, itemHref: string): boolean {
  if (itemHref === "/") {
    return pathname === "/";
  }
  return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
}

export function isSubItemActive(
  pathname: string,
  activeHash: string,
  subHref: `/features#${string}`
): boolean {
  const [targetPath, targetHash] = subHref.split("#");
  if (pathname !== targetPath || !targetHash) {
    return false;
  }
  return activeHash === `#${targetHash}`;
}