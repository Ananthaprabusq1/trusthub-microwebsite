"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { LuMenu } from "react-icons/lu";
import type { HeaderActionItem, NavItem } from "@/types/navigation";
import { MobileNavDrawer } from "./mobile-nav-drawer";

interface MobileNavigationProps {
  items: NavItem[];
  actions: HeaderActionItem[];
  brandName: string;
  brandProduct: string;
  logoSrc?: string;
  logoAlt?: string;
}

const emptySubscribe = () => () => {};

function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function MobileNavigation({
  items,
  actions,
  brandName,
  brandProduct,
  logoSrc = "/images/stakflo-logo.png",
  logoAlt = "Stakflo Trust Hub logo",
}: MobileNavigationProps) {
  const isClient = useIsClient();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = useCallback((restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => {
        openButtonRef.current?.focus();
      });
    }
  }, []);

  return (
    <div className="flex items-center lg:hidden">
      <motion.button
        ref={openButtonRef}
        type="button"
        whileTap={{ scale: 0.94 }}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        aria-label="Open navigation menu"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[var(--color-surface-dark)] transition-colors duration-200 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:outline-none"
      >
        <LuMenu aria-hidden="true" className="h-6 w-6" />
      </motion.button>

      {isClient &&
        createPortal(
          <MobileNavDrawer
            isOpen={isOpen}
            onClose={handleClose}
            pathname={pathname}
            items={items}
            actions={actions}
            brandName={brandName}
            brandProduct={brandProduct}
            logoSrc={logoSrc}
            logoAlt={logoAlt}
          />,
          document.body
        )}
    </div>
  );
}