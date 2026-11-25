"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { FaAnglesUp } from "react-icons/fa6";

const emptySubscribe = () => () => {};

export function ScrollToTopButton() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [visible, setVisible] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState({
    contrast: false,
    grayscale: false,
  });

  useEffect(() => {
    if (!isClient) return undefined;

    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    const frameId = window.requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return undefined;

    const siteShell = document.getElementById("site-shell");
    if (!siteShell) return undefined;

    const syncAccessibilityMode = () => {
      setAccessibilityMode({
        contrast: siteShell.classList.contains("high-contrast"),
        grayscale: siteShell.classList.contains("grayscale"),
      });
    };

    const frameId = window.requestAnimationFrame(syncAccessibilityMode);
    const observer = new MutationObserver(syncAccessibilityMode);
    observer.observe(siteShell, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [isClient]);

  const scrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!isClient) return null;

  const buttonClass = accessibilityMode.contrast
    ? "border border-[var(--color-accessibility-contrast-fg)] bg-[var(--color-accessibility-contrast-tint)] text-[var(--color-accessibility-contrast-fg)] shadow-none"
    : accessibilityMode.grayscale
      ? "border border-black bg-white text-black shadow-lg"
      : "border border-transparent bg-[var(--color-brand-primary)] text-white shadow-[0_10px_25px_-5px_rgba(55,198,80,0.48)] hover:bg-[var(--color-brand-primary-hover)] hover:shadow-[0_14px_30px_-5px_rgba(55,198,80,0.6)]";

  return createPortal(
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`group fixed right-4 bottom-4 z-[9998] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-all duration-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-primary)] ${buttonClass} ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <FaAnglesUp
        size={18}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:-translate-y-0.5"
      />
    </button>,
    document.body
  );
}

export default ScrollToTopButton;
