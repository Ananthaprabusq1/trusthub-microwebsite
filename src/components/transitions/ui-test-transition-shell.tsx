"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useGetStartedTransition } from "@/context/get-started-transition-context";

interface UiTestTransitionShellProps {
  children: ReactNode;
}

export function UiTestTransitionShell({
  children,
}: UiTestTransitionShellProps) {
  const { mode, phase } = useGetStartedTransition();

  const isLayoutMorph = mode === "layout-morph";
  const isGlassSheet = mode === "glass-sheet" && phase !== "idle";
  const isShutterScan = mode === "security-shutters" && phase === "revealing";

  return (
    <div className="relative min-h-screen bg-slate-900/5">
      {/* Backdrop Dim for Elevated Glass Sheet */}
      {isGlassSheet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-30 bg-slate-950/35 backdrop-blur-xs"
        />
      )}

      <motion.main
        layoutId={isLayoutMorph ? "get-started-morph" : undefined}
        initial={
          mode === "glass-sheet" && phase !== "idle"
            ? { y: "100%", borderRadius: "28px", scale: 0.97 }
            : false
        }
        animate={{ y: "0%", borderRadius: "0px", scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 28,
        }}
        className="relative z-30 min-h-screen overflow-hidden bg-white shadow-[0_-20px_60px_-15px_rgba(15,23,42,0.2)]"
      >
        {/* Emerald Laser Scanline for Security Shutters */}
        {isShutterScan && (
          <motion.div
            aria-hidden="true"
            initial={{ top: "0%", opacity: 1 }}
            animate={{ top: "100%", opacity: 0 }}
            transition={{ duration: 0.58, ease: "easeOut" }}
            className="pointer-events-none fixed inset-x-0 z-50 h-[3px] bg-[linear-gradient(90deg,transparent_0%,#37C650_50%,transparent_100%)] shadow-[0_0_24px_4px_rgba(55,198,80,0.75)]"
          />
        )}

        {children}
      </motion.main>
    </div>
  );
}